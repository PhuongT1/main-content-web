import { ICategory } from './category.type'
import { IPool } from './pool.type'
import { Category, TImage } from './types.type'
import { IFile, IUser, TUser } from './user.type'

export type ITeamBuilding<T = IFile> = {
  id?: number
  uuid: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  status: string
  userId: number
  name: string
  slogan: string
  introduction: string
  productOrService: string[]
  thumbnailId: number
  awardHistory: string[]
  description: string
  isFavorite: boolean
  isBookmark: boolean
  totalBookmark: number
  totalFavorites: number
  lastLikedAt: Date
  user: IUser
  members: IMember[]
  thumbnail: T
  activityImages: T[]
  recruits: IRecruit[]
  no: number
}

export interface IMember {
  id: number
  uuid: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  name: string
  introduction: string
  avatarId: number
  teamBuildingId: number
  categories: ICategory[]
  avatar: IFile
}

export interface IRecruit {
  id: number
  uuid: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  status: string
  categoryId: number
  fromDate: Date
  toDate: Date
  description: string
  skills: string[]
  numberOfRecruits: number
  teamBuildingId: number
  createdBy: number
  category: ICategory
  isExpired: boolean
}

export interface ITeamBuildingListRequest {
  category?: string
  keyword?: string
  page?: number | string
  limit?: number | string
  hasRecruit?: number
  keySearch?: string
}

export enum ROLES {
  DEVELOPER = 'developer',
  PLANNER = 'planner',
  DESIGNER = 'designer',
  MAKERTER = 'makerter',
  SALE_MANAGER = 'saleManager',
  HUMAN_RESOURCES_DIRECTOR = 'humanResourcesDirector',
  OTHER = 'other'
}

export type Member = {
  image?: FileList
  name: string
  introduction: string
  categories: Category[]
  memberRes?: IMember
}
export enum TEAM_BUILDING_RECRUITMENT_STATUS {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REMOVED = 'REMOVED',
  HIDED = 'HIDED'
}

export type Recruitment = {
  id: number
  uuid: string
  createdAt: Date
  updatedAt: Date
  deletedAt: null
  status: TEAM_BUILDING_RECRUITMENT_STATUS
  categoryId: number
  fromDate: string
  toDate: string
  description: string
  skills: string[]
  numberOfRecruits: number
  teamBuildingId: number
  createdBy: number
  totalApplications: number
  category: Category
  teamBuilding?: ITeamBuilding
  isExpired: boolean
}

export type MyApplication = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  status: string
  teamBuildingId: number
  teamBuildingRecruitId: number
  userContactId: number
  name: string
  email: string
  phoneNumber: string
  attachmentId: number
  note: string
  userContact: TUser
  teamBuildingRecruit: Recruitment
  teamBuilding: ITeamBuilding
  attachment: null
  no: number
}

export type Applications = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  status: TEAM_BUILDING_RECRUITMENT_STATUS
  userId: number
  name: string
  slogan: string
  introduction: string
  productOrService: string[]
  thumbnailId: number
  awardHistory: string[]
  description: string
  isBookmark: boolean
  hasRecruit: boolean
  totalBookmark: number
  totalFavorites: number
  totalRecruits: number
  totalApplications: number
  lastLikedAt: string
  totalView: number
  totalViewByDay: number
  userContact: TUser
  members: Member[]
  thumbnail: TImage
  activityImages: TImage[]
  recruits: Recruitment[]
  talentPool: IPool
  teamBuildingRecruit: Recruitment
}
