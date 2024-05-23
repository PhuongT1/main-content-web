import * as React from 'react'

const GroupIcon = ({ stroke, ...restProps }: React.SVGProps<SVGSVGElement>) => {
  const strokeSVG = stroke ?? 'white'
  return (
    <svg width='36' height='24' viewBox='0 0 36 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...restProps}>
      <path
        d='M32.054 22.8106H3.94585C2.75666 22.8106 1.78369 21.8376 1.78369 20.6484V3.35113C1.78369 2.16194 2.75666 1.18896 3.94585 1.18896H32.054C33.2432 1.18896 34.2161 2.16194 34.2161 3.35113V20.6484C34.2161 21.8376 33.2432 22.8106 32.054 22.8106Z'
        stroke={strokeSVG}
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.10791 5.51318H15.0268V15.1348H6.10791V5.51318Z'
        stroke={strokeSVG}
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20.1079 8.32422H29.8917'
        stroke={strokeSVG}
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20.1079 13.3511H29.8917'
        stroke={strokeSVG}
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20.1079 18.3779H29.8917'
        stroke={strokeSVG}
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
export default GroupIcon
