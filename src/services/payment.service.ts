import { TOrder } from '@/types/order.type'
import {
  ApproveOrderPayload,
  CancelPaymentPayload,
  ConfirmPaymentPayload,
  CreatePaymentPayload,
  TUpgradePackagePayload
} from '@/types/payment.type'
import axiosPayment from './axios-payment'
import { CreateOrderPayload } from './order.service'

const ENDPOINT = {
  order: '/order',
  confirm: '/confirm',
  cancel: '/cancel',
  approve: 'payments/toss-pg/confirm-order',
  upgrade: 'users/upgrade-package'
}

export const createPaymentTossPG = async <T>(payload: CreatePaymentPayload): Promise<T> => {
  const { data } = await axiosPayment.post('/', payload)
  return data
}

export const confirmPaymentTossPG = async (payload: ConfirmPaymentPayload) => {
  const { data } = await axiosPayment.post(`/${ENDPOINT.confirm}`, payload)
  return data
}

export const approveOrder = async (payload: ApproveOrderPayload) => {
  const { data } = await axiosPayment.post(`/${ENDPOINT.approve}`, payload)
  return data
}

export const cancelPaymentTossPG = async (payload: CancelPaymentPayload) => {
  // if (!payload.paymentKey) throw new Error('Payment key not provided')
  const { data } = await axiosPayment.post(`/${payload.paymentKey}${ENDPOINT.cancel}`, payload)
  return data
}

export const upgradePackage = async (payload: TUpgradePackagePayload) => {
  const { data } = await axiosPayment.put(`/${ENDPOINT.upgrade}`, payload)
  return data
}

export const createOrder = async (payload: CreateOrderPayload) => {
  const { data } = await axiosPayment.post(`${ENDPOINT.order}`, payload, {
    showErrorDialog: true
  })
  return {
    data: data?.data as TOrder
  }
}
