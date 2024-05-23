import { FormControlLabelProps, SxProps } from '@mui/material'
import React from 'react'
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form'

export interface ICheckboxItemProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>
  extends UseControllerProps<TFieldValues, TName> {
  label: React.ReactNode
  sxLabelProps?: SxProps
  showMessageError?: boolean
  helperText?: React.ReactNode
  formControllerProps?: Omit<FormControlLabelProps, 'control'>
}

type TCheckBoxItem<T> = {
  options?: T[]
  label: keyof T
  value: keyof T
}

export interface IMultiCheckboxProps<T, TFielValues extends FieldValues, TName extends FieldPath<TFielValues>>
  extends UseControllerProps<TFielValues, TName> {
  list: TCheckBoxItem<T>
  row?: boolean
  label?: string
  maxLength?: number
  showMessageError?: boolean
  sxFormGroup?: SxProps
  spacing?: number
  helperText?: React.ReactNode
  controlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>
  render?: (value: T) => React.ReactNode | React.ReactElement
  onChangeChecked?: (value: T | undefined, checked: boolean) => void
}

export type ListValue = string | number | readonly string[]
