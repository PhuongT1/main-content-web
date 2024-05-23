import { DialogProps } from '@mui/material'
import React, { Dispatch } from 'react'

const PopupTheme = {
  default: 'default',
  dark: 'dark'
}

export enum CATE {
  TERM = 'term',
  PRIVACY = 'privacy',
  PAYMENT = 'payment'
}

export type PopupThemeType = keyof typeof PopupTheme

export type FooterPopupProps = DialogProps & {
  title?: string
  cate: CATE
  setCate?: Dispatch<CATE>
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
  )
