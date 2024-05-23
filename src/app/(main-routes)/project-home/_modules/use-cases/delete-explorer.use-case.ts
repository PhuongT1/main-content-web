import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'
import { AxiosError } from 'axios'
import { EXPLORER_CATEGORY_ENUM, IMyProject } from '../domain'

const ENDPOINT = '/project-part/project-explorers'

export type DeleteExplorersPayload = {
  explorerIds: number[]
  category: EXPLORER_CATEGORY_ENUM
  dataProject?: IMyProject
}

export type DeleteExplorersResponse = {
  data?: { metaData: Metadata; result: number[] }
  error?: AxiosError
}

export const deleteExplorers = async (params: DeleteExplorersPayload) => {
  const { dataProject, ...rest } = params
  const res = await axios.delete(`${ENDPOINT}`, { params: rest })
  const { data, error }: IResponse = res

  return {
    data: data?.data as { metaData: Metadata; result: number[] },
    error: error as AxiosError
  } as DeleteExplorersResponse
}
