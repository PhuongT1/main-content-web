import { ICategory } from './category.type'
import { Category, TImage } from './types.type'
import { IFile, TUser } from './user.type'

export interface IBlog {
  id?: number
  createdAt: string
  updatedAt?: string
  deletedAt?: string
  status: string
  type: string
  category: ICategory
  title: string
  instructorThumbnail: IFile
  instructorName: string
  url: string
  content: string
  isAdvertisement: boolean
  isBookmark: boolean
  totalView: number
  totalBookmark: number
  totalComment: number
  thumbnail: IFile
  images: IFile[]
  hashtags: Hashtags[]
  isHot: boolean
  duration?: string
}

export interface IBlogListRequest {
  categoryId?: number | string
  listType?: string
  keyword?: string
  page?: number | string
  limit?: number | string
  type?: string
  currentId?: number | string
}

export interface Hashtags {
  status: string
  name: string
}

export type ContentBlog = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  status: CONTENT_BLOG_STATUS
  type: string
  categoryId: number
  title: string
  instructorName: string
  instructorThumbnailId: number
  url: string
  content: string
  duration: string
  isAdvertisement: boolean
  isHot: boolean
  totalView: number
  totalBookmark: number
  totalComment: number
  totalViewByDay: number
  totalCommentByDay: number
  thumbnailId: number
  totalReport: number
  userId: number
  category: Category
  instructorThumbnail: TImage
  thumbnail: TImage
  images: TImage[]
  user: TUser
}

export enum CONTENT_BLOG_STATUS {
  ACTIVE = 'ACTIVE'
}
