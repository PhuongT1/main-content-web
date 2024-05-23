import { REPORT_CATEGORY, REPORT_TYPE } from '@/constants/report.constant'
import { TReport } from '@/types/report.type'
import axios from './axios'

const ENDPOINT = `/reports`

type TReportPayload = {
  type: REPORT_TYPE
  reason: string
  category: REPORT_CATEGORY[]
  id: number
}

const PROPERTY_NAME = new Map([[REPORT_TYPE.MENTORING_REVIEW, 'mentoringReviewId']])

export const report = async (payload: TReportPayload) => {
  const propertyName = PROPERTY_NAME.get(payload.type) || ''
  const { id, ...rest } = payload
  const mappingPayload = { ...rest, [propertyName]: payload.id }
  const { data } = await axios.post(`${ENDPOINT}`, mappingPayload)
  return {
    data: data?.data as TReport
  }
}
