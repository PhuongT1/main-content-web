import CardBox from '@/components/cards/card-box'
import { GrayButton, PrimaryButton } from '@/elements'
import Typography from '@/elements/typography'
import { ActiveChip } from '@/elements/v2/chip'
import { PAYMENT_METHOD, PAYMENT_STATUS, PaymentHistory } from '@/types/payment.type'
import { PRODUCT_TYPE } from '@/types/product.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { formatCurrency } from '@/utils/format-currency'
import {
  Dialog,
  DialogContent,
  DialogProps,
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
import moment from 'moment'

type CustomDialogProps = DialogProps & {
  detail: PaymentHistory
  onCancel?: () => void
  onCSubmit?: () => void
}

export default function PaymentDetailDialog({ detail, onCancel, onCSubmit, ...props }: CustomDialogProps) {
  const theme = useTheme()
  const mdDown = useMediaQuery('(max-width: 768px)')

  const handleClose = (event: React.MouseEvent<HTMLElement>, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && props.disableEscapeKeyDown) {
      event.preventDefault()
      return
    }
    onCancel?.()
  }

  const renderStatusText = (statusRefund: string) => {
    switch (statusRefund) {
      case 'IN_PROGRESS':
        return '취소 요청'
      case 'REJECT':
      case 'DONE':
        return '취소완료'
    }
  }

  const renderStatusChip = (status: string, statusRefund: string, isRequestForRefund: boolean) => {
    switch (status) {
      case PAYMENT_STATUS.DONE:
        if (!isRequestForRefund) {
          return (
            <ActiveChip
              label={<Typography cate='button_10'>결제완료</Typography>}
              chipHeight={33}
              sx={{
                paddingX: convertToRem(16)
              }}
            />
          )
        } else {
          if (statusRefund === 'IN_PROGRESS') {
            return (
              <ActiveChip
                label={<Typography cate='button_10'>취소 요청</Typography>}
                chipHeight={33}
                sx={{
                  paddingX: convertToRem(16),
                  backgroundColor: 'sub.red500',
                  borderColor: 'sub.red500'
                }}
              />
            )
          }
          if (statusRefund === 'REJECT') {
            return (
              <ActiveChip
                label={<Typography cate='button_10'>취소 거절</Typography>}
                chipHeight={33}
                sx={{
                  paddingX: convertToRem(16),
                  backgroundColor: 'main_grey.gray600',
                  borderColor: 'main_grey.gray600'
                }}
              />
            )
          }
        }

      case PAYMENT_STATUS.CANCELED:
      case PAYMENT_STATUS.PARTIAL_CANCELED:
        return (
          <ActiveChip
            label={<Typography cate='button_10'>취소 완료</Typography>}
            chipHeight={33}
            sx={{
              paddingX: convertToRem(16),
              backgroundColor: 'sub.teal600',
              borderColor: 'sub.teal600'
            }}
          />
        )
      case PAYMENT_STATUS.WAITING_FOR_DEPOSIT:
        return (
          <ActiveChip
            label={<Typography cate='button_10'>입금대기</Typography>}
            chipHeight={33}
            sx={{
              paddingX: convertToRem(16)
            }}
          />
        )
      case PAYMENT_STATUS.REQUEST_CANCELED:
        return (
          <ActiveChip
            label={<Typography cate='button_10'>{status}</Typography>}
            chipHeight={33}
            sx={{
              paddingX: convertToRem(16)
            }}
          />
        )
    }
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
          <Stack direction={'row'} gap={{ md: 2, sm: 1 }} alignItems={'center'}>
            <Typography cate='title_70' breakpoints={{ md: 'title_60' }} color={theme.palette.main_grey.gray100}>
              {moment(detail.createdAt).format('YYYY.MM.DD HH:mm')}
            </Typography>
            {renderStatusChip(detail.status, detail.statusRefund, detail.isRequestForRefund)}
          </Stack>
          <Stack gap={2}>
            <CardBox flexDirection={'column'} gap={2}>
              <Typography cate='sub_title_20' plainColor='sub.teal400'>
                {detail.type === PRODUCT_TYPE.EVENT && '교육행사'}
                {detail.type === PRODUCT_TYPE.MENTORING && '멘토링'}
                {detail.type === PRODUCT_TYPE.USER_PREMIUM && '이용권'}
                {detail.type === PRODUCT_TYPE.CERTIFICATION && '자격시험'}
                {detail.type === PRODUCT_TYPE.STRENGTH_ANALYSIS_SUBSCRIPTION && '강점 분석'}
              </Typography>
              <Typography
                cate='title_50'
                plainColor='main_grey.gray100'
                sx={{
                  marginTop: convertToRem(-8)
                }}
              >
                {detail.product && (detail.product.name || detail.product.subName)}
              </Typography>
              <Typography cate='body_20' plainColor='main_grey.gray200'>
                {moment(detail.createdAt).format('YYYY.MM.DD')}
              </Typography>
            </CardBox>
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
                    <TableCell width={90}>주문 번호</TableCell>
                    <TableCell>{detail.order ? detail.order.code : ''}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>가격</TableCell>
                    <TableCell>{formatCurrency(detail.price)}원</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>결제 수단</TableCell>
                    <TableCell>{PAYMENT_METHOD[detail.payload.method as keyof typeof PAYMENT_METHOD]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>결제 금액</TableCell>
                    <TableCell>{detail.order ? formatCurrency(detail.order.lastTotalAmount) : 0}원</TableCell>
                  </TableRow>
                  {detail.payload.method === PAYMENT_METHOD.VIRTUAL_ACCOUNT && (
                    <TableRow>
                      <TableCell>입금계좌</TableCell>
                      {detail.payload && detail.payload.virtualAccount && (
                        <TableCell>{`${detail.payload.virtualAccount.bankCode} ${detail.payload.virtualAccount.accountNumber} ${detail.payload.virtualAccount.customerName}`}</TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardBox>
            {detail.status === PAYMENT_STATUS.DONE && detail.isRequestForRefund && (
              <>
                {detail.statusRefund === 'IN_PROGRESS' && (
                  <CardBox flexDirection={'column'} gap={2} sx={{ padding: convertToRem(16) }}>
                    <Typography cate='sub_title_20' plainColor='main_grey.gray100'>
                      취소정보
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
                          <TableCell width={90}>환불 금액</TableCell>
                          <TableCell>{detail.cancelAmount ? formatCurrency(detail.cancelAmount) : 0}원</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>상태</TableCell>
                          <TableCell>{renderStatusText(detail.statusRefund)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardBox>
                )}
                {detail.statusRefund === 'REJECT' && (
                  <>
                    <CardBox flexDirection={'column'} gap={2} sx={{ padding: convertToRem(16) }}>
                      <Typography cate='sub_title_20' plainColor='main_grey.gray100'>
                        취소정보
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
                            <TableCell width={90}>환불 금액</TableCell>
                            <TableCell>{detail.cancelAmount ? formatCurrency(detail.cancelAmount) : 0}원</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>상태</TableCell>
                            <TableCell>{renderStatusText(detail.statusRefund)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardBox>
                    <CardBox flexDirection={'column'} gap={2} sx={{ padding: convertToRem(16) }}>
                      <Typography cate='sub_title_20' plainColor='main_grey.gray100'>
                        취소 거절 사유
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
                            <TableCell width={90}>거절 사유</TableCell>
                            <TableCell>{detail.cancelReason}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={2}>{detail.reasonNotRefund}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardBox>
                  </>
                )}
              </>
            )}
            {(detail.status === PAYMENT_STATUS.CANCELED || detail.status === PAYMENT_STATUS.PARTIAL_CANCELED) && (
              <CardBox flexDirection={'column'} gap={2} sx={{ padding: convertToRem(16) }}>
                <Typography cate='sub_title_20' plainColor='main_grey.gray100'>
                  취소정보
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
                      <TableCell width={90}>환불 금액</TableCell>
                      <TableCell>{detail.cancelAmount ? formatCurrency(detail.cancelAmount) : 0}원</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>상태</TableCell>
                      <TableCell>{renderStatusText(detail.statusRefund)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardBox>
            )}
          </Stack>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={{ md: 'flex-end', sm: detail.isRefundPossible ? 'center' : 'flex-end' }}
            width={'100%'}
            gap={1}
          >
            {detail.status !== PAYMENT_STATUS.WAITING_FOR_DEPOSIT &&
              (detail.isRefundPossible ? (
                <GrayButton
                  fullWidth={mdDown}
                  btnSize='xs-np'
                  sx={{
                    width: convertToRem(120),
                    bgcolor: 'main_grey.gray700'
                  }}
                  onClick={() => {
                    onCSubmit?.()
                  }}
                >
                  <Typography cate='body_3_semibold' plainColor='main_grey.gray300'>
                    취소 요청
                  </Typography>
                </GrayButton>
              ) : null)}
            <PrimaryButton
              fullWidth={mdDown && detail.isRefundPossible}
              btnSize='xs-np'
              sx={{
                width: convertToRem(120)
              }}
              onClick={() => {
                onCancel?.()
              }}
            >
              <Typography cate='body_3_semibold'>확인</Typography>
            </PrimaryButton>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
