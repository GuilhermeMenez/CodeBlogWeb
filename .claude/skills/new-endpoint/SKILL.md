---
name: new-endpoint
description: Adiciona um endpoint da API de ponta a ponta na camada de dados — schema Zod, função em src/api, chave em queryKeys, hook TanStack Query e handler MSW com dados mock. Use ao integrar um endpoint novo do backend ou ao criar um domínio novo (ex.: comentários, favoritos).
argument-hint: '<MÉTODO> <caminho> — o que o endpoint faz'
---

# Novo endpoint (fatia vertical)

Pedido: $ARGUMENTS

As convenções detalhadas estão em `.claude/rules/data-layer.md`. Esta skill é a ordem de execução.

## 0. Fechar o contrato antes de escrever código

O backend é outro repositório, então o contrato precisa estar explícito. Confirme, a partir do pedido ou da spec em `specs/`:

- método e caminho;
- corpo e query params de entrada;
- formato da resposta de sucesso (entidade, lista paginada ou vazio);
- se exige autenticação;
- erros esperados (404, 403, 422…).

Se algum desses pontos não estiver definido e não der para deduzir de um endpoint vizinho do mesmo domínio, pergunte antes de seguir. Não invente campos.

Identifique o domínio (`auth`, `posts`, `users` ou um novo) e leia os quatro arquivos dele para seguir o estilo local: `src/api/schemas/<domínio>.ts`, `src/api/<domínio>.ts`, `src/hooks/use<Domínio>.ts`, `src/mocks/handlers/<domínio>.ts`.

## 1. Schema — `src/api/schemas/<domínio>.ts`

- Reaproveite o schema de entidade existente; derive a entrada com `.pick()` / `.partial()`.
- Exporte os tipos com `z.infer` na seção de tipos inferidos.
- Lista paginada: `paginatedResponseSchema(itemSchema)` de `schemas/common.ts`.

## 2. Função de API — `src/api/<domínio>.ts`

- Novo método no objeto `<domínio>Api`, com retorno tipado e `.parse()` da resposta.
- Sem `try/catch`: o interceptor já devolve `ApiError`.

## 3. Query key — `src/lib/query-client.ts`

- Só para leituras. Acrescente a chave na hierarquia do domínio em `queryKeys`, de modo que invalidar o nível de cima alcance a nova chave.

## 4. Hook — `src/hooks/use<Domínio>.ts`

- Leitura: `useQuery` com a chave do passo 3 e `enabled` quando depender de parâmetro.
- Escrita: `useMutation` com `onSuccess` acertando o cache. Liste quais queries existentes ficam desatualizadas com essa escrita e trate cada uma (`setQueryData`, `invalidateQueries` ou `removeQueries`).

## 5. Mock — `src/mocks`

- Dados e funções de busca em `mocks/data/<domínio>.ts`, reexportados em `mocks/data/index.ts`.
- Handler em `mocks/handlers/<domínio>.ts` com caminho `'*/…'`, `await delay()`, checagem de `Authorization` se o endpoint for autenticado e erros no formato `{ message }`.
- Posicione o handler **antes** de qualquer rota paramétrica que o capturaria (ex.: `*/posts/feed` antes de `*/posts/:id`).
- A resposta do mock precisa passar no schema do passo 1 — confira campo a campo.

## Domínio novo

Além dos passos acima: criar os quatro arquivos, um bloco próprio em `queryKeys` e registrar os handlers em `src/mocks/handlers/index.ts`.

## 6. Verificar

1. `npm run check`.
2. Se o endpoint já é consumido por alguma tela, subir o app com mocks (`/run`, com `VITE_ENABLE_MOCKS=true`) e conferir a tela.
3. Relatar: arquivos alterados, o contrato assumido e qualquer ponto que dependa de confirmação do backend.

Não crie a tela junto, a menos que tenha sido pedido: esta skill entrega a camada de dados pronta para ser consumida.
