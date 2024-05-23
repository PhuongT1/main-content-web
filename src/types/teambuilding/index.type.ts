import { ROLE_TYPE } from '@/mock/teambuilding/data'
import { CSSProperties } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

export interface TProfilePersonItem<TFieldValues extends FieldValues> {
  index: number
  greetingList: any
  markText: string
  role: ROLE_TYPE
  handleRemoveProfileItem: (index: number) => void
  formProps: UseFormReturn<TFieldValues>
}
export type TEducationAndExp = {
  id: string
  content: string
}
export type TFormValue = {
  isEmailRequired: boolean
  isManualDomain: boolean
  path: string
  name: string
  age: number
  role: string
  roleEn?: string
  manualDomain: string
  content: string
  domain: string
  email?: string
  description: string
  descriptionEn?: string
  eduandexp?: TEducationAndExp[]
}

export interface TInfoPerson extends Omit<TFormValue, 'role' | 'description'> {
  descriptionEn: string
  descriptionKr: string
  roleEn: string
  roleKr: string
}

export type TFormValuesStepOnceAndSecond = {
  data: TFormValue[]
}

export type TCategoryItem = {
  id: number
  uuid: string
  createdAt: Date | string
  updatedAt: Date | string
  deletedAt: Date | string | null
  nameEn: string
  nameKr: string
}

export type TQueryOrganizations = {
  page: number
  limit: number
  order: 'ASC' | 'DESC'
  categoryId: number
}

export type TCorporation = Omit<TQueryOrganizations, 'categoryId'> & {
  corporationCategoryId: number
}

export type TOrganizationItem = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: any
  name: string
  nameEn?: string
  organizationalCultureCategoryId: number
  no: number
}

export type TDataRes<T> = {
  result?: T[]
  metaData?: {
    currentPage: number
    firstPage: number
    lastPage: number
    nextPage: number
    pageSize: number
    previousPage: number
    totalPages: number
    totalRecords: number
  }
}

export type BaseReponseList<T> = {
  data?: TDataRes<T>
}

export enum MODE_TOOLBAR {
  TABLE = 'TABLE',
  IMAGE = 'IMAGE',
  COLOR = 'COLOR',
  BOLD = 'BOLD',
  ROUNDED = 'ROUNDED'
}
export type TMode = keyof typeof MODE_TOOLBAR

export type TDataToolbarEditor = {
  color: string
  fontSize: string
}

export type EditorNodeList = {
  position: string
  name: string
  desc: string
  role: number
  styles: CSSProperties[]
}

export type TOrganizationPerson = {
  position: string
  name: string
  role: number
}

export interface ICardMember {
  path: string
  role: string
  name: string
  description: string
  level: number
}
