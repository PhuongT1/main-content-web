'use client'
import { CheckRoundIcon } from '@/assets/icons'
import { VERIFY_STEP } from '@/constants/community/educational-event.constant'
import { CustomInput, DesignedPrimaryButton, DesignedSecondaryButton, Typography } from '@/elements'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/elements/v2/form'
import { LabelProps } from '@/elements/v2/label'
import { useDialog } from '@/hooks/use-dialog'
import { useUserProfile } from '@/hooks/use-user-profile'
import { sendOtp, verifyOtp } from '@/services/auth.service'
import { convertToRem } from '@/utils/convert-to-rem'
import { formatPhoneNumber } from '@/utils/format-phone-number'
import { Box, InputAdornment } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import Countdown from 'react-countdown'
import { UseFormReturn } from 'react-hook-form'
import { VerifyPhoneAlert } from '..'

type EditablePhoneField<T> = {
  form: UseFormReturn<{ contact?: string; otp?: string }>
  labelProps?: LabelProps
  getIsValid: (isValid: boolean) => void
}

const SIX_MIN = 3 * 60 * 1000
// const COUNTDOWN_TIME = Date.now() + SIX_MIN

const CountdownContent = ({ minutes, seconds }: { minutes: string | number; seconds: string | number }) => {
  return (
    <span>
      {minutes}:{seconds === 0 ? '00' : seconds}
    </span>
  )
}
const EditablePhoneField = <T,>({ form, labelProps, getIsValid }: EditablePhoneField<T>) => {
  const [verifyStep, setVerifyStep] = useState(VERIFY_STEP.WAITING_SEND_OTP)
  const [isPhoneNumberVerified, setPhoneNumberVerified] = useState(true)
  const { onOpen: onOpenVerifyPhone, open: openVerifyPhone, onClose: onCloseVerifyPhone } = useDialog()
  const { user, prefetchUserProfile } = useUserProfile()

  const watchingContact = form.watch('contact')
  const watchingOtp = form.watch('otp')

  const isContactDirty = form.formState.dirtyFields.contact
  const formattedContact = watchingContact?.replaceAll('-', '') || ''
  const isDisabledSendOtpBtn = isPhoneNumberVerified || verifyStep === VERIFY_STEP.WAITING_VERIFY_OTP
  const isDisabledVerifyOtpBtn =
    verifyStep !== VERIFY_STEP.WAITING_VERIFY_OTP ||
    (verifyStep === VERIFY_STEP.WAITING_VERIFY_OTP && (watchingOtp?.length || 0) < 6)

  const Timer = useMemo(() => {
    return verifyStep === VERIFY_STEP.WAITING_VERIFY_OTP ? (
      <Countdown
        onComplete={() => {
          setVerifyStep(VERIFY_STEP.WAITING_SEND_OTP)
        }}
        renderer={CountdownContent}
        date={Date.now() + SIX_MIN}
      />
    ) : null
  }, [verifyStep])

  const sendOtpAct = useMutation({
    mutationFn: async (phone: string) => {
      const { data, error } = await sendOtp(phone)

      if (error) throw error

      return data
    },
    onSuccess: (result) => {
      if (result.data) {
        setVerifyStep(VERIFY_STEP.WAITING_VERIFY_OTP)
      }
    },
    onError: (err: any) => {
      form.setError('contact', {
        message: err.error.message || ''
      })
    }
  })

  const verifyOtpAct = useMutation({
    mutationFn: async (otp: string) => {
      const { data, error } = await verifyOtp(otp)

      if (error) throw error

      return data
    },
    onSuccess: async (res) => {
      if (res.data.message) {
        const result = await prefetchUserProfile()
        if (result?.id) {
          setVerifyStep(VERIFY_STEP.WAITING_SEND_OTP)
          setPhoneNumberVerified(true)
          form.resetField('otp')
        }
      }
    },
    onError: (error: any) => {
      form.setError('otp', {
        message: error.message || ''
      })
    }
  })

  const handleVerifyOtp = () => {
    if (watchingOtp && watchingOtp.length === 6) {
      verifyOtpAct.mutate(watchingOtp)
    }
  }

  const handleSendOtp = () => {
    const invalid = form.getFieldState('contact').invalid
    if (!invalid) {
      sendOtpAct.mutate(formattedContact)
    }
  }

  const resetPhoneNumber = () => {
    if (user) {
      const { phoneNumber, isPhoneNumberVerified } = user
      form.setValue('contact', formatPhoneNumber(phoneNumber) || '')
      setPhoneNumberVerified(!!isPhoneNumberVerified)
    }
  }

  useEffect(() => {
    if (isPhoneNumberVerified && isContactDirty && user?.phoneNumber !== formattedContact) {
      onOpenVerifyPhone()
    }
    form.clearErrors('contact')
    setVerifyStep(VERIFY_STEP.WAITING_SEND_OTP)
  }, [watchingContact])

  useEffect(() => {
    if (user) {
      resetPhoneNumber()
      form.trigger('contact')
    }
  }, [user])

  useEffect(() => {
    getIsValid(isPhoneNumberVerified && verifyStep === VERIFY_STEP.WAITING_SEND_OTP)
  }, [isPhoneNumberVerified, verifyStep])

  return (
    <Box>
      <FormField
        control={form?.control}
        name='contact'
        render={({ field }) => (
          <FormItem>
            <FormLabel required {...labelProps}>
              연락처
            </FormLabel>
            <FormControl display={'flex'} gap={1}>
              <CustomInput
                type='tel'
                maxLength={13}
                endAdornment={
                  isPhoneNumberVerified && (
                    <InputAdornment position='end'>
                      <CheckRoundIcon />
                    </InputAdornment>
                  )
                }
                fullWidth
                placeholder='연락처를 입력해주세요'
                {...field}
              />
              <DesignedPrimaryButton
                onClick={handleSendOtp}
                disabled={isDisabledSendOtpBtn}
                sx={{ flexShrink: 0, minWidth: { md: convertToRem(160), sm: convertToRem(100) } }}
                btnSize='md-np'
              >
                <Typography
                  cate='button_30'
                  plainColor='main_grey.gray100'
                  sx={{
                    whiteSpace: 'pre-line',
                    flexShrink: 0,
                    opacity: isDisabledSendOtpBtn ? 0.5 : 1
                  }}
                >
                  {isPhoneNumberVerified ? '핸드폰 인증' : '인증번호 전송'}
                </Typography>
              </DesignedPrimaryButton>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {!isPhoneNumberVerified && (
        <FormField
          control={form?.control}
          name='otp'
          render={({ field }) => (
            <FormItem>
              <FormControl
                display={'flex'}
                gap={1}
                flexDirection={{
                  md: 'row',
                  xs: 'column'
                }}
              >
                <CustomInput
                  type='onlyNumber'
                  maxLength={6}
                  fullWidth
                  placeholder='인증번호를 입력해주세요.'
                  endAdornment={Timer}
                  {...field}
                />
                <DesignedSecondaryButton
                  onClick={handleVerifyOtp}
                  disabled={isDisabledVerifyOtpBtn}
                  sx={{
                    flexShrink: 0,
                    minWidth: { md: convertToRem(160), sm: convertToRem(100) },
                    width: {
                      md: 'fit-content',
                      xs: '100%'
                    }
                  }}
                  btnSize='designed-md'
                >
                  인증번호 확인
                </DesignedSecondaryButton>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <VerifyPhoneAlert
        title='휴대폰 번호를 변경하려면, 재 인증이 필요합니다.'
        description='휴대폰 번호를 변경하고, 인증을 다시 진행하시겠습니까?'
        onCancel={() => {
          resetPhoneNumber()
          onCloseVerifyPhone()
        }}
        onSubmit={() => {
          setPhoneNumberVerified(false)
          onCloseVerifyPhone()
        }}
        open={openVerifyPhone}
        cancelTxt='취소'
        submitTxt='확인'
      />
    </Box>
  )
}

export default EditablePhoneField
