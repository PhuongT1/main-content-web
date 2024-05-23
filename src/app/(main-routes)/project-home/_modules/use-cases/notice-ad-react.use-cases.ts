import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'
import { AxiosError } from 'axios'
import { EXPLORER_CATEGORY_ENUM, NOTICE_ADD_REACT_ENUM } from '../domain'

const ENDPOINT = '/project-part/notice-ad'

export type NoticeAdReactPayload = {
  id: string
  type: NOTICE_ADD_REACT_ENUM
  position: EXPLORER_CATEGORY_ENUM
}

export type NoticeAdReactResponse = {
  data?: { metaData: Metadata; result: number }
  error?: AxiosError
}

export const noticeAdReact = async (body: NoticeAdReactPayload) => {
  const { id, ...rest } = body
  const res = await axios.post(`${ENDPOINT}/${id}/react`, { ...rest })
  const { data, error }: IResponse = res

  return {
    data: data?.data as { metaData: Metadata; result: number },
    error: error as AxiosError
  } as NoticeAdReactResponse
}
