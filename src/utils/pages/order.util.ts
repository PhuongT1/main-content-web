import { DATE_FORMAT } from '@/constants/common.constant'
import { ORDER_CATEGORIES, TOrder } from '@/types/order.type'
import { PaymentInfo } from '@/types/payment.type'
import moment from 'moment'

export const getOrderNumber = (createAt: string, type: ORDER_CATEGORIES, orderId: number) => {
  const paymentDate = moment(createAt).format(DATE_FORMAT.EMPTY_REV)
  return [paymentDate, type, orderId].join('')
}

export const getRequestPaymentPayload = (prev: PaymentInfo, order: TOrder, callBackUrl: string = '') => {
  const directUrl = callBackUrl
    ? callBackUrl.includes('https://')
      ? callBackUrl
      : `${window.location.origin}${callBackUrl}`
    : ''

  const { name, TPG_OrderId, user } = order
  const newPayload: PaymentInfo = {
    ...prev,
    orderId: TPG_OrderId,
    orderName: name,
    customerName: user?.username,
    customerEmail: user?.email,
    customerMobilePhone: user?.phoneNumber
  } as PaymentInfo

  if (callBackUrl) {
    newPayload.successUrl = directUrl
    newPayload.failUrl = directUrl
  }

  return newPayload
}
