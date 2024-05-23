import * as React from 'react'

const EllipseIcon = ({ fill, stroke = '#9F9EA4' }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='8' cy='8' r='7.5' fill={fill} stroke={stroke} />
    </svg>
  )
}

export default EllipseIcon
