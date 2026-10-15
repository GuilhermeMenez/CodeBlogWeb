import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

import { Avatar as BaseAvatar } from '@base-ui/react'

const avatarVariants = tv({
  base: [
    'relative inline-flex shrink-0 justify-center items-center rounded-full overflow-hidden select-none',
    'text-white-50 bg-slate-30',
  ],
  variants: {
    size: {
      small: 'size-5',
      medium: 'size-8',
      large: 'size-12',
      giant: 'size-14',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

const avatarLetterVariants = tv({
  base: 'font-inter font-normal leading-none uppercase',
  variants: {
    size: {
      small: 'text-[0.625rem]',
      medium: 'text-[1rem]',
      large: 'text-[1.5rem]',
      giant: 'text-[1.75rem]',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

export interface AvatarProps
  extends Omit<ComponentProps<typeof BaseAvatar.Root>, 'children'>,
    VariantProps<typeof avatarVariants> {
  src?: string
  letter?: string
  className?: string
  imageClassName?: string
  fallbackClassName?: string
  overlayClassName?: string
}

export function Avatar({
  src,
  letter,
  size,
  className,
  imageClassName,
  fallbackClassName,
  overlayClassName,
  ...props
}: AvatarProps) {
  const fallbackText = letter?.trim().slice(0, 2).toUpperCase() || '?'

  return (
    <BaseAvatar.Root
      data-slot="avatar"
      className={twMerge(avatarVariants({ size }), className)}
      {...props}
    >
      <BaseAvatar.Image
        data-slot="avatar-image"
        src={src}
        alt={letter ? `Avatar de ${letter}` : 'Avatar do usuário'}
        className={twMerge('size-full object-cover', imageClassName)}
      />

      <BaseAvatar.Fallback
        data-slot="avatar-fallback"
        className={twMerge(
          'inline-flex items-center justify-center size-full text-white-50 bg-slate-40',
          avatarLetterVariants({ size }),
          fallbackClassName,
        )}
      >
        {fallbackText}
      </BaseAvatar.Fallback>

      <span
        data-slot="avatar-overlay"
        className={twMerge(
          'absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 pointer-events-none',
          overlayClassName,
        )}
      />
    </BaseAvatar.Root>
  )
}

// Compound components
export const AvatarRoot = BaseAvatar.Root
export const AvatarImage = BaseAvatar.Image
export const AvatarFallback = BaseAvatar.Fallback
