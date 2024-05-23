import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'
import { AxiosError } from 'axios'
import { IProject } from '../domain'

const ENDPOINT = '/project-part/projects/benchmark'

type DeckInput = { position: number; deckId: number }

export type CreateStartupBenchmarkingPayload = {
  folderId?: string | null
  name?: string
  numberOfDeck?: number
  decks?: DeckInput[]
  templateId?: number
  imageUrl?: string
  logoUrl?: string
  description?: string
}

export type CreateStartupBenchmarkingResponse = {
  data?: { metaData: Metadata; result: IProject }
  error?: AxiosError
}

export const createStartupBenchmarking = async (body: CreateStartupBenchmarkingPayload) => {
  const res = await axios.post(`${ENDPOINT}`, body)
  const { data, error }: IResponse = res

  if (error) throw error

  return {
    data: data?.data as { metaData: Metadata; result: IProject },
    error: error as AxiosError
  } as CreateStartupBenchmarkingResponse
}
