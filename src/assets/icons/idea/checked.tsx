import { SvgComponentProps } from '@/types/types.type'
const CheckedIdeaIcon = ({ svgProps, pathProps, rectProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='14' height='9' viewBox='0 0 14 9' fill='none'>
    <path
      d='M12.4436 1L4.95747 8L1.55469 4.81818'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...pathProps}
    />
  </svg>
)
export default CheckedIdeaIcon
