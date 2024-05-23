import { SvgComponentProps } from '@/types/types.type'
import * as React from 'react'
const DotIcon = ({ circleProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='5' height='4' viewBox='0 0 5 4' fill='none'>
    <circle cx='2.5' cy='2' r='2' fill='#9B65F2' {...circleProps} />
  </svg>
)
export default DotIcon
