import { SvgComponentProps } from '@/types/types.type'

const SquareIcon = ({ svgProps, rectProps }: SvgComponentProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='33' height='32' viewBox='0 0 33 32' fill='none' {...svgProps}>
      <rect x={8.5} y={8} width={16} height={16} rx={2} {...rectProps} />
    </svg>
  )
}

export default SquareIcon
