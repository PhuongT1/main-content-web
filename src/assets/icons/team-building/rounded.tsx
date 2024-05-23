import { SvgComponentProps } from '@/types/types.type'
import * as React from 'react'
const RoudedIcon = ({ svgProps, pathProps, rectProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='21' height='20' viewBox='0 0 21 20' fill='none' {...svgProps}>
    <g>
      <rect x='1' y='0.5' width='19' height='19' rx='3.5' stroke='#191A1C' {...rectProps} />
    </g>
  </svg>
)
export default RoudedIcon
