import { SvgComponentProps } from '@/types/types.type'
import * as React from 'react'
const PlusIcon = ({ svgProps, pathProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...svgProps}>
    <path
      stroke='#fff'
      strokeLinecap='round'
      strokeMiterlimit={10}
      d='M6.343 11.657h11.314M12 17.314V6'
      {...pathProps}
    />
  </svg>
)
export default PlusIcon
