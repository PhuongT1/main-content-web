import { PRODUCT_TYPE } from '@/types/product.type';

enum PRODUCT_CATE {
  ALL = '전체',
  MENTORING = '멘토링',
  CERTIFICATE = '자격증',
  PLAN = '이용권',
  EDU_EVENT = '교육행사',
  STRENGTH_ANALYSIS = '강점 분석'
}

export enum COUPON_USER_STATUS {
  ACTIVE = 'ACTIVE',
  REMOVED = 'REMOVED',
  EXPIRED = 'EXPIRED',
  USED = 'USED'
}

export enum COUPON_SUBJECT {
  ALL = '전체 회원',
  FREE = '무료 회원',
  PREMIUM = '프리미엄',
  JUDGE = '심사위원',
  MENTORING = '멘토',
  GROUP = '단체 회원'
}

export const productCateDropdown: Array<{ value: string; label: string }> = [
  { value: '', label: PRODUCT_CATE.ALL },
  { value: PRODUCT_TYPE.MENTORING, label: PRODUCT_CATE.MENTORING },
  { value: PRODUCT_TYPE.CERTIFICATION, label: PRODUCT_CATE.CERTIFICATE },
  { value: PRODUCT_TYPE.USER_PREMIUM, label: PRODUCT_CATE.PLAN },
  { value: PRODUCT_TYPE.EVENT, label: PRODUCT_CATE.EDU_EVENT },
  { value: PRODUCT_TYPE.STRENGTH_ANALYSIS_SUBSCRIPTION, label: PRODUCT_CATE.STRENGTH_ANALYSIS }
]

export const CancelPaymentReasonType = [
  { label: '서비스 불만족', value: '서비스 불만족' },
  { label: '구매의사 취소', value: '구매의사 취소' },
  { label: '상품정보 상이', value: '상품정보 상이' },
  { label: '기타', value: '기타' }
]

export interface IPaymentHistoryRequest {
  page: number | string
  limit: number | string
  fromDate?: Date | string
  toDate?: Date | string
  keySearch?: string
  keyword?: string
  type?: string
}
