'use client'
import { updateUserProfile } from '@/actions/apis/user.action'
import { PROJECT_PATHS_ENUM } from '@/app/(main-routes)/project-home/_modules/domain'
import { LocalizationIcon, SwitchAdminIcon } from '@/assets/icons'
import NewLogo from '@/assets/icons/app-icons/logo-2'
import BookmarkDrawer from '@/assets/icons/drawer-icons/bookmark-drawer'
import BookmarkDrawerFilled from '@/assets/icons/drawer-icons/bookmark-drawer-filled'
import ChevronLeftDrawerIcon from '@/assets/icons/drawer-icons/chevron-left'
import ChevronRightDrawerIcon from '@/assets/icons/drawer-icons/chevron-right'
import CustomerServiceCenterIcon from '@/assets/icons/drawer-icons/customer-service'
import CustomerServiceCenterFilledIcon from '@/assets/icons/drawer-icons/customer-service-filled'
import StartupToolkitIcon from '@/assets/icons/drawer-icons/startup-toolkit'
import StartupToolkitFilledIcon from '@/assets/icons/drawer-icons/startup-toolkit-filled'
import SettingSmIcon from '@/assets/icons/header-menu-icons/setting-sm'
import { logingOutAtom } from '@/atoms/loging-out'
import { sidebarOpenAtom } from '@/atoms/sidebar-open'
import { userAtom } from '@/atoms/user'
import { LANG, THEME_MODE } from '@/constants/common.constant'
import { USER_ROLE } from '@/constants/user.constants'
import { SelectStack } from '@/elements'
import ThemeSwitch from '@/elements/theme-switch'
import Typography from '@/elements/typography'
import { useLanguage } from '@/hooks/use-language'
import { useThemeMode } from '@/hooks/use-theme-mode'
import { logout } from '@/services/auth.service'
import { appbarHeight, appbarHeightSm, drawerWidth, drawerWidthClosed } from '@/utils/constants'
import { convertToRem } from '@/utils/convert-to-rem'
import { Avatar, Button, Grid, ListItemIcon, MenuItem, Stack, useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import { CSSObject, Theme, styled } from '@mui/material/styles'
import { useMutation } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import BlogIcon from '../../assets/icons/blog'
import BlogFilledIcon from '../../assets/icons/blog-filled'
import CommunityActiveDrawerIcon from '../../assets/icons/community-active-drawer-icon'
import CreditCardIcon from '../../assets/icons/credit-card'
import DarkIcon from '../../assets/icons/dark'
import CommunityDrawerIcon from '../../assets/icons/drawer-community'
import CustomerManagementIcon from '../../assets/icons/header-menu-icons/customer-management'
import UserSmIcon from '../../assets/icons/header-menu-icons/user-sm'
import Home from '../../assets/icons/home'
import HomeActiveIcon from '../../assets/icons/home-active'
import LightIcon from '../../assets/icons/light'
import LogoutIcon from '../../assets/icons/log-out'
import RocketDrawer from '../../assets/icons/rocket-drawer'
import RocketDrawerFilled from '../../assets/icons/rocket-drawer-filled'
import UserIcon from '../../assets/icons/user'
import UserActiveIcon from '../../assets/icons/user-active'
import DrawerItem, { IDrawerItem } from './component/drawer-item'
import { DrawerItemType } from './drawer.type'

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

const openedMixin = (theme: Theme): CSSObject => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: convertToRem(drawerWidth)
  },
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: 0,
  [theme.breakpoints.up('md')]: {
    width: convertToRem(drawerWidthClosed)
  }
})

const DrawerHeader = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open'
})<any>(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 3.5),
  height: convertToRem(appbarHeightSm),
  [theme.breakpoints.up('md')]: {
    height: convertToRem(appbarHeight)
  },
  flexShrink: 0,
  // necessary for content to be below app bar
  backgroundColor: theme.palette.main.black,
  backgroundImage: 'none',
  ...theme.mixins.toolbar,
  ...(open && {
    width: convertToRem(drawerWidth),
    justifyContent: 'flex-end',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }),
  ...(!open && {
    width: convertToRem(drawerWidthClosed),
    justifyContent: 'center',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  })
}))

// const ToggleStyle = styled('div', {
//   shouldForwardProp: (prop) => prop !== 'open'
// })<any>(({ theme, open }) => ({
//   width: convertToRem(16),
//   backgroundColor: theme.palette.main.gray90,
//   ...(open && {
//     transform: `translateX(0)`,
//     transition: theme.transitions.create(['transform'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen
//     })
//   }),
//   ...(!open && {
//     transform: `translateX(${drawerWidthClosed - drawerWidth + 'px'})`,
//     transition: theme.transitions.create(['transform'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen
//     })
//   })
// }))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  height: convertToRem(appbarHeight),
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  border: 'none',
  padding: '2.5rem 3rem',
  backgroundColor: theme.palette.main.black,
  backgroundImage: 'none',
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.main.black,
    backgroundImage: 'none'
  },
  scrollbarWidth: 'none',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
      border: 'none'
    }
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': {
      ...closedMixin(theme),
      border: 'none'
    }
  })
}))

const MainDrawer = () => {
  const match = useMediaQuery('(max-width: 768px)')
  const { changeThemeMode, themeMode } = useThemeMode()
  const router = useRouter()
  const path = usePathname() as string
  const [user, setUser] = useRecoilState(userAtom)
  const theme = useTheme()
  const [sideBarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom)
  const isAdminProject = useMemo(() => user?.role === USER_ROLE.ADMIN, [user?.role])

  const LanguageBox = () => {
    const { lang, changeLanguage } = useLanguage()
    const onChange = (value: LANG) => changeLanguage(value)

    return (
      <SelectStack
        value={lang}
        onChange={(e) => onChange(e.target.value as LANG)}
        sx={{
          background: 'unset',
          border: 0,
          '& .MuiSelect-select': {
            p: 0
          },
          '& .MuiTypography-root': {
            fontSize: '18px',
            fontWeight: 600,
            lineHeight: '120%'
          },
          fieldset: {
            background: 'unset'
          }
        }}
        list={[
          { label: '한국어', value: LANG.KR },
          { label: 'English', value: LANG.EN }
        ]}
      />
    )
  }

  const additionMenuInMob = () => {
    return match
      ? [
          {
            text: '고객센터',
            to: '/bookmarks',
            removeDivider: true,
            icon: <CustomerServiceCenterIcon stroke={theme.palette.main.gray10} />,
            activeIcon: <CustomerServiceCenterFilledIcon />
          },
          {
            text: '관리자전환',
            to: '/bookmarks',
            removeDivider: true,
            icon: <SwitchAdminIcon />,
            activeIcon: (
              <SwitchAdminIcon
                svgProps={{ stroke: theme.palette.main.blue }}
                pathProps={[
                  { stroke: theme.palette.main.blue },
                  { stroke: theme.palette.main.blue, fill: theme.palette.main.blue }
                ]}
              />
            )
          },
          {
            text: <LanguageBox />,
            to: '#',
            removeDivider: true,
            icon: <LocalizationIcon />,
            showToAdmin: true
          },
          {
            text: '로그아웃',
            to: '#',
            fn: () => {
              handleLogout()
            },
            removeDivider: true,
            icon: <LogoutIcon />,
            activeIcon: (
              <LogoutIcon
                svgProps={{ stroke: theme.palette.main.blue }}
                pathProps={{ stroke: theme.palette.main.blue }}
              />
            )
          }
        ]
      : [
          {
            text: '고객센터',
            to: '/bookmarks',
            removeDivider: true,
            icon: <CustomerServiceCenterIcon stroke={theme.palette.main.gray10} />,
            activeIcon: <CustomerServiceCenterFilledIcon />
          },
          {
            text: '관리자전환',
            to: '/bookmarks',
            removeDivider: true,
            icon: <SwitchAdminIcon />,
            activeIcon: (
              <SwitchAdminIcon
                svgProps={{ stroke: theme.palette.main.blue }}
                pathProps={[
                  { stroke: theme.palette.main.blue },
                  { stroke: theme.palette.main.blue, fill: theme.palette.main.blue }
                ]}
              />
            )
          },
          {
            text: <LanguageBox />,
            to: '#',
            removeDivider: true,
            icon: <LocalizationIcon />,
            showToAdmin: true
          }
        ]
  }

  const drawerPersonalData: IDrawerItem[] = useMemo(
    () => [
      {
        text: '메인 홈',
        to: '/blogs',
        icon: <Home stroke={theme.palette.main.gray10} />,
        activeIcon: <HomeActiveIcon />
      },
      {
        text: '내 프로젝트',
        to: isAdminProject ? PROJECT_PATHS_ENUM.OPEN_INNOVATION : PROJECT_PATHS_ENUM.MY_PROJECT,
        icon: <RocketDrawer stroke={theme.palette.main.gray10} />,
        activeIcon: <RocketDrawerFilled />,
        showToAdmin: true
      },
      {
        text: '마이페이지',
        icon: <UserIcon stroke={theme.palette.main.gray10} />,
        activeIcon: <UserActiveIcon />,
        child: [
          { text: '계정관리', to: '/me' },
          { text: '결제 관리', to: '/payment-management' },
          { type: DrawerItemType.DIVIDER },
          { text: '인재풀 관리', to: '/talent-pool' },
          { text: '팀빌딩 관리', to: '/team-building' },
          { text: '스타트업 토크 내역', to: '/startup-talk' },
          { text: '멘티 활동', to: '/mentee' },
          { text: '멘토 페이지', to: '/mentor', visible: !!user?.mentoringId },
          { text: '교육신청 관리', to: '/education-application' },
          { type: DrawerItemType.DIVIDER },
          { text: '자격증 관리', to: '/certificate-management' },
          { text: '아이디어 경진대회', to: '/setting' },
          { text: '크라우드 펀딩 현황', to: '/setting' },
          { type: DrawerItemType.DIVIDER },
          { text: '강점 분석 관리', to: '/setting' },
          { type: DrawerItemType.DIVIDER },
          { text: '환경설정', to: '/setting' }
        ]
      }
    ],
    [user]
  )

  const drawerPublicData: IDrawerItem[] = [
    {
      text: '내 프로젝트',
      to: isAdminProject ? PROJECT_PATHS_ENUM.OPEN_INNOVATION : PROJECT_PATHS_ENUM.MY_PROJECT,
      icon: <RocketDrawer stroke={theme.palette.main.gray10} />,
      activeIcon: <RocketDrawerFilled />,
      showToAdmin: true
    },
    {
      text: '콘텐츠 블로그',
      to: '/blogs',
      icon: <BlogIcon stroke={theme.palette.main.gray10} />,
      activeIcon: <BlogFilledIcon />
    },
    {
      text: '북마크',
      to: '/bookmarks',
      icon: <BookmarkDrawer stroke={theme.palette.main.gray10} />,
      activeIcon: <BookmarkDrawerFilled />
    },
    {
      text: '커뮤니티',
      icon: <CommunityDrawerIcon stroke={theme.palette.main.gray10} />,
      activeIcon: <CommunityActiveDrawerIcon />,
      child: [
        { text: '교육행사 & 지원사업', to: '/community/educational-event-and-support-project' },
        { text: '스타트업 토크', to: '/community/startup-talks' },
        // { text: '스타트업 Q&A업', to: '/community/events' },
        { text: '인재풀', to: '/community/talents' },
        { text: '팀빌딩', to: '/community/team-building' },
        { text: '전문가 멘토링', to: '/community/expert-mentoring' },
        { text: '외주기업', to: '/community/outsource-companies' }
      ]
    },
    {
      text: '스타트업 툴킷',
      icon: <StartupToolkitIcon stroke={theme.palette.main.gray10} />,
      activeIcon: <StartupToolkitFilledIcon />,
      child: [
        { text: '자료실', to: '/startup/referent-room' },
        { text: '도장/서명제작', to: '/startup/stamp-signature-creation' },
        { text: '모의 크라우드 펀딩', to: '/community/crowdfunding' },
        { text: '자격시험', to: '/startup/certification-exam' },
        { text: '아이디어 경진대회', to: '/community/talents' }
      ]
    }
  ]

  const baseBottomNavMenu = [...additionMenuInMob()]
  const bottomNavMenu = isAdminProject ? baseBottomNavMenu.filter((item) => item.showToAdmin) : baseBottomNavMenu
  const [currentDrawerData, setCurrentDrawerData] = useState<IDrawerItem[]>(drawerPersonalData)
  // const colorMode = useContext(ColorModeContext)
  const setLoggingOut = useSetRecoilState(logingOutAtom)

  const userPersonalUrls = ['setting', 'me', 'community-management', 'project-home']
  const userPublicUrls = ['', 'community', 'blogs', 'bookmarks', 'startup']
  const parentPath = path.split('/')[1]?.split('?')[0]

  const updateProfileUserAct = useMutation({
    mutationFn: updateUserProfile
  })

  const handleLogout = async () => {
    setLoggingOut(true)
    await logout()
  }

  useEffect(() => {
    let drawerData: IDrawerItem[] = []

    if (userPersonalUrls.some((i) => i === parentPath)) {
      drawerData = [...drawerPersonalData]
    } else if (userPublicUrls.some((i) => i === parentPath)) {
      drawerData = [...drawerPublicData]
    } else {
      drawerData = [...drawerPersonalData]
    }

    if (isAdminProject) {
      drawerData = drawerData.filter((item) => item.showToAdmin)
    }

    setCurrentDrawerData(() => drawerData)
  }, [parentPath, isAdminProject])

  const handleDrawerToggle = () => {
    setSidebarOpen((prev) => !prev)
  }

  const updateThemeMode = async (themeMode?: THEME_MODE.LIGHT | THEME_MODE.DARK | any) => {
    let newMode: THEME_MODE.LIGHT | THEME_MODE.DARK =
      !!themeMode && (themeMode === THEME_MODE.LIGHT || themeMode === THEME_MODE.DARK)
        ? themeMode
        : user?.isDarkMode
        ? THEME_MODE.LIGHT
        : THEME_MODE.DARK
    const updateData = {
      isDarkMode: !user?.isDarkMode
    }
    const { data, error } = await updateProfileUserAct.mutateAsync(updateData)
    if (data && !error) {
      await changeThemeMode(newMode)
      setUser(data.data)
    } else {
    }
  }

  const drawerContent = (
    <Stack direction={'column'} flexWrap={'nowrap'} height={'100%'}>
      {!match ? (
        <Box
          sx={{
            height: convertToRem(104),
            width: sideBarOpen ? drawerWidth : drawerWidthClosed
          }}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexShrink={0}
        >
          <NewLogo />
        </Box>
      ) : null}
      <Stack
        sx={{
          [theme.breakpoints.up('md')]: {
            width: convertToRem(drawerWidth)
          },
          height: '100%',
          padding: `${convertToRem(40)} ${convertToRem(24)}`
        }}
        direction={'column'}
        justifyContent={'space-between'}
      >
        <List>
          {match && (
            <>
              <Stack direction={'row'} pb={2} alignItems={'center'} width={'100%'}>
                <Avatar
                  sx={{
                    width: '2.5rem',
                    height: '2.5rem'
                  }}
                  src={user?.avatar?.url ? user?.avatar?.url : 'images/blank-user.png'}
                />
                <Stack ml={1.5} alignItems={'flex-start'} justifyContent={'space-between'} direction={'column'}>
                  <Typography cate='caption_1_semibold' mb={0.25}>
                    담당자 (프리미엄)
                  </Typography>
                  <Typography cate='caption_2' color={theme.palette.main.gray30}>
                    {user?.email}
                  </Typography>
                </Stack>
              </Stack>
              <Grid container mb={5}>
                <Grid item xs={6}>
                  <MenuItem
                    sx={{
                      padding: '0.62rem 0'
                    }}
                    onClick={() => {
                      router.push('/me')
                      setSidebarOpen(false)
                    }}
                  >
                    <ListItemIcon>
                      <UserSmIcon />
                    </ListItemIcon>
                    <Typography cate='caption_1' color='main.white'>
                      회원정보
                    </Typography>
                  </MenuItem>
                </Grid>
                <Grid item xs={6}>
                  <MenuItem
                    onClick={() => {
                      router.push('/payment-management')
                      setSidebarOpen(false)
                    }}
                    sx={{
                      padding: '0.62rem 0'
                    }}
                  >
                    <ListItemIcon>
                      <CreditCardIcon />
                    </ListItemIcon>
                    <Typography cate='caption_1' color='main.white'>
                      결제관리
                    </Typography>
                  </MenuItem>
                </Grid>
                <Grid item xs={6}>
                  <MenuItem
                    sx={{
                      padding: '0.62rem 0'
                    }}
                    onClick={() => {
                      router.push('/community-management')
                      setSidebarOpen(false)
                    }}
                  >
                    <ListItemIcon>
                      <CustomerManagementIcon />
                    </ListItemIcon>
                    <Typography cate='caption_1' color='main.white'>
                      구독관리
                    </Typography>
                  </MenuItem>
                </Grid>
                <Grid item xs={6}>
                  <MenuItem
                    onClick={() => {
                      router.push('/setting')
                      setSidebarOpen(false)
                    }}
                    sx={{
                      padding: '0.62rem 0'
                    }}
                  >
                    <ListItemIcon>
                      <SettingSmIcon />
                    </ListItemIcon>
                    <Typography cate='caption_1' color='main.white'>
                      환경설정
                    </Typography>
                  </MenuItem>
                </Grid>
              </Grid>
            </>
          )}
          {currentDrawerData.map((drawerItem: IDrawerItem, index: number) => (
            <DrawerItem
              {...drawerItem}
              setDrawerOpen={(_) => {
                // handleLayoutToggle(!sideBarOpen)
                if (match) {
                  setSidebarOpen(false)
                } else {
                  setSidebarOpen(true)
                }
              }}
              drawerOpen={sideBarOpen}
              key={`${index}_${drawerItem.to}`}
              index={index}
            />
          ))}
          {/* {match && (
					 <>
					 <ListItem onClick={handleLogout} sx={{ padding: '1rem 0' }}>
					 <Customer stroke={theme.palette.main.white} />
					 <Typography ml={2} cate='body_3_semibold'>
					 고객센터
					 </Typography>
					 </ListItem>
					 <ListItem onClick={handleLogout} sx={{ padding: '1rem 0' }}>
					 <Admin />
					 <Typography ml={2} cate='body_3_semibold'>
					 관리자전환
					 </Typography>
					 </ListItem>
					 <ListItem onClick={handleLogout} sx={{ padding: '1rem 0' }}>
					 <LogoutIcon />
					 <Typography ml={2} cate='body_3_semibold'>
					 로그아웃
					 </Typography>
					 </ListItem>
					 </>
					 )} */}
        </List>
        <Box
          sx={{
            paddingBottom: { md: convertToRem(12), sm: convertToRem(24) }
          }}
        >
          <List>
            {bottomNavMenu.map((drawerItem: IDrawerItem, index: number) => (
              <DrawerItem
                {...drawerItem}
                setDrawerOpen={(_) => {
                  // handleLayoutToggle(!sideBarOpen)
                  if (match) {
                    setSidebarOpen(false)
                  } else {
                    setSidebarOpen(true)
                  }
                }}
                drawerOpen={sideBarOpen}
                key={index}
                index={index}
              />
            ))}
          </List>
          <Stack direction={'row'} justifyContent={'space-between'} mt={7}>
            {sideBarOpen ? (
              <ThemeSwitch checked={themeMode === 'dark'} onChange={updateThemeMode} />
            ) : (
              <IconButton onClick={updateThemeMode} sx={{ marginLeft: -1.75 }}>
                {themeMode === 'dark' ? <DarkIcon /> : <LightIcon />}
              </IconButton>
            )}
            {sideBarOpen && match && (
              <RoundGradientButton>
                <Typography
                  cate='body_3'
                  sx={{
                    background: theme.palette.gradation.sky,
                    WebkitBackgroundClip: 'text',
                    '-webkit-text-fill-color': 'transparent'
                  }}
                >
                  업그레이드
                </Typography>
              </RoundGradientButton>
            )}
          </Stack>
        </Box>
      </Stack>
    </Stack>
  )
  return match ? (
    <MuiDrawer
      variant='temporary'
      open={sideBarOpen}
      ModalProps={{
        keepMounted: false // Better open performance on mobile.
      }}
      sx={{
        display: 'block',
        left: sideBarOpen ? 0 : 'auto',
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: '100%',
          backgroundColor: theme.palette.main.black,
          backgroundImage: 'none'
        }
      }}
    >
      <DrawerHeader></DrawerHeader>
      {drawerContent}
    </MuiDrawer>
  ) : (
    <Drawer
      variant='permanent'
      open={sideBarOpen}
      onMouseEnter={(e) => {
        e.stopPropagation()
        setSidebarOpen(true)
      }}
      onMouseLeave={(e) => {
        e.stopPropagation()
        setSidebarOpen(false)
      }}
      sx={{
        display: match ? 'none' : 'block'
      }}
    >
      <DrawerHeader open={sideBarOpen}>
        <Button
          onClick={handleDrawerToggle}
          sx={{
            border: '1px solid #28292D',
            borderRadius: `${convertToRem(100)} !important`,
            minWidth: `${convertToRem(54)} !important`
          }}
        >
          {sideBarOpen ? <ChevronRightDrawerIcon /> : <ChevronLeftDrawerIcon />}
        </Button>
      </DrawerHeader>
      {drawerContent}
    </Drawer>
  )
}

export default MainDrawer
