'use client'
import NewLogoKrLight from '@/assets/icons/app-icons/new-logo-kr-light'
import { LANG, THEME_MODE } from '@/constants/common.constant'
import { useLanguage } from '@/hooks/use-language'
import { useThemeMode } from '@/hooks/use-theme-mode'
import { Box } from '@mui/material'

const AppLogo = () => {
  const { lang } = useLanguage()
  const { themeMode } = useThemeMode()

  if (themeMode === THEME_MODE.DARK && lang === LANG.EN) {
    return (
      <Box mb={2}>
        <NewLogoKrLight />
      </Box>
    )
  } else if (themeMode === THEME_MODE.LIGHT && lang === LANG.EN) {
    return (
      <Box mb={2}>
        <NewLogoKrLight />
      </Box>
    )
  } else if (themeMode === THEME_MODE.DARK && lang === LANG.KR) {
    return (
      <Box mb={2}>
        <NewLogoKrLight />
      </Box>
    )
  } else {
    return (
      <Box mb={2}>
        <NewLogoKrLight />
      </Box>
    )
  }
}

export default AppLogo
