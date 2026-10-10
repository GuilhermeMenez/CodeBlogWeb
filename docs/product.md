# Code Blog — visão de produto

Documento único de produto do frontend. Diz o que o Code Blog é, para quem, o que já existe e o que vem a seguir. Features grandes ganham uma spec própria em [`specs/`](../specs/README.md); este arquivo é atualizado quando uma delas é concluída.

> O conteúdo abaixo foi deduzido do código em 2026-10-09. O que não pôde ser confirmado no código está em [Suposições a confirmar](#suposições-a-confirmar).

## O que é

Uma plataforma de publicação e leitura de artigos sobre tecnologia. Qualquer pessoa cadastrada pode ler, escrever e seguir outros autores. A proposta, como está na landing: "Histórias, ideias e tecnologia — leia, escreva e compartilhe conhecimento com a comunidade".

## Para quem

- **Leitor** — acompanha um feed de artigos, guarda os que quer reler e segue autores.
- **Escritor** — publica artigos em seu próprio perfil e acompanha quem o segue.

Toda conta é as duas coisas; não há papéis separados.

## Mapa de funcionalidades

Legenda: **Pronto** (tela e dados funcionando com mocks) · **Dados prontos** (schema, API, hook e mock existem; falta a tela) · **Só a tela** (rota ou botão existe, sem comportamento) · **Não iniciado**.

| Área | Funcionalidade | Rota | Situação |
|---|---|---|---|
| Acesso | Landing pública | `/` | Pronto |
| Acesso | Entrar com email e senha | `/` (diálogo) | Pronto |
| Acesso | Cadastro com nome, email e senha | `/` (diálogo) | Pronto |
| Acesso | Sair | menu da conta | Dados prontos |
| Acesso | Verificação por código (OTP) | — | Só o componente `OtpInput` |
| Leitura | Feed de artigos | `/feed` | Dados prontos |
| Leitura | Página do artigo | `/$writer/$postId` | Dados prontos |
| Leitura | Busca de artigos e de autores | botão no cabeçalho | Dados prontos |
| Leitura | Favoritos (biblioteca) | `/me/library` | Só a tela |
| Escrita | Criar, editar e excluir artigo | botão "Novo post" | Dados prontos |
| Social | Perfil público do autor | `/$writer` | Dados prontos |
| Social | Seguir e deixar de seguir | — | Dados prontos |
| Social | Lista de quem eu sigo | `/me/following` | Dados prontos |
| Conta | Editar perfil (nome, bio, avatar) | `/me/settings` | Dados prontos |
| Conta | Notificações | sino no cabeçalho | Só a tela |
| Base | Shell autenticado (menu lateral, cabeçalho, menu da conta) | `_app` | Pronto |
| Base | Design system (Button, Input, OtpInput, Dialog, Dropdown, Avatar, Loader) | `/design-system` | Pronto |

Leitura do quadro: a camada de dados de `auth`, `posts` e `users` está completa e mockada, e a base visual está pronta. O trabalho que falta é, em sua maior parte, **construir telas** sobre hooks que já existem.

## Modelo de dados atual

Fonte de verdade: `src/api/schemas/`.

- **User** — `id`, `name`, `email`, `avatar?`, `createdAt`.
- **UserProfile** — o anterior mais `bio?`, `followersCount`, `followingCount`.
- **Post** — `id`, `title`, `content`, `excerpt?`, `authorId`, `authorName`, `tags?`, `createdAt`, `updatedAt`.

O conteúdo dos posts nos mocks é Markdown.

## Fora de escopo

Não existe nada no código, nem indício de intenção, para: comentários, curtidas ou reações, moderação, área administrativa, monetização, internacionalização (a interface é só em português) e tema claro (só há tema escuro em uso).

## Restrições que afetam decisões de produto

- **Backend em outro repositório, com outro dev.** O frontend avança com mocks (MSW); todo endpoint novo precisa de contrato combinado. É para isso que as specs trazem o contrato em Zod.
- **Política de dependências rígida** (`docs/security.md`). Funcionalidades que normalmente puxam bibliotecas — editor de texto rico, renderização de Markdown, realce de código — têm custo de adoção maior e precisam ser decididas cedo.
- **Sem testes automatizados e sem CI.** A verificação é `npm run check` mais conferência manual com mocks.

## Próximos passos sugeridos

Ordem pensada para entregar valor visível cedo, usando o que já está pronto na camada de dados:

1. **Feed e página do artigo** — o núcleo de leitura. Exige decidir como renderizar Markdown (primeira decisão de dependência).
2. **Perfil do autor e seguir** — fecha o ciclo descobrir → ler → seguir.
3. **Editor de artigo** (criar e editar) — a maior feature; merece spec.
4. **Favoritos** — precisa de endpoints novos; merece spec curta.
5. **Configurações da conta**, depois **busca** e **notificações**.

## Suposições a confirmar

Pontos em que o código não é conclusivo. Corrigir aqui quando houver resposta.

1. **Público-alvo**: assumi desenvolvedores e pessoas de tecnologia escrevendo em português, pelo nome do produto e pelo idioma da interface.
2. **Formato do conteúdo**: assumi Markdown porque os mocks usam; o schema só diz `string`. Isso define o editor e o renderizador.
3. **Papel do `$writer` na URL**: a rota é `/$writer/$postId`, mas `User` não tem `username` nem slug. Ou a URL usa o `id`, ou falta um campo no contrato.
4. **Favoritos**: existem a rota e o item de menu, mas nenhum endpoint, schema ou campo no `Post`. Assumi "salvar para ler depois", privado.
5. **OTP**: existe só o componente. Não está claro se é verificação de email no cadastro, login sem senha ou segundo fator.
6. **Rota `/me`**: o item "Perfil" do menu lateral aponta para `/me`, que não existe como página (há `/me/library`, `/me/following` e `/me/settings`). Ou falta a página, ou o item deveria levar ao perfil público do usuário (`/$writer`).
7. **Menu da conta**: todos os itens (configurações, ajuda, sair…) apontam hoje para `/me/settings`; o destino real de cada um não está definido.
8. **Ordem dos próximos passos**: é uma sugestão técnica, não uma prioridade de produto confirmada.
