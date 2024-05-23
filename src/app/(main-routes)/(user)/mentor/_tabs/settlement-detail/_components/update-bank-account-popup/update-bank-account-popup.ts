import { APPLICATION_PROGRESS } from '@/constants/mentor.constant'
import { IMentorProduct, IMentorProfile } from '@/types/mentoring.type'
import { IPool } from '@/types/pool.type'
import { IUser } from '@/types/user.type'
import { DialogProps } from '@mui/material'
import React from 'react'

const PopupTheme = {
  default: 'default',
  dark: 'dark'
}

export type UpdateBankAccountPopupProps = DialogProps & {
  onCancel?: () => void
  onSubmit?: () => void
  bankName?: string
  bankAccountName?: string
  bankAccountNumber?: string
}
