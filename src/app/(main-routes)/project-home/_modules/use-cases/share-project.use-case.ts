import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'
import { AxiosError } from 'axios'

const ENDPOINT = '/project-part/project-shares'

export type ShareProjectPayload = {
  projectId: number
  isBlocked: boolean
  userIds: number[]
}

export type ShareProjectResponse = {
  data?: { metaData: Metadata; result: number[] }
  error?: AxiosError
  variables?: ShareProjectPayload
}

export const shareProject = async (body: ShareProjectPayload) => {
  const res = await axios.put(`${ENDPOINT}`, body)
  const { data, error }: IResponse = res
  if (error) {
    throw {
      error,
      data,
      variables: body
    }
  }
  return {
    data: data?.data as { metaData: Metadata; result: number[] },
    error: error as AxiosError,
    variables: body
  } as ShareProjectResponse
}
