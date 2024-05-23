import { SvgComponentProps } from '@/types/types.type'
import * as React from 'react'
const MinusIdeaIcon = ({ svgProps, pathProps, rectProps }: SvgComponentProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill='none' {...svgProps}>
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M12.5 23.5C18.5751 23.5 23.5 18.5751 23.5 12.5C23.5 6.42487 18.5751 1.5 12.5 1.5C6.42487 1.5 1.5 6.42487 1.5 12.5C1.5 18.5751 6.42487 23.5 12.5 23.5ZM12.5 24.5C19.1274 24.5 24.5 19.1274 24.5 12.5C24.5 5.87258 19.1274 0.5 12.5 0.5C5.87258 0.5 0.5 5.87258 0.5 12.5C0.5 19.1274 5.87258 24.5 12.5 24.5Z'
      fill='#EDEEF1'
      {...pathProps}
    />
    <path fill-rule='evenodd' clip-rule='evenodd' d='M18.5 13.1006H6.5V12.1006H18.5V13.1006Z' fill='#EDEEF1' {...pathProps} />
  </svg>
)
export default MinusIdeaIcon
