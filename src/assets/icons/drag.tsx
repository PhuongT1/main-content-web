import { SVGProps } from 'react'

const DragIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={props.width || '16'}
    height={props.height || '16'}
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <circle cx='5.42857' cy='3.42857' r='1.42857' fill={props.color || '#37393E'} />
    <circle cx='5.42857' cy='8.00035' r='1.42857' fill={props.color || '#37393E'} />
    <ellipse cx='5.42857' cy='12.5716' rx='1.42857' ry='1.42857' fill={props.color || '#37393E'} />
    <ellipse cx='10.2855' cy='3.42857' rx='1.42857' ry='1.42857' fill={props.color || '#37393E'} />
    <ellipse cx='10.2855' cy='8.00035' rx='1.42857' ry='1.42857' fill={props.color || '#37393E'} />
    <ellipse cx='10.2855' cy='12.5716' rx='1.42857' ry='1.42857' fill={props.color || '#37393E'} />
  </svg>
)

export default DragIcon
