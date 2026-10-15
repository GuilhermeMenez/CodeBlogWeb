import type { SvgProps } from '@/assets/types'

export function PlusIcon({ size, className, ...props }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.73535 0C4.98386 2.55392e-05 5.18555 0.201683 5.18555 0.450195V4.28516H9.02051C9.26886 4.28537 9.4707 4.48695 9.4707 4.73535C9.47066 4.98371 9.26883 5.18534 9.02051 5.18555H5.18555V9.02051C5.18551 9.26899 4.98383 9.47068 4.73535 9.4707C4.48685 9.4707 4.28519 9.269 4.28516 9.02051V5.18555H0.450195C0.201697 5.18555 4.77545e-05 4.98384 0 4.73535C0 4.48682 0.201667 4.28516 0.450195 4.28516H4.28516V0.450195C4.28516 0.201667 4.48682 0 4.73535 0Z"
        fill="currentColor"
      />
    </svg>
  )
}
