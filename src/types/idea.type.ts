import { Method } from '@/constants/idea.constant'
import { ICompetitiveCompaniesIndustryResponse } from './competitor-analysis.type'
import { StepActivity } from './deck.type'

export type GroupIdea = {
  id?: string
  situation: string
  keyword: string
  target_customer: string
  inconvenience_factor: string
}

export type TIdiaFormValues = {
  path: any
  mode: string
  industrial: ICompetitiveCompaniesIndustryResponse
  findIdeas: {
    situation: string
    keyword: string
    target_customer: string
    inconvenience_factor: string
    groupIdeas?: GroupIdea[]
  }
  writeIdeas: {
    resolution: string
    service_name: string
    target_customer: string
    inconvenience_factor: string
    idea: string
    ideas: any[]
    manualInput?: string
    ideasDataAI: {
      id: string;
      content: string
      contentEn: string
    }[]
  }
}

export type TCreateIdea = {
  completed: string[]
  manualInput: string
  minus: {
    content: string
    keywords: {
      isSelected: boolean
      content: string
      id: string
    }[]
  }
  plus: {
    content: string
    industrial: Pick<ICompetitiveCompaniesIndustryResponse, 'id' | 'nameEn' | 'nameKr'>

    path: any
  }
  division: {
    content: string
    keywords: {
      isSelected: boolean
      content: string
      id: string
    }[]
  }
  multiplication: {
    content: string
    industrial: Pick<ICompetitiveCompaniesIndustryResponse, 'id' | 'nameEn' | 'nameKr'>
    path: any
  }
}

export type SelectedMode = {
  type: TMethod | string
  title: string | string[]
  description: string
}
export type TWriteIdea = {
  title: string
  description: string
  selectedMethod: SelectedMode
  benefit: {
    id?: string
    title: string
    titleEn?: string
    content: string
    contentEn?: string
  }[]
}

export type QueryWriteIdeaAI = {
  finalIdeas: string[]
}

export type QueryIndustrial = {
  industrialField: string
}

export type FourIdeaItem = {
  description: ''
  hashTag: string
  id: number
  industrialField: string
}
export type QueryIdeaAI = {
  ideas: string
  productServiceName: string
  solution: string
  inconvenienceElements: string
  targetCustomer: string
  industrialField: string
}

export type IdeaDeck = {
  Idea: StepActivity<any>
  CreateIdea: StepActivity<any>
  ChoiceIdea: StepActivity<any>
}

export type DataIdeaResponseViaAI = {
  data: [
    {
      en: string[]
    },
    {
      kr: string[]
    }
  ]
}

export type DataIdeaResponseViaWriteIdeaAI = {
  title: {
    en: string
    kr: string
  }
  content: {
    en: string
    kr: string
  }
}[]

export enum CaculationModeEnum {
  PREVIEW = 'PREVIEW',
  EDIT = 'EDIT'
}

export enum BenifitAITitleEnum {
  '경제적 측면' = 0,
  '브랜드 측면' = 1,
  '경쟁사 측면' = 2
}

export type CaculationMethod = {
  minus: keyof typeof CaculationModeEnum
  plus: keyof typeof CaculationModeEnum
  division: keyof typeof CaculationModeEnum
  multiplication: keyof typeof CaculationModeEnum
}

export type TMethod = keyof CaculationMethod

export type TItemKeyword = {
  id: string
  content: string
  isSelected?: boolean
}

export interface IndustrialItem {
  id: number
  data: string
  dataEn?: string
  industrialField: string
  industrialFieldCategory: string
}
export interface FindIdeaResponse {
  inconvenienceFactor: IndustrialItem[]
  keyword: IndustrialItem[]
  situation: IndustrialItem[]
  targetCustomer: IndustrialItem[]
}

export interface DataIdeaIR {
  data?: TWriteIdea
  dataIdea?: string
}
