import { SVGProps } from 'react'

const StatusRemove = (props: SVGProps<SVGSVGElement>) => (
  <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M3.7002 3.19971L13.3002 12.7997M3.7002 12.7997L13.3002 3.19971'
      stroke={props.stroke || '#EA3939'}
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
)
export default StatusRemove
