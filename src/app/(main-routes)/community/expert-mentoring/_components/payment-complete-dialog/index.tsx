import { DialogTitle } from '@/components'
import { DATE_FORMAT } from '@/constants/common.constant'
import { Divider, Typography } from '@/elements'
import { DesignedPrimaryButton, SecondaryGrayButton } from '@/elements/v2/button'
import { PaymentSuccessResponse } from '@/types/payment.type'
import { getOrderNumber } from '@/utils/pages/order.util'
import { formatCurrency } from '@/utils/string'
import { Box } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/navigation'

const PaymentTableItem = ({ name, value }: { name: string; value: number | string }) => {
  const displayValue = typeof value === 'string' ? value : formatCurrency(value)
  return (
    <Box display={'flex'} justifyContent={'space-between'}>
      <Typography cate='body_30' plainColor='popup.general.body'>
        {name}
      </Typography>
      <Typography cate='body_30' plainColor='popup.general.subtitle'>
        {displayValue}
      </Typography>
    </Box>
  )
}

type PaymentCompleteDialogProps = {
  onClose: () => void
  paymentResponse?: PaymentSuccessResponse
  name?: string
}

const PaymentCompleteDialog = ({ paymentResponse, name }: PaymentCompleteDialogProps) => {
  const router = useRouter()
  const { lastTotalAmount, createdAt = '', orderId = 0, type, payload } = paymentResponse || {}
  const { method = '' } = payload || {}
  const orderNumber = getOrderNumber(createdAt, type!, orderId)

  const onNavigateToPaymentHistory = () => {
    router.push('/mentor?tabValue=4')
  }

  const onNavigateToMentorList = () => {
    router.push('/community/expert-mentoring')
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={5}>
      <DialogTitle>
        <Typography cate='title_70' plainColor='popup.general.title'>
          결제 완료
        </Typography>
      </DialogTitle>
      <Divider sx={{ borderColor: 'popup.general.stroke_divider' }} />
      <Box textAlign={'center'}>
        <Typography cate='sub_title_40' plainColor='popup.general.subtitle'>
          결제가 완료되었습니다.
        </Typography>
        <Typography cate='sub_title_40' plainColor='popup.general.subtitle'>
          아래에서 내용을 확인해보세요.
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'popup.general.stroke_divider' }} />
      <Box display={'flex'} flexDirection={'column'} gap={1}>
        <PaymentTableItem name='결제 금액' value={lastTotalAmount || 0} />
        <PaymentTableItem name='결제 수단' value={method} />
        <PaymentTableItem name='결제 날짜' value={moment(createdAt).format(DATE_FORMAT.DOT_REV)} />
        <PaymentTableItem name='주문 번호' value={orderNumber} />
        <PaymentTableItem name='결제 상품' value={name || ''} />
      </Box>
      <Box mt={3} display={'flex'} justifyContent={'flex-end'}>
        <Box display={'flex'} gap={1}>
          <SecondaryGrayButton
            onClick={onNavigateToMentorList}
            sx={{
              bgcolor: 'popup.button_neutral_bg',
              width: 120
            }}
          >
            <Typography cate='button_30' plainColor='main_grey.gray400'>
              닫기
            </Typography>
          </SecondaryGrayButton>
          <DesignedPrimaryButton onClick={onNavigateToPaymentHistory} sx={{ minWidth: 120 }} btnSize={'designed-sm'}>
            결제내역보기
          </DesignedPrimaryButton>
        </Box>
      </Box>
    </Box>
  )
}

export default PaymentCompleteDialog
