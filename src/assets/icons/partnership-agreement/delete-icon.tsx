import * as React from 'react'
import { SVGProps } from 'react'

const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={33} height={32} viewBox='0 0 33 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x={0.5} width={32} height={32} rx={6.4} fill={props.fill} />
    <path
      d='M21.8337 10.6667L11.167 21.3334M11.167 10.6667L21.8337 21.3334'
      stroke={props.stroke}
      strokeWidth={1.6}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
export default DeleteIcon
