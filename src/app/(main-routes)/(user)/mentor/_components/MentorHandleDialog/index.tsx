import Button from '@/elements/button'
import ControlInput from '@/elements/control-input'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Dialog, DialogContent, useMediaQuery, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm, ValidationMode } from 'react-hook-form'
import * as yup from 'yup'
import { MentorHandleDialogProps } from './MentorHandleDialog.type'
import styles from './styles.module.scss'
import { BaseChip } from '@/elements/v2/chip'
import { APPLICATION_PROGRESS, MENTORING_PROGRESS_LIST_TABS } from '@/constants/mentor.constant'
import moment from 'moment'
import { sendContactPool } from '@/actions/apis/pool.action'

export default function MentorHandleDialog({
  status,
  note,
  createdAt,
  onCancel,
  user,
  approvedAt,
  inProcessAt,
  completedAt,
  mentorWroteReviewAt,
  ...props
}: MentorHandleDialogProps) {
  const theme = useTheme()
  const mdUp = useMediaQuery('(min-width: 768px)')

  const schema = yup
    .object({
      content: yup.string().required('이름을 입력해주세요.')
    })
    .required()

  const defaultValues = {
    content: ''
  }

  useEffect(() => {
    setValue('content', note || '')
  }, [note])
  const formOptions = {
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange' as keyof ValidationMode
  }
  const { handleSubmit, formState, getValues, control, register, setValue, reset, setError } = useForm(formOptions)
  const { isValid, errors } = formState

  const sendContactMutate = useMutation({
    mutationFn: sendContactPool
  })

  const onFormSubmit = async (dataSubmit: any) => {
    const reqData = {
      content: dataSubmit.content
    }
  }
  useEffect(() => {
    setValue('content', note || '')
  }, [note])
  const handleClose = (event: React.MouseEvent<HTMLElement>, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && props.disableEscapeKeyDown) {
      event.preventDefault()
      return
    }
    reset()
    onCancel?.()
  }
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
          <Typography cate='title_70' color={theme.palette.main_grey.gray100}>
            멘토링 상세 요청사항
          </Typography>
          <Box component={'form'} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Box display={'flex'} alignItems={'center'} gap={1.5}>
                <BaseChip
                  label={
                    status === APPLICATION_PROGRESS.CANCELED
                      ? '취소'
                      : status === APPLICATION_PROGRESS.IN_PROCESS
                      ? '진행중'
                      : status === APPLICATION_PROGRESS.COMPLETE && Boolean(mentorWroteReviewAt)
                      ? MENTORING_PROGRESS_LIST_TABS.find((item) => item.value === APPLICATION_PROGRESS.WRITE_REPORT)
                          ?.label
                      : MENTORING_PROGRESS_LIST_TABS.find((item: any) => item.value === status)?.label
                  }
                  sx={{
                    backgroundColor:
                      status === APPLICATION_PROGRESS.CANCELED
                        ? theme.palette.main_grey.gray900
                        : status === APPLICATION_PROGRESS.APPROVAL
                        ? theme.palette.main_primary.blue500
                        : status === APPLICATION_PROGRESS.IN_PROCESS
                        ? theme.palette.sub.horizon_blue700
                        : status === APPLICATION_PROGRESS.COMPLETE && Boolean(mentorWroteReviewAt)
                        ? theme.palette.sub.purple100
                        : theme.palette.main_primary.blue800
                  }}
                />
                <Typography cate='sub_title_30' color={theme.palette.main_grey.gray100}>
                  {user?.nickname}
                </Typography>
              </Box>
              <Typography cate='body_30' plainColor='main_grey.gray200'>
                {moment(
                  status === APPLICATION_PROGRESS.CANCELED
                    ? theme.palette.main_grey.gray900
                    : status === APPLICATION_PROGRESS.APPROVAL
                    ? approvedAt
                    : status === APPLICATION_PROGRESS.IN_PROCESS
                    ? inProcessAt
                    : status === APPLICATION_PROGRESS.COMPLETE && !Boolean(mentorWroteReviewAt)
                    ? completedAt
                    : mentorWroteReviewAt
                ).format('YYYY.MM.DD HH:mm')}
              </Typography>
            </Box>
            <Box display={'flex'} flexDirection='column' alignItems='flex-start' width={'100%'} gap={1}>
              <Typography cate='sub_title_40' color={theme.palette.main_grey.gray100}>
                요청사항
              </Typography>
              <ControlInput
                name='content'
                fullWidth
                disabled
                maxLength={500}
                multiline
                register={register}
                placeholder='수신자에게 전달할 메세지를 입력해주세요.'
                control={control}
                sx={{
                  height: convertToRem(128) + ' !important',
                  paddingY: '1rem !important',
                  paddingX: '0 !important',
                  fieldset: {
                    padding: '0 !important'
                  },
                  '.MuiInputAdornment-root': {
                    display: 'none'
                  },
                  '.MuiInputBase-input': {
                    overflow: 'auto',
                    width: '100%',
                    height: '100% !important'
                  }
                }}
              />
            </Box>
          </Box>
          <Box display={'flex'} alignItems={'center'} justifyContent={mdUp ? 'flex-end' : 'center'} width={'100%'}>
            <Button
              sx={{
                marginLeft: '0.5rem',
                width: mdUp ? convertToRem(120) : '100%',
                height: convertToRem(44)
              }}
              onClick={() => {
                reset()
                onCancel?.()
              }}
              customType={'active'}
              cate={'primary'}
              isOnFormPopup
              customTitle={<Typography cate='body_3_semibold'>확인</Typography>}
              fullWidth
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
