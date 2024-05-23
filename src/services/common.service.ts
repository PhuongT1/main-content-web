import { TResponse } from '@/types/types.type'
import axios from './axios'

export type IBank = {
  code: string
  name: string
}

const ENDPOINT = '/commons'
export async function getBankList() {
  const { data } = await axios.get(`${ENDPOINT}/get-list-of-banks-in-south-korea`)
  return data
}
