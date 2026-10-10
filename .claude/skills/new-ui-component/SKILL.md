---
name: new-ui-component
description: Cria um componente primitivo em src/components/ui no padrão do projeto (Base UI + tailwind-variants + tailwind-merge) e o registra na página /design-system. Use ao adicionar um componente reutilizável novo, como Select, Tooltip, Tabs, Checkbox, Textarea ou Badge.
argument-hint: '<Nome> — variantes, tamanhos e estados desejados'
---

# Novo componente de UI

Pedido: $ARGUMENTS

As convenções detalhadas estão em `.claude/rules/ui-components.md`. Esta skill é a ordem de execução.

## 1. Decidir a base

- Confira se já não existe em `src/components/ui/`. Se o pedido for uma variação de algo existente, prefira uma variante nova no componente atual.
- Procure o primitivo em `node_modules/@base-ui/react/docs/react/components/`. Havendo um, **leia o `.md` dele inteiro** (anatomia, props, atributos `data-*`) antes de escrever. Não havendo, use elemento HTML nativo.
- Leia o componente de referência mais parecido:
  - elemento nativo com variantes → `Button.tsx`;
  - campo de formulário com label e erro → `Input.tsx`, `OtpInput.tsx`;
  - sobreposição com animação → `Dialog.tsx`, `Dropdown.tsx`.

## 2. Escrever `src/components/ui/<Nome>.tsx`

- `tv()` por parte do componente; `defaultVariants` sempre definido.
- Nomes de variantes alinhados aos existentes: `variant` (`primary | secondary | ghost`), `size` (`sm | md | lg`).
- Props estendendo `ComponentProps` + `VariantProps`; função nomeada exportada; sem `forwardRef`.
- `twMerge(variants(...), className)`, `data-slot` em cada parte, `{...props}` no elemento raiz.
- Estados por `data-*`; apenas tokens do `@theme`; foco com `focus-ring`.
- Campo de formulário: aceitar `label` e `error`, usando `Field` do Base UI como em `OtpInput.tsx`.
- Ícone novo vai para `src/assets/icons/<Nome>Icon.tsx`, com `SvgProps`.

Faltando um token (cor, espaçamento, tamanho), adicione ao `@theme` em `src/index.css` e diga isso no relato final; não use valor arbitrário.

## 3. Registrar na vitrine

Adicione uma seção em `src/pages/design-system/index.tsx`, no mesmo formato das existentes (título `<p className="text-lg font-bold">`), cobrindo cada variante, cada tamanho e os estados (desabilitado, erro, carregando — os que se aplicarem).

## 4. Verificar

1. `npm run check`.
2. Subir o app (`/run`) e abrir `/design-system`: conferir visual, foco pelo teclado (Tab, Enter, Esc, setas quando fizer sentido) e os estados.
3. Relatar: API do componente (props e variantes), tokens adicionados e o que não foi possível conferir visualmente.
