import * as React from 'react'

const RadioOutlineFilledIcon = ({ width, height, color }: React.SVGProps<SVGSVGElement>) => (
  <svg width={width || '24'} height={height || '24'} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='12.5' cy='12.5' r='6' fill={color || '#3C82F9'} />
    <rect x='3' y='3' width='19' height='19' rx='9.5' stroke={color || '#3C82F9'} />
  </svg>
)

export default RadioOutlineFilledIcon
