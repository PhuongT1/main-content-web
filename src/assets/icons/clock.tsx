import React from 'react'

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={props.width || 16}
    height={props.height || 17}
    viewBox='0 0 16 17'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <g clipPath='url(#clip0_5999_69741)'>
      <path
        d='M10.8511 9.91194L8.62023 8.23881V4.83062C8.62023 4.48794 8.34323 4.21094 8.00055 4.21094C7.65786 4.21094 7.38086 4.48794 7.38086 4.83062V8.54869C7.38086 8.74388 7.47258 8.92794 7.62873 9.04444L10.1074 10.9035C10.219 10.9871 10.3491 11.0274 10.4786 11.0274C10.6676 11.0274 10.8535 10.9425 10.975 10.7789C11.1808 10.5056 11.125 10.1171 10.8511 9.91194Z'
        fill={props.color || '#EDEEF1'}
      />
      <path
        d='M8 0.5C3.58853 0.5 0 4.08853 0 8.5C0 12.9115 3.58853 16.5 8 16.5C12.4115 16.5 16 12.9115 16 8.5C16 4.08853 12.4115 0.5 8 0.5ZM8 15.2607C4.27266 15.2607 1.23934 12.2273 1.23934 8.5C1.23934 4.77266 4.27266 1.73934 8 1.73934C11.728 1.73934 14.7607 4.77266 14.7607 8.5C14.7607 12.2273 11.7273 15.2607 8 15.2607Z'
        fill={props.color || '#EDEEF1'}
      />
    </g>
    <defs>
      <clipPath id='clip0_5999_69741'>
        <rect width='16' height='16' fill='white' transform='translate(0 0.5)' />
      </clipPath>
    </defs>
  </svg>
)
export default ClockIcon
