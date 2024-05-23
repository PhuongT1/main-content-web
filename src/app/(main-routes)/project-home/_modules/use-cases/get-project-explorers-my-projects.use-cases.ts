import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { Metadata, PaginationPayload } from '@/types/types.type'
import { AxiosError } from 'axios'
import { EXPLORER_CATEGORY_ENUM, IMyProject, SORT_PROJECT_ENUM } from '../domain'

const ENDPOINT = '/project-part/project-explorers'

export type GetProjectExplorersPayload = {
  name?: string
  explorerId?: number
  category?: EXPLORER_CATEGORY_ENUM
  sortType?: SORT_PROJECT_ENUM
} & PaginationPayload

export type GetProjectExplorersResponse = {
  data?: { metaData: Metadata; result: IMyProject[] }
  error?: AxiosError
}

export const getProjectExplorersMyProjects = async (params: GetProjectExplorersPayload) => {
  const res = await axios.get(`${ENDPOINT}`, {
    params
  })
  const { data, error }: IResponse = res
  if (error) throw error
  return data?.data as { metaData: Metadata; result: IMyProject[] }
}
