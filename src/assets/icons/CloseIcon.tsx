import type { SvgProps } from '@/assets/types'

export function CloseIcon({ size, className, ...props }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 13 13"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.5 0.5L6.5 6.5M6.5 6.5L12.5 12.5M6.5 6.5L12.5 0.5M6.5 6.5L0.5 12.5"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  )
}
