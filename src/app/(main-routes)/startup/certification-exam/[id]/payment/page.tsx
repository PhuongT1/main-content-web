'use client'
import {
  createApplicationExam,
  createRetestApplicationExam,
  getCertificateExamDetail
} from '@/actions/apis/certification.action'
import { localStorageAtom } from '@/atoms/persistance.atom'
import { Card, ComponentDetailNavigation, EditablePhoneField } from '@/components'
import CardBox from '@/components/cards/card-box'
import FooterPopup from '@/components/dialog/footer-popup'
import { CATE } from '@/components/dialog/footer-popup/footer-popup.type'
import PaymentSection from '@/components/payment'
import PostalCodeField from '@/components/postal-code-field'
import { COURSE_STATUS_APPLY_EXAM } from '@/constants/certificate.constant'
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
import useCouponMenuItems from '@/hooks/use-coupon-menu-items'
import { useDialog } from '@/hooks/use-dialog'
import { useUserProfile } from '@/hooks/use-user-profile'
import { CreateOrderPayload } from '@/services/order.service'
import yup from '@/services/yup.service'
import { COUPON_REFERENCE_TYPE, Coupon } from '@/types/coupon.type'
import { PAYMENT_TYPE } from '@/types/payment.type'
import { PageParams } from '@/types/types.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { formatPhoneNumber } from '@/utils/format-phone-number'
import { calcCouponValue, calcPriceWithCoupon } from '@/utils/pages/coupon.util'
import { formatCurrency } from '@/utils/string'
import { emailValidator, phoneOptionalValidator } from '@/utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, Stack } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState, useResetRecoilState } from 'recoil'
import SimpleCertificationInformation from '../../_component/simple-certification-info-card'

const QUANTITY = 1
interface PaymentForm {
  name: string
  contact: string
  email: string
  otp?: string
  address?: string
  postalCode?: string
  addressDetail?: string
}

const defaultValues = {
  name: '',
  contact: '',
  email: '',
  otp: ''
}

const MenuItem = ({ price, remainingDay }: { price: number; remainingDay: number }) => {
  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Typography cate='body_30' plainColor='main_grey.gray100'>
        {price}원 할인 쿠폰
      </Typography>
      <Typography cate='body_30' plainColor='main_grey.gray100'>
        {remainingDay}일 남음
      </Typography>
    </Stack>
  )
}

const COUPONS = [
  {
    label: <MenuItem price={1000} remainingDay={3} />,
    value: 1000
  },
  {
    label: <MenuItem price={2000} remainingDay={3} />,
    value: 2000
  }
]

const CertificationExamPayment = ({ params: { id } }: PageParams<{ id: string }>) => {
  const router = useRouter()
  const pathName = usePathname()
  const { user } = useUserProfile()
  const [isPhoneValid, setPhoneValid] = useState(user?.isPhoneNumberVerified)
  const [isCheckedTerm, setCheckedTerm] = useState(false)
  // const [coupon, setCoupon] = useState<number>()
  const { coupon, setCoupon, myCoupons, handleSetPrice } = useCouponMenuItems(+id, {
    referenceProductType: COUPON_REFERENCE_TYPE.CERTIFICATION,
    productId: +id
  })
  const { onOpen: onOpenPolicy, open: openPolicy, onClose: onClosePolicy } = useDialog()

  const [persisData, setPersisData] = useRecoilState(localStorageAtom)
  const resetPersistState = useResetRecoilState(localStorageAtom)

  const queryClient = useQueryClient()

  const { data: certiDetail } = useQuery({
    queryKey: [`certification-exam-detail-${id}`],
    queryFn: async () => {
      const { data, error } = await getCertificateExamDetail(+id)

      if (error) throw error

      return data
    }
  })

  const isRetest =
    certiDetail && certiDetail.statusRecruitmentFormat === COURSE_STATUS_APPLY_EXAM.FAIL && certiDetail.hasRetest
  const isHasTextBook = certiDetail && certiDetail.hasTextbook
  const certificatePrice = certiDetail ? (isRetest ? certiDetail.retestPrice : certiDetail.price) : 0

  const couponValue = calcCouponValue({
    price: certificatePrice,
    coupon: coupon?.value || 0,
    type: coupon?.type,
    maxValue: coupon?.maxValue
  })
  const lastPrice = calcPriceWithCoupon({
    price: certificatePrice,
    coupon: coupon?.value || 0,
    type: coupon?.type,
    quantity: QUANTITY,
    maxValue: coupon?.maxValue
  })

  const retestMutation = useMutation({
    mutationFn: createRetestApplicationExam,
    onSuccess: (data) => {
      router.replace('/certificate-management?type=my-test')
    }
  })

  const purchaseExam = useMutation({
    mutationFn: createApplicationExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certification-exam'] })
      resetPersistState()
    },
    onSettled: () => {
      router.replace('/certificate-management?type=my-test')
    }
  })

  const schema = yup.object().shape({
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
    address: yup.string().when([], {
      is: () => certiDetail && certiDetail.hasTextbook,
      then: () => yup.string().noOnlySpaces().required('주소 정보를 입력해 주세요.'),
      otherwise: () => yup.string().nullable()
    }),
    postalCode: yup.string().when([], {
      is: () => certiDetail && certiDetail.hasTextbook,
      then: () => yup.string().noOnlySpaces().required(),
      otherwise: () => yup.string().nullable()
    }),
    addressDetail: yup.string().when([], {
      is: () => certiDetail && certiDetail.hasTextbook,
      then: () => yup.string().noOnlySpaces().required(),
      otherwise: () => yup.string().nullable()
    }),
    otp: yup.string()
  })

  const form = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const { isValid } = form.formState

  const isPaymentButtonDisabled = !isValid || !isCheckedTerm || !isPhoneValid

  const back = () => {
    router.back()
  }

  const orderPayload = () => {
    let payload = {} as CreateOrderPayload
    const { name, email, postalCode, address, addressDetail, contact } = form.getValues()

    if (certiDetail?.productContents) {
      const QUANTITY = 1
      const { productContents } = certiDetail
      payload = {
        type: PAYMENT_TYPE.CERTIFICATION,
        productId: +id,
        productContentId: productContents.id,
        quantity: QUANTITY,
        price: certificatePrice,
        totalAmount: QUANTITY * certificatePrice,
        lastTotalAmount: QUANTITY * certificatePrice,
        postcode: postalCode,
        address,
        addressDetail,
        meta: {
          isRetest,
          ...(isRetest
            ? {
                courseId: certiDetail.id,
                courseApplicationId: certiDetail.courseApplications[0].id
              }
            : {
                address,
                addressDetail,
                nickname: name,
                email,
                postcode: postalCode,
                courseId: +id,
                phoneNumber: contact.replaceAll('-', '')
              })
        },
        ...(coupon?.id && {
          couponId: coupon.id
        })
      }
    }

    return payload
  }

  const onCreateOrderSuccess = (data: any) => {
    const { name, email, postalCode, address, addressDetail, contact } = form.getValues()

    if (isRetest) {
      retestMutation.mutate({
        courseId: certiDetail.id,
        courseApplicationId: certiDetail.courseApplications[0].id
      })
    } else {
      purchaseExam.mutate({
        address,
        addressDetail,
        nickname: name,
        email,
        postcode: postalCode,
        orderId: data.data.orderId,
        courseId: +id,
        phoneNumber: contact.replaceAll('-', '')
      })
    }
  }

  useEffect(() => {
    if (!id || isNaN(+id)) {
      back()
    }
  }, [id])

  useEffect(() => {
    if (user && !isRetest) {
      const { email = '', nickname = '' } = user
      form.setValue('email', email)
      // form.setValue('name', nickname)
      // form.trigger('name')
    }

    if (user && isRetest && certiDetail) {
      const { postcode, address, addressDetail, nickname, email, phoneNumber } = certiDetail.courseApplications[0]
      form.setValue('email', email)
      form.setValue('postalCode', postcode)
      form.setValue('addressDetail', addressDetail)
      form.setValue('address', address)
      form.setValue('name', nickname)
      form.setValue('contact', formatPhoneNumber(phoneNumber) as string)
    }
  }, [user, isRetest, certiDetail])

  useEffect(() => {
    const data = Object.keys(persisData)

    if (data.length > 0) {
      form.reset(persisData)
    }
  }, [persisData])

  return (
    <Box>
      <ComponentDetailNavigation customBack={back}>자격시험 결제하기</ComponentDetailNavigation>
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
          <SimpleCertificationInformation info={certiDetail} />
          <CardBox sx={{ backgroundColor: 'main_grey.gray800', borderRadius: convertToRem(16) }}>
            <Form {...form}>
              <Stack
                component={'form'}
                sx={{
                  gap: 3
                }}
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
                {isRetest || !isHasTextBook ? null : (
                  <>
                    <Stack direction={'row'} gap={0}>
                      <Typography cate='body_20' plainColor='main.blue'>
                        교구
                      </Typography>
                      <Typography cate='body_20' plainColor='main_grey.gray100'>
                        가 있습니다. 배송받으실 주소를 입력해 주세요.
                      </Typography>
                    </Stack>
                    <Stack>
                      <PostalCodeField
                        labelProps={{ cate: 'body_40', breakpoints: { md: 'body_30' } }}
                        form={form as any}
                      />
                      <FormField
                        control={form.control}
                        name='addressDetail'
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <CustomInput
                                maxLength={30}
                                fullWidth
                                placeholder='상세 주소를 입력해 주세요'
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </Stack>
                  </>
                )}
              </Stack>
            </Form>
          </CardBox>
        </Grid>
        <Grid lg={6} xs={12} item>
          <Card sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography cate='title_40' plainColor='main_grey.gray100'>
              결제 정보
            </Typography>
            <Divider sx={{ borderColor: 'main_grey.gray700' }} />
            <Stack direction={'row'} justifyContent={'space-between'} flexWrap={'wrap'} gap={1}>
              <Typography
                cate='body_50'
                plainColor='main_grey.gray100'
                sx={{
                  width: '100%'
                }}
              >
                {isRetest && (
                  <Typography cate='body_50' component={'span'} plainColor='main_primary.blue300'>
                    재응시
                  </Typography>
                )}{' '}
                {certiDetail && certiDetail.name}
              </Typography>
              <Typography
                cate='title_60'
                plainColor='main_grey.gray100'
                align='right'
                sx={{ alignSelf: 'flex-end', width: '100%' }}
              >
                {formatCurrency(certificatePrice)}
              </Typography>
            </Stack>
            <Divider sx={{ borderColor: 'main_grey.gray700' }} />
            <Box>
              <Typography cate='body_40' plainColor='sub.orange10'>
                적용 가능한 할인 쿠폰 {myCoupons.length}개
              </Typography>
              <Stack
                mt={1}
                direction={{
                  md: 'row',
                  xs: 'column'
                }}
                justifyContent={'space-between'}
                gap={2.5}
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
                <Typography textAlign={'right'} mt='auto' flexBasis={'50%'} cate='body_50' plainColor='sub.red500'>
                  {formatCurrency(couponValue)}
                </Typography>
              </Stack>
            </Box>
            <Divider sx={{ borderColor: 'main_grey.gray700' }} />
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography cate='body_50' plainColor='main_grey.gray100'>
                최종 결제 금액
              </Typography>
              <Typography cate='title_60' plainColor='main_grey.gray100'>
                {formatCurrency(lastPrice)}
              </Typography>
            </Box>
            <Box display={'flex'} gap={1.5}>
              <PrimaryCheckbox
                value={isCheckedTerm}
                onChange={(e) => {
                  form.trigger()
                  setCheckedTerm(e.target.checked)
                }}
                sx={{ p: 0, pt: 0.5 }}
                containerSx={{ alignItems: 'flex-start' }}
              />
              <Typography cate='body_20' plainColor='main_grey.gray100'>
                위 상품의 구매조건을 확인하였으며{' '}
                <Typography
                  component={'span'}
                  cate='body_20'
                  plainColor='main.blue'
                  onClick={onOpenPolicy}
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  이용약관
                </Typography>{' '}
                동의와 결제서비스 업체의 개인정보 처리방침에 따라 개인정보가 처리되는 것에 동의합니다.
              </Typography>
            </Box>
            <PaymentSection
              backUrl={`startup/certification-exam/${id}`}
              orderPayload={orderPayload()}
              onSuccess={(data) => onCreateOrderSuccess(data)}
              callBackUrl={pathName}
            >
              <DesignedPrimaryButton
                onClick={() => {
                  setPersisData(form.getValues())
                }}
                disabled={isPaymentButtonDisabled}
                fullWidth
                isLoading={retestMutation.isPending || purchaseExam.isPending}
                btnSize='designed-md'
              >
                결제하기
              </DesignedPrimaryButton>
            </PaymentSection>
            {/* <DesignedPrimaryButton
             onClick={() => {
             console.log(form.formState.errors)
             }}
             fullWidth
             btnSize='designed-md'
             >
             결제하기
             </DesignedPrimaryButton> */}
          </Card>
        </Grid>
      </Grid>
      {/* <Dialog open={open} PaperProps={{ sx: { maxWidth: 560, width: '100%' } }}>
       <PaymentCompleteDialog orderInfo={orderInfo} {...{ onClose }} />
       </Dialog> */}
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

export default CertificationExamPayment
