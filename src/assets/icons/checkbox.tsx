import { SvgComponentProps } from '@/types/types.type'
import React from 'react'

const CheckboxIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
    <path
      d='M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z'
      stroke='#D2D2D2'
      strokeWidth='1'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...pathProps}
    />
  </svg>
)

export default CheckboxIcon
