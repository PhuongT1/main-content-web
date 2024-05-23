import { SvgComponentProps } from '@/types/types.type'
const CheckRoundIcon = ({ pathProps, svgProps, rectProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} fill='none' {...svgProps}>
    <rect width={19} height={19} x={0.5} y={0.5} fill={'#2D68FE'} rx={9.5} {...rectProps} />
    <path
      stroke={'#fff'}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M14.666 6.5 8.25 12.917 5.333 10'
      {...pathProps}
    />
  </svg>
)
export default CheckRoundIcon
