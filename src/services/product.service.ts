import { TProduct } from '@/types/product.type'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'
import { AxiosError } from 'axios'
import axios from './axios'

const ENDPOINT = '/products'

export const getActivePlan = async () => {
  const res = await axios.get(`${ENDPOINT}/active`)

  const { data, error }: IResponse = res
  return {
    data: data?.data as { metaData: Metadata; result: TProduct[] },
    error: error as AxiosError
  }
}
