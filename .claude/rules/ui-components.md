---
paths:
  - 'src/components/**'
  - 'src/pages/**/-components/**'
  - 'src/pages/design-system/**'
  - 'src/assets/icons/**'
  - 'src/index.css'
---

# Componentes de UI

Referências vivas do padrão: `src/components/ui/Button.tsx` (elemento nativo) e `src/components/ui/OtpInput.tsx` (primitivo do Base UI). Ler uma delas antes de criar um componente.

## Onde cada coisa mora

- `src/components/ui/` — primitivos reutilizáveis, sem regra de negócio e sem chamada de dados.
- `src/components/<grupo>/` — composições reutilizáveis com alguma regra (ex.: `dropdowns/AccountDropdown.tsx`).
- `src/pages/<rota>/-components/` — componente usado por uma única rota.

## Anatomia de um componente

1. Variantes com `tv()` em uma constante `<nome>Variants` (`base`, `variants`, `defaultVariants`; `compoundVariants` quando duas variantes interagem). Componente com várias partes tem um `tv()` por parte.
2. Props: `interface XxxProps extends ComponentProps<'el'>, VariantProps<typeof xxxVariants>`. Para primitivo do Base UI, `ComponentProps<typeof Primitivo.Root>`, com `Omit` do que o componente controla.
3. Função nomeada exportada (`export function Xxx`), sem `forwardRef` (React 19: `ref` é prop) e sem `export default`.
4. `className={twMerge(xxxVariants({ … }), className)}` — o `className` de quem usa sempre vence.
5. `data-slot="<nome>"` em cada parte; `{...props}` por último no elemento raiz.

## Estado e estilo

- Estado visual via atributo `data-*`, estilizado com variante do Tailwind (`data-disabled:opacity-50`, `data-invalid:…`, `data-open:…`). Em elemento nativo, emitir o atributo junto com o nativo, como o `Button` faz com `disabled` + `data-disabled`.
- Só tokens do `@theme` em `src/index.css`: cores `white|slate|black|accent|success|danger-{20..50}`, fontes `font-inter|font-lusitana|font-source`, tamanhos `text-xs|sm|md`. Nada de hex ou valor arbitrário quando existe token. Token novo entra no `@theme`, não inline.
- Foco: classe utilitária `focus-ring`. Outras utilitárias do projeto: `header-item`, `icon-box`, `dot`.
- Ícone dentro de componente dimensiona por seletor (`[&_svg]:size-3.5`), não por prop.

## Base UI

- Comportamento complexo (dialog, dropdown, campo, OTP, tooltip…) vem de `@base-ui/react`; não reimplementar foco, teclado ou ARIA à mão.
- A documentação da versão instalada está no próprio pacote: `node_modules/@base-ui/react/docs/react/components/<nome>.md`. Ler antes de usar um primitivo, em vez de confiar na memória — a API mudou entre versões.
- As animações usam os atributos `data-starting-style` / `data-ending-style` (ver `Dialog.tsx`).

## Acessibilidade

- Botão só com ícone precisa de `aria-label`. Textos de interface e `aria-label` em português.
- `button` sempre com `type` explícito.

## Ícones (`src/assets/icons/XxxIcon.tsx`)

- Recebem `SvgProps` de `@/assets/types`, usam `fill="currentColor"` (ou `stroke`) e repassam `{...props}`. Ver `PlusIcon.tsx`.

## Vitrine

- Todo componente novo de `components/ui/` ganha uma seção em `src/pages/design-system/index.tsx` (rota `/design-system`) mostrando variantes, tamanhos e estados.
