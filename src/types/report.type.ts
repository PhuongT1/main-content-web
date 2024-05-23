import { REPORT_CATEGORY } from '@/constants/report.constant'
import { ContentBlog } from './blog.type'
import { TMentoringReview } from './community/mentoring.type'
import { TUser } from './user.type'

export type TReport = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  status: string
  category: REPORT_CATEGORY[]
  type: string
  reason: string
  reporterId: number
  contentBlogId: number
  startupTalkId: number
  commentId: number
  mentoringReviewId: number
  contentBlog: ContentBlog
  reporter: TUser
  comment: string
  mentoringReview?: TMentoringReview
  categoryText: string
}
