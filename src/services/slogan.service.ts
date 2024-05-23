import { ReferenceSloganType, GetReferenceSloganType, SloganConceptType } from '@/types/slogan.type'
import axios from './axios'

const ENDPOINT = '/project-part/step-resources/slogans'

export async function getSloganConcept(): Promise<SloganConceptType[]> {
  const { data } = await axios.get(`${ENDPOINT}/slogan-concept`)
  return data
}

export async function getSloganGPT(form: GetReferenceSloganType): Promise<ReferenceSloganType[]> {
  const { data } = await axios.get(`${ENDPOINT}/chat-gpt?${new URLSearchParams({ ...form })}`)
  return data.data
}
