import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { AxiosError } from 'axios'
import { IUserMe } from '@/types/user.type'

const ENDPOINT = '/project-part/users/me'

export type GetUserMePayload = {}

export type GetUserMeResponse = {
  data?: IUserMe
  error?: AxiosError
}

export const getUserMe = async (params?: GetUserMePayload) => {
  const res = await axios.get(`${ENDPOINT}`)
  const { data, error }: IResponse = res
  if (error) {
    throw error
  }
  return {
    data: data?.data as IUserMe,
    error: error as AxiosError
  } as GetUserMeResponse
}
