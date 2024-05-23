import { SvgComponentProps } from '@/types/types.type'
import { PropsArray } from '@/utils/types'
import * as React from 'react'

type TInfoIconProps = {
  pathPropsClip?: PropsArray<React.ComponentProps<'path'>, 1>
} & SvgComponentProps

const InfoIcon = ({ svgProps, pathProps, rectProps, pathPropsClip }: TInfoIconProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none' {...svgProps}>
    <g clipPath='url(#clip0_583_12110)'>
      <path
        d='M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z'
        fill='#FF0A09'
        {...pathProps}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10 5.66699C10.5523 5.66699 11 6.11471 11 6.66699V10.0003C11 10.5526 10.5523 11.0003 10 11.0003C9.44772 11.0003 9 10.5526 9 10.0003V6.66699C9 6.11471 9.44772 5.66699 10 5.66699Z'
        fill='#F0F0FA'
        {...pathPropsClip}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9 13.333C9 12.7807 9.44772 12.333 10 12.333H10.0083C10.5606 12.333 11.0083 12.7807 11.0083 13.333C11.0083 13.8853 10.5606 14.333 10.0083 14.333H10C9.44772 14.333 9 13.8853 9 13.333Z'
        fill='#F0F0FA'
        {...pathPropsClip}
      />
    </g>
    <defs>
      <clipPath id='clip0_583_12110'>
        <rect width='20' height='20' fill='white' {...rectProps} />
      </clipPath>
    </defs>
  </svg>
)
export default InfoIcon
