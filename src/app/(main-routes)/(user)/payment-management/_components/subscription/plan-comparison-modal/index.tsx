import { Card } from '@/components'
import { PREMIUM_FEATURES } from '@/constants/payment.constant'
import { DesignedPrimaryButton, ToggleButtonGroup, Typography } from '@/elements'
import { PLAN_PERIOD } from '@/types/payment.type'
import { TProduct } from '@/types/product.type'
import { formatCurrency } from '@/utils/string'
import { Box, SxProps, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { NonRegisteredSubscriptionContext } from '../../../subscription'
import SubscriptionFeatures from '../subscription-features'

const Plan = ({
  plan,
  cardSx,
  planPeriod,
  setPlanPeriod
}: {
  plan: TProduct
  cardSx?: SxProps
  planPeriod: PLAN_PERIOD
  setPlanPeriod: Dispatch<SetStateAction<PLAN_PERIOD>>
}) => {
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))
  const { percent = 0, price = 0, code, pricePerMonth = 0, id } = plan
  const isYearlyPlan = code === PLAN_PERIOD.YEAR
  return (
    <Card
      sx={{
        p: 4,
        borderRadius: 3,
        bgcolor: 'base_gray.800',
        display: 'flex',
        flexDirection: 'column',
        gap: {
          md: 5,
          xs: 3
        },
        ...cardSx
      }}
    >
      <Box>
        <Typography cate='title_70' breakpoints={{ md: 'title_60' }} plainColor='base_gray.100'>
          프리미엄 플랜 결제하기
        </Typography>
        <Typography cate='body_30' breakpoints={{ md: 'body_20' }} plainColor='base_gray.200' mt={1}>
          성공적인 창업과 사업 운영을 위한 슘페터의 모든 서비스를 제한없이 사용해보세요.
        </Typography>
      </Box>
      <Box>
        <Box display={'flex'} justifyContent={'center'}>
          <ToggleButtonGroup setValue={setPlanPeriod} value={planPeriod}>
            <ToggleButtonGroup.ToggleButton value={PLAN_PERIOD.YEAR}>
              <Typography cate='button_30' breakpoints={{ md: 'button_20' }}>
                연간 플랜
              </Typography>
            </ToggleButtonGroup.ToggleButton>
            <ToggleButtonGroup.ToggleButton value={PLAN_PERIOD.MONTH}>
              <Typography cate='button_30' breakpoints={{ md: 'button_20' }}>
                월간 플랜
              </Typography>
            </ToggleButtonGroup.ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box
          borderTop={1}
          borderBottom={1}
          borderColor='base_gray.600'
          height={{
            md: 190,
            xs: 'auto'
          }}
          py={{
            md: 6,
            xs: 4
          }}
          my={3}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection={'column'}
          gap={1}
        >
          {isYearlyPlan && (
            <Box height={30} px={2.25} py={0.75} bgcolor='red.500' borderRadius={99}>
              <Typography cate='sub_title_20' plainColor='base_gray.50'>
                {percent}% Save
              </Typography>
            </Box>
          )}
          <Typography cate='title_80' breakpoints={{ md: 'title_70' }} plainColor='base_gray.100'>
            {formatCurrency(!isYearlyPlan ? price : pricePerMonth)}
            <Typography component={'span'} cate='title_50' plainColor='base_gray.100'>
              {' '}
              / 월
            </Typography>
          </Typography>
          {isYearlyPlan && (
            <Typography cate='body_40' plainColor='base_gray.200'>
              {formatCurrency(price)} / 연
            </Typography>
          )}
          <Box></Box>
        </Box>
        <Box>
          <Typography cate='sub_title_30' plainColor='base_gray.100'>
            주요기능
          </Typography>
          <Box mt={2.5} display={'flex'} flexDirection={'column'} gap={1}>
            <SubscriptionFeatures list={PREMIUM_FEATURES} />
          </Box>
        </Box>
      </Box>
      <Link prefetch href={`payment-management/payment/${id}`}>
        <DesignedPrimaryButton fullWidth btnSize='designed-md'>
          결제하러 가기
        </DesignedPrimaryButton>
      </Link>
    </Card>
  )
}

const PlanComparisonModal = () => {
  const { activePlan } = useContext(NonRegisteredSubscriptionContext)
  const [planPeriod, setPlanPeriod] = useState(PLAN_PERIOD.YEAR)
  const yearPlan = activePlan.find((i) => i.code === PLAN_PERIOD.YEAR) || ({} as TProduct)
  const monthPlan = activePlan.find((i) => i.code === PLAN_PERIOD.MONTH) || ({} as TProduct)
  return (
    <Box display={'flex'} gap={5}>
      <Plan
        cardSx={{
          display: planPeriod === PLAN_PERIOD.MONTH ? 'flex' : 'none'
        }}
        plan={monthPlan}
        {...{ setPlanPeriod, planPeriod }}
      />
      <Plan
        cardSx={{
          display: planPeriod === PLAN_PERIOD.YEAR ? 'flex' : 'none'
        }}
        plan={yearPlan}
        {...{ setPlanPeriod, planPeriod }}
      />
    </Box>
  )
}

export default PlanComparisonModal
