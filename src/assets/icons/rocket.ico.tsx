import { SvgComponentProps } from '@/types/types.type'
const RocketIcon = ({ svgProps, pathProps, rectProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={40} height={40} fill='none' {...svgProps}>
    <rect width={40} height={40} fill='#EF2B2A' rx={20} {...rectProps} />
    <path
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='m20 23-3-3m3 3a22.342 22.342 0 0 0 4-2m-4 2v5s3.03-.55 4-2c1.08-1.62 0-5 0-5m-7-1a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 30 10c0 2.72-.78 7.5-6 11m-7-1h-5s.55-3.03 2-4c1.62-1.08 5 0 5 0m-6.5 8.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z'
      {...pathProps}
    />
  </svg>
)
export default RocketIcon
