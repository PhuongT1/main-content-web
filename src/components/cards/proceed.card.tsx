import { updateMenteeApplicationStatus } from '@/actions/apis/mentoring.action'
import CardBox from '@/components/cards/card-box'
import {
  APPLICATION_PROGRESS,
  MANAGE_TYPE,
  MENTEE_PROGRESS_LIST_TABS,
  MENTORING_PROGRESS_LIST_TABS,
  MENTOR_PRODUCT_TYPE
} from '@/constants/mentor.constant'
import { BaseChip, GhostBorderButton, PrimaryButton, Typography } from '@/elements'
import { Mentee, ProductContent } from '@/types/mentoring/mentee.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Grid, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import moment from 'moment'

type ProceedCardProps = {
  onCancel?: () => void
  onReview?: () => void
  onViewReview?: () => void
  onChat?: () => void
  stage: APPLICATION_PROGRESS
  type: MANAGE_TYPE
  product: ProductContent
  data: Mentee
  mentoringID: number
  createAt: Date | string
}

const ProceedCard = ({
  stage,
  onCancel,
  onReview,
  onViewReview,
  onChat,
  type,
  data,
  product,
  createAt,
  mentoringID
}: ProceedCardProps) => {
  const theme = useTheme()
  const queryClient = useQueryClient()
  const mdDown = useMediaQuery('(max-width: 768px)')
  // const applicationEnable = stage !== APPLICATION_PROGRESS.CANCELED && stage !== APPLICATION_PROGRESS.ALL
  const inProcessEnable =
    stage !== APPLICATION_PROGRESS.CANCELED &&
    stage !== APPLICATION_PROGRESS.ALL &&
    stage !== APPLICATION_PROGRESS.APPROVAL &&
    stage !== APPLICATION_PROGRESS.PENDING
  const reportEnable = stage === APPLICATION_PROGRESS.WRITE_REPORT
  const completeEnable =
    stage === APPLICATION_PROGRESS.WRITE_REPORT ||
    stage === APPLICATION_PROGRESS.COMPLETE ||
    stage === APPLICATION_PROGRESS.REVIEW

  const applicationStatusMutation = useMutation({
    mutationFn: (status: APPLICATION_PROGRESS) =>
      updateMenteeApplicationStatus({
        mentoringId: mentoringID,
        status: status,
        mentoringApplicationId: data.id
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mentee-activity'] })
    }
  })

  const stageText = (stage: APPLICATION_PROGRESS): string => {
    switch (stage) {
      case APPLICATION_PROGRESS.CANCELED:
        return '취소'
      case APPLICATION_PROGRESS.IN_PROCESS:
        return '진행중'
      case APPLICATION_PROGRESS.PENDING:
        return '신청'
      default:
        if (type === MANAGE_TYPE.MENTEE) {
          return MENTEE_PROGRESS_LIST_TABS.find((item: any) => item.value === stage)?.label || ''
        } else {
          return MENTORING_PROGRESS_LIST_TABS.find((item: any) => item.value === stage)?.label || ''
        }
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

  return (
    <CardBox
      sx={{
        backgroundColor: theme.palette.main_grey.gray800,
        gap: 2
      }}
    >
      <Stack direction={'row'} alignItems='center' justifyContent={'space-between'} width={'100%'}>
        <Stack direction={'row'} alignItems='center' gap={1.5}>
          <BaseChip
            label={
              <Typography
                cate='sub_title_10'
                plainColor={stage === APPLICATION_PROGRESS.CANCELED ? 'main_grey.gray400' : 'main.white'}
              >
                {stageText(stage)}
              </Typography>
            }
            sx={{
              backgroundColor:
                stage === APPLICATION_PROGRESS.CANCELED
                  ? theme.palette.main_grey.gray900
                  : stage === APPLICATION_PROGRESS.APPROVAL
                    ? theme.palette.main_primary.blue500
                    : stage === APPLICATION_PROGRESS.IN_PROCESS
                      ? theme.palette.sub.horizon_blue700
                      : stage === APPLICATION_PROGRESS.WRITE_REPORT
                        ? theme.palette.sub.purple100
                        : stage === APPLICATION_PROGRESS.REVIEW
                          ? theme.palette.sub.green550
                          : theme.palette.main_primary.blue800
            }}
          />
          <Typography cate='sub_title_30'>{data.mentoring.username}</Typography>
        </Stack>
        <Typography cate='body_30' plainColor='main_grey.gray200'>
          {moment(createAt).format('YYYY.MM.DD HH:mm')}
        </Typography>
      </Stack>
      <Stack direction={'row'} alignItems='center' justifyContent={'space-between'} width={'100%'}>
        <Typography cate='body_50'>{mentoringOptionText(product.product.name as MENTOR_PRODUCT_TYPE)}</Typography>
        {type === MANAGE_TYPE.MENTOR && (
          <Typography
            cate='button_30'
            plainColor={stage === APPLICATION_PROGRESS.CANCELED ? 'main_grey.gray500' : 'sub.teal400'}
          >
            요청사항 조회
          </Typography>
        )}
      </Stack>
      <Grid
        container
        width={'100%'}
        sx={{ opacity: stage === APPLICATION_PROGRESS.CANCELED || stage === APPLICATION_PROGRESS.REVIEW ? 0.3 : 1 }}
      >
        <Grid
          item
          md={type === MANAGE_TYPE.MENTOR ? 3 : 4}
          xs={12}
          height={convertToRem(48)}
          display={'flex'}
          flexDirection='column'
          alignItems={'center'}
          justifyContent={'center'}
          gap={0.5}
          sx={{
            backgroundColor: theme.palette.main_primary.blue500
          }}
        >
          <Typography cate='button_30' plainColor={'main_grey.gray100'}>
            신청
          </Typography>
          <Typography cate='caption_5'>{moment().format('YYYY.MM.DD')}</Typography>
        </Grid>
        <Grid
          item
          md={type === MANAGE_TYPE.MENTOR ? 3 : 4}
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
          <Typography cate='button_30' plainColor={'main_grey.gray100'}>
            진행중
          </Typography>
          {inProcessEnable && <Typography cate='caption_5'>{moment().format('YYYY.MM.DD')}</Typography>}
        </Grid>
        <Grid
          item
          md={type === MANAGE_TYPE.MENTOR ? 3 : 4}
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
          <Typography cate='button_30' plainColor={'main_grey.gray100'}>
            완료
          </Typography>
          {completeEnable && <Typography cate='caption_5'>{moment().format('YYYY.MM.DD')}</Typography>}
        </Grid>
        {type === MANAGE_TYPE.MENTOR && (
          <Grid
            item
            md={type === MANAGE_TYPE.MENTOR ? 3 : 4}
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
            <Typography cate='button_30' plainColor={'main_grey.gray100'}>
              보고서 작성
            </Typography>
            {reportEnable && <Typography cate='caption_5'>{moment().format('YYYY.MM.DD')}</Typography>}
          </Grid>
        )}
      </Grid>
      <Stack
        direction={'row'}
        alignItems={'center'}
        width={'100%'}
        gap={1}
        justifyContent={
          stage === APPLICATION_PROGRESS.APPROVAL
            ? 'flex-end'
            : stage === APPLICATION_PROGRESS.CANCELED
              ? 'flex-start'
              : 'flex-end'
        }
      >
        {stage === APPLICATION_PROGRESS.CANCELED && (
          <Typography cate='body_20' plainColor='sub.red500'>
            {data.menteeCancelledAt ? '멘티에 의해 접수가 취소되었습니다.' : '멘토에 의해 접수가 취소되었습니다.'}
          </Typography>
        )}
        {(stage === APPLICATION_PROGRESS.APPROVAL || stage === APPLICATION_PROGRESS.PENDING) && (
          <>
            <GhostBorderButton
              btnSize='sm'
              onClick={() => {
                applicationStatusMutation.mutate(APPLICATION_PROGRESS.CANCELED)
              }}
              sx={{
                height: convertToRem(44),
                padding: '13px 24px',
                width: 'auto',
                borderRadius: 1000
              }}
            >
              <Typography cate='button_20' plainColor='main_grey.gray300'>
                신청 취소
              </Typography>
            </GhostBorderButton>
            {type === MANAGE_TYPE.MENTOR && (
              <GhostBorderButton
                btnSize='sm'
                onClick={() => { }}
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
          </>
        )}
        {stage === APPLICATION_PROGRESS.IN_PROCESS && (
          <GhostBorderButton
            btnSize='xs-np'
            onClick={() => {
              onChat?.()
            }}
            sx={{
              borderColor: theme.palette.main_primary.blue300,
              background: theme.palette.main_primary.blue400,
              paddingX: '24px',
              borderRadius: 1000
            }}
          >
            <Typography cate='button_20' plainColor='main.white'>
              멘토와 1:1 채팅 시작하기
            </Typography>
          </GhostBorderButton>
        )}
        {stage === APPLICATION_PROGRESS.IN_PROCESS && (
          <PrimaryButton
            btnSize='xs-np'
            onClick={() => {
              applicationStatusMutation.mutate(APPLICATION_PROGRESS.COMPLETE)
            }}
            sx={{
              paddingX: '24px',
              borderRadius: 1000
            }}
          >
            <Typography cate='button_20' plainColor='main_grey.gray100'>
              {type === MANAGE_TYPE.MENTEE ? '완료' : ' 보고서 작성'}
            </Typography>
          </PrimaryButton>
        )}
        {stage === APPLICATION_PROGRESS.COMPLETE && (
          <>
            {type === MANAGE_TYPE.MENTOR && (
              <GhostBorderButton
                btnSize='xs-np'
                onClick={() => { }}
                sx={{
                  borderColor: theme.palette.main_primary.blue300,
                  background: theme.palette.main_primary.blue400,
                  paddingX: '24px',
                  borderRadius: 1000
                }}
              >
                <Typography cate='button_20' plainColor='main.white'>
                  보고서 작성
                </Typography>
              </GhostBorderButton>
            )}
            <PrimaryButton
              btnSize='xs-np'
              onClick={onReview}
              sx={{
                paddingX: '24px',
                borderRadius: 1000
              }}
            >
              <Typography cate='button_20' plainColor='main_grey.gray100'>
                {type === MANAGE_TYPE.MENTOR ? '보고서 작성완료' : '리뷰작성하기'}
              </Typography>
            </PrimaryButton>
          </>
        )}
        {stage === APPLICATION_PROGRESS.WRITE_REPORT && (
          <GhostBorderButton
            btnSize='xs-np'
            onClick={() => { }}
            sx={{
              borderColor: theme.palette.main_primary.blue300,
              background: theme.palette.main_primary.blue400,
              paddingX: '24px',
              borderRadius: 1000
            }}
          >
            <Typography cate='button_20' plainColor='main.white'>
              리뷰확인하기
            </Typography>
          </GhostBorderButton>
        )}
        {stage === APPLICATION_PROGRESS.REVIEW && (
          <GhostBorderButton
            btnSize='xs-np'
            onClick={onViewReview}
            sx={{
              borderColor: theme.palette.main_primary.blue300,
              background: theme.palette.main_primary.blue400,
              paddingX: '24px',
              borderRadius: 1000
            }}
          >
            <Typography cate='button_20' plainColor='main.white'>
              내 리뷰 조회하기
            </Typography>
          </GhostBorderButton>
        )}
      </Stack>
    </CardBox>
  )
}

export default ProceedCard
