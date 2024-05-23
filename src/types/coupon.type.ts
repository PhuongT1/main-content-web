import { TUser } from './user.type'

///Type

export type Coupon = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  status: string
  type: COUPON_TYPE
  releaseType: string
  startDate: string
  endDate: string
  name: string
  code: string
  subject: string
  reference: string
  referenceProductType: never[] // Replace after have the model
  hasUsed: boolean
  hasLimitQuantity: boolean
  quantity: number
  value: number
  maxValue: number
  minimumApplyAmount: number
  userId: number
  user: TUser
  timeFormat: string
  statusCouponUser: string
  statusCouponUserFormat: string
  no: number
}

export enum COUPON_TYPE {
  PERCENTAGE = 'PERCENTAGE',
  NUMERIC = 'NUMERIC'
}

export enum COUPON_STATUS {
  ACTIVE = 'ACTIVE',
  USED = 'USED',
  EXPIRED = 'EXPIRED'
}

export enum COUPON_REFERENCE_TYPE {
  USER_PREMIUM = 'USER_PREMIUM',
  EVENT = 'EVENT',
  MENTORING = 'MENTORING',
  CERTIFICATION = 'CERTIFICATION',
  STRENGTH_ANALYSIS = 'STRENGTH_ANALYSIS'
}

//Constants
export const DEFAULT_COUPON_MAX_VALUE = 9999999999
