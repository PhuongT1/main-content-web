import { IMentorProduct, IMentorProfile } from '../mentoring.type'
import { TOrder } from '../order.type'
import { TProductContent } from '../product.type'
import { TReview } from '../review.type'
import { Category, TImage } from '../types.type'
import { IUser, TUser } from '../user.type'

export type MentorProductContent = TProductContent & {
  mentoringId: number
}

export type TMentor = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  status: string
  username: string
  email: string
  nameOfAffiliation: string
  position: string
  introduction: string
  otherInformation: string
  isPossibleApply: boolean
  urls: string[]
  totalApplications: number
  reason: string
  rejectedAt: string
  approvedAt: string
  userId: number
  totalView: number
  totalViewByDay: number
  totalReviews: number
  totalBookmark: number
  user: TUser
  portfolios: TImage[]
  categories: Category[]
  productContents: MentorProductContent[]
  no: number
  isBookmark: boolean
  extraKeyword: string
}

export type TMentoringReview = TReview & {
  mentoringId: number
  mentoringApplicationsId: number
  mentoring: TMentor
  mentoringApplications: TMentoringApplications
}

export type TMentoringApplications = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  status: string
  note: string
  mentoringId: number
  userId: number
  mentorId: number
  orderId: number
  productContentId: number
  approvedAt: string
  inProcessAt: string
  completedAt: string
  cancelledAt: string
  menteeWroteReviewAt: string
  mentorWroteReviewAt: string
}

export type TReviewAnalysis = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  keyword: string
  count: number
  mentoringId: number
}

export type MentoringOrder = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  status: string
  note: string
  mentoringId: number
  userId: number
  mentorId: number
  orderId: number
  productContentId: number
  approvedAt: string
  inProcessAt: string
  completedAt: string
  cancelledAt: string
  menteeWroteReviewAt: string
  mentorWroteReviewAt: string
  mentorReport: string
}

export type IMentorTransaction = {
  id?: number
  uuid: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  status: string
  mentoringTransactionStatus: string
  paidForMentorAt?: Date
  bankAccountName: string
  bankAccountNumber: number
  bankName: string
  note: string
  mentoringId: number
  userId: number
  mentorId: number
  orderId: number
  productContentId: number
  approvedAt: null
  inProcessAt: Date
  completedAt: Date
  cancelledAt: Date
  menteeWroteReviewAt: Date
  mentorWroteReviewAt: Date
  mentorReport: string
  user: IUser
  order: TOrder
  productContent: IMentorProduct
  mentor: IMentorProfile
  no: number
}
