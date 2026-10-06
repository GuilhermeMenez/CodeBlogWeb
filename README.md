# Code Blog Web

Aplicação web para blog de código desenvolvida com React 19 e tecnologias modernas de frontend.

---

## Índice

- [Stack](#-stack)
- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Segurança de Dependências](#-segurança-de-dependências)
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
| **Linter**        | [ESLint](https://eslint.org/)                               | 9              |
| **Formatter**     | [Prettier](https://prettier.io/)                            | 3              |

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
git clone <repository-url>
cd code-blog-web
```

### 2. Instale as dependências

```bash
npm ci
```

O `.npmrc` mantém `ignore-scripts=true`, então nenhum script de ciclo de vida de dependência é executado.
Para adicionar um pacote: `npm install <pacote>@<x.y.z>` (versão exata; `save-exact` já é padrão).

### 3. Configure as variáveis de ambiente

Copie o modelo e ajuste os valores (o `.env` não é versionado):

```bash
cp .env.example .env
```

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
| `lint`     | `npm run lint`     | Executa o ESLint para verificar problemas no código  |
| `lint:fix` | `npm run lint:fix` | Executa o ESLint e corrige problemas automaticamente |
| `format`   | `npm run format`   | Formata o código com Prettier                        |
| `security:lockfile` | `npm run security:lockfile` | Valida política do lockfile, `package.json` e `.npmrc` |
| `security:audit` | `npm run security:audit` | `npm audit` (high) + verificação de assinaturas do registry |
| `security:check` | `npm run security:check` | Lockfile + auditoria |

---

## Segurança de Dependências

- Política, comandos e runbook de incidente: [`docs/security.md`](docs/security.md)
- Checagem estrutural do lockfile: `check-lockfile.mjs`

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
