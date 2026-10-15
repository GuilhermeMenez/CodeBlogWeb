import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

import { Field } from '@base-ui/react/field'
import { SearchIcon } from '@/assets/icons/SearchIcon'

const inputVariants = tv({
  base: [
    'flex items-center gap-3 text-md font-inter rounded-sm bg-black-20 text-white-40 border border-transparent group-data-invalid:border-danger-40/60',
  ],
  variants: {
    variant: {
      text: [
        'h-9.5 px-3',
        'focus-within:ring-1 focus-within:ring-white-20',
        'group-data-invalid:focus-within:ring-danger-40/50',
      ],
      search: [
        'h-11 px-4 [&_svg]:size-4.5',
        'focus-visible-within:ring-1 focus-visible-within:ring-white-20',
      ],
    },
  },
  defaultVariants: {
    variant: 'text',
  },
})

const inputIconVariants = tv({
  base: 'order-first flex items-center justify-center text-slate-50 peer-focus:text-white-40',
})

const inputControlVariants = tv({
  base: 'peer size-full bg-transparent outline-none text-white-40 placeholder:text-slate-50',
})

export interface InputProps
  extends Omit<ComponentProps<typeof Field.Control>, 'className'>,
    VariantProps<typeof inputVariants> {
  label?: string
  className?: string
}

export function Input({
  className,
  variant = 'text',
  label,
  disabled,
  name,
  ...props
}: InputProps) {
  const isSearch = variant === 'search'

  return (
    <Field.Root
      name={name}
      className="group w-full data-disabled:pointer-events-none data-disabled:opacity-50"
      disabled={disabled}
    >
      {label && (
        <Field.Label
          data-slot="input-label"
          className="block mb-2 text-sm font-inter font-medium text-white-20"
        >
          {label}
        </Field.Label>
      )}

      <div data-slot="input-wrapper" className={twMerge(inputVariants({ variant }), className)}>
        <Field.Control data-slot="input" className={inputControlVariants()} {...props} />

        {isSearch && <span className={inputIconVariants()}>{<SearchIcon />}</span>}
      </div>

      <Field.Error data-slot="input-error" className="mt-2.5 text-sm text-danger-30" />
    </Field.Root>
  )
}
