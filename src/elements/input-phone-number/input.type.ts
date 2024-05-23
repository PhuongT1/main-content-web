import { InputBaseComponentProps } from '@mui/material'
export interface InputProps {
  label?: string
  name: string
  control: any
  startAdornment?: any
  endAdornment?: any
  type: string
  height?: number
  width?: number | string
  customStyle?: string
  onKeyDown?: (event: any) => void
  onInputChange?: (event: any) => void
  placeholder?: string
  containerStyle?: string
  radius?: number
  disabled?: boolean
  register?: any
  inputProps?: InputBaseComponentProps
  value?: string
  multiline?: boolean
  rows?: number
  maxRows?: number
  id?: string
}
