import { SvgComponentProps } from '@/types/types.type'
import * as React from 'react'
const DirectPlusIcon = ({ svgProps, pathProps, rectProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill='none' {...svgProps}>
    <rect x='1.5' y='1.83496' width='22' height='22' rx='11' fill='#3C82F9' />
    <path
      d='M18.1569 12.4918H6.84315M12.5 6.83496V18.1487'
      stroke='#0D0D0F'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
)
export default DirectPlusIcon
