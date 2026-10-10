// PreToolUse (Bash): aplica a política de dependências de docs/security.md.
// Sair com código 2 bloqueia o comando; a mensagem em stderr volta para o Claude.
import { readFileSync } from 'node:fs'

// pacote@1.2.3 ou @escopo/pacote@1.2.3 (aceita sufixo de pre-release/build)
const EXACT_SPEC = /^(@[a-z0-9~][\w.~-]*\/)?[a-z0-9~][\w.~-]*@\d+\.\d+\.\d+(-[\w.]+)?(\+[\w.]+)?$/i
const INSTALL = /\bnpm\s+(?:install|i|add)\b([^&|;\n]*)/g

function block(reason) {
  process.stderr.write(
    `Bloqueado pela política de dependências (docs/security.md): ${reason}\n` +
      'Use a skill /add-dependency para adicionar pacotes.\n',
  )
  process.exit(2)
}

let command = ''
try {
  command = JSON.parse(readFileSync(0, 'utf8')).tool_input?.command ?? ''
} catch {
  process.exit(0)
}

if (/ignore-scripts(?:\s*=\s*|\s+)false\b|--no-ignore-scripts\b/.test(command)) {
  block('`ignore-scripts` nunca pode ser desativado.')
}

for (const [, args] of command.matchAll(INSTALL)) {
  const specs = args
    .trim()
    .split(/\s+/)
    .filter((token) => token && !token.startsWith('-'))
    .map((token) => token.replace(/^["']|["']$/g, ''))

  for (const spec of specs) {
    if (!EXACT_SPEC.test(spec)) {
      block(
        `"${spec}" não é um pacote do registry com versão exata. ` +
          'Use `npm install <pacote>@<x.y.z>` (sem ranges, tags, git ou URL).',
      )
    }
  }
}

process.exit(0)
