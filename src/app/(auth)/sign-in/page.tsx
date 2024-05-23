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
import { Suspense, useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useRecoilState, useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import styles from '../styles.module.scss'
import SignInPage from './sign-in'

const SignIn = () => {
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
    <>
      <Suspense fallback={<></>}>
        <SignInPage />
      </Suspense>
    </>
  )
}

export default SignIn
