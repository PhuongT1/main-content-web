import { SvgComponentProps } from '@/types/types.type'
import * as React from 'react'
const TableIcon = ({ svgProps, pathProps, rectProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='21' height='20' viewBox='0 0 21 20' fill='none' {...svgProps}>
    <rect x='1' y='0.5' width='19' height='19' rx='3.5' fill='#EDEEF1' stroke='#191A1C' {...rectProps} />
    <path
      d='M1 4C1 2.067 2.567 0.5 4.5 0.5H16.5C18.433 0.5 20 2.067 20 4V6.5H1V4Z'
      fill='#191A1C'
      stroke='#191A1C'
      {...rectProps}
    />
    <line x1='0.5' y1='6.5' x2='20.5' y2='6.5' stroke='#191A1C' />
    <line x1='0.5' y1='12.5' x2='20.5' y2='12.5' stroke='#191A1C' />
  </svg>
)
export default TableIcon
