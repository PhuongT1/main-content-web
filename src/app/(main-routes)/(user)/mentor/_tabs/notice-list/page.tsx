'use client'
import { useHydrate } from '@/hooks/use-hydrate'
import { getMentoringNoticeDetail } from '@/services/mentoring.service'
import { IMentoringNotice } from '@/types/mentoring.type'
import { pretendard } from '@/utils/font'
import getCurrentUrl from '@/utils/get-current-url'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { mentorTabVisibleAtom } from '../../mentor-activity-atom'
import NoticeDetail from './_components/notice-detail'
import NoticeListTable from './_components/table'

const NoticeList = () => {
  const theme = useTheme()
  const mdUp = useMediaQuery('(min-width: 768px)')
  const lgUp = useMediaQuery('(min-width: 1120px)')
  const xlUp = useMediaQuery('(min-width: 1407px)')
  const xxlUp = useMediaQuery('(min-width: 1880px)')
  const [key, setKey] = useState(Math.random().toString())
  const [hydrate, setHydrate] = useState(false)
  const pathname = getCurrentUrl()

  const [isDetail, setDetail] = useState<boolean>(false)
  const {} = useHydrate()
  const setMentorTabVisible = useSetRecoilState(mentorTabVisibleAtom)
  const router = useRouter()
  const queryData = useSearchParams()
  const pathName = usePathname()

  useEffect(() => {
    setHydrate(true)
  }, [hydrate])

  useEffect(() => {
    setKey(Math.random().toString())
  }, [pathname])

  const {
    data: responseDetail,
    isLoading,
    refetch
  } = useQuery<{ data: IMentoringNotice }, Error>({
    queryKey: ['mentoring-notice-detail', queryData.get('id') as string],
    queryFn: () => getMentoringNoticeDetail(queryData.get('id') || ''),
    retry: false,
    staleTime: 0,
    gcTime: 0,
    enabled: Boolean(queryData.get('id'))
  })

  const handleDetail = (newValue: string) => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))

    if (newValue !== '') {
      newQuery.set('id', newValue)
    } else {
      if (!!newQuery.get('id')) {
        newQuery.delete('id')
      }
    }
    setMentorTabVisible(false)
    router.push(`${pathName}?${newQuery}`)
  }

  const handleList = () => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    newQuery.delete('id')
    setMentorTabVisible(true)
    router.push(`${pathName}?${newQuery}`)
  }

  useEffect(() => {
    if (!queryData?.get('id')) {
      setMentorTabVisible(true)
    } else {
      setMentorTabVisible(false)
    }
  }, [queryData?.get('id')])

  return (
    <Box
      display='flex'
      flexDirection='column'
      key={key}
      sx={{
        fontFamily: `var(${pretendard.variable}) !important`
      }}
    >
      {!queryData.get('id') ? (
        <NoticeListTable
          onDetailClick={(value: string) => {
            handleDetail(value || '1')
          }}
        />
      ) : (
        <NoticeDetail
          data={responseDetail?.data || null}
          onBack={() => {
            handleList()
          }}
        />
      )}
    </Box>
  )
}

export default NoticeList
