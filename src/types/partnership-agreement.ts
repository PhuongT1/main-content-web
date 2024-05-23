export type TValueSelect = {
  label: string
  value: string
  note?: string
}

export interface IBusinessContract {
  name: string
  address: string
  contact: string
  birthdate: any
  id: string
  data?: [init: string]
}

export interface IDataStep01 {
  data: IBusinessContract[]
  companyIdea: string
  companyName: string
  companyType: string
  companyIndustrySector: string
  companyAdditionalAddress: string
  companyHeadquartersAddress: string
  contrastDate: string
}

export interface IFormTypeOne {
  businessPartners: IBusinessPartner[]
}

export interface IBusinessPartner {
  businessPartnerData: IBusinessPartnerDatum[]
}

export interface IBusinessPartnerDatum {
  detail: string
  equityRatio: number
  investment: string
  id: string
}

export interface IFormTypeTwo {
  date: string
  valuePenalty: string
}

export interface IDetail {
  detailData: IDetailDatum[]
}

export interface IDetailDatum {
  detail: string
}

export interface IFormTypeThree {
  date?: string
  valuePenalty?: string
  permission?: string
  detail: IDetail[]
}

export interface IFormTypeFour {
  date?: string
  valuePenalty?: string
}

export interface IFormTypeFive {
  date?: string
  valuePenalty?: string
}

export interface IPartnerRatioData {
  partnerRatio?: string
}

export interface IFormTypeSix {
  limit?: string
  distribution?: string
  partnerData?: IPartnerRatioData[]
}

export interface IDataStep02 {
  typeOne: IFormTypeOne
  typeTwo: IFormTypeTwo
  typeThree: IFormTypeThree
  typeFour: IFormTypeFour
  typeFive: IFormTypeFive
  typeSix: IFormTypeSix
}

export interface IValueSuccess {
  typeOne: 'INIT' | 'PROCESS' | 'DONE' | 'RESULT'
  typeTwo: 'INIT' | 'PROCESS' | 'DONE'
  typeThree: 'INIT' | 'PROCESS' | 'DONE'
  typeFour: 'INIT' | 'PROCESS' | 'DONE'
  typeFive: 'INIT' | 'PROCESS' | 'DONE'
  typeSix: 'INIT' | 'PROCESS' | 'DONE'
}
