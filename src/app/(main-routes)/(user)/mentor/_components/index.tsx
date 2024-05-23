'use client'
import LoadingComponent from '@/components/loading'
import AlertPopup from '@/elements/alert-popup'
import Tab from '@/elements/tab'
import TabPanel from '@/elements/tab-panel'
import Tabs from '@/elements/tabs'
import { Stack, useMediaQuery, useTheme } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, SyntheticEvent, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import ConsoleTab from '../_tabs/console/page'
import EnvaluateManagement from '../_tabs/envaluate-management/page'
import MentorProfile from '../_tabs/mentor-profile/page'
import MentoringActive from '../_tabs/mentoring-active/page'
import NoticeList from '../_tabs/notice-list/page'
import SettlementDetail from '../_tabs/settlement-detail/page'
import { mentorTabVisibleAtom } from '../mentor-activity-atom'

const TAB_VALUE = [
  { id: 1, name: '대시보드' },
  { id: 2, name: '멘토 활동' },
  { id: 3, name: '리뷰 관리' },
  { id: 4, name: '정산 내역' },
  { id: 5, name: '멘토 프로필' },
  { id: 6, name: '공지사항' }
]

const MentorActivity = () => {
  const theme = useTheme()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const router = useRouter()
  const queryData = useSearchParams()
  const pathName = usePathname()
  const [mentorTabVisible, setMentorTabVisible] = useRecoilState(mentorTabVisibleAtom)
  const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined)
  const [showError, setShowError] = useState<boolean>(false)
  const [tabValue, setTabValue] = useState((queryData.get('tabValue') as string) || '')
  const mdUp = useMediaQuery('(min-width: 768px)')
  const xlUp = useMediaQuery('(min-width: 1200px)')

  const handleChangeTab = (_: SyntheticEvent, newValue: string) => {
    let newQuery = new URLSearchParams()
    if (newValue !== '') {
      newQuery.set('tabValue', newValue)
    } else {
      if (!!newQuery.get('tabValue')) {
        newQuery.delete('tabValue')
      }
    }

    router.push(`${pathName}?${newQuery}`)
  }

  useEffect(() => {
    const tabValue = queryData.get('tabValue')
    setMentorTabVisible(true)
    setTabValue(!!tabValue ? (tabValue as string) : '1')
  }, [queryData.get('tabValue')])

  return (
    <Stack width='100%' gap={mdUp ? 6 : 3} mt={mdUp ? 5 : 3}>
      {mentorTabVisible ? (
        <Stack width='100%' gap={3} sx={{ width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            variant='scrollable'
            sx={{
              marginY: '0 !important',
              marginX: { md: 'unset', sm: '-20px' }
            }}
            scrollButtons={mdUp ? true : false}
            aria-label='scrollable force tabs example'
          >
            {TAB_VALUE.map((i) => (
              <Tab label={i.name} value={i.id + ''} key={i.id} />
            ))}
          </Tabs>
        </Stack>
      ) : (
        <> </>
      )}

      <TabPanel index={1} value={Number(tabValue)}>
        <Suspense fallback={<LoadingComponent open />}>
          <ConsoleTab />
        </Suspense>
      </TabPanel>
      <TabPanel index={2} value={Number(tabValue)}>
        <Suspense fallback={<LoadingComponent open />}>
          <MentoringActive
            moveToReviewTab={(e: SyntheticEvent) => {
              handleChangeTab(e, '3')
            }}
          />
        </Suspense>
      </TabPanel>
      <TabPanel index={3} value={Number(tabValue)}>
        <Suspense fallback={<LoadingComponent open />}>
          <EnvaluateManagement />
        </Suspense>
      </TabPanel>
      <TabPanel index={4} value={Number(tabValue)}>
        <Suspense fallback={<LoadingComponent open />}>
          <SettlementDetail />
        </Suspense>
      </TabPanel>
      <TabPanel index={5} value={Number(tabValue)}>
        <Suspense fallback={<LoadingComponent open />}>
          <MentorProfile />
        </Suspense>
      </TabPanel>
      <TabPanel index={6} value={Number(tabValue)}>
        <Suspense fallback={<LoadingComponent open />}>
          <NoticeList />
        </Suspense>
      </TabPanel>

      <Suspense fallback={<LoadingComponent open />}>
        <AlertPopup
          onSubmit={async () => {
            setShowError(false)
            setErrorMessage('')
            setErrorTitle(undefined)
          }}
          submitTitle={errorTitle ? '모든기기 로그아웃' : '확인'}
          cancelTitle={errorTitle ? '취소' : undefined}
          onCancel={
            errorTitle
              ? () => {
                  setShowError(false)
                  setErrorMessage('')
                  setErrorTitle(undefined)
                }
              : undefined
          }
          title={errorTitle}
          description={errorMessage}
          open={showError}
        />
      </Suspense>
    </Stack>
  )
}

export default MentorActivity
