import { SxProps, Theme } from '@mui/material'
import { CSSProperties } from 'react'
import { DropzoneOptions } from 'react-dropzone'

// ----------------------------------------------------------------------

export interface CustomFile extends File {
  path?: string
  preview?: string
  lastModifiedDate?: Date
}

export interface UploadProps extends DropzoneOptions {
  error?: boolean
  sx?: SxProps<Theme>
  thumbnail?: boolean
  placeholder?: React.ReactNode
  helperText?: React.ReactNode
  disableMultiple?: boolean
  styleImage?: CSSProperties
  //
  onDelete?: VoidFunction
  //
  onUpdateImage?: (images: string[]) => void
  onRemove?: (file: CustomFile | string) => void
  onRemoveAll?: VoidFunction
  sxButtonChange?: SxProps
  form: any
  name: string
}
