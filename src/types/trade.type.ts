import { ITradeConceptType } from '@/app/(main-routes)/home/trade/_clientComponents/step_02/card_data'
import { StepActivity } from './deck.type'

export interface TradeDeck {
  tradeBrand?: StepActivity<number>
  tradeCopyBrand?: StepActivity<ITradeCopyBrandForm>
}

export interface ITradeCompany {
  agentName: string
  appReferenceNumber: string
  applicantName: string
  applicationDate: number
  applicationNumber: number
  applicationStatus: string
  bigDrawing: string
  classificationCode: string
  drawing: string
  fullText: string
  indexNo: number
  internationalRegisterDate: string
  internationalRegisterNumber: string
  priorityDate: string
  priorityNumber: string
  publicationDate: number
  publicationNumber: number
  regPrivilegeName: string
  regReferenceNumber: string
  registrationDate: number
  registrationNumber: number
  registrationPublicDate: string
  registrationPublicNumber: string
  title: string
  viennaCode: string
}

export interface ITradeForm {
  brandId: number
}

export interface ITradeCopyBrandForm {
  title: string
  idea: string
  productClassifications: any[]
  concept?: ITradeConceptType
}

export interface ITradeClassification {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  contents: string
  classificationCode: string
  type: string
}

export interface ITradeCategory {
  id: number
  uuid?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  nameKr: string
  nameEn?: string
}
