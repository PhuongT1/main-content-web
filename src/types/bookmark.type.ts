import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import { ContentBlog, IBlog } from './blog.type'
import { ICategory } from './category.type'
import { TEvent } from './community/educational-event.type'
import { TMentor } from './community/mentoring.type'
import { IOutsourceCompany } from './outsource-company.type'
import { IPool } from './pool.type'
import { IStartupTalk } from './startup-talk.type'
import { ReferenceRoom } from './startup/toolkit.type'
import { ITeamBuilding } from './team-building.type'
import { IFile, IUser } from './user.type'

export interface IBookmarkListRequest {
  page?: number | string
  limit?: number | string
  type?: BOOKMARK_TYPE
}

export interface IBookmark {
  id: number
  uuid: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  type: string
  userId: number
  eventId?: number
  contentBlogId?: number
  portfolioId?: number
  event: any
  contentBlog?: IBlog
  portfolio?: IPool
  item: IBookmarkItem | null
  isBookmark: boolean
}

interface IBookmarkItem {
  id: number
  uuid: string
  createdAt: Date
  updatedAt: Date
  deletedAt: null
  thumbnail: IFile
  user?: IUser
  category?: ICategory
  title?: string
}

export type ContentBookmark = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  type: string
  userId: number
  eventId: number
  contentBlogId: number
  portfolioId: number
  event: TEvent
  contentBlog: ContentBlog
  portfolio?: IPool
  item: ContentBlog
  isBookmark: boolean
  no: number
  startupTalkId: number
  dataRoomId: number
  teamBuildingId: number
  companyId: number
  dataRoom: ReferenceRoom
  startupTalk: IStartupTalk
  user: IUser
  teamBuilding: ITeamBuilding
  company: IOutsourceCompany
  mentoring?: TMentor
  course: any
}
