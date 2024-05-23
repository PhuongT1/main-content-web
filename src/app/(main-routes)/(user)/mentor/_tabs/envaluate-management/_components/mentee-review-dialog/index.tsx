import { MENTORING_BADGE } from '@/constants/community/mentoring.constant'
import { IconButton, WhiteInput } from '@/elements'
import Typography from '@/elements/typography'
import { OutlineBlue300Button, PrimaryButton, SecondaryButton } from '@/elements/v2/button'
import { mentorUpdateReviewBadge } from '@/services/mentoring.service'
import { color_gray } from '@/themes/system-palette'
import { convertToRem } from '@/utils/convert-to-rem'
import { Dialog, DialogContent, Grid, Stack, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import moment from 'moment'
import { enqueueSnackbar } from 'notistack'
import React, { MouseEventHandler } from 'react'
import styles from './styles.module.scss'
import { ReviewPopupProps } from './type'
import CloseCircleIcon from '@/assets/icons/close-circle'

export default function MenteeReviewDialog({
  title,
  description,
  onSubmit,
  onCancel,
  onReport,
  submitTitle,
  cancelTitle,
  user,
  createdAt,
  content,
  extraKeywords,
  badge,
  id,
  mentoringId,
  onClose,
  reviewId,
  ...props
}: ReviewPopupProps) {
  const theme = useTheme()

  const handleClose = (event: React.MouseEvent<HTMLElement>, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && props.disableEscapeKeyDown) {
      event.preventDefault()
    } else {
      if (onCancel) {
        onCancel()
      } else if (onSubmit) {
        onSubmit()
      }
    }
  }

  const updateReviewBadgeMutate = useMutation({
    mutationKey: ['update-review-badge-comment'],
    mutationFn: async () => {
      const body = {
        reviewId: reviewId || 0,
        mentoringId: mentoringId || 0,
        badge: badge?.includes(MENTORING_BADGE.BEST_OF_REVIEW)
          ? [...badge].filter((i) => i !== MENTORING_BADGE.BEST_OF_REVIEW)
          : !!badge && badge?.length > 0
          ? [...badge, MENTORING_BADGE.BEST_OF_REVIEW]
          : [MENTORING_BADGE.BEST_OF_REVIEW]
      }
      const { data, error } = await mentorUpdateReviewBadge(body)

      if (error) throw error

      return data
    },
    onSuccess: () => {
      onSubmit?.()
    },
    onError: (error) => {
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
    }
  })

  return (
    <Dialog
      onClose={handleClose}
      {...props}
      classes={{
        paper: styles.popup_paper,
        // container: styles.popup_container,
        root: styles.popup_root
      }}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: 'unset',
          width: { md: convertToRem(560), sm: '100%' },
          backgroundImage: 'none',
          backgroundColor: 'transparent'
        }
      }}
    >
      <DialogContent
        sx={{
          backgroundColor: theme.palette.popup.general.background.color
        }}
        className={`${styles.popup_wrapper}`}
      >
        <Stack
          direction={'column'}
          justifyContent={'center'}
          alignItems={'flex-start'}
          className={`${styles.content_wrapper}`}
          sx={{
            paddingX: convertToRem(32),
            paddingY: { md: convertToRem(32), sm: convertToRem(20) }
          }}
          gap={5}
        >
          <Stack gap={1} direction={'row'} width={'100%'} justifyContent={'space-between'} alignItems='center'>
            <Typography cate='title_70' plainColor='popup.general.title' className={`${styles.title}`}>
              {title}
            </Typography>
            <IconButton
              onClick={(event) => {
                handleClose(event)
              }}
            >
              <CloseCircleIcon />
            </IconButton>
          </Stack>
          <Stack direction={'row'} gap={2.5} justifyContent={'flex-start'} width={'100%'}>
            <Stack gap={0.5} sx={{}}>
              <Typography cate='body_20' color={color_gray[300]}>
                작성자
              </Typography>
              <Typography cate='body_20' color={color_gray[300]}>
                리뷰 등록 일시
              </Typography>
            </Stack>
            <Stack gap={0.5} sx={{}}>
              <Typography cate='body_20' color={color_gray[200]}>
                {user?.nickname}
              </Typography>
              <Typography cate='body_20' color={color_gray[200]}>
                {moment(createdAt)?.format('YYYY.MM.DD HH:mm')}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction='column' alignItems='flex-start' gap={3} width={'100%'}>
            <Stack direction={'row'} gap={1} alignItems={'center'}>
              <Typography cate={'title_50'}>키워드 평가</Typography>
            </Stack>
            <Grid container rowSpacing={1} columnSpacing={1.25}>
              {extraKeywords?.map((item: string, index: number) => (
                <Grid item xs={12} md={6} key={index}>
                  <SecondaryButton
                    btnSize='full'
                    // onClick={() => {
                    //   selectEvaluate(index)
                    // }}
                    sx={{
                      width: '100%'
                    }}
                  >
                    <Typography cate='caption_10'>{item}</Typography>
                  </SecondaryButton>
                </Grid>
              ))}
            </Grid>
            <Stack gap={1} width={'100%'}>
              <Typography cate={'title_50'}>작성 내용</Typography>
              <WhiteInput
                name='content'
                fullWidth
                multiline
                value={content}
                contentEditable={false}
                // onChange={handleReasonChange}
                placeholder='간단한 리뷰를 남겨주세요.'
                sx={{
                  height: convertToRem(163) + ' !important',
                  paddingTop: '1rem !important',
                  fieldset: {
                    padding: '0 !important',
                    border: 'none'
                  },
                  '.MuiInputAdornment-root': {
                    display: 'none'
                  },
                  '.MuiInputBase-input': {
                    padding: '0',
                    overflow: 'auto',
                    width: '100%',
                    height: '100% !important'
                  }
                }}
              />
            </Stack>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} width={'100%'} gap={1}>
            <OutlineBlue300Button
              sx={{
                width: convertToRem(120)
              }}
              btnSize='xs-np'
              onClick={() => {
                onReport?.()
              }}
            >
              <Typography cate='button_30'>신고하기</Typography>
            </OutlineBlue300Button>
            <PrimaryButton
              sx={{
                width: convertToRem(150)
              }}
              btnSize='xs-np'
              onClick={() => {
                updateReviewBadgeMutate.mutate()
              }}
            >
              <Typography cate='button_30' plainColor={'button.primary.label'}>
                {badge?.includes(MENTORING_BADGE.BEST_OF_REVIEW) ? '베스트 리뷰 해제' : '베스트 리뷰 등록'}
              </Typography>
            </PrimaryButton>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
