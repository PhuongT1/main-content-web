import { ChevronRightSmIcon, DocumentBlueIcon } from '@/assets/icons'
import { Alert, VideoPlayer } from '@/components'
import { COURSE_EDUCATION_STATUS_RECRUITMENT } from '@/constants/certificate.constant'
import { DesignedSecondaryButton, Typography } from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { saveLectureProgress } from '@/services/certificate.service'
import { TCourse, TCourseUserEducation } from '@/types/certificate.type'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Dispatch } from 'react'

type LessonInfoProps = {
  selectedLecture?: TCourseUserEducation
  setCourse: Dispatch<TCourse>
  isShowButtonTestButton?: boolean
  handleGoButton: () => void
  isDisabledGoButton: boolean
  course?: TCourse
}

const LessonInfo = ({
  selectedLecture,
  setCourse,
  isShowButtonTestButton,
  handleGoButton,
  isDisabledGoButton,
  course
}: LessonInfoProps) => {
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))
  const { open: openConfirmTest, onOpen: onOpenConfirmTest, onClose: onCloseConfirmTest } = useDialog()
  const router = useRouter()

  const saveLectureProgressAct = useMutation({
    mutationFn: saveLectureProgress,
    meta: {
      offLoading: true
    }
  })

  const {
    videoUrl = '',
    title = '',
    description = '',
    id,
    currentDuration = 0,
    duration = 0,
    statusRecruitment
  } = selectedLecture || {}

  const { courseQuizId } = course || {}

  const playAt = statusRecruitment === COURSE_EDUCATION_STATUS_RECRUITMENT.COMPLETE ? 0 : currentDuration

  const onNavigate = () => {
    router.push(`${id}/course-test/${courseQuizId}`)
  }

  const onTrackTime = async (number: number) => {
    if (id) {
      const preCourse = { ...course }
      const data = await saveLectureProgressAct.mutateAsync({
        duration: number,
        id: id
      })
      if (data?.data?.id) {
        console.log('update timestamp')
        setCourse(data?.data)
        if (!preCourse.canTest && data?.data?.canTest) {
          onOpenConfirmTest()
        }
      }
    }
  }

  const onEndVideo = () => {
    if (duration) {
      onTrackTime(duration)
    }
  }

  return (
    <>
      <Box
        mt={{
          md: 7.5,
          xs: 3
        }}
      >
        <Box height={'100%'} flexShrink={0}>
          <VideoPlayer onEnd={onEndVideo} playAt={playAt} onTrackTime={onTrackTime} url={videoUrl} />
        </Box>
      </Box>
      <Typography
        cate='title_50'
        breakpoints={{
          md: 'title_40'
        }}
        plainColor='main_grey.gray10'
        mt={{
          md: 5,
          xs: 3
        }}
      >
        {title}
      </Typography>
      <Typography
        cate='body_3'
        breakpoints={{
          md: 'body_2'
        }}
        plainColor='main_grey.gray200'
        mt={2}
      >
        {description}
      </Typography>
      {isShowButtonTestButton && (
        <DesignedSecondaryButton
          disabled={isDisabledGoButton}
          fullWidth={mdMatches}
          onClick={handleGoButton}
          sx={{
            width: 160,
            mt: {
              md: 5,
              xs: 3
            },
            ml: 'auto'
          }}
          btnSize='designed-md'
        >
          <Typography
            cate='button_30'
            breakpoints={{ md: 'button_20' }}
            plainColor={isDisabledGoButton ? 'button.secondary.disabled.label' : 'button.secondary.label'}
          >
            다음 영상
          </Typography>
          <ChevronRightSmIcon
            pathProps={{
              stroke: isDisabledGoButton
                ? theme.palette.button.secondary.disabled.label
                : theme.palette.button.secondary.label
            }}
          />
        </DesignedSecondaryButton>
      )}
      <Alert
        open={openConfirmTest}
        title={
          <>
            모든 영상을 시청했습니다.
            <br />
            자격 시험을 시작 하시겠습니까?
          </>
        }
        cancelTxt='취소'
        submitTxt='확인'
        description='취소 버튼을 눌러도 영상 시청 기록은 유지됩니다.'
        icon={<DocumentBlueIcon />}
        onCancel={onCloseConfirmTest}
        onSubmit={onNavigate}
      />
    </>
  )
}
export default LessonInfo
