'use server'
import axios from '@/services/axios'
import { PressReleaseType } from '@/types/press-release/press-release.type'
import { IResponse } from '@/types/response.types'

const ENDPOINT = '/project-part/step-resources'

export const getExplorePressType = async <T extends object>() => {
  const res = await axios.get(`${ENDPOINT}/report-documents`)
  const { data, error }: IResponse = res
  return {
    data: data?.data as PressReleaseType[],
    error: error
  }
}

export const getExplorePressTypeByName = async <T extends object>(params: T) => {
  const res = await axios.get(`${ENDPOINT}/report-documents/name`, { params: { ...params } })
  const { data, error }: IResponse = res
  return {
    data: data?.data as PressReleaseType,
    error: error
  }
}

export async function createPressRelease<T extends object>(submitData: T) {
  const res = await axios.post<any>(`${ENDPOINT}/report-documents/openai/content-press-release`, { data: submitData })
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}
