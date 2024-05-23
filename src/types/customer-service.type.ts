import { CardElementProps } from '@/components/home/card-item'
import { Metadata, PagePayload } from './types.type'
import React from 'react'

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
export interface Customer {
  age: string
  name: string
  gender: string
  region: string
  job: string
  incomeLevel: string
  familySituation: string
  mbti: string
  path: any
}

export type LanguageChatGPT = {
  en: string
  kr: string
}
export interface ChatGPTCustomer {
  title?: LanguageChatGPT
  content?: LanguageChatGPT
}

export interface ReponseChatGPT {
  data: ChatGPTCustomer[]
}

export interface ReponseData<T> {
  data: T[]
}
export interface VirtualTargetCustomer extends FieldArrayitem<ChatGPTCustomer> {
  brandName: string
  idea: string
  introductionCustomer: ChatGPTCustomer
  modalCard?: ChatGPTCustomer & { index: number }
  customer: Customer
  countAI?: number
}
export interface Goal {
  selectCategory?: string
  inputGoal?: string
}
export interface LiftStyle {
  id?: number
  index?: number
  name?: string
  title?: string
  url?: React.ReactNode
  description?: string
  type?: TypeLiftStyle
}

export type Purchasing = CardElementProps & { point?: number }
export interface CardList {
  selectedItem: LiftStyle[]
  paymentMethod: LiftStyle[]
}
export interface CustomerPurchasing extends Required<FieldArrayitem<LiftStyle>>, CardList {
  purchaseMethod?: Purchasing[]
  channelInfluence?: Purchasing[]
  activeTab?: string
  lengthItemTab?: number
  name?: string
}
export interface CustomerProfile extends Required<FieldArrayitem<LiftStyle>> {
  achievementGoalList: Goal[]
  painPointList: Goal[]
  painPointGoal?: Goal
  goal?: Goal
}

export type SearchPurchasing = Partial<CustomerPurchasing> & PagePayload & { type: string }
export interface TablePurchaseCustomer {
  title: string
  motivation: string
  quest: string
  experience: string
  attainment: string
  feedback: string
  type?: string
  point?: number
}
export interface PurchaseDesign {
  solve: Required<Goal>
  purchaseCustomer: TablePurchaseCustomer[]
  reachStrategy: string
}

export interface ColumnTable {
  title: string
  dataIndex: keyof TablePurchaseCustomer
}

export interface DataCustomerIR<T> {
  data?: T
}
