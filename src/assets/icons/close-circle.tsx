import React from 'react'

const CloseCircleIcon = ({ width, height, color, stroke }: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width || '24'} height={height || '24'} viewBox='0 0 24 24' fill='none'>
    <path
      d='M15.0005 9.00049L9.00049 15.0005M9.00049 9.00049L15.0005 15.0005M22.0005 12.0005C22.0005 17.5233 17.5233 22.0005 12.0005 22.0005C6.47764 22.0005 2.00049 17.5233 2.00049 12.0005C2.00049 6.47764 6.47764 2.00049 12.0005 2.00049C17.5233 2.00049 22.0005 6.47764 22.0005 12.0005Z'
      stroke={stroke || color || '#F0F0FA'}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export default CloseCircleIcon
