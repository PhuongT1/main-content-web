'use server'
import { LANG } from '@/constants/common.constant'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  kr: () => import('@/dictionaries/kr.json').then((module) => module.default)
}

export const getDictionary = async (language?: string) => {
  return await dictionaries[(language as LANG) || LANG.EN]()
}
