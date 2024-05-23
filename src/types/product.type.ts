import { TUser } from './user.type'

export type TProductContent = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  type: string
  code: string
  productId: number
  eventId: number
  product: TProduct
}

export type TProduct = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  status: string
  type: string
  code: string
  name: string
  description?: string
  price: number
  isSale: boolean
  hasSettlement: boolean
  userId: number
  user: TUser
  productContents: TProductContent[]
  pricePerMonth?: number
  percent?: number
  no?: number
}

export enum PRODUCT_TYPE {
  USER = 'USER',
  CONTENT = 'CONTENT',
  EVENT = 'EVENT',
  STARTUP_TALK = 'STARTUP_TALK',
  MENTORING = 'MENTORING',
  CERTIFICATION = 'CERTIFICATION',
  USER_PREMIUM = 'USER_PREMIUM',
  STRENGTH_ANALYSIS_SUBSCRIPTION = 'STRENGTH_ANALYSIS_SUBSCRIPTION'
}
