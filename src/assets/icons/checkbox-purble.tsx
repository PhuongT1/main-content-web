import { SvgComponentProps } from '@/types/types.type'
import React from 'react'

const CheckboxPurbleIcon = ({ svgProps, pathProps }: SvgComponentProps) => {
  return (
    <svg width='26' height='19' viewBox='0 0 26 19' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
      <path
        d='M24.2144 2.14258L9.08936 16.8092L2.21436 10.1426'
        stroke='#3C82F9'
        strokeWidth='3.42857'
        strokeLinecap='round'
        strokeLinejoin='round'
        {...pathProps}
      />
    </svg>
  )
}

export default CheckboxPurbleIcon
