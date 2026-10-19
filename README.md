# Code Blog Web

Aplicação web para blog de código desenvolvida com React 19 e tecnologias modernas de frontend.

---

## Índice

- [Stack](#-stack)
- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Segurança de Dependências](#-segurança-de-dependências)
- [Desenvolvimento com IA](#-desenvolvimento-com-ia)
- [Estrutura de Diretórios](#-estrutura-de-diretórios)
- [Padrões de Nomenclatura](#-padrões-de-nomenclatura)
- [Estrutura de Componentes](#-estrutura-de-componentes)

---

## Stack

| Categoria         | Tecnologia                                                  | Versão         |
|-------------------|-------------------------------------------------------------|----------------|
| **Framework**     | [React](https://react.dev/)                                 | 19             |
| **Linguagem**     | [TypeScript](https://www.typescriptlang.org/)               | 5.9 (strict)   |
| **Build Tool**    | [Vite](https://vite.dev/)                                   | 7              |
| **Estilização**   | [Tailwind CSS](https://tailwindcss.com/)                    | 4              |
| **Variantes**     | [Tailwind Variants](https://www.tailwind-variants.org/)     | 3              |
| **Merge Classes** | [Tailwind Merge](https://github.com/dcastil/tailwind-merge) | 3              |
| **UI Headless**   | [Base UI React](https://base-ui.com/)                       | 1              |
| **Validação**     | [Zod](https://zod.dev/)                                     | 4              |
| **HTTP Client**   | [Axios](https://axios-http.com/)                            | 1              |
| **Server State**  | [TanStack Query](https://tanstack.com/query)                | 5              |
| **Roteamento**    | [TanStack Router](https://tanstack.com/router)              | 1 (file-based) |
| **API Mocking**   | [Mock Service Worker](https://mswjs.io/)                    | 2              |
| **Lint/Format**   | [Biome](https://biomejs.dev/)                               | 2              |

---

## Requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 20.x
- **npm** >= 10.x (gerenciador de pacotes padrão do projeto)

---

## Instalação

> **Importante**: Este projeto segue uma política de segurança para a cadeia de suprimentos.
> Siga [`docs/security.md`](docs/security.md) para instalar dependências com segurança e execute `npm run security:check` antes de compilar ou publicar.

### 1. Clone o repositório

```bash
git clone -c core.autocrlf=input <repository-url>
cd code-blog-web
```

> O projeto usa quebra de linha LF (o Biome falha com CRLF). O `-c core.autocrlf=input` impede que o Git converta para CRLF no Windows. Em um clone já existente: `git config core.autocrlf input`, depois reconverta os arquivos (`git rm --cached -r . && git reset --hard`, com o working tree limpo).

### 2. Instale as dependências

```bash
npm ci
```

O `.npmrc` mantém `ignore-scripts=true`, então nenhum script de ciclo de vida de dependência é executado.
Para adicionar um pacote: `npm install <pacote>@<x.y.z>` (versão exata; `save-exact` já é padrão).

### 3. Configure as variáveis de ambiente

Crie um `.env` na raiz (nenhum arquivo `.env` é versionado):

```bash
VITE_API_URL='http://localhost:8080'   # URL do backend
VITE_ENABLE_MOCKS=true                 # true liga os mocks do MSW (só em dev)
```

> Não coloque segredos aqui: toda variável `VITE_*` vai para o bundle do navegador.

### 4. Inicie o servidor de desenvolvimento

```bash
npm start
```

A aplicação estará disponível em `http://localhost:5173`

---

## Scripts Disponíveis

| Script     | Comando            | Descrição                                            |
|------------|--------------------|------------------------------------------------------|
| `start`    | `npm start`        | Inicia o servidor de desenvolvimento                 |
| `build`    | `npm run build`    | Valida o lockfile, compila TypeScript e gera build de produção |
| `preview`  | `npm run preview`  | Visualiza o build de produção localmente             |
| `lint`     | `npm run lint`     | Executa o linter do Biome                            |
| `lint:fix` | `npm run lint:fix` | Aplica fixes seguros e formatação (Biome) |
| `typecheck` | `npm run typecheck` | Verifica os tipos com o TypeScript, sem gerar build |
| `check`    | `npm run check`    | `biome check` (lint + formatação) + `typecheck`; rodar antes de todo commit |
| `format`   | `npm run format`   | Formata o código com Biome (TS/JS/JSON/CSS)          |
| `security:lockfile` | `npm run security:lockfile` | Valida política do lockfile, `package.json` e `.npmrc` |
| `security:audit` | `npm run security:audit` | `npm audit` (high) + verificação de assinaturas do registry |
| `security:check` | `npm run security:check` | Lockfile + auditoria |

---

## Segurança de Dependências

- Política, comandos e runbook de incidente: [`docs/security.md`](docs/security.md)
- Checagem estrutural do lockfile: `pglock-check.mjs`

---

## Desenvolvimento com IA

O repositório vem configurado para o [Claude Code](https://claude.com/claude-code). A configuração é versionada em `.claude/` e vale para quem clonar o projeto.

| Onde | O que é |
|---|---|
| `CLAUDE.md` | Contexto do projeto carregado em toda sessão: comandos, arquitetura e fluxo de trabalho |
| `.claude/settings.json` | Permissões (o que roda sem perguntar, o que pede confirmação, o que é negado) e hooks |
| `.claude/hooks/` | `format.mjs` formata com Biome cada arquivo editado; `guard-npm.mjs` bloqueia comandos `npm` que violem a política de dependências |
| `.claude/rules/` | Convenções por área (dados, UI, rotas), carregadas só quando arquivos daquela área são tocados |
| `.claude/skills/` | Receitas invocáveis: `/new-endpoint`, `/new-ui-component`, `/add-dependency`, `/spec` |
| `docs/product.md` | Visão de produto e mapa de funcionalidades |
| `specs/` | Especificações de features grandes — ver [`specs/README.md`](specs/README.md) |

### Fluxo por tamanho de mudança

| Tamanho | Exemplo | Fluxo |
|---|---|---|
| Pequeno | Ajuste de estilo, bug pontual | Pedido direto → `npm run check` → commit |
| Médio | Tela nova consumindo endpoint novo | Plan mode → implementar → `npm run check` + app com mocks → `/code-review` → PR |
| Grande | Domínio novo, várias telas e endpoints | `/spec` → uma sessão por fatia → `/code-review` + `/security-review` → PR |

Preferências pessoais ficam em `.claude/settings.local.json`, que não é versionado.

---

## Estrutura de Diretórios

```
src/
├── api/
│   ├── schemas/                  # Schemas e tipos inferidos (auth, posts, users, common)
│   ├── client.ts                 # Configuração do cliente HTTP (Axios)
│   ├── auth.ts                   # Funções de chamadas API — autenticação
│   ├── posts.ts                  # Funções de chamadas API — posts
│   └── users.ts                  # Funções de chamadas API — usuários
│
├── assets/                       # Assets estáticos
│   └── icons/                    # Componentes de ícones SVG
│   ├── images/                   # Imagens e banners
│   └── svgs/                     # SVG estáticos e personalizáveis
│
├── components/
│   └── ui/                       # Componentes primitivos (Button, Input, etc.)
│
├── hooks/                        # Custom hooks (useAuth, usePosts, useUsers)
│
├── lib/                          # Configurações de bibliotecas externas
│
├── mocks/                        # Configurações de mocks (MSW)
│
├── pages/                        # Páginas (TanStack Router file-based)
│
├── types/                        # Definições de tipos e interfaces
├── enums/                        # Definições de enums
├── constants/                    # Constantes da aplicação
│
├── utils/                        # Funções utilitárias
│
├── App.tsx                       # Componente raiz da aplicação
├── index.css                     # Estilos globais e configuração Tailwind
├── main.tsx                      # Entry point da aplicação
└── route-tree.gen.ts             # Arquivo gerado pelo TanStack Router
```

---

## Padrões de Nomenclatura

| Tipo            | Convenção                  | Exemplo                           |
|-----------------|----------------------------|-----------------------------------|
| **Api**         | `kebab-case.ts`            | `client.ts`, `auth.ts`            |
| **Componentes** | `PascalCase.tsx`           | `Button.tsx`, `PostCard.tsx`      |
| **Ícones**      | `PascalCaseIcon.tsx`       | `PlusIcon.tsx`, `SearchIcon.tsx`  |
| **Hooks**       | `useCamelCase.ts`          | `usePosts.ts`, `useAuth.ts`       |
| **Lib**         | `kebab-case.ts`            | `query-client.ts`                 |
| **Mocks**       | `kebab-case.ts`            | `index.tsx`. `auth.ts`            |
| **Pages**       | TanStack Router file-based | `index.tsx`, `$postId/index.tsx`  |
| **Estilos**     | `kebab-case.css`           | `index.css`                       |
| **Types**       | `kebab-case.types.ts`      | `auth.types.ts`                   |
| **Enums**       | `kebab-case.enums.ts`      | `posts.enums.ts`                  |
| **Constantes**  | `kebab-case.constants.ts`  | `api.constants.ts`                |
| **Utilitários** | `kebab-case.ts`            | `format-date.ts`                  |

---

## Estrutura de Componentes

Os componentes seguem um padrão consistente utilizando **Tailwind Variants** para gerenciamento de variantes e **Tailwind Merge** para composição de classes.

### Exemplo de Componente

```tsx
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'
import type { ComponentProps } from 'react'

// 1. Definição das variantes com tailwind-variants
export const buttonVariants = tv({
  base: [
    'inline-flex cursor-pointer items-center justify-center font-medium rounded-lg border transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'data-disabled:pointer-events-none data-disabled:opacity-50',
  ],
  variants: {
    variant: {
      primary: 'border-primary bg-primary text-primary-foreground hover:bg-primary-hover',
      secondary: 'border-border bg-secondary text-secondary-foreground hover:bg-muted',
      ghost: 'border-transparent bg-transparent text-muted-foreground hover:text-foreground',
      destructive: 'border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90',
    },
    size: {
      sm: 'h-6 px-2 gap-1.5 text-xs [&_svg]:size-3',
      md: 'h-7 px-3 gap-2 text-sm [&_svg]:size-3.5',
      lg: 'h-9 px-4 gap-2.5 text-base [&_svg]:size-4',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

// 2. Interface do componente extendendo props nativas + variantes
export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {}

// 3. Componente funcional (sem forwardRef no React 19)
export function Button({ 
  className, 
  variant, 
  size, 
  disabled, 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button
      type="button"
      data-slot="button"
      data-disabled={disabled ? '' : undefined}
      className={twMerge(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
```

### Principais Características

- **React 19**: Não utiliza `forwardRef` (ref é passado automaticamente via props)
- **Tailwind Variants**: Gerencia variantes de estilo de forma type-safe
- **Tailwind Merge**: Permite sobrescrever classes via prop `className`
- **Data Attributes**: Utiliza `data-*` para estados (ex: `data-disabled`)
- **Tailwind CSS v4**: Utiliza `@theme` e CSS variables para tokens de design

---

## Licença

Este projeto é privado e de uso interno
