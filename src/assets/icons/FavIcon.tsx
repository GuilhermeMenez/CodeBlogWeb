import type { SvgProps } from '@/assets/types'

export function FavIcon({ size, className, ...props }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 17"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.5039 0C11.78 6.95666e-05 12.0039 0.223901 12.0039 0.5V15.7002C12.0038 15.882 11.9051 16.0497 11.7461 16.1377C11.5869 16.2257 11.3923 16.2197 11.2383 16.123L6.00195 12.8359L0.765625 16.123C0.611544 16.2198 0.417021 16.2257 0.257812 16.1377C0.0987642 16.0497 7.06978e-05 15.882 0 15.7002V0.5C0 0.223888 0.2239 4.94723e-05 0.5 0H11.5039ZM1 14.7949L5.46973 11.9893C5.79476 11.7852 6.20812 11.7853 6.5332 11.9893L11.0039 14.7949V1H1V14.7949Z"
        fill="currentColor"
      />
    </svg>
  )
}
