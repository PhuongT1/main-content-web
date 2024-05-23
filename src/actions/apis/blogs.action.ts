'use server'
import axios from '@/services/axios'
import { IBlog } from '@/types/blog.type'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'

const ENDPOINT = '/content-blogs'

export const getBlogList = async <T extends object>(params: T) => {
  try {
    const res = await axios.get(`${ENDPOINT}/active`, { params: { ...params } })
    const data = res.data
    return {
      data: data?.data as { metaData: Metadata; result: IBlog[] }
    }
  } catch (error: any) {
    console.error('Error in Axios request:', error)
    return { error: error.message }
  }
}

export const getBlogDetail = async <T>(id: T) => {
  const res = await axios.get<any>(`${ENDPOINT}/active/${id}`)
  const { data, error }: IResponse = res
  return {
    data: data?.data as IBlog,
    error: error
  }
}
