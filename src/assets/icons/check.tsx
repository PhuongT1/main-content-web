import { SvgComponentProps } from '@/types/types.type'
import * as React from 'react'
const CheckIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...svgProps}>
    <path
      stroke={'#000'}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M14.667 7 8.25 13.417 5.333 10.5'
      {...pathProps}
    />
  </svg>
)
export default CheckIcon
