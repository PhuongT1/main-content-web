import { SVGProps } from 'react'

const StatusArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg width='15' height='16' viewBox='0 0 15 16' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M14.7 8.52179L7.49995 0.800049L0.299952 8.52179H3.99725V15.2H11.0027V8.52179H14.7Z'
      fill={props.stroke || '#3C82F9'}
    />
  </svg>
)
export default StatusArrow
