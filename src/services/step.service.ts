import { StepQuery, TStepApi, TStepPayload } from '@/types/step.type'
import axios from './axios'

const ENDPOINT = '/project-part/steps'

export async function getSteps(query: { deckId: number }): Promise<{ data: TStepApi[] }> {
  const { data } = await axios.get(`${ENDPOINT}`, { params: { ...query } })
  return data
}

export async function postStep<T>(payload: TStepPayload<T>): Promise<TStepApi> {
  const { data } = await axios.post(`${ENDPOINT}`, payload)
  return data
}

export async function getStep(query: StepQuery): Promise<{ data: { data: TStepApi } }> {
  const { data } = await axios.get(`${ENDPOINT}/activities`, { params: { ...query } })
  return data
}
