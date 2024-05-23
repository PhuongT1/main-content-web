import { SvgComponentProps } from '@/types/types.type'
import { useTheme } from '@mui/material'

import * as React from 'react'
const PlusBoldIcon = ({ svgProps, pathProps }: SvgComponentProps) => {
  const {
    palette: { home }
  } = useTheme()
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M2.40006 8.00009H13.5999'
        stroke={home.gray500}
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
      />
      <path d='M8 13.5999V2.40002' stroke={home.gray500} strokeWidth='2' strokeMiterlimit='10' strokeLinecap='round' />
    </svg>
  )
}
export default PlusBoldIcon
