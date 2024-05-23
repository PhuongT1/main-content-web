const getThemeMode = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('themeMode') as any) || 'dark'
  }
  return 'dark'
}

const setThemeMode = (themeMode: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('themeMode', JSON.stringify(themeMode))
  }
}

const getLanguage = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('lang') as string) || 'kr'
  }
  return 'en'
}

const setLanguage = (lang: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', JSON.stringify(lang))
  }
}

const WebInfoService = {
  getThemeMode,
  setThemeMode,
  getLanguage,
  setLanguage
}

export default WebInfoService
