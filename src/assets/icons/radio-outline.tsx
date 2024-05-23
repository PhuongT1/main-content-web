import * as React from 'react'

const RadioOutlineIcon = ({ width, height, color }: React.SVGProps<SVGSVGElement>) => (
  <svg width={width || '24'} height={height || '24'} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='3' y='3' width='19' height='19' rx='9.5' stroke={color || '#7E878C'} />
  </svg>
)

export default RadioOutlineIcon
