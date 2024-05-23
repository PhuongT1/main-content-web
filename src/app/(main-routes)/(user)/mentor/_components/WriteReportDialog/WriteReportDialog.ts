import { APPLICATION_PROGRESS } from '@/constants/mentor.constant'
import { IMentorProduct } from '@/types/mentoring.type'
import { IPool } from '@/types/pool.type'
import { IUser } from '@/types/user.type'
import { DialogProps } from '@mui/material'
import React from 'react'

const PopupTheme = {
  default: 'default',
  dark: 'dark'
}

export type WriteReportDialogProps = DialogProps & {
  status?: APPLICATION_PROGRESS
  user?: IUser
  isViewMode: boolean
  productContent?: IMentorProduct
  mentorWroteReviewAt?: Date | null
  mentorReport?: string | null
  createdAt?: Date
  onWriteReport?: Function
  onCancel?: () => void
} & (
    | {
        onSubmit?: () => void
      }
    | {
        onCancel?: () => void
      }
  )
