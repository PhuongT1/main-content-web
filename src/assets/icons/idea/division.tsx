import { SvgComponentProps } from '@/types/types.type'
import * as React from 'react'
const DivisionIdeaIcon = ({ svgProps, lineProps, circleProps, rectProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill='none' {...svgProps}>
    <circle cx='12.5' cy='12.5' r='11.5' stroke={circleProps?.stroke || '#EDEEF1'} />
    <line x1='6.5' y1='12.5996' x2='18.5' y2='12.5996' stroke='#EDEEF1' {...lineProps} />
    <circle cx='12.5008' cy='8.29961' r='1.2' fill={circleProps?.fill || '#EDEEF1'} />
    <circle cx='12.5008' cy='16.7' r='1.2' fill={circleProps?.fill || '#EDEEF1'} />
  </svg>
)
export default DivisionIdeaIcon
