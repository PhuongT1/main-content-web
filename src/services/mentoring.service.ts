import { MENTORING_BADGE, MENTORING_STATUS } from '@/constants/community/mentoring.constant'
import { APPLICATION_PROGRESS } from '@/constants/mentor.constant'
import customQueryString from '@/libs/query-string.lib'
import {
  IMentorTransaction,
  MentoringOrder,
  TMentor,
  TMentoringReview,
  TReviewAnalysis
} from '@/types/community/mentoring.type'
import {
  IMentorProfile,
  IMentorRevenue,
  IMentoringNotice,
  IMentoringNoticeListRequest,
  IReviewMentor,
  IReviewOfMentorAnalysis,
  IReviewOfMentorListRequest
} from '@/types/mentoring.type'
import { IResponse } from '@/types/response.types'
import { Metadata, PaginationPayload, TResponse } from '@/types/types.type'
import { AxiosError } from 'axios'
import axios from './axios'

const ENDPOINT = '/mentoring'

export interface IMenteeListOfMentorRequest {
  status?: string
  keyword?: string
  keySearch?: string
  page?: number | string
  limit?: number | string
  fromDate?: string
  toDate?: string
}

export interface IUpdateApplicationStatus {
  mentoringId: number
  mentoringApplicationId: number
  status: APPLICATION_PROGRESS
}

export interface IMentorWriteReview {
  id: number
  applicationId: number
  mentorReport: string
}

// export async function createMentoring({ id, payload }: { id: number; payload: CreateMentoringPayload }) {
//   const res = await axios.post(`${ENDPOINT}/${id}/recruit`, payload)
//   const { data, error }: IResponse = res
//   return {
//     data: data.data as Mentoring,
//     error
//   }
// }

// export async function getMentoringList({ id, params }: { id: number; params: PaginationPayload }) {
//   const res = await axios.get(`${ENDPOINT}/${id}/recruit`, {
//     params: params
//   })
//   const { data, error }: IResponse = res
//   return {
//     data: data.data as { metaData: Metadata; result: Mentoring[] },
//     error
//   }
// }

type GetMentorsPayload = {
  status: MENTORING_STATUS[]
  keySearch?: string
  keyword?: string
  badge?: MENTORING_BADGE[]
  category?: number[]
} & PaginationPayload

export const getMentors = async (payload: GetMentorsPayload) => {
  const { data } = await axios.get(`${ENDPOINT}`, {
    params: { ...payload, isPublic: true },
    paramsSerializer: (params) => customQueryString.stringify(params),
    showErrorDialog: true
  })
  return {
    data: data?.data as { metaData: Metadata; result: TMentor[] }
  }
}

export const getMentor = async (id: number) => {
  const { data } = await axios.get(`${ENDPOINT}/${id}`)
  return {
    data: data?.data as TMentor
  }
}

type LinkToMentorPayload = {
  id: number
  productContentId: number
  orderId: number
  note?: string
}

export const linkToMentor = async ({ id, ...rest }: LinkToMentorPayload) => {
  const { data } = await axios.post(`${ENDPOINT}/${id}/apply-to-mentoring`, rest, {
    showErrorDialog: true
  })
  return {
    data: data?.data as MentoringOrder
  }
}

export async function getMentorProfile(id: number) {
  const res = await axios.get(`${ENDPOINT}/${id}`)
  const { data, error }: IResponse = res
  return {
    data: data.data as IMentorProfile,
    error
  }
}

export const getMyMentorProfile = async () => {
  const res = await axios.get(`${ENDPOINT}/me`)
  const { data, error }: IResponse = res
  return {
    data: data?.data as IMentorProfile,
    error: error as AxiosError
  }
}

export const getMyMentorRevenue = async (id: number) => {
  const res = await axios.get(`${ENDPOINT}/${id}/revenue-amount-from-settlements`)
  const { data, error }: IResponse = res
  return {
    data: data?.data as IMentorRevenue,
    error: error as AxiosError
  }
}

export async function updateMyMentorProfile(reqData: any) {
  const res = await axios.patch(`${ENDPOINT}/me`, reqData)
  const { data, error }: IResponse = res
  return {
    data: data.data as IMentorProfile,
    error
  }
}

export async function getMentoringNoticeList(params: IMentoringNoticeListRequest) {
  const res = await axios.get(`${ENDPOINT}/notice/active`, {
    params: {
      ...params
    }
  })
  const { data, error }: IResponse = res

  return {
    data: data as { metaData: Metadata; result: IMentoringNotice[] },
    error
  }
}

export async function getReviewOfMentorList({ id, ...restParams }: IReviewOfMentorListRequest) {
  const res = await axios.get(`${ENDPOINT}/${id}/reviews`, {
    params: {
      ...restParams
    }
  })
  const { data, error }: IResponse = res
  return {
    data: data.data as { metaData: Metadata; result: IReviewMentor[] },
    error
  }
}

export async function getReviewOfMentorAnalysis({ id }: IReviewOfMentorListRequest) {
  const res = await axios.get(`${ENDPOINT}/${id}/reviews-analysis`)
  const { data, error }: IResponse = res
  return {
    data: data.data as IReviewOfMentorAnalysis[],
    error
  }
}

export async function getMentoringNoticeDetail(id: string) {
  const res = await axios.get(`${ENDPOINT}/${id}/notice/active`)
  const { data, error }: IResponse = res
  return {
    data: data.data as IMentoringNotice,
    error
  }
}

export async function getMenteeListOfMentor(params: IMenteeListOfMentorRequest) {
  const { data } = await axios.get(`${ENDPOINT}/mentor/my-page`, {
    params: {
      ...params
    }
  })
  return data
}

export async function updateMenteeRequestStatus(reqData: IUpdateApplicationStatus) {
  const { data } = await axios.put(`${ENDPOINT}/mentor/update-application-status`, { ...reqData })
  return data
}

export async function mentorRequestInquiry(params: IMenteeListOfMentorRequest) {
  const { data } = await axios.get(`${ENDPOINT}/mentee/my-page`, {
    params: {
      ...params
    }
  })
  return data
}

export async function mentorWriteReview({ id, applicationId, ...restData }: IMentorWriteReview) {
  const { data } = await axios.put(`${ENDPOINT}/${id}/applications/${applicationId}/mentor-reports`, { ...restData })
  return data
}
export async function getMentorsWithBestReview(params: PaginationPayload) {
  const { data } = await axios.get(`${ENDPOINT}/get-best-of-reviews`, {
    params: {
      ...params
    }
  })
  return {
    data: data?.data as { metaData: Metadata; result: TMentoringReview[] }
  }
}

// export async function updateMentoring({
//   id,
//   recruitId,
//   payload
// }: {
//   id: number
//   recruitId: number
//   payload: { status?: TEAM_BUILDING_RECRUITMENT_STATUS } & Partial<CreateMentoringPayload>
// }) {
//   const res = await axios.patch(`${ENDPOINT}/${id}/recruit/${recruitId}`, payload)
//   const { data, error }: IResponse = res
//   return {
//     data: data.data as Mentoring,
//     error
//   }
// }

type TApplyMentorPayload = {
  categories: {
    id: number
  }[]
  username: string
  email: string
  nameOfAffiliation?: string
  position?: string
  skills: string
  otherInformation?: string
  urls?: string[]
  portfolios?: {
    id: number
  }[]
}

export const applyMentor = async (payload: TApplyMentorPayload) => {
  const res = await axios.post(`${ENDPOINT}`, payload)
  const { data, error }: IResponse = res
  return {
    data: data?.data as TMentor,
    error: error as AxiosError
  }
}

export const mentorUpdateReviewBadge = async ({
  reviewId,
  mentoringId,
  ...rest
}: {
  reviewId: number
  mentoringId: number
  badge: string[]
}) => {
  const { data } = await axios.put(`${ENDPOINT}/${mentoringId}/reviews/${reviewId}`, rest)
  return {
    data: data?.data,
    error: data.error
  }
}

type TGetReviewsByMentoringIdParams = PaginationPayload & {
  id: number
}

type IMentorTransactionRequest = {
  fromDate?: string
  toDate?: string
  status?: string
  mentoringTransactionStatus?: string
} & TGetReviewsByMentoringIdParams

export async function getReviewsByMentoringId({ id, ...rest }: TGetReviewsByMentoringIdParams) {
  const { data } = await axios.get<TResponse<TMentoringReview>>(`${ENDPOINT}/${id}/reviews`, {
    params: {
      ...rest
    }
  })
  return data
}

export async function getReviewsAnalysisByMentoringId({ id }: { id: number }) {
  const { data } = await axios.get(`${ENDPOINT}/${id}/reviews-analysis`)
  return {
    data: data?.data as TReviewAnalysis[]
  }
}

export const removeReviews = async (payload: { reviewId: number }) => {
  const { data } = await axios.put(`${ENDPOINT}/mentor/reviews`, payload)
  return {
    data: data?.data as TMentoringReview
  }
}

export async function getMentorSettlementTransaction({ id, ...rest }: IMentorTransactionRequest) {
  const { data } = await axios.get<TResponse<IMentorTransaction>>(`${ENDPOINT}/${id}/applications`, {
    params: {
      ...rest
    }
  })
  return data
}

type TUpdateBankAccount = {
  bankAccountName: string
  bankName: string
  bankAccountNumber: string
  id: number
}

export const updateMentorBankAccount = async ({ id, ...restReq }: TUpdateBankAccount) => {
  const { data } = await axios.patch(`${ENDPOINT}/${id}`, restReq)
  return {
    data: data?.data,
    error: data.error
  }
}
