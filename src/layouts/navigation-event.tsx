'use client'
import { getUserProfile } from '@/actions/apis/user.action'
import { loadingAtom } from '@/atoms/loading'
import { logingOutAtom } from '@/atoms/loging-out'
import { userAtom } from '@/atoms/user'
import { LockAlert } from '@/components/dialog'
import LoadingComponent from '@/components/loading'
import { LANG, THEME_MODE } from '@/constants/common.constant'
import { useAuth } from '@/hooks/use-auth'
import { useErrorDialog } from '@/hooks/use-error-dialog'
import { useLanguage } from '@/hooks/use-language'
import { useNavigation } from '@/hooks/use-navigation'
import { useThemeMode } from '@/hooks/use-theme-mode'
import { useUserProfile } from '@/hooks/use-user-profile'
import { EMITTERS, errorDialogEmitter } from '@/libs/mitt/common.mitt'
import { DEFAULT_LANGUAGE } from '@/utils/constants'
import dynamic from 'next/dynamic'
import { ReactNode, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

const ComechatProvider = dynamic(() => import('@/layouts/come-chat-provider'), {
  ssr: false
})

const NavigationEvents = ({ children }: { children: ReactNode }) => {
  const { changeLanguage } = useLanguage()
  const setUser = useSetRecoilState(userAtom)
  const { user } = useUserProfile()
  const { jwtToken } = useAuth()
  const { message, errorDialogOpen, errorDialogHandler, closeErrorDialog } = useErrorDialog('')
  const { getData } = useLanguage()
  const { changeThemeMode, themeMode } = useThemeMode()
  // const setUserPool = useSetRecoilState(userPoolAtom)
  const setLoggingOut = useSetRecoilState(logingOutAtom)
  // const colorMode = useContext(ColorModeContext)
  const [isLoading, setIsLoading] = useRecoilState(loadingAtom)
  const { route } = useNavigation({
    on: {
      routeChanging() {
        setIsLoading(true)
      },
      routeChanged({ pathname, searchParams }) {
        // const url = `${pathname}?${searchParams}`
        setIsLoading(false)
      }
    }
  })

  const fetchData = async () => {
    const token = jwtToken?.accessToken
    if (token) {
      const data = await getUserProfile()
      setUser(data)
      await changeThemeMode(data.isDarkMode ? THEME_MODE.DARK : THEME_MODE.LIGHT)
      await changeLanguage((data?.language || DEFAULT_LANGUAGE) as LANG)
    } else {
      await changeThemeMode(THEME_MODE.DARK)
    }
  }

  useEffect(() => {
    if (!isLoading) {
      setLoggingOut(false)
    }
  }, [isLoading])

  useEffect(() => {
    async function initLang() {
      await getData()
    }
    initLang()
  }, [])

  useEffect(() => {
    fetchData().catch(console.error)
  }, [jwtToken])

  useEffect(() => {
    errorDialogEmitter.on(EMITTERS.ERROR_DIALOG, errorDialogHandler)
  }, [])

  return (
    <>
      <LockAlert
        open={errorDialogOpen}
        title={message}
        submitTxt='확인'
        onSubmit={() => {
          closeErrorDialog()
        }}
      />
      {children}
      {/* <LoadingComponent open={isLoading} /> */}
      {user && <ComechatProvider />}
    </>
  )
}

export default NavigationEvents
