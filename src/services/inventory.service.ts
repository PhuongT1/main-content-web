import { Metadata } from '@/types/types.type'
import axios from './axios'

const ENDPOINT = '/project-part'

export interface IInventoryImage {
  category1?: string
  category2?: string | null
  page?: number | string
  limit?: number | string
  folder?: string
}

export const getListInventory = async (params: IInventoryImage) => {
  const { data } = await axios.get<any>(`${ENDPOINT}/inventory`, {
    params: {
      ...params
    }
  })
  return {
    data: data?.data as { metaData: Metadata; result: any }
  }
}

export const getImageUser = async (params: IInventoryImage) => {
  const { data } = await axios.get<any>(`/uploads/me`, {
    params: {
      ...params
    }
  })

  return {
    data: data?.data as { metaData: Metadata; result: any }
  }
}
