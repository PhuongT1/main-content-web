import { SvgComponentProps } from '@/types/types.type'

const WhiteUncheckIcon = ({ svgProps, rectProps, pathProps }: SvgComponentProps<2>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none' {...svgProps}>
      <rect x='3' y='2.5' width='19' height='19' rx='3.5' stroke='#9498A3' />
    </svg>
  )
}

export default WhiteUncheckIcon
