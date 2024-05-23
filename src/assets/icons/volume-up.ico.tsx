import { SvgComponentProps } from '@/types/types.type'
const VolumeUpIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
    <circle cx='10' cy='10' r='10' fill='black' />
    <path d='M6.22876 9.77124H13.7712' stroke='#F7F8FA' strokeWidth='1.5' strokeMiterlimit='10' strokeLinecap='round' />
    <path
      d='M10 13.5425V6'
      stroke='#F7F8FA'
      strokeWidth='1.5'
      strokeMiterlimit='10'
      strokeLinecap='round'
      {...pathProps}
    />
  </svg>
)
export default VolumeUpIcon
