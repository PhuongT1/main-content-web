import { SvgComponentProps } from '@/types/types.type'
const ClearBoxIcon = ({ svgProps, pathProps, rectProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none' {...svgProps}>
    <rect x='2.5' y='2' width='20' height='20' rx='4' fill='#191A1C' {...rectProps} />
    <path d='M15.5 9L9.5 15M9.5 9L15.5 15' stroke='white' strokeLinecap='round' strokeLinejoin='round' {...pathProps} />
  </svg>
)
export default ClearBoxIcon

export const ClearBoxIconV2 = ({ svgProps, pathProps, rectProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none' {...svgProps}>
    <rect x='0.5' width='24' height='24' rx='4' fill='#191A1C' {...rectProps} />
    <path d='M16.5 8L8.5 16M8.5 8L16.5 16' stroke='#EDEEF1' stroke-linecap='round' stroke-linejoin='round' {...pathProps} />
  </svg>
)
