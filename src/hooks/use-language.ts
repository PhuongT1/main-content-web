//TODO: Check flow
'use client'
import { getDictionary } from '@/actions/dictionaries.action'
import { dictAtom } from '@/atoms/lang.atom'
import { LANG } from '@/constants/common.constant'
import { Dictionary, TranslateKey } from '@/types/types.type'
import { ReactNode, useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useUserProfile } from './use-user-profile'

export const useLanguage = () => {
  const [storedDict, setStoredDict] = useRecoilState(dictAtom)
  const { updatePartialUser, user } = useUserProfile()

  const getData = async (lang?: string) => {
    const dict = await getDictionary(lang)
    setStoredDict(dict)
  }

  const changeLanguage = (lang: LANG) => {
    updatePartialUser({ language: lang })
  }

  useEffect(() => {
    // const phuong = setTimeout(() => {
    user?.language && getData(user?.language)
    // console.log('Phuong oi Phuong')
    // }, 300)
    // return () => clearTimeout(phuong)
  }, [user?.language])

  const getValueLanguage = useCallback(
    <T = unknown>(item: T, field = 'name') => {
      if (!item) return ''
      switch (user?.language) {
        case LANG.EN:
          return item[`${String(field)}En` as keyof T] as ReactNode
        default:
          return item[field as keyof T] as ReactNode
      }
    },
    [user?.language]
  )

  const getFieldLanguage = useCallback(
    <T = string, K extends keyof T = keyof T>(field: K = 'name' as K) => {
      switch (user?.language) {
        case LANG.EN:
          return `${String(field)}En` as K
        default:
          return field
      }
    },
    [user?.language]
  )

  const translate = useCallback(
    <T extends Record<string, any>>(tKey: TranslateKey, optionData?: T): string => {
      if (!storedDict) {
        return tKey
      }
      const text = storedDict[tKey] as string
      if (!optionData) {
        return text
      }
      const keys = Object.keys(optionData)
      let replacedText = text
      keys.forEach((key) => {
        replacedText = replacedText.replace('{' + key + '}', String(optionData[key]))
      })
      return replacedText
    },
    [storedDict]
  )

  return {
    dict: storedDict || ({} as Dictionary),
    lang: user?.language,
    changeLanguage,
    getData,
    getFieldLanguage,
    getValueLanguage,
    t: translate
  }
}
