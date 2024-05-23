import { PAYMENT_TYPE } from '../contractDetailsForm6'

const getHoursEvery30Minutes = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2)
  const minute = i % 2 === 0 ? '00' : '30'
  return `${hour < 10 ? '0' + hour : hour}:${minute}`
})

const calculatePaymentNumber = (value: string, paymentType: string) => {
  if (!value) return 0
  let newValue = typeof value === 'string' ? Number(value.replace(/[^0-9.]/g, '')) : value

  if (!paymentType) return newValue

  if (paymentType === PAYMENT_TYPE[0].value) {
    return newValue * 12
  }
  return newValue
}

export { getHoursEvery30Minutes, calculatePaymentNumber }
