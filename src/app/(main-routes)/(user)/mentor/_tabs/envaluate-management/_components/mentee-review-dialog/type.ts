import { Mentor } from '@/types/mentoring/mentee.type'
import { IUser } from '@/types/user.type'
import { DialogProps } from '@mui/material'
import { ReactNode } from 'react'

export const evaluationKeyword = [
  '전문성 있는 내용이에요',
  '실무적인 조언을 해줘요',
  '다양한 자료를 제공해줘요',
  '문제를 해결할 수 있게 해줘요',
  '개인의 상황에 알맞은 조언을 해줘요',
  '합리적인 시간과 가격이에요',
  '구체적이고 객관적인 내용을 알려줘요',
  '새로운 시각을 알려줘요',
  '편안한 어투로 친절하게 알려줘요',
  '격려와 지지로 동기부여를 해줘요'
]

const PopupTheme = {
  default: 'default',
  dark: 'dark'
}

export type PopupThemeType = keyof typeof PopupTheme

export type ReviewPopupProps = DialogProps & {
  title?: ReactNode
  theme?: keyof typeof PopupTheme
  description?: ReactNode
  cancelTitle?: string
  submitTitle?: string
  user?: IUser
  createdAt?: Date
  extraKeywords?: string[]
  content?: string
  badge?: string[]
  mentoringId?: number
  onSubmit?: (event?: any) => void
  onCancel?: (event?: any) => void
  onReport?: (event?: any) => void
  reviewId?: number
} & (
    | {
        onSubmit: (event?: any) => void
      }
    | {
        onCancel?: (event?: any) => void
      }
  )
