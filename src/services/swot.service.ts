import { ParamsGPT, ParamsGetSwots, SwotCategory } from '@/types/swot.type'
import axios from './axios'

const ENDPOINT_PROJECT_PART = '/project-part'
const ENDPOINT = `${ENDPOINT_PROJECT_PART}/step-resources`

export const getSwotCategory = async () => {
  const { data } = await axios.get<SwotCategory[]>(`${ENDPOINT}/swot/category`)
  return data
}

export const getSwot = async (params: ParamsGetSwots) => {
  const { data } = await axios.get<any>(`${ENDPOINT}/swot`, { params })
  return data
}

export const getSwotGPT = async (body: ParamsGPT) => {
  const { data } = await axios.post<any>(`${ENDPOINT}/swot/openai/analysis/properties`, body)
  return data
}
