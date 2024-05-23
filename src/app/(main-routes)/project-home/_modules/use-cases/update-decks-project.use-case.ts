import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'
import { AxiosError } from 'axios'
import { IProject } from '../domain'

const ENDPOINT = '/project-part/projects'

type DeckInput = { position: number; deckId: number }

export type UpdateDecksProjectPayload = {
  id: string | number
  folderId?: string | null
  name?: string
  numberOfDeck?: number
  decks?: DeckInput[]
  templateId?: number
  imageUrl?: string
  description?: string
}

export type UpdateDecksProjectResponse = {
  data?: { metaData: Metadata; result: IProject }
  error?: AxiosError
}

export const updateDecksProject = async (body: UpdateDecksProjectPayload) => {
  const { id, ...rest } = body
  const res = await axios.put(`${ENDPOINT}/${id}/deck`, rest)
  const { data, error }: IResponse = res

  return {
    data: data?.data as { metaData: Metadata; result: IProject },
    error: error as AxiosError
  } as UpdateDecksProjectResponse
}
