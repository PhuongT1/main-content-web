import { SvgComponentProps } from '@/types/types.type'
import * as React from 'react'

const ModifyIcon = ({ svgProps, pathProps, lineProps }: SvgComponentProps) => {
  return (
    <svg width='21' height='20' viewBox='0 0 21 20' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
      <path
        d='M9.0957 15.4384L5.59004 11.9327L14.1085 3.4142C14.8896 2.63315 16.1559 2.63315 16.937 3.4142L17.6142 4.09143C18.3952 4.87248 18.3952 6.13881 17.6142 6.91986L9.0957 15.4384Z'
        stroke='white'
        strokeLinejoin='round'
        {...pathProps}
      />
      <path
        d='M5.41948 16.9089C4.60316 17.2354 3.79308 16.4254 4.11961 15.609L5.59014 11.9327L9.0958 15.4384L5.41948 16.9089Z'
        stroke='white'
        strokeLinejoin='round'
        {...pathProps}
      />
      <line x1='16.3379' y1='8.1962' x2='12.8322' y2='4.69054' stroke={'white'} {...lineProps} />
    </svg>
  )
}
export default ModifyIcon
