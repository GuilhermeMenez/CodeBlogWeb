# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — Vite dev server (http://localhost:5173)
- `npm run build` — `tsc -b && vite build` (type-check is part of the build; the script runs the lockfile policy check first)
- `npm run check` — `biome check` (lint + format) + `typecheck`. **Run this before calling any change done.**
- `npm run lint` / `npm run lint:fix` — Biome (`biome.json`); `lint:fix` = `biome check --write` (safe fixes + format; import sorting is off by choice). Suppress with `// biome-ignore <rule>: <motivo>`, never blanket-disable
- `npm run typecheck` — `tsc -b`
- `npm run format` — Biome formatter for TS/JS/JSON/CSS; HTML and Markdown are intentionally unformatted (a hook already formats each file you edit). Tailwind `@theme` token names must be valid CSS idents (no `--spacing-4.5`): Biome can't parse them, and fractional spacing already comes from `--spacing`
- No test runner is configured. UI changes are verified by running the app with `VITE_ENABLE_MOCKS=true`.

## Workflow

Pick the lightest process that fits the change:

- **Small** (style tweak, isolated bug, component following an existing pattern): just do it → `npm run check`.
- **Medium** (a new screen consuming a new endpoint): plan mode first → implement → `npm run check` + run the app with mocks → `/code-review`.
- **Large** (new domain, several screens/endpoints): `/spec` writes `specs/NNN-slug.md` → implement one slice per session → `/code-review` + `/security-review`. See `specs/README.md`.

Project skills (`.claude/skills/`): `/new-endpoint` (schema → api → query key → hook → MSW mock), `/new-ui-component`, `/add-dependency` (manual only), `/spec`.

Path-scoped conventions live in `.claude/rules/` (`data-layer`, `ui-components`, `routing`) and load when you touch matching files. Product context: `docs/product.md`.

When a decision becomes a lasting convention, record it in the matching rule file (or here if it is cross-cutting) in the same change.

### Dependency policy (supply-chain hardened)
- `.npmrc` sets `ignore-scripts=true`, `save-exact=true`: use `npm ci` to install and `npm install pkg@x.y.z` to add. Never override `ignore-scripts`.
- `npm run security:check` = `check-lockfile.mjs` (root) (registry-only `resolved`, `integrity`, install-script allowlist, no git deps, exact versions incl. `overrides`, `.npmrc` intact) + `npm audit --audit-level=high` + `npm audit signatures`. The lockfile part (`security:lockfile`) is chained into `build` (not a `prebuild` hook: `ignore-scripts=true` skips pre/post scripts).
- Policy and incident runbook: `docs/security.md`.
- Dependencies are pinned to exact versions; keep it that way. Don't add `preinstall`/`postinstall`/`prepare` scripts (the check fails on them).
- Changes to `package.json`, `package-lock.json`, `.npmrc` and `check-lockfile.mjs` need review by the other dev: keep them in their own commit and call them out. A `PreToolUse` hook (`.claude/hooks/guard-npm.mjs`) blocks installs without an exact version and any attempt to disable `ignore-scripts`.

### Line endings
LF everywhere (`biome.json` `lineEnding: "lf"`). There is no `.gitattributes` by choice: each clone must set `git config core.autocrlf input` (see README), otherwise Windows checkouts get CRLF and `biome check` fails.

## Environment

No `.env*` file is ever versioned (git-ignored; no `.env.example`): new vars are documented in the README's setup step. Vars: `VITE_API_URL` (backend base URL) and `VITE_ENABLE_MOCKS` (`'true'` starts the MSW browser worker, dev only — see `src/main.tsx`).

## Architecture

React 19 + TypeScript (strict, `erasableSyntaxOnly`, `verbatimModuleSyntax` → use `import type`) + Vite + Tailwind v4. Path alias `@/` → `src/`; `@mocks/` → `src/mocks/`.

### Data layer (request flow spans several files)
`pages/components → hooks/use*.ts → api/*.ts → api/client.ts (axios)`
- `src/api/client.ts`: shared axios instance. Request interceptor attaches `Bearer` token from `localStorage['token']`. Response interceptor normalizes every failure into an `ApiError` (`api/api-error.ts`) using `apiErrorResponseSchema`, so callers only ever see `ApiError`.
- `src/api/schemas/*`: Zod schemas are the source of truth; DTO/response types are inferred from them. API functions (`authApi`, etc.) `.parse()` responses at the boundary.
- `src/hooks/*`: TanStack Query wrappers. Auth hooks own token persistence (`localStorage`), seed the `queryKeys.auth.me()` cache on login/register, and handle navigation (`/feed` after login, `/` after logout, which also clears the whole query cache).
- `src/lib/query-client.ts`: the `QueryClient` defaults (retry only on 408/429/5xx/network, once) and the central `queryKeys` factory — add new keys there rather than inlining arrays.

### Routing, mocking, UI
- Routing: TanStack Router, file-based in `src/pages` (not `routes`); groups `_auth` (public) and `_app` (authenticated shell). Details: `.claude/rules/routing.md`.
- Mocking: MSW handlers per domain in `src/mocks`; every endpoint needs one so the app works with `VITE_ENABLE_MOCKS=true`. Details: `.claude/rules/data-layer.md`.
- UI: `src/components/ui/*` wrap `@base-ui/react` primitives styled with `tailwind-variants` + `tailwind-merge`; tokens in `@theme` (`src/index.css`). Details: `.claude/rules/ui-components.md`.

### Naming
Components/icons `PascalCase.tsx`; hooks `useCamelCase.ts`; api/lib/mocks/utils `kebab-case.ts`; planned `*.types.ts`, `*.enums.ts`, `*.constants.ts` in `types/`, `enums/`, `constants/`.

The README is written in Portuguese; code comments in the codebase are mostly Portuguese too.
