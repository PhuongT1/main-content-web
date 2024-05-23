import { IUser } from '../user.type'

export interface ReferenceRoom {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  status: Status
  type: string
  categoryId: number
  title: string
  content: string
  isHot: boolean
  totalView: number
  totalBookmark: number
  totalViewByDay: number
  thumbnailId: number
  userId: number
  isBookmark: boolean
  category: Category
  thumbnail: Thumbnail
  images: Thumbnail[]
  documents: Thumbnail[]
  user: IUser
  no: number
}

export interface RefenrentRoomDetail {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  status: string
  type: string
  categoryId: number
  title: string
  content: string
  isHot: boolean
  totalView: number
  totalBookmark: number
  totalViewByDay: number
  thumbnailId: number
  userId: number
  isBookmark: boolean
  category: Category
  hashtags: HashTag[]
  thumbnail: Thumbnail
  images: Thumbnail[]
  documents: Thumbnail[]
  user: IUser
  hasDownload: boolean;
}

export interface Category {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  status: Status
  type: string
  subType: string
  name: string
  code: string
  note: string
  order: null
  isEditable: boolean
}

export enum Status {
  Active = 'ACTIVE',
  Deactivate = 'DEACTIVATE'
}

export interface Thumbnail {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  status: Status
  key: string
  name: string
  originalname: null | string
  fileType: string
  fileSize: string
  url?: string
  baseUrl?: null | string
}

export interface HashTag {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  status: Status
  name: string
}
