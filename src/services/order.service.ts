import { TOrder } from '@/types/order.type'
import { PAYMENT_TYPE, TAdditionalMeta } from '@/types/payment.type'
import axios from './axios'

const ENDPOINT = '/order'

export type CreateOrderPayload = {
  type: PAYMENT_TYPE
  productId: number
  productContentId?: number
  quantity: number
  //price of product
  price: number
  //"quantity * price"
  totalAmount: number
  // "quantity * price - coupon (if have)"
  lastTotalAmount: number
  couponId?: number
  note?: string
  name?: string
  email?: string
  postcode?: string
  address?: string
  addressDetail?: string
} & TAdditionalMeta

export const createOrder = async (payload: CreateOrderPayload) => {
  const { data } = await axios.post(`${ENDPOINT}`, payload, {
    showErrorDialog: true
  })
  return {
    data: data?.data as TOrder
  }
}

export const getOrderId = async (id: number | string) => {
  const { data } = await axios.get(`${ENDPOINT}/${id}`)
  return {
    data: data as TOrder
  }
}
