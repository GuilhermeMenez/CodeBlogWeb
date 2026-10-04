#!/usr/bin/env node
// Política estrutural de supply-chain para package.json, package-lock.json e .npmrc.
// Sem dependências. Sai com código 1 se qualquer regra for violada.

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const read = (file) => readFileSync(resolve(root, file), 'utf8')

const REGISTRY = 'https://registry.npmjs.org/'

// Pacotes autorizados a ter lifecycle scripts (install/postinstall). Qualquer outro falha.
const INSTALL_SCRIPT_ALLOWLIST = new Set(['esbuild', 'fsevents', 'msw'])

// Dependências embutidas (bundled) pelo npm não trazem resolved/integrity no lockfile.
const BUNDLED_WITHOUT_INTEGRITY = /^node_modules\/@tailwindcss\/oxide-wasm32-wasi\/node_modules\//

const EXACT_VERSION = /^\d+\.\d+\.\d+(?:-[\w.-]+)?(?:\+[\w.-]+)?$/
const DEP_FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']

const errors = []
const fail = (source, message) => errors.push(`${source}: ${message}`)

function packageName(lockPath) {
  return lockPath.slice(lockPath.lastIndexOf('node_modules/') + 'node_modules/'.length)
}

function checkSpec(source, label, spec) {
  if (!EXACT_VERSION.test(spec)) fail(source, `${label} não é versão exata (${spec})`)
}

function checkOverrides(source, overrides, trail = 'overrides') {
  for (const [name, value] of Object.entries(overrides ?? {})) {
    if (typeof value === 'string') checkSpec(source, `${trail}.${name}`, value)
    else if (value && typeof value === 'object') checkOverrides(source, value, `${trail}.${name}`)
  }
}

function checkPackageJson() {
  const pkg = JSON.parse(read('package.json'))

  for (const field of DEP_FIELDS) {
    for (const [name, spec] of Object.entries(pkg[field] ?? {})) {
      checkSpec('package.json', `${field}.${name}`, String(spec))
    }
  }
  checkOverrides('package.json', pkg.overrides)

  for (const [name, script] of Object.entries(pkg.scripts ?? {})) {
    if (/^(pre|post)?(install|prepare)$/.test(name)) {
      fail('package.json', `script de ciclo de vida "${name}" não é permitido (${script})`)
    }
  }
}

function checkLockfile() {
  const lock = JSON.parse(read('package-lock.json'))
  if (lock.lockfileVersion < 3) fail('package-lock.json', `lockfileVersion ${lock.lockfileVersion} < 3`)

  for (const [lockPath, meta] of Object.entries(lock.packages ?? {})) {
    if (lockPath === '' || meta.link) continue

    if (BUNDLED_WITHOUT_INTEGRITY.test(lockPath)) continue

    if (!meta.resolved?.startsWith(REGISTRY)) {
      fail('package-lock.json', `${lockPath} resolve fora de ${REGISTRY} (${meta.resolved ?? 'sem resolved'})`)
    }
    if (!meta.integrity) fail('package-lock.json', `${lockPath} sem integrity`)

    if (meta.hasInstallScript && !INSTALL_SCRIPT_ALLOWLIST.has(packageName(lockPath))) {
      fail('package-lock.json', `${lockPath} tem install script e não está na allowlist`)
    }

    for (const field of DEP_FIELDS) {
      for (const [name, spec] of Object.entries(meta[field] ?? {})) {
        if (/^(git|github|gitlab|bitbucket|https?|file|link):|^git\+|\//.test(String(spec))) {
          fail('package-lock.json', `${lockPath} depende de ${name} via spec não-registry (${spec})`)
        }
      }
    }
  }
}

function checkNpmrc() {
  const lines = read('.npmrc').split(/\r?\n/).map((line) => line.trim())
  for (const required of ['ignore-scripts=true', 'save-exact=true', 'package-lock=true']) {
    if (!lines.includes(required)) fail('.npmrc', `falta ${required}`)
  }
  if (lines.some((line) => /^(@[\w-]+:)?registry\s*=/.test(line))) {
    fail('.npmrc', 'registry customizado não é permitido')
  }
}

checkPackageJson()
checkLockfile()
checkNpmrc()

if (errors.length > 0) {
  console.error(`check-lockfile: ${errors.length} violação(ões)\n`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('check-lockfile: OK')
