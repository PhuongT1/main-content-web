'use client'
import { useMemo } from 'react'
import { sidebarOpenAtom } from '@/atoms/sidebar-open'
import MainHeader from '@/components/header'
import { drawerWidthClosed } from '@/utils/constants'
import { Box, Stack, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import { usePathname } from 'next/navigation'
import { useRecoilValue } from 'recoil'

import MainDrawer from '@/components/drawer'
import Footer from '@/components/footer'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { MAP_URL_CLASS, PROJECT_PATHS_ENUM } from '@/app/(main-routes)/project-home/_modules/domain'
import { findTabByUrl } from '@/app/(main-routes)/project-home/_modules/utils'
import styles from './styles.module.scss'

const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isSpecificRoute'
})<{
  open?: boolean
  isSpecificRoute?: boolean
}>(({ theme, open, isSpecificRoute }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: isSpecificRoute ? 'visible !important' : '',
  marginLeft: `${drawerWidthClosed}px`,
  width: `calc(100% - ${drawerWidthClosed}px)`,
  backgroundColor: theme.palette.main.gray90,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 0,
    transition: 'transform 0.3s ease'
    /* Adjust the translateY value as needed */
  }
}))

const MainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open'
})<{
  open?: boolean
}>(({ theme, open }) => ({
  minHeight: '100vh',
  flexGrow: 1,
  // backgroundColor: 'white',
  backgroundColor: theme.palette.home.gray500,
  [theme.breakpoints.up(1201)]: {
    padding: '2.5rem 6.25rem'
  },
  [theme.breakpoints.down(1200)]: {
    padding: '2.5rem 2.5rem'
  },
  [theme.breakpoints.down(768)]: {
    padding: '2.5rem 1.25rem'
  }
}))

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname() as string
  const tabData = findTabByUrl(path as PROJECT_PATHS_ENUM)
  const open = useRecoilValue(sidebarOpenAtom)

  const checkPath = (path: string) => {
    const regex = /^\/blogs\/\d+$/ // Regular expression for /blogs/[id]
    return regex.test(path)
  }

  const wrapClass = useMemo(() => {
    return MAP_URL_CLASS[tabData?.value as PROJECT_PATHS_ENUM] || ''
  }, [path])

  return (
    <Stack className={styles[wrapClass]}>
      <MainHeader />
      <MainDrawer />
      <Main open={open} isSpecificRoute={checkPath(path)}>
        <MainContent className={styles[`${wrapClass}_main_content`]}>{children}</MainContent>
        <Footer />
      </Main>
    </Stack>
  )
}

export default AuthWrapper
