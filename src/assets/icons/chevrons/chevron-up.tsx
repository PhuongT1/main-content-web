import * as React from 'react'
const ChevronUp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={12} height={12} viewBox='0 0 12 12' fill='none' {...props}>
    <path
      d='M9 7.5L6 4.5L3 7.5'
      stroke={props.stroke || 'white'}
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
export default ChevronUp
