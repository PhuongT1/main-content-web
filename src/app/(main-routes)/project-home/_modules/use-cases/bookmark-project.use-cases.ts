import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'
import { AxiosError } from 'axios'
import { EXPLORER_CATEGORY_ENUM } from '../domain'

const ENDPOINT = '/project-part/project-explorers/bookmark'

export type BookmarkProjectPayload = {
  explorerIds: number[]
  category: EXPLORER_CATEGORY_ENUM
}

export type BookmarkProjectResponse = {
  data?: { metaData: Metadata; result: number }
  error?: AxiosError
}

export const bookmarkProject = async (body: BookmarkProjectPayload) => {
  const res = await axios.post(`${ENDPOINT}`, body)
  const { data, error }: IResponse = res
  if (error) throw error
  return data?.data
}
