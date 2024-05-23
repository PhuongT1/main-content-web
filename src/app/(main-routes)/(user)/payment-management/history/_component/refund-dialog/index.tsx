import CardBox from '@/components/cards/card-box'
import { GrayButton, PrimaryButton, Select } from '@/elements'
import Typography from '@/elements/typography'
import MenuItem from '@/elements/v2/menu-item'
import { requestRefund } from '@/services/payment/payment.service'
import { PAYMENT_METHOD, PaymentHistory } from '@/types/payment.type'
import { PRODUCT_TYPE } from '@/types/product.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { formatCurrency } from '@/utils/format-currency'
import {
  Dialog,
  DialogContent,
  DialogProps,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  tableCellClasses,
  tableRowClasses,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import moment from 'moment'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { CancelPaymentReasonType } from '../../../_utils/type'
import RefundGuidance from '../refund-guidance'

type CustomDialogProps = DialogProps & {
  detail: PaymentHistory
  onCancel?: () => void
} & (
    | {
        onSubmit?: () => void
      }
    | {
        onCancel?: () => void
      }
  )

export default function RefundDialog({ detail, onCancel, ...props }: CustomDialogProps) {
  const theme = useTheme()
  const mdDown = useMediaQuery('(max-width: 768px)')
  const [selectedValue, setSelectedValue] = useState<string>('')

  const refundMutation = useMutation({
    mutationFn: async (body: { cancelReason: string; paymentKey: string }) => {
      const { data, error } = await requestRefund(body)

      if (error) throw error

      return data
    },
    onSuccess: () => {
      enqueueSnackbar('취소 요청이 접수되었습니다.', { variant: 'success' })
      onCancel?.()
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  })

  const handleChangeCate = (event: any) => {
    setSelectedValue(event.target.value)
  }

  const handleClose = (event: React.MouseEvent<HTMLElement>, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && props.disableEscapeKeyDown) {
      event.preventDefault()
      return
    }
    onCancel?.()
  }

  const calculateEstimateRefundAmount = (refundAmount: number, lastTotalAmount: number) => {
    const percentRefund = Math.round((refundAmount / lastTotalAmount) * 100)

    if (percentRefund >= 50 && percentRefund < 70) {
      return '교육행사 진행일 차감 (50%)'
    }
    if (percentRefund >= 70 && percentRefund < 99) {
      return '교육행사 진행일 차감 (70%)'
    }
    if (percentRefund >= 99) {
      return '교육행사 진행일 차감 (100%)'
    }

    return '교육행사 진행일 차감 (0%)'
  }

  return (
    <Dialog
      onClose={handleClose}
      {...props}
      sx={{
        '& .MuiPaper-root': {
          display: 'flex',
          justifyContent: 'center',
          margin: 'auto 16px',
          backgroundImage: 'none',
          maxWidth: convertToRem(560),
          width: '100%'
        }
      }}
    >
      <DialogContent
        sx={{
          backgroundColor: theme.palette.main_grey.gray800,
          paddingY: convertToRem(32),
          paddingX: { md: convertToRem(32), sm: convertToRem(20) },
          width: '100%'
        }}
      >
        <Stack gap={{ md: 5, sm: 3 }}>
          <Typography cate='title_70' color={theme.palette.main_grey.gray100}>
            환불 예상 금액
          </Typography>
          <Stack gap={3}>
            <Stack gap={2}>
              <Divider
                orientation='horizontal'
                sx={{
                  borderWidth: '2px'
                }}
              />
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography cate='body_30' plainColor='main_grey.gray200'>
                  {detail.product && (detail.product.name || detail.product.subName)}
                </Typography>
                <Typography cate='body_30' plainColor='main_grey.gray100'>
                  {detail.order ? formatCurrency(detail.order.price) : 0}원
                </Typography>
              </Stack>
              <Divider
                orientation='horizontal'
                sx={{
                  borderStyle: 'dashed'
                }}
              />
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography cate='body_30' plainColor='main_grey.gray200'>
                  쿠폰 적용 취소
                </Typography>
                <Typography cate='body_30' plainColor='main_grey.gray100'>
                  -
                  {detail.order && detail.order.totalAmountDiscount > 0
                    ? formatCurrency(detail.order.totalAmountDiscount)
                    : 0}
                  원
                </Typography>
              </Stack>
              <Divider
                orientation='horizontal'
                sx={{
                  borderStyle: 'dashed'
                }}
              />
              {detail.type === PRODUCT_TYPE.EVENT
                ? detail.estimatedNonRefundAmount !== null && (
                    <>
                      <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography cate='body_30' plainColor='main_grey.gray200'>
                          {calculateEstimateRefundAmount(detail.estimatedNonRefundAmount, detail.lastTotalAmount)}
                        </Typography>
                        <Typography cate='body_30' plainColor='main_grey.gray100'>
                          -{detail.estimatedNonRefundAmount > 0 ? formatCurrency(detail.estimatedNonRefundAmount) : 0}원
                        </Typography>
                      </Stack>
                      <Divider
                        orientation='horizontal'
                        sx={{
                          borderWidth: '2px'
                        }}
                      />
                    </>
                  )
                : null}
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography cate='body_30' plainColor='main_grey.gray200'>
                  환불 금액(예상)
                </Typography>
                <Typography cate='title_40' plainColor='main_grey.gray100'>
                  {formatCurrency(detail.cancelAmount) || 0} 원
                </Typography>
              </Stack>
            </Stack>
            <CardBox flexDirection={'column'} gap={2} sx={{ padding: convertToRem(16) }}>
              <Typography cate='title_40' plainColor='main_grey.gray100'>
                결제정보
              </Typography>
              <Table
                sx={{
                  [`& .${tableRowClasses.root}`]: {
                    height: convertToRem(30)
                  },
                  [`& .${tableCellClasses.root}`]: {
                    borderBottom: 'none',
                    padding: 0,
                    color: theme.palette.main_grey.gray300
                  }
                }}
              >
                <TableBody>
                  <TableRow>
                    <TableCell width={90}>
                      <Typography cate='sub_title_30' plainColor='main_grey.gray300'>
                        주문 번호
                      </Typography>
                    </TableCell>
                    <TableCell>{detail.order ? detail.order.code : ''}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography cate='sub_title_30' plainColor='main_grey.gray300'>
                        가격
                      </Typography>
                    </TableCell>
                    <TableCell>{formatCurrency(detail.order ? detail.order.price : 0)}원</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography cate='sub_title_30' plainColor='main_grey.gray300'>
                        결제 수단
                      </Typography>
                    </TableCell>
                    <TableCell>{PAYMENT_METHOD[detail.payload.method as keyof typeof PAYMENT_METHOD]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography cate='sub_title_30' plainColor='main_grey.gray300'>
                        결제 일시
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {detail.order ? moment(detail.order.createdAt).format('YYYY.MM.DD hh:mm') : ''}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography cate='sub_title_30' plainColor='main_grey.gray300'>
                        결제 금액
                      </Typography>
                    </TableCell>
                    <TableCell>{formatCurrency(detail.order ? detail.order.lastTotalAmount : 0)}원</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardBox>
            <Stack gap={1}>
              <Typography cate='sub_title_40' plainColor='main_grey.gray100'>
                결제 취소
              </Typography>
              <Select
                placeholder='취소 사유를 선택해주세요. (선택)'
                fullWidth
                displayEmpty
                value={selectedValue}
                sx={{ minWidth: convertToRem(140) }}
                renderValue={(value) => {
                  if (value === '') {
                    return (
                      <Typography cate='body_3' color={theme.palette.main_grey.gray300}>
                        취소 사유를 선택해주세요.
                      </Typography>
                    )
                  }
                  return (
                    <Typography cate='body_3' color={theme.palette.main_grey.gray100} ml={1}>
                      {CancelPaymentReasonType.find((item) => item.value === selectedValue)?.label}
                    </Typography>
                  )
                }}
                onChange={(event) => handleChangeCate(event)}
              >
                {CancelPaymentReasonType.map((item, index) => (
                  <MenuItem value={item.value} key={item.label + index}>
                    <Typography cate='body_3' color={theme.palette.main_grey.gray100} ml={1}>
                      {item.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Stack>
          {!mdDown ? <RefundGuidance /> : null}
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={{ md: 'flex-end', sm: 'center' }}
            width={'100%'}
            gap={1}
          >
            <GrayButton
              fullWidth={mdDown}
              btnSize='xs-np'
              sx={{
                width: convertToRem(120),
                height: convertToRem(44),
                bgcolor: 'main_grey.gray700'
              }}
              onClick={() => {
                onCancel?.()
              }}
            >
              <Typography cate='button_30' plainColor='main_grey.gray300'>
                취소
              </Typography>
            </GrayButton>
            <PrimaryButton
              fullWidth={mdDown}
              btnSize='xs-np'
              sx={{
                width: convertToRem(120),
                height: convertToRem(44)
              }}
              onClick={() => {
                refundMutation.mutate({ cancelReason: selectedValue, paymentKey: detail.TPG_paymentKey })
              }}
            >
              <Typography cate='body_3_semibold'>환불 요청</Typography>
            </PrimaryButton>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
