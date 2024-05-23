'use client'
import { sidebarOpenAtom } from '@/atoms/sidebar-open'
import MainDrawer from '@/components/drawer'
import Footer from '@/components/footer'
import MainHeader from '@/components/header'
import styles from '@/layouts/styles.module.scss'
import { drawerWidthClosed } from '@/utils/constants'
import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { MAP_URL_CLASS, PROJECT_PATHS_ENUM } from '../(main-routes)/project-home/_modules/domain'
import { findTabByUrl } from '../(main-routes)/project-home/_modules/utils'

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isSpecificRoute' })<{
//   open?: boolean
//   isSpecificRoute?: boolean
// }>(({ theme, open, isSpecificRoute }) => ({
//   overflow: isSpecificRoute ? 'visible !important' : '',
//   flexGrow: 1,
//   maxWidth: 3300,
//   marginRight: 'auto',
//   marginLeft: 'auto',
//   paddingTop: '9rem',
//   paddingBottom: '2.5rem ',
//   width: `calc(100% - ${open ? drawerWidth : drawerWidthClosed}px)`,
//   [theme.breakpoints.up('xl')]: {
//     paddingRight: '4.5rem',
//     ...(open && {
//       transition: theme.transitions.create('padding', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//       }),
//       paddingLeft: `4.5rem`
//     }),
//     ...(!open && {
//       transition: theme.transitions.create('padding', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//       }),
//       overflowX: 'hidden',
//       paddingLeft: `4.5rem`
//     })
//   },
//   [theme.breakpoints.between('md', 'xl')]: {
//     paddingRight: '2rem',
//     ...(open && {
//       transition: theme.transitions.create('padding', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//       }),
//       paddingLeft: `4.5rem`
//     }),
//     ...(!open && {
//       transition: theme.transitions.create('padding', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//       }),
//       overflowX: 'hidden',
//       paddingLeft: `4.5rem`
//     })
//   },
//   [theme.breakpoints.down('md')]: {
//     paddingRight: '1.25rem',
//     paddingTop: '5rem',
//     ...(open && {
//       transition: theme.transitions.create('padding', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//       }),
//       paddingLeft: `1.25rem`
//     }),
//     ...(!open && {
//       transition: theme.transitions.create('padding', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//       }),
//       overflowX: 'hidden',
//       paddingLeft: `1.25rem`
//     }),
//     padding: isSpecificRoute && 0
//   },
//   [theme.breakpoints.down('sm')]: {
//     ...(open && {
//       transition: theme.transitions.create('padding', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//       }),
//       paddingLeft: `1.25rem`
//     }),
//     ...(!open && {
//       transition: theme.transitions.create('padding', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//       }),
//       overflowX: 'hidden',
//       paddingLeft: `1.25rem`
//     }),
//     paddingRight: '20px',
//     paddingLeft: '20px',
//     padding: isSpecificRoute && 0
//   },
//   backgroundColor: theme.palette.main_grey.gray900
// }))

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

const Layout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname()
  const open = useRecoilValue(sidebarOpenAtom)
  const tabData = findTabByUrl(path as PROJECT_PATHS_ENUM)

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

export default Layout
