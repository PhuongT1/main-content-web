import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'
import { AxiosError } from 'axios'
import { IMyProject } from '../domain'

const ENDPOINT = '/project-part/projects'

export type UpdateProjectPayload = {
  id: string
  name?: string
  description?: string
  imageUrl?: string
}

export type UpdateProjectResponse = {
  data?: { metaData: Metadata; result: IMyProject }
  error?: AxiosError
}

export const updateProject = async (body: UpdateProjectPayload) => {
  const { id, ...rest } = body
  const res = await axios.put(`${ENDPOINT}/${id}`, rest)
  const { data, error }: IResponse = res

  return {
    data: data?.data as { metaData: Metadata; result: IMyProject },
    error: error as AxiosError
  } as UpdateProjectResponse
}
