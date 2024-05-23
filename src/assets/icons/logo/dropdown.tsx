import { SvgComponentProps } from '@/types/types.type'

const DropdownIcon = ({ svgProps, rectProps, pathProps }: SvgComponentProps<2>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7' fill='none' {...svgProps}>
      <path
        d='M5.5 6.5L0.303849 0.499999L10.6962 0.5L5.5 6.5Z'
        fill='#9498A3'
        stroke='white'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...pathProps?.[0]}
      />
    </svg>
  )
}

export default DropdownIcon
