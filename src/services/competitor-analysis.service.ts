import axios from './axios'
import { Metadata } from '@/types/types.type'
import {
  ICompetitiveCompaniesRequest,
  ICompetitiveCompaniesResponse,
  ICompetitiveCompaniesIndustryResponse,
  ICompetitiveAnalysisCategoryResponse,
  ICompetitiveCharacteristicsRequest,
  ICompetitiveCharacteristicsResponse,
  ICompetitorCharacteristicsResponse
} from '@/types/competitor-analysis.type'

const ENDPOINT = `/project-part/step-resources`

export async function getCompetitiveCompanies(params: ICompetitiveCompaniesRequest) {
  const { data } = await axios.get<any>(`${ENDPOINT}/competitive-companies/`, {
    params: { ...params }
  })
  return (data?.data as { metaData: Metadata; result: ICompetitiveCompaniesResponse[] }) || {}
}

export async function getCompetitiveCompaniesIndustry() {
  const { data } = await axios.get<ICompetitiveCompaniesIndustryResponse[]>(
    `${ENDPOINT}/competitive-companies/industry`,
    {}
  )
  return data || []
}

export async function getCompetitiveCompaniesIndustryForIdea() {
  const { data } = await axios.get<ICompetitiveCompaniesIndustryResponse[]>(
    `${ENDPOINT}/competitive-companies/industry/deck2`,
    {}
  )
  return data || []
}

export async function getCompetitiveAnalysisCategory() {
  const { data } = await axios.get<ICompetitiveAnalysisCategoryResponse[]>(
    `${ENDPOINT}/competitor-analysis/competitor-analysis-category`,
    {}
  )
  return data || []
}

export async function getCompetitiveAnalysisCharacteristics(params: ICompetitiveCharacteristicsRequest) {
  const { data } = await axios.get<any>(`${ENDPOINT}/competitor-analysis/competitor-analysis-characteristic`, {
    params: { ...params }
  })
  return (data?.data as { metaData: Metadata; result: ICompetitiveCharacteristicsResponse[] }) || {}
}

export async function getCompetitiveAnalysisCharacteristicsExample({ id }: { id: number }) {
  const { data } = await axios.get<ICompetitorCharacteristicsResponse[]>(
    `${ENDPOINT}/competitor-analysis/competitor-analysis-example/${id}`
  )
  return data || []
}
