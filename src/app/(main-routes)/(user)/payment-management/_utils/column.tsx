import { TColumn } from '@/components/table'
import { PrimaryButton, Typography } from '@/elements'
import { ActiveChip, Gray700Chip } from '@/elements/v2/chip'
import { PAYMENT_STATUS } from '@/types/payment.type'
import { PRODUCT_TYPE } from '@/types/product.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { formatCurrency } from '@/utils/format-currency'
import { Stack } from '@mui/material'
import moment from 'moment'
import { COUPON_SUBJECT, COUPON_USER_STATUS } from './type'

export const COLUMN_PAYMENT_HISTORY = ({
  openDetail,
  openReceipt
}: {
  openDetail?: (id: number) => void
  openReceipt?: (url: string) => void
}) => {
  return [
    {
      label: '서비스명',
      value: 'type',
      width: 600,
      alignCell: 'left',
      render: (value, row) => {
        const { product } = row

        const renderTypeText = (type: PRODUCT_TYPE) => {
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
        return (
          <Stack justifyContent={'center'} alignItems={'flex-start'} width={'100%'}>
            <Typography cate='body_30'>{renderTypeText(value)}</Typography>
            <Typography cate='title_60'>{product.subName || product.name}</Typography>
          </Stack>
        )
      }
    },
    {
      label: '결제금액',
      value: 'lastTotalAmount',
      render: (value) => {
        return (
          <Typography
            cate='body_40'
            sx={{
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >{`${formatCurrency(value)}원`}</Typography>
        )
      }
    },
    {
      label: '결제일자',
      value: 'createdAt',
      render: (value) => {
        return <Typography cate='body_40'>{`${moment(value).format('YYYY.MM.DD HH:mm')}`}</Typography>
      }
    },
    {
      label: '주문번호',
      value: 'order',
      render: (value) => {
        return <Typography cate='body_40'>{value ? value.code : ''}</Typography>
      }
    },
    {
      label: '상태',
      value: 'status',
      render: (value, row) => {
        switch (value) {
          case PAYMENT_STATUS.WAITING_FOR_DEPOSIT:
            return (
              <Typography
                cate='body_40'
                sx={{
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                입금 대기
              </Typography>
            )
          case PAYMENT_STATUS.DONE:
            if (!row.isWaitingForDeposit && !row.isRequestForRefund) {
              return (
                <Typography
                  cate='body_40'
                  sx={{
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  결제 완료
                </Typography>
              )
            }
            if (row.isWaitingForDeposit && !row.isRequestForRefund) {
              return (
                <Typography
                  cate='body_40'
                  sx={{
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  입금 대기
                </Typography>
              )
            }
            if (row.isRequestForRefund && !row.isWaitingForDeposit) {
              return (
                <Typography
                  cate='body_40'
                  sx={{
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  취소 요청
                </Typography>
              )
            }
          case PAYMENT_STATUS.CANCELED:
            return (
              <Typography cate='body_40' plainColor='sub.error_red'>
                취소
              </Typography>
            )
        }
      }
    },
    {
      label: '',
      value: 'id',
      render: (value, row) => {
        return (
          <Stack gap={1} justifyContent={'center'} alignItems={'center'}>
            <PrimaryButton
              btnSize='xs-np'
              outlined
              onClick={() => {
                openDetail && openDetail(value)
              }}
              sx={{
                minWidth: convertToRem(90),
                borderRadius: '1000px',
                height: convertToRem(33)
              }}
            >
              <Typography cate='button_10'>상세보기</Typography>
            </PrimaryButton>
            <PrimaryButton
              btnSize='xs-np'
              sx={{
                minWidth: convertToRem(90),
                borderRadius: '1000px',
                height: convertToRem(33)
              }}
              onClick={() => {
                openReceipt && openReceipt(row.receipt)
              }}
            >
              <Typography cate='button_10'>영수증 조회</Typography>
            </PrimaryButton>
          </Stack>
        )
      }
    }
  ] as Array<TColumn>
}

export const COLUMN_COUPON_MD: Array<TColumn> = [
  {
    label: '쿠폰명',
    value: 'name',
    width: 400
  },
  {
    label: '이용조건',
    value: 'subject',
    width: 500,
    render: (value) => {
      return (
        <Typography cate='body_20' plainColor='main_grey.gray100'>
          {COUPON_SUBJECT[value as keyof typeof COUPON_SUBJECT]}
        </Typography>
      )
    }
  },
  { label: '사용기간', value: 'timeFormat' },
  {
    label: '상태',
    value: 'statusCouponUser',
    render(value, row) {
      switch (value) {
        case COUPON_USER_STATUS.ACTIVE:
          return (
            <Stack direction={'row'} justifyContent={'center'}>
              <ActiveChip
                chipHeight={25}
                sx={{ borderRadius: convertToRem(4) }}
                label={
                  <Typography cate='body_20' plainColor='main_grey.gray100'>
                    {row.statusCouponUserFormat}
                  </Typography>
                }
              />
            </Stack>
          )
        case COUPON_USER_STATUS.EXPIRED:
          return (
            <Stack direction={'row'} justifyContent={'center'}>
              <Gray700Chip
                chipHeight={25}
                sx={{ borderRadius: convertToRem(4) }}
                label={
                  <Typography cate='body_20' plainColor='main_grey.gray100'>
                    {row.statusCouponUserFormat}
                  </Typography>
                }
              />
            </Stack>
          )
        case COUPON_USER_STATUS.USED:
          return (
            <Stack direction={'row'} justifyContent={'center'}>
              <ActiveChip
                chipHeight={25}
                sx={{
                  borderRadius: convertToRem(4),
                  backgroundColor: 'sub.horizon_blue700',
                  borderColor: 'sub.horizon_blue700'
                }}
                label={
                  <Typography cate='body_20' plainColor='main_grey.gray100'>
                    {row.statusCouponUserFormat}
                  </Typography>
                }
              />
            </Stack>
          )
      }
    }
  }
]

export const COLUMN_COUPON_SM: Array<TColumn> = [
  {
    label: '쿠폰명',
    value: 'type',
    alignCell: 'left'
  },
  {
    label: '상태',
    value: 'statusCouponUser',
    render(value, row) {
      switch (value) {
        case COUPON_USER_STATUS.ACTIVE:
          return (
            <Stack direction={'row'} justifyContent={'center'}>
              <ActiveChip
                chipHeight={25}
                sx={{ borderRadius: convertToRem(4) }}
                label={
                  <Typography
                    cate='body_20'
                    plainColor='main_grey.gray100'
                    sx={{ whiteSpace: 'nowrap', flexStrink: 0 }}
                  >
                    {row.statusCouponUserFormat}
                  </Typography>
                }
              />
            </Stack>
          )
        case COUPON_USER_STATUS.EXPIRED:
          return (
            <Stack direction={'row'} justifyContent={'center'}>
              <Gray700Chip
                chipHeight={25}
                sx={{ borderRadius: convertToRem(4) }}
                label={
                  <Typography
                    cate='body_20'
                    plainColor='main_grey.gray100'
                    sx={{ whiteSpace: 'nowrap', flexStrink: 0 }}
                  >
                    {row.statusCouponUserFormat}
                  </Typography>
                }
              />
            </Stack>
          )
        case COUPON_USER_STATUS.USED:
          return (
            <Stack direction={'row'} justifyContent={'center'}>
              <ActiveChip
                chipHeight={25}
                sx={{
                  borderRadius: convertToRem(4),
                  backgroundColor: 'sub.horizon_blue700',
                  borderColor: 'sub.horizon_blue700'
                }}
                label={
                  <Typography
                    cate='body_20'
                    plainColor='main_grey.gray100'
                    sx={{ whiteSpace: 'nowrap', flexStrink: 0 }}
                  >
                    {row.statusCouponUserFormat}
                  </Typography>
                }
              />
            </Stack>
          )
      }
    }
  }
]
