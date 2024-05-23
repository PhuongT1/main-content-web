import { DialogProps } from '@mui/material'

const PopupTheme = {
  default: 'default',
  dark: 'dark'
}

export type PopupThemeType = keyof typeof PopupTheme

export type SharePopupProps = DialogProps & {
  title?: string
  url: string
  type?: keyof typeof PopupTheme
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
