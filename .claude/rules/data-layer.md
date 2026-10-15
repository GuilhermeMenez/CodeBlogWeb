---
paths:
  - 'src/api/**'
  - 'src/hooks/**'
  - 'src/lib/**'
  - 'src/mocks/**'
---

# Camada de dados

Fluxo fixo: `pages/components → hooks/use*.ts → api/*.ts → api/client.ts`. Página e componente nunca importam `api/` nem `axios`; hook nunca importa componente.

## Schemas (`src/api/schemas/<domínio>.ts`)

- O schema Zod é a fonte de verdade. Tipos saem de `z.infer`; não declarar `interface` paralela.
- Ordem das seções no arquivo: schemas de entidade → schemas de entrada (derivados com `.pick()`/`.partial()` sempre que possível) → tipos inferidos.
- Mensagens de validação de formulário ficam no schema, em português (ver `loginSchema` em `schemas/auth.ts`).
- Paginação: reusar `paginatedResponseSchema(itemSchema)`, `PaginationParams` e `PaginatedResponse<T>` de `schemas/common.ts`.

## Funções de API (`src/api/<domínio>.ts`)

- Um objeto por domínio (`postsApi`, `usersApi`, `authApi`), com tipo de retorno explícito.
- Toda resposta com corpo passa por `.parse()` do schema antes de retornar. Exceção consciente: respostas `void`.
- Não tratar erro aqui: o interceptor de `client.ts` já converte qualquer falha em `ApiError`.

## Erros

- Quem consome só vê `ApiError` (`src/api/api-error.ts`). Usar `isApiError()` e os helpers (`isUnauthorized`, `isNotFound`, `isValidationError`…); nunca `instanceof`, nunca `isAxiosError` fora de `client.ts`.
- Texto para o usuário: `getErrorMessage(error)`.

## Hooks (`src/hooks/use<Domínio>.ts`)

- Um arquivo por domínio, dividido em `// ======= Queries =======` e `// ======= Mutations =======`. Não criar `useQuery`/`useMutation` dentro de páginas ou componentes.
- `queryKey` sempre vem de `queryKeys` em `src/lib/query-client.ts`. Chave nova entra lá, na hierarquia do domínio (`all → lists()/details() → list(params)/detail(id)`), para que invalidar o pai alcance os filhos.
- Query que depende de parâmetro usa `enabled` (ex.: `enabled: !!id`).
- Toda mutation acerta o cache no `onSuccess`: `setQueryData` quando a resposta já traz a entidade, `invalidateQueries` nas listas afetadas, `removeQueries` ao excluir. Ver `useUpdatePost` e `useDeletePost`.
- Os defaults do `QueryClient` já cobrem `staleTime` e retry (só 408/429/5xx/rede, uma vez). Sobrescrever apenas com motivo, comentado.

## Mocks (`src/mocks`)

- Todo endpoint tem handler em `handlers/<domínio>.ts`; o app precisa funcionar inteiro com `VITE_ENABLE_MOCKS=true`.
- Caminho com curinga de origem: `http.get('*/posts/:id', …)`.
- Ordem importa: rota estática antes da paramétrica (`*/posts/feed` antes de `*/posts/:id`).
- Dados e funções de busca ficam em `mocks/data/<domínio>.ts`, tipados com os tipos de `api/schemas`, e são reexportados em `mocks/data/index.ts`. Nada de dados inline no handler.
- Sempre `await delay(…)`. Endpoints autenticados conferem o header `Authorization: Bearer` e devolvem 401; erros usam o formato `{ message }` com o status correto (404, 403…), que é o que `apiErrorResponseSchema` espera.
- Listas usam `paginate()` e `extractPaginationParams()` de `mocks/utils/pagination.ts`.
- Domínio novo: registrar os handlers em `mocks/handlers/index.ts`.
