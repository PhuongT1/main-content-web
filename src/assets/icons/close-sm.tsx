import * as React from 'react'
import { SVGProps } from 'react'

const CloseSmIcon = ({ width, height, color }: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width || 16} height={height || 16} fill='none' viewBox='0 0 16 16'>
    <path stroke={color || '#F2F2F2'} strokeLinecap='round' strokeLinejoin='round' d='m12 4-8 8m0-8 8 8' />
  </svg>
)

export default CloseSmIcon
