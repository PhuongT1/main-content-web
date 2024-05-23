'use server'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import axios from '@/services/axios'
import { IBookmarkListRequest } from '@/types/bookmark.type'
import { IResponse } from '@/types/response.types'

const ENDPOINT = '/favorites'

export interface IBookmarkRequest {
  type: string | BOOKMARK_TYPE
  id: number
}

export async function getAllBookmarks() {
  const res = await axios.get(`${ENDPOINT}/all`)
  const { data, error }: IResponse = res
  return {
    data: data.data,
    error
  }
}

export async function getBookmarkByType(params: IBookmarkListRequest) {
  const res = await axios.get(`${ENDPOINT}/by-type`, {
    params: {
      ...params
    }
  })
  const { data, error }: IResponse = res
  return {
    data: data.data,
    error
  }
}

export const updateBookmark = async (body: IBookmarkRequest) => {
  const res = await axios.post(`${ENDPOINT}`, body)
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}
