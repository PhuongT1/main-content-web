'use client'
import { Divider, Typography } from '@/elements'
import { useUserProfile } from '@/hooks/use-user-profile'
import { getActivePlan } from '@/services/product.service'
import { PLAN_PERIOD } from '@/types/payment.type'
import { TProduct } from '@/types/product.type'
import { USER_UPGRADE_PACKAGE } from '@/types/user.type'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'
import PlanComparison from '../_components/subscription/plan-comparison'
import RegisterBanner from '../_components/subscription/register-banner'
import SubscriptionInfo from '../_components/subscription/subscription-info'
import SubscriptionMore from '../_components/subscription/subscription-more'

const PAYMENT_POLICIES = [
  '각 요금제에서 1개월은 30일, 1년은 365일 기준입니다.',
  '상기 요금제는 1인 1계정 기준이며, 복수 계정 가입 시 현재 요금제에서 배액을 적용합니다. ',
  '사용자는 ID와 비밀번호를 타인과 공유하여 사용할 수 없으며, 동일 아이디의 중복 로그인은 지원하지 않습니다. ',
  '요금제 선택은 사용자를 기준으로 하며, 요금은 부가세가 포함된 가격으로 무이자할부는 제공되지 않습니다. ',
  '요금제 기간은 프로젝트 DECK 실습기간이며 기간 이후에는 프로젝트 DECK 접근이 제한됩니다. 단, 프로젝트 DECK 실습을 통한 결과물(실습자료 및 IR DECK)은 영구 사용 가능합니다. '
]

type TNonRegisteredSubscriptionContext = {
  activePlan: TProduct[]
}

export const NonRegisteredSubscriptionContext = createContext<TNonRegisteredSubscriptionContext>(
  {} as TNonRegisteredSubscriptionContext
)

const NonRegisteredSubscription = () => {
  const { data } = useQuery({
    queryKey: [`active-plan`],
    queryFn: getActivePlan,
    staleTime: 0,
    gcTime: 0
  })

  const products = data?.data?.result || []
  const activePlan = products.filter((i) => [PLAN_PERIOD.MONTH, PLAN_PERIOD.YEAR].includes(i.code as PLAN_PERIOD))

  return (
    <NonRegisteredSubscriptionContext.Provider value={{ activePlan }}>
      <RegisterBanner />
      <PlanComparison />
      <Box
        p={3}
        width={'100%'}
        maxWidth={826.77}
        display={'flex'}
        flexDirection={'column'}
        gap={2}
        borderRadius={4}
        border={1}
        borderColor={'base_gray.600'}
        m='auto'
      >
        <Typography cate='sub_title_30' plainColor='base_gray.100'>
          결제 확인사항
        </Typography>
        <Box pl={2} component={'ul'}>
          {PAYMENT_POLICIES.map((i, idx) => (
            <Typography cate='body_30' plainColor='base_gray.200' component={'li'} key={idx}>
              {i}
            </Typography>
          ))}
        </Box>
      </Box>
    </NonRegisteredSubscriptionContext.Provider>
  )
}

const RegisteredSubscription = () => {
  return (
    <>
      <SubscriptionInfo />
      <Divider
        sx={{
          borderColor: 'base_gray.700',
          my: {
            md: 0,
            xs: 2
          }
        }}
      />
      <SubscriptionMore />
    </>
  )
}

const SubscriptionManagement = () => {
  const { user } = useUserProfile()
  const [isRegistered, setRegistered] = useState<boolean>()
  const { upgradePackage } = user || {}

  useEffect(() => {
    const isRegistered = upgradePackage === USER_UPGRADE_PACKAGE.PREMIUM
    setRegistered(isRegistered)
  }, [user])

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={{
        md: 6,
        xs: 3
      }}
    >
      {isRegistered !== undefined && <>{isRegistered ? <RegisteredSubscription /> : <NonRegisteredSubscription />}</>}
    </Box>
  )
}

export default SubscriptionManagement
