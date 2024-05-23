'use client'
import EReceiptModal from '@/components/payment/components/e-receipt-modal'
import PaymentSuccessModal from '@/components/payment/components/payment-success-modal'
import { ErrorCodeApproveOrder } from '@/constants/payment.constant'
import { useDialog } from '@/hooks/use-dialog'
import { useUserProfile } from '@/hooks/use-user-profile'
import { CreateOrderPayload } from '@/services/order.service'
import { createOrder } from '@/services/payment.service'
import { color_gray } from '@/themes/system-palette'
import { PAYMENT_STATUS, PaymentInfo, PaymentSuccessResponse, TAdditionalMeta } from '@/types/payment.type'
import { remConvert } from '@/utils/convert-to-rem'
import { handleRequest } from '@/utils/handleRequest'
import { getRequestPaymentPayload } from '@/utils/pages/order.util'
import { Box, Button, DialogActions, DialogContent, Fade, Dialog as MDialog, Slide, useTheme } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { useMutation, useQuery } from '@tanstack/react-query'
import { PaymentWidgetInstance, loadPaymentWidget } from '@tosspayments/payment-widget-sdk'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { FunctionComponent, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { CreditCardAlert, Dialog } from '..'
import VirtualAccountModal from './components/virtual-account-modal'
import useTossPayment from './use-payment'

export const DEFAULT_PAYMENT_REQUEST_PAYLOAD = {
  orderId: '',
  orderName: '',
  customerName: '',
  customerEmail: '',
  customerMobilePhone: ''
} as PaymentInfo

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

interface PaymentSectionProps {
  onClose?: VoidFunction
  onSuccess?: (data: { data: PaymentSuccessResponse }) => void
  onError?: (message: unknown) => void
  orderPayload?: CreateOrderPayload
  callBackUrl: string
  preprocessFn?: (handleCreateOrder: (meta?: TAdditionalMeta) => Promise<void>) => void
  paymentInfo?: PaymentInfo
  backUrl: string
  openSuccessPopup?: boolean
}

const selector = '#payment-widget'

const PaymentSection: FunctionComponent<PropsWithChildren<PaymentSectionProps>> = ({
  children,
  onClose,
  onError,
  onSuccess,
  callBackUrl = '',
  orderPayload,
  preprocessFn,
  paymentInfo,
  backUrl,
  openSuccessPopup = true
}) => {
  const {
    palette: { home }
  } = useTheme()

  const { user } = useUserProfile()

  const paymentParams = useSearchParams()
  const router = useRouter()
  const paymentKey = paymentParams?.get('paymentKey')
  // const paymentType = paymentParams?.get('paymentType')
  const orderId = paymentParams?.get('orderId')
  const preOrderId = paymentParams?.get('preOrderId')

  const [open, setOpen] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState('')

  const [requestPaymentPayload, setRequestPaymentPayload] = useState<PaymentInfo>(DEFAULT_PAYMENT_REQUEST_PAYLOAD)
  const { open: openPaymentSuccess, onOpen: onOpenPaymentSuccess } = useDialog()
  const [paymentResponse, setPaymentResponse] = useState<PaymentSuccessResponse>()
  const { open: openEReceipt, onClose: onCloseEReceipt, onOpen: onOpenEReceipt } = useDialog()
  const { open: openVirtualAccount, onOpen: onOpenVirtualAccount } = useDialog()

  const [price, setPrice] = useState(0)
  const { mApprovePayment } = useTossPayment({})
  const { data: paymentWidget } = usePaymentWidget(process.env.NEXT_PUBLIC_TOSS_API_CLIENT_KEY_DEV!, user?.uuid ?? '')
  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance['renderPaymentMethods']> | null>(null)
  const [paymentMethodsWidgetReady, isPaymentMethodsWidgetReady] = useState(false)
  const { open: openPaymentFail, onClose: onClosePaymentFail, onOpen: onOpenPaymentFail } = useDialog()

  const { mutateAsync } = useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),
    onSuccess: (data) => {
      setRequestPaymentPayload((prev) => getRequestPaymentPayload(prev, data?.data, callBackUrl))
      setOpen(true)
    },
    onError(error, variables, context) {
      onError && onError(error)
    }
  })

  const handleApprovePayment = async () => {
    if (!paymentKey || !orderId) return
    const [data, error] = await handleRequest(
      mApprovePayment.mutateAsync({
        paymentKey
      })
    )
    const res = data as { data: PaymentSuccessResponse }
    if (res?.data) {
      if (res?.data?.status === PAYMENT_STATUS.DONE) {
        onSuccess && onSuccess(res)
      }
      setOpen(false)
      setPaymentResponse(res.data)
      return
    }
    if (error) {
      onOpenPaymentFail()
      if (Number(error?.error?.code || 0) !== ErrorCodeApproveOrder.PAYMENT_KEY_EXIST) {
        setErrMsg(error?.error?.message || '')
        onError && onError(error)
      }
    }
    setOpen(false)
  }

  const handleDopayment = async () => {
    if (!paymentMethodsWidgetReady || !requestPaymentPayload.orderId) return
    const [data, error] = await handleRequest(paymentWidget?.requestPayment(requestPaymentPayload))
    if (error) {
      onOpenPaymentFail()
      onError && onError(error)
      return
    }
  }

  const handleCreateOrder = async (disabled: boolean, meta?: TAdditionalMeta) => {
    // create a new order

    const isCanCreateOrder =
      !orderId &&
      orderPayload &&
      orderPayload.price * orderPayload.totalAmount * orderPayload.lastTotalAmount > 0 &&
      !disabled
    // price must greater than zero
    if (!isCanCreateOrder) return

    await mutateAsync({
      ...{ ...orderPayload, ...meta }
    })
  }

  const paymentSuccessCase = () => {
    return {
      [PAYMENT_STATUS.WAITING_FOR_DEPOSIT]: onOpenVirtualAccount,
      [PAYMENT_STATUS.PARTIAL_CANCELED]: onOpenPaymentFail,
      [PAYMENT_STATUS.REQUEST_CANCELED]: onOpenPaymentFail,
      [PAYMENT_STATUS.DONE]: openSuccessPopup ? onOpenPaymentSuccess : undefined,
      [PAYMENT_STATUS.DEPOSIT_DONE]: openSuccessPopup ? onOpenPaymentSuccess : undefined,
      [PAYMENT_STATUS.CANCELED]: onOpenPaymentFail
    }
  }

  useEffect(() => {
    if (paymentResponse?.id) {
      const action = paymentSuccessCase()[paymentResponse.status]
      action?.()
    }
  }, [paymentResponse])

  useEffect(() => {
    if (paymentWidget == null || !open || price <= 0) {
      return
    }

    // ------  Render Payment Method UI ------
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      selector,
      { value: price },
      { variantKey: 'DEFAULT' }
    )

    // ------  이용약관 UI 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
    // paymentWidget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' })

    //  ------  결제 UI 렌더링 완료 이벤트 ------
    paymentMethodsWidget.on('ready', () => {
      paymentMethodsWidgetRef.current = paymentMethodsWidget
      isPaymentMethodsWidgetReady(true)
    })
  }, [paymentWidget, open, requestPaymentPayload])

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current

    if (paymentMethodsWidget == null || price <= 0) {
      return
    }

    // ------ 금액 업데이트 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(price)
  }, [price])

  useEffect(() => {
    if (!orderPayload) return
    setPrice(orderPayload.lastTotalAmount)
  }, [orderPayload?.lastTotalAmount])

  useEffect(() => {
    handleApprovePayment()
  }, [paymentKey, orderId])

  useEffect(() => {
    if (paymentInfo) {
      setOpen(true)
      setRequestPaymentPayload(paymentInfo)
    }
  }, [paymentInfo])

  useEffect(() => {
    if (errMsg) {
      onOpenPaymentFail()
    }
  }, [errMsg])

  if (!open) {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return null
      }
      return (
        <>
          <Box
            key={child.key}
            component={'span'}
            onClick={() =>
              preprocessFn
                ? preprocessFn((meta) => handleCreateOrder(child.props?.disabled, meta))
                : handleCreateOrder(child.props?.disabled)
            }
          >
            {child}
          </Box>
          {/* Payment fail */}
          <CreditCardAlert
            title='결제 오류'
            description={errMsg || '결제에 실패하였습니다. 다시 확인해 주세요.'}
            onCancel={() => {
              setErrMsg('')
              onClosePaymentFail()
            }}
            open={openPaymentFail}
            cancelTxt='닫기'
          />
          {/* Payment Success */}
          <Dialog
            PaperProps={{
              sx: {
                maxWidth: 560,
                width: '100%'
              }
            }}
            open={openPaymentSuccess}
          >
            <PaymentSuccessModal {...{ paymentResponse, onOpenEReceipt, backUrl }} />
          </Dialog>
          {/* Virtual Account */}
          <Dialog
            PaperProps={{
              sx: {
                maxWidth: 560,
                width: '100%'
              }
            }}
            open={openVirtualAccount}
          >
            <VirtualAccountModal {...{ paymentResponse, onOpenEReceipt, backUrl }} />
          </Dialog>
          {/* E Receipt */}
          <Dialog
            PaperProps={{
              sx: {
                maxWidth: 560,
                width: '100%'
              }
            }}
            open={openEReceipt}
            onClose={onCloseEReceipt}
          >
            <EReceiptModal url={paymentResponse?.receipt || ''} />
          </Dialog>
        </>
      )
    })
  }

  return (
    <>
      <MDialog
        maxWidth='lg'
        TransitionComponent={Transition}
        transitionDuration={300}
        sx={{
          borderRadius: remConvert('16px')
        }}
        PaperProps={{
          style: {
            backgroundColor: home.base_white,
            borderRadius: remConvert('16px'),
            padding: remConvert('12px')
          }
        }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
            style: {
              backgroundColor: home.gray300,
              opacity: 0.5
            }
          }
        }}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
        open={open}
      >
        <DialogContent style={{ width: 520, height: '70vh', maxWidth: '100%' }}>
          <div id='payment-widget' />
          {/* <div id='agreement' /> */}
        </DialogContent>
        <DialogActions sx={{ mt: '20px' }}>
          <Box width={1} display={'flex'} justifyContent={'end'} alignItems={'center'} gap={remConvert('20px')}>
            <Button
              onClick={() => {
                setOpen(false)
                isPaymentMethodsWidgetReady(false)
                if (backUrl && preOrderId) {
                  router.push(backUrl)
                }
              }}
              sx={{
                width: '100px',
                color: color_gray[550],
                fontSize: remConvert('16px'),
                fontWeight: 'bold',
                lineHeight: '120%',
                minWidth: remConvert('120px'),
                boxShadow: 'none',
                backgroundColor: color_gray[30],
                borderRadius: remConvert('8px'),
                padding: remConvert('12px 24px'),
                '&:hover': {
                  backgroundColor: color_gray[30]
                }
              }}
              size='large'
              variant='contained'
            >
              닫기
            </Button>
            <Button
              onClick={handleDopayment}
              disabled={!paymentMethodsWidgetReady}
              sx={{
                color: home.base_white,
                minWidth: remConvert('120px'),
                fontSize: remConvert('16px'),
                fontWeight: 'bold',
                lineHeight: '125%',
                boxShadow: 'none',
                backgroundColor: home.blue500,
                borderRadius: remConvert('8px'),
                padding: remConvert('12px 24px'),
                '&:hover': {
                  backgroundColor: home.blue500
                },
                '&.Mui-disabled': {
                  borderColor: 'button.primary.disabled.bg',
                  bgcolor: 'button.primary.disabled.bg'
                }
              }}
              size='large'
              variant='contained'
            >
              결제하기
            </Button>
          </Box>
        </DialogActions>
      </MDialog>
    </>
  )
}
export default PaymentSection

function usePaymentWidget(clientKey: string, customerKey: string) {
  return useQuery({
    queryKey: ['tosspayment-widget', clientKey, customerKey],
    queryFn: () => {
      // ------  결제위젯 초기화 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
      return loadPaymentWidget(clientKey, customerKey)
    }
  })
}
// TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
// 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
