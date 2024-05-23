import { APPLICATION_PROGRESS, MENTORING_PROGRESS_LIST_TABS, MENTOR_PRODUCT_TYPE } from '@/constants/mentor.constant'
import { BaseChip } from '@/elements'
import Typography from '@/elements/typography'
import { GhostBorderButton, PrimaryButton, TextButton } from '@/elements/v2/button'
import { color_gray } from '@/themes/system-palette'
import { IMentorProduct } from '@/types/mentoring.type'
import { IUser } from '@/types/user.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Grid, ChipProps as MChipProps, useMediaQuery, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import moment from 'moment'
export type ChipProps = MChipProps & {
  type?: string
}

export enum STATUS_UPDATE {
  CANCEL = 'CANCEL',
  APPROVE = 'APPROVE'
}

type CartStartupTalkProps = {
  //   category: ICategory
  //   title: string
  //   content: string
  //   user: IUser
  //   totalView: number
  //   createdAt: Date
  //   id: number
  user: IUser
  createdAt: Date
  updatedAt: Date
  productContent: IMentorProduct
  onDelete: any
  status?: APPLICATION_PROGRESS
  approvedAt?: Date
  inProcessAt?: Date
  completedAt?: Date
  mentorWroteReviewAt?: Date
  onUpdateStatus?: any
  onChatting?: any
  onWriteReview?: any
  onMoveToMenteeReview?: any
  onWatchReview?: any
  onShowMenteeInquiry?: any
}

export default function CardMentoring({
  //   category,
  //   title,
  //   content,
  //   user,
  //   totalView,
  //   createdAt,
  //   id,
  //   isBookmark,
  user,
  createdAt,
  updatedAt,
  productContent,
  approvedAt,
  inProcessAt,
  completedAt,
  mentorWroteReviewAt,
  onShowMenteeInquiry,
  onUpdateStatus,
  onChatting,
  onMoveToMenteeReview,
  onWatchReview,
  onWriteReview,
  status = APPLICATION_PROGRESS.CANCELED
}: CartStartupTalkProps) {
  const theme = useTheme()
  const md = useMediaQuery('(max-width: 768px)')
  const xs = useMediaQuery('(max-width: 375px)')
  const applicationEnable = status !== APPLICATION_PROGRESS.CANCELED && status !== APPLICATION_PROGRESS.ALL
  const inProcessEnable =
    status !== APPLICATION_PROGRESS.CANCELED &&
    status !== APPLICATION_PROGRESS.ALL &&
    status !== APPLICATION_PROGRESS.PENDING
  const reportEnable = status === APPLICATION_PROGRESS.COMPLETE && Boolean(mentorWroteReviewAt)
  const completeEnable = status === APPLICATION_PROGRESS.COMPLETE || status === APPLICATION_PROGRESS.WRITE_REPORT

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.main_grey.gray800,
        borderRadius: convertToRem(16)
      }}
    >
      <Box
        sx={{
          zIndex: 1,
          height: '100%',
          padding: 3,
          width: '100%',
          backgroundColor: theme.palette.main_grey.gray800,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Box display={'flex'} alignItems='center' justifyContent={'space-between'} width={'100%'}>
          <Box display={'flex'} alignItems='center' gap={1.5}>
            <BaseChip
              label={
                status === APPLICATION_PROGRESS.CANCELED
                  ? '취소'
                  : status === APPLICATION_PROGRESS.IN_PROCESS
                  ? '진행중'
                  : reportEnable
                  ? MENTORING_PROGRESS_LIST_TABS.find((item) => item.value === APPLICATION_PROGRESS.WRITE_REPORT)?.label
                  : MENTORING_PROGRESS_LIST_TABS.find((item: any) => item.value === status)?.label
              }
              sx={{
                backgroundColor:
                  status === APPLICATION_PROGRESS.CANCELED
                    ? theme.palette.main_grey.gray900
                    : status === APPLICATION_PROGRESS.PENDING
                    ? theme.palette.main_primary.blue500
                    : status === APPLICATION_PROGRESS.IN_PROCESS
                    ? theme.palette.sub.horizon_blue700
                    : reportEnable
                    ? theme.palette.sub.purple100
                    : theme.palette.main_primary.blue800
              }}
            />
            <Typography cate='sub_title_30'>{user.nickname}</Typography>
          </Box>
          <Typography cate='body_30' plainColor='main_grey.gray200'>
            {moment(createdAt).format('YYYY.MM.DD HH:mm')}
          </Typography>
        </Box>
        <Box display={'flex'} alignItems='center' justifyContent={'space-between'} width={'100%'}>
          <Typography cate='body_50'>
            {productContent.product?.name === MENTOR_PRODUCT_TYPE.TWENTY_MINUTES
              ? '20분 영상 멘토링'
              : productContent.product?.name === MENTOR_PRODUCT_TYPE.FORTY_MINUTES
              ? '40분 영상 멘토링'
              : '1시간 대면 멘토링'}
          </Typography>
          <TextButton
            btnSize='sm-np'
            onClick={() => {
              onShowMenteeInquiry()
            }}
            sx={{
              marginTop: convertToRem(16),
              gap: 0,
              padding: 0
            }}
          >
            <Typography cate='button_30' plainColor={'sub.teal400'}>
              요청사항 조회
            </Typography>
          </TextButton>
        </Box>
        <Grid container width={'100%'} sx={{ opacity: status === APPLICATION_PROGRESS.CANCELED ? 0.5 : 1 }}>
          <Grid
            item
            md={3}
            xs={12}
            height={convertToRem(48)}
            display={'flex'}
            flexDirection='column'
            alignItems={'center'}
            justifyContent={'center'}
            gap={0.5}
            sx={{
              backgroundColor: applicationEnable ? theme.palette.main_primary.blue500 : theme.palette.main_grey.gray600
            }}
          >
            <Typography cate='button_30' plainColor={applicationEnable ? 'main_grey.gray100' : 'main_grey.gray400'}>
              신청
            </Typography>
            {applicationEnable && <Typography cate='caption_5'>{moment(createdAt).format('YYYY.MM.DD')}</Typography>}
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            height={convertToRem(48)}
            display={'flex'}
            flexDirection='column'
            alignItems={'center'}
            justifyContent={'center'}
            gap={0.5}
            sx={{
              backgroundColor: inProcessEnable ? theme.palette.sub.horizon_blue700 : theme.palette.main_grey.gray600
            }}
          >
            <Typography cate='button_30' plainColor={inProcessEnable ? 'main_grey.gray100' : 'main_grey.gray400'}>
              진행중
            </Typography>
            {inProcessEnable && <Typography cate='caption_5'>{moment(inProcessAt).format('YYYY.MM.DD')}</Typography>}
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            height={convertToRem(48)}
            display={'flex'}
            flexDirection='column'
            alignItems={'center'}
            justifyContent={'center'}
            gap={0.5}
            sx={{
              backgroundColor: completeEnable ? theme.palette.main_primary.blue800 : theme.palette.main_grey.gray600
            }}
          >
            <Typography cate='button_30' plainColor={completeEnable ? 'main_grey.gray100' : 'main_grey.gray400'}>
              완료
            </Typography>
            {completeEnable && <Typography cate='caption_5'>{moment(completedAt).format('YYYY.MM.DD')}</Typography>}
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            height={convertToRem(48)}
            display={'flex'}
            flexDirection='column'
            alignItems={'center'}
            justifyContent={'center'}
            gap={0.5}
            sx={{
              backgroundColor: reportEnable ? theme.palette.sub.purple100 : theme.palette.main_grey.gray600
            }}
          >
            <Typography cate='button_30' plainColor={reportEnable ? 'main_grey.gray100' : 'main_grey.gray400'}>
              보고서 작성
            </Typography>
            {reportEnable && (
              <Typography cate='caption_5'>{moment(mentorWroteReviewAt).format('YYYY.MM.DD')}</Typography>
            )}
          </Grid>
        </Grid>
        <Box
          display='flex'
          alignItems={'center'}
          width={'100%'}
          gap={1}
          justifyContent={status === APPLICATION_PROGRESS.CANCELED ? 'flex-start' : 'flex-end'}
        >
          {status === APPLICATION_PROGRESS.CANCELED && (
            <Typography plainColor='sub.red500'>멘토에 의해 접수가 취소되었습니다.</Typography>
          )}
          {status === APPLICATION_PROGRESS.PENDING && (
            <GhostBorderButton
              btnSize='sm'
              onClick={() => {
                onUpdateStatus(APPLICATION_PROGRESS.CANCELED)
              }}
              sx={{
                height: convertToRem(44),
                padding: '13px 24px',
                width: 'auto',
                borderRadius: 1000
              }}
            >
              <Typography cate='button_20' color={color_gray[200]}>
                신청 취소
              </Typography>
            </GhostBorderButton>
          )}
          {status === APPLICATION_PROGRESS.PENDING && (
            <GhostBorderButton
              btnSize='sm'
              onClick={() => {
                onUpdateStatus(APPLICATION_PROGRESS.IN_PROCESS)
              }}
              sx={{
                height: convertToRem(44),
                borderColor: theme.palette.main_primary.blue300,
                background: theme.palette.main_primary.blue400,
                padding: '13px 24px',
                width: 'auto',
                borderRadius: 1000
              }}
            >
              <Typography cate='button_20' plainColor='main_grey.gray100'>
                진행
              </Typography>
            </GhostBorderButton>
          )}
          {status === APPLICATION_PROGRESS.IN_PROCESS && (
            <GhostBorderButton
              btnSize='sm'
              onClick={() => {
                onChatting()
              }}
              sx={{
                height: convertToRem(44),
                borderColor: theme.palette.main_primary.blue300,
                background: theme.palette.main_primary.blue400,
                padding: '13px 24px',
                width: 'auto',
                borderRadius: 1000
              }}
            >
              <Typography cate='button_20'>멘티와 1:1 채팅 시작하기</Typography>
            </GhostBorderButton>
          )}

          {status === APPLICATION_PROGRESS.COMPLETE && !Boolean(mentorWroteReviewAt) && (
            <PrimaryButton
              color='primary'
              btnSize='sm'
              onClick={() => {
                onWriteReview()
              }}
              sx={{
                height: convertToRem(44),
                borderColor: theme.palette.main_primary.blue300,
                background: theme.palette.main_primary.blue400,
                padding: '13px 24px',
                width: 'auto',
                borderRadius: 1000
              }}
            >
              <Typography cate='button_20' plainColor='main_grey.gray100'>
                보고서 작성
              </Typography>
            </PrimaryButton>
            // <PrimaryButton
            //   color='primary'
            //   btnSize='sm'
            //   onClick={() => {
            //     onWriteReview()
            //   }}
            //   sx={{
            //     height: convertToRem(44),
            //     padding: '13px 24px',
            //     width: 'auto',
            //     borderRadius: 1000
            //   }}
            // >
            //   <Typography cate='button_20' plainColor='main_grey.gray100'>
            //     보고서 작성
            //   </Typography>
            // </PrimaryButton>
          )}
          {status === APPLICATION_PROGRESS.COMPLETE && Boolean(mentorWroteReviewAt) && (
            <GhostBorderButton
              btnSize='sm'
              onClick={() => {
                onMoveToMenteeReview()
              }}
              sx={{
                height: convertToRem(44),

                padding: '13px 24px',
                width: 'auto',
                borderRadius: 1000
              }}
            >
              <Typography cate='button_20' color={color_gray[200]}>
                리뷰확인하기
              </Typography>
            </GhostBorderButton>
          )}
          {status === APPLICATION_PROGRESS.COMPLETE && Boolean(mentorWroteReviewAt) && (
            <PrimaryButton
              btnSize='sm'
              onClick={() => {
                onWatchReview()
              }}
              sx={{
                height: convertToRem(44),
                borderColor: theme.palette.main_primary.blue300,
                background: theme.palette.main_primary.blue400,
                padding: '13px 24px',
                width: 'auto',
                borderRadius: 1000
              }}
            >
              <Typography cate='button_20' plainColor='main_grey.gray100'>
                보고서 작성 완료
              </Typography>
            </PrimaryButton>
          )}
        </Box>
      </Box>
    </Card>
  )
}
