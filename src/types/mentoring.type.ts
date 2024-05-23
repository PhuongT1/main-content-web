import { APPLICATION_PROGRESS } from '@/constants/mentor.constant'
import { ICategory } from './category.type'
import { TOrder } from './order.type'
import { TProduct } from './product.type'
import { TImage } from './types.type'
import { IUser } from './user.type'
import { IPool } from './pool.type'

export interface IMentorProfile {
  id: number
  uuid: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  status: string
  username: string
  email: string
  nameOfAffiliation: string
  position: string
  introduction: string
  otherInformation: string
  urls: string[]
  totalApplications: number
  reason: null
  rejectedAt: null
  approvedAt: null
  userId: number
  user: IUser
  prices: any[]
  productContents: IMentorProduct[]
  categories: ICategory[]
  isPublic: boolean
  badge: string[]
  totalApplicationsCompleted: number
  totalApplicationsReport: number
  totalView: number
  totalViewByDay: number
  totalReviews: number
  totalBookmark: number
  bankAccountName?: string
  bankAccountNumber?: string
  bankName?: string
  portfolios: IPool[]
  isBookmark: boolean
}

export interface IMentorRevenue {
  sumOfMonth?: number
  sumOfAllTime?: number
  totalSalesPrice?: number
  today?: Date
}

export interface IMentorProduct {
  id: number
  uuid: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  type: string
  code: string
  productId: number
  eventId: null
  mentoringId: number
  product: TProduct
}

export interface IMentoringNotice {
  id: number
  uuid: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  status: string
  title: string
  code: string
  content: string
  hasPinned: boolean
  totalView: number
  totalViewByDay: number
  userId: number
  attachments: TImage[]
  user: IUser
  no: number
}

export interface IReviewMentor {
  id: number
  uuid: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  status: string
  typeOfContent: string
  badge: string[]
  content: string
  extraKeywords: string[]
  totalKeywords: number
  mentoringId: number
  userId: number
  mentoringApplicationsId: number
  user: IUser
  mentoring: IMentorProfile
  mentoringApplications: IMentee
  no: number
}

export interface IMentoringNoticeListRequest {
  keyword?: string
  page?: number | string
  limit?: number | string
}

export interface IReviewOfMentorListRequest {
  id: string | number
  page?: number | string
  limit?: number | string
}

export interface IReviewOfMentorAnalysis {
  id: number
  uuid: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  keyword: string
  count: number
  mentoringId: number
}

export interface IMentee {
  id: number
  uuid: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  status: APPLICATION_PROGRESS
  note: string
  mentoringId: number
  userId: number
  mentorId: number
  orderId: number
  productContentId: number
  user: IUser
  order: TOrder
  productContent: IMentorProduct
  mentor: IUser
  no: number
  approvedAt?: Date
  inProcessAt?: Date
  completedAt?: Date
  mentorWroteReviewAt?: Date
  mentorReport?: string
  review: IReviewMentor
}

export interface MentorStatistic {
  numberOfMentoringPending: number
  numberOfMentoringInProcess: number
  numberOfMentoringCompleted: number
  numberOfMentoringDuringReport: number
  numberOfMentoringCanceled: number
}

export interface MentoringReviewAnalysis {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  keyword: string
  count: number
  mentoringId: number
}

export interface RevenueChartResponse {
  revenueChart: RevenueChart[]
}

export interface RevenueChart {
  startOfMonth: string
  endOfMonth: string
  date: string
  sum: number | null
}
