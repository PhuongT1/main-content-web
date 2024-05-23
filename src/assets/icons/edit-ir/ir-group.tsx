import React from 'react'
import { SvgComponentProps } from '@/types/types.type'

const IRGroupIcon = ({ pathProps }: SvgComponentProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='21' height='20' viewBox='0 0 21 20' fill='none'>
      <g clip-path='url(#clip0_8582_77677)'>
        <path
          d='M16.9285 0H4.07141C2.09994 0.00234375 0.502344 1.59994 0.5 3.57141V16.4285C0.502344 18.4 2.09994 19.9976 4.07141 20H16.9285C18.9 19.9976 20.4976 18.4 20.5 16.4285V3.57141C20.4976 1.59994 18.9 0.00234375 16.9285 0ZM9.78572 18.5714H4.07141C2.88794 18.5714 1.92856 17.612 1.92856 16.4285V3.57141C1.92856 2.38794 2.88794 1.42856 4.07141 1.42856H9.78568L9.78572 18.5714ZM19.0714 16.4285C19.0714 17.612 18.112 18.5714 16.9285 18.5714H11.2143V10.7143H19.0714V16.4285ZM19.0714 9.28572H11.2143V1.42856H16.9285C18.112 1.42856 19.0714 2.38794 19.0714 3.57141V9.28572Z'
          fill='#2D68FE'
          {...pathProps}
        />
      </g>
      <defs>
        <clipPath id='clip0_8582_77677'>
          <rect width='20' height='20' fill='white' transform='translate(0.5)' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default IRGroupIcon
