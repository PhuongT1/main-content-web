import { Metadata } from './types.type'

export type TypeLiftStyle = 'LIFT_STYLE' | 'PURCHASER_METHOD'
export interface FieldArrayitem<T = unknown> {
  selectList?: T[]
}
export interface ResponseDataInfinite<T> {
  data: {
    metaData: Metadata
    result: T[]
  }
}

export interface BasicInformation {
  type: string
  businessNname: string
  representativeName: string
  date: string
  officeLocation: string
  detailedAddress: string
  contactInformation: string
}
