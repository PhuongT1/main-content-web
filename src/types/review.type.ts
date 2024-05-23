import { TUser } from './user.type'

export type TReview = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  status: string
  typeOfContent: string
  badge: string
  content: string
  extraKeywords: string[]
  totalKeywords: number
  userId: number
  user: TUser
  no: number
}
