import { SvgComponentProps } from '@/types/types.type'

const ChevronLeftSmIcon = ({ svgProps, pathProps }: SvgComponentProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none' {...svgProps}>
      <path
        d='M10.5 12.5L6.5 8.5L10.5 4.5'
        stroke='#F7F8FA'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...pathProps}
      />
    </svg>
  )
}

export default ChevronLeftSmIcon
