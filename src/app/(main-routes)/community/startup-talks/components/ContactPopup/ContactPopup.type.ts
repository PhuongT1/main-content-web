import { IPool } from '@/types/pool.type'
import { IStartupTalk } from '@/types/startup-talk.type'
import { DialogProps } from '@mui/material'
import React from 'react'

const PopupTheme = {
  default: 'default',
  dark: 'dark'
}

export type PopupThemeType = keyof typeof PopupTheme

export type ContactPopupProps = DialogProps & {
  title?: string
  type?: keyof typeof PopupTheme
  description?: React.ReactNode
  cancelTitle?: string
  submitTitle?: string
  id: string
  startupData: IStartupTalk
  onCancel?: () => void
} & (
    | {
      onSubmit: () => void
    }
    | {
      onCancel?: () => void
    }
  )
