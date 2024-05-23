'use client'
import PaymentPolicyBox from '@/app/(main-routes)/community/expert-mentoring/_components/payment-policy'
import { Card, ComponentDetailNavigation, EditablePhoneField, MentorAchievement } from '@/components'
import PaymentSection from '@/components/payment'
import { MENTORING_COURSE_NAME } from '@/constants/community/mentoring.constant'
import { MENTOR_PRODUCT_TYPE } from '@/constants/mentor.constant'
import {
  BaseImage,
  CustomInput,
  DesignedPrimaryButton,
  Divider,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  SelectStack,
  Typography
} from '@/elements'
import useCouponMenuItems from '@/hooks/use-coupon-menu-items'
import { useDialog } from '@/hooks/use-dialog'
import { useUserProfile } from '@/hooks/use-user-profile'
import { getMentor, linkToMentor } from '@/services/mentoring.service'
import yup from '@/services/yup.service'
import { MentorProductContent, TMentor } from '@/types/community/mentoring.type'
import { COUPON_REFERENCE_TYPE, Coupon } from '@/types/coupon.type'
import { PAYMENT_TYPE, PaymentSuccessResponse } from '@/types/payment.type'
import { PageParams } from '@/types/types.type'
import { calcCouponValue, calcPriceWithCoupon } from '@/utils/pages/coupon.util'
import { formatCurrency } from '@/utils/string'
import { isNumber } from '@/utils/types'
import { emailValidator, phoneOptionalValidator } from '@/utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, Stack } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface PaymentForm {
  name: string
  contact: string
  email: string
  otp?: string
}

const QUANTITY = 1

const schema = yup.object({
  name: yup.string().noOnlySpaces().required(),
  contact: yup
    .string()
    .noOnlySpaces()
    .required('연락처 필요합니다')
    .test('phoneNumber', '', (value?: string) => {
      return phoneOptionalValidator(value)
    }),
  email: yup
    .string()
    .noOnlySpaces()
    .required()
    .test('email', '', (value?: string) => {
      return emailValidator(value)
    }),
  otp: yup.string()
})

const defaultValues = {
  name: '',
  contact: '',
  email: '',
  otp: ''
}

const ExpertMentoringPayment = ({ params: { id, courseId } }: PageParams<{ id: string; courseId: string }>) => {
  const router = useRouter()
  const [courseInfo, setCourseInfo] = useState<MentorProductContent>()
  const [paymentResponse, setPaymentResponse] = useState<PaymentSuccessResponse>()
  const { user } = useUserProfile()
  const [isPhoneValid, setPhoneValid] = useState(user?.isPhoneNumberVerified)
  const [isCheckedTerm, setCheckedTerm] = useState(false)
  const { coupon, setCoupon, myCoupons, handleSetPrice } = useCouponMenuItems(+id, {
    referenceProductType: COUPON_REFERENCE_TYPE.MENTORING,
    productId: +id
  })
  const { open, onClose, onOpen } = useDialog()
  const { open: privacyDialog, onClose: closePrivacy, onOpen: openPrivacy } = useDialog()
  const searchParams = useSearchParams()

  const { data: mentorData } = useQuery({
    queryKey: [`mentor-detail-${id}`],
    queryFn: getMentor.bind(null, +id)
  })

  const linkToMentorAct = useMutation({
    mutationFn: linkToMentor
  })

  const form = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const { avatar } = (mentorData as any)?.data.user || {}
  const {
    nameOfAffiliation = '',
    username = '',
    totalReviews = 0,
    totalApplications = 0
  } = (mentorData as any)?.data || ({} as TMentor)
  const { isValid } = form.formState

  const courseName = MENTORING_COURSE_NAME.get(courseInfo?.product?.name as MENTOR_PRODUCT_TYPE) || ''
  const isPaymentButtonDisabled = !isValid || !isCheckedTerm || !isPhoneValid
  const coursePrice = courseInfo?.product.price || 0
  const totalAmount = coursePrice * QUANTITY
  const couponValue = calcCouponValue({
    price: coursePrice,
    coupon: coupon?.value || 0,
    type: coupon?.type,
    maxValue: coupon?.maxValue
  })
  const lastPrice = calcPriceWithCoupon({
    price: coursePrice,
    coupon: coupon?.value || 0,
    type: coupon?.type,
    quantity: QUANTITY,
    maxValue: coupon?.maxValue
  })
  const description = searchParams.get('description')

  const back = () => {
    router.back()
  }

  const getOrderPayload = () => {
    return {
      productId: +id,
      productContentId: +courseId,
      quantity: QUANTITY,
      //price of product
      price: coursePrice,
      //"quantity * price"
      totalAmount: totalAmount,
      // "quantity * price - coupon (if have)"
      lastTotalAmount: lastPrice,
      type: PAYMENT_TYPE.MENTORING,
      meta: {
        description,
        productContentId: +courseId
      },
      ...(coupon?.id && {
        couponId: coupon.id
      })
    }
  }

  useEffect(() => {
    if (!(courseId && isNumber(+courseId))) {
      back()
    }
  }, [courseId])

  useEffect(() => {
    const courseInfo = (mentorData as any)?.data.productContents.find((i) => i.id === +courseId)
    setCourseInfo(courseInfo)
    handleSetPrice(courseInfo?.product?.price || 0)
  }, [mentorData])

  useEffect(() => {
    if (user) {
      const { email = '', nickname = '' } = user
      form.setValue('email', email)
      form.setValue('name', nickname)
      form.trigger('name')
    }
  }, [user])

  return (
    <Box>
      <ComponentDetailNavigation customBack={back}>전문가 멘토링</ComponentDetailNavigation>
      <Typography
        mt={4}
        component={'h2'}
        plainColor='main_grey.gray100'
        cate='title_70'
        breakpoints={{
          md: 'subtitle_1_semibold'
        }}
      >
        구매하기
      </Typography>
      <Grid
        mt={{
          md: 0,
          xs: 0
        }}
        container
        rowSpacing={3}
        columnSpacing={3}
      >
        <Grid lg={6} xs={12} item display={'flex'} flexDirection={'column'} gap={3}>
          <Card sx={{ p: 3 }}>
            <Typography cate='title_50' plainColor='main_grey.gray100'>
              주문정보
            </Typography>
            <Box mt={2}>
              <Typography cate='body_40' breakpoints={{ md: 'body_30' }} plainColor='main_grey.gray100'>
                {courseName} 화상멘토링
              </Typography>
              <Box mt={2} display={'flex'} gap={2}>
                <Box height={88} width={88} flexShrink={0}>
                  <BaseImage
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 99
                    }}
                    src={avatar?.url || ''}
                    alt={`mentoring-${0}`}
                  />
                </Box>
                <Box display={'flex'} gap={1} flexDirection={'column'}>
                  <Typography cate='title_40' plainColor='sub.teal400'>
                    {nameOfAffiliation}
                  </Typography>
                  <Box display={'flex'} gap={1}>
                    <Typography cate='title_40' plainColor='main_grey.gray100'>
                      {username}
                    </Typography>
                    <Typography cate='title_40' plainColor='main_grey.gray100'>
                      멘토
                    </Typography>
                  </Box>
                  <MentorAchievement {...{ totalApplications, totalReviews }} rocketSize='sm' />
                </Box>
              </Box>
            </Box>
          </Card>
          <Card sx={{ p: 3 }}>
            <Form {...form}>
              <Box
                component={'form'}
                display={'flex'}
                sx={{
                  gap: 3
                }}
                flexDirection={'column'}
                onKeyDown={(e) => {
                  if (e.key == 'Enter') {
                    e.preventDefault()
                    return false
                  }
                }}
              >
                <Typography cate='title_50' plainColor='main_grey.gray100'>
                  구매자 정보
                </Typography>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel cate='body_40' breakpoints={{ md: 'body_30' }}>
                        이름
                      </FormLabel>
                      <FormControl>
                        <CustomInput maxLength={30} fullWidth placeholder='이름을 입력해주세요' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <EditablePhoneField
                  getIsValid={(valid) => setPhoneValid(valid)}
                  labelProps={{ cate: 'body_40', breakpoints: { md: 'body_30' } }}
                  form={form as any}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel cate='body_40' breakpoints={{ md: 'body_30' }}>
                        이메일
                      </FormLabel>
                      <FormControl>
                        <CustomInput maxLength={30} fullWidth placeholder='이메일을 입력해주세요' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Box>
            </Form>
          </Card>
        </Grid>
        <Grid lg={6} xs={12} item>
          <Stack gap={3}>
            <PaymentPolicyBox isCheckTerm={isCheckedTerm} onChange={(e) => setCheckedTerm(e.target.checked)} />
            <Card sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography cate='title_50' plainColor='main_grey.gray100'>
                주문정보
              </Typography>
              <Divider sx={{ borderColor: 'main_grey.gray700' }} />
              <Box display={'flex'} justifyContent={'space-between'}>
                <Typography cate='body_40' plainColor='main_grey.gray100'>
                  멘토링 결제 금액
                </Typography>
                <Typography cate='title_60' plainColor='main_grey.gray100'>
                  {formatCurrency(coursePrice)}
                </Typography>
              </Box>
              <Divider sx={{ borderColor: 'main_grey.gray700' }} />
              <Box
                pl={{
                  md: 2,
                  xs: 0
                }}
              >
                <Typography cate='body_40' plainColor='main_grey.gray100'>
                  적용 가능한 할인 쿠폰 {myCoupons.length}개
                </Typography>
                <Stack
                  mt={1}
                  direction={{
                    md: 'row',
                    xs: 'column'
                  }}
                  justifyContent={'space-between'}
                >
                  <SelectStack
                    menuItemsProps={{
                      sx: {
                        width: '100%',
                        display: 'block'
                      }
                    }}
                    onChange={(e) => setCoupon(e.target.value as Coupon)}
                    sx={{ flexBasis: '100%' }}
                    value={coupon}
                    placeholder='쿠폰을선택해주세요'
                    list={myCoupons}
                  />
                  <Typography
                    mt={{
                      md: 0,
                      xs: 3
                    }}
                    textAlign={'right'}
                    my='auto'
                    flexBasis={'50%'}
                    cate='body_50'
                    plainColor='sub.teal400'
                  >
                    {formatCurrency(couponValue)}
                  </Typography>
                </Stack>
              </Box>
              <Divider sx={{ borderColor: 'main_grey.gray700' }} />
              <Box display={'flex'} justifyContent={'space-between'}>
                <Typography cate='body_40' plainColor='main_grey.gray100'>
                  최종 결제 금액
                </Typography>
                <Typography cate='title_60' plainColor='main_grey.gray100'>
                  {formatCurrency(lastPrice)}
                </Typography>
              </Box>
              {/*<Box display={'flex'} gap={1.5}>*/}
              {/*  <PrimaryCheckbox*/}
              {/*    value={isCheckedTerm}*/}
              {/*    onChange={(e) => setCheckedTerm(e.target.checked)}*/}
              {/*    sx={{ p: 0, pt: 0.5 }}*/}
              {/*    containerSx={{ alignItems: 'flex-start' }}*/}
              {/*  />*/}
              {/*  <Typography cate='body_40' plainColor='main_grey.gray100'>*/}
              {/*    위 상품의 구매조건을 확인하였으며{' '}*/}
              {/*    <Typography component={'span'} cate='body_40' plainColor='main_primary.blue300'>*/}
              {/*      이용약관*/}
              {/*    </Typography>{' '}*/}
              {/*    동의와 결제서비스 업체의 개인정보 처리방침에 따라 개인정보가 처리되는 것에 동의합니다.*/}
              {/*  </Typography>*/}
              {/*</Box>*/}
              <PaymentSection
                orderPayload={getOrderPayload()}
                onSuccess={(e) => {
                  setPaymentResponse(e.data)
                }}
                backUrl='/mentee'
                callBackUrl={`/community/expert-mentoring/${id}/payment/${courseId}`}
              >
                <DesignedPrimaryButton disabled={isPaymentButtonDisabled} fullWidth btnSize='designed-md'>
                  결제하기
                </DesignedPrimaryButton>
              </PaymentSection>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ExpertMentoringPayment
