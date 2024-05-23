'use client'

import { getUserPool } from '@/actions/apis/pool.action'
import ChevronRightSmIcon from '@/assets/icons/chevrons/chevron-right-sm'
import ConfirmationIcon from '@/assets/icons/dialog-icons/confirmation'
import LockRedIcon from '@/assets/icons/dialog-icons/lock-red'
import UserRedIcon from '@/assets/icons/dialog-icons/user-red'
import ExplanationMarkFilled from '@/assets/icons/explanation-mark-filled'
import UserIcon from '@/assets/icons/user'
import VariantIcon from '@/assets/icons/variant'
import { authVerifyAtom } from '@/atoms/auth-verify'
import { emailVerifyAtom } from '@/atoms/email-verify'
import { loadingAtom } from '@/atoms/loading'
import { userAtom } from '@/atoms/user'
import { userPoolAtom } from '@/atoms/user-pool'
import { Alert } from '@/components'
import { LANG, THEME_MODE } from '@/constants/common.constant'
import AppLogo from '@/elements/app-logo'
import ButtonCustom from '@/elements/button'
import ControlInput from '@/elements/control-input'
import Typography from '@/elements/typography'
import { useAuth } from '@/hooks/use-auth'
import { useLanguage } from '@/hooks/use-language'
import { useThemeMode } from '@/hooks/use-theme-mode'
import { login } from '@/services/auth.service'
import { convertToRem } from '@/utils/convert-to-rem'
import { passwordNewValidator } from '@/utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { WarningOutlined } from '@mui/icons-material'
import { InputAdornment, Stack, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useRecoilState, useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import styles from '../styles.module.scss'

const SignInPage = () => {
  const theme = useTheme()
  const [errorMessageTitle, setErrorMessageTitle] = useState<string>('')
  const [errorMessageSubTitle, setErrorMessageSubTitle] = useState<string>('')
  const [dialogIcon, setDialogIcon] = useState<JSX.Element | undefined>(undefined)
  const { changeThemeMode } = useThemeMode()
  const { changeLanguage } = useLanguage()

  const [showError, setShowError] = useState<boolean>(false)
  const [errorCode, setErrorCode] = useState<string>()
  const smDown = useMediaQuery('(max-width: 576px)')
  const [emailVerify, setEmailVerify] = useRecoilState(emailVerifyAtom)

  const schema = yup
    .object({
      username: yup.string().required('아이디를 입력해주세요.'),
      password: yup
        .string()
        .required('비밀번호를 입력해주세요.')
        .test(
          'password',
          '영문, 숫자, 특수기호 중 2가지를 포함한 8글자 이상의 비밀번호를 입력해주세요.',
          (value?: string) => passwordNewValidator(value)
        )
    })
    .required()

  const defaultValues = {
    username: '',
    password: ''
  }
  const setUser = useSetRecoilState(userAtom)
  const setUserPool = useSetRecoilState(userPoolAtom)
  const setLoading = useSetRecoilState(loadingAtom)
  const { changeJwtToken } = useAuth()
  const [authVerified, setAuthVerified] = useRecoilState(authVerifyAtom)
  const { handleSubmit, formState, getValues, control, register, setError, setFocus } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(schema)
  })
  const { isValid, isDirty, errors } = formState

  const router = useRouter()
  const queryData = useSearchParams()

  useEffect(() => {
    if (authVerified) {
      setShowError(true)
      setErrorMessageTitle('비밀번호 변경이 완료되었습니다.')
      setErrorMessageSubTitle('로그인 후 이용해주세요.')
      setDialogIcon(<ConfirmationIcon />)
      setAuthVerified(false)
    }
  }, [authVerified, setAuthVerified])

  const onSubmit = async (data: any) => {
    setLoading(true)
    const { user, error, access_token, refresh_token } = await login(data)

    if (user) {
      setUser(user)
      await changeJwtToken({
        accessToken: access_token,
        refreshToken: refresh_token
      })
      await changeThemeMode(user.isDarkMode ? THEME_MODE.DARK : THEME_MODE.LIGHT)
      await changeLanguage((user.language as LANG) || LANG.KR)
      setLoading(false)
      const userPool = await getUserPool()
      if (!!userPool) {
        setUserPool(userPool)
      } else {
        setUserPool(null)
      }
      if (emailVerify) {
        router.push('/me')
        setEmailVerify(false)
      } else {
        router.push(!!queryData.get('from') ? decodeURIComponent(queryData.get('from') || '') : '/')
        // router.push('/')
      }
    } else {
      const errors = (error?.message as string)?.split('\n')
      setLoading(false)
      setErrorMessageTitle(errors[0])
      setErrorMessageSubTitle(errors[1])
      setErrorCode(error?.code)
      error?.code === '102' ? setDialogIcon(<UserRedIcon />) : setDialogIcon(<LockRedIcon />)
      setShowError(true)
    }
    // setIsClick(true);
  }

  const handleAfterCloseDialog = () => {
    setShowError(false)
    setErrorMessageTitle('')
    setErrorMessageSubTitle('')
    if (errorCode === '102') {
      setError('username', { type: 'custom', message: '' })
      setFocus('username')
    } else {
      setError('password', { type: 'custom', message: '' })
      setFocus('password')
    }
  }

  const username = useWatch({
    control,
    name: 'username'
  })

  const password = useWatch({
    control,
    name: 'password'
  })

  return (
    <Box
      className={styles.sign_in}
      sx={{ backgroundColor: { md: theme.palette.main.black, xs: 'transparent' } }}
      p={{ md: 6, xs: 3 }}
    >
      <AppLogo />
      <Typography cate='body_2' color={theme.palette.main_grey.gray400} whiteSpace={'pre-line'} textAlign={'center'}>
        {`당신의 아이디어를 혁신으로 만드는${smDown ? '\n' : ''} 완벽한 솔루션`}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Stack my={{ md: 5, xs: 4 }}>
          <Stack justifyContent={'center'} gap={2} width={'100%'}>
            <ControlInput
              fullWidth={true}
              register={register}
              type='text'
              name='username'
              label='username'
              placeholder='아이디'
              autoComplete='off'
              control={control}
              startAdornment={<UserIcon stroke='#9F9EA4' />}
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
              autoComplete='off'
              placeholder='비밀번호'
              control={control}
              startAdornment={<VariantIcon />}
              startAdornmentFocused={<VariantIcon stroke={theme.palette.main_grey.gray100} />}
              endAdornment={errors.password ? <WarningOutlined /> : null}
            />
          </Stack>
          <Box mt={3}>
            <ButtonCustom title='로그인' cate='primary' isLoading={false} sx={{ width: '100%' }} />
          </Box>
        </Stack>
        {/* <Grid container spacing={2}>
				 <Grid item xs={12} sm={12}></Grid>
				 <Grid item xs={12} sm={12}></Grid>
				 </Grid> */}
      </form>
      <Box className={styles.register_wrapper} sx={{ marginBottom: convertToRem(16) }}>
        <Typography cate='caption_1' color={theme.palette.main_grey.gray400}>
          아직 회원이 아니신가요?
        </Typography>
        <Link href='/sign-up' style={{ zIndex: 3 }}>
          <Box display={'flex'} alignItems='center' sx={{ cursor: 'pointer' }}>
            <Typography cate='caption_1' color={theme.palette.main_grey.gray100}>
              회원가입
            </Typography>
            <ChevronRightSmIcon
              pathProps={{
                stroke: theme.palette.main.white
              }}
            />
          </Box>
        </Link>
      </Box>
      <Box className={styles.register_wrapper}>
        <Typography cate='caption_1' color={theme.palette.main_grey.gray400}>
          아이디 또는 비밀번호를 잊으셨나요?
        </Typography>
        <Link href='/find-password' style={{ zIndex: 3 }}>
          <Box display={'flex'} alignItems='center' sx={{ cursor: 'pointer' }}>
            <Typography cate='caption_1' color={theme.palette.main_grey.gray100}>
              계정찾기
            </Typography>
            <ChevronRightSmIcon
              pathProps={{
                stroke: theme.palette.main.white
              }}
            />
          </Box>
        </Link>
      </Box>
      {/* <Link href='/find-password' style={{ zIndex: 3 }}>
			 <Typography cate='caption_1' color={theme.palette.main.gray40} sx={{ cursor: 'pointer' }}>
			 도움이 필요할 경우{' '}
			 <Typography component={'span'} cate='body_3' color={theme.palette.main.primary_light}>
			 ooooo@oooo.co.kr
			 </Typography>{' '}
			 로 문의해 주세요.
			 </Typography>
			 </Link> */}
      <Alert
        onSubmit={() => {
          handleAfterCloseDialog()
        }}
        icon={dialogIcon}
        title={errorMessageTitle}
        description={errorMessageSubTitle}
        open={showError}
      />
    </Box>
  )
}

export default SignInPage
