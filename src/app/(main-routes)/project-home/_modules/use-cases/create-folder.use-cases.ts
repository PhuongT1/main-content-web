import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { AxiosError } from 'axios'
import { EXPLORER_CATEGORY_ENUM, IFolder } from '../domain'

const ENDPOINT = '/project-part/project-folders'

export type CreateFolderPayload = {
  name?: string
  parentId?: number
  description?: string
  category?: EXPLORER_CATEGORY_ENUM
}

export type CreateFolderResponse = {
  data?: IFolder
  error?: AxiosError
}

export const createFolder = async (body: CreateFolderPayload) => {
  const res = await axios.post(`${ENDPOINT}`, body)
  const { data, error }: IResponse = res

  return {
    data: data?.data as IFolder,
    error: error as AxiosError
  } as CreateFolderResponse
}
