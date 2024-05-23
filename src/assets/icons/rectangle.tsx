import * as React from 'react'

const Rectangle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width='16' height='12' viewBox='0 0 16 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M0.8 1C0.8 0.889543 0.889543 0.8 1 0.8H10.0753C10.432 0.8 10.7702 0.958688 10.9982 1.23302L14.8536 5.87217C14.9151 5.94627 14.9151 6.05373 14.8536 6.12783L10.9982 10.767C10.7702 11.0413 10.432 11.2 10.0753 11.2H0.999999C0.889543 11.2 0.8 11.1105 0.8 11V6V1Z'
      stroke='white'
      strokeWidth='1.6'
    />
  </svg>
)
export default Rectangle
