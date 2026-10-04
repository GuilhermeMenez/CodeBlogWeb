# Segurança da cadeia de suprimentos

Política de dependências, runbook de incidente e pendências de infraestrutura (CI e `.github`).

## Controles ativos

| Controle | Onde | O que faz |
|---|---|---|
| Sem scripts de ciclo de vida | `.npmrc` (`ignore-scripts=true`) | Dependências não executam `postinstall` & afins |
| Versões exatas | `.npmrc` (`save-exact=true`) + `check-lockfile` | Sem `^`/`~` em dependências nem em `overrides` |
| Política do lockfile | `scripts/check-lockfile.mjs` | `resolved` só em `registry.npmjs.org`, `integrity` obrigatória, allowlist de pacotes com install script (`esbuild`, `fsevents`, `msw`), sem dependência via git/URL, sem script `preinstall`/`postinstall`/`prepare` no projeto, `.npmrc` íntegro |
| Gate no build | `package.json` (`build`) | `npm run build` encadeia o `check-lockfile` antes de compilar (offline); vale para qualquer deploy que rode o build. Não usar hook `prebuild`: com `ignore-scripts=true` o npm ignora scripts `pre`/`post` |
| Auditoria | `npm audit --audit-level=high` | Advisories do GHSA, incluindo malware |
| Assinaturas | `npm audit signatures` | Valida assinatura e provenance do registry |
| Segredos fora do git | `.gitignore` (`.env`, `.env.*`) + `.env.example` | `.env` não é versionado |

## Comandos

```bash
npm ci                          # instalação determinística (scripts desabilitados via .npmrc)
npm install <pacote>@<x.y.z>    # adicionar dependência com versão exata
npm run security:check          # lockfile + audit + signatures
```

Se o `check-lockfile` reprovar um pacote legítimo (novo install script, nova dependência embutida), **revise o pacote** e só então ajuste a allowlist em `scripts/check-lockfile.mjs`, em PR separado e com revisão.

## Regras manuais (enquanto não há CI)

Sem CI, nada bloqueia um merge ruim; a proteção depende destas regras:

1. Rodar `npm run security:check` antes de todo merge e de todo deploy.
2. Só adotar versão de **dependência direta** publicada há 7+ dias (`npm view <pacote> time`), exceto correção de vulnerabilidade já divulgada.
3. Mudanças em `package.json`, `package-lock.json`, `.npmrc` e `scripts/` exigem revisão de outra pessoa.
4. Nunca instalar com `--ignore-scripts=false` nem alterar `ignore-scripts` no `.npmrc`.
5. Não versionar `.env`; configuração nova entra em `.env.example`.

## Resposta a incidente

Se houver suspeita de pacote malicioso:

1. Pause os deploys.
2. Rotacione credenciais de nuvem, GitHub, SSH e registry.
3. Apague `node_modules` e reinstale com `npm ci`.
4. Rode `npm run security:check`.
5. Revise logs de CI/CD e de nuvem do período.
6. Registre o hash do lockfile e o pacote suspeito.

## Limites conhecidos

- Os controles locais podem ser contornados por quem tem acesso à máquina (ex.: `npm install --ignore-scripts=false`); o enforcement real exige CI + ruleset no GitHub (ver pendências).
- O `check-lockfile` detecta *técnicas* (origem fora do registry, install scripts novos, dependências via git), não incidentes específicos; versões maliciosas conhecidas são cobertas só pelo `npm audit`, que tem atraso entre a publicação e o advisory.
- Dependências transitivas atualizadas por `npm update` podem ter menos de 7 dias (pacotes de dados como `caniuse-lite` e `electron-to-chromium` publicam quase todo dia); a regra 2 vale para dependências diretas.
- `overrides` globais podem quebrar ferramentas (o override de `brace-expansion` para 5.x quebrava o `minimatch@3` do ESLint). Prefira overrides escopados e só quando o `npm audit` exigir.

## Pendências (alinhar com o admin do repositório)

Estado atual: não há CI nem pasta `.github/`. O rascunho pronto está na branch `draft/github-config` (`ci.yml`, `dependabot.yml`, `CODEOWNERS`, `SECURITY.md`).

**Decisões a tomar com o admin**
- Dono do repositório (o remote é `GuilhermeMenez/code-blog-web`), visibilidade (público/privado) e se o Dependency graph/GHAS está disponível (o `dependency-review-action` depende disso).
- Estrutura final: o GitHub só lê workflows em `.github/workflows/` e Dependabot em `.github/dependabot.yml`. Proposta mínima: `.github/` com apenas `workflows/ci.yml`, e `SECURITY.md`/`CODEOWNERS` em `docs/`.

**CI (`.github/workflows/ci.yml`)**
- Rodar em push/PR para `master` + `cron` semanal: `npm ci --ignore-scripts`, `npm run security:lockfile`, `npm run security:audit`, `npm run build`.
- `permissions: contents: read`, `persist-credentials: false`, nunca `pull_request_target`.
- Actions fixadas por SHA completo de commit (comentando a tag) e, só então, ativar "Require actions to be pinned to a full-length commit SHA".
- `dependency-review-action` em PR (`fail-on-severity: high`).

**Atualizações de dependência**
- Dependabot de versões (`dependabot.yml`, `cooldown` de 7 dias) ou Dependabot *security updates* + alertas via Settings, se a decisão for não manter o arquivo.

**Settings do GitHub (fora do repositório)**
- Ruleset em `master`: PR obrigatório, check do CI obrigatório, bloqueio de force push.
- `GITHUB_TOKEN` com permissão padrão de leitura; aprovação de workflows de colaboradores externos.
- Secret scanning + push protection, Dependabot alerts, CodeQL (default setup).

**Governança**
- `CODEOWNERS` para `package*.json`, `.npmrc`, `.nvmrc`, `scripts/`, `.github/` com o dono correto (ou descartar se houver mantenedor único).
- Canal de reporte de vulnerabilidade: `SECURITY.md` e relato privado do GitHub (Security → Report a vulnerability).
