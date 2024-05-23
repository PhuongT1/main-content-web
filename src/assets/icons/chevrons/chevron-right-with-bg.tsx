import { SvgComponentProps } from '@/types/types.type'

const ChevronRightWithBgIcon = ({ svgProps, pathProps }: SvgComponentProps) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
      <rect width='24' height='24' rx='12' fill='#3C82F9' fillOpacity='0.1' />
      <path
        d='M10 17L15 12L10 7'
        stroke='#3C82F9'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...pathProps}
      />
    </svg>
  )
}

export default ChevronRightWithBgIcon
