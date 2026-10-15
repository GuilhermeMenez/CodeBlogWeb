# Especificações

Specs de features grandes, escritas **antes** da implementação. Uma spec é um andaime: orienta a construção e sai de cena quando a feature está pronta.

## Quando abrir uma spec

| Tamanho | Exemplo | O que fazer |
|---|---|---|
| Pequeno | Ajuste de estilo, bug pontual, componente seguindo um padrão existente | Direto, sem documento |
| Médio | Uma tela nova consumindo um endpoint novo | Plan mode; sem spec |
| Grande | Domínio novo ou feature com várias telas e endpoints (editor de posts, comentários, autenticação por OTP) | **Spec** |

Na dúvida entre médio e grande: se não cabe em uma sessão de trabalho, ou se depende de um contrato de API ainda não combinado com o backend, é grande.

## Como criar

Use a skill `/spec <descrição>` no Claude Code, ou copie o template abaixo para `specs/NNN-slug.md` (`NNN` sequencial com três dígitos, `slug` em kebab-case — ex.: `001-editor-de-posts.md`).

## Template

```markdown
# NNN — <Nome da feature>

Status: rascunho | aprovada | em andamento

## Problema

O que o usuário não consegue fazer hoje e por que isso importa. Duas ou três frases.

## Escopo

- O que esta entrega inclui.

### Fora de escopo

- O que fica deliberadamente para depois.

## Critérios de aceitação

- [ ] Dado <contexto>, quando <ação>, então <resultado observável>.

## Contrato de API

| Método | Caminho | Auth | Resposta | Situação |
|---|---|---|---|---|
| GET | /exemplo/:id | sim | `exemploSchema` | existe / combinado / proposto |

    // schemas Zod prontos para src/api/schemas/<domínio>.ts
    export const exemploSchema = z.object({ … })

Erros relevantes: 404 quando …; 403 quando …

## Telas e rotas

| Rota | Arquivo | O que mostra |
|---|---|---|
| /exemplo | src/pages/_app/exemplo/index.tsx | … |

Estados de cada tela: carregando, vazio, erro, sem permissão.
Componentes novos de `components/ui` necessários: …

## Fatias de implementação

Cada fatia é vertical, cabe em uma sessão e termina com `npm run check` verde e o app funcionando com mocks.

- [ ] 1. Camada de dados: schemas, api, queryKeys, hooks e mocks de … (`/new-endpoint`)
- [ ] 2. Tela … com estados de carregamento, vazio e erro
- [ ] 3. …

## Decisões

- <decisão> — <motivo em uma linha>.

## Em aberto

- <pergunta> — quem responde.
```

## Ciclo de vida

1. **Rascunho** — a spec é escrita e revisada. Endpoints marcados como `proposto` são alinhados com o backend antes da fatia que depende deles.
2. **Em andamento** — uma fatia por sessão: "implemente a fatia N de specs/NNN-slug.md", em plan mode. Ao terminar a fatia, marcar o checkbox e fazer o commit.
3. **Conclusão** — o que virou regra durável vai para `CLAUDE.md` ou `.claude/rules/`; o que mudou no produto vai para `docs/product.md`. Depois disso a spec é **apagada** no mesmo PR que conclui a feature. O histórico do Git a preserva.

Não manter specs concluídas na pasta: um documento que descreve um plano já executado desatualiza rápido e passa a competir com o código como fonte de verdade.
