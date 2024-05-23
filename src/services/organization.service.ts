import axios from './axios'
import { BaseReponseList, TCategoryItem, TOrganizationItem, TQueryOrganizations } from '@/types/teambuilding/index.type'

const ENDPOINT = '/project-part/step-resources/organizational-cultures'

export async function getCategories(): Promise<TCategoryItem[]> {
  const { data } = await axios.get(`${ENDPOINT}/category`)
  return data
}
export async function getOrganizational(query: TQueryOrganizations): Promise<BaseReponseList<TOrganizationItem>> {
  if (query.categoryId) {
    const { data } = await axios.get(`${ENDPOINT}/category/${query.categoryId}`, { params: { ...query } })
    return data
  }
  const { data } = await axios.get(`${ENDPOINT}`, { params: { ...query } })
  return data
}
