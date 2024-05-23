// form
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form'
// @mui
import { SliderOwnProps, SxProps, Theme } from '@mui/material'
import React, { CSSProperties } from 'react'
import { SvgComponentProps } from '@/types/types.type'
import { RadioEllipseActiveProps } from '@/assets/icons/radio-ellipse'

export interface SliderElementProps<T, TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>
  extends UseControllerProps<TFieldValues, TName> {
  sliderProps?: SliderOwnProps
  onChangeCustom?: (value: number | number[]) => void
  valueCustom?: number | number[]
  markIcon?: SvgComponentProps
  thumbIcon?: RadioEllipseActiveProps
  labelMark?: React.ReactNode[]
  sxSlider?: SxProps<Theme>
  sxLabel?: CSSProperties
}

export const positionCenterStyle: CSSProperties = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%'
}

export const labelActiveStyle: CSSProperties = {
  scale: '1',
  transform: 'translate(-50%, -240%)'
}
