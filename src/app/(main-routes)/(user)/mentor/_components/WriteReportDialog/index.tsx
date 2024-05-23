import { sendContactPool } from '@/actions/apis/pool.action'
import CloseCircleIcon from '@/assets/icons/close-circle'
import { MENTOR_PRODUCT_TYPE } from '@/constants/mentor.constant'
import { Form, FormControl, FormField, FormItem, FormLabel, IconButton, PrimaryTextarea, SolidInput } from '@/elements'
import Button from '@/elements/button'
import Typography from '@/elements/typography'
import DatePicker from '@/libs/datepicker/DatePicker'
import { color_gray } from '@/themes/system-palette'
import { convertToRem } from '@/utils/convert-to-rem'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Dialog, DialogContent, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Controller, ValidationMode, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { WriteReportDialogProps } from './WriteReportDialog'
import styles from './styles.module.scss'
import { DesignedSecondaryButton, GrayButton, OutlineBlue300Button, SecondaryGrayButton } from '@/elements/v2/button'

export default function WriteReportDialog({
  status,
  createdAt,
  onCancel,
  user,
  isViewMode,
  mentorReport,
  mentorWroteReviewAt,
  productContent,
  onWriteReport,
  ...props
}: WriteReportDialogProps) {
  const theme = useTheme()
  const mdUp = useMediaQuery('(min-width: 768px)')
  const schema = yup
    .object({
      content: yup.string().required('이름을 입력해주세요.'),
      date: yup.mixed<Date>().required('')
    })
    .required()

  const defaultValues = {
    content: '',
    date: new Date()
  }

  const formOptions = {
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange' as keyof ValidationMode
  }
  const form = useForm(formOptions)
  const { handleSubmit, formState, getValues, control, register, setValue, reset, setError } = form
  const { isValid, errors } = formState
  const [checkedTerm, setCheckedTerm] = useState<boolean>(false)

  const sendContactMutate = useMutation({
    mutationFn: sendContactPool
  })

  const onFormSubmit = async (dataSubmit: any) => {
    const reqData = {
      content: dataSubmit.content
    }
  }

  const handleClose = (event: React.MouseEvent<HTMLElement>, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason && reason === 'backdropClick' && props.disableEscapeKeyDown) {
      event.preventDefault()
      return
    }
    reset()
    onCancel?.()
    setCheckedTerm(false)
  }

  useEffect(() => {
    if (isViewMode === true) {
      setValue('date', mentorWroteReviewAt || new Date())
      setValue('content', mentorReport || '')
    }
  }, [isViewMode, mentorReport, mentorWroteReviewAt])

  return (
    <Dialog
      onClose={handleClose}
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
          margin: 0,
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
              <Typography cate='title_70' color={theme.palette.main_grey.gray100}>
                멘토링 보고서 작성
              </Typography>
              <Typography cate='body_30' color={theme.palette.main_grey.gray200}>
                진행한 멘토링의 보고서를 작성해 주세요.
              </Typography>
            </Stack>
            {/* <IconButton
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                handleClose(event)
              }}
            >
              <CloseCircleIcon />
            </IconButton> */}
          </Box>
          <Form {...form}>
            <Box display={'flex'} flexDirection='column' alignItems='flex-start' width={'100%'} gap={1}>
              <Typography cate='sub_title_40' color={theme.palette.main_grey.gray100}>
                신청자
              </Typography>

              <SolidInput
                inputProps={{
                  maxLength: 40
                }}
                disabled
                sx={{
                  '&.Mui-disabled': {
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent'
                    }
                  }
                }}
                fullWidth
                inputSize='md'
                placeholder='한줄 소개를 입력해주세요. (글자 수 40자 제한)'
                value={`${user?.nickname} / ${productContent?.product?.name === MENTOR_PRODUCT_TYPE.TWENTY_MINUTES
                    ? '20분 화상 멘토링'
                    : productContent?.product?.name === MENTOR_PRODUCT_TYPE.FORTY_MINUTES
                      ? '40분 화상 멘토링'
                      : '1시간 대면 멘토링'
                  }`}
              />
            </Box>
            <Stack>
              <Typography cate='sub_title_40' color={theme.palette.main_grey.gray100}>
                진행일
              </Typography>
              <Controller
                control={control}
                name='date'
                render={({ field: { value, onChange } }) => {
                  return (
                    <DatePicker
                      style={{
                        backgroundColor: color_gray[700]
                      }}
                      onDateChange={function (date: Date): void {
                        onChange(date)
                      }}
                      disabled={isViewMode}
                      value={value}
                      labelProps={{
                        required: undefined,
                        label: ''
                      }}
                    />
                  )
                }}
              />
            </Stack>
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Typography cate='sub_title_40' color={theme.palette.main_grey.gray100}>
                      보고 내용
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <PrimaryTextarea
                      sx={{
                        minHeight: '128px !important',
                        height: 'auto !important',
                        width: '100%',
                        boxShadow: 'none'
                      }}
                      disabled={isViewMode}
                      placeholder='수신자에게 전달할 메세지를 입력해주세요..'
                      maxLength={500}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
          <Box display={'flex'} alignItems={'center'} justifyContent={mdUp ? 'flex-end' : 'center'} width={'100%'}>
            {!isViewMode && (
              <GrayButton
                sx={{
                  marginLeft: '0.5rem',
                  width: mdUp ? convertToRem(120) : '100%',
                  height: convertToRem(44),
                  backgroundColor: color_gray[700]
                }}
                onClick={(event: any) => {
                  handleClose(event)
                }}
              >
                <Typography cate='body_3_semibold'>취소</Typography>
              </GrayButton>
            )}
            <Button
              sx={{
                marginLeft: '0.5rem',
                width: mdUp ? convertToRem(149) : '100%',
                height: convertToRem(44)
              }}
              onClick={(event) => {
                if (isViewMode) {
                  handleClose(event)
                } else {
                  onWriteReport?.(getValues('content'))
                }
              }}
              customType={'active'}
              disabled={!isViewMode && !isValid}
              cate={'primary'}
              isOnFormPopup
              customTitle={<Typography cate='body_3_semibold'>{isViewMode ? '닫기' : '보고서 저장하기'}</Typography>}
              fullWidth
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
