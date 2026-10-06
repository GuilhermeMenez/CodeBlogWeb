# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — Vite dev server (http://localhost:5173)
- `npm run build` — `tsc -b && vite build` (type-check is part of the build; the script runs the lockfile policy check first)
- `npm run lint` / `npm run lint:fix` — ESLint over `src/**/*.{ts,tsx}`
- `npm run format` — Prettier
- No test runner is configured.

### Dependency policy (supply-chain hardened)
- `.npmrc` sets `ignore-scripts=true`, `save-exact=true`: use `npm ci` to install and `npm install pkg@x.y.z` to add. Never override `ignore-scripts`.
- `npm run security:check` = `check-lockfile.mjs` (root) (registry-only `resolved`, `integrity`, install-script allowlist, no git deps, exact versions incl. `overrides`, `.npmrc` intact) + `npm audit --audit-level=high` + `npm audit signatures`. The lockfile part (`security:lockfile`) is chained into `build` (not a `prebuild` hook: `ignore-scripts=true` skips pre/post scripts).
- Policy and incident runbook: `docs/security.md`.
- Dependencies are pinned to exact versions; keep it that way. Don't add `preinstall`/`postinstall`/`prepare` scripts (the check fails on them).

## Environment

`.env` is git-ignored; copy `.env.example`. Vars: `VITE_API_URL` (backend base URL) and `VITE_ENABLE_MOCKS` (`'true'` starts the MSW browser worker, dev only — see `src/main.tsx`).

## Architecture

React 19 + TypeScript (strict, `erasableSyntaxOnly`, `verbatimModuleSyntax` → use `import type`) + Vite + Tailwind v4. Path alias `@/` → `src/`; `@mocks/` → `src/mocks/`.

### Data layer (request flow spans several files)
`pages/components → hooks/use*.ts → api/*.ts → api/client.ts (axios)`
- `src/api/client.ts`: shared axios instance. Request interceptor attaches `Bearer` token from `localStorage['token']`. Response interceptor normalizes every failure into an `ApiError` (`api/api-error.ts`) using `apiErrorResponseSchema`, so callers only ever see `ApiError`.
- `src/api/schemas/*`: Zod schemas are the source of truth; DTO/response types are inferred from them. API functions (`authApi`, etc.) `.parse()` responses at the boundary.
- `src/hooks/*`: TanStack Query wrappers. Auth hooks own token persistence (`localStorage`), seed the `queryKeys.auth.me()` cache on login/register, and handle navigation (`/feed` after login, `/` after logout, which also clears the whole query cache).
- `src/lib/query-client.ts`: the `QueryClient` defaults (retry only on 408/429/5xx/network, once) and the central `queryKeys` factory — add new keys there rather than inlining arrays.

### Routing
TanStack Router, file-based, in `src/pages` (not `routes`). Configured in `vite.config.ts` with `routeToken: 'layout'` (so `layout.tsx` is the layout file, not `route.tsx`) and generated tree at `src/route-tree.gen.ts` (auto-generated; don't edit). Folders prefixed with `-` (e.g. `-components/`) are ignored by the router and hold page-local components. Groups: `_auth` (landing/sign-in/up), `_app` (authenticated shell: `feed`, `me/*`, `$writer/$postId`), plus `design-system`.

### Mocking
`src/mocks` has MSW handlers per domain (`auth`, `posts`, `users`), in-memory data in `mocks/data`, and `browser.ts`/`server.ts` setups. Add a handler when adding an endpoint so the app works with `VITE_ENABLE_MOCKS=true`.

### UI components
`src/components/ui/*` wrap `@base-ui/react` headless primitives, styled with `tailwind-variants` (`tv`) and merged with `tailwind-merge`. Conventions (from README): no `forwardRef` (React 19 ref-as-prop), props extend `ComponentProps<'el'>` + `VariantProps`, state styling via `data-*` attributes (e.g. `data-disabled`), design tokens via Tailwind v4 `@theme` CSS variables in `src/index.css`. Icons are components in `src/assets/icons/` named `XxxIcon.tsx`.

### Naming
Components/icons `PascalCase.tsx`; hooks `useCamelCase.ts`; api/lib/mocks/utils `kebab-case.ts`; planned `*.types.ts`, `*.enums.ts`, `*.constants.ts` in `types/`, `enums/`, `constants/`.

The README is written in Portuguese; code comments in the codebase are mostly Portuguese too.
