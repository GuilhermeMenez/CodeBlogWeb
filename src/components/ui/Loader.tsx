import { twMerge } from 'tailwind-merge'

type LoaderSizeKey = keyof typeof LoaderSizes

interface LoaderProps {
  size?: LoaderSizeKey
  className?: string
}

const LoaderSizes = {
  xl: 32,
  lg: 22,
  md: 18,
  sm: 14,
  xs: 12,
}

export function Loader({ size, className, ...props }: LoaderProps) {
  return (
    <div className={twMerge('text-white-40', className)}>
      <svg
        width={LoaderSizes[size || 'md']}
        height={LoaderSizes[size || 'md']}
        viewBox="0 0 18 18"
        fill="none"
        className="animate-spin"
        data-loader
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect
          x="0.7"
          y="0.7"
          width="16.6"
          height="16.6"
          rx="8.3"
          stroke="currentColor"
          strokeOpacity="0.04"
          strokeWidth="1.4"
        />
        <path
          d="M12.5442 17.2728C10.7554 18.0391 8.76654 18.205 6.87558 17.7457C4.98463 17.2863 3.29348 16.2265 2.05563 14.725C0.817793 13.2235 0.0999427 11.3613 0.00968504 9.41744C-0.0805707 7.47358 0.46163 5.55283 1.55501 3.94311C2.6484 2.33338 4.23406 1.12139 6.07432 0.488808C7.91458 -0.143773 9.91029 -0.162864 11.7623 0.434394C13.6143 1.03165 15.2229 2.21309 16.3469 3.8016C17.4709 5.39012 18.0497 7.30014 17.9967 9.24537L16.6292 9.20807C16.6742 7.55852 16.1833 5.93882 15.2302 4.59176C14.277 3.2447 12.913 2.24284 11.3424 1.73637C9.77193 1.22989 8.07956 1.24608 6.51902 1.78251C4.95848 2.31894 3.61384 3.34671 2.68665 4.71175C1.75946 6.0768 1.29968 7.7056 1.37621 9.35398C1.45275 11.0024 2.06149 12.5816 3.11118 13.8548C4.16087 15.1281 5.59496 16.0268 7.1985 16.4163C8.80203 16.8058 10.4886 16.6651 12.0054 16.0153L12.5442 17.2728Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}
