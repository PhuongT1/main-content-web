'use client'
import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { Metadata, PaginationPayload } from '@/types/types.type'
import { AxiosError } from 'axios'
import { INotice } from '../domain/entities/notice'

const ENDPOINT = '/project-part/notice-ad'

type GetNoticeListPayload = { orderKey?: string } & PaginationPayload

export const getNoticeList = async (params: GetNoticeListPayload) => {
  const res = await axios.get(`${ENDPOINT}`, {
    params
  })
  const { data, error }: IResponse = res
  return {
    data: data?.data as { metaData: Metadata; result: INotice[] },
    error: error as AxiosError
  }
}


export const getNoticeDetail = async (id: number): Promise<INotice> => {
  const res = await axios.get(`${ENDPOINT}/${id}`)
  const { data, error }: IResponse = res
  if (error) throw error
  return data?.data
}