import { SvgComponentProps } from '@/types/types.type'
const CloseCircleSmIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 21' width={20} height={21} fill='none' {...svgProps}>
    <path
      stroke='#9F9EA4'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='m12.5 8.001-5 5m0-5 5 5m5.834-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0Z'
      {...pathProps}
    />
  </svg>
)
export default CloseCircleSmIcon
