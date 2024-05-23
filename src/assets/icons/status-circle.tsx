import { SVGProps } from 'react'

const StatusCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <circle cx='7.9998' cy='7.99999' r='6.2' stroke={props.stroke || '#3C82F9'} strokeWidth='2' />
  </svg>
)
export default StatusCircle
