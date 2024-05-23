import { FieldValues, FieldPath, UseControllerProps } from 'react-hook-form'
import { SxProps, TextFieldProps, Theme } from '@mui/material'
import React from 'react'
import MouseEvent from 'react'
export interface InputItemProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>
  extends UseControllerProps<TFieldValues, TName> {
  label?: React.ReactNode
  subLabel?: React.ReactNode
  required?: boolean
  maxLength?: number
  showErrorMessage?: boolean
  textFieldProps?: TextFieldProps
  sxBox?: SxProps<Theme>
  sxInput?: SxProps<Theme>
  sxLabel?: SxProps<Theme>
  sxSubLabel?: SxProps<Theme>
  multiLine?: number
}

export const RADIUS_TEXTFIELD = 10
