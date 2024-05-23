import { SvgComponentProps } from '@/types/types.type'
const ChevronRightSmIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={18} height={18} viewBox='0 0 18 18' fill='none' {...svgProps}>
    <path
      d='M6.90059 13.1969L11.1006 8.99687L6.90059 4.79688'
      stroke='#F7F8FA'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...pathProps}
    />
  </svg>
)
export default ChevronRightSmIcon
