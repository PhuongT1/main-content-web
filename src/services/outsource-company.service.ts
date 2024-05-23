import { IOutsourceCompany, IOutsourceCompanyListRequest } from '@/types/outsource-company.type'
import { IResponse } from '@/types/response.types'
import axios from './axios'

const ENDPOINT = '/company'
export interface IOutsourceCompanyResponse {
  data: any
  error: any
}

export interface ISendContactOutsourceCompany {
  name?: string
  email: string
  phoneNumber: string
  content?: string
}

export async function getUserOutsourceCompany(): Promise<IOutsourceCompany | any> {
  const { data } = await axios.get<any>(`${ENDPOINT}/me`)
  return data.data
}

export async function getOutsourceCompanyById(id: string | number): Promise<IOutsourceCompanyResponse> {
  const res = await axios.get<any>(`${ENDPOINT}/` + id)
  const { data, error }: IResponse = res
  return {
    data: data?.data as IOutsourceCompany,
    error: error
  }
}

export async function createUserOutsourceCompany(submitData: IOutsourceCompany) {
  const res = await axios.post<any>(`${ENDPOINT}`, submitData)
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

export async function updateUserOutsourceCompany(submitData: IOutsourceCompany) {
  const res = await axios.put<any>(`${ENDPOINT}`, submitData)
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

export async function sendContactOutsourceCompany(reqData: { submitData: ISendContactOutsourceCompany, id: number | string }) {
  const res = await axios.post<any>(`${ENDPOINT}/` + reqData.id + '/contact', reqData.submitData)
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

export async function getOutsourceCompanyList(params: IOutsourceCompanyListRequest) {
  const { data } = await axios.get(`${ENDPOINT}`, {
    params: {
      ...params
    }
  })
  return data
}
