'use client'
import { Card } from '@/components'
import { FREE_FEATURES, PREMIUM_FEATURES } from '@/constants/payment.constant'
import { DesignedPrimaryButton, ToggleButtonGroup, Typography } from '@/elements'
import { PLAN_PERIOD } from '@/types/payment.type'
import { TProduct } from '@/types/product.type'
import { formatCurrency } from '@/utils/string'
import { Box, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { NonRegisteredSubscriptionContext } from '../../../subscription'
import ThumbupBadge from '../atoms/thumbup-badge'
import SubscriptionFeatures from '../subscription-features'

enum PLAN_TYPE {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM'
}

type TPlanContentProps = {
  price?: number
  pricePerMonth?: number
}

const planContents = ({ price = 0, pricePerMonth = 0 }: TPlanContentProps) => {
  return {
    [PLAN_TYPE.FREE]: {
      planName: 'Starter Plan',
      planDescription: '슘페터의 서비스를 체험해보세요.',
      pricePerMonth: (
        <Typography cate='title_80' breakpoints={{ md: 'title_70' }} plainColor='base_gray.100'>
          무료
        </Typography>
      ),
      priceByYear: '',
      planFeatures: FREE_FEATURES
    },
    [PLAN_TYPE.PREMIUM]: {
      planName: 'Premium Plan',
      planDescription: '성공적인 창업과 사업 운영을 위한 슘페터의 모든 서비스를 제한없이 사용해보세요.',
      pricePerMonth: (
        <Typography cate='title_80' breakpoints={{ md: 'title_70' }} plainColor='base_gray.100'>
          {formatCurrency(price)}{' '}
          <Typography component={'span'} cate='title_50' plainColor='base_gray.100'>
            / 월
          </Typography>
        </Typography>
      ),
      priceByYear: pricePerMonth ? `${formatCurrency(pricePerMonth)} / 연` : '',
      planFeatures: PREMIUM_FEATURES
    }
  }
}

type TPlanFree = {
  type?: PLAN_TYPE.FREE
  planPeriod?: PLAN_PERIOD
}

type TPlanPremium = {
  type: PLAN_TYPE.PREMIUM
  planPeriod: PLAN_PERIOD
}

type TPlan = TPlanFree | TPlanPremium

const Plan = ({ type = PLAN_TYPE.FREE, planPeriod }: TPlan) => {
  const { activePlan } = useContext(NonRegisteredSubscriptionContext)
  const { PREMIUM } = PLAN_TYPE
  const isPremium = [PREMIUM].includes(type)

  const activePlanByPeriod = activePlan.find((i) => i.code === planPeriod) || ({} as TProduct)
  const { price = 0, pricePerMonth = 0, id, code } = activePlanByPeriod
  const isYearlyPlan = code === PLAN_PERIOD.YEAR

  const contentSet = planContents({
    price: !isYearlyPlan ? price : pricePerMonth,
    pricePerMonth: isYearlyPlan ? price : undefined
  })[type]
  return (
    <Box
      sx={{
        width: '100%',
        ...(isPremium && {
          borderRadius: 4,
          p: '2px',
          background: 'linear-gradient(to bottom, #245AE4 0%, #1C3677 92%)'
        })
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: {
            lg: 440,
            xs: '100%'
          },
          minHeight: {
            md: 658,
            xs: 472
          },
          height: '100%',
          background: 'linear-gradient(0deg, #15151D 0%, #23233F 100%)'
        }}
      >
        <Box display={'flex'} gap={'29px'} flexDirection={'column'}>
          <Box height={99}>
            <Box display={'flex'} gap={2} alignItems={'center'}>
              <Typography
                cate='title_60'
                breakpoints={{
                  md: 'title_50'
                }}
                plainColor='base_gray.100'
              >
                {contentSet.planName}
              </Typography>
              {isPremium && <ThumbupBadge />}
            </Box>
            <Typography mt={2} cate='body_30' plainColor='base_gray.200'>
              {contentSet.planDescription}
            </Typography>
          </Box>
          <Box
            height={{
              md: 143,
              xs: 90
            }}
            py={'28px'}
            borderTop={1}
            borderBottom={1}
            borderColor={'base_gray.600'}
          >
            {contentSet.pricePerMonth}
            {contentSet.priceByYear && (
              <Typography mt={1.5} cate='body_40' plainColor='base_gray.200'>
                {contentSet.priceByYear}
              </Typography>
            )}
          </Box>
          <Box>
            <Typography cate='sub_title_30' plainColor='base_gray.100'>
              주요기능
            </Typography>
            <SubscriptionFeatures
              sx={{
                mt: 2.5
              }}
              list={contentSet.planFeatures}
            />
          </Box>
          {isPremium && (
            <Link prefetch href={`payment-management/payment/${id}`}>
              <DesignedPrimaryButton fullWidth btnSize='designed-md'>
                결제하기
              </DesignedPrimaryButton>
            </Link>
          )}
        </Box>
      </Card>
    </Box>
  )
}

const PlanComparison = () => {
  const [planPeriod, setPlanPeriod] = useState(PLAN_PERIOD.YEAR)
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))
  const { activePlan } = useContext(NonRegisteredSubscriptionContext)

  const activePlanByPeriod = activePlan.find((i) => i.code === planPeriod) || ({} as TProduct)
  const { percent = 0, code } = activePlanByPeriod
  const isYearlyPlan = code === PLAN_PERIOD.YEAR

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      mt={{
        md: 6,
        xs: 6
      }}
    >
      <ToggleButtonGroup fullWidth={mdMatches} value={planPeriod} setValue={setPlanPeriod}>
        <Tooltip
          componentsProps={{
            popper: {
              sx: {
                zIndex: 3
              }
            },
            tooltip: {
              sx: {
                bgcolor: 'red.500',
                p: '6.794px 18.116px',
                borderRadius: 9999
              }
            },
            arrow: {
              sx: {
                '&:before': {
                  bgcolor: 'red.500'
                }
              }
            }
          }}
          placement='top'
          open={isYearlyPlan}
          title={
            <Typography cate='sub_title_20' plainColor='base_gray.50'>
              {percent}% Save
            </Typography>
          }
          arrow
        >
          <div>
            <ToggleButtonGroup.ToggleButton value={PLAN_PERIOD.YEAR}>
              <Typography cate='button_30'>연간 플랜</Typography>
            </ToggleButtonGroup.ToggleButton>
          </div>
        </Tooltip>
        <ToggleButtonGroup.ToggleButton value={PLAN_PERIOD.MONTH}>
          <Typography cate='button_30'>월간 플랜</Typography>
        </ToggleButtonGroup.ToggleButton>
      </ToggleButtonGroup>
      <Box
        mt={{
          md: 6,
          xs: 3
        }}
        display={'flex'}
        gap={3}
        flexDirection={{
          md: 'row',
          xs: 'column'
        }}
      >
        <Plan />
        <Plan type={PLAN_TYPE.PREMIUM} {...{ planPeriod }} />
      </Box>
    </Box>
  )
}

export default PlanComparison
