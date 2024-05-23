import { sendContactPool } from '@/actions/apis/pool.action'
import CloseCircleIcon from '@/assets/icons/close-circle'
import { MENTOR_PRODUCT_TYPE } from '@/constants/mentor.constant'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  IconButton,
  PrimaryButton,
  PrimaryTextarea,
  SelectStack,
  SolidInput
} from '@/elements'
import Button from '@/elements/button'
import Typography from '@/elements/typography'
import DatePicker from '@/libs/datepicker/DatePicker'
import { color_gray } from '@/themes/system-palette'
import { convertToRem } from '@/utils/convert-to-rem'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Dialog, DialogContent, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Controller, ValidationMode, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { UpdateBankAccountPopupProps } from './update-bank-account-popup'
import styles from './styles.module.scss'
import { phoneNumberReplaceRegex, phoneOptionalValidator, phoneValidator } from '@/utils/validation'
import { GrayButton, SecondaryGrayButton } from '@/elements/v2/button'
import { IBank, getBankList } from '@/services/common.service'
import { setMaxLength } from '@/utils/set-max-length'
import { updateMentorBankAccount } from '@/services/mentoring.service'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/atoms/user'

export default function UpdateBankAccountPopup({
  onCancel,
  bankAccountName,
  bankName,
  bankAccountNumber,
  onSubmit,
  ...props
}: UpdateBankAccountPopupProps) {
  const theme = useTheme()
  const userData = useRecoilValue(userAtom)
  const mdUp = useMediaQuery('(min-width: 768px)')
  const schema = yup
    .object({
      bankAccountName: yup.string().required('이름을 입력해주세요.'),
      bankAccountNumber: yup.string().required().max(20),
      bankName: yup.string().required('이름을 입력해주세요.')
    })
    .required()

  const defaultValues = {
    bankAccountName: '',
    bankAccountNumber: '',
    bankName: ''
  }

  const formOptions = {
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange' as keyof ValidationMode
  }
  const form = useForm(formOptions)
  const { formState, getValues, reset } = form
  const { isValid, isDirty } = formState
  const { data: listBankAccounts } = useQuery({
    queryKey: ['list-bank'],
    queryFn: () => getBankList()
  })

  const updateMentorBankMutate = useMutation({
    mutationFn: updateMentorBankAccount,
    onSuccess: () => {
      reset()
      onSubmit?.()
    }
  })

  const onFormSubmit = async () => {
    const reqData = getValues()
    updateMentorBankMutate.mutate({
      bankAccountName: reqData.bankAccountName || '',
      bankAccountNumber: reqData.bankAccountNumber || '',
      bankName: reqData.bankName || '',
      id: userData?.mentoringId || 0
    })
  }

  const handleClose = (event: React.MouseEvent<HTMLElement>, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason && reason === 'backdropClick' && props.disableEscapeKeyDown) {
      event.preventDefault()
      return
    }
    reset()
    onCancel?.()
  }

  useEffect(() => {
    reset({
      bankAccountName: bankAccountName || '',
      bankAccountNumber: bankAccountNumber || '',
      bankName: bankName || ''
    })
  }, [props.open])

  return (
    <Dialog
      // onClose={handleClose}
      {...props}
      classes={{
        root: styles.popup_root
      }}
      sx={{
        '& ..MuiDialog-paper': {
          width: ' 100%',
          margin: 'auto 27.5px !important'
          // @media screen and (max-width: 768px) {
          // 	margin: auto rem-convert(20px) !important;
          // }
        },
        '& .MuiDialog-container': {
          [theme.breakpoints.down('md')]: {
            margin: '0 20px'
          },
          margin: '0',
          width: '100%',
          maxWidth: convertToRem(720) + ' !important'
        },
        '& .MuiPaper-root': {
          display: 'flex',
          justifyContent: 'center',
          margin: 0,
          backgroundImage: 'none',
          maxWidth: convertToRem(560) + ' !important',
          width: '100%'
        }
      }}
    >
      <DialogContent
        sx={{
          backgroundColor: theme.palette.main_grey.gray800,
          padding: convertToRem(32) + ' !important',
          width: '100%'
        }}
      >
        <Box sx={{ padding: 0 }} display={'flex'} flexDirection={'column'} gap={mdUp ? 5 : 3}>
          <Box display={'flex'} justifyContent='space-between' alignItems={'flex-start'}>
            <Stack gap={1}>
              <Typography cate={mdUp ? 'title_70' : 'title_60'} color={theme.palette.main_grey.gray100}>
                지급 계좌 등록하기
              </Typography>
              <Typography cate='body_30' color={theme.palette.main_grey.gray200}>
                정산금을 지급받을 계좌를 등록해주세요.
              </Typography>
            </Stack>
          </Box>
          <Form {...form}>
            <FormField
              control={form.control}
              name='bankName'
              render={({ field }) => (
                <FormItem
                  style={{
                    flex: 1,
                    width: '100%'
                  }}
                >
                  <FormLabel>
                    <Typography cate='body_3' sx={{}}>
                      은행
                    </Typography>
                  </FormLabel>
                  <FormControl mt={1}>
                    <SelectStack
                      placeholder='은행을 선택해 주세요.'
                      list={listBankAccounts?.data?.banks?.map((i: IBank) => ({ value: i.code, label: i.name })) || []}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='bankAccountName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Typography cate='body_3' color={theme.palette.main_grey.gray100}>
                      예금주{' '}
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <SolidInput
                      fullWidth
                      inputSize={'md'}
                      inputProps={{
                        maxLength: 30
                      }}
                      placeholder='예금주를 입력해주세요.'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='bankAccountNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Typography cate='body_3' color={theme.palette.main_grey.gray100}>
                      계좌번호{' '}
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <SolidInput
                      fullWidth
                      inputSize={'md'}
                      inputProps={{
                        maxLength: 20
                      }}
                      placeholder='계좌번호를 입력해주세요.'
                      {...field}
                      onChange={(event) => {
                        field.onChange(setMaxLength(event?.target?.value?.replace(phoneNumberReplaceRegex, ''), 20))
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
          <Box display={'flex'} alignItems={'center'} justifyContent={mdUp ? 'flex-end' : 'center'} width={'100%'}>
            <GrayButton
              sx={{
                width: mdUp ? convertToRem(120) : '100%',
                height: convertToRem(44),
                bgcolor: color_gray[700]
              }}
              onClick={handleClose}
            >
              <Typography cate='button_30' color={color_gray[300]}>
                취소
              </Typography>
            </GrayButton>
            <Button
              sx={{
                marginLeft: '0.5rem',
                width: mdUp ? convertToRem(135) : '100%',
                height: convertToRem(44)
              }}
              onClick={() => {
                onFormSubmit()
              }}
              disabled={!isValid || !isDirty}
              cate='primary'
              isOnFormPopup
              customTitle={<Typography cate='button_30'>계좌 저장하기</Typography>}
              fullWidth
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
