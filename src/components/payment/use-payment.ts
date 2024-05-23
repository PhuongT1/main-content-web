import {
  approveOrder,
  cancelPaymentTossPG,
  confirmPaymentTossPG,
  createPaymentTossPG
} from '@/services/payment.service'
import {
  ApproveOrderPayload,
  CancelPaymentPayload,
  CancelPaymentTossReponse,
  ConfirmPaymentPayload,
  ConfirmPaymentTossResponse,
  CreatePaymentPayload,
  CreatePaymentResponse
} from '@/types/payment.type'
import { UseMutationOptions, useMutation } from '@tanstack/react-query'

type Props = {
  optionCreatePayment?: Omit<UseMutationOptions<ConfirmPaymentTossResponse>, 'mutationFn'>
  optionConfirmPayment?: Omit<UseMutationOptions<ConfirmPaymentTossResponse>, 'mutationFn'>
  optionCancelPayment?: Omit<UseMutationOptions<CancelPaymentTossReponse>, 'mutationFn'>
}

const useTossPayment = ({ optionCancelPayment, optionConfirmPayment, optionCreatePayment }: Props) => {
  const mCreatePayment = useMutation({
    mutationFn: (payload: CreatePaymentPayload) => createPaymentTossPG(payload)
  })
  const mConfirmPayment = useMutation({
    mutationFn: (payload: ConfirmPaymentPayload) => confirmPaymentTossPG(payload),
    onSuccess: (data, variables) => {},
    onError(error, variables, context) {}
  })
  const mCancelPayment = useMutation({
    mutationFn: (payload: CancelPaymentPayload) => cancelPaymentTossPG(payload),
    onSuccess: (data, variables) => {}
  })

  const mApprovePayment = useMutation({
    mutationFn: (payload: ApproveOrderPayload) => approveOrder(payload),
    onSuccess: (data, variables) => {
      console.log('onSuccess', data)
    }
  })

  return { mCancelPayment, mConfirmPayment, mCreatePayment, mApprovePayment }
}

export default useTossPayment
