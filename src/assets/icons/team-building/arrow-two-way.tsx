import { SvgComponentProps } from '@/types/types.type'
import * as React from 'react'
const TwoWayArrowIcon = ({ svgProps, pathProps, rectProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='10' viewBox='0 0 18 10' fill='none'>
    <path d='M17.6504 5L12.3872 10L11.6504 9.3L16.1767 5L11.6504 0.7L12.3872 -3.22084e-08L17.6504 5Z' fill='#191A1C' />
    <path d='M0.5 5L5.76316 -3.22084e-08L6.5 0.7L1.97368 5L6.5 9.3L5.76316 10L0.5 5Z' fill='#191A1C' />
    <line x1='16.5' y1='5.15039' x2='1.5' y2='5.15039' stroke='#191A1C' />
  </svg>
)
export default TwoWayArrowIcon
