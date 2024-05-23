'use client'
import ParticipateXRed from '@/assets/icons/alert/participate-x-red'
import ConfirmationIcon from '@/assets/icons/dialog-icons/confirmation'
import { Pagination } from '@/components'
import { TablePayment } from '@/components/table'
import { PrimaryButton, Typography } from '@/elements'
import AlertPopup from '@/elements/alert-popup'
import SearchInput from '@/elements/v2/input/search-input'
import { getMyCoupon, redeemMyCoupon } from '@/services/payment/coupon.service'
import { convertToRem } from '@/utils/convert-to-rem'
import { Stack, useMediaQuery, useTheme } from '@mui/material'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { COLUMN_COUPON_MD, COLUMN_COUPON_SM } from '../_utils/column'
import CouponInform from './_component/coupon-inform'

enum TakeCouponErrorCode {
  Not_found = '1701',
  Expired = '1705',
  Not_Issued = '1710',
  Have_Taken_Coupon = '1706',
  Out_Of_Coupons = '1708'
}

const CouponManagement = () => {
  const queryData = useSearchParams()
  const mdDown = useMediaQuery('(max-width: 768px)')
  const {
    palette: { main_grey, home }
  } = useTheme()
  const [page, setPage] = useState<number>(1)
  const [coupon, setCoupon] = useState<string>('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showFailed, setShowFailed] = useState(false)
  const [showChecking, setShowChecking] = useState(false)

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['my-coupon', { page }],
    queryFn: () => getMyCoupon({ page, limit: 5 }),
    select: (data) => {
      return data.data
    },
    placeholderData: keepPreviousData,
    meta: {
      offLoading: true
    }
  })

  const redeemCouponMutation = useMutation({
    mutationFn: async (coupon: string) => {
      const { data, error } = await redeemMyCoupon(coupon)

      if (error) throw error
      return data
    },
    onSuccess: () => {
      setShowSuccess(true)
      refetch()
    },
    onError: (err: any) => {
      switch (err.code) {
        case TakeCouponErrorCode.Expired:
          setShowFailed(true)
          break
        case TakeCouponErrorCode.Have_Taken_Coupon:
        case TakeCouponErrorCode.Not_Issued:
        case TakeCouponErrorCode.Not_found:
        case TakeCouponErrorCode.Out_Of_Coupons:
          setShowChecking(true)
          break
      }

      setCoupon('')
    }
  })

  const applyCoupon = () => {
    if (coupon) {
      redeemCouponMutation.mutate(coupon)
    }
  }

  useEffect(() => {
    setPage(Number(queryData.get('page')) || 1)
  }, [queryData])

  return (
    <>
      <Stack gap={6}>
        <Stack
          alignItems={{ md: 'center', sm: 'flex-start' }}
          justifyContent={'center'}
          direction={{ md: 'row', sm: 'column' }}
          gap={{ md: 2, sm: 1.5 }}
          width={'100%'}
          sx={{
            backgroundColor: main_grey.gray800,
            minHeight: { md: convertToRem(108) },
            borderRadius: convertToRem(8),
            padding: { md: 0, sm: convertToRem(16) }
          }}
        >
          <Typography
            cate='sub_title_40'
            sx={{
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}
          >
            쿠폰입력
          </Typography>

          <SearchInput
            placeholder='쿠폰 번호를 입력해 주세요.'
            fullWidth={!mdDown ? false : true}
            sx={{
              width: { md: convertToRem(480), sm: '100%' },
              backgroundColor: 'black'
            }}
            value={coupon}
            onClear={() => setCoupon('')}
            onChange={(e) => {
              setCoupon(e.target.value)
            }}
          />
          <PrimaryButton
            btnSize={'xs'}
            sx={{ width: convertToRem(97), borderRadius: convertToRem(1000) }}
            fullWidth={mdDown}
            onClick={applyCoupon}
          >
            <Typography cate='button_20'>쿠폰등록</Typography>
          </PrimaryButton>
        </Stack>
        {data && (
          <Stack gap={3}>
            <TablePayment
              columns={mdDown ? COLUMN_COUPON_SM : COLUMN_COUPON_MD}
              rows={data.result}
              isLoading={isFetching}
            />
            {data.metaData && data.metaData.totalPages > 1 && (
              <Pagination
                page={page}
                count={data.metaData.totalPages}
                action={(page) => {
                  setPage(page)
                }}
              />
            )}
          </Stack>
        )}

        <CouponInform />
      </Stack>
      <AlertPopup
        open={showSuccess}
        icon={<ConfirmationIcon />}
        title='쿠폰 등록이 완료되었습니다.'
        submitTitle='닫기'
        onSubmit={() => {
          setShowSuccess(false)
        }}
      />
      <AlertPopup
        open={showChecking}
        icon={<ParticipateXRed />}
        title='쿠폰 번호를 확인해주세요.'
        submitTitle='닫기'
        onSubmit={() => {
          setShowChecking(false)
        }}
      />
      <AlertPopup
        open={showFailed}
        icon={<ParticipateXRed />}
        title='사용 불가한 쿠폰입니다.'
        submitTitle='닫기'
        onSubmit={() => {
          setShowFailed(false)
        }}
      />
    </>
  )
}

export default CouponManagement
