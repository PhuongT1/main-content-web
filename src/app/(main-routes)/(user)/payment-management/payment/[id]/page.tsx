'use client'
import CheckRoundFilledIcon from '@/assets/icons/check-round-filled'
import { Card, ComponentDetailNavigation, EditablePhoneField } from '@/components'
import FooterPopup from '@/components/dialog/footer-popup'
import { CATE } from '@/components/dialog/footer-popup/footer-popup.type'
import PaymentSection from '@/components/payment'
import { PREMIUM_FEATURES } from '@/constants/payment.constant'
import {
  CustomInput,
  DesignedPrimaryButton,
  Divider,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  PrimaryCheckbox,
  SelectStack,
  Typography
} from '@/elements'
import { ProductDetailWrapper } from '@/hocs'
import useCouponMenuItems from '@/hooks/use-coupon-menu-items'
import { useDialog } from '@/hooks/use-dialog'
import { useUserProfile } from '@/hooks/use-user-profile'
import { getActivePlan } from '@/services/product.service'
import yup from '@/services/yup.service'
import { COUPON_REFERENCE_TYPE, Coupon } from '@/types/coupon.type'
import { PACKAGE_TYPE, PAYMENT_TYPE, PLAN_PERIOD } from '@/types/payment.type'
import { PageParams } from '@/types/types.type'
import { calcCouponValue, calcPriceWithCoupon } from '@/utils/pages/coupon.util'
import { formatCurrency } from '@/utils/string'
import { emailValidator, phoneOptionalValidator } from '@/utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

enum PLAN_TEXT {
  MONTH = '월간',
  YEAR = '연간'
}

const QUANTITY = 1

interface PaymentForm {
  name: string
  contact: string
  email: string
  otp?: string
}

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

const SubscriptionPayment = ({ params: { id } }: PageParams<{ id: string }>) => {
  const { user, prefetchUserProfile } = useUserProfile()
  const [isPhoneValid, setPhoneValid] = useState(user?.isPhoneNumberVerified)
  const [isCheckedTerm, setCheckedTerm] = useState(false)
  const { coupon, setCoupon, myCoupons, handleSetPrice } = useCouponMenuItems(+id, {
    referenceProductType: COUPON_REFERENCE_TYPE.USER_PREMIUM,
    productId: +id
  })
  const theme = useTheme()
  const lgMatches = useMediaQuery(theme.breakpoints.down('lg'))

  const { onOpen: onOpenPolicy, open: openPolicy, onClose: onClosePolicy } = useDialog()
  const { data: activePlans } = useQuery({
    queryKey: [`active-plan`],
    queryFn: getActivePlan,
    staleTime: 0,
    gcTime: 0
  })

  const selectedPlan = activePlans?.data?.result?.find((i) => `${i.id}` === id)
  const { id: userId } = user || {}
  const { productContents = [], name: productName = '', price = 0, code } = selectedPlan || {}
  const planText = code === PLAN_PERIOD.MONTH ? PLAN_TEXT.MONTH : PLAN_TEXT.YEAR
  const { id: productContentId } = productContents?.[0] || {}
  const couponValue = calcCouponValue({
    price,
    coupon: coupon?.value || 0,
    type: coupon?.type,
    maxValue: coupon?.maxValue
  })
  const lastPrice = calcPriceWithCoupon({
    price,
    coupon: coupon?.value || 0,
    type: coupon?.type,
    quantity: QUANTITY,
    maxValue: coupon?.maxValue
  })

  const form = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const { isValid } = form.formState

  const isPaymentButtonDisabled = !isValid || !isCheckedTerm || !isPhoneValid

  const getOrderPayload = () => {
    const typeMapping = new Map([
      [PLAN_PERIOD.MONTH, PACKAGE_TYPE.MONTH],
      [PLAN_PERIOD.YEAR, PACKAGE_TYPE.YEAR]
    ])
    const type = typeMapping.get(selectedPlan?.code as PLAN_PERIOD)!
    return {
      productId: userId!,
      productContentId: productContentId,
      quantity: QUANTITY,
      //price of product
      price: price,
      //"quantity * price"
      totalAmount: price * QUANTITY,
      // "quantity * price - coupon (if have)"
      lastTotalAmount: lastPrice,
      type: PAYMENT_TYPE.USER_PREMIUM,
      meta: {
        quantity: QUANTITY,
        type: type
      },
      ...(coupon?.id && {
        couponId: coupon.id
      })
    }
  }

  useEffect(() => {
    const selectedPlan = activePlans?.data?.result?.find((i) => `${i.id}` === id)
    handleSetPrice(selectedPlan?.price || 0)
  }, [activePlans])

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
      <ComponentDetailNavigation>{planText} 이용권 결제하기</ComponentDetailNavigation>
      <Grid
        mt={{
          md: 0,
          xs: 0
        }}
        container
        columnSpacing={3}
        gap={lgMatches ? 3 : 0}
      >
        <Grid lg={6} xs={12} item display={'flex'} flexDirection={'column'} gap={3}>
          <Card sx={{ p: 3 }}>
            <Typography cate='title_70' breakpoints={{ md: 'title_60' }} plainColor='base_gray.100'>
              {productName}
            </Typography>
            <Typography mt={1.5} cate='body_30' breakpoints={{ md: 'body_20' }} plainColor='base_gray.200'>
              성공적인 창업과 사업 운영을 위한 슘페터의 모든 서비스를 제한없이 사용해보세요.
            </Typography>
          </Card>
          <Card sx={{ p: 3 }}>
            <Typography cate='title_50' plainColor='base_gray.50'>
              주요기능
            </Typography>
            <Box mt={2} display={'flex'} flexDirection={'column'} gap={1}>
              {/* TODO Sprint 5 */}
              {PREMIUM_FEATURES.map(({ content }, idx) => (
                <Box key={idx} display={'flex'} gap={1}>
                  <CheckRoundFilledIcon />
                  <Typography cate='body_30' breakpoints={{ md: 'body_20' }} plainColor='base_gray.50'>
                    {content}
                  </Typography>
                </Box>
              ))}
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
                <Typography cate='title_50' breakpoints={{ md: 'title_40' }} plainColor='base_gray.100'>
                  구매자 정보
                </Typography>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required cate='body_40' breakpoints={{ md: 'body_30' }}>
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
        <Grid lg={6} xs={12} item display={'flex'} flexDirection={'column'} gap={3}>
          <Box py={3.75} px={3} borderRadius={4} border={1} borderColor='base_gray.600'>
            <Typography cate='body_20' plainColor='base_gray.300'>
              사용자가 구매한 프리미엄 구독권은 디지털 콘텐츠 특성상 결제취소 되지 않습니다. 따라서, 신중하게 판단하여
              결제를 진행해 주시기 바랍니다. (상세한 내용은 아래 약관에서 확인) 이용약관 제 27조 (프리미엄 이용권), 제
              26조 결제취소 및 환불) 결제증빙서류 중 현금영수증(소득공제용/지출증빙용)은 결제하기 과정에서 발행됩니다.
            </Typography>
            <Box mt={2} display={'flex'} gap={2}>
              <PrimaryCheckbox
                checked={isCheckedTerm}
                onChange={(e) => setCheckedTerm(e.target.checked)}
                sx={{ p: 0, pt: 0.5 }}
                containerSx={{ alignItems: 'flex-start' }}
              />
              <Typography cate='body_30' plainColor='base_gray.50'>
                위 상품의 구매조건을 확인하였으며{' '}
                <Typography
                  component={'span'}
                  cate='body_30'
                  plainColor='blue.500'
                  sx={{
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                  onClick={onOpenPolicy}
                >
                  이용약관
                </Typography>{' '}
                동의와 결제서비스 업체의 개인정보 처리방침에 따라 개인정보가 처리되는 것에 동의합니다.
              </Typography>
            </Box>
          </Box>
          <Card sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography cate='title_40' plainColor='base_gray.100'>
              결제 정보
            </Typography>
            <Divider sx={{ borderColor: 'base_gray.700' }} />
            <Box display={'flex'} justifyContent={'space-between'} gap={3}>
              <Typography cate='sub_title_40' plainColor='base_gray.100'>
                {productName}
              </Typography>
              <Typography flexShrink={0} cate='title_60' plainColor='base_gray.100'>
                {formatCurrency(price)}
              </Typography>
            </Box>
            <Divider sx={{ borderColor: 'base_gray.700' }} />
            <Box>
              <Typography cate='body_40' sx={{ color: '#A7653A' }}>
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
                    md: 'auto',
                    xs: 3
                  }}
                  textAlign={'right'}
                  my='auto'
                  flexBasis={'50%'}
                  cate='body_50'
                  plainColor='red.500'
                >
                  {formatCurrency(couponValue)}
                </Typography>
              </Stack>
            </Box>
            <Divider sx={{ borderColor: 'base_gray.700' }} />
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography cate='body_50' plainColor='base_gray.100'>
                최종 결제 금액
              </Typography>
              <Typography cate='title_60' plainColor='base_gray.100'>
                {formatCurrency(lastPrice)}
              </Typography>
            </Box>
            <PaymentSection
              orderPayload={getOrderPayload()}
              onSuccess={(_e) => {
                prefetchUserProfile()
              }}
              backUrl='/payment-management'
              callBackUrl={`/payment-management/payment/${id}`}
            >
              <DesignedPrimaryButton disabled={isPaymentButtonDisabled} fullWidth btnSize='designed-md'>
                결제하기
              </DesignedPrimaryButton>
            </PaymentSection>
          </Card>
        </Grid>
      </Grid>
      {/* <Box py={3.75} px={3} borderRadius={2} border={1} borderColor='base_gray.600' mt={6}>
        <Typography cate='sub_title_30' plainColor='base_gray.100'>
          안내사항
        </Typography>
        <Box mt={2} component={'ul'}>
          {[
            '판매 금액에서 1) 서비스 이용료를 제외한 금액의 90%를 정산해드리며 2) 부가세를 제한 금액 중 소득세(3%),주민세(0.3%)를 원천징수한 후 지급해드립니다.',
            '매달 1일부터 말일까지 기간 내에서 이루어진 판매 금액이 정산됩니다.',
            '정산 신청 이후 슘페터에 세금계산서 발급은 [마이페이지 - 결제관리]에서 확인할 수 있어요. ',
            '멘토님의 귀책사유로 문제가 발생할 경우, 해당 금액을 제한 후 지급할 수 있습니다. 또한, 허위 등록 또는 허위거래 여부가 의심되는 거래의 내역을 확인하기 위해 최대 60일까지 정산 금액의 지급을 보류할 수 있습니다.'
          ].map((i, idx) => (
            <Typography ml={1.6} key={idx} cate='body_20' plainColor='base_gray.200' component={'li'}>
              {i}
            </Typography>
          ))}
        </Box>
      </Box> */}
      <FooterPopup
        open={openPolicy}
        onCancel={() => {
          onClosePolicy()
        }}
        cate={CATE.TERM}
      />
    </Box>
  )
}

export default ProductDetailWrapper({ component: SubscriptionPayment })
