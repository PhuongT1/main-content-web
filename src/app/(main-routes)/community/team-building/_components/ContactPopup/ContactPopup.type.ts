import React from 'react'
import { DialogProps } from '@mui/material'
import { IFile } from '@/types/user.type'
import { ICategory } from '@/types/category.type'
import { ISelectCategories } from '../../[id]/page'

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
  thumbnail: IFile
  name: string
  slogan: string
  id: number | string
  categories: ISelectCategories[]
  onCancel?: () => void
} & (
    | {
      onSubmit: () => void
    }
    | {
      onCancel?: () => void
    }
  )
