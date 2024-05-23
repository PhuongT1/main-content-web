import { APPLICATION_PROGRESS } from '@/constants/mentor.constant'
import { IPool } from '@/types/pool.type'
import { IUser } from '@/types/user.type'
import { DialogProps } from '@mui/material'
import React from 'react'

const PopupTheme = {
  default: 'default',
  dark: 'dark'
}

export type MentorHandleDialogProps = DialogProps & {
  status?: APPLICATION_PROGRESS
  note?: string
  user?: IUser
  createdAt?: Date
  approvedAt?: Date
  inProcessAt?: Date
  completedAt?: Date
  mentorWroteReviewAt?: Date | null
  onCancel?: () => void
} & (
    | {
        onSubmit?: () => void
      }
    | {
        onCancel?: () => void
      }
  )
