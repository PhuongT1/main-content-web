import { SvgComponentProps } from '@/types/types.type'
import React from 'react'

const QuoteIcon = ({ pathProps }: SvgComponentProps) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='41' height='33' viewBox='0 0 41 33' fill='none'>
      <path
        d='M23.0031 32.5V22.8297C23.0031 16.7576 24.4274 11.81 27.276 7.98688C30.1996 4.08876 34.51 1.53999 40.2072 0.340576V7.64954C37.6585 8.24925 35.6345 9.3737 34.1352 11.0229C32.6359 12.5971 31.6614 14.5087 31.2116 16.7576H37.9583V32.5H23.0031ZM0.289062 32.5V22.8297C0.289062 16.7576 1.71337 11.81 4.56199 7.98688C7.48558 4.08876 11.7585 1.53999 17.3808 0.340576V7.64954C14.832 8.24925 12.808 9.3737 11.3087 11.0229C9.80945 12.5971 8.83493 14.5087 8.38514 16.7576H15.1319V32.5H0.289062Z'
        fill='#3C82F9'
        {...pathProps}
      />
    </svg>
  )
}

export default QuoteIcon
