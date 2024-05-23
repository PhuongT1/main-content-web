import axios from './axios'
import { TTypesSA } from '@/types/strength-analysis.type'

const ENDPOINT = '/project-part/step-resources/advantage-analysis/strength'

export async function getStrenghtList(): Promise<{ data: TTypesSA[] }> {
  const { data } = await axios.get(`${ENDPOINT}`)
  return data
}
