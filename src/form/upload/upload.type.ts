import { UploadProps } from '@/types/upload'
import { SxProps } from '@mui/material'
import { FieldPath, FieldValues, UseControllerProps, UseFormReturn } from 'react-hook-form'

export interface TUploadAvatarProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TContext = any
> extends UseControllerProps<TFieldValues, TName> {
  multiple?: boolean
  showMessageError?: boolean
  sxButtonChange?: SxProps
  dropZoneProps?: Omit<UploadProps, 'file'>
  formProps: UseFormReturn<TFieldValues, TContext>
}
