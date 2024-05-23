'use server'
import axios from '@/services/axios'
import { IOccupation } from '@/types/pool.type'
import { IResponse } from '@/types/response.types'
import { AxiosError } from 'axios'

const ENDPOINT = '/categories'

export const getOccupationCate = async () => {
  const res = await axios.get(`${ENDPOINT}/active?subType=OCCUPATION`)
  const { data, error }: IResponse = res
  return {
    data: data?.data as IOccupation[],
    error: error as AxiosError
  }
}
