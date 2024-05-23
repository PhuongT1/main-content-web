import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'
import { AxiosError } from 'axios'
import { IFolderDetail } from '../domain'

const ENDPOINT = '/project-part/project-folders/explorer'

export type GetTemplateGroupByExplorerPayload = {
  explorerId: number
}

export type GetTemplateGroupByExplorerResponse = {
  data?: { metaData: Metadata; result: IFolderDetail }
  error?: AxiosError
}

export const getTemplateGroupByExplorer = async ({ explorerId }: GetTemplateGroupByExplorerPayload) => {
  const res = await axios.get(`${ENDPOINT}/${explorerId}`)
  const { data, error }: IResponse = res
  if (error) {
    throw error
  }
  return {
    data: data?.data as { metaData: Metadata; result: IFolderDetail },
    error: error as AxiosError
  } as GetTemplateGroupByExplorerResponse
}
