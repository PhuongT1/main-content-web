import { SvgComponentProps } from '@/types/types.type'
import * as React from 'react'

const PlusCreateIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
    <path
      d='M1.28595 5.71404H10.714'
      stroke='#37393E'
      strokeWidth='2'
      strokeMiterlimit='10'
      strokeLinecap='round'
      {...pathProps}
    />
    <path
      d='M6 10.4281V1'
      stroke='#37393E'
      strokeWidth='2'
      strokeMiterlimit='10'
      strokeLinecap='round'
      {...pathProps}
    />
  </svg>
)
export default PlusCreateIcon
