import { Card } from '@/components'
import { DesignedPrimaryButton, Typography } from '@/elements'
import { getActivePlan } from '@/services/product.service'
import { PLAN_PERIOD } from '@/types/payment.type'
import { TProduct } from '@/types/product.type'
import { formatCurrency } from '@/utils/string'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import ThumbupBadge from '../atoms/thumbup-badge'

const Plan = ({ plan }: { plan?: TProduct }) => {
  const { id, code, price = 0, pricePerMonth = 0, name } = plan || {}
  const isYearly = code === PLAN_PERIOD.YEAR
  return (
    <Card
      sx={{
        p: 4.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 3.5,
        width: '100%'
      }}
    >
      <Box>
        <Box display={'flex'} gap={2}>
          <Typography cate='title_60' breakpoints={{ md: 'title_50' }} plainColor='base_gray.100'>
            Premium Plan
          </Typography>
          {isYearly && <ThumbupBadge />}
        </Box>
        <Typography mt={2} cate='sub_title_30' plainColor='base_gray.100'>
          {name}
        </Typography>
        <Box mt={1}>
          <Typography cate='body_30' plainColor='base_gray.200'>
            성공적인 창업과 사업 운영을 위한 슘페터의 모든 서비스를 제한없이 사용해보세요.
          </Typography>
        </Box>
      </Box>
      <Box
        minHeight={{
          md: 143,
          xs: 121
        }}
        borderTop={1}
        borderBottom={1}
        borderColor={'base_gray.600'}
        py={3.5}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        gap={1.5}
      >
        <Typography cate='title_80' breakpoints={{ md: 'title_70' }} plainColor='base_gray.100'>
          {formatCurrency(isYearly ? pricePerMonth : price)}{' '}
          <Typography
            component={'span'}
            cate='title_50'
            breakpoints={{ md: 'sub_title_30' }}
            plainColor='base_gray.100'
          >
            / 월
          </Typography>
        </Typography>
        {isYearly && (
          <Typography cate='body_40' plainColor='base_gray.200'>
            {formatCurrency(price)} / 연
          </Typography>
        )}
      </Box>
      <Link prefetch href={`/payment-management/payment/${id}`}>
        <DesignedPrimaryButton fullWidth btnSize='designed-md'>
          결제하기
        </DesignedPrimaryButton>
      </Link>
    </Card>
  )
}

const SubscriptionMore = () => {
  const { data: activePlans } = useQuery({
    queryKey: [`active-plan`],
    queryFn: getActivePlan,
    staleTime: 0,
    gcTime: 0
  })

  const products = activePlans?.data?.result || []
  const monthPlan = products.find((i) => i.code === PLAN_PERIOD.MONTH)
  const yearPlan = products.find((i) => i.code === PLAN_PERIOD.YEAR)

  return (
    <>
      <Typography
        cate='title_70'
        breakpoints={{
          md: 'title_50'
        }}
        plainColor='base_gray.50'
      >
        기간 연장이 필요하신가요?
      </Typography>
      <Box
        display={'flex'}
        flexDirection={{
          md: 'row',
          xs: 'column'
        }}
        gap={{
          md: 6,
          xs: 3
        }}
      >
        <Plan plan={yearPlan} />
        <Plan plan={monthPlan} />
      </Box>
    </>
  )
}

export default SubscriptionMore
