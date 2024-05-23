import { SvgComponentProps } from '@/types/types.type'

const PrimaryUncheckIcon = ({ svgProps, rectProps, pathProps }: SvgComponentProps) => (
  <svg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
    <rect y='0.5' width='20' height='20' rx='4' fill='#2D68FE' {...rectProps} />
    <path
      d='M14.6668 7L8.25016 13.4167L5.3335 10.5'
      stroke='white'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...pathProps}
    />
  </svg>
)
export default PrimaryUncheckIcon
