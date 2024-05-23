import { IResponse } from '@/types/response.types'
import { ICountry } from '@/types/user.type'
import axios from './axios'
const ENDPOINT = '/countries'

export async function getCountries(): Promise<{ data: ICountry[]; error: any }> {
  const res = await axios.get<any>(`${ENDPOINT}`)
  const { data, error }: IResponse = res
  // History.push('/')
  return {
    data,
    error
  }
}
