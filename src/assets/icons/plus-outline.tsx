import { SvgComponentProps } from '@/types/types.type'
import * as React from 'react'

const PlusOutlineIcon = ({ svgProps, rectProps, pathProps }: SvgComponentProps) => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
    <rect x='1' y='1' width='22' height='22' rx='4' fill='#252629' {...rectProps} />
    <path
      d='M17.6569 11.6569H6.34315M12 6V17.3137'
      stroke='#EDEEF1'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...pathProps}
    />
  </svg>
)

export default PlusOutlineIcon
