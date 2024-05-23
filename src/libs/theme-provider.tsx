'use client'
import { themeModeAtom } from '@/atoms/theme-mode'
import { getDesignTokens, ThemePalatte } from '@/themes/get-design-tokens'
import { pretendard } from '@/utils/font'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'

const CssBaseline = dynamic(() => import('@mui/material/CssBaseline'))

declare module '@mui/material/styles' {
  interface Palette extends ThemePalatte {}

  // allow configuration using `createTheme`
  interface PaletteOptions extends ThemePalatte {}

  interface TypographyOptions {
    allVariants?: any
    large_title?: any
    title_1_bold?: any
    title_2_bold?: any
    title_3?: any
    title_3_bold?: any
    title_3_semibold?: any
    subtitle_1?: any
    subtitle_1_semibold?: any
    body_1?: any
    body_2?: any
    body_2_semibold?: any
    body_3?: any
    body_3_semibold?: any
    caption_1?: any
    caption_1_semibold?: any
    caption_2?: any
    caption_2_semibold?: any
    button_1_semibold?: any
    button_2_semibold?: any
    button_3_semibold?: any
  }
}

// export const ColorModeContext = createContext({
//   toggleColorMode: (data: 'light' | 'dark') => {}
// })

export default function AppThemeProvider({ children }: React.PropsWithChildren) {
  const themeMode = useRecoilValue(themeModeAtom)

  // const colorMode = useMemo(
  //   () => ({
  //     toggleColorMode: (updateMode: 'light' | 'dark') => {
  //       setMode(updateMode)
  //       WebInfoService.setThemeMode(updateMode)
  //     }
  //   }),
  //   []
  // )

  // useEffect(() => {
  //   const mode = WebInfoService.getThemeMode()
  //   if (mode) {
  //     setMode(mode)
  //   }
  // }, [])

  const theme = useMemo(
    () =>
      createTheme({
        ...getDesignTokens(themeMode)
      }),
    [themeMode]
  )

  // merge custom component
  // theme.components = Object.assign({}, theme.components, componentsOverrides(theme))

  return (
    // <CacheProvider value={cache}>
    // <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
    // </ColorModeContext.Provider>
    // </CacheProvider>
  )
}
