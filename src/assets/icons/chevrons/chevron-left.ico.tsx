import { SvgComponentProps } from '@/types/types.type'

const ChevronLeftIcon = ({ svgProps, pathProps }: SvgComponentProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={28} height={28} viewBox='0 0 28 28' fill='none' {...svgProps}>
      <path
        d='M17.3002 20.6023L10.7002 14.0023L17.3002 7.40234'
        stroke='white'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
        {...pathProps}
      />
    </svg>
  )
}

export default ChevronLeftIcon
