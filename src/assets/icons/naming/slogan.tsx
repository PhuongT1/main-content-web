import * as React from 'react'

const SloganIcon = ({ stroke, ...restProps }: React.SVGProps<SVGSVGElement>) => {
  const strokeSVG = stroke ?? 'white'
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6 2H2V6'
        stroke='white'
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6 18H2V14'
        stroke='white'
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14 2H18V6'
        stroke='white'
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14 18H18V14'
        stroke='white'
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.09437 6C5.79607 7.17645 3.45915 14 5.0171 14C6.05572 14 8.65232 8.82353 9.17161 8.82353C9.17161 8.82353 7.61366 11.6471 9.17161 11.6471C10.2103 11.6471 11.2489 9.7647 11.7682 9.7647C11.7682 9.7647 11.2489 11.1765 12.2875 11.1765C13.3262 11.1765 14.8841 8.82353 18 8.82353'
        stroke='white'
        strokeWidth='2'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
export default SloganIcon
