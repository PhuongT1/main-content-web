import { Edge, Node } from 'reactflow'

export interface ICompetitiveCompaniesIndustryResponse {
  id: number
  uuid: string
  hashTag?: string
  hashTagEn?: string
  description?: string
  descriptionEn?: string
  createdAt: string
  updatedAt: string
  deletedAt: unknown
  nameKr: string
  nameEn: string
  url?: string
}

export interface ICompetitiveCompaniesRequest {
  name?: string
  type?: 'GLOBAL' | 'KOREAN' | string
  industryId: number | boolean
  page: number
  limit: number
  order: 'ASC' | 'DESC'
}
export interface ICompetitiveCompaniesResponse {
  id?: string | number
  uuid?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: unknown
  name: string
  description: string
  type?: string
  establishDate?: Date | string
  websiteUrl?: string
  numbEmployees?: string
  cumulativeInvestmentAmount?: string
  annualRevenue?: string
  productOrService?: string[]
  keywords: string[]
  competitiveCompanyIndustryId: number
  deliveryPeriod?: unknown
  companyImageUrl?: string
  no?: number
}

export interface IFormValuesStepOne {
  industry: string
  idea: string
  search?: string
  myCompany?: ICompetitiveCompaniesResponse
  addedCompanies?: ICompetitiveCompaniesResponse[]
  selectedCompetitors: ICompetitiveCompaniesResponse[]
}

// ====
export interface ICompetitiveAnalysisCategoryResponse {
  id: number
  uuid?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: unknown
  nameKr: string
  nameEn?: string
  description?: string
}

export interface ICompetitiveCharacteristicsRequest {
  page: number
  limit: number
  order: 'ASC' | 'DESC'
  competitorAnalysisCategoryId: number | boolean
}
export interface ICompetitiveCharacteristicsResponse {
  id: 1
  uuid?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: unknown
  name: string
  description?: string
  imageUrl?: string
  competitorAnalysisCategoryId?: number
  no?: number
}

export interface ICompetitorCharacteristicsResponse {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: unknown
  type: string
  descriptions: string[]
  competitorAnalysisCharacteristicId: number
}

export interface ICompetitorCharacteristicsItem {
  age: string
  gender: string
  job: string
  differentCharacteristics: ICompetitiveCharacteristicsResponse[]
}
export interface IFormValuesStepTwo {
  data: ICompetitorCharacteristicsItem[]
}

// ====
export interface ICompetitorComparisonItem {
  id?: string
  type: string
  name: string
  data: Record<string, number | string | string[]>
}
export interface IFormValuesStepThree {
  rowList: ICompetitorComparisonItem[]
}

// ========
export type EditorNodeList = {
  name: string
  position: string
  colorLogo?: string
  urlLogo?: string
  fontSizeInputLogo?: string
  fontWeightInputLogo?: string
}

export type TDataToolbarEditor = {
  color: string
  fontSize: string
  fontWeight: string
}

export interface IFormValuesStepFour {
  nodes: Node<EditorNodeList>[]
  edges: Edge[]
}
