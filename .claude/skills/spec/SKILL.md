---
name: spec
description: Escreve a especificação de uma feature grande em specs/NNN-slug.md (problema, escopo, critérios de aceitação, contrato de API, telas e fatias de implementação) antes de qualquer código. Use para features que criam um domínio novo ou atravessam várias telas e endpoints.
argument-hint: '<descrição da feature>'
---

# Especificar uma feature

Pedido: $ARGUMENTS

O objetivo é um documento curto que permita implementar a feature em fatias, cada uma em uma sessão separada, sem reexplicar o contexto. Nenhum código de produção é escrito nesta skill.

## Quando não usar

Se a mudança cabe em uma sessão (ajuste pontual, um componente, uma tela consumindo um endpoint), diga isso e sugira plan mode. Critérios em `specs/README.md`.

## 1. Levantar contexto

- Leia `docs/product.md` (onde a feature se encaixa no produto) e `specs/README.md` (template e ciclo de vida).
- Leia o código que a feature toca: rotas em `src/pages`, schemas em `src/api/schemas`, hooks e mocks do domínio. A spec deve partir do que já existe — cite arquivos reais.

## 2. Perguntar só o que o código não responde

Use AskUserQuestion, em uma única rodada de até 4 perguntas, para as decisões que mudam o desenho. Em geral:

- o que fica **fora** do escopo desta entrega;
- o contrato de API: já existe no backend, está combinado ou será proposto por esta spec;
- comportamento nos estados não óbvios (vazio, erro, sem permissão);
- existe layout de referência (Figma, imagem) ou o desenho segue os componentes atuais.

Não pergunte o que dá para decidir com um padrão sensato; registre a decisão em "Decisões".

## 3. Escrever `specs/NNN-slug.md`

`NNN` é o próximo número livre em `specs/` (três dígitos); `slug` em kebab-case. Siga o template de `specs/README.md` e estas regras:

- **Critérios de aceitação** verificáveis por alguém usando o app, no formato "Dado / Quando / Então" ou em frase direta e observável.
- **Contrato de API** já como schemas Zod, prontos para colar em `src/api/schemas/`, mais a tabela de endpoints. Marque cada endpoint como `existe`, `combinado` ou `proposto`.
- **Fatias de implementação** verticais e independentes: cada uma entrega algo visível com mocks ligados, cabe em uma sessão e termina com `npm run check` verde. Ordene por dependência. A primeira costuma ser a camada de dados (`/new-endpoint`).
- Tamanho-alvo: uma a duas páginas. Se passar disso, a feature provavelmente são duas.

## 4. Fechar

- Mostre um resumo da spec e os pontos que continuam em aberto.
- Se algum endpoint ficou `proposto`, destaque: é o que precisa ser alinhado com o backend antes da fatia correspondente.
- Não comece a implementar. A implementação é fatia a fatia, em sessões novas: "implemente a fatia 1 de specs/NNN-slug.md".
