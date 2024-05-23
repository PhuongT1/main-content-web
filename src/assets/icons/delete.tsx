import * as React from 'react'

const DeleteIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const { stroke, fill, opacity, ...restSvg } = props
  return (
    <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...restSvg}>
      <rect x='2.5' y='2' width='20' height='20' rx='4' fill={fill ?? '#252629'} opacity={opacity} />
      <path
        d='M15.5 9L9.5 15M9.5 9L15.5 15'
        stroke={stroke ?? '#EDEEF1'}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
export default DeleteIcon
