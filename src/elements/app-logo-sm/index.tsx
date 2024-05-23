import LogoEnDarkSm from '@/assets/icons/app-icons/logo-en-dark-sm'
import LogoEnLightSm from '@/assets/icons/app-icons/logo-en-light-sm'
import LogoKrDarkSm from '@/assets/icons/app-icons/logo-kr-dark-sm'
import LogoKrLightSm from '@/assets/icons/app-icons/logo-kr-light-sm'
import { LANG, THEME_MODE } from '@/constants/common.constant'
import { useLanguage } from '@/hooks/use-language'
import { useThemeMode } from '@/hooks/use-theme-mode'

const AppLogoSm = () => {
  const { lang } = useLanguage()
  const { themeMode } = useThemeMode()

  if (themeMode === THEME_MODE.DARK && lang === LANG.EN) {
    return <LogoEnDarkSm />
  } else if (themeMode === THEME_MODE.LIGHT && lang === LANG.EN) {
    return <LogoEnLightSm />
  } else if (themeMode === THEME_MODE.DARK && lang === LANG.KR) {
    return <LogoKrDarkSm />
  } else {
    return <LogoKrLightSm />
  }
}

export default AppLogoSm
