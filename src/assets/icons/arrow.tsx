import { SvgComponentProps } from '@/types/types.type'
import * as React from 'react'

const ArrowIcon = ({ svgProps }: SvgComponentProps) => (
  <svg
    width={svgProps?.width || '9'}
    height={svgProps?.height || '15'}
    viewBox='0 0 9 15'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...svgProps}
  >
    <path
      d='M1.5 13.4238L7.5 7.42383L1.5 1.42383'
      stroke={svgProps?.stroke ?? '#101014'}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
export default ArrowIcon
