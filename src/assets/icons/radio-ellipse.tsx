import { SvgComponentProps } from '@/types/types.type'
import { PropsArray } from '@/utils/types'
import * as React from 'react'
import { ComponentProps } from 'react'

export interface RadioEllipseActiveProps<K extends number = 1> extends SvgComponentProps {
  circlePropsChild?: PropsArray<ComponentProps<'circle'>, K>
}

const RadioEllipse = ({ svgProps, circleProps }: SvgComponentProps) => (
  <svg width='19' height='18' viewBox='0 0 19 18' fill='none' xmlns='http://www.w3.org/2000/svg' {...svgProps}>
    <circle cx='9.5' cy='9' r='7.5' fill='#EDEEF1' stroke='#37393E' strokeWidth='3' {...circleProps} />
  </svg>
)

const RadioEllipseActive = ({ svgProps, circleProps, circlePropsChild }: RadioEllipseActiveProps) => (
  <svg
    id='thumbSlider'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...svgProps}
  >
    <g clipPath='url(#clip0_4428_399022)'>
      <circle cx='12' cy='12' r='10.5' fill='#EDEEF1' stroke='#3C82F9' strokeWidth='3' {...circleProps} />
      <circle cx='12' cy='12' r='5' fill='#3C82F9' {...circlePropsChild} />
    </g>
  </svg>
)

export { RadioEllipse, RadioEllipseActive }
