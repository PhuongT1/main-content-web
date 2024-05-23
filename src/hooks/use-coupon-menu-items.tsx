import { Typography } from '@/elements'
import { TGetMyCouponParams, getMyCoupon } from '@/services/payment/coupon.service'
import { COUPON_STATUS, COUPON_TYPE, Coupon, DEFAULT_COUPON_MAX_VALUE } from '@/types/coupon.type'
import { getRemainDays } from '@/utils/date'
import { Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { ReactNode, memo, useMemo, useState } from 'react'

type TMenuItemProps = {
  price: number
  remainingDay: number
  type: COUPON_TYPE
  maxValue: number
}

const MenuItem = memo(({ price, remainingDay, type, maxValue }: TMenuItemProps) => {
  const suffixText = type === COUPON_TYPE.PERCENTAGE ? '% 할인 쿠폰' : '원 할인 쿠폰'
  const maxText = type === COUPON_TYPE.PERCENTAGE ? `(최대 할인금액 ${maxValue}원)` : ''
  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Typography cate='body_30' plainColor='base_gray.100'>
        {price}
        {suffixText}
        {maxText}
      </Typography>
      <Typography cate='body_30' plainColor='base_gray.100'>
        {remainingDay}일 남음
      </Typography>
    </Stack>
  )
})

const useCouponMenuItems = (id: number, params?: TGetMyCouponParams) => {
  const [coupon, setCoupon] = useState<Coupon | null>(null)
  const [itemPrice, setItemPrice] = useState(DEFAULT_COUPON_MAX_VALUE)

  const { data: myCouponList } = useQuery({
    queryKey: [`my-coupons`, id],
    queryFn: () =>
      getMyCoupon({
        status: COUPON_STATUS.ACTIVE,
        ...params
      }),
    staleTime: 0,
    gcTime: 0
  })

  const handleSetPrice = (price: number) => {
    if (price > 0) {
      setItemPrice(price)
    }
  }

  const myCoupons = useMemo(() => {
    const myCouponListByConditions =
      myCouponList?.data?.result?.filter((i) => {
        const remainDays = getRemainDays(moment(), moment(i.endDate))
        if (itemPrice >= i.minimumApplyAmount && remainDays > 0) {
          return i
        }
      }) || []

    const mappingCouponList: { label: ReactNode; value: Coupon | null }[] =
      myCouponListByConditions.map((i) => {
        const endTimeFormated = getRemainDays(moment(), moment(i.endDate))
        return {
          label: <MenuItem type={i.type} price={i.value} remainingDay={endTimeFormated} maxValue={i.maxValue} />,
          value: i
        }
      }) || []

    //Default value to remove the selected coupon
    mappingCouponList.unshift({
      label: (
        <Typography cate='body_30' plainColor='base_gray.100'>
          선택안함
        </Typography>
      ),
      value: null
    })

    return mappingCouponList
  }, [myCouponList, itemPrice])

  return { coupon, setCoupon, myCouponList, myCoupons, handleSetPrice }
}

export default useCouponMenuItems
