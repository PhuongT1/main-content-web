import { SvgComponentProps } from '@/types/types.type'
import * as React from 'react'
const CheckFilledIcon = (props: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} fill='none' {...props}>
    <rect width={20} height={20} fill='#2D68FE' rx={4} {...props.rectProps} />
    <path
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M14.666 6.5 8.25 12.917 5.333 10'
    />
  </svg>
)
export default CheckFilledIcon
