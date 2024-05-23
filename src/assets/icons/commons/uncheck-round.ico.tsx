import { SvgComponentProps } from '@/types/types.type'
const UnCheckRoundIcon = ({ pathProps, svgProps }: SvgComponentProps) => (
  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
    <rect x='0.5' y='0.5' width='19' height='19' rx='9.5' fill='#2C2C34' />
    <rect x='0.5' y='0.5' width='19' height='19' rx='9.5' stroke='#7E7E86' />
    <path
      d='M14.6654 7L8.2487 13.4167L5.33203 10.5'
      stroke='#7E7E86'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...pathProps}
    />
  </svg>
)
export default UnCheckRoundIcon
