import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

import { Loader } from './Loader'

const buttonVariants = tv({
  base: [
    'relative inline-flex justify-center items-center font-inter font-light rounded-md border select-none cursor-pointer focus-ring',
    'data-disabled:pointer-events-none data-disabled:opacity-50',
  ],
  variants: {
    variant: {
      primary: ['bg-accent-50 text-white-50 border-transparent', 'hover:bg-accent-40'],
      secondary: [
        'bg-transparent text-white-30 border-slate-50',
        'hover:text-white-50 hover:border-white-20',
      ],
      ghost: ['bg-transparent text-white-30 border-transparent', 'hover:text-white-50'],
    },
    size: {
      sm: 'h-7 px-2 gap-1 text-xs [&_svg:not([data-loader])]:size-3',
      md: 'h-8 px-3 gap-1.5 text-md [&_svg:not([data-loader])]:size-3.5',
      lg: 'h-9.5 px-4 gap-2 text-md [&_svg:not([data-loader])]:size-4',
    },
    iconOnly: {
      true: 'px-0 aspect-square',
      false: '',
    },
  },
  compoundVariants: [
    { size: 'sm', iconOnly: true, class: 'w-7' },
    { size: 'md', iconOnly: true, class: 'w-8' },
    { size: 'lg', iconOnly: true, class: 'w-10' },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    iconOnly: false,
  },
})

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  loading?: boolean
  fullWidth?: boolean
}

export function Button({
  className,
  variant,
  size,
  iconOnly,
  loading,
  fullWidth,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      data-slot="button"
      data-disabled={disabled ? '' : undefined}
      aria-disabled={disabled}
      className={twMerge(
        buttonVariants({ variant, size, iconOnly }),
        loading && 'text-transparent pointer-events-none',
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {loading && (
        <div className="absolute w-full inset-0 inline-flex justify-center items-center">
          <Loader size={size} />
        </div>
      )}

      {children}
    </button>
  )
}
