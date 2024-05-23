import axios from '@/services/axios'
import { PaymentHistory } from '@/types/payment.type'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'

const ENDPOINT = '/payments'

export async function getPaymentHistory(params: any) {
  const { data } = await axios.get(`${ENDPOINT}/my-history`, { params })
  return {
    data: data?.data as { metaData: Metadata; result: PaymentHistory[] }
  }
}

export async function requestRefund(body: { cancelReason: string; paymentKey: string }) {
  const res = await axios.post(`${ENDPOINT}/my-history/refund`, {
    refunds: [body]
  })
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}
