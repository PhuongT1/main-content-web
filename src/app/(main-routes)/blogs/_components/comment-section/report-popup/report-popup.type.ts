import { DialogProps } from '@mui/material'
import React from 'react'

const PopupTheme = {
  default: 'default',
  dark: 'dark'
}

export type PopupThemeType = keyof typeof PopupTheme

export type ReportPopupProps = DialogProps & {
  title?: string
  type?: keyof typeof PopupTheme
  description?: React.ReactNode
  cancelTitle?: string
  submitTitle?: string
  commentId: number
  onSubmit?: () => void
  onCancel?: () => void
} & (
    | {
        onSubmit: () => void
      }
    | {
        onCancel?: () => void
      }
  )
