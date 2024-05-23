import langEN from '@/dictionaries/en.json'
import langKR from '@/dictionaries/kr.json'
import { PropsArray } from '@/utils/types'
import { SelectProps as MSelectProps } from '@mui/material'
import { AxiosError } from 'axios'
import { ComponentProps, ReactNode } from 'react'
import { NestedFile } from './classes/nested-file.class'

export class ListConfig {
  label = 'label'
  value = 'value'
}

export type ContainerController = {
  control?: any
  register?: any
}

export type BoxState = 'normal' | 'hover' | 'focused' | 'disabled'

export class ListRes<T> {
  count: number = 0
  next: string | null = ''
  previous: string | null = ''
  results: T

  constructor(results: T) {
    this.results = results
  }
}

export type LoginRes = {
  access_token: string
  refresh_token: string
}

export type CommonRes = {
  message: string
}

export type Breadcrumbs = {
  label: string
  name: string
  url?: string
  isIcon?: boolean
  icon?: ReactNode
}

export type CaseType = Pick<CaseDetailType, 'id' | 'case_number' | 'gender' | 'files' | 'surgery_date' | 'type'> & {
  patient_name: string
  surgeon_name: string
  status: string
  created_at: string
  order_number: string
}

export type CaseDetailType = {
  id: number
  case_number: string
  first_name: string
  middle_name: string
  last_name: string
  gender: string
  dicom_folder: string
  type: string
  surgery_date: string
  delivery_expected: string
  hospital_name: string
  memo: string
  files: FileRes[]
}

export type FileRes = {
  id: number
  file_type: string
  file: string
  file_name: string
}

export type SvgComponentProps<K extends number = 1> = {
  svgProps?: ComponentProps<'svg'>
  pathProps?: PropsArray<ComponentProps<'path'>, K>
  rectProps?: PropsArray<ComponentProps<'rect'>, K>
  circleProps?: PropsArray<ComponentProps<'circle'>, K>
  gProps?: PropsArray<ComponentProps<'g'>, K>
  lineProps?: PropsArray<ComponentProps<'line'>, K>
}

export type RequireChildren = {
  children: ReactNode
}

export type OptionalChildren = {
  children?: ReactNode
}

export type Dictionary = typeof langEN | typeof langKR

export type TranslateKey = keyof typeof langEN | keyof typeof langKR

export type TImage = {
  id: number
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  status: string
  url: string
  baseUrl: string
  key: string
  name: string
  fileType: string
  uuid: string
  originalname?: string
  fileSize?: number
}

export type ResponseData<T> = {
  data: T
}

export type ResponseMessage = ResponseData<{ data: { message: string } }>

export type PageParams<T> = {
  params: T
}

export type SearchParams<T> = T

export type Metadata = {
  currentPage: number
  firstPage: number
  lastPage: number
  nextPage: number
  pageSize: number
  previousPage: number
  totalRecords: number
  totalPages: number
}

export type PaginationPayload = {
  page: number
  limit: number
}

export type PagePayload = PaginationPayload & {
  order?: 'DESC'
}

export type ConfigLabel = {
  label: 'label'
  value: 'value'
}

export enum CATEGORY_STATUS {
  ACTIVE = 'ACTIVE'
}

export type Category = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  status: CATEGORY_STATUS
  type: string
  subType: string
  name: string
  code: string
  note: string
  order: null
  isEditable: boolean
  totalItems: number
}

export type Hashtag = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  status: string
  name: string
}

export type BorderStyles = 'rounded-4' | 'rounded-6' | 'rounded-8' | 'rounded-10' | 'pill'

export type Attached = {
  fileList?: FileList
  nestedFile?: NestedFile
}

export type TResponse<T> = {
  data: {
    metaData: Metadata
    result: T[]
  }
}

export type TResponseInfinite<T> = {
  metaData: Metadata
  result: T[]
}

export type TResponseData<T> = {
  data: T
  err: AxiosError
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type SelectProps = Optional<MSelectProps, 'variant'>
