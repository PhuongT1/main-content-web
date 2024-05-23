'use client'

import { Card, ConfirmAlert, EditablePhoneField, ExceedingAlert, TermList } from '@/components'
import PaymentSection, { DEFAULT_PAYMENT_REQUEST_PAYLOAD } from '@/components/payment'
import { IMAGE_FOLDER } from '@/constants/common.constant'
import {
  EDUCATIONAL_APPLY_TERMS,
  EVENT_APPLICATION_NOTIFICATION
} from '@/constants/community/educational-event.constant'
import {
  BaseImage,
  CustomInput,
  DesignedPrimaryButton,
  DesignedSecondaryButton,
  Divider,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Orange400Chip,
  SelectStack,
  Typography,
  Upload
} from '@/elements'
import { ProductDetailWrapper } from '@/hocs'
import useCouponMenuItems from '@/hooks/use-coupon-menu-items'
import { useDialog } from '@/hooks/use-dialog'
import { useUserProfile } from '@/hooks/use-user-profile'
import {
  applyEvent,
  checkApplication,
  getActiveEducationalEventDetail,
  TApplyEventPayload
} from '@/services/educational-event.service'
import { uploadFile } from '@/services/file.service'
import { createOrder, CreateOrderPayload, getOrderId } from '@/services/order.service'
import yup from '@/services/yup.service'
import { NestedFile } from '@/types/classes/nested-file.class'
import { Coupon, COUPON_REFERENCE_TYPE } from '@/types/coupon.type'
import { PAYMENT_TYPE, PaymentInfo, PaymentSuccessResponse, TAdditionalMeta } from '@/types/payment.type'
import { PageParams } from '@/types/types.type'
import { res2ui } from '@/utils/date'
import { calcCouponValue, calcPriceWithCoupon } from '@/utils/pages/coupon.util'
import { getRequestPaymentPayload } from '@/utils/pages/order.util'
import { formatCurrency } from '@/utils/string'
import { emailValidator, phoneOptionalValidator } from '@/utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, Stack } from '@mui/material'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { EducationalContext } from '../../context/educational-context'

const EDUCATION_URL = '/community/educational-event-and-support-project/educational-event-list'

type Attached = {
  fileList?: FileList
  nestedFile?: NestedFile
}

export interface PaymentForm {
  name: string
  contact: string
  email: string
  teamName?: string
  oneLineIdea?: string
  otp?: string
  attached?: Attached
}

const schema = yup.object({
  name: yup.string().noOnlySpaces().required(),
  contact: yup
    .string()
    .noOnlySpaces()
    .required()
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
  teamName: yup.string().noOnlySpaces(),
  otp: yup.string(),
  oneLineIdea: yup.string().noOnlySpaces(),
  attached: yup.mixed<Attached>()
})

const defaultValues = {
  name: '',
  contact: '',
  email: '',
  teamName: '',
  oneLineIdea: '',
  otp: '',
  attached: {
    fileList: undefined,
    nestedFile: new NestedFile()
  }
}

const QUANTITY = 1
type TCreateOrderFunction = (meta?: TAdditionalMeta) => Promise<void>
const EducationalPayment = ({ params: { id } }: PageParams<{ id: string }>) => {
  const router = useRouter()
  const { user } = useUserProfile()
  const queryData = useSearchParams()
  const { handleDirty } = EducationalContext.useContextHook()
  const [waitingIndex, setWaitingIndex] = useState(0)
  const [isCheckAll, setCheckAll] = useState(false)
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>()
  const [isPhoneValid, setPhoneValid] = useState(user?.isPhoneNumberVerified)
  const [orderPayload, setOrderPayload] = useState<CreateOrderPayload>({} as CreateOrderPayload)
  const [paymentResponse, setPaymentResponse] = useState<PaymentSuccessResponse>()
  const { onOpen: onOpenExceeding, open: openExceeding, onClose: onCloseExceeding } = useDialog()
  const { onOpen: onOpenFull, open: openFull, onClose: onCloseFull } = useDialog()
  const { onOpen: onOpenConfirm, open: openConfirm, onClose: onCloseConfirm } = useDialog()
  const { onOpen: onOpenWaiting, open: openWaiting, onClose: onCloseWaiting } = useDialog()
  const queryClient = new QueryClient()
  const { coupon, setCoupon, myCoupons, handleSetPrice } = useCouponMenuItems(+id, {
    referenceProductType: COUPON_REFERENCE_TYPE.EVENT,
    productId: +id
  })
  const { data: event } = useQuery({
    queryKey: [`event-detail`],
    queryFn: () => {
      return getActiveEducationalEventDetail(+id)
    }
  })

  const getOrderIdAct = useMutation({
    mutationFn: getOrderId
  })

  console.log(event)

  const form = useForm<PaymentForm>({
    defaultValues
    // resolver: yupResolver(schema)
  })

  const { isDirty } = form.formState

  //Query
  const preOrderId = queryData.get('preOrderId')

  //Variable
  const CALLBACK_URL = `${EDUCATION_URL}/${id}/payment`
  const { price: eventPrice = 0, productContent } = event?.data || {}
  const { id: productContentId } = productContent || {}

  const isDisabledApplyBtn = !form.formState.isValid || !isCheckAll || !isPhoneValid
  const totalAmount = eventPrice * QUANTITY
  const couponValue = calcCouponValue({
    price: eventPrice,
    coupon: coupon?.value || 0,
    type: coupon?.type,
    maxValue: coupon?.maxValue
  })
  const lastPrice = calcPriceWithCoupon({
    price: eventPrice,
    coupon: coupon?.value || 0,
    type: coupon?.type,
    quantity: QUANTITY,
    maxValue: coupon?.maxValue
  })

  const popupHandler = useMemo(
    () => ({
      [EVENT_APPLICATION_NOTIFICATION.FULL]: () => onOpenFull(),
      [EVENT_APPLICATION_NOTIFICATION.APPLICANT]: () => onOpenConfirm(),
      [EVENT_APPLICATION_NOTIFICATION.WAITING]: () => onOpenWaiting()
    }),
    []
  )
  const { mutateAsync } = useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload)
  })

  const applyEventAct = useMutation({
    mutationFn: applyEvent
  })

  const checkApplicationAct = useMutation({
    mutationFn: checkApplication
  })

  const uploadFileAct = useMutation({
    mutationFn: uploadFile
  })

  const onCheckApplication = async (createOrderFn: TCreateOrderFunction) => {
    const checkResult = await checkApplicationAct.mutateAsync({ eventId: +id })
    if (checkResult?.data?.status === EVENT_APPLICATION_NOTIFICATION.WAITING) {
      setWaitingIndex(checkResult?.data?.indexWaiting || 0)
      onOpenExceeding()
    } else if (checkResult?.data?.status === EVENT_APPLICATION_NOTIFICATION.FULL) {
      onOpenFull()
    } else {
      const meta = await generateLinkPayload()
      createOrderFn?.({
        meta: meta
      })
    }
  }

  const generateLinkPayload = async () => {
    const values = form.getValues()
    let attachmentId
    if (values?.attached?.fileList?.[0]) {
      const { data } = await uploadFileAct.mutateAsync({
        file: values?.attached?.fileList?.[0],
        folder: IMAGE_FOLDER.EVENT
      })
      attachmentId = data.id
    }
    const payload: TApplyEventPayload = {
      eventId: +id!,
      nickname: values.name,
      phoneNumber: values?.contact?.replaceAll('-', ''),
      email: values.email,
      ...(values.teamName && {
        companyName: values?.teamName
      }),
      ...(values.oneLineIdea && {
        idea: values?.oneLineIdea
      }),
      ...(attachmentId && {
        attachmentId
      })
    }
    return payload
  }

  const onBack = () => {
    queryClient.resetQueries({
      queryKey: ['active-events']
    })
    router.push(EDUCATION_URL)
  }

  const onSubmitJoinWaitingList = async () => {
    onCloseExceeding()
    const meta = await generateLinkPayload()
    const orderResData = await mutateAsync({
      ...orderPayload,
      meta: meta
    })
    if (orderResData?.data?.id) {
      onOpenWaiting()
    }
  }

  useEffect(() => {
    handleSetPrice(event?.data?.price || 0)
  }, [event])

  useEffect(() => {
    if (user) {
      const { email = '', nickname = '' } = user
      form.setValue('email', email)
      form.setValue('name', nickname)
      form.trigger('name')
    }
  }, [user])

  useEffect(() => {
    handleDirty(isDirty)
  }, [isDirty])

  // useEffect(() => {
  //   const openPaymentGateway = async () => {
  //     if (eventPrice > 0 && preOrderId) {
  //       const orderResData = await getOrderIdAct.mutateAsync(preOrderId)
  //       const orderData = orderResData?.data || {}
  //       if (orderData?.eventApplicationsId) {
  //         onBack()
  //       } else {
  //         const { productId, quantity, price, totalAmount, lastTotalAmount, type, couponId, productContentId } =
  //           orderData
  //         const orderPayload = {
  //           productId: productId,
  //           productContentId: productContentId,
  //           quantity: quantity,
  //           //price of product
  //           price: price,
  //           //"quantity * price"
  //           totalAmount: totalAmount,
  //           // "quantity * price - coupon (if have)"
  //           lastTotalAmount: lastTotalAmount,
  //           type: PAYMENT_TYPE.EVENT,
  //           ...(coupon?.id && {
  //             couponId: coupon.id
  //           })
  //         }
  //         setOrderPayload(orderPayload)
  //         const paymentInfo = getRequestPaymentPayload(DEFAULT_PAYMENT_REQUEST_PAYLOAD, orderData, CALLBACK_URL)
  //         setPaymentInfo(paymentInfo)
  //       }
  //     }
  //   }
  //   openPaymentGateway()
  // }, [event])

  useEffect(() => {
    const orderPayload = {
      productId: +id,
      productContentId: productContentId,
      quantity: QUANTITY,
      //price of product
      price: eventPrice,
      //"quantity * price"
      totalAmount: totalAmount,
      // "quantity * price - coupon (if have)"
      lastTotalAmount: lastPrice,
      type: PAYMENT_TYPE.EVENT,
      ...(coupon?.id && {
        couponId: coupon.id
      })
    }
    setOrderPayload(orderPayload)
  }, [event, coupon])

  return (
    <Box>
      <Typography
        sx={{
          mt: {
            md: 0,
            xs: 4
          }
        }}
        cate='title_70'
        breakpoints={{
          md: 'title_50'
        }}
        plainColor='main_grey.gray100'
      >
        교육행사 신청
      </Typography>
      <Grid
        container
        spacing={{
          md: 3,
          xs: 3
        }}
        mt={{
          md: 2,
          xs: 0
        }}
      >
        <Grid item xs={12} xl={6}>
          <Card
            sx={{
              px: {
                md: 3,
                xs: 2
              },
              py: 3
            }}
          >
            <Typography cate='title_40' plainColor='main_grey.gray100'>
              교육행사 정보
            </Typography>
            <Box
              mt={2}
              display={'flex'}
              sx={{
                flexDirection: {
                  lg: 'row',
                  xs: 'column'
                },
                gap: {
                  md: 3,
                  xs: 2
                }
              }}
            >
              <Box
                height={170}
                sx={{
                  width: {
                    lg: 170,
                    xs: '100%'
                  }
                }}
              >
                <BaseImage
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 8
                  }}
                  src={event?.data?.thumbnail.baseUrl || ''}
                  alt={`thumbnail`}
                />
              </Box>
              <Box flexGrow={1} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                <Box>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography cate='body_30' plainColor='sub.teal400'>
                      {event?.data?.category.name || ''}
                    </Typography>
                    <Orange400Chip label={event?.data?.deadlineDate} />
                  </Box>
                  <Typography mt={1} cate='title_50' plainColor='main_grey.gray100'>
                    {event?.data?.title || ''}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: {
                      lg: 0,
                      xs: 2
                    }
                  }}
                >
                  <Box display={'flex'} gap={1}>
                    <Typography cate='sub_title_30' plainColor='main_primary.blue300'>
                      접수기간
                    </Typography>
                    <Typography cate='body_30' plainColor='main_grey.gray200'>
                      {res2ui(event?.data?.startTimeRegistration || '')} ~{' '}
                      {res2ui(event?.data?.endTimeRegistration || '')}
                    </Typography>
                  </Box>
                  <Box mt={0.5} display={'flex'} gap={1}>
                    <Typography cate='sub_title_30' plainColor='main_primary.blue300'>
                      행사기간
                    </Typography>
                    <Typography cate='body_30' plainColor='main_grey.gray200'>
                      {res2ui(event?.data?.startTime || '')} ~ {res2ui(event?.data?.endTime || '')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
        {/* Term for Web */}
        <Grid
          sx={{
            display: {
              lg: 'block',
              xs: 'none'
            }
          }}
          item
          xs={12}
          xl={6}
        >
          <TermList
            onChange={(value) => setCheckAll(value)}
            data={[
              {
                title: '만 14세 이상입니다.',
                content:
                  '서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 서비스의 이용과 관련하여 서비스를 제공하는 주식회사와 이를 이용하는 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다. 서비스를 이용하시거나 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다. 기본적으로 여러분 모두에게 ',
                required: true
              },
              {
                title: '개인정보 수집 동의',
                content:
                  '서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 서비스의 이용과 관련하여 서비스를 제공하는 주식회사와 이를 이용하는 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다. 서비스를 이용하시거나 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다. 기본적으로 여러분 모두에게 ',
                required: true
              },
              {
                title: '서비스 이용약관 동의',
                content:
                  '서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 서비스의 이용과 관련하여 서비스를 제공하는 주식회사와 이를 이용하는 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다. 서비스를 이용하시거나 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다. 기본적으로 여러분 모두에게 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다. 기본적으로 여러분 모두에게 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다. 기본적으로 여러분 모두에게 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다. 기본적으로 여러분 모두에게 ',
                required: true
              },
              {
                title: '전자결제대행 이용 동의',
                content:
                  '서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 서비스의 이용과 관련하여 서비스를 제공하는 주식회사와 이를 이용하는 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다. 서비스를 이용하시거나 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다. 기본적으로 여러분 모두에게 ',
                required: true
              }
            ]}
          />
        </Grid>
        <Grid item xs={12} xl={6}>
          <Card
            sx={{
              px: {
                md: 3,
                xs: 2
              },
              py: 3
            }}
          >
            <Typography cate='title_40' plainColor='main_grey.gray100'>
              신청자 정보
            </Typography>
            <Box mt={3}>
              <Form {...form}>
                <Box
                  component={'form'}
                  display={'flex'}
                  sx={{
                    gap: 3,
                    mt: 3
                  }}
                  flexDirection={'column'}
                  onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                      e.preventDefault()
                      return false
                    }
                  }}
                >
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem sx={{ maxWidth: 696 }}>
                        <FormLabel required plainColor='main_grey.gray100'>
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
                      <FormItem sx={{ maxWidth: 696 }}>
                        <FormLabel required>이메일</FormLabel>
                        <FormControl>
                          <CustomInput maxLength={30} fullWidth placeholder='이메일을 입력해주세요' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='teamName'
                    render={({ field }) => (
                      <FormItem sx={{ maxWidth: 696 }}>
                        <FormLabel>기업(팀)/팀원명</FormLabel>
                        <FormControl>
                          <CustomInput
                            maxLength={30}
                            fullWidth
                            placeholder='기업(팀)/팀원명을 입력해 주세요.'
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='oneLineIdea'
                    render={({ field }) => (
                      <FormItem sx={{ maxWidth: 696 }}>
                        <FormLabel>한 줄 아이디어</FormLabel>
                        <FormControl>
                          <CustomInput
                            maxLength={30}
                            fullWidth
                            placeholder='한 줄 아이디어를 입력해 주세요.'
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='attached'
                    render={({ field }) => (
                      <FormItem sx={{ maxWidth: 696 }}>
                        <FormLabel>첨부파일</FormLabel>
                        <FormControl
                          sx={{
                            display: 'flex',
                            gap: 1,
                            flexDirection: {
                              lg: 'row',
                              xs: 'column'
                            }
                          }}
                        >
                          <CustomInput
                            name=''
                            disabled
                            maxLength={30}
                            fullWidth
                            value={field?.value?.nestedFile?.getLocalFiles?.[0].name || ''}
                          />
                          <DesignedSecondaryButton
                            btnSize='designed-md'
                            sx={{
                              width: {
                                lg: 160,
                                xs: '100%'
                              },
                              flexShrink: 0
                            }}
                          >
                            <Typography cate='button_30' plainColor='main_grey.gray100'>
                              파일 첨부하기
                            </Typography>
                            <Upload
                              name={field.name}
                              checkFileType={false}
                              accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/x-hwp,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,image/*'
                              value={field?.value?.nestedFile?.getLocalFiles}
                              onChange={(fileList: FileList) => {
                                const newObj = { ...field.value, fileList }
                                newObj.nestedFile?.addLocalFile(fileList)
                                field.onChange(newObj)
                              }}
                            />
                          </DesignedSecondaryButton>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Box>
              </Form>
            </Box>
          </Card>
        </Grid>
        {/* Term for Mobile */}
        <Grid
          sx={{
            display: {
              lg: 'none',
              xs: 'block'
            }
          }}
          item
          xs={12}
          xl={6}
        >
          <TermList onChange={(value) => setCheckAll(value)} data={EDUCATIONAL_APPLY_TERMS} />
        </Grid>
        <Grid item xs={12} xl={6}>
          <Card
            sx={{
              px: {
                md: 3,
                xs: 2
              },
              py: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}
          >
            <Typography cate='title_40' plainColor='main_grey.gray100'>
              신청 정보
            </Typography>
            <Divider sx={{ bgcolor: 'main_grey.gray700' }} />
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography cate='body_40' plainColor='main_grey.gray100'>
                {event?.data.title}
              </Typography>
              <Typography cate='title_60' plainColor='main_grey.gray50'>
                {formatCurrency(eventPrice)}
              </Typography>
            </Box>
            <Stack gap={2}>
              <Typography cate='body_40' plainColor='sub.orange10'>
                적용 가능한 할인 쿠폰 {myCoupons.length}개
              </Typography>
              <Stack direction={'row'} justifyContent={'space-between'}>
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
                <Typography textAlign={'right'} my='auto' flexBasis={'50%'} cate='body_40' plainColor='sub.red500'>
                  {formatCurrency(couponValue)}
                </Typography>
              </Stack>
            </Stack>
            <Divider sx={{ bgcolor: 'main_grey.gray700' }} />
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Typography cate='subtitle_1' plainColor='main_grey.gray100'>
                최종 결제 금액
              </Typography>
              <Typography cate='title_60' plainColor='main_grey.gray100'>
                {formatCurrency(lastPrice)}
              </Typography>
            </Stack>
            <PaymentSection
              openSuccessPopup={false}
              preprocessFn={(fn) => {
                onCheckApplication(fn)
              }}
              onSuccess={(e) => {
                const data = e?.data?.data?.data as { status: EVENT_APPLICATION_NOTIFICATION }
                const action = popupHandler[data.status]
                action()
              }}
              callBackUrl={CALLBACK_URL}
              backUrl={preOrderId ? EDUCATION_URL : ''}
              {...{ paymentInfo, orderPayload }}
            >
              <DesignedPrimaryButton disabled={isDisabledApplyBtn} btnSize='designed-md' fullWidth>
                신청하기
              </DesignedPrimaryButton>
            </PaymentSection>
          </Card>
        </Grid>
      </Grid>
      {/* Popup */}
      {/* Exceeding popup */}
      <ExceedingAlert
        title='현재 접수 인원이 초과되었습니다.'
        description='신청 대기로 접수하시겠습니까?'
        onCancel={onCloseExceeding}
        onSubmit={onSubmitJoinWaitingList}
        open={openExceeding}
        submitTxt='대기 접수하기'
        cancelTxt='취소'
      />
      {/* Full no waiting */}
      <ExceedingAlert
        title='신청 인원이 마감되었습니다.'
        description='대기 신청이 불가능한 교육 행사입니다.'
        onSubmit={onCloseFull}
        open={openFull}
        submitTxt='확인'
      />
      {/* Application is waiting */}
      <ConfirmAlert
        title='신청 대기 접수가 완료되었습니다.'
        description={`대기번호：${waitingIndex}번`}
        onSubmit={() => {
          onCloseWaiting()
          onBack()
        }}
        open={openWaiting}
        submitTxt='확인'
      />
      {/* Application is complete */}
      <ConfirmAlert
        title='신청이 완료되었습니다.'
        onSubmit={() => {
          onCloseConfirm()
          onBack()
        }}
        open={openConfirm}
        submitTxt='확인'
      />
    </Box>
  )
}

export default ProductDetailWrapper({ component: EducationalPayment })
