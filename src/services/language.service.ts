import { getCookiesLanguge, removeCookies, setCookies } from '@/actions/cookies.action'
import { COOKIES_KEY, LANG } from '@/constants/common.constant'

export const setLanguage = async (lang: LANG) => {
  const formData = new FormData()
  formData.append('name', COOKIES_KEY.LANG)
  formData.append('value', lang)
  await setCookies(formData)
}

export const getLanguage = async () => {
  const lang = await getCookiesLanguge()
  return (lang?.value as LANG) || LANG.KR
}

export const removeLanguage = async () => {
  const formData = new FormData()
  formData.append('name', COOKIES_KEY.LANG)
  await removeCookies(formData)
}
