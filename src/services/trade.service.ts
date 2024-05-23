import { NamingTab, ResponseDataNaming, SearchTab } from '@/types/naming.type'
import axios from './axios'
import { ResponseProject, StepActivity } from '@/types/deck.type'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'

const ENDPOINT_PROJECT_PART = '/project-part'
const ENDPOINT = `${ENDPOINT_PROJECT_PART}/step-resources/trade-data`

export type TTradeCompanyParams = {
  page: number
  limit: number
  order?: string
  keywords: string
}

const getTradeCategory = async () => {
  const { data } = await axios.get(`${ENDPOINT}/category`)
  return data
}

const getClasifications = async (params?: { categoryId?: number; keywords?: string }) => {
  const { data } = await axios.get(`${ENDPOINT}`, { params: params })
  return data
}

const getTradeCompanies = async (params?: TTradeCompanyParams) => {
  const { data } = await axios.get(`${ENDPOINT}/search/trade-company`, { params: params })
  return {
    data: data?.data as { metaData: Metadata; result: { item: any[] } }
  }
}

const postTradeSteps = async (dataPost: any) => {
  console.log('hi')

  const dataRes = await axios.post(`${ENDPOINT_PROJECT_PART}/steps`, dataPost)
  const { data, error } = dataRes as IResponse

  return { data, error }
}

export { getClasifications, getTradeCategory, postTradeSteps, getTradeCompanies }
