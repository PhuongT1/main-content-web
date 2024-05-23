import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'

const ENDPOINT = '/startup-talks'
const ENDPOINT_COMMENT = '/comments'

type TStartUpTalkActive = {
  categoryId: number
  listType: string
  userId: number
  page: number
  limit: number
}

type TStartUpTalkComment = {
  type: string
  userId: number
  listType: string
  page: number
  limit: number
}

export const getStartUpTalkActiveList = async (params: TStartUpTalkActive) => {
  const data = await axios.get(`${ENDPOINT}/active`, {
    params: {
      ...params
    }
  })

  return data.data
}

export const getStartUpTalkCommentList = async (params: TStartUpTalkComment) => {
  const data = await axios.get(`${ENDPOINT_COMMENT}`, {
    params: {
      ...params
    }
  })

  return data.data
}

export const deleteStartupTalkById = async (id: number) => {
  const res = await axios.delete(`${ENDPOINT}/${id}`)
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

export const deleteStartupTalkCommentById = async (id: number) => {
  const res = await axios.delete(`${ENDPOINT_COMMENT}/${id}`)
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}
