import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

import { OTPField } from '@base-ui/react/otp-field'
import { Field } from '@base-ui/react/field'

const otpRootVariants = tv({
  base: 'flex items-center gap-4',
})

const otpInputVariants = tv({
  base: [
    'rounded-sm bg-black-20 text-white-40',
    'text-center font-inter font-medium',
    'border border-transparent outline-none caret-transparent',
    'focus-within:ring-1 focus-within:ring-white-20',
    'data-invalid:border-danger-40/50 data-invalid:focus:border-danger-40',
  ],
  variants: {
    size: {
      sm: 'w-8 h-11.5 text-base',
      md: 'w-10 h-13.5 text-xl',
      lg: 'w-12 h-15.5 text-2xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface OtpInputProps
  extends Omit<ComponentProps<typeof OTPField.Root>, 'children' | 'length'>,
    VariantProps<typeof otpInputVariants> {
  label?: string
  length?: number
  error?: string | null
  className?: string
  inputClassName?: string
}

export function OtpInput({
  label,
  length = 6,
  size,
  name,
  disabled,
  error,
  className,
  inputClassName,
  ...props
}: OtpInputProps) {
  return (
    <Field.Root
      name={name}
      data-slot="otp-field"
      invalid={!!error}
      className="group flex flex-col gap-2 w-fit data-disabled:pointer-events-none data-disabled:opacity-50"
      disabled={disabled}
    >
      {label && (
        <Field.Label
          data-slot="otp-label"
          className="block text-sm font-inter font-medium text-white-20"
        >
          {label}
        </Field.Label>
      )}

      <OTPField.Root
        data-slot="otp-root"
        length={length}
        className={twMerge(otpRootVariants(), className)}
        {...props}
      >
        {Array.from({ length }, (_, i) => (
          <OTPField.Input
            // biome-ignore lint/suspicious/noArrayIndexKey: inputs posicionais de tamanho fixo, nunca reordenados
            key={i}
            data-slot="otp-input"
            aria-label={i === 0 ? undefined : `Character ${i + 1} of ${length}`}
            className={twMerge(otpInputVariants({ size }), inputClassName)}
          />
        ))}
      </OTPField.Root>

      {error && (
        <Field.Error
          data-slot="otp-error"
          match={!!error}
          className="font-light text-sm text-center text-danger-30"
        >
          {error}
        </Field.Error>
      )}
    </Field.Root>
  )
}
