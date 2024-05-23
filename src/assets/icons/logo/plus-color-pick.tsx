import { SvgComponentProps } from '@/types/types.type'

const PlusColorPickIcon = ({ svgProps, rectProps, pathProps }: SvgComponentProps<2>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='9' height='8' viewBox='0 0 9 8' fill='none' {...svgProps}>
      <path
        d='M1.20017 3.79983H7.79983'
        stroke='#9498A3'
        strokeMiterlimit='10'
        strokeLinecap='round'
        {...pathProps?.[0]}
      />
      <path d='M4.5 7.09966V0.5' stroke='#9498A3' strokeMiterlimit='10' strokeLinecap='round' {...pathProps?.[0]} />
    </svg>
  )
}

export default PlusColorPickIcon
