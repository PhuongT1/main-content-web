import { FormStatus } from '@/app/(main-routes)/home/card-news/utils/common'
import { CARD_NEWS_TYPES } from '@/constants/cardnews.constant'

export interface ICardNews {
  cardNewsType: string
}

interface ISelectItem {
  value: string
  label: string | JSX.Element
}

export interface ICardNewsGroups {
  title: string
  subTitle: string
  tip: string
  type: string
  groups: ICardNewsGroup[]
}

export interface ICardNewsGroup {
  title: string
  fields: ICardNewsInput[]
}

interface IValidationRule {
  yup?: any
}
export interface ICardNewsInput {
  groupTitle?: string
  name: string
  type?:
    | 'input'
    | 'date'
    | 'select'
    | 'textarea'
    | 'radio'
    | 'checkboxGroup'
    | 'checkbox'
    | 'inputNumberWithText'
    | 'inputHidden'
  column?: number
  label: string | JSX.Element
  subLabel?: string
  initValue?: string
  data?: ISelectItem[]
  inputProps?: {
    required?: boolean
    minLength?: number
    maxLength?: number
    placeholder?: string
    placeholderEndAdornment?: string
    multiline?: boolean
    rows?: number
    readonly?: boolean
    dateFormat?: string
    regex?: RegExp
    minRows?: number
    maxRows?: number
  }
  validations?: IValidationRule
}

export interface ICardProps {
  idx: number
  data: ICardData
}

export interface ICardData {
  title: Title
  subtitle: IContent
  content: ICustomContent
  imgURL: string
}

export interface ICustomContent {
  en: {
    imgURL: string
    title: string
  }[]
  kr: {
    imgURL: string
    title: string
  }[]
}

export interface IContent {
  en: string[]
  kr: string[]
}

export interface Title {
  en: string
  kr: string
}

export interface ICardNewsResponeData {
  title: Title
  subtitle: IContent
  content: {
    en: string[]
    kr: string[]
  }
  imgURL?: string
}

export interface ICardNewsAllData {
  id: string
  type: CARD_NEWS_TYPES
  status: FormStatus
  form: any
  data: ICardData[]
}
