import { SvgComponentProps } from '@/types/types.type'
import React from 'react'

const ArrowDownIcon = ({ pathProps, svgProps }: SvgComponentProps) => {
  return (
    <svg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
      <path
        d='M1 1L7 7L13 1'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...pathProps}
      />
    </svg>
  )
}

export default ArrowDownIcon