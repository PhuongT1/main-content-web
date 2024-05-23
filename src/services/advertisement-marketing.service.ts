import axios from './axios'
import { Metadata } from '@/types/types.type'
import {
  IItemMarketingGoal,
  IItemMarketingGoalRequest,
  IGoogleTrendingCountry,
  IMarketingStrategiesRequest,
  IMarketingStrategiesResponse,
  IMarketingChannelsResponse,
  IMarketingStrategiesCategories
} from '@/types/advertisement-marketing.type'

const ENDPOINT = `/project-part/step-resources`

export async function getMarketingGoals(params: IItemMarketingGoalRequest) {
  const { data = {} } = await axios.get<any>(`${ENDPOINT}/marketing-goals`, { params: { ...params } })
  return data?.data as IItemMarketingGoal[]
}

export async function getGoogleTrendingCountries() {
  const { data = {} } = await axios.get<any>(`${ENDPOINT}/trend-analysis/countries`)
  return data?.data as IGoogleTrendingCountry[]
}

export async function getMarketingStrategiesCategories() {
  const { data = {} } = await axios.get<any>(`${ENDPOINT}/marketing-strategies/categories`)
  return data?.data as IMarketingStrategiesCategories[]
}

export async function getMarketingStrategies(params: IMarketingStrategiesRequest) {
  const { data = {} } = await axios.get<any>(`${ENDPOINT}/marketing-strategies`, { params: { ...params } })
  return data?.data as { metaData: Metadata; result: IMarketingStrategiesResponse[] }
}

export async function getMarketingPromotionalChannels() {
  const { data = {} } = await axios.get<any>(`${ENDPOINT}/promotional-channels`)
  return data?.data as { metaData: Metadata; result: IMarketingChannelsResponse[] }
}
