'use server'
import axios from '@/services/axios'
import { BannerType } from '@/types/banner.type'

const ENDPOINT = '/banners'

export const getBannerByType = async <T extends object>(
  params: T
): Promise<{
  data: BannerType[]
}> => {
  const { data } = await axios.get(`${ENDPOINT}/active`, { params: { ...params } })

  return {
    data: data?.data as BannerType[]
  }
}
