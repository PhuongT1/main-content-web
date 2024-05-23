import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { Metadata, PaginationPayload } from '@/types/types.type'
import { AxiosError } from 'axios'
import { DECK_CATEGORY_ENUM, DECK_TYPE_CHARGE_ENUM, ProjectDeckItem } from '../domain'

const ENDPOINT = '/project-part/decks'

type GetDecksProjectPartPayload = { category?: DECK_CATEGORY_ENUM; type?: DECK_TYPE_CHARGE_ENUM } & PaginationPayload

export const getDecksProjectPart = async (params: GetDecksProjectPartPayload) => {
  const res = await axios.get(`${ENDPOINT}`, {
    params
  })
  const { data, error }: IResponse = res
  return {
    data: data?.data as { metaData: Metadata; result: ProjectDeckItem[] },
    error: error as AxiosError
  }
}
