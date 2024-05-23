import * as React from 'react'
import { SVGProps } from 'react'
const CommentMenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={25} fill='none' {...props}>
    <circle cx={11.5} cy={8.188} r={1.5} fill={props.fill || '#9F9EA4'} />
    <circle cx={11.5} cy={13.188} r={1.5} fill={props.fill || '#9F9EA4'} />
    <circle cx={11.5} cy={18.188} r={1.5} fill={props.fill || '#9F9EA4'} />
  </svg>
)
export default CommentMenuIcon
