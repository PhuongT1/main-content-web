import { SxProps, TextFieldProps, Theme } from '@mui/material'
import React from 'react'
import {
  FieldValues,
  FieldPath,
  UseControllerProps,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
  PathValue
} from 'react-hook-form'
export interface InputItemProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>
  extends UseControllerProps<TFieldValues, TName> {
  label?: React.ReactNode
  subLabel?: React.ReactNode
  required?: boolean
  showErrorMessage?: boolean
  textFieldProps?: TextFieldProps
  sxBox?: SxProps<Theme>
  sxInput?: SxProps<Theme>
  sxLabel?: SxProps<Theme>
  sxSubLabel?: SxProps<Theme>
  maxLength?: number
  error?: boolean
  onChangeInput?: (value: string) => void
  onBlur?: VoidFunction
  renderInput?: ({
    field,
    fieldState,
    formState
  }: {
    field: ControllerRenderProps<TFieldValues, TName>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<TFieldValues>
  }) => React.ReactElement
  onClickDelete?: (value: PathValue<TFieldValues, TName>) => void
  onClickBtnSearch?: (value: PathValue<TFieldValues, TName>) => void
  regex?: RegExp
}

export const RADIUS_TEXTFIELD = 10
