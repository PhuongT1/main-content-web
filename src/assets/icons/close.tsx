import React from 'react'

const Close = ({ width, height, color }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width || 24} height={height || 24} fill='none' viewBox='0 0 24 24'>
      <g clipPath='url(#alnes)'>
        <path stroke={color || '#101014'} strokeLinecap='round' strokeLinejoin='round' d='M18 6 6 18M6 6l12 12' />
      </g>
      <defs>
        <clipPath id='alnes'>
          <path fill='#fff' d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Close
