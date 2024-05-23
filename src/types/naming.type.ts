import { CardElementProps } from '@/components/home/card-item'
import { PARENT_CATEGORY } from '@/constants/naming.constant'
import { UseFieldArrayReturn } from 'react-hook-form'
import { Metadata } from './types.type'
import { DataTableAnalyzing } from '@/components/home/analyzing'
import { StepActivity } from './deck.type'
import React from 'react'

export type TabCategory = keyof typeof PARENT_CATEGORY
export interface FieldArrayitem {
  selectedItem: NamingTab[]
  keywordCustomize?: string
  resultKeywordCustomize?: string
}
export interface NamingConcept {
  title?: string
  subTitle?: string
}
export interface SearchKeyWord {
  keyword?: string
  parentCategoryId?: string
  childCategoryId?: string
}
export interface Namingkeyword extends FieldArrayitem {
  concept: string
  industry: React.Key
  idea: string
  language?: string
  language2?: string
  sourceLang?: string
  targetLang?: string
  resultKeyword?: string
  text?: string
  type?: TabCategory
  tabSearch?: SearchKeyWord[]
  activeTab?: string
  dataAI?: NamingTab[]
}

export type Industry = Pick<Namingkeyword, 'industry'>
export type OpenAISearch = Pick<Namingkeyword, 'industry' | 'idea' | 'concept'>
export type ChildCategory = Required<Pick<Namingkeyword, 'type'>> & Pick<SearchKeyWord, 'parentCategoryId'>

export type StepNaming = FieldArrayitem
export interface NamingCandidates extends FieldArrayitem {
  dataAI?: NamingTab[]
}

export type NamingAnalyzing = Partial<FieldArrayitem> & {
  cardActiveList: NamingTab[]
} & Partial<DataTableAnalyzing>
export interface LanguageList {
  label: string
  code: string
}
export interface Location {
  parentCategoryId?: string
  type: string
}
export interface NamingLocation extends Location {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: unknown
  name: string
  categoryType: string
}
export interface TranslatePapago {
  sourceLang?: string
  targetLang?: string
  text?: string
}
export interface TranslateResult {
  data: unknown
  srcLangType: string
  tarLangType: string
  translatedText: string
  engineType: string
}
export interface SearchTab extends Location, SearchKeyWord {
  page: number
  limit: number
  order: string
}
export interface ChatGPT {
  en: string
  kr: string
}
export interface NamingTab extends CardElementProps, ChatGPT {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: any
  manager: string
  nameKr: string
  nameEn: string
  name: string
  description: string
  categoryId: number
  type: string
  no: number
  affectTitle: string
  analyzing?: number[]
  point?: number[]
  isActive?: boolean
}
export interface TabProp {
  cardActiveList?: NamingTab[]
  setActiveCardList?: React.Dispatch<React.SetStateAction<NamingTab[]>>
  fieldArray: UseFieldArrayReturn<Namingkeyword, 'selectedItem'>
  type: TabCategory
  index: number
  placeholder?: string[]
  overQuantity?: () => void
}

export type SchumpeterAIProps = Omit<TabProp, 'index' | 'type'>
export interface DataChatGPT {
  data: NamingTab[]
}
export interface ResponseDataNaming<T> {
  data: {
    metaData: Metadata
    result: T[]
  }
}

export interface NamingDeck {
  namingKeyword?: StepActivity<Namingkeyword>
  namingCandidates?: StepActivity<NamingCandidates>
  namingAnalyzing?: StepActivity<NamingAnalyzing>
}

export interface DataNamingIR {
  data?: NamingAnalyzing
}

export interface CartItemNamingProps {
  title: string
  subTitle: string
  content: {
    header: string
    headerBlue: string
    main: string
  }
}
export interface DataCartItem<T = CartItemNamingProps> {
  name?: T
  nameEn?: T
}

export type CartItemList = Record<string, DataCartItem>
