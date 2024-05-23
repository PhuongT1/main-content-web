import React from 'react'
import { DialogProps } from '@mui/material'
import { IMentorTransaction } from '@/types/community/mentoring.type'

const PopupTheme = {
  default: 'default',
  dark: 'dark'
}

export type PopupThemeType = keyof typeof PopupTheme

export type InfoPopupProps = DialogProps & {
  title?: string
  type?: keyof typeof PopupTheme
  description?: React.ReactNode
  cancelTitle?: string
  submitTitle?: string
  onSubmit?: () => void
  onCancel?: () => void
} & (
    | {
        onSubmit: () => void
      }
    | {
        onCancel?: () => void
      }
  ) &
  Partial<IMentorTransaction>
