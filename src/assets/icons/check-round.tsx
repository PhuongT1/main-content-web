import { SvgComponentProps } from '@/types/types.type'
const CheckRoundIcon = ({ svgProps, rectProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} fill='none' {...svgProps}>
    {/* <path
      stroke={props.stroke || '#7E7E86'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.666 6.5 8.25 12.917 5.333 10"
    /> */}
    <rect width={19} height={19} x={0.5} y={0.5} stroke={'#7E7E86'} rx={9.5} {...rectProps} />
  </svg>
)
export default CheckRoundIcon
