import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'
import { AxiosError } from 'axios'
import { IDetailProject } from '../domain'

const ENDPOINT = '/project-part/projects'

export type CloneProjectPayload = {
  projectId: string | number
}

export type CloneProjectResponse = {
  data?: { metaData: Metadata; result: IDetailProject }
  error?: AxiosError
}

export const cloneProject = async (body: CloneProjectPayload) => {
  const { projectId } = body
  const res = await axios.post(`${ENDPOINT}/${projectId}/clone`)
  const { data, error }: IResponse = res

  return {
    data: data?.data as { metaData: Metadata; result: IDetailProject },
    error: error as AxiosError
  } as CloneProjectResponse
}
