import { themeModeAtom } from '@/atoms/theme-mode'
import { THEME_MODE } from '@/constants/common.constant'
// import { ColorModeContext } from '@/libs/theme-provider'
import { getThemeMode, setThemeMode as setServerThemeMode } from '@/services/theme.service'
import { PaletteMode } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export const useThemeMode = () => {
  const [themeMode, setThemeMode] = useState<PaletteMode>()
  const [storedTheme, setStoredTheme] = useRecoilState(themeModeAtom)
  // const colorMode = useContext(ColorModeContext)

  const getData = useCallback(async () => {
    const themeMode = await getThemeMode()
    console.log('Get theme mode form server', themeMode)
    setStoredTheme(themeMode)
  }, [])

  const changeThemeMode = useCallback(async (themeMode: THEME_MODE) => {
    await setServerThemeMode(themeMode)
    getData()
    // setStoredTheme(themeMode)
    // colorMode.toggleColorMode(themeMode)
  }, [])

  const switchTheme = (light: any, dark: any) => {
    return themeMode === THEME_MODE.LIGHT ? light : dark
  }

  useEffect(() => {
    if (storedTheme) {
      setThemeMode(storedTheme)
    } else {
      getData()
    }
  }, [storedTheme])

  return { themeMode, changeThemeMode, switchTheme }
}
