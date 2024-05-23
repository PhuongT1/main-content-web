import { DialogProps } from '@mui/material'
import React from 'react'

const PopupTheme = {
  default: 'default',
  dark: 'dark'
}

export type PopupThemeType = keyof typeof PopupTheme

export type AlertPopupProps = DialogProps & {
  title?: string
  type?: keyof typeof PopupTheme
  description?: React.ReactNode
  cancelTitle?: string
  submitTitle?: string
  icon?: React.JSX.Element
  onSubmit?: (event?: any) => void
  onCancel?: (event?: any) => void
} & (
    | {
      onSubmit: (event?: any) => void
    }
    | {
      onCancel?: (event?: any) => void
    }
  )