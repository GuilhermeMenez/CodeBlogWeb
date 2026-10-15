import type { SvgProps } from '@/assets/types'

export function BellIcon({ size, className, ...props }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 17"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.95312 14.3067L5.95333 15.3067C5.95333 15.4381 5.99213 15.5681 6.06751 15.6894C6.14288 15.8107 6.25336 15.921 6.39264 16.0138C6.53192 16.1067 6.69727 16.1804 6.87924 16.2306C7.06122 16.2809 7.25626 16.3067 7.45323 16.3067C7.6502 16.3067 7.84524 16.2809 8.02722 16.2306C8.20919 16.1804 8.37454 16.1067 8.51382 16.0138C8.65309 15.921 8.76358 15.8107 8.83895 15.6894C8.91433 15.5681 8.95313 15.4381 8.95313 15.3067L8.95274 14.3067"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.3857 12.5154C14.4763 12.8832 14.241 13.241 13.8891 13.381C11.5894 14.2961 8.52905 14.2961 7.45313 14.2961"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.8891 13.381C14.241 13.241 14.4763 12.8832 14.3857 12.5154C14.0028 10.961 12.1195 11.3701 12.1195 6.12965C12.1195 3.8339 10.5707 1.88832 9.40398 1.45451"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.520531 12.5154C0.429967 12.8832 0.665174 13.241 1.01711 13.381C3.31679 14.2961 6.37721 14.2961 7.45313 14.2961"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.01711 13.381C0.665174 13.241 0.429967 12.8832 0.520531 12.5154C0.90331 10.9609 2.78645 11.3699 2.78645 6.12944C2.78645 3.83358 4.33549 1.88808 5.50228 1.45444"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.50228 1.45444C5.77728 1.35223 6.0589 1.23146 6.26986 1.02758C6.3296 0.969846 6.39241 0.912892 6.45313 0.864319C6.77969 0.603064 7.12161 0.5 7.45313 0.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.40398 1.45451C9.1289 1.35223 8.8472 1.23136 8.63618 1.0274C8.57651 0.969729 8.51378 0.912842 8.45313 0.864319C8.10812 0.588311 7.78465 0.5 7.45313 0.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
