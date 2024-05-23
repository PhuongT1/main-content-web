'use server'
import { CATEGORY, SUB_CATEGORY } from '@/constants/common.constant'
import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { Category } from '@/types/types.type'
import { AxiosError } from 'axios'

const ENDPOINT = '/categories'

type GetCategoriesFormData = {
  subType?: SUB_CATEGORY
  type?: CATEGORY
}

export const getCategories = async (payload: GetCategoriesFormData) => {
  const res = await getActiveCategories(payload)
  const { data, error }: IResponse = res || {}
  return {
    data: data as Category[],
    error: error as AxiosError
  }
}

export async function getActiveCategories(reqData: any) {
  const { data } = await axios.get(`${ENDPOINT}/active`, { params: { ...reqData } })
  return data
}

export async function getCategory(type: keyof typeof SUB_CATEGORY) {
  const { data } = await axios.get(`${ENDPOINT}/active?type=${type}`)
  return {
    data: data?.data as Category[]
  }
}
