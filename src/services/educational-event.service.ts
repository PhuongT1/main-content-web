'use client'
import {
  EDUCATIONAL_EVENT_TYPE,
  EVENT_APPLICATION_NOTIFICATION,
  EVENT_STATUS_RECRUITMENT
} from '@/constants/community/educational-event.constant'
import axios from '@/services/axios'
import { TEvent, TSupportEvent } from '@/types/community/educational-event.type'
import { IResponse } from '@/types/response.types'
import { Metadata, PagePayload, PaginationPayload } from '@/types/types.type'
import { AxiosError } from 'axios'

const ENDPOINT = '/events'

type GetEducationalEventPayload = {
  categoryId?: string
  statusRecruitment?: EVENT_STATUS_RECRUITMENT
  type?: EDUCATIONAL_EVENT_TYPE
  currentId?: string
} & PaginationPayload

type GetSupportEventPayload = {
  formDate?: string
  toDate?: string
} & PagePayload

export type TApplyEventPayload = {
  eventId: number
  orderId?: number
  nickname: string
  phoneNumber: string
  email: string
  companyName?: string
  idea?: string
  attachmentId?: number
  couponId?: number
}

export const getActiveEducationalEvents = async ({
  categoryId,
  statusRecruitment,
  type,
  currentId,
  page,
  limit
}: GetEducationalEventPayload) => {
  const { data } = await axios.get(`${ENDPOINT}/active`, {
    params: {
      ...(categoryId && { categoryId }),
      ...(currentId && { currentId }),
      ...(statusRecruitment && { statusRecruitment }),
      ...(type && { type }),
      page,
      limit
    }
  })
  return {
    data: data?.data as { metaData: Metadata; result: TEvent[] }
  }
}

export const getSupportEvent = async (params: GetSupportEventPayload) => {
  const { data } = await axios.get(`${ENDPOINT}/support-project`, {
    params: params
  })
  return {
    data: data?.data as { metaData: Metadata; result: TSupportEvent[] }
  }
}

export const getActiveEducationalEventDetail = async (id: number) => {
  const { data } = await axios.get(`${ENDPOINT}/active/${id}`)
  return {
    data: data?.data as TEvent
  }
}

export const getEducationApplicationList = async (params: any) => {
  const data = await axios.get(`${ENDPOINT}/application/active`, {
    params: {
      ...params
    }
  })

  return data.data
}

export const applyEvent = async (payload: TApplyEventPayload) => {
  const res = await axios.post(`${ENDPOINT}/application`, payload, {
    showErrorDialog: true
  })
  const { data, error }: IResponse = res
  return {
    data: data?.data as { status: EVENT_APPLICATION_NOTIFICATION },
    error: error as AxiosError
  }
}

export const checkApplication = async (params: { eventId: number }) => {
  const res = await axios.get(`${ENDPOINT}/application/check`, {
    params: params
  })
  const { data, error }: IResponse = res
  return {
    data: data?.data as { status: EVENT_APPLICATION_NOTIFICATION; indexWaiting?: number },
    error: error as AxiosError
  }
}
