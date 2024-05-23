import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'
import { AxiosError } from 'axios'
import { IProject } from '../domain'

const ENDPOINT = '/project-part/projects/group'

export type CreateGroupProjectPayload = {
  folderId?: string | null
  name?: string
  templateId?: number
  imageUrl?: string
  description?: string
}

export type CreateGroupProjectResponse = {
  data?: { metaData: Metadata; result: IProject }
  error?: AxiosError
}

export const createGroupProject = async (body: CreateGroupProjectPayload) => {
  const res = await axios.post(`${ENDPOINT}`, body)
  const { data, error }: IResponse = res

  return {
    data: data?.data as { metaData: Metadata; result: IProject },
    error: error as AxiosError
  } as CreateGroupProjectResponse
}
