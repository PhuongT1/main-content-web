import * as React from 'react'
import { SVGProps } from 'react'
const ChevronUpComment = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={12} height={12} fill='none' {...props}>
    <path stroke='#729AFE' strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='m9 7.5-3-3-3 3' />
  </svg>
)
export default ChevronUpComment
