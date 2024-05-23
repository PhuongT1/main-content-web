import { AutocompleteProps, TextFieldProps } from '@mui/material'
import { FieldPath, FieldValues, UseControllerProps, UseControllerReturn, UseFormReturn } from 'react-hook-form'

type TDropDownItem<T> = {
  options: T[]
  label: keyof T
  value: keyof T
}

export interface TAutocompleteProps<
  T,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends UseControllerProps<TFieldValues, TName> {
  required?: boolean
  label?: string
  helperText?: React.ReactNode
  menus: TDropDownItem<T>
  formProps: UseFormReturn<TFieldValues>
  autoCompleteProps?: AutocompleteProps<TFieldValues, Multiple, DisableClearable, FreeSolo>
  textFieldProps?: TextFieldProps
}

export type ListValue = string | number | readonly string[]
