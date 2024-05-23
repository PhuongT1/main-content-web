'use client'
import { userAtom } from '@/atoms/user'
import { useDialog } from '@/hooks/use-dialog'
import { useHydrate } from '@/hooks/use-hydrate'
import { getMyMentorRevenue } from '@/services/mentoring.service'
import getCurrentUrl from '@/utils/get-current-url'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import PaymentStatistic from './payment-statistic'
import SettlementTable from './settlement-table'

const SettlementDetail = () => {
  const theme = useTheme()
  const mdUp = useMediaQuery('(min-width: 768px)')
  const lgUp = useMediaQuery('(min-width: 1200px)')
  const xlUp = useMediaQuery('(min-width: 1407px)')
  const xxlUp = useMediaQuery('(min-width: 1880px)')
  const [key, setKey] = useState(Math.random().toString())
  const { open: mentorDialogOpen, onClose: onCloseMentorDialog, onOpen: onOpenMentorDialog } = useDialog()
  const [hydrate, setHydrate] = useState(false)
  const pathname = getCurrentUrl()
  const {} = useHydrate()
  const userData = useRecoilValue(userAtom)
  const { data: mentorRevenue, refetch: refetchRevenue } = useQuery({
    queryKey: ['mentoring-revenue'],
    queryFn: () => getMyMentorRevenue(!!userData?.mentoringId ? Number(userData?.mentoringId) : 0)
  })

  useEffect(() => {
    setHydrate(true)
  }, [hydrate])

  useEffect(() => {
    setKey(Math.random().toString())
  }, [pathname])
  return (
    <Box display='flex' flexDirection='column' key={key} gap={lgUp ? 6 : 3}>
      <Box display='flex' justifyContent={'flex-start'} flexDirection={'column'} gap={lgUp ? 3 : 2}>
        <PaymentStatistic {...mentorRevenue?.data} />
      </Box>
      <SettlementTable {...mentorRevenue?.data} />
    </Box>
  )
}

export default SettlementDetail
