import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'
import { AxiosError } from 'axios'
import { IFolder } from '../domain'

const ENDPOINT = '/project-part/project-folders'

export type UpdateFolderPayload = {
  folderId?: string
  name?: string
  description?: string
}

export type UpdateFolderResponse = {
  data?: { metaData: Metadata; result: IFolder }
  error?: AxiosError
}

export const updateFolder = async (body: UpdateFolderPayload) => {
  const { folderId, ...rest } = body
  const res = await axios.put(`${ENDPOINT}/${folderId}`, rest)
  const { data, error }: IResponse = res

  return {
    data: data?.data as { metaData: Metadata; result: IFolder },
    error: error as AxiosError
  } as UpdateFolderResponse
}
