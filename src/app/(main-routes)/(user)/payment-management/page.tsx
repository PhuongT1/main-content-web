'use client'
import { FillTabItem, FilledTabStack } from '@/components/tabs'
import { Typography } from '@/elements'
import { useUserProfile } from '@/hooks/use-user-profile'
import { PAYMENT_TAB } from '@/types/payment.type'
import { Box, Stack, useMediaQuery } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SyntheticEvent, useEffect, useState } from 'react'
import CouponManagement from './coupon'
import PaymentHistory from './history'
import SubscriptionManagement from './subscription'

const getIncludesTab = (value: PAYMENT_TAB) => {
  return Object.values(PAYMENT_TAB).includes(value) ? value : undefined
}

const DATA_TAB = [
  {
    label: '구독관리',
    value: PAYMENT_TAB.SUBCRIPTION
  },
  {
    label: '결제내역',
    value: PAYMENT_TAB.HISTORY
  },
  {
    label: '쿠폰',
    value: PAYMENT_TAB.COUPON
  }
]

const PaymentManagementPage = () => {
  const { user } = useUserProfile()
  const [tab, setTab] = useState(PAYMENT_TAB.SUBCRIPTION)
  const router = useRouter()
  const queryData = useSearchParams()
  const pathName = usePathname()
  const isMobile = useMediaQuery('(max-width: 600px)')

  const onTabChange = (_e: SyntheticEvent<Element, Event>, value: PAYMENT_TAB) => {
    setTab(value)
  }

  useEffect(() => {
    const tabValue = queryData.get('type') as PAYMENT_TAB
    setTab(getIncludesTab(tabValue) || PAYMENT_TAB.SUBCRIPTION)
  }, [queryData])

  useEffect(() => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    newQuery.delete('listType')
    newQuery.delete('page')
    tab ? newQuery.set('type', tab) : newQuery.delete('type')
    router.push(`${pathName}?${newQuery}`)
  }, [tab])

  return (
    <Stack gap={{ md: 6, sm: 2 }}>
      <Typography cate={isMobile ? 'title_60' : 'title_80'} plainColor='base.gray100'>
        결제 관리
      </Typography>
      <Box
        mt={{
          md: 0,
          xs: 1
        }}
      >
        <FilledTabStack value={tab} onChange={onTabChange} variant='scrollable'>
          {DATA_TAB?.map((item: any) => (
            <FillTabItem key={item.value} value={item.value} label={item.label} />
          ))}
        </FilledTabStack>
      </Box>
      {tab === PAYMENT_TAB.SUBCRIPTION && <SubscriptionManagement />}
      {tab === PAYMENT_TAB.HISTORY && <PaymentHistory />}
      {tab === PAYMENT_TAB.COUPON && <CouponManagement />}
    </Stack>
  )
}

export default PaymentManagementPage
