import { ORDER_STATUS, ORDER_TYPE } from '@/constants/order.constant'
import { TUser } from './user.type'

export interface TOrder extends Partial<OrderPaymentManagement> {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: number
  status: ORDER_STATUS
  name: string
  type: ORDER_TYPE
  userId: number
  productId: number
  quantity: number
  price: number
  totalAmount: number
  lastTotalAmount: number
  couponId: number
  tax: number
  note: string
  eventId: number
  eventApplicationsId: number
  mentoringId?: number
  fee?: number
  feeAmount?: number
  productContentId: number
}

export interface OrderPaymentManagement {
  paymentMethod: string
  TPG_OrderId: string
  email: string
  user: TUser
}

export enum ORDER_CATEGORIES {
  'PREMIUM' = 'PP',
  'MENTORING' = 'MT',
  'EDUCATION_EVENT' = 'EE',
  'CERTIFICATE' = 'CT',
  'STRENGTH_ANALYSIS' = 'SA'
}
