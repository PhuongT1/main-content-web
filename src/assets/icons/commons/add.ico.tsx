import { SvgComponentProps } from '@/types/types.type'
const AddIcon = ({ svgProps, pathProps, circleProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...svgProps}>
    <circle cx={12} cy={12} r={9.5} stroke={'#101014'} {...circleProps} />
    <path stroke={'#101014'} strokeLinecap='round' d='M9 12h6M12 9v6' {...pathProps} />
  </svg>
)
export default AddIcon
