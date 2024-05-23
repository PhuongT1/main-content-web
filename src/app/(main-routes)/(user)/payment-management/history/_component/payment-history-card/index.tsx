import CardBox from '@/components/cards/card-box'
import { PrimaryButton, Typography } from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { PAYMENT_STATUS, PaymentHistory } from '@/types/payment.type'
import { PRODUCT_TYPE } from '@/types/product.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { formatCurrency } from '@/utils/format-currency'
import { Stack } from '@mui/material'
import moment from 'moment'
import PaymentReceiptDialog from '../payment-receipt-dialog'

type HistoryCardProps = {
  data: PaymentHistory
  onDetail: () => void
}

const PaymentHistoryCard = ({ data, onDetail }: HistoryCardProps) => {
  const { open: openReceipt, onOpen: onOpenReceipt, onClose: onCloseReceipt } = useDialog()

  const renderTypeText = (type: string) => {
    switch (type) {
      case PRODUCT_TYPE.CERTIFICATION:
        return '자격증'
      case PRODUCT_TYPE.USER_PREMIUM:
        return '이용권'
      case PRODUCT_TYPE.EVENT:
        return '교육행사'
      case PRODUCT_TYPE.MENTORING:
        return '멘토링'
      case PRODUCT_TYPE.STRENGTH_ANALYSIS_SUBSCRIPTION:
        return '프리미엄 이용권강점 분석'
    }
  }

  const renderStatusText = (data: PaymentHistory) => {
    switch (data.status) {
      case PAYMENT_STATUS.WAITING_FOR_DEPOSIT:
        return <Typography cate='body_30'>입금 대기</Typography>
      case PAYMENT_STATUS.DONE:
        if (!data.isWaitingForDeposit && !data.isRequestForRefund) {
          return <Typography cate='body_30'>결제 완료</Typography>
        }
        if (data.isWaitingForDeposit && !data.isRequestForRefund) {
          return <Typography cate='body_30'>입금 대기</Typography>
        }
        if (data.isRequestForRefund && !data.isWaitingForDeposit) {
          return <Typography cate='body_30'>취소 요청</Typography>
        }
      case PAYMENT_STATUS.CANCELED:
        return (
          <Typography cate='body_30' plainColor='sub.error_red'>
            취소
          </Typography>
        )
    }
  }

  return (
    <CardBox display={'flex'} gap={2}>
      <Typography cate='body_30' plainColor='main_grey.gray300'>
        {renderTypeText(data.type)}
      </Typography>
      <Typography cate='sub_title_40'>{data.product.subName || data.product.name}</Typography>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography cate='body_30' plainColor='main_grey.gray100'>
          결제금액
        </Typography>
        <Typography cate='body_30' plainColor='main_grey.gray100'>
          {data.order ? formatCurrency(data.order.price) : 0}원
        </Typography>
      </Stack>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography cate='body_30' plainColor='main_grey.gray100'>
          교육행사
        </Typography>
        <Typography cate='body_30' plainColor='main_grey.gray100'>
          {moment(data.createdAt).format('YYYY.MM.DD hh:mm')}
        </Typography>
      </Stack>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography cate='body_30' plainColor='main_grey.gray100'>
          교육행사
        </Typography>
        <Typography cate='body_30' plainColor='main_grey.gray100'>
          {renderStatusText(data)}
        </Typography>
      </Stack>
      <Stack direction={'row'} gap={1} justifyContent={'flex-end'} alignItems={'center'}>
        <PrimaryButton
          btnSize='xs-np'
          outlined
          onClick={onDetail}
          sx={{
            paddingX: convertToRem(16),
            borderRadius: '1000px',
            height: convertToRem(33)
          }}
        >
          <Typography cate='body_20' plainColor='main_grey.gray100'>
            상세보기
          </Typography>
        </PrimaryButton>
        <PrimaryButton
          btnSize='xs-np'
          sx={{
            paddingX: convertToRem(16),
            borderRadius: '1000px',
            height: convertToRem(33)
          }}
          onClick={() => {
            onOpenReceipt()
          }}
        >
          <Typography cate='body_20' plainColor='main_grey.gray100'>
            영수증조회
          </Typography>
        </PrimaryButton>
      </Stack>
      {data && (
        <PaymentReceiptDialog
          open={openReceipt}
          receiptUrl={data.receipt}
          onSubmit={() => {
            onCloseReceipt()
          }}
          onCancel={() => {
            onCloseReceipt()
          }}
        />
      )}
    </CardBox>
  )
}

export default PaymentHistoryCard
