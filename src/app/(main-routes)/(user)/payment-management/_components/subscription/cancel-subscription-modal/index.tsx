'use client'
import { PrimaryCheckbox, Typography } from '@/elements'
import { DesignedPrimaryButton } from '@/elements/v2/button'
import { Box } from '@mui/material'
import { useState } from 'react'

const CANCEL_POLICIES = [
  '1년 결제 사용자인 경우 월간 사용 기간의 마지막 날인 2023년 7월 20일까지 프리미엄 회원으로 슘페터의 모든 서비스를 사용하실 수 있습니다.',
  '기간이 종료되면 스타터 플랜(무료)으로 전환됩니다. ',
  '기간 종료 후 남은 개월 수에 대한 이용료가 환불됩니다. 이때, 사용한 기간에 대해서는 월간플랜 정상가격으로 책정되어 사용처리 후 잔여금액이 환불됩니다. 또한, 사용한 쿠폰이 있을 경우 사용 금액만큼 차감됩니다. 경우에 따라 환불금액이 없을 수도 있습니다. ',
  '언제든지 다시 돌아오셔서 슘페터를 활용해보세요. 해지 후 1년 이내에 다시 시작하시면 회원님의 프로젝트 실습 결과물을 다시 이용할 수 있습니다. 단, 구독해지 후 1년 후에는 프로젝트 실습 결과물이 모두 삭제됩니다. '
]

type TCancelSubscriptionModalProps = { onAgreeCancel: () => void; onCloseCancel: () => void }

const CancelSubscriptionModal = ({ onAgreeCancel, onCloseCancel }: TCancelSubscriptionModalProps) => {
  const [agree, setAgree] = useState(false)

  return (
    <Box display={'flex'} flexDirection={'column'} gap={5}>
      <Typography cate='title_60' plainColor='base_gray.100'>
        구독 해지를 원하시나요?
      </Typography>
      <Box display={'flex'} flexDirection={'column'} gap={3}>
        <Typography cate='body_20' plainColor='base_gray.300'>
          슘페터를 이용해 주셔서 감사합니다.
        </Typography>
        <Box component={'ul'} pl={2}>
          {CANCEL_POLICIES.map((i, idx) => (
            <Typography cate='body_20' plainColor='base_gray.300' component={'li'} key={idx}>
              {i}
            </Typography>
          ))}
        </Box>
        <Box display={'flex'} gap={1.5}>
          <PrimaryCheckbox
            value={agree}
            onChange={(e) => setAgree(e.target.checked)}
            sx={{ p: 0, pt: 0.4 }}
            containerSx={{ alignItems: 'flex-start' }}
          />
          <Typography cate='body_40' plainColor='base_gray.100'>
            위 내용을 확인했으며, 구독을 해지합니다.
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} gap={1} justifyContent={'flex-end'}>
        <DesignedPrimaryButton
          onClick={onCloseCancel}
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
          disabled={!agree}
          onClick={onAgreeCancel}
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

export default CancelSubscriptionModal
