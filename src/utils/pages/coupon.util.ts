import { COUPON_TYPE, DEFAULT_COUPON_MAX_VALUE } from '@/types/coupon.type'

type TCaclPriceWithCouponArgs = {
  price: number
  coupon: number
  maxValue?: number
  type?: COUPON_TYPE
  quantity?: number
}

type TCalcCouponValue = Pick<TCaclPriceWithCouponArgs, 'price' | 'coupon' | 'maxValue' | 'type'>

const valuePercentOnPrice = (price: number, coupon: number) => price * (1 - coupon / 100)

export const calcPriceWithCoupon = (props: TCaclPriceWithCouponArgs) => {
  const { price, coupon, type, quantity = 1 } = props
  const couponValue = type === COUPON_TYPE.PERCENTAGE ? calcCouponValue(props) : coupon
  let finalPrice = price - couponValue
  return finalPrice > 0 ? finalPrice * quantity : 0
}

export const calcCouponValue = ({
  price,
  coupon,
  type = COUPON_TYPE.PERCENTAGE,
  maxValue = DEFAULT_COUPON_MAX_VALUE
}: TCalcCouponValue) => {
  let preCouponValue = coupon
  if (type === COUPON_TYPE.PERCENTAGE) {
    const value = valuePercentOnPrice(price, coupon)
    preCouponValue = price - value
  }

  // Apply the rounding logic if the number ends in an odd digit
  const endsInOdd = parseInt(preCouponValue.toString().slice(-1), 10) % 2 !== 0
  const couponValue =
    preCouponValue > 0 ? Math.min(maxValue, endsInOdd ? Math.ceil(preCouponValue / 10) * 10 : preCouponValue) : 0

  return couponValue
}
