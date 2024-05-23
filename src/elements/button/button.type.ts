import { ButtonProps as MButtonProps } from '@mui/material'
import { ElementType, ReactNode } from 'react'

const buttonType = {
  default: 'default',
  active: 'active'
}

const buttonCate = {
  primary: 'primary',
  secondary: 'secondary'
}

const buttonVariant = {
  primary: 'primary',
  outlined: 'outlined',
  contained: 'contained'
}

export type ButtonType = keyof typeof buttonType
export type ButtonCate = keyof typeof buttonCate
export type ButtonVariant = keyof typeof buttonVariant

export type ButtonProps = MButtonProps & {
  component?: ElementType
  cate?: ButtonVariant
  customTitle?: ReactNode
  isLoading?: boolean
  customType?: any
  rounded?: boolean
  customSize?: any
  isNonSubmit?: boolean
  isOnFormPopup?: boolean
}
