import { DialogProps } from '@mui/material'
import { ReactNode } from 'react'

const PopupTheme = {
  default: 'default',
  dark: 'dark'
}

export type PopupThemeType = keyof typeof PopupTheme

export type ExplorePressTypeProps = DialogProps & {
  title?: ReactNode
  theme?: keyof typeof PopupTheme
  description?: ReactNode
  cancelTitle?: string
  submitTitle?: string
  pressType?: string
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
