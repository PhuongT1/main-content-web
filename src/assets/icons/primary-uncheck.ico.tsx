import { SvgComponentProps } from '@/types/types.type'

const PrimaryUncheckIcon = ({ svgProps, rectProps }: SvgComponentProps<2>) => (
  <svg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
    <rect x='1' y='0.5' width='19' height='19' rx='3.5' fill='#1F1F29' {...rectProps?.[0]} />
    <rect x='1' y='0.5' width='19' height='19' rx='3.5' stroke='#7E7E86' {...rectProps?.[1]} />
  </svg>
)
export default PrimaryUncheckIcon
