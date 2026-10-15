import type { ComponentProps, ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

import { Dialog as BaseDialog } from '@base-ui/react'
import { CloseIcon } from '@/assets/icons/CloseIcon'
import { Button } from './Button'

const dialogOverlayVariants = tv({
  base: [
    'fixed inset-0 z-50 bg-black/50',
    'transition-opacity duration-200 will-change-[opacity]',
    'data-open:opacity-100 data-closed:opacity-0 data-ending-style:opacity-0 data-starting-style:opacity-0',
    'supports-[-webkit-touch-callout:none]:absolute',
  ],
})

const dialogContentVariants = tv({
  base: [
    'fixed inset-0 z-50 h-fit m-auto',
    'flex flex-col gap-6 px-4 rounded-lg bg-black-40 shadow-xl',
    'transition-[opacity,scale] duration-200 will-change-[opacity,transform]',
    'data-open:opacity-100 data-open:scale-100',
    'data-closed:opacity-0 data-closed:scale-95',
    'data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0',
  ],
  variants: {
    size: {
      sm: 'w-full max-w-sm',
      md: 'w-full max-w-md',
      lg: 'w-full max-w-lg',
      xl: 'w-full max-w-2xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface DialogProps
  extends Omit<ComponentProps<typeof BaseDialog.Root>, 'children'>,
    VariantProps<typeof dialogContentVariants> {
  children?: ReactNode
  showCloseButton?: boolean
  showActions?: boolean
  primaryActionLabel?: string
  onPrimaryAction?: () => void
  secondaryActionLabel?: string
  onSecondaryAction?: () => void
  className?: string
  overlayClassName?: string
}

export function Dialog({
  children,
  size,
  showCloseButton,
  showActions,
  primaryActionLabel = 'Button',
  onPrimaryAction,
  secondaryActionLabel = 'Button',
  onSecondaryAction,
  className,
  overlayClassName,
  ...props
}: DialogProps) {
  return (
    <BaseDialog.Root {...props}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop
          data-slot="dialog-overlay"
          className={twMerge(dialogOverlayVariants(), overlayClassName)}
        />
        <BaseDialog.Popup
          data-slot="dialog-content"
          className={twMerge(dialogContentVariants({ size }), className)}
        >
          {showCloseButton && (
            <BaseDialog.Close
              data-slot="dialog-close"
              aria-label="Fechar"
              className={twMerge(
                'absolute top-3.5 right-3.5 w-7 h-7 inline-flex items-center justify-center rounded-md',
                'text-slate-50 hover:text-white-50 cursor-pointer',
                'focus-ring',
              )}
            >
              <CloseIcon className="size-3" />
            </BaseDialog.Close>
          )}

          <div data-slot="dialog-body" className="flex-1">
            {children}
          </div>

          {showActions && (
            <div data-slot="dialog-actions" className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onSecondaryAction}
                data-slot="dialog-secondary-action"
              >
                {secondaryActionLabel}
              </Button>

              <Button
                type="button"
                variant="primary"
                onClick={onPrimaryAction}
                data-slot="dialog-primary-action"
              >
                {primaryActionLabel}
              </Button>
            </div>
          )}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

// Compound components
export const DialogTrigger = BaseDialog.Trigger
export const DialogTitle = BaseDialog.Title
export const DialogDescription = BaseDialog.Description
export const DialogClose = BaseDialog.Close
