import {
  DataIdeaResponseViaAI,
  DataIdeaResponseViaWriteIdeaAI,
  FindIdeaResponse,
  FourIdeaItem,
  QueryIdeaAI,
  QueryIndustrial,
  QueryWriteIdeaAI
} from '@/types/idea.type'
import axios from './axios'

const ENDPOINT = '/project-part/step-resources/four-ideas'

export async function getFourIdea(query: QueryIndustrial): Promise<{ data: FourIdeaItem[] }> {
  const { data } = await axios.get(`${ENDPOINT}`, { params: { ...query } })
  return data
}
export async function getIdeaViaAI(query: QueryIdeaAI): Promise<DataIdeaResponseViaAI> {
  const { data } = await axios.get(`${ENDPOINT}/chat-gpt`, { params: { ...query } })
  return data
}
export async function getWriteIdeaViaAI(query: QueryWriteIdeaAI): Promise<DataIdeaResponseViaWriteIdeaAI> {
  const { data } = await axios.post(`${ENDPOINT}/chat-gpt/final-idea`, { ...query })
  return data?.data
}

export async function getFourIdeaByIndustrial(query: QueryIndustrial): Promise<{ data: FindIdeaResponse }> {
  const { data } = await axios.get(`${ENDPOINT}/idea`, { params: { ...query } })
  return data
}
