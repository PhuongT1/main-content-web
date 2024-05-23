import React from 'react'

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width || 17}
      height={props.width || 17}
      viewBox='0 0 17 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={props?.style}
    >
      <path
        d='M4.5 6.5L8.5 10.5L12.5 6.5'
        stroke={props.stroke || props.color || '#EDEEF1'}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default ChevronDownIcon
