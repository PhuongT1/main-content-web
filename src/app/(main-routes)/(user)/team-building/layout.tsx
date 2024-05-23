'use client'
import { PageTitle } from '@/components'
import { FillTabItem, FilledTabStack } from '@/components/tabs'
import { useDialog } from '@/hooks/use-dialog'
import { useHydrate } from '@/hooks/use-hydrate'
import { Box } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, Suspense, useState } from 'react'

enum TEAM_BUILDING_TAB {
  MY_TEAM = 'myTeam',
  APPLICATIONS = 'applications',
  MY_APPLICATIONS = 'myApplications'
}

const TEAM_BUILDING_TAB_DATA = [
  {
    label: '팀관리',
    value: TEAM_BUILDING_TAB.MY_TEAM
  },
  {
    label: '신청자 목록',
    value: TEAM_BUILDING_TAB.APPLICATIONS
  },
  {
    label: '나의 신청',
    value: TEAM_BUILDING_TAB.MY_APPLICATIONS
  }
]

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: TEAM_BUILDING_TAB
  value: TEAM_BUILDING_TAB
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

type TeamBuildingPageProps = { children: ReactNode; applications: ReactNode; myApplications: ReactNode }

const Layout = ({ children, applications, myApplications }: TeamBuildingPageProps) => {
  const router = useRouter()
  const searchParams = new URLSearchParams(useSearchParams())
  const pathname = usePathname()

  const [tab, setTab] = useState(TEAM_BUILDING_TAB.MY_TEAM)
  const { hydrated } = useHydrate()
  const { open, onOpen, onClose } = useDialog()

  const onChangeTab = (value: TEAM_BUILDING_TAB) => {
    if (hydrated) {
      searchParams.delete('page')
      searchParams.delete('type')
      router.push(`?${searchParams}`, { scroll: false })
      setTab(value)
    }
  }

  return (
    <Suspense>
      <Box>
        {pathname === '/team-building' && (
          <Box>
            <PageTitle>팀빌딩 관리</PageTitle>
            <Box sx={{ mt: 6, mb: { md: 6, xs: 3 } }}>
              <FilledTabStack
                keepBg
                value={tab}
                onChange={(_, e) => onChangeTab(e)}
                variant='scrollable'
                aria-label='scrollable force tabs example'
              >
                {TEAM_BUILDING_TAB_DATA.map((item) => (
                  <FillTabItem isSelected={item.value === tab} key={item.value} value={item.value} label={item.label} />
                ))}
              </FilledTabStack>
            </Box>
          </Box>
        )}
        <TabPanel value={tab} index={TEAM_BUILDING_TAB.MY_TEAM}>
          {children}
        </TabPanel>
        <TabPanel value={tab} index={TEAM_BUILDING_TAB.APPLICATIONS}>
          {applications}
        </TabPanel>
        <TabPanel value={tab} index={TEAM_BUILDING_TAB.MY_APPLICATIONS}>
          {myApplications}
        </TabPanel>
      </Box>
    </Suspense>
  )
}

export default Layout
