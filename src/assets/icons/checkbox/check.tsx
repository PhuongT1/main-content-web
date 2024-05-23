import React, { SVGProps } from 'react'

const CheckedboxIcon = (props: SVGProps<SVGSVGElement>) => {
  const strokeSVG = props.stroke ?? '#2d68fe'
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M17.8889 9L10.4028 16L7 12.8182'
        stroke={strokeSVG}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default CheckedboxIcon
