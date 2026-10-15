import type { ComponentProps, ReactNode, ReactElement } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'
import { Menu } from '@base-ui/react'

const dropdownPopupVariants = tv({
  base: [
    'relative top-1.25 -right-1.5 rounded-sm bg-black-30 opacity-0 outline-none z-50',
    'transition-opacity duration-150 will-change-[opacity,transform]',
    'data-open:opacity-100 data-closed:opacity-0',
    'data-starting-style:opacity-0 data-ending-style:opacity-0',
    'shadow-[0_0_4px_rgba(0,0,0,0.05),0_2px_8px_rgba(0,0,0,0.15)]',
    'origin-top-right',
  ],
  variants: {
    size: {
      sm: 'w-[186px] p-2',
      md: 'w-[240px] px-3.5 py-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface DropdownProps
  extends Omit<ComponentProps<typeof Menu.Root>, 'children'>,
    VariantProps<typeof dropdownPopupVariants> {
  trigger: ReactElement
  children?: ReactNode
  showArrow?: boolean
  className?: string
}

export function Dropdown({
  trigger,
  children,
  size,
  showArrow = true,
  className,
  ...props
}: DropdownProps) {
  return (
    <Menu.Root {...props}>
      <Menu.Trigger render={trigger} />
      <Menu.Portal>
        <Menu.Positioner side="bottom" align="end" sideOffset={8}>
          <Menu.Popup
            data-slot="dropdown"
            className={twMerge(dropdownPopupVariants({ size }), className)}
          >
            {showArrow && (
              <div
                data-slot="dropdown-arrow"
                aria-hidden="true"
                className="absolute -top-1.75 right-4 size-0 border-x-8 border-b-10 border-x-transparent border-b-black-30"
              />
            )}
            {children}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

// Compound components
export const DropdownTrigger = Menu.Trigger
export const DropdownItem = Menu.Item
export const DropdownGroup = Menu.Group
export const DropdownGroupLabel = Menu.GroupLabel
export const DropdownCheckboxItem = Menu.CheckboxItem
export const DropdownRadioGroup = Menu.RadioGroup
export const DropdownRadioItem = Menu.RadioItem
export const DropdownSubmenuTrigger = Menu.SubmenuTrigger
