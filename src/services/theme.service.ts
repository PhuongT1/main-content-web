import { getCookiesThemeMode, setCookies } from '@/actions/cookies.action'
import { COOKIES_KEY, THEME_MODE } from '@/constants/common.constant'
import { ColorPalette, darkPalette, lightPalette } from '@/themes/get-design-tokens'

export const setThemeMode = async (theme: THEME_MODE) => {
  const formData = new FormData()
  formData.append('name', COOKIES_KEY.THEME_MODE)
  formData.append('value', theme)
  await setCookies(formData)
}

export const getThemeMode = async () => {
  const mode = await getCookiesThemeMode()
  return mode || THEME_MODE.DARK
}

export const getColor = async (color: ColorPalette) => {
  const keys = color.split('.')
  const mode = await getThemeMode()
  const palette = mode === THEME_MODE.DARK ? darkPalette : lightPalette
  let current = palette as any
  for (const key of keys) {
    if (current[key] === undefined) {
      console.error(`Invalid color: ${color}`)
      return undefined // Or return a default value/error
    }
    current = current[key]
  }
  return current
}
