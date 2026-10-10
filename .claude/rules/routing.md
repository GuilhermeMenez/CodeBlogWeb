---
paths:
  - 'src/pages/**'
---

# Rotas (TanStack Router, file-based em `src/pages`)

- `src/route-tree.gen.ts` é gerado pelo plugin do Vite. Nunca editar; ele se atualiza com `npm start` ou `npm run build`. Depois de criar, mover ou renomear uma rota, rodar um dos dois antes do `npm run check`, senão o type-check acusa a rota como inexistente.
- O arquivo de layout de um grupo se chama `layout.tsx` (`routeToken: 'layout'` no `vite.config.ts`), não `route.tsx`.
- Grupos sem segmento na URL usam prefixo `_`:
  - `_auth` — área pública (landing com os diálogos de entrar/cadastrar).
  - `_app` — área autenticada, dentro do shell de `_app/layout.tsx` (`Navigation` + `Header`).
- Pastas com prefixo `-` (ex.: `-components/`) são ignoradas pelo roteador e guardam componentes locais da rota.
- Parâmetros de rota usam `$`: `_app/$writer/index.tsx`, `_app/$writer/$postId/index.tsx`.

## Arquivo de rota

```tsx
export const Route = createFileRoute('/_app/feed/')({
  component: Feed,
})

function Feed() { … }
```

- O caminho passado a `createFileRoute` é mantido pelo plugin; ao criar o arquivo, escrever o caminho correspondente à pasta.
- O componente da página é uma função local, não exportada. Título da aba via `head: () => ({ meta: [{ title: '…' }] })`.
- Página fina: busca dados pelos hooks de `src/hooks`, compõe componentes e trata os estados de carregamento, erro e vazio. Sem `axios`, sem `useQuery` inline.
- Navegação com `<Link to="…">` e `useNavigate()` tipados; não usar `<a href>` para rotas internas.
- Rota nova que deve aparecer no menu lateral entra em `navigationItems` de `_app/-components/Navigation.tsx`.
