'use client'
import { Avatar, Stack, styled, useTheme } from '@mui/material'
import React, { FC, useMemo } from 'react'
import { USER_ROLE } from '@/constants/user.constants'
import { remConvert } from '@/utils/convert-to-rem'
import { Typography } from '@/elements'
import moment from 'moment'
import {
  TFeedBacks,
  TReportFeedbackForm
} from '@/app/(main-routes)/project-home/_modules/domain/entities/feedback-project'
import { MoreAction } from '@/app/(main-routes)/project-home/_modules/presenters/components/atoms'
import { MORE_ACTIONS_FEEDBACK, IMoreActionItem } from '@/app/(main-routes)/project-home/_modules/domain'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/atoms/user'
import { useMutation } from '@tanstack/react-query'
import {
  deleteProjectFeedbacks,
  reportProjectFeedbacks
} from '@/app/(main-routes)/project-home/_modules/use-cases/project-detail.use-cases'
import useToggle from '@/hooks/use-toggle'
import ModalReportFeedBack from './modal-report-feedback'

interface Props {
  feedbackItem: TFeedBacks
  onAfterAction: () => void
}

const OPTIONS_FEEDBACK_CREATER: IMoreActionItem[] = [
  {
    label: MORE_ACTIONS_FEEDBACK.DELETE_FEEDBACK,
    value: MORE_ACTIONS_FEEDBACK.DELETE_FEEDBACK
  }
]

const OPTIONS_FEEDBACK: IMoreActionItem[] = [
  {
    label: MORE_ACTIONS_FEEDBACK.REPORT,
    value: MORE_ACTIONS_FEEDBACK.REPORT
  }
]

const UserFeedBack: FC<Props> = ({ feedbackItem, onAfterAction }) => {
  const {
    palette: { home }
  } = useTheme()
  const { avatarUrl, nickname } = feedbackItem.user
  const user = useRecoilValue(userAtom)
  const [showReport, toggleShowReport, setToggleShowReport] = useToggle()

  const isCreaterFeedBack = useMemo(
    () => Boolean(user && user?.id === feedbackItem.userId),
    [user?.id, feedbackItem.userId]
  )

  const listOption = useMemo(() => {
    if (isCreaterFeedBack || user?.role === USER_ROLE.ADMIN) {
      return OPTIONS_FEEDBACK_CREATER
    }
    return OPTIONS_FEEDBACK
  }, [user?.id, feedbackItem.userId])

  const { mutate: onDeleteFeedBack } = useMutation({
    mutationFn: () => deleteProjectFeedbacks(feedbackItem.id),
    onSuccess: () => {
      console.log(onAfterAction)
      onAfterAction()
    },
    meta: {
      offLoading: true
    }
  })

  const { mutate: reportFeedback } = useMutation({
    mutationFn: (form: TReportFeedbackForm) => reportProjectFeedbacks(feedbackItem.id, form),
    onSuccess: () => {
      setToggleShowReport(false)
    },
    onError(error) {
      console.log({ error })
      setToggleShowReport(false)
    }
  })

  return (
    <Stack direction={'row'} width={'100%'} gap={remConvert('8px')} sx={{ paddingBlock: remConvert('12px') }}>
      <RoundGradientAvatar
        sx={{
          width: remConvert('24px'),
          height: remConvert('24px'),
          padding: 0
        }}
      >
        <Avatar
          sx={{
            width: remConvert('24px'),
            height: remConvert('24px')
          }}
          src={avatarUrl || '/images/blank-user.png'}
        />
      </RoundGradientAvatar>
      <Stack flexGrow={1} gap={remConvert('8px')}>
        <Stack
          flexDirection={'row'}
          flexGrow={1}
          gap={remConvert('9px')}
          sx={{ minHeight: remConvert('24px'), alignItems: 'center' }}
        >
          <Typography cate='sub_title_20' color={home.gray50}>
            {nickname}
          </Typography>
          <Typography cate='caption_2' color={home.gray100}>
            {moment(feedbackItem.createdAt).format('YYYY.MM.DD')}
          </Typography>
          <MoreAction
            id={`${feedbackItem.id}`}
            options={listOption}
            onActionClick={(action) => {
              if (action) {
                switch (action?.value) {
                  case MORE_ACTIONS_FEEDBACK.DELETE_FEEDBACK:
                    return onDeleteFeedBack()
                  default:
                    return setToggleShowReport(true)
                }
              }
            }}
            sx={{ marginLeft: 'auto' }}
          />
        </Stack>
        <Stack flexGrow={1} direction={'row'}>
          <Typography
            cate='caption_3'
            flexGrow={1}
            width={'100%'}
            color={home.gray50}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
              width: 0
            }}
          >
            {feedbackItem.content}
          </Typography>
        </Stack>
      </Stack>
      <ModalReportFeedBack
        open={showReport}
        onClose={() => setToggleShowReport(false)}
        onCancel={() => setToggleShowReport(false)}
        onSubmit={(form: TReportFeedbackForm) => reportFeedback(form)}
      />
    </Stack>
  )
}
export default UserFeedBack

export const Container = styled(Stack)(
  ({
    theme: {
      palette: { home }
    }
  }) => ({
    backgroundColor: home.gray300,
    borderRadius: remConvert('10px'),
    padding: remConvert('12px'),
    flexGrow: 1,
    justifyContent: 'center',
    width: 0
  })
)

const RoundGradientAvatar = styled('div')(({ theme }) => ({
  padding: '0.25rem',
  border: 'none',
  outline: 'none',
  position: 'relative',
  width: remConvert('40px'),
  height: remConvert('40px'),
  zIndex: 1,
  borderRadius: '50%',
  cursor: 'pointer',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '1px',
    right: '1px',
    top: '1px',
    bottom: '1px',
    borderRadius: '50%',
    backgroundColor: theme.palette.home.gray200,
    zIndex: -1,
    transition: '200ms'
  }
}))
