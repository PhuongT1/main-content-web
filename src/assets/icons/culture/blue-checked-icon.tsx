import { SvgComponentProps } from '@/types/types.type'
import * as React from 'react'
const BlueCheckedIcon = ({ rectProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='21' viewBox='0 0 20 21' fill='none'>
    <rect x='1.66675' y='2.16617' width='16.6667' height='16.6667' rx='8.33333' fill='#3C82F9' {...rectProps} />
    <path
      d='M14.1667 7.99951L9.0105 12.9995L6.66675 10.7268'
      stroke='white'
      stroke-width='1.25'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
)
export default BlueCheckedIcon
