// PostToolUse (Edit|Write): formata com Prettier apenas o arquivo que acabou de ser editado.
// Nunca bloqueia: qualquer falha aqui é ignorada para não interromper a sessão.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { extname, relative, resolve } from 'node:path'

const FORMATTABLE = new Set(['.ts', '.tsx', '.js', '.mjs', '.cjs', '.css'])

try {
  const input = JSON.parse(readFileSync(0, 'utf8'))
  const projectDir = process.env.CLAUDE_PROJECT_DIR ?? input.cwd ?? process.cwd()
  const filePath = input.tool_input?.file_path

  if (!filePath || !FORMATTABLE.has(extname(filePath))) process.exit(0)

  // Só arquivos dentro do projeto
  const rel = relative(projectDir, resolve(projectDir, filePath))
  if (rel.startsWith('..') || !existsSync(resolve(projectDir, rel))) process.exit(0)

  const prettier = resolve(projectDir, 'node_modules/prettier/bin/prettier.cjs')
  if (!existsSync(prettier)) process.exit(0)

  // O .prettierignore protege arquivos gerados
  execFileSync(process.execPath, [prettier, '--write', '--log-level', 'warn', rel], {
    cwd: projectDir,
    stdio: 'ignore',
  })
} catch {
  // silencioso por design
}

process.exit(0)
