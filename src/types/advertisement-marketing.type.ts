export interface IGoogleTrendingCountry {
  id: string
  name: string
  children?: IGoogleTrendingCountry[]
}

export interface IItemMarketingGoalRequest {
  page: number
  limit: number
  order: 'ASC' | 'DESC'
}

export interface IItemMarketingGoal {
  id: number | string
  uuid?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: unknown
  name: string
  url: string
  description: string
}

export interface IFormValuesMarketingGoals {
  title: string
  idea: string
  selectedGoals: IItemMarketingGoal[]
}

// ====
export interface IMarketingStrategiesRequest {
  categoryId?: number
  page: number
  limit: number
  order: 'ASC' | 'DESC'
}

export interface IMarketingStrategiesCategories {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  nameEn: string
  nameKr: string
}
export interface IMarketingStrategiesResponse {
  id: number | string
  createdAt?: string
  updatedAt?: string
  name: string
  nameEn: string
  nameKr: string
  description: string
  descriptionEn: string
  descriptionKr: string
  category: IMarketingStrategiesCategories
}

export interface IMarketingStrategies {
  strategies: IMarketingStrategiesResponse[]
}
export interface IFormValuesMarketingStrategies {
  data: IMarketingStrategies[]
}

// ====
export interface IMarketingChannelsResponse {
  id: number | string
  uuid?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: unknown
  name: string
  description: string
  tags?: string[]
  url?: string
}

export interface IMarketingChannels {
  channels: IMarketingChannelsResponse[]
}
export interface IFormValuesMarketingChannels {
  data: IMarketingChannels[]
}

// ====
export interface IKpiOptions {
  title: string
  description: string
  budget: string
}
export interface IFormValuesMarketingKpiList {
  data: IKpiOptions[]
  unitCurrency: string
}

// ====
export interface IMarketingPlans {
  channel: string
  budget: string
  monthSelectedList: string[]
}
export interface IFormValuesMarketingPlans {
  data: IMarketingPlans[]
  startMonth: number
  unitCurrency: string
  totalBudget: string
  remainBudget: string
}

export interface ColumnTable {
  title: string
  dataIndex: keyof IMarketingPlans
}

export type DataAdvMarketingIR =
  | IFormValuesMarketingGoals
  | IFormValuesMarketingStrategies
  | IFormValuesMarketingChannels
  | IFormValuesMarketingKpiList
  | IFormValuesMarketingPlans

// export type DataAdvMarketingIR = [
//   { data: IFormValuesMarketingGoals },
//   { data: IFormValuesMarketingStrategies },
//   { data: IFormValuesMarketingChannels },
//   { data: IFormValuesMarketingKpiList },
//   { data: IFormValuesMarketingKpiList },
// ]
