import { SvgComponentProps } from '@/types/types.type'
import React from 'react'

const TriangleIconNew = ({ pathProps }: SvgComponentProps) => {
  return (
    <svg width='8' height='6' viewBox='0 0 8 6' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M4 6L5.24537e-07 -6.99382e-07L8 0L4 6Z' fill='#292A2C' fillOpacity='0.4' {...pathProps} />
    </svg>
  )
}
export default TriangleIconNew
