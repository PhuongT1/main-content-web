import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { Metadata, PaginationPayload } from '@/types/types.type'
import { AxiosError } from 'axios'
import { PROJECT_TYPE_ENUM, IProjectTemplate } from '../domain'

const ENDPOINT = '/project-part/projects/templates'

type GetTemplatesProjectPartPayload = { type?: PROJECT_TYPE_ENUM } & PaginationPayload

export const getTemplatesProjectPart = async (params: GetTemplatesProjectPartPayload) => {
  const res = await axios.get(`${ENDPOINT}`, {
    params
  })
  const { data, error }: IResponse = res
  return {
    data: data?.data as { metaData: Metadata; result: IProjectTemplate[] },
    error: error as AxiosError
  }
}
