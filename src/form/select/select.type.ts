// form
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form'
// @mui
import { SxProps, TextFieldProps, Theme } from '@mui/material'
import { Key, ReactElement } from 'react'

// ----------------------------------------------------------------------
type TDropDownItem<T> = {
  options: T[]
  label?: keyof T
  value?: keyof T
}

export interface SelectElementProps<T, TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>
  extends UseControllerProps<TFieldValues, TName> {
  native?: boolean
  open?: boolean
  maxHeight?: boolean | number
  label?: string | React.ReactNode
  menus?: TDropDownItem<T>
  showErrorMessage?: boolean
  paperPropsSx?: SxProps<Theme>
  children?: React.ReactNode | ReactElement
  textFieldProps?: TextFieldProps
  sxBox?: SxProps<Theme>
  isNoneBorder?: boolean
  sxLabel?: SxProps<Theme>
  value?: Key
  onChangeCustom?: (...event: any[]) => void
  onFocusCustom?: (...event: any[]) => void
}

export type MenuValue = string | number | readonly string[]

export const RADIUS_TEXTFIELD = 10
