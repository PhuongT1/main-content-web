import { SvgComponentProps } from '@/types/types.type'

const ChevronRightIcon = ({ svgProps, pathProps }: SvgComponentProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={28} height={28} viewBox='0 0 28 28' fill='none' {...svgProps}>
      <path
        d='M10.7003 20.6023L17.3003 14.0023L10.7003 7.40234'
        stroke='white'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        {...pathProps}
      />
    </svg>
  )
}

export default ChevronRightIcon
