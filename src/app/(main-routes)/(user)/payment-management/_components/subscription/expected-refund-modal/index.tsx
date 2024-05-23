import { Card } from '@/components'
import { DesignedPrimaryButton, SelectStack, Typography } from '@/elements'
import { CANCELLATION_REASONS } from '@/types/payment.type'
import { formatCurrency } from '@/utils/string'
import { Box, Stack } from '@mui/material'
import { useState } from 'react'

const CANCELLATION_REASON_LIST = [
  {
    value: CANCELLATION_REASONS.SERVICE_DISSATISFACTION,
    label: '서비스 불만족'
  },
  {
    value: CANCELLATION_REASONS.CHANGE_MY_MIND,
    label: '구매의사 취소'
  },
  {
    value: CANCELLATION_REASONS.DIFFERENCE_PRODUCT_INFO,
    label: '상품정보 상이'
  },
  {
    value: CANCELLATION_REASONS.OTHER,
    label: '기타'
  }
]

type TExpectedRefundModal = {
  onCloseRefund: () => void
  onCancelPremium: () => void
}

const ExpectedRefundModal = ({ onCloseRefund, onCancelPremium }: TExpectedRefundModal) => {
  const [value, setValue] = useState('')
  return (
    <Box display={'flex '} flexDirection={'column'} gap={5}>
      <Typography cate='title_70' plainColor='base_gray.100'>
        환불 예상 금액
      </Typography>
      <Box>
        <Box borderTop={3} borderBottom={3} borderColor={'base_gray.600'}>
          <Box py={2} display={'flex'} justifyContent={'space-between'}>
            <Typography cate='body_30' plainColor='base_gray.200'>
              프리미엄 요금제 1년 구독권
            </Typography>
            <Typography>{formatCurrency(360000)}</Typography>
          </Box>
          <Box
            border={0}
            borderTop={1}
            sx={{
              borderStyle: 'dotted'
            }}
            borderColor={'base_gray.600'}
            py={2}
            display={'flex'}
            justifyContent={'space-between'}
          >
            <Typography cate='body_30' plainColor='base_gray.200'>
              쿠폰 적용 취소
            </Typography>
            <Typography cate='body_30' plainColor='base_gray.100'>
              {formatCurrency(360000)}
            </Typography>
          </Box>
          <Box
            border={0}
            borderTop={1}
            sx={{
              borderStyle: 'dotted'
            }}
            borderColor={'base_gray.600'}
            py={2}
            display={'flex'}
            justifyContent={'space-between'}
          >
            <Typography cate='body_30' plainColor='base_gray.200'>
              사용한 기간 : 1개월
            </Typography>
            <Typography cate='body_30' plainColor='base_gray.100'>
              {formatCurrency(360000)}
            </Typography>
          </Box>
        </Box>
        <Box py={2} display={'flex'} justifyContent={'space-between'}>
          <Typography cate='body_30' plainColor='base_gray.200'>
            환불 금액(예상)
          </Typography>
          <Typography cate='title_40' plainColor='base_gray.100'>
            {formatCurrency(360000)}
          </Typography>
        </Box>
      </Box>
      <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, bgcolor: 'base_gray.700' }}>
        <Typography cate='title_40' plainColor='base_gray.100'>
          결제정보
        </Typography>
        <Box display={'flex'} flexDirection={'column'} gap={1}>
          {[
            {
              label: '주문 번호',
              value: 20230817000001
            },
            {
              label: '가격',
              value: formatCurrency(50000)
            },
            {
              label: '결제 수단',
              value: '카드결제'
            },
            {
              label: '결제 금액',
              value: formatCurrency(50000)
            }
          ].map(({ value, label }, idx) => (
            <Box key={idx} display={'flex'} gap={1}>
              <Typography cate='sub_title_30' plainColor='base_gray.300' width={80}>
                {label}
              </Typography>
              <Typography cate='body_30' plainColor='base_gray.200'>
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Card>
      <Stack gap={2}>
        <Typography cate='body_40' plainColor='sub.orange10'>
          적용 가능한 할인 쿠폰 2개
        </Typography>
        <SelectStack
          onChange={(e) => setValue(e.target.value as string)}
          value={value}
          placeholder='쿠폰을선택해주세요'
          list={CANCELLATION_REASON_LIST}
        />
      </Stack>
      <Box p={3} borderRadius={2} border={1} borderColor='base_gray.600'>
        <Typography cate='body_20' plainColor='base_gray.300'>
          사용자가 구매한 프리미엄 구독권은 디지털 콘텐츠 특성상 결제취소 되지 않습니다. 따라서, 구매 당시 월 이용
          금액을 기준으로 사용일을 측정하여 차감하고 있습니다.
        </Typography>
        <Typography cate='body_20' plainColor='base_gray.300'>
          연간 이용권의 경우 월간 이용권 금액보다 저렴한 가격으로 판매되고 있기 때문에 환불 금액이 {"‘0원'"}인 경우도
          있으니 신중하게 선택해 주세요.
        </Typography>
      </Box>
      <Box display={'flex'} gap={1} justifyContent={'flex-end'}>
        <DesignedPrimaryButton
          onClick={onCloseRefund}
          sx={{
            height: 44,
            width: 120,
            bgcolor: 'base_gray.700',
            '&:hover': {
              bgcolor: 'base_gray.700'
            }
          }}
        >
          <Typography cate='button_30' plainColor='base_gray.300'>
            해지
          </Typography>
        </DesignedPrimaryButton>
        <DesignedPrimaryButton
          onClick={onCancelPremium}
          sx={{
            height: 44,
            width: 120
          }}
        >
          해지취소
        </DesignedPrimaryButton>
      </Box>
    </Box>
  )
}

export default ExpectedRefundModal
