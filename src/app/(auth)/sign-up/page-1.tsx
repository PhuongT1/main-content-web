'use client'
import { checkEmailExists, checkUsernameExists } from '@/actions/apis/user.action'
import ChevronLeftSmIcon from '@/assets/icons/chevrons/chevron-left-sm'
import ExplanationMarkFilled from '@/assets/icons/explanation-mark-filled'
import MailIcon from '@/assets/icons/mail'
import UserIcon from '@/assets/icons/user'
import VariantIcon from '@/assets/icons/variant'
import { loadingAtom } from '@/atoms/loading'
import { termList } from '@/constants/common.constant'
import { CirclePrimaryCheckbox, PrimaryButton } from '@/elements'
import AlertPopup from '@/elements/alert-popup'
import AppLogo from '@/elements/app-logo'
import ControlInput from '@/elements/control-input'
import Typography from '@/elements/typography'
import { TextButton } from '@/elements/v2/button'
import { signup } from '@/services/auth.service'
import { ISignup } from '@/types/auth.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { emailValidator, onlyLettersAndNumbers, passwordNewValidator } from '@/utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputAdornment, Stack, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import ConfirmSendMail from '../_components/confirm-send-email'
import styles from '../styles.module.scss'
import TermDropDown from './_components/term-drop-down'

interface SignupProps {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const schema = yup
  .object({
    username: yup
      .string()
      .required('아이디를 입력해 주세요.')
      .max(12, '영문과 숫자만 사용 가능하며 12글자까지 입력할 수 있습니다.')
      .min(2, '영문과 숫자만 사용 가능하며 12글자까지 입력할 수 있습니다.')
      .test('username', '영문과 숫자만 사용 가능하며 12글자까지 입력할 수 있습니다.', (value?: string) =>
        onlyLettersAndNumbers(value)
      )
      .strict(),
    email: yup
      .string()
      .required('이메일을 입력해 주세요.')
      .test('email', '이메일 형식을 확인해 주세요.', (value?: string) => emailValidator(value)),
    password: yup
      .string()
      .required('비밀번호를 입력해 주세요.')
      .test('password', '영문, 숫자, 특수문자를 모두 포함하여 8글자 이상 입력해 주세요.', (value?: string) =>
        passwordNewValidator(value)
      ),

    confirmPassword: yup
      .string()
      .trim()
      .required('비밀번호를 입력해 주세요.')
      .test('password', '영문, 숫자, 특수문자를 모두 포함하여 8글자 이상 입력해 주세요.', (value?: string) =>
        passwordNewValidator(value)
      )
      .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
  })
  .required()

const SignUp = () => {
  const theme = useTheme()

  const defaultValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const { handleSubmit, formState, control, register, setError } = useForm<SignupProps>({
    defaultValues,
    // resolver: yupResolver(schema),
    mode: 'onChange'
  })
  const { isDirty, errors } = formState
  const [checkedIds, setCheckedIds] = useState<number[]>([])
  const [termValid, setTermValid] = useState<boolean>(false)
  const [session, setSession] = useState<number | null>()
  const [registeredData, setRegisteredData] = useState<ISignup | null>()
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()
  const [isReceiveEmail, setIsReceiveEmail] = useState<boolean>(false)
  const [isReceivePhone, setIsReceivePhone] = useState<boolean>(false)
  const router = useRouter()

  const setLoading = useSetRecoilState(loadingAtom)

  const onSubmit = async (dataSubmit: SignupProps | null | undefined): Promise<void> => {
    if (!dataSubmit) return
    const { data: validateMailData, error: validateMailError } = await checkEmailExists(dataSubmit.email)
    const { data: validateUserData, error: validateUserError } = await checkUsernameExists(dataSubmit.username)

    if (!validateMailError && !validateUserError) {
      let dataSignup: ISignup = {
        username: dataSubmit.username,
        email: dataSubmit.email,
        password: dataSubmit.password,
        isReceiveEventEmail: isReceiveEmail,
        isReceiveEventPhone: isReceivePhone,
        sessionId: session,
        agreeTermsAndConditions: {
          termsOfUse: checkedIds.includes(1),
          termsOfUseDate: moment().format('YYYY-MM-DD hh:mm:ss'),
          personalInformation: checkedIds.includes(2),
          personalInformationDate: moment().format('YYYY-MM-DD hh:mm:ss'),
          thirdPartiesInformation: checkedIds.includes(3),
          thirdPartiesInformationDate: moment().format('YYYY-MM-DD hh:mm:ss')
        }
      }

      const { data, error } = await signup(dataSignup)
      if (!error) {
        setLoading(false)
        setSignupSuccess(true)
        setRegisteredData(dataSubmit)
        setSession(data.data.id)
      } else {
        setLoading(false)
        setShowError(true)
        setErrorMessage(error.message)
      }
    } else {
      setLoading(false)
      if (validateMailError) {
        setError('email', {
          type: 'custom',
          message: validateMailError.message
        })
      }

      if (validateUserError) {
        setError('username', {
          type: 'custom',
          message: validateUserError.message
        })
      }
    }
  }

  const handleCheckAll = () => {
    if (checkedIds.length < termList.length) {
      let newCheckedIds = [...checkedIds]
      termList.forEach((i) => {
        if (!newCheckedIds.includes(i.id)) {
          newCheckedIds.push(i.id)
        }
      })
      setCheckedIds(newCheckedIds)
      setIsReceiveEmail(true)
      setIsReceivePhone(true)
    } else {
      setCheckedIds([])
      setIsReceiveEmail(false)
      setIsReceivePhone(false)
    }
  }
  const handleCheck = (id: number) => {
    if (checkedIds.includes(id)) {
      let newCheckedIds = checkedIds.filter((i) => i !== id)
      setCheckedIds(newCheckedIds)

      if (id === 3) {
        handleCheckAllNotification(false)
      }
    } else {
      let newCheckedIds = [...checkedIds]
      newCheckedIds.push(id)
      setCheckedIds(newCheckedIds)

      if (id == 3) {
        handleCheckAllNotification(true)
      }
    }
  }

  const handleCheckAllNotification = (bool: boolean) => {
    setIsReceiveEmail(bool)
    setIsReceivePhone(bool)
  }

  useEffect(() => {
    const id = 3
    if (checkedIds.includes(id) && !isReceiveEmail && !isReceivePhone) {
      let newCheckedIds = checkedIds.filter((i) => i !== id)
      setCheckedIds(newCheckedIds)
    }

    if (!checkedIds.includes(id) && (isReceiveEmail || isReceivePhone)) {
      let newCheckedIds = [...checkedIds]
      newCheckedIds.push(id)
      setCheckedIds(newCheckedIds)
    }
  }, [isPending])

  useEffect(() => {
    if (
      termList.every((i) => {
        if (i.required) {
          return checkedIds.includes(i.id)
        }
        return true
      })
    ) {
      setTermValid(true)
    } else {
      setTermValid(false)
    }
  }, [checkedIds])

  const email = useWatch({
    control,
    name: 'email'
  })

  const username = useWatch({
    control,
    name: 'username'
  })

  const password = useWatch({
    control,
    name: 'password'
  })

  const confirmPassword = useWatch({
    control,
    name: 'confirmPassword'
  })

  return (
    <>
      {signupSuccess ? (
        <ConfirmSendMail
          message={`회원가입을 위한 이메일 인증 링크를 ${registeredData?.email} 로 보냈어요.\n혹시 이메일이 오지 않았나요? 스팸함을 확인하거나 다시 받아보세요.`}
          onBack={() => {
            router.replace('/sign-in')
          }}
          resendTitle='이메일 다시 보내기'
          backTitle='다른 계정으로 로그인'
          onResend={() => {
            onSubmit({
              username: registeredData?.username || '',
              email: registeredData?.email || '',
              password: registeredData?.password || '',
              confirmPassword: registeredData?.password || ''
            })
          }}
        />
      ) : (
        <Box
          className={styles.sign_in}
          sx={{ backgroundColor: { md: theme.palette.main.black, xs: 'transparent' } }}
          p={{ md: 6, xs: 3 }}
        >
          <AppLogo />
          <Typography cate='body_2' color={theme.palette.main_grey.gray400}>
            회원가입
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form_signup}>
            <Stack justifyContent={'center'} gap={2}>
              <ControlInput
                fullWidth={true}
                register={register}
                type={'text'}
                name='username'
                label='username'
                placeholder='아이디 입력'
                maxLength={12}
                control={control}
                startAdornment={<UserIcon stroke='#9F9EA4' />}
                helper={'영문과 숫자만 사용 가능하며 12글자까지 입력할 수 있습니다.'}
                startAdornmentFocused={<UserIcon stroke={theme.palette.main_grey.gray100} />}
                endAdornment={
                  errors.username ? (
                    <InputAdornment position='end'>
                      <ExplanationMarkFilled />
                    </InputAdornment>
                  ) : null
                }
              />
              <ControlInput
                fullWidth={true}
                register={register}
                type={'password'}
                name='password'
                label='password'
                placeholder='비밀번호 입력'
                control={control}
                startAdornment={<VariantIcon />}
                helper={'영문, 숫자, 특수문자를 포함하여 8글자 이상 입력해주세요.'}
                startAdornmentFocused={<VariantIcon stroke={theme.palette.main_grey.gray100} />}
              />
              <ControlInput
                fullWidth={true}
                register={register}
                type={'password'}
                name='confirmPassword'
                label='password'
                placeholder='비밀번호 확인'
                control={control}
                startAdornment={<VariantIcon />}
                startAdornmentFocused={<VariantIcon stroke={theme.palette.main_grey.gray100} />}
              />
              <ControlInput
                fullWidth={true}
                register={register}
                type='text'
                name='email'
                label='email'
                placeholder='이메일 입력'
                control={control}
                startAdornment={<MailIcon />}
                startAdornmentFocused={<MailIcon stroke={theme.palette.main_grey.gray100} />}
                endAdornment={
                  errors.email ? (
                    <InputAdornment position='end'>
                      <ExplanationMarkFilled />
                    </InputAdornment>
                  ) : null
                }
              />
            </Stack>
            {/* <Grid container spacing={1}>
						 <Grid item xs={12} sm={12}></Grid>
						 <Grid item xs={12} sm={12}></Grid>
						 <Grid item xs={12} sm={12}></Grid>
						 <Grid item xs={12} sm={12}></Grid>
						 </Grid> */}
            <Box my={3}>
              <Stack direction={'row'} alignItems={'center'} py={1}>
                <CirclePrimaryCheckbox onClick={handleCheckAll} checked={checkedIds.length === termList.length} />
                <Typography cate='body_2' color={theme.palette.main_grey.gray100} ml={1.5}>
                  모두 동의합니다.
                </Typography>
              </Stack>
              {termList.map((i) => (
                <TermDropDown
                  title={i.title}
                  key={i.id}
                  onClick={() => {
                    handleCheck(i.id)
                  }}
                  checked={checkedIds.includes(i.id)}
                  required={i.required}
                />
              ))}
              <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} ml={6} mt={1} gap={3}>
                <Stack direction={'row'} alignItems={'center'} gap={1.5}>
                  <CirclePrimaryCheckbox
                    onClick={() => {
                      startTransition(() => setIsReceivePhone((prev) => !prev))
                    }}
                    checked={isReceivePhone}
                  />
                  <Typography cate='body_2' color={theme.palette.main_grey.gray100}>
                    문자
                  </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} gap={1.5}>
                  <CirclePrimaryCheckbox
                    onClick={() => {
                      startTransition(() => setIsReceiveEmail((prev) => !prev))
                    }}
                    checked={isReceiveEmail}
                  />
                  <Typography cate='body_2' color={theme.palette.main_grey.gray100}>
                    이메일
                  </Typography>
                </Stack>
              </Stack>
            </Box>
            <PrimaryButton fullWidth btnSize='md' isLoading={false} disabled={!termValid} type='submit'>
              <Typography
                cate='body_2'
                sx={{
                  color: termValid ? theme.palette.main_grey.gray100 : theme.palette.main_grey.gray600
                }}
              >
                이메일 인증하기
              </Typography>
            </PrimaryButton>
          </form>
          <TextButton
            btnSize='sm-np'
            fullWidth
            onClick={() => {
              router.back()
            }}
            sx={{
              marginTop: convertToRem(16),
              gap: 0
            }}
          >
            <ChevronLeftSmIcon />
            <Typography cate='body_20' color={theme.palette.main_grey.gray100}>
              이전으로 돌아가기
            </Typography>
          </TextButton>
        </Box>
      )}
      <AlertPopup
        onSubmit={() => {
          setShowError(false)
          setErrorMessage('')
        }}
        submitTitle='확인'
        description={errorMessage}
        open={showError}
      />
    </>
  )
}

export default SignUp
