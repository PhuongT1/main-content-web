import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'
import { AxiosError } from 'axios'
import { IProject } from '../domain'

const ENDPOINT = '/project-part/projects/individual'

type DeckInput = { position: number; deckId: number }

export type CreateIndividualProjectPayload = {
  folderId?: string | null
  name?: string
  numberOfDeck?: number
  decks?: DeckInput[]
  templateId?: number
  imageUrl?: string
  description?: string
}

export type CreateIndividualProjectResponse = {
  data?: { metaData: Metadata; result: IProject }
  error?: AxiosError
}

export const createIndividualProject = async (body: CreateIndividualProjectPayload) => {
  const res = await axios.post(`${ENDPOINT}`, body)
  const { data, error }: IResponse = res

  if (error) throw error

  return {
    data: data?.data as { metaData: Metadata; result: IProject },
    error: error as AxiosError
  } as CreateIndividualProjectResponse
}
