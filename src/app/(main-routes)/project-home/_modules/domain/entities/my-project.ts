import { ReactElement } from 'react'
import {
  EXPLORER_ITEM_TYPE_ENUM,
  PROJECT_STATUS_ENUM,
  PROJECT_SHARING_SCOPE_ENUM,
  PROJECT_TYPE_ENUM,
  MORE_ACTIONS,
  EXPLORER_CATEGORY_ENUM,
  MORE_ACTIONS_FEEDBACK,
  MORE_ACTIONS_PARTICIPATING,
  PROJECT_PATHS_ENUM
} from '../enums'
import { ProjectDeckItem } from './create-project'
import { TranslateKey } from '@/types/types.type'

export type ProjectParticipant = {
  userId: number
  email: string
  avatarUrl?: string
  isBlocked: boolean
  username: string
  nickname: string
  sharedDate: string
}

export interface ICreator {
  userId: number
  email: string
  avatarUrl?: string
  username: string
  nickname: string
}

export interface IProject {
  id: number
  createdAt: Date | string
  updatedAt: Date | string
  name: string
  description: string | ReactElement
  userId: number
  type: PROJECT_TYPE_ENUM
  isPublic: boolean
  numberOfDeck: number
  templateId: number | null
  imageUrl: string | null
  logoUrl?: string | null
  status: PROJECT_STATUS_ENUM
  bookmark: boolean
  allowReplication: boolean
  sharingScope: PROJECT_SHARING_SCOPE_ENUM
  progress: number
  participants: ProjectParticipant[]
  groupCode: string
  groupName: string
  creator: ICreator
  code: string
  totalFeedbacks: number
  totalViews: number
  totalViewers: number
  isCloned: boolean
  viewers: ProjectParticipant[]
}

export interface ISettingProject {
  sharingScope: PROJECT_SHARING_SCOPE_ENUM
  allowReplication: boolean
}

export interface IDetailProject extends IProject {
  decks: ProjectDeckItem[]
  chatGroupUid?: string
  explorerId: number
  progressTime: number
  totalFeedbacks: number
  isOpenedInnovation: boolean
  openedInnovationProjectId: number
}

export interface IFolder {
  id: number
  createdAt: Date | string
  updatedAt: Date | string
  name: string
  description: string | ReactElement
  parentId: number
  totalItems: number
  totalProjects: number
  totalFolders: number
  templateId: string | null
  explorerId: number
}

export interface IENotice {
  id: number
  userId: number
  uuid: string
  createdAt: Date | string
  updatedAt: Date | string
  deletedAt?: Date | string
  startDate?: Date | string
  endDate?: Date | string
  url: string
  code: string
  category: EXPLORER_CATEGORY_ENUM
  isOpenNewTab: boolean
  title: string
  content: string
  isPinned: boolean
  viewNumber: number
}

export interface IMyProject {
  explorerId?: number
  isBlocked?: boolean
  createdAt: Date | string
  updatedAt: Date | string
  level?: number
  parentFolders?: string[]
  itemType: EXPLORER_ITEM_TYPE_ENUM
  itemData: IProject | IFolder | IENotice
  no: number
}

export interface IProjectHomeTab {
  label: TranslateKey | null
  value: PROJECT_PATHS_ENUM
  count?: number
  url: string
  category?: EXPLORER_CATEGORY_ENUM
  pathChilds?: PROJECT_PATHS_ENUM[]
  isTab?: boolean
}

export interface IMoreActionItem {
  label: MORE_ACTIONS | MORE_ACTIONS_FEEDBACK | MORE_ACTIONS_PARTICIPATING | string //TODO
  value: MORE_ACTIONS | MORE_ACTIONS_FEEDBACK | MORE_ACTIONS_PARTICIPATING
  disabled?: boolean
}
