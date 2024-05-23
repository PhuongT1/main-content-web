import { getActiveCategories } from '@/actions/apis/category.action'
import { userAtom } from '@/atoms/user'
import { Quill } from '@/components'
import { CATEGORY } from '@/constants/common.constant'
import { MENTOR_PRODUCT_TYPE } from '@/constants/mentor.constant'
import { Form, FormControl, FormField, FormItem, PrimaryCheckbox, SolidInput, Typography } from '@/elements'
import { DesignedPrimaryButton, SecondaryButton } from '@/elements/v2/button'
import { useDialog } from '@/hooks/use-dialog'
import { useHydrate } from '@/hooks/use-hydrate'
import { updateMyMentorProfile } from '@/services/mentoring.service'
import { color_gray } from '@/themes/system-palette'
import { IMentorProduct, IMentorProfile } from '@/types/mentoring.type'
import { convertToRem } from '@/utils/convert-to-rem'
import getCurrentUrl from '@/utils/get-current-url'
import { ChevronLeft } from '@mui/icons-material'
import { Avatar, Box, Divider, Grid, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import EditOptionCard from './edit-option-card'
import { EditAlert, ExceedingAlert } from '@/components/dialog'
import yup from '@/services/yup.service'
import { yupResolver } from '@hookform/resolvers/yup'

type ProfileEditProps = {
  onBack: Function
  profile: IMentorProfile | null
}

const defaultValues = {
  username: '',
  introduction: '',
  categories: [],
  nameOfAffiliation: '',
  otherInformation: '',
  position: ''
}

type FormType = {
  username: string
  introduction?: string
  categories: number[]
  nameOfAffiliation?: string
  otherInformation?: string
  position?: string
}

const ProfileEdit = ({ onBack, profile }: ProfileEditProps) => {
  const theme = useTheme()
  const mdDown = useMediaQuery(`(max-width: 768px)`)
  const lgUp = useMediaQuery('(min-width: 1200px)')
  const [key, setKey] = useState(Math.random().toString())
  const userData = useRecoilValue(userAtom)
  const { open: mentorDialogOpen, onClose: onCloseMentorDialog, onOpen: onOpenMentorDialog } = useDialog()
  // const [hydrate, setHydrate] = useState(false)
  const twentyMinutesOptionRef = useRef<any>()
  const fourtyMinutesOptionRef = useRef<any>()
  const anHourOptionRef = useRef<any>()
  const pathname = getCurrentUrl()
  const { open: openDialog, onClose: onCloseDialog, onOpen: onOpenDialog } = useDialog()
  const [twentyMinutesOption, setTwentyMinutesOption] = useState<IMentorProduct | null>(null)
  const [fourtyMinutesOption, setFourtyMinutesOption] = useState<IMentorProduct | null>(null)
  const [anHourOption, setAnHourOption] = useState<IMentorProduct | null>(null)
  const { data: mentoringCategories } = useQuery({
    queryKey: ['mentoring-categories'],
    queryFn: () => getActiveCategories({ type: CATEGORY.MENTORING })
  })

  const submitSaveMutate = useMutation({
    mutationFn: updateMyMentorProfile
  })

  const schema = yup
    .object({
      username: yup.string().required('아이디를 입력해주세요.'),
      categories: yup.array().required()
    })
    .required()
  const form = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })
  const categories: number[] = form.watch('categories')
  const username = form.watch('username')
  const position = form.watch('position')
  const nameOfAffiliation = form.watch('nameOfAffiliation')
  useHydrate()
  // useEffect(() => {
  //   setHydrate(true)
  // }, [hydrate])

  useEffect(() => {
    setKey(Math.random().toString())
  }, [pathname])

  useEffect(() => {
    if (profile !== null) {
      setTwentyMinutesOption(
        profile?.productContents?.find((item) => item?.product?.name === MENTOR_PRODUCT_TYPE.TWENTY_MINUTES) || null
      )
      setFourtyMinutesOption(
        profile?.productContents?.find((item) => item?.product?.name === MENTOR_PRODUCT_TYPE.FORTY_MINUTES) || null
      )
      setAnHourOption(
        profile?.productContents?.find((item) => item?.product?.name === MENTOR_PRODUCT_TYPE.AN_HOUR) || null
      )
      form.reset({
        username: profile?.username,
        introduction: profile.introduction,
        otherInformation: profile.otherInformation,
        nameOfAffiliation: profile.nameOfAffiliation,
        position: profile.position,
        categories: profile.categories?.map((i) => i.id)
      })
    }
  }, [profile])

  const handleSave = async () => {
    const twentyMinutesOptionData = twentyMinutesOptionRef?.current.getValue()
    const fourtyMinutesOptionData = fourtyMinutesOptionRef?.current.getValue()
    const anHourOptionData = anHourOptionRef?.current.getValue()
    if (
      !username ||
      !categories ||
      !position ||
      !nameOfAffiliation ||
      categories.length === 0 ||
      twentyMinutesOptionData.isValid === false ||
      fourtyMinutesOptionData.isValid === false ||
      anHourOptionData.isValid === false ||
      (twentyMinutesOptionData.enabled === false &&
        fourtyMinutesOptionData.enabled === false &&
        anHourOptionData.enabled === false)
    ) {
      onOpenMentorDialog()
      return
    }
    let productContents = []
    if (twentyMinutesOptionData && twentyMinutesOptionData.enabled !== false) {
      productContents.push({
        id: profile?.productContents.find((i) => i.product.name === MENTOR_PRODUCT_TYPE.TWENTY_MINUTES)?.id,
        code: profile?.productContents.find((i) => i.product.name === MENTOR_PRODUCT_TYPE.TWENTY_MINUTES)?.code,
        name: twentyMinutesOptionData.name,
        description: twentyMinutesOptionData.description,
        price: twentyMinutesOptionData.price,
        isSale: true
      })
    } else {
      const productOldData = profile?.productContents.find((i) => i.product.name === MENTOR_PRODUCT_TYPE.TWENTY_MINUTES)
      productContents.push({
        id: productOldData?.id || undefined,
        code: productOldData?.code || undefined,
        name: productOldData?.product.name || twentyMinutesOptionData.name || '',
        description: productOldData?.product.description || twentyMinutesOptionData.description || '',
        price: productOldData?.product.price || twentyMinutesOptionData.price || '',
        isSale: false
      })
    }

    if (fourtyMinutesOptionData && fourtyMinutesOptionData.enabled !== false) {
      productContents.push({
        id: profile?.productContents.find((i) => i.product.name === MENTOR_PRODUCT_TYPE.FORTY_MINUTES)?.id,
        code: profile?.productContents.find((i) => i.product.name === MENTOR_PRODUCT_TYPE.FORTY_MINUTES)?.code,
        name: fourtyMinutesOptionData.name,
        description: fourtyMinutesOptionData.description,
        price: fourtyMinutesOptionData.price,
        isSale: true
      })
    } else {
      const productOldData = profile?.productContents.find((i) => i.product.name === MENTOR_PRODUCT_TYPE.FORTY_MINUTES)
      productContents.push({
        id: productOldData?.id || undefined,
        code: productOldData?.code || undefined,
        name: productOldData?.product.name || fourtyMinutesOptionData.name || '',
        description: productOldData?.product.description || fourtyMinutesOptionData.description || '',
        price: productOldData?.product.price || fourtyMinutesOptionData.price || '',
        isSale: false
      })
    }

    if (anHourOptionData && anHourOptionData.enabled !== false) {
      productContents.push({
        id: profile?.productContents.find((i) => i.product.name === MENTOR_PRODUCT_TYPE.AN_HOUR)?.id,
        code: profile?.productContents.find((i) => i.product.name === MENTOR_PRODUCT_TYPE.AN_HOUR)?.code,
        name: anHourOptionData.name,
        description: anHourOptionData.description,
        price: anHourOptionData.price,
        isSale: true
      })
    } else {
      const productOldData = profile?.productContents.find((i) => i.product.name === MENTOR_PRODUCT_TYPE.AN_HOUR)
      productContents.push({
        id: productOldData?.id || undefined,
        code: productOldData?.code || undefined,
        name: productOldData?.product.name || anHourOptionData.name || '',
        description: productOldData?.product.description || anHourOptionData.description || '',
        price: productOldData?.product.price || anHourOptionData.price || '',
        isSale: false
      })
    }

    const submitData = {
      ...form.getValues(),
      categories: categories.map((i) => ({ id: i })),
      productContents: productContents
    }
    const { data, error } = await submitSaveMutate.mutateAsync(submitData)
    // setIsPublic((prev) => !prev)
    if (data) {
      onBack()
    }
  }
  const handleBack = () => {
    const twentyMinutesOptionData = twentyMinutesOptionRef?.current.getValue()
    const fourtyMinutesOptionData = fourtyMinutesOptionRef?.current.getValue()
    const anHourOptionData = anHourOptionRef?.current.getValue()
    const profileCategories = profile?.categories?.map((i) => i.id) || []
    if (
      form.formState?.isDirty ||
      username !== profile?.username ||
      categories.length !== profile.categories.length ||
      !categories.every((i) => profileCategories.includes(i)) ||
      !profileCategories.every((i) => categories.includes(i)) ||
      twentyMinutesOptionData.isDirty ||
      fourtyMinutesOptionData.isDirty ||
      anHourOptionData.isDirty
    ) {
      onOpenDialog()
    } else {
      onBack()
    }
  }

  return (
    <Box display='flex' flexDirection='column' key={key} gap={lgUp ? 5 : 4}>
      <Form {...form}>
        <Box
          display='flex'
          justifyContent={'flex-start'}
          flexDirection={'column'}
          gap={lgUp ? 6 : 3}
          pb={lgUp ? 6 : 3}
          borderBottom={'1px solid ' + theme.palette.main_grey.gray700}
        >
          <Stack
            alignItems={'center'}
            justifyContent={'space-between'}
            direction={{ md: 'row', sm: 'column' }}
            pb={2}
            gap={mdDown ? 6 : 0}
          >
            <Stack
              direction={lgUp || mdDown ? 'row' : 'column'}
              justifyContent={'space-between'}
              width={'100%'}
              alignItems={lgUp || mdDown ? 'center' : 'flex-start'}
            >
              <Typography cate={mdDown ? 'title_50' : 'title_70'}>멘토 프로필 작성</Typography>
            </Stack>
          </Stack>
          <Box
            display={'flex'}
            justifyContent={'flex-start'}
            flexDirection={mdDown ? 'column' : 'row'}
            alignItems={mdDown ? 'center' : 'flex-start'}
            width={'100%'}
            gap={mdDown ? 3 : 7.5}
          >
            <Box position={'relative'}>
              <Avatar
                src={userData && userData.avatar ? userData.avatar.url : '/images/blank-user.png'}
                sx={{ width: 160, height: 160 }}
              />
              {/* <IconButtonSizes onClick={() => {}} btnSize='fit' sx={{ position: 'absolute', bottom: '0', right: '0' }}>
              <CameraIcon />
            </IconButtonSizes> */}
            </Box>
            <Stack direction={'column'} width={'100%'} gap={lgUp ? 2 : 3}>
              <Stack
                alignItems={mdDown ? 'flex-start' : 'center'}
                direction={mdDown ? 'column' : 'row'}
                gap={mdDown ? 1 : 2.5}
              >
                <Typography
                  cate='body_30'
                  color={color_gray[100]}
                  flexShrink={0}
                  width={mdDown ? '100%' : convertToRem(68)}
                >
                  멘토 이름
                  <Typography cate={'body_30'} component={'span'} plainColor='sub.red500'>
                    *
                  </Typography>
                </Typography>
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem
                      style={{
                        flex: 1,
                        width: '100%'
                      }}
                    >
                      <FormControl sx={{ mt: 0 }}>
                        <SolidInput
                          inputProps={{
                            maxLength: 40
                          }}
                          fullWidth
                          inputSize='md'
                          placeholder='한줄 소개를 입력해주세요. (글자 수 40자 제한)'
                          sx={{}}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Stack>
              <Stack
                alignItems={mdDown ? 'flex-start' : 'center'}
                direction={mdDown ? 'column' : 'row'}
                gap={mdDown ? 1 : 2.5}
              >
                <Typography
                  cate='body_30'
                  color={color_gray[100]}
                  flexShrink={0}
                  width={mdDown ? '100%' : convertToRem(68)}
                >
                  한줄 소개
                </Typography>

                <FormField
                  control={form.control}
                  name='otherInformation'
                  render={({ field }) => (
                    <FormItem
                      style={{
                        flex: 1,
                        width: '100%'
                      }}
                    >
                      <FormControl sx={{ mt: 0 }}>
                        <SolidInput
                          inputProps={{
                            maxLength: 40
                          }}
                          fullWidth
                          inputSize='md'
                          placeholder='한줄 소개를 입력해주세요. (글자 수 40자 제한)'
                          sx={{}}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Stack>
              <Stack alignItems={'flex-start'} direction={mdDown ? 'column' : 'row'} gap={mdDown ? 1 : 2.5}>
                <Typography
                  cate='body_30'
                  mt={mdDown ? 0 : 1}
                  color={color_gray[100]}
                  flexShrink={0}
                  width={mdDown ? '100%' : convertToRem(68)}
                >
                  전문 분야
                </Typography>
                <Grid container display='flex' rowSpacing={1} columnSpacing={2} direction={'row'} flexWrap={'wrap'}>
                  {mentoringCategories?.data?.map(({ id, name }: any) => {
                    return (
                      <Grid
                        item
                        xs={mdDown ? 6 : undefined}
                        display={'flex'}
                        key={id}
                        direction={'row'}
                        alignItems={'center'}
                      >
                        <PrimaryCheckbox
                          onClick={() => {
                            if (categories.includes(id)) {
                              const newCategories = categories.filter((item) => item !== id)
                              form.setValue('categories', newCategories)
                            } else {
                              form.setValue('categories', [...categories, id])
                            }
                          }}
                          checked={categories.includes(id)}
                        />
                        <Typography cate='body_30'>{name}</Typography>
                      </Grid>
                    )
                  })}
                </Grid>
              </Stack>
              <Grid container columnSpacing={6} rowSpacing={mdDown ? 3 : 0}>
                <Grid
                  xs={12}
                  xl={6}
                  item
                  display={'flex'}
                  alignItems={mdDown ? 'flex-start' : 'center'}
                  direction={mdDown ? 'column' : 'row'}
                  gap={mdDown ? 1 : 2.5}
                >
                  <Typography
                    cate='body_30'
                    color={color_gray[100]}
                    flexShrink={0}
                    width={mdDown ? '100%' : convertToRem(68)}
                  >
                    소속명
                    <Typography cate={'body_30'} component={'span'} plainColor='sub.red500'>
                      *
                    </Typography>
                  </Typography>
                  <FormField
                    control={form.control}
                    name='nameOfAffiliation'
                    render={({ field }) => (
                      <FormItem
                        style={{
                          flex: 1,
                          width: '100%'
                        }}
                      >
                        <FormControl mt={0}>
                          <SolidInput
                            inputProps={{
                              maxLength: 40
                            }}
                            fullWidth
                            inputSize='md'
                            placeholder='한줄 소개를 입력해주세요. (글자 수 40자 제한)'
                            sx={{}}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Grid>
                <Grid
                  xs={12}
                  xl={6}
                  item
                  display={'flex'}
                  alignItems={mdDown ? 'flex-start' : 'center'}
                  direction={mdDown ? 'column' : 'row'}
                  gap={mdDown ? 1 : 2.5}
                >
                  <Typography cate='body_30' color={color_gray[100]} flexShrink={0} width={'fit-content'}>
                    직책
                    <Typography cate={'body_30'} component={'span'} plainColor='sub.red500'>
                      *
                    </Typography>
                  </Typography>
                  <FormField
                    control={form.control}
                    name='position'
                    render={({ field }) => (
                      <FormItem
                        style={{
                          flex: 1,
                          width: '100%'
                        }}
                      >
                        <FormControl mt={0}>
                          <SolidInput
                            inputProps={{
                              maxLength: 40
                            }}
                            fullWidth
                            inputSize='md'
                            placeholder='한줄 소개를 입력해주세요. (글자 수 40자 제한)'
                            sx={{}}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Box>
        <Stack direction={'column'} gap={2}>
          <Typography cate={mdDown ? 'title_40' : 'title_70'}>멘토링 소개 작성</Typography>
          <FormField
            control={form.control}
            name='introduction'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Quill
                    placeholder='진행할 멘토링에 대한 소개를 작성해주세요.'
                    containerSx={{ height: { xs: 232, md: 312 } }}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </Stack>
        <Stack
          direction={'column'}
          gap={2}
          padding={!lgUp ? 2 : 3}
          paddingTop={!lgUp ? 4 : 5}
          borderRadius={1}
          border={`1px solid ` + theme.palette.main_grey.gray700}
        >
          <Typography cate={mdDown ? 'title_40' : 'title_70'}>
            멘토링 옵션 설정
            <Typography cate={mdDown ? 'title_40' : 'title_70'} component={'span'} plainColor='sub.red500'>
              *
            </Typography>
          </Typography>
          <Typography cate={mdDown ? 'body_20' : 'sub_title_30'} color={color_gray[200]}>
            실제 활동 가능한 멘토링 옵션을 선택해주세요.
          </Typography>
          <Box
            sx={{
              maxWidth: '1416px',
              display: 'flex',
              flexDirection: !lgUp ? 'column' : 'row',
              gap: 2
            }}
          >
            <EditOptionCard
              sx={{ width: '100%' }}
              ref={twentyMinutesOptionRef}
              name={MENTOR_PRODUCT_TYPE.TWENTY_MINUTES}
              isSale={twentyMinutesOption?.product?.isSale || false}
              price={twentyMinutesOption?.product?.price || 0}
              description={twentyMinutesOption?.product.description || ''}
            />
            <EditOptionCard
              sx={{ width: '100%' }}
              ref={fourtyMinutesOptionRef}
              name={MENTOR_PRODUCT_TYPE.FORTY_MINUTES}
              isSale={fourtyMinutesOption?.product?.isSale || false}
              price={fourtyMinutesOption?.product?.price || 0}
              description={fourtyMinutesOption?.product.description || ''}
            />
            <EditOptionCard
              sx={{ width: '100%' }}
              ref={anHourOptionRef}
              name={MENTOR_PRODUCT_TYPE.AN_HOUR}
              isSale={anHourOption?.product?.isSale || false}
              price={anHourOption?.product?.price || 0}
              description={anHourOption?.product.description || ''}
            />
          </Box>
        </Stack>
        <Box
          width={'100%'}
          py={lgUp ? 4 : 2.5}
          px={lgUp ? 3 : 2}
          border={'1px solid ' + color_gray[600]}
          borderRadius={1}
          gap={2}
          display={'flex'}
          flexDirection={'column'}
        >
          <Typography cate='sub_title_40'>멘토링 진행 안내</Typography>
          <Box display={'flex'} flexDirection={'column'}>
            <Typography color={color_gray[200]} cate='body_30'>
              • 진행되는 멘토링 형식은 20분, 40분 화상 멘토링, 1시간 대면 멘토링으로 지정되어있습니다.
            </Typography>
            <Typography color={color_gray[200]} cate='body_30'>
              • 멘토링 진행에 관한 문의사항은 관리자 채널톡을 이용해주세요.
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ width: '100%', border: `${!lgUp ? 0 : 0.5}px solid ` + theme.palette.main_grey.gray700 }} />
      </Form>
      <Stack
        direction={'row'}
        justifyContent={{ md: 'space-between', sm: 'center' }}
        alignItems={'center'}
        width={'100%'}
        gap={1}
      >
        <SecondaryButton
          btnSize={mdDown ? 'designed-md' : 'xs-np'}
          fullWidth={mdDown}
          action={handleBack}
          sx={{ borderRadius: { md: '99px', sm: '8px' }, minWidth: convertToRem(121), gap: 1 }}
        >
          <ChevronLeft
            sx={{
              height: convertToRem(20),
              width: convertToRem(20),
              color: 'main_grey.gray300'
            }}
          />
          <Typography plainColor='main_grey.gray200' cate='button_20'>
            이전으로
          </Typography>
        </SecondaryButton>
        <DesignedPrimaryButton
          btnSize='designed-md'
          fullWidth={mdDown}
          sx={{
            minWidth: convertToRem(160)
          }}
          onClick={handleSave}
        >
          변경사항 저장
        </DesignedPrimaryButton>
      </Stack>
      <ExceedingAlert
        onSubmit={() => {
          onCloseDialog()
          onBack()
        }}
        submitTxt={'확인'}
        cancelTxt={'취소'}
        onCancel={(event?: any) => {
          onCloseDialog()
        }}
        title={'변경사항이 저장되지 않습니다.'}
        description={`확인을 누를 경우, 변경사항이 저장되지 않으며 복구되지 않습니다.
        진행하시겠습니까?`}
        open={openDialog}
      />
      <EditAlert
        onSubmit={async () => {
          onCloseMentorDialog()
          // setExpanded(false)
          // setIsAnonymous(false)
          // setCategoryValue(categories[1]?.id)
          // form.reset()
        }}
        submitTxt={'확인'}
        title={'모든 항목을 입력해 주세요.'}
        // description={`아직 프로필 등록이 되지 않아, 커뮤니티 멘토링에 노출되지 않고 있습니다.\n프로필을 등록하고 멘토링 활동을 시작해보세요.`}
        open={mentorDialogOpen}
      />
    </Box>
  )
}

export default ProfileEdit
