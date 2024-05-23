'use server'
import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { SIGNATURE_STAMPS_TYPE, StampListRecord, StampRecord } from '@/types/startup/signature-stamp.type'
import { Metadata, PagePayload } from '@/types/types.type'
import { convertFormData } from '@/utils/object'
import { AxiosError } from 'axios'

const ENDPOINT = '/signature-stamps'

type CreateStampFormData = {
  name: string
  imageId: number
  type: SIGNATURE_STAMPS_TYPE
}

type RemoveStampFormData = {
  id: string
}

export const getStamps = async (formData: FormData) => {
  const { page, limit, order }: PagePayload = convertFormData<PagePayload>(formData)
  const { data } = await axios.get(`${ENDPOINT}/me?page=${page}&limit=${limit}&order=${order}`)
  return {
    data: data?.data as { metaData: Metadata; result: StampListRecord[] }
  }
}

export async function createStamp(formData: FormData) {
  const payload: CreateStampFormData = convertFormData<CreateStampFormData>(formData)
  const res = await axios.post(`${ENDPOINT}`, {
    ...payload,
    imageId: +payload.imageId,
    type: SIGNATURE_STAMPS_TYPE.STAMPS
  })
  const { data, error }: IResponse = res
  return {
    data: data?.data as StampRecord,
    error: error as AxiosError
  }
}

export async function createSignature(formData: FormData) {
  const payload: CreateStampFormData = convertFormData<CreateStampFormData>(formData)
  const res = await axios.post(`${ENDPOINT}`, {
    ...payload,
    imageId: +payload.imageId,
    type: SIGNATURE_STAMPS_TYPE.SIGNATURE
  })
  const { data, error }: IResponse = res
  return {
    data: data?.data as StampRecord,
    error: error as AxiosError
  }
}

export async function removeStamp(formData: FormData) {
  const payload: RemoveStampFormData = convertFormData<RemoveStampFormData>(formData)
  const id = payload?.id ? +payload.id : undefined
  const res = await axios.delete(`${ENDPOINT}/${id}`)
  const { data, error }: IResponse = res
  return {
    message: data.data.message,
    error: error as AxiosError
  }
}
