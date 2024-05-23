export interface PressReleaseType {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  nameKr: string
  nameEn: null
  description: string
  type1: string
  type2: string
  type3: string
  writingTip1: string
  writingTip2: string
  writingTip3: string
  writingTip4: string
  pressReleaseExample1: PressReleaseExample
  pressReleaseExample2: PressReleaseExample
  pressReleaseExample3: PressReleaseExample
  pressReleaseExample4: PressReleaseExample
}

export interface PressReleaseExample {
  url: string
  text: string
}

import { PRESS_RELEASE_TYPES } from '@/constants/press-release.constant'

export interface IPressRelease {
  pressReleaseType: string
}

interface ISelectItem {
  value: string
  label: string
}

export interface IPressReleaseGroups {
  title: string
  description: string
  tip: string
  type: string
  groups: IPressReleaseGroup[]
}

export interface IPressReleaseGroup {
  title: string
  fields: IPressReleaseInput[]
}

interface IValidationRule {
  type: string
  params?: (string | number)[]
}
export interface IPressReleaseInput {
  name: string
  type?: 'input' | 'date' | 'select' | 'textarea'
  column?: number
  label: string
  subLabel?: string
  initValue?: string
  data?: ISelectItem[]
  inputProps?: {
    required?: boolean
    minLength?: number
    maxLength?: number
    placeholder?: string
    multiline?: boolean
    rows?: number
  }
  validations?: IValidationRule[]
}

export interface IPressProps {
  type: PRESS_RELEASE_TYPES
  data: IPressData
}

export interface IPressData {
  title: Title
  subtitle: IContent
  content: ICustomContent
  imgURL?: string
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
