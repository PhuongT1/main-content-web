'use client'
import { getMentoring, menteeAddReview, menteeViewReview } from '@/actions/apis/mentoring.action'
import mentorImg from '@/assets/images/blank-user.png'
import { MENTOR_PRODUCT_TYPE } from '@/constants/mentor.constant'
import { WhiteInput } from '@/elements'
import Typography from '@/elements/typography'
import { GrayButton, PrimaryButton, SecondaryButton } from '@/elements/v2/button'
import { useThemeMode } from '@/hooks/use-theme-mode'
import { IMentorProfile, IReviewMentor } from '@/types/mentoring.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Avatar, Box, Dialog, DialogContent, Grid, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { enqueueSnackbar } from 'notistack'
import React, { ChangeEvent, useEffect, useState } from 'react'
import PrecautionsDescription from './components/precautions_des'
import styles from './styles.module.scss'
import { ReviewPopupProps, evaluationKeyword } from './type'

export default function MentorMenteeReviewDialog({
  title,
  description,
  onSubmit,
  onCancel,
  submitTitle,
  cancelTitle,
  review,
  viewReview,
  onClose,
  ...props
}: ReviewPopupProps) {
  const theme = useTheme()
  const queryClient = useQueryClient()
  const mdDown = useMediaQuery('(max-width: 768px)')
  const { themeMode } = useThemeMode()
  const [content, setContent] = useState<string>('')
  const [evaluateList, setEvaluateList] = useState<string[]>([])

  const handleClose = (event: React.MouseEvent<HTMLElement>, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' && props.disableEscapeKeyDown) {
      event.preventDefault()
    }
    // else {
    //   if (onCancel) {
    //     setCheckedList([])
    //     onCancel()
    //   } else if (onSubmit) {
    //     setCheckedList([])
    //     onSubmit()
    //   }
    // }
  }

  const addReviewMutation = useMutation({
    mutationKey: ['mentee-add-review', review.mentor.id],
    mutationFn: async (props: { content: string; extraKeywords: string[] }) => {
      const { data, error } = await menteeAddReview(review.mentoringId, {
        content: props.content,
        extraKeywords: props.extraKeywords,
        mentoringApplicationId: review.id
      })

      if (error) throw error

      return data
    },
    onSuccess: () => {
      onCancel?.()
      setEvaluateList([])
      queryClient.invalidateQueries({ queryKey: ['mentee-activity'] })
      // enqueueSnackbar('신고접수가 완료되었습니다.', { variant: 'success' })
    },
    onError: (error) => {
      onCancel?.()
      setEvaluateList([])
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
    }
  })

  const { data, isFetching } = useQuery({
    queryKey: ['mentee-review', review.mentoringId],
    queryFn: () => menteeViewReview(review.mentoringId),
    select: (data) => {
      return data.data as IReviewMentor
    },
    staleTime: 0,
    gcTime: 0,
    enabled: viewReview
  })

  const { data: mentoringData, isFetching: isFetchingMentoringData } = useQuery({
    queryKey: ['mentoring-data', review.mentoringId],
    queryFn: () => getMentoring(review.mentoringId),
    select: (data) => {
      return data.data as IMentorProfile
    }
  })

  const handleReasonChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value)
  }

  const selectEvaluate = (keyword: string) => {
    if (evaluateList.some((val) => val === keyword)) {
      const newEvaluateKeyword = evaluateList.filter((i) => i !== keyword)
      setEvaluateList(newEvaluateKeyword)
    } else {
      // Add if not selected
      setEvaluateList([...evaluateList, keyword])
    }
  }

  const mentoringOptionText = (options: MENTOR_PRODUCT_TYPE) => {
    switch (options) {
      case MENTOR_PRODUCT_TYPE.TWENTY_MINUTES:
        return '20분 영상 멘토링'
      case MENTOR_PRODUCT_TYPE.FORTY_MINUTES:
        return '40분 영상 멘토링'
      case MENTOR_PRODUCT_TYPE.AN_HOUR:
        return '1시간 영상 멘토링'
      default:
        return '20분 영상 멘토링'
    }
  }

  useEffect(() => {
    if (viewReview && data && !isFetching) {
      setEvaluateList(data.extraKeywords)
      setContent(data.content)
    }
  }, [viewReview, isFetching, data])

  return (
    <Dialog
      onClose={handleClose}
      {...props}
      classes={{
        paper: styles.popup_paper,
        // container: styles.popup_container,
        root: styles.popup_root
      }}
      keepMounted={false}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: 'unset',
          width: { md: convertToRem(560), sm: '100%' }
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
          <Stack gap={1} justifyContent={'flex-start'} alignItems={'flex-start'}>
            <Typography
              cate={mdDown ? 'title_60' : 'title_70'}
              plainColor='popup.general.title'
              className={`${styles.title}`}
            >
              {title}
            </Typography>
            <Typography cate='body_20' plainColor='popup.general.subtitle' className={`${styles.description}`}>
              {description}
            </Typography>
          </Stack>
          <Stack
            width={'100%'}
            direction={{ md: 'row', sm: 'column' }}
            justifyContent={'flex-start'}
            alignItems={'center'}
            gap={3}
          >
            {mentoringData && (
              <Avatar
                sx={{
                  height: convertToRem(120),
                  width: convertToRem(120)
                }}
              >
                {mentoringData.user.avatar ? (
                  <Image
                    src={mentoringData.user.avatar.url ? mentoringData.user.avatar.url : mentorImg}
                    alt='mentor-avatar'
                    fill
                  />
                ) : (
                  <Image src={mentorImg} alt='mentor-avatar' fill />
                )}
              </Avatar>
            )}

            {mentoringData && (
              <Stack width={'100%'} alignItems={{ md: 'flex-start', sm: 'center' }}>
                <Typography cate='body_30' plainColor='main_primary.blue500'>
                  {mentoringData.nameOfAffiliation}
                </Typography>
                <Stack direction={'row'} gap={1}>
                  <Typography cate='title_40'>{mentoringData.user.username} 멘토</Typography>
                </Stack>
                <Box
                  sx={{
                    height: convertToRem(16)
                  }}
                />
                <table width={'100%'}>
                  <tr>
                    <td width={60}>
                      <Typography cate='body_20'>전문분야</Typography>
                    </td>
                    <td>
                      <Typography cate='body_20'>
                        {mentoringData.categories.map((val) => val.name).join(',')}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td width={60}>
                      <Typography cate='body_20'>멘토링</Typography>
                    </td>
                    <td>
                      <Typography cate='body_20'>
                        {mentoringOptionText(review.productContent.product.name as MENTOR_PRODUCT_TYPE)}
                      </Typography>
                    </td>
                  </tr>
                </table>
              </Stack>
            )}
          </Stack>

          <Stack direction='column' alignItems='flex-start' gap={3} width={'100%'}>
            <Stack direction={'row'} gap={1} alignItems={'center'}>
              <Typography cate={mdDown ? 'sub_title_40' : 'title_50'}>
                키워드 평가
                <Typography component={'span'} plainColor={'sub.error_red'} cate={'title_50'}>
                  *
                </Typography>
              </Typography>
              <Typography cate={'body_20'} plainColor={'main_grey.gray300'}>
                (최대 5개 선택)
              </Typography>
            </Stack>
            <Grid container spacing={1}>
              {evaluationKeyword?.map((item: string, index: number) => (
                <Grid item xs={12} md={6} key={index}>
                  {evaluateList.includes(item) ? (
                    <PrimaryButton
                      btnSize={'full'}
                      onClick={() => {
                        !viewReview ? selectEvaluate(item) : undefined
                      }}
                      sx={{
                        width: '100%'
                      }}
                    >
                      <Typography cate='caption_10'>{item}</Typography>
                    </PrimaryButton>
                  ) : (
                    <SecondaryButton
                      btnSize='full'
                      onClick={() => {
                        !viewReview ? selectEvaluate(item) : undefined
                      }}
                      sx={{
                        width: '100%',
                        opacity: evaluateList.length >= 5 ? 0.3 : 1
                      }}
                      disabled={evaluateList.length >= 5}
                    >
                      <Typography cate='caption_10' plainColor='main_grey.gray200'>
                        {item}
                      </Typography>
                    </SecondaryButton>
                  )}
                </Grid>
              ))}
            </Grid>
            <Stack gap={1} width={'100%'}>
              {viewReview ? (
                <Typography cate={mdDown ? 'sub_title_40' : 'title_50'}>
                  리뷰 내용
                  <Typography component={'span'} plainColor={'sub.error_red'} cate={'title_50'}>
                    *
                  </Typography>
                </Typography>
              ) : (
                <Typography cate={mdDown ? 'sub_title_40' : 'title_50'}>
                  리뷰 작성하기
                  <Typography component={'span'} plainColor={'sub.error_red'} cate={'title_50'}>
                    *
                  </Typography>
                </Typography>
              )}
              <WhiteInput
                name='content'
                fullWidth
                multiline
                value={content}
                readOnly={viewReview}
                onChange={handleReasonChange}
                placeholder='간단한 리뷰를 남겨주세요.'
                sx={{
                  height: convertToRem(163) + ' !important',
                  padding: '1rem !important',
                  fieldset: {
                    padding: '0 !important',
                    borderColor: 'main_grey.gray800'
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
            </Stack>
          </Stack>
          <PrecautionsDescription
            sx={{
              marginTop: convertToRem(-8)
            }}
          />
          {viewReview ? (
            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} width={'100%'}>
              <GrayButton
                sx={{
                  width: { md: convertToRem(120), sm: convertToRem(136) },
                  backgroundColor: 'main_grey.gray700',
                  '&:hover': {
                    backgroundColor: 'main_grey.gray600'
                  }
                }}
                btnSize='xs-np'
                onClick={() => {
                  onCancel?.()
                  setEvaluateList([])
                  setContent('')
                }}
              >
                <Typography plainColor={'main_grey.gray300'} cate='button_30'>
                  닫기
                </Typography>
              </GrayButton>
            </Stack>
          ) : (
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={{ md: 'flex-end', sm: 'center' }}
              width={'100%'}
              gap={1}
            >
              <GrayButton
                sx={{
                  width: { md: convertToRem(120), sm: '100%' },
                  backgroundColor: 'main_grey.gray700',
                  '&:hover': {
                    backgroundColor: 'main_grey.gray600'
                  }
                }}
                btnSize='xs-np'
                onClick={() => {
                  onCancel?.()
                  setEvaluateList([])
                  setContent('')
                }}
              >
                <Typography plainColor={'main_grey.gray300'} cate='button_30'>
                  취소
                </Typography>
              </GrayButton>
              <PrimaryButton
                sx={{
                  width: { md: convertToRem(120), sm: '100%' }
                }}
                btnSize='xs-np'
                onClick={() => {
                  addReviewMutation.mutate({ content: content, extraKeywords: evaluateList })
                }}
                disabled={evaluateList.length === 0 || content === ''}
              >
                <Typography
                  cate='button_30'
                  plainColor={
                    evaluateList.length === 0 || content === '' ? 'main_grey.gray300' : 'button.primary.label'
                  }
                >
                  등록하기
                </Typography>
              </PrimaryButton>
            </Stack>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
