export interface SwotCategory {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: any
  manager: string
  nameKr: string
  nameEn: string
}

export interface ParamsGetSwots {
  page?: number
  limit?: number
  order?: 'DESC'
  swotCategoryId: number
}

export interface Swot_Step1_Type {
  derivationOfBusinessObjectives: Array<{ tag: string; tagEn: string; title: string; titleEn: string }>
  strengthArray: any[]
  weaknessArray: any[]
  opportunityArray: any[]
  threatArray: any[]
  brandName: string
  idea: string
}

export interface Swot_Step2_Type {
  strengthAndOpportunity: any[]
  weaknessAndOpportunity: any[]
  strengthAndThreat: any[]
  weaknessAndThreat: any[]
}

export interface Swot_Step3_Type {
  expansionOfMarketShare: any[]
  improveCustomerSatisfaction: any[]
  sustainableGrowth: any[]
}

export interface ParamsGPT {
  // brandName: string
  // idea: string
  // details: string[]
  strengths?: string[]
  weakness?: string[]
  opportunities?: string[]
  threats?: string[]
}
