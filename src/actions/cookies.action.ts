'use server'
import { COOKIES_KEY, THEME_MODE } from '@/constants/common.constant'
import { JwtToken } from '@/types/user.type'
import { cookies } from 'next/headers'

const ONE_DAY = 24 * 60 * 60 * 1000
const SEVEN_DAY = ONE_DAY * 7
export async function setCookies(formData: FormData) {
  const name = formData.get('name') as string
  const value = formData.get('value') as string
  const configs = ([COOKIES_KEY.ACCESS_TOKEN, COOKIES_KEY.REFRESH_TOKEN] as string[]).includes(name) && {
    maxAge: SEVEN_DAY,
    httpOnly: true,
    secure: process.env.ENV === 'PROD',
    path: '/'
  }

  cookies().set(name, value, configs)
}

export async function removeCookies(formData: FormData) {
  const name = formData.get('name') as string
  cookies().delete(name)
}

export async function getCookiesLanguge() {
  const cookieStore = cookies()
  const lang = cookieStore.get(COOKIES_KEY.LANG)
  return lang
}

export async function getCookiesAccessToken() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get(COOKIES_KEY.ACCESS_TOKEN)
  return accessToken?.value
}

export async function getCookiesRefreshToken() {
  const cookieStore = cookies()
  const refreshToken = cookieStore.get(COOKIES_KEY.REFRESH_TOKEN)
  return refreshToken?.value
}

export async function getCookiesToken() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get(COOKIES_KEY.ACCESS_TOKEN)
  const refreshToken = cookieStore.get(COOKIES_KEY.REFRESH_TOKEN)
  return { accessToken: accessToken?.value, refreshToken: refreshToken?.value }
}

export async function getCookiesThemeMode() {
  const cookieStore = cookies()
  const themeMode = cookieStore.get(COOKIES_KEY.THEME_MODE)
  return themeMode?.value as THEME_MODE
}

export const setAccessToken = async (accessToken: string) => {
  const formData = new FormData()
  formData.append('name', COOKIES_KEY.ACCESS_TOKEN)
  formData.append('value', accessToken)
  await setCookies(formData)
}

export const setRefreshToken = async (refreshToken: string) => {
  const formData = new FormData()
  formData.append('name', COOKIES_KEY.REFRESH_TOKEN)
  formData.append('value', refreshToken)
  await setCookies(formData)
}

export const setCookieAuth = async (jwtToken: JwtToken) => {
  await setAccessToken(jwtToken.accessToken)
  await setRefreshToken(jwtToken.refreshToken)
}

export const getCookieAuth = async () => {
  const accessToken = await getCookiesAccessToken()
  const refreshToken = await getCookiesRefreshToken()
  return { accessToken, refreshToken }
}

export const removeCookieAuth = async () => {
  const formData = new FormData()
  formData.append('name', COOKIES_KEY.ACCESS_TOKEN)
  formData.append('name', COOKIES_KEY.REFRESH_TOKEN)
  await removeCookies(formData)
}
