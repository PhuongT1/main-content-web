import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { AxiosError } from 'axios'
import { IFolderDetail } from '../domain'

const ENDPOINT = '/project-part/project-folders'

export type GetFolderDetailPayload = {
  folderId?: number
}

export type GetFolderDetailResponse = {
  data?: IFolderDetail
  error?: AxiosError
}

export const getFolderDetail = async (params: GetFolderDetailPayload) => {
  const { folderId } = params
  const res = await axios.get(`${ENDPOINT}/${folderId}`)
  const { data, error }: IResponse = res

  return {
    data: data?.data as IFolderDetail,
    error: error as AxiosError
  } as GetFolderDetailResponse
}
