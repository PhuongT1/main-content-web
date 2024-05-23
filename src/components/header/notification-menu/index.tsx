'use client'
import { logingOutAtom } from '@/atoms/loging-out'
import Typography from '@/elements/typography'
import { logout } from '@/services/auth.service'
import { IUser } from '@/types/user.type'
import { Badge, Box, Divider, Menu, MenuItem, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { ListItemLinkProps } from '../../drawer/drawer.type'
import NotificationIcon from '@/assets/icons/notifications'
import { convertToRem } from '@/utils/styles'
import ScrollBar from 'react-perfect-scrollbar'
import { TabRoundedBadge, TabUnderline } from '@/components/tabs'
import { color_gray } from '@/themes/system-palette'
import Accordion from '@/components/accordion'
import { IDataTab } from '@/types/community/educational-event.type'

export interface drawerItemProps extends IDrawerItem {
  drawerOpen: boolean
  setDrawerOpen: (state: boolean) => void
}
export interface IDrawerItem {
  to?: string
  text?: string
  icon?: ReactNode
  child?: Array<ListItemLinkProps> | undefined
  index?: number
  activeIcon?: ReactNode
}

interface HeaderMenuItemProps {
  path: string
  closeMenu?: Function
  title: string
  subTitle?: string
  content: string
  date: string
}

const notiData: HeaderMenuItemProps[] = [
  {
    path: '/',
    title: '커뮤니티',
    subTitle: '인재풀',
    content: '‘{콘텐츠 블로그 게시글 제목}’에 작성한',
    date: '2024.12.12'
  },
  {
    path: '/',
    title: '커뮤니티',
    subTitle: '인재풀',
    content: '‘{콘텐츠 블로그 게시글 제목}’에 작성한',
    date: '2024.12.12'
  },
  {
    path: '/',
    title: '커뮤니티',
    subTitle: '인재풀',
    content: '‘{콘텐츠 블로그 게시글 제목}’에 작성한',
    date: '2024.12.12'
  },
  {
    path: '/',
    title: '커뮤니티',
    subTitle: '인재풀',
    content: '‘{콘텐츠 블로그 게시글 제목}’에 작성한',
    date: '2024.12.12'
  },
  {
    path: '/',
    title: '커뮤니티',
    subTitle: '인재풀',
    content:
      '‘{멘토링 타이틀}’ 수업이 멘토에 의해 취소되었습니다. 취소 사유 : {contents} 결제한 금액이 영업일 3일 이내로 환불됩니다. (카드사 사정에 따라 달라질 수 있습니다.)',
    date: '2024.12.12'
  },
  {
    path: '/',
    title: '커뮤니티',
    subTitle: '인재풀',
    content:
      '‘{멘토링 타이틀}’ 수업이 멘토에 의해 취소되었습니다. 취소 사유 : {contents} 결제한 금액이 영업일 3일 이내로 환불됩니다. (카드사 사정에 따라 달라질 수 있습니다.)',
    date: '2024.12.12'
  }
]

const dataTab = [
  {
    label: '미확인',
    number: 7
  },
  {
    label: '전체보기'
  }
]

const DATA_TAB: IDataTab[] = [
  {
    label: '전체',
    value: ''
  },
  {
    label: '프로젝트',
    value: 'a'
  },
  {
    label: '취소',
    value: 'b'
  },
  {
    label: '콘텐츠 블로그',
    value: 'c'
  },
  {
    label: '커뮤니티',
    value: 'd'
  },
  {
    label: '스타트업 툴킷',
    value: 'e'
  },
  {
    label: '공지사항',
    value: 'f'
  },
  {
    label: '기타',
    value: 'g'
  }
]

const NotificationMenu = ({ user, data = notiData }: { user: IUser | null; data?: any }) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const setLogingOut = useSetRecoilState(logingOutAtom)
  const menuOpen = Boolean(anchorEl)
  const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const closeUserMenu = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    setLogingOut(true)
    await logout()
  }
  const theme = useTheme()
  const match = useMediaQuery('(max-width: 768px)')

  const [tabValue, setTabValue] = useState<number>(0)
  const handleTabValueChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const [tab, setTab] = useState<string>('')
  const [open, setOpen] = useState(false)
  const toggle = () => {
    setOpen((p) => !p)
  }

  const handleChangeTab = (_: SyntheticEvent, value: string) => {
    setTab(value)
  }

  return (
    <>
      <Badge
        id='demo-positioned-button'
        aria-controls={menuOpen ? 'demo-positioned-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={menuOpen ? 'true' : undefined}
        onClick={openUserMenu}
        variant='dot'
        sx={{
          marginRight: match ? '1rem' : '2rem',
          marginLeft: match ? 'unset' : '2rem',
          '& .MuiBadge-badge': {
            transform: 'scale(1.5) translate(0%, 0%)',
            borderRadius: '250rem',
            background: theme.palette.main.primary_light
          }
        }}
      >
        <Box
          component='div'
          sx={{
            border: match ? 'unset' : '1px solid ' + theme.palette.main.gray50,
            borderRadius: match ? 'unset' : '250rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem'
          }}
        >
          <NotificationIcon stroke={theme.palette.main.white} />
        </Box>
      </Badge>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={closeUserMenu}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: theme.palette.main.gray80,
            backgroundImage: 'none',
            width: convertToRem(360),
            '& .MuiList-root': {
              paddingTop: convertToRem(16),
              paddingBottom: 0
            }
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <TabUnderline value={tabValue as any} data={dataTab} handleChange={handleTabValueChange}></TabUnderline>
        <Divider />
        <Accordion open={open} toggle={toggle}>
          <Box sx={{ width: '100%', paddingX: convertToRem(16), zIndex: 2 }}>
            <TabRoundedBadge
              data={DATA_TAB}
              value={tab}
              handleChange={handleChangeTab}
              flexStyle={{
                flexWrap: open ? 'wrap' : 'nowrap',
                transition: 'flex-wrap 0.5s ease'
              }}
            />
          </Box>
        </Accordion>
        <Divider sx={{ marginBottom: convertToRem(16), marginTop: open ? convertToRem(16) : 0 }} />
        {data?.length === 0 ? (
          <Stack alignItems='center' justifyContent='center' height={convertToRem(600)}>
            <Typography cate='body_3' plainColor='base_gray.400'>
              알림이 비어있어요.
            </Typography>
          </Stack>
        ) : (
          <ScrollBar style={{ maxHeight: convertToRem(600), overflow: 'hidden', width: '100%' }}>
            <Stack gap={convertToRem(16)} paddingBottom={convertToRem(16)} width={'100%'}>
              {data?.map((item: HeaderMenuItemProps, index: number) => (
                <HeaderMenuItem
                  key={index}
                  path={item.path}
                  closeMenu={closeUserMenu}
                  content={item.content}
                  title={item.title}
                  subTitle={item.subTitle}
                  date={item.date}
                />
              ))}
            </Stack>
          </ScrollBar>
        )}
        <Divider />
        {data?.length !== 0 && (
          <MenuItem
            sx={{
              paddingTop: convertToRem(12),
              paddingBottom: convertToRem(16),
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={handleLogout}
          >
            <Typography cate='caption_1' color={theme.palette.main.point}>
              모두 읽음
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  )
}
export default NotificationMenu

const HeaderMenuItem = ({ path, closeMenu, title, subTitle, content, date }: HeaderMenuItemProps) => {
  const router = useRouter()
  const theme = useTheme()

  return (
    <MenuItem
      onClick={() => {
        router.push(path)
        closeMenu?.()
      }}
      sx={{
        paddingY: 0,
        width: '100%'
      }}
    >
      <Stack
        sx={{
          paddingX: convertToRem(16),
          paddingY: convertToRem(12),
          background: theme.palette.main_grey.gray700,
          gap: convertToRem(12),
          borderRadius: convertToRem(10),
          border: `1px solid ${color_gray[550]}`,
          width: '100%'
        }}
      >
        <Stack direction='row' justifyContent='space-between'>
          <Stack direction='row' gap={convertToRem(4)}>
            <Typography cate='caption_20' plainColor='main.gray30'>
              {title}
            </Typography>
            <Stack direction='row' gap={convertToRem(4)}>
              <Typography cate='caption_20' plainColor='main.gray30'>
                ·
              </Typography>
              <Typography cate='caption_20' plainColor='main.point'>
                {subTitle}
              </Typography>
            </Stack>
          </Stack>
          <Typography cate='caption_10' plainColor='main.gray30'>
            {date}
          </Typography>
        </Stack>
        <Stack direction='row' gap={convertToRem(8)} alignItems='center'>
          <Box
            sx={{
              width: convertToRem(6),
              height: convertToRem(6),
              borderRadius: convertToRem(99),
              background: theme.palette.main.point
            }}
          ></Box>
          <Typography
            cate='body_30'
            plainColor='main.grayf7'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              flex: 1
            }}
          >
            {content}
          </Typography>
        </Stack>
      </Stack>
    </MenuItem>
  )
}
