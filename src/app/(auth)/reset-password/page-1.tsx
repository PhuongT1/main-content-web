'use client'
import ChevronLeftSmIcon from '@/assets/icons/chevrons/chevron-left-sm'
import ConfirmationIcon from '@/assets/icons/dialog-icons/confirmation'
import VariantIcon from '@/assets/icons/variant'
import { EditAlert } from '@/components/dialog'
import { PrimaryButton, Typography } from '@/elements'
import AlertPopup from '@/elements/alert-popup'
import AppLogo from '@/elements/app-logo'
import ControlInput from '@/elements/control-input'
import { TextButton } from '@/elements/v2/button'
import { logout, resetPassword, verifyTokenResetPassword } from '@/services/auth.service'
import UserManager from '@/types/classes/user-manager.class'
import { convertToRem } from '@/utils/convert-to-rem'
import { passwordNewValidator } from '@/utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { WarningOutlined } from '@mui/icons-material'
import { Backdrop, CircularProgress, Stack, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { useMutation } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import LinkExpired from '../_components/link-expired'
import styles from '../styles.module.scss'

const schema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required('비밀번호를 입력해주세요.')
    .test('password', '영문, 숫자, 특수기호 중 2가지를 포함한 8글자 이상의 비밀번호를 입력해주세요', (value?: string) =>
      passwordNewValidator(value)
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required('비밀번호를 입력해주세요.')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다. 확인 후 다시 시도해주세요.')
})

const defaultValues = {
  password: '',
  confirmPassword: ''
}

const ResetPassword = () => {
  const theme = useTheme()
  const router = useRouter()
  const query = new URLSearchParams(useSearchParams())
  const path = usePathname()
  const token = query.get('token')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)
  const [showCancel, setShowCancel] = useState<boolean>(false)
  const [tokenValue, setTokenValue] = useState<string>('')
  const [showExpiredNoti, setShowExpiredNoti] = useState<boolean | null>(null)
  const userManager = UserManager.getInstance()

  const verifyTokenMutation = useMutation({
    mutationKey: ['verify-reset-password-token'],
    mutationFn: async (token: string) => {
      const { data, error } = await verifyTokenResetPassword({ token })

      if (error) {
        throw error
      }
      return data
    },
    onSuccess: () => {
      setShowExpiredNoti(false)
      setTokenValue(token as string)
    },
    onError: () => {
      setShowError(true)
      setShowExpiredNoti(true)
    }
  })

  const resetPasswordMutation = useMutation({
    mutationKey: ['reset-password'],
    mutationFn: async (dataSignup: any) => {
      const { data, error } = await resetPassword(dataSignup)

      if (error) {
        throw error
      }
      return data
    },
    onSuccess: () => {
      setResetPasswordSuccess(true)
      setShowError(true)
      // setErrorMessage('비밀번호 변경이 완료되었습니다. 로그인 후 이용해주세요.')
    },
    onError: (error) => {
      setResetPasswordSuccess(false)
      setShowError(true)
      setErrorMessage(error.message)
    }
  })

  async function checkVerifyToken(token: string) {
    // if (!Boolean(token)) {
    //   setLoading(false)
    //   router.replace('/find-password')
    //   return
    // }
    verifyTokenMutation.mutate(token)
  }

  const handleLinkExpired = async () => {
    const accessToken = userManager.getToken()?.accessToken

    if (accessToken) {
      await logout()
    }

    router.replace('/sign-in')
  }

  useEffect(() => {
    if (token) checkVerifyToken(token)
  }, [token])

  const { handleSubmit, formState, getValues, control, register } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange'
  })
  const { isDirty, errors } = formState
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<boolean>(false)

  const onSubmit = (dataSubmit: any) => {
    let dataSignup = {
      password: dataSubmit.password,
      token: tokenValue
    }

    resetPasswordMutation.mutate(dataSignup)
  }

  const ResetPasswordCard = (
    <>
      <Box
        className={styles.sign_in}
        sx={{ backgroundColor: { md: theme.palette.main.black, xs: 'transparent' } }}
        p={{ md: 6, xs: 3 }}
      >
        <AppLogo />
        <Typography cate='body_2' color={theme.palette.main_grey.gray400}>
          비밀번호 변경하기
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Stack justifyContent={'center'} mt={5} gap={2}>
            <ControlInput
              fullWidth={true}
              register={register}
              type={'password'}
              name='password'
              label='password'
              placeholder='새 비밀번호'
              helper='영문, 숫자, 특수문자를 포함하여 8글자 이상 입력해주세요.'
              control={control}
              startAdornment={<VariantIcon />}
              startAdornmentFocused={<VariantIcon stroke={theme.palette.main_grey.gray100} />}
              endAdornment={errors.password ? <WarningOutlined /> : null}
            />
            <ControlInput
              fullWidth={true}
              register={register}
              type={'password'}
              name='confirmPassword'
              label='password'
              placeholder='새 비밀번호 확인'
              helper='비밀번호를 힌번 더 입력해주세요.'
              control={control}
              startAdornment={<VariantIcon />}
              startAdornmentFocused={<VariantIcon stroke={theme.palette.main_grey.gray100} />}
              endAdornment={errors.password ? <WarningOutlined /> : null}
              onPaste={(e) => e.preventDefault()}
            />
          </Stack>
          <PrimaryButton btnSize='md' fullWidth sx={{ marginTop: convertToRem(24) }} type='submit'>
            <Typography cate='button_40'>비밀번호 변경하기</Typography>
          </PrimaryButton>
        </form>
        {/* <Box className={styles.register_wrapper} sx={{ marginBottom: '1.5rem' }}>
          <Typography cate="caption_1" color={theme.palette.main.gray40}>
            아직 회원이 아니신가요?
          </Typography>
          <Link href="/signup">
            <Typography
              cate="caption_1"
              color={theme.palette.main.gray10}
              sx={{ cursor: 'pointer' }}
            >
              회원가입
            </Typography>
          </Link>
        </Box> */}
        <TextButton
          btnSize='sm-np'
          fullWidth
          onClick={() => {
            setShowCancel(true)
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
      <AlertPopup
        onSubmit={() => {
          setShowError(false)
          if (resetPasswordSuccess) {
            router.replace('/sign-in')
          }
        }}
        submitTitle='확인'
        icon={<ConfirmationIcon />}
        title={'비밀번호 변경이 완료되었습니다.'}
        description={'로그인 후 이용해주세요.'}
        open={showError}
      />
      <EditAlert
        onSubmit={() => {
          router.replace('/sign-in')
        }}
        onCancel={() => {
          setShowCancel(false)
        }}
        submitTxt='확인'
        cancelTxt='취소'
        title={'이전으로 돌아가시겠습니까?'}
        description={'이전으로 돌아가면 계정찾기를 처음부터 진행해야합니다.'}
        open={showCancel}
      />
    </>
  )

  return showExpiredNoti !== null ? (
    showExpiredNoti ? (
      <LinkExpired onClick={handleLinkExpired} />
    ) : (
      ResetPasswordCard
    )
  ) : (
    <Backdrop
      sx={{
        color: '#fff'
      }}
      open={true}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}

export default ResetPassword
