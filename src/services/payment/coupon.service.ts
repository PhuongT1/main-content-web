'use client'
import axios from '@/services/axios'
import { COUPON_REFERENCE_TYPE, COUPON_STATUS, Coupon } from '@/types/coupon.type'
import { IResponse } from '@/types/response.types'
import { Metadata, PaginationPayload } from '@/types/types.type'
const ENDPOINT = '/coupon'

export type TGetMyCouponParams = {
  status?: COUPON_STATUS
  productId?: number
  referenceProductType?: COUPON_REFERENCE_TYPE
} & Partial<PaginationPayload>

export async function getMyCoupon(params?: TGetMyCouponParams) {
  const { data } = await axios.get(`${ENDPOINT}/me`, { params })
  return {
    data: data?.data as { metaData: Metadata; result: Coupon[] }
  }
}

export async function redeemMyCoupon(coupon: string) {
  const res = await axios.get(`${ENDPOINT}/take-coupon`, {
    params: { code: coupon }
  })
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}
