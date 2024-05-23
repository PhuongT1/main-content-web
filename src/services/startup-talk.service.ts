import { IResponse } from '@/types/response.types'
import { IStartupTalk, IStartupTalkCreate, IStartupTalkListRequest } from '@/types/startup-talk.type'
import { Metadata } from '@/types/types.type'
import axios from './axios'

const ENDPOINT = '/startup-talks'

export interface IStartupTalkResponse {
  data: any
  error: any
}

export interface ISendContactStartupTalk {
  name?: string
  email: string
  phoneNumber: string
  content?: string
}

export async function getUserStartupTalk(): Promise<IStartupTalk | any> {
  const { data } = await axios.get<any>(`${ENDPOINT}/me`)
  return data.data
}

export async function getStartupTalkById(id: string | number): Promise<IStartupTalkResponse> {
  const res = await axios.get<any>(`${ENDPOINT}/active/` + id)
  const { data, error }: IResponse = res
  return {
    data: data?.data as IStartupTalk,
    error: error
  }
}

export async function createUserStartupTalk(submitData: IStartupTalkCreate) {
  const res = await axios.post<any>(`${ENDPOINT}`, submitData)
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

export async function updateUserStartupTalk({
  id,
  submitData
}: {
  id: string | number
  submitData: IStartupTalkCreate
}) {
  const res = await axios.put<any>(`${ENDPOINT}/${id}`, submitData)
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

export async function sendContactStartupTalk(reqData: { submitData: ISendContactStartupTalk; id: number | string }) {
  const res = await axios.post<any>(`${ENDPOINT}/` + reqData.id + '/contact', reqData.submitData)
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

export async function getStartupTalkList(params: IStartupTalkListRequest) {
  const { data } = await axios.get(`${ENDPOINT}/active`, {
    params: {
      ...params
    }
  })
  return {
    data: data?.data as { metaData: Metadata; result: any }
  }
}

export async function deleteStartupTalkById(id: string | number) {
  const res = await axios.delete<any>(`${ENDPOINT}/` + id)
  const { data, error }: IResponse = res
  return {
    data: data?.data,
    error: error
  }
}
