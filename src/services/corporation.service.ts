import { BaseReponseList, TCategoryItem, TOrganizationItem, TQueryOrganizations } from '@/types/teambuilding/index.type'
import axios from './axios'
const ENDPOINT = '/project-part/step-resources/articles-of-incorporations'

export async function getCategories(): Promise<TCategoryItem[]> {
  const { data } = await axios.get(`${ENDPOINT}/categories`)
  return data?.data
}

export async function getCorporation(query: TQueryOrganizations): Promise<BaseReponseList<TOrganizationItem>> {
  if (query.categoryId) {
    const { data } = await axios.get(`${ENDPOINT}`, { params: { ...query } })
    return data
  }
  const { data } = await axios.get(`${ENDPOINT}`, { params: { ...query } })
  return data
}
