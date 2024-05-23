'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import NewLogoSm from '@/assets/icons/app-icons/logo-2-sm'
import MenuHeader from '@/assets/icons/menu-header'
import { logingOutAtom } from '@/atoms/loging-out'
import { sidebarOpenAtom } from '@/atoms/sidebar-open'
import { userAtom } from '@/atoms/user'
import { Typography } from '@/elements'
import { appbarHeight, appbarHeightSm, drawerWidthClosed } from '@/utils/constants'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Button, IconButton, Toolbar, styled, useMediaQuery, useTheme } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import HeaderMenu from './header-menu'
import NotificationMenu from './notification-menu'
import { useThemeMode } from '@/hooks/use-theme-mode'
import { THEME_MODE } from '@/constants/common.constant'

const RoundGradientButton = styled(Button)(({ theme }) => ({
  padding: '0.5rem 1rem',
  border: 'none',
  outline: 'none',
  position: 'relative',
  zIndex: 1,
  borderRadius: '0.5rem',
  background: theme.palette.gradation.sky,
  cursor: 'pointer',

  '&::before': {
    content: '""',
    position: 'absolute',
    left: '1px',
    right: '1px',
    top: '1px',
    bottom: '1px',
    borderRadius: '0.5rem',
    backgroundColor: theme.palette.main.black,
    zIndex: -1,
    transition: '200ms'
  }
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  position: 'sticky',
  height: convertToRem(appbarHeightSm),
  backgroundImage: 'none',
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.main.black,
  [theme.breakpoints.up('md')]: {
    position: 'fixed',
    height: convertToRem(appbarHeight),
    marginLeft: drawerWidthClosed,
    zIndex: theme.zIndex.drawer - 1
  }
  // ...(open && {
  //   backgroundColor: theme.palette.main.black,
  //   marginLeft: drawerWidth,
  //   width: '100%',
  //   [theme.breakpoints.up('md')]: {
  //     width: `calc(100% - ${drawerWidth}px)`
  //   },
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen
  //   })
  // }),
  // ...(!open && {
  //   backgroundColor: theme.palette.main.black,
  //   marginLeft: drawerWidthClosed,
  //   width: '100%',
  //   [theme.breakpoints.up('md')]: {
  //     width: `calc(100% - ${drawerWidthClosed}px)`
  //   },
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen
  //   })
  // })
}))

const MainHeader = () => {
  const { themeMode } = useThemeMode()
  const theme = useTheme()
  const match = useMediaQuery('(max-width: 768px)')
  // const [open, setOpen] = useState<boolean>(match ? false : true)
  const setLogingOut = useSetRecoilState(logingOutAtom)
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom)
  const user = useRecoilValue(userAtom)
  const currentPath = usePathname() as string
  const [isPathEditIR, setIsPathEditIR] = useState(false)

  // Check current path is Edit IR.
  useEffect(() => {
    setIsPathEditIR(currentPath.includes('edit-ir'))
  }, [currentPath])

  const handleDrawerToggle = () => {
    setSidebarOpen((prev) => !prev)
  }

  return (
    <AppBar
      open={sidebarOpen}
      sx={{
        height: match ? appbarHeightSm : appbarHeight
      }}
    >
      <Toolbar
        sx={{
          backgroundColor: theme.palette.main.black,
          height: 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-end'
          },
          width: '100%',
          paddingX: convertToRem(20) + ' !important'
        }}
      >
        {match ? (
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{
              width: '100%'
            }}
          >
            <Box px={1}>{!isPathEditIR && <NewLogoSm />}</Box>
            <Box>
              <NotificationMenu user={user} />
              <IconButton onClick={handleDrawerToggle}>
                <MenuHeader />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box component={'div'} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
            <RoundGradientButton>
              <Typography
                cate='body_3'
                sx={{
                  background: theme.palette.gradation.sky,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                업그레이드
              </Typography>
            </RoundGradientButton>
            <NotificationMenu user={user} />
            {user ? <HeaderMenu user={user} isDarkMode={themeMode === THEME_MODE.DARK} /> : null}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default MainHeader

// handleUpdateTheme={updateThemeMode}
