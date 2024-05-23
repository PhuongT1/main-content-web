import * as React from 'react'
const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
    <path
      stroke={props.stroke || '#000'}
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M20.791 12.607c.244-.209.366-.313.411-.438a.5.5 0 0 0 0-.338c-.045-.124-.167-.23-.41-.438L12.32 4.132c-.42-.36-.63-.54-.809-.545a.5.5 0 0 0-.4.184C11 3.91 11 4.186 11 4.74v4.296a9.666 9.666 0 0 0-8 9.516v.612a11.401 11.401 0 0 1 8-4.093v4.19c0 .554 0 .83.112.969a.5.5 0 0 0 .4.184c.178-.005.388-.185.809-.545l8.47-7.26Z'
    />
  </svg>
)
export default ShareIcon
