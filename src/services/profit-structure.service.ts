import axios from './axios'
import { IProfitGenerationStructureRequest, IItemProfitGenerationStructure } from '@/types/profit-structure.type'

const ENDPOINT = `/project-part/step-resources`

export async function getRevenueStructure(params: IProfitGenerationStructureRequest) {
  const { data = {} } = await axios.get<any>(`${ENDPOINT}/revenue-structure`, { params: { ...params } })
  return data?.data as IItemProfitGenerationStructure[]
}
