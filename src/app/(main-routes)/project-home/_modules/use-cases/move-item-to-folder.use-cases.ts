import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { AxiosError } from 'axios'
import { EXPLORER_CATEGORY_ENUM } from '../domain'

const ENDPOINT = '/project-part/project-explorers/move-items'

export type MoveItemToFolderPayload = {
  targetExplorerId: number
  explorerIds: number[]
  category: EXPLORER_CATEGORY_ENUM
}

export type MoveItemToFolderResponse = {
  data?: number
  error?: AxiosError
}

export const moveItemToFolder = async (body: MoveItemToFolderPayload) => {
  const res = await axios.put(`${ENDPOINT}`, body)
  const { data, error }: IResponse = res

  return {
    data: data?.data as number,
    error: error as AxiosError
  } as MoveItemToFolderResponse
}
