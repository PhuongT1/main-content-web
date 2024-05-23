'use client'
import ChevronLeftSmIcon from '@/assets/icons/chevrons/chevron-left-sm'
import ChevronRightSmIcon from '@/assets/icons/chevrons/chevron-right-sm'
import MailRedIcon from '@/assets/icons/dialog-icons/mail-red'
import ExplanationMarkFilled from '@/assets/icons/explanation-mark-filled'
import MailIcon from '@/assets/icons/mail'
import { PrimaryButton, Typography } from '@/elements'
import AlertPopup from '@/elements/alert-popup'
import AppLogo from '@/elements/app-logo'
import ControlInput from '@/elements/control-input'
import { TextButton } from '@/elements/v2/button'
import { sendEmailResetPassword } from '@/services/auth.service'
import { convertToRem } from '@/utils/convert-to-rem'
import { emailValidator } from '@/utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputAdornment, Stack, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import ConfirmSendMail from '../_components/confirm-send-email'
import styles from '../styles.module.scss'
import { Alert } from '@/components'

const schema = yup
  .object({
    email: yup
      .string()
      .required('이메일을 입력해주세요')
      .test('email', '이메일 형식을 확인해주세요.', (value?: string) => emailValidator(value))
  })
  .required()

const defaultValues = {
  email: ''
}

const ForgotPassword = () => {
  const theme = useTheme()
  const [errorMessageTitle, setErrorMessageTitle] = useState<string>('')
  const [errorMessageSubTitle, setErrorMessageSubTitle] = useState<string>('')
  // const [dialogIcon, setDialogIcon] = useState<JSX.Element | undefined>(undefined)

  const [showError, setShowError] = useState<boolean>(false)

  const formOptions = {
    defaultValues,
    resolver: yupResolver(schema)
  }
  const { handleSubmit, formState, control, register, setError } = useForm(formOptions)
  const { errors } = formState
  const [sendMailSuccess, setSendMailSuccess] = useState<boolean>(false)
  const [sendMailData, setSendMailData] = useState<{ email: string } | null>()

  const router = useRouter()

  const resetPwdMutation = useMutation({
    mutationKey: ['email-reset-password'],
    mutationFn: async (dataSubmit: any) => {
      const { data, error } = await sendEmailResetPassword(dataSubmit)
      if (error) {
        throw error
      }

      return data
    },
    onSuccess: (data, vari) => {
      setSendMailSuccess(true)
      // setSendMailData(vari.email)
    },
    onError: (error) => {
      const errors = (error?.message as string).split('\n')
      setErrorMessageTitle(errors[0])
      setErrorMessageSubTitle(errors[1])
      setShowError(true)
      setError('email', { type: 'custome', message: '' })
    }
  })

  const onSubmit = async (dataSubmit: any) => {
    // const { data, error } = await sendEmailResetPassword(dataSubmit)

    // if (data && !error) {
    //   setSendMailSuccess(true)
    //   setSendMailData(dataSubmit.email)
    //   setLoading(false)
    // } else {
    //   if (error) {
    //     const errors = (error?.message as string).split('\n')
    //     setErrorMessageTitle(errors[0])
    //     setErrorMessageSubTitle(errors[1])
    //   }
    //   setLoading(false)
    //   setShowError(true)
    // }

    resetPwdMutation.mutateAsync(dataSubmit).then(() => {
      setSendMailData(dataSubmit.email)
    })
  }

  return (
    <>
      {sendMailSuccess ? (
        <ConfirmSendMail
          message={`비밀번호 재설정 메일을 \n${sendMailData}로 보냈어요.\n혹시 이메일이 오지 않았나요? 스팸함을 확인하거나 다시 받아보세요.`}
          onBack={() => {
            setSendMailSuccess(false)
          }}
          resendTitle='이메일 다시 보내기'
          onResend={() => {
            onSubmit({
              email: sendMailData
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
            계정 찾기를 위해 이메일을 입력해주세요.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Stack justifyContent={'center'} my={5} gap={3}>
              <ControlInput
                fullWidth={true}
                register={register}
                type='text'
                name='email'
                label='Email'
                placeholder='이메일'
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
              <PrimaryButton btnSize='md' fullWidth type='submit'>
                <Typography cate='button_40'>계정 찾기 링크발송</Typography>
              </PrimaryButton>
            </Stack>
          </form>
          <Box className={styles.register_wrapper} sx={{ marginBottom: convertToRem(8) }}>
            <Typography cate='caption_1' color={theme.palette.main_grey.gray400}>
              아직 회원이 아니신가요?
            </Typography>
            <Link href='/sign-up'>
              <Typography cate='caption_1' color={theme.palette.main_grey.gray100} sx={{ cursor: 'pointer' }}>
                회원가입
                <ChevronRightSmIcon
                  pathProps={{
                    stroke: theme.palette.main.white
                  }}
                />
              </Typography>
            </Link>
          </Box>
          <Box className={styles.register_wrapper}>
            <Typography cate='caption_1' color={theme.palette.main_grey.gray400}>
              도움이 필요할 경우{' '}
              <Typography component={'span'} cate='body_3' color={theme.palette.main.primary_light}>
                info@maincontents.com
              </Typography>{' '}
              로 문의해 주세요.
            </Typography>
          </Box>
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
      <Alert
        onSubmit={() => {
          setShowError(false)
          setErrorMessageTitle('')
          setErrorMessageSubTitle('')
        }}
        submitTxt='확인'
        icon={<MailRedIcon />}
        title={errorMessageTitle}
        description={errorMessageSubTitle}
        open={showError}
      />
    </>
  )
}

export default ForgotPassword
