import * as React from 'react'

const ErrorIcon = ({ width, height, color, stroke }: React.SVGProps<SVGSVGElement>) => (
  <svg width={width || 24} height={height || 24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M23 11C22.448 11 22 11.448 22 12C22 17.514 17.514 22 12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C14.6845 2 17.2045 3.049 19.0965 4.954C19.485 5.3465 20.1185 5.3485 20.5105 4.959C20.9025 4.57 20.9045 3.937 20.5155 3.545C18.2455 1.259 15.221 0 12 0C5.383 0 0 5.383 0 12C0 18.617 5.383 24 12 24C18.617 24 24 18.617 24 12C24 11.448 23.552 11 23 11Z'
      fill={color || stroke || '#EDEEF1'}
    />
    <path
      d='M12 14V7'
      stroke={color || stroke || '#EDEEF1'}
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z'
      fill={color || stroke || '#EDEEF1'}
    />
  </svg>
)

export default ErrorIcon
