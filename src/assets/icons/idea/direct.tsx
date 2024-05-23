import { SvgComponentProps } from '@/types/types.type'
import * as React from 'react'
const DirectIcon = ({ svgProps, pathProps, rectProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none'>
    <path
      d='M11.5 5H7.5C6.39543 5 5.5 5.89543 5.5 7V17C5.5 18.1046 6.39543 19 7.5 19H17.5C18.6046 19 19.5 18.1046 19.5 17V12.25M19.5 5H15.5M19.5 5V9M19.5 5L9.5 15'
      stroke='#9498A3'
      strokeWidth='1.2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
export default DirectIcon
