'use client'
import CameraUpdate from '@/assets/icons/camera-update'
import LogoutRedIcon from '@/assets/icons/dialog-icons/logout-red'
import PhoneRedIcon from '@/assets/icons/dialog-icons/phone-red'
import MailIcon from '@/assets/icons/mail'
import PhoneIcon from '@/assets/icons/phone'
import UserIcon from '@/assets/icons/user'
import VariantIcon from '@/assets/icons/variant'
import { loadingAtom } from '@/atoms/loading'
import { userAtom } from '@/atoms/user'
import { userProfileAtom } from '@/atoms/user-profile-state'
import CountDownTimer from '@/components/countdown-timer'
import { PrimaryButton, SecondaryButton } from '@/elements'
import AlertPopup from '@/elements/alert-popup'
import ButtonCustom from '@/elements/button'
import ControlInput from '@/elements/control-input'
import InputPhoneNumber from '@/elements/input-phone-number'
import MenuItem from '@/elements/menu-item'
import Select from '@/elements/select'
import Typography from '@/elements/typography'
import { logout, sendOtp, sendVerifyEmail, verifyOtp } from '@/services/auth.service'
import { getCountries } from '@/services/country.service'
import { uploadFile } from '@/services/file.service'
import { IResponse } from '@/types/response.types'
import { ICountry, IFile } from '@/types/user.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { emailOptionalValidator, otpValidator, passwordNewValidator, phoneOptionalValidator } from '@/utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Divider, Grid, Stack, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import Image from 'next/legacy/image'
import { enqueueSnackbar } from 'notistack'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Controller, useForm, ValidationMode } from 'react-hook-form'
import { useRecoilState, useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import WithdrawPopup from '../_components/withdraw-popup'
import { deleteUserProfile, getUserProfile, updateUserProfile } from '@/actions/apis/user.action'

const schema = yup.object().shape({
  nickname: yup.string().required('이름을 입력해주세요.'),
  email: yup.string().test('email', '이미 사용 중인 이메일입니다.', (value?: string) => emailOptionalValidator(value)),
  password: yup
    .string()
    .test('password', '영문, 숫자, 특수문자를 모두 포함하여 8글자 이상 입력해 주세요.', (value?: string) =>
      passwordNewValidator(value)
    ),
  newPassword: yup
    .string()
    .trim()
    .test('newPassword', '영문, 숫자, 특수문자를 모두 포함하여 8글자 이상 입력해 주세요.', (value?: string) =>
      passwordNewValidator(value)
    ),
  confirmPassword: yup
    .string()
    .trim()
    .test('confirmPassword', '영문, 숫자, 특수문자를 모두 포함하여 8글자 이상 입력해 주세요.', (value?: string) =>
      passwordNewValidator(value)
    )
    .oneOf([yup.ref('newPassword')], '비밀번호가 일치하지 않습니다. 확인 후 다시 시도해주세요'),
  phoneNumber: yup
    .string()
    .trim()
    .test('phoneNumber', '전화번호 형식에 맞지 않습니다.', (value?: string) => phoneOptionalValidator(value)),
  username: yup.string().trim(),
  otp: yup.string().trim(),
  countryId: yup.number()
})

const defaultValues: {
  nickname: string
  password: string
  newPassword: string
  confirmPassword: string
  email: string
  countryId?: number
  phoneNumber: string
  username?: string
  otp?: string
} = {
  nickname: '',
  password: '',
  newPassword: '',
  confirmPassword: '',
  countryId: 0,
  email: '',
  phoneNumber: '',
  username: '',
  otp: ''
}

const UserProfile = () => {
  const theme = useTheme()
  const query = useQueryClient()

  const setUser = useSetRecoilState(userAtom)
  const setLoading = useSetRecoilState(loadingAtom)
  const [profileState, setProfileState] = useRecoilState(userProfileAtom)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const [countries, setCountries] = useState<ICountry[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [errorTitle, setErrorTitle] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)
  const [isWaitingOTP, setIsWaitingOTP] = useState<boolean>(false)
  const [showPhoneValidate, setShowPhoneValidate] = useState<boolean>(false)
  const [showWithdrawPopup, setShowWithdrawPopup] = useState<boolean>(false)
  const [seconds, setSeconds] = useState<number>(0)
  const [endedCountdown, setEndedCountdown] = useState<boolean>(false)
  const inputFile = useRef<any>(null)
  const [uploadedImage, setUploadedImage] = useState<IFile | null>()
  const mdUp = useMediaQuery('(min-width: 768px)')
  const xsDown = useMediaQuery('(max-width: 375px)')

  const {
    handleSubmit,
    formState: { dirtyFields, isDirty, errors },
    getValues,
    control,
    register,
    setValue,
    reset,
    setError,
    watch
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange' as keyof ValidationMode
  })

  const otp = watch('otp')

  const phoneNumber = watch('phoneNumber')

  const email = watch('email')

  /* Query Section */
  const { data: userProfile, status } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getUserProfile
  })

  const { data: countryResponse, status: countryStatus } = useQuery<IResponse, Error>({
    queryKey: ['country-list'],
    queryFn: getCountries
  })
  /* End Section */

  // const breadcrumbData = [{ name: '마이페이지' }, { name: '회원정보' }]

  /* Update user profile */
  const { mutate: updateProfileMutate } = useMutation({
    mutationKey: ['update-profile'],
    mutationFn: async (updateData: any) => {
      const { data, error } = await updateUserProfile(updateData)
      if (error) {
        throw error
      }

      return data
    },
    onSuccess: async () => {
      reset()
      // setUser(data.data)
      enqueueSnackbar('회원정보가 변경되었습니다.', {
        variant: 'success'
      })
      await query.invalidateQueries({ queryKey: ['user-profile'] })
    },
    onError: (error) => {
      setShowError(true)
      setErrorMessage(error?.message)
    }
  })

  const onSubmit = async (dataSubmit: any) => {
    if (!isDirty) {
      return
    }
    const updateData = {
      nickname: dataSubmit.nickname,
      avatarId: !!uploadedImage ? uploadedImage.id : undefined,
      oldPassword: !!dataSubmit.password && !!dataSubmit.confirmPassword ? dataSubmit.password : undefined,
      password: !!dataSubmit.password && !!dataSubmit.confirmPassword ? dataSubmit.confirmPassword : undefined,
      countryId: dataSubmit.countryId
    }

    if (profileState.pendingPhoneValidate) {
      setShowPhoneValidate(true)
      return
    }
    updateProfileMutate(updateData)
  }
  /* end section */

  /* Delete user profile */
  const { mutate: deleteProfileMutate } = useMutation({
    mutationKey: ['delete-profile'],
    mutationFn: async () => {
      const { data, error } = await deleteUserProfile()

      if (error) {
        throw error
      }
      return data
    },
    onSuccess: async () => {
      // setShowError(true)
      // setErrorMessage('탈퇴가 완료되었습니다.')
      enqueueSnackbar('계정 탈퇴가 완료되었습니다.', { variant: 'info' })
      await logout()
    },
    onError: () => {
      setShowError(true)
      setErrorMessage('이용 중인 이용권이 존재하여 탈퇴를 진행할 수 없습니다.')
      setErrorTitle('탈퇴를 진행하고 싶으신 경우, 고객센터에 문의해주세요.')
    }
  })

  const handleWithdraw = () => {
    deleteProfileMutate()
  }
  /* end section */

  /* Change Email section */
  const onEmailChange = (event: any) => {
    if (event.keyCode === 13 || event.keyCode === 176) {
      event.preventDefault()
    }
  }

  useEffect(() => {
    setProfileState({
      ...profileState,
      emailTouched: email !== profileState.orgEmail
    })
  }, [email])

  const { mutate: sendVerifyMutate } = useMutation({
    mutationKey: ['send-verify-email'],
    mutationFn: async (emailValue: string) => {
      const { data, error } = await sendVerifyEmail(emailValue)
      if (error) {
        throw error
      }
      return data
    },
    onSuccess: () => {
      setProfileState({
        ...profileState,
        emailTouched: true,
        // enableResend: true,
        emailValidateSuccess: true
      })
      enqueueSnackbar('인증을 위해 이메일이 발송되었습니다.', {
        variant: 'success'
      })
    },
    onError: (error) => {
      setError('email', { type: 'custom', message: error.message })
    }
  })
  const validateEmail = async () => {
    const emailValue = getValues('email')
    sendVerifyMutate(emailValue ?? '')
  }
  /* end section */

  /* change phone section */
  const onPhoneNumberChange = (event: any) => {
    if (event.keyCode === 13 || event.keyCode === 176) {
      event.preventDefault()
    }

    setIsWaitingOTP(false)
    setProfileState({
      ...profileState,
      resendOtp: false
    })
  }

  useEffect(() => {
    setProfileState({
      ...profileState,
      phoneNumberTouched: phoneNumber !== profileState.orgPhoneNumber
    })
  }, [phoneNumber])

  const { mutate: validatePhoneMutate } = useMutation({
    mutationKey: ['validate-phone-number'],
    mutationFn: async (phoneNum: string) => {
      const { data, error } = await sendOtp(phoneNum)

      if (error) {
        throw error
      }
      return data
    },
    onSuccess: () => {
      setIsWaitingOTP(true)
      setProfileState({
        ...profileState,
        phoneNumberTouched: false,
        phoneValidateSuccess: true,
        pendingPhoneValidate: true,
        enableResend: true,
        otpSubmitValid: null,
        resendOtp: true
      })
      setSeconds(180)
      setValue('otp', '')
    },
    onError: (error) => {
      // setShowError(true)
      // setErrorMessage(error?.message)
      setProfileState({
        ...profileState,
        pendingPhoneValidate: false
      })
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
    }
  })

  const validatePhoneNumber = async () => {
    const phoneNumberValue = getValues('phoneNumber')?.split('-')?.join('') || ''
    validatePhoneMutate(phoneNumberValue)
  }
  /* end section */

  /* Validate OTP section */
  const { mutate: verifyOTPMutate } = useMutation({
    mutationKey: ['verify-otp'],
    mutationFn: async (otp: string) => {
      const { data, error } = await verifyOtp(otp)

      if (error) {
        throw error
      }
      return data
    },
    onSuccess: () => {
      setProfileState({
        ...profileState,
        pendingPhoneValidate: false,
        otpSubmitValid: true,
        enableOtpVerify: false,
        enableResend: false,
        resendOtp: false
      })
      setSeconds(0)
    },
    onError: (error: any) => {
      if (error.code === '108') {
        setError('otp', { type: 'custom', message: error.message })
      } else {
        setShowError(true)
        setErrorMessage(error?.message)
      }
      setProfileState({
        ...profileState,
        otpSubmitValid: false,
        enableResend: true,
        resendOtp: true
      })
    }
  })
  const validateOtp = () => {
    let otp = getValues('otp')
    verifyOTPMutate(otp ?? '')
  }
  /* end section */

  /* Upload avatar section */
  const { mutate: uploadAvatarMutate } = useMutation({
    mutationKey: ['upload-profile-avatar'],
    mutationFn: async (file: File) => {
      const { data, error } = await uploadFile({ file })
      return { data, error }
    },
    onSuccess: (data) => {
      setIsWaitingOTP(false)
      setUploadedImage(data.data)
    },
    onError: () => {
      enqueueSnackbar('Upload avatar failed', {
        variant: 'error'
      })
    }
  })
  const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files) {
      setLoading(false)
      return
    }
    uploadAvatarMutate(event?.target?.files[0])
  }
  /* end section */

  const handleCancel = () => {
    setShowWithdrawPopup(false)
  }

  const alertHandleClose = async () => {
    setShowError(false)
    setErrorMessage('')
    if (errorMessage === '탈퇴가 완료되었습니다.') {
      await logout()
    }
  }

  const disabledPhoneNumber = (): boolean => {
    if (errors.phoneNumber) {
      return true
    }
    if (!phoneNumber) {
      return true
    }
    if (phoneNumber && !dirtyFields.phoneNumber) {
      return true
    }
    return isWaitingOTP
  }

  /* useEffect section */
  useEffect(() => {
    setProfileState({ ...profileState, otpSubmitValid: null })

    if (otpValidator(otp)) {
      setProfileState({ ...profileState, enableOtpVerify: true })
    } else {
      setProfileState({ ...profileState, enableOtpVerify: false })
    }
  }, [otp])

  useEffect(() => {
    if (countryResponse && countryStatus === 'success') {
      setCountries(!!countryResponse.data?.data ? countryResponse.data?.data : [])
    }
  }, [countryResponse, countryStatus])

  useEffect(() => {
    if (userProfile && status === 'success') {
      setValue('nickname', userProfile.nickname || '')
      setValue('username', userProfile.username)
      setValue('email', userProfile.email || '')
      setValue('phoneNumber', userProfile.phoneNumber || '')
      setValue('countryId', userProfile.country?.id || -1)
      setUser(userProfile)

      setProfileState({
        ...profileState,
        orgEmail: userProfile.email,
        orgPhoneNumber: userProfile.phoneNumber
      })
    }
  }, [userProfile, status])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (seconds - 1 <= 0) {
        setIsWaitingOTP(false)
      }
      setSeconds((prev) => prev - 1)
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [seconds])

  useEffect(() => {
    if (seconds === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      setEndedCountdown(true)
    }
  }, [seconds])

  useEffect(() => {
    if (endedCountdown) {
      setProfileState({ ...profileState, enableResend: true })
    }
  }, [endedCountdown])

  return (
    <Box>
      {/* <Breadcrumbs data={breadcrumbData} /> */}
      <Typography cate='large_title' mt={4.5} mb={5}>
        계정관리
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box alignItems={'center'} justifyContent={'center'} flexDirection={'column'} display={'flex'}>
          <Box
            sx={{
              width: '10rem',
              height: '10rem',
              position: 'relative',
              cursor: 'pointer'
            }}
            onClick={() => {
              inputFile?.current?.click()
            }}
          >
            <input
              type='file'
              id='file'
              accept='.png,.PNG,.jpg,.JPG,.jpeg,.JPEG'
              onChange={uploadAvatar}
              ref={inputFile}
              style={{ display: 'none' }}
            />
            <Avatar
              sx={{ width: '10rem', height: '10rem' }}
              src={
                !!uploadedImage
                  ? uploadedImage.url
                  : !!userProfile?.avatar?.url
                  ? userProfile?.avatar?.url
                  : '/images/blank-user.png'
              }
            />
            <Box position={'absolute'} bottom={0} right={0}>
              <CameraUpdate />
            </Box>
          </Box>
          <ControlInput
            type='text'
            name='nickname'
            label='name'
            onKeyDown={(event) => {
              if (event.keyCode === 13 || event.keyCode === 176) {
                event.preventDefault()
              }
            }}
            inputProps={{
              style: {
                textAlign: 'center'
              },
              maxLength: 15
            }}
            sx={{
              marginTop: '1.5rem',
              width: '20rem'
            }}
            control={control}
            startAdornment={<UserIcon stroke={theme.palette.main_grey.gray300} />}
            startAdornmentFocused={<UserIcon stroke={theme.palette.main_grey.gray100} />}
          />
          <Grid container spacing={3} mt={7}>
            <Grid item xs={12} lg={6}>
              <Typography cate='body_3' color={theme.palette.main_grey.gray100} mb={1}>
                아이디
              </Typography>
              <ControlInput
                fullWidth
                type='text'
                name='username'
                label='username'
                onKeyDown={(event) => {
                  if (event.keyCode === 13 || event.keyCode === 176) {
                    event.preventDefault()
                  }
                }}
                control={control}
                disabled
                startAdornment={<MailIcon stroke={theme.palette.main_grey.gray300} />}
                startAdornmentFocused={<MailIcon stroke={theme.palette.main_grey.gray300} />}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography cate='body_3' color={theme.palette.main_grey.gray100} mb={1}>
                이메일
              </Typography>
              <Grid container spacing={1} display={'flex'} alignItems={'flex-start'}>
                <Grid item xs={12} md={9}>
                  <ControlInput
                    register={register}
                    fullWidth
                    type='text'
                    name='email'
                    label='email'
                    control={control}
                    placeholder='이메일을 입력해 주세요.'
                    onKeyDown={onEmailChange}
                    isSuccess={profileState.emailValidateSuccess}
                    startAdornment={<MailIcon stroke={theme.palette.main_grey.gray300} />}
                    startAdornmentFocused={<MailIcon stroke={theme.palette.main_grey.gray100} />}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <PrimaryButton
                    fullWidth
                    btnSize='md'
                    onClick={validateEmail}
                    disabled={!!errors.email || !profileState.emailTouched || (profileState.emailTouched && !email)}
                  >
                    <Typography cate='button_30'>이메일 인증</Typography>
                  </PrimaryButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider
            sx={{
              marginY: '1.5rem',
              width: '100%'
            }}
          />
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography cate='body_3' color={theme.palette.main_grey.gray100}>
                  비밀번호
                </Typography>
                <Typography cate='body_3' color={theme.palette.main_grey.gray300}>
                  {!!userProfile?.lastChangedPasswordAt ? '최종 변경일' : '가입일'} :{' '}
                  {moment(userProfile?.lastChangedPasswordAt || userProfile?.createdAt).format('YYYY.MM.DD')}
                </Typography>
              </Box>
              <ControlInput
                register={register}
                fullWidth
                type='password'
                name='newPassword'
                onKeyDown={(event) => {
                  if (event.keyCode === 13 || event.keyCode === 176) {
                    event.preventDefault()
                  }
                }}
                sx={{
                  marginTop: '0.5rem'
                }}
                label='newPassword'
                control={control}
                placeholder='새 비밀번호'
                startAdornment={<VariantIcon />}
                startAdornmentFocused={<VariantIcon stroke={theme.palette.main_grey.gray100} />}
              />
              <ControlInput
                register={register}
                fullWidth
                sx={{
                  marginTop: '0.5rem'
                }}
                type='password'
                name='confirmPassword'
                onKeyDown={(event) => {
                  if (event.keyCode === 13 || event.keyCode === 176) {
                    event.preventDefault()
                  }
                }}
                label='confirmPassword'
                control={control}
                placeholder='새 비밀번호 확인'
                startAdornment={<VariantIcon />}
                startAdornmentFocused={<VariantIcon stroke={theme.palette.main_grey.gray100} />}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography cate='body_3' color={theme.palette.main_grey.gray100} mb={1}>
                휴대폰 번호
              </Typography>
              <Grid container spacing={1} display={'flex'} alignItems={'start'}>
                <Grid item xs={7} md={9}>
                  <InputPhoneNumber
                    register={register}
                    type='tel'
                    name='phoneNumber'
                    control={control}
                    onKeyDown={onPhoneNumberChange}
                    placeholder="'-'를 제외한 11자리 숫자"
                    isSuccess={profileState.enableResend && profileState.phoneValidateSuccess}
                    startAdornment={<PhoneIcon stroke={theme.palette.main_grey.gray300} />}
                    startAdornmentFocused={<PhoneIcon stroke={theme.palette.main_grey.gray100} />}
                  />
                </Grid>
                <Grid item xs={5} md={3}>
                  <PrimaryButton fullWidth onClick={validatePhoneNumber} btnSize='md' disabled={disabledPhoneNumber()}>
                    <Typography cate='button_30'>{profileState.resendOtp ? '재발송' : '인증번호 전송'}</Typography>
                  </PrimaryButton>
                  {/* {!!errors.phoneNumber && mdUp && (
									 <Typography cate={'caption_2'} mt={1} plainColor={'main.gray90'}>
									 error
									 </Typography>
									 )} */}
                </Grid>
              </Grid>
              <Grid container spacing={1} display={'flex'} alignItems={'flex-start'} mt={0}>
                <Grid item xs={12} md={9}>
                  <ControlInput
                    register={register}
                    fullWidth
                    type='text'
                    name='otp'
                    label='otp'
                    placeholder='인증번호를 입력해주세요.'
                    onKeyDown={(event) => {
                      if (event.keyCode === 13 || event.keyCode === 176) {
                        event.preventDefault()
                      }
                    }}
                    control={control}
                    isSuccess={profileState.otpSubmitValid || false}
                    endAdornment={seconds === 0 ? undefined : <CountDownTimer count={seconds} />}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <PrimaryButton
                    fullWidth
                    onClick={validateOtp}
                    btnSize='md'
                    disabled={!profileState.enableOtpVerify || !!errors.otp || !!profileState.otpSubmitValid}
                  >
                    <Typography cate='button_30'>인증번호 확인</Typography>
                  </PrimaryButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider
            sx={{
              marginY: '1.5rem',
              width: '100%'
            }}
          />
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Typography cate='body_3' color={theme.palette.main_grey.gray100} mb={1}>
                국가
              </Typography>
              <Controller
                name='countryId'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    placeholder='대한민국'
                    displayEmpty
                    value={value}
                    fullWidth
                    renderValue={(value) => {
                      if (value === -1) {
                        return (
                          <Typography cate='body_3' color={theme.palette.main_grey.gray300}>
                            대한민국
                          </Typography>
                        )
                      }
                      return (
                        <Box display={'flex'} alignItems={'center'}>
                          <Image
                            src={countries.find((i) => i.id === value)?.flag || ''}
                            width={18}
                            height={18}
                            alt={''}
                          />
                          <Typography cate='body_3' color={theme.palette.main_grey.gray100} ml={2}>
                            {countries.find((i) => i.id === value)?.name}
                          </Typography>
                        </Box>
                      )
                    }}
                    onChange={onChange}
                  >
                    {countries?.map((i, index) => {
                      return (
                        <MenuItem value={i.id} key={index}>
                          <Image src={i.flag} width={18} height={18} alt={''} />
                          <Typography cate='body_3' color={theme.palette.main_grey.gray100} ml={2}>
                            {i.name}
                          </Typography>
                        </MenuItem>
                      )
                    })}
                  </Select>
                )}
              />
            </Grid>
          </Grid>
          <Stack
            mt={mdUp ? 16 : 4}
            justifyContent='center'
            alignItems='center'
            position={'relative'}
            direction={mdUp ? 'column' : 'column-reverse'}
            sx={{ width: ' 100%' }}
          >
            <SecondaryButton
              fullWidth={!mdUp}
              sx={{
                width: convertToRem(256)
              }}
              active
              btnSize='md'
              type='submit'
            >
              <Typography cate='button_30'>변경사항 저장</Typography>
            </SecondaryButton>
            <Box position={mdUp ? 'absolute' : 'relative'} right={0} mb={mdUp ? 0 : 4}>
              <ButtonCustom
                customTitle={<Typography cate='button_20'>회원탈퇴</Typography>}
                customSize={'sm'}
                cate='outlined'
                isNonSubmit={true}
                onClick={() => {
                  setShowWithdrawPopup(true)
                }}
                isLoading={false}
                sx={{ width: '100%', borderRadius: `${convertToRem(1000)} !important` }}
              />
            </Box>
          </Stack>
        </Box>
      </form>
      <AlertPopup
        onSubmit={alertHandleClose}
        onClose={alertHandleClose}
        submitTitle='확인'
        icon={<LogoutRedIcon />}
        title='이용 중인 이용권이 존재하여 탈퇴를 진행할 수 없습니다.'
        description={'탈퇴를 진행하고 싶으신 경우, 고객센터에 문의해주세요.'}
        open={showError}
      />
      <AlertPopup
        onSubmit={() => {
          setShowPhoneValidate(false)
        }}
        submitTitle='확인'
        icon={<PhoneRedIcon />}
        title='휴대폰 번호를 인증 후 체크해 주세요.'
        open={showPhoneValidate}
        active
      />
      <WithdrawPopup open={showWithdrawPopup} onSubmit={handleWithdraw} onCancel={handleCancel} disableEscapeKeyDown />
    </Box>
  )
}

export default UserProfile
