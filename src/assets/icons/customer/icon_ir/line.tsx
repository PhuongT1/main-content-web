import { SvgComponentProps } from '@/types/types.type'
import React from 'react'

const IconLine = ({ pathProps, circleProps }: SvgComponentProps) => {
  return (
    <svg width='7' height='22' viewBox='0 0 7 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M3.91406 16V0' stroke='#3C82F9' strokeWidth='0.5' strokeDasharray='1 1' {...pathProps} />
      <circle cx='3.91406' cy='19' r='3' fill='#3C82F9' {...circleProps} />
    </svg>
  )
}
export default IconLine
