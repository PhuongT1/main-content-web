'use client'
import { ClockIcon } from '@/assets/icons'
import { Card, Timer } from '@/components'
import { EditAlert } from '@/components/dialog'
import { COURSE_APPLICATION_HISTORY_TYPE } from '@/constants/certificate.constant'
import { Divider, Typography } from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { getExam } from '@/services/certificate.service'
import { TSelectedAnswers } from '@/types/certificate.type'
import { PageParams } from '@/types/types.type'
import { secondsToHours } from '@/utils/date'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { MutableRefObject, memo, useCallback, useEffect, useRef, useState } from 'react'
import Countdown from 'react-countdown'
import { useScroll, useVisibleElements } from 'react-snaplist-carousel'
import QuestionList from '../../../_components/question-list'
import TestArea from '../../../_components/test-area'
import { getDuration, getIsDirectTest } from '../../../utils/certificate.util'

type TTimerCoundown = {
  onOpenTimeout?: () => void
  duration: number
  timerRef: MutableRefObject<Countdown | null>
}

const TimerCoundown = memo(({ duration, onOpenTimeout, timerRef }: TTimerCoundown) => {
  return (
    <Timer
      timerRef={timerRef}
      onComplete={onOpenTimeout}
      duration={duration}
      renderLabel={(label) => {
        return (
          <Typography cate='title_70' breakpoints={{ md: 'title_50' }} plainColor='sub.teal400'>
            {label}
          </Typography>
        )
      }}
    />
  )
})

const CourseTestPage = ({ params: { id, courseQuizId } }: PageParams<{ id: string; courseQuizId: string }>) => {
  const [isStarted, setStarted] = useState(false)
  const { open, onOpen } = useDialog()
  const [selectedAnswers, setSelectedAnswers] = useState<TSelectedAnswers>({})
  const { open: openTimeout, onClose: onCloseTimeout, onOpen: onOpenTimeout } = useDialog()
  const snapList = useRef(null)
  const currentIndex = useVisibleElements({ debounce: 10, ref: snapList }, ([element]) => element)
  const theme = useTheme()
  const router = useRouter()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))
  const onGoToSnapItem = useScroll({ ref: snapList })

  const timerRef = useRef<Countdown | null>(null)

  const parsedCourseQuizId = +courseQuizId
  const { data } = useQuery({
    queryKey: [`course-${parsedCourseQuizId}`, parsedCourseQuizId],
    queryFn: getExam.bind(null, +parsedCourseQuizId),
    staleTime: 0,
    gcTime: 0
  })

  const courseQuiz = (data as any)?.data

  const { courseQuestions = [], courses = [], testTimeDuration = 0, type, canTest } = courseQuiz || {}
  const course = courses.find((i: any) => `${i.id}` === id)
  const { id: courseId = 0 } = course || {}
  const retakeText = type === COURSE_APPLICATION_HISTORY_TYPE.RETEST ? '재응시' : ''
  const isDirectTest = getIsDirectTest(course)

  const onOpenTimeoutMemo = useCallback(() => {
    onOpenTimeout()
  }, [])

  const onNavigateToManagementPage = () => {
    router.push('/certificate-management')
  }

  useEffect(() => {
    if (canTest === false) {
      onOpen()
    }
  }, [canTest])

  return (
    <>
      <Card
        sx={{
          py: {
            md: 5,
            xs: 2.5
          },
          px: {
            md: 5,
            xs: 2
          },
          display: 'flex',
          gap: {
            md: 5,
            xs: 2
          },
          mt: {
            md: 0,
            xs: 0.5
          },
          flexDirection: 'column'
        }}
      >
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box>
            <Typography cate='body_3' plainColor='sub.teal400'>
              {isDirectTest ? '자격시험' : '교육+자격시험'}
              {retakeText && `+${retakeText}`}
            </Typography>
            <Typography
              mt={{ md: 1, xs: 1 }}
              cate='title_70'
              breakpoints={{ md: 'title_50' }}
              plainColor='main_grey.gray100'
            >
              {course?.name || ''}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'main_grey.gray700' }} />
        <Box>
          <Box display={'flex'} gap={1} alignItems={'center'}>
            <ClockIcon />
            {isStarted ? (
              <TimerCoundown
                timerRef={timerRef}
                duration={getDuration(testTimeDuration)}
                onOpenTimeout={onOpenTimeoutMemo}
              />
            ) : (
              <Typography cate='title_70' breakpoints={{ md: 'title_50' }} plainColor='sub.teal400'>
                {secondsToHours(getDuration(testTimeDuration))}
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          mt={{
            md: -2,
            xs: 0
          }}
        >
          <QuestionList
            type='testing'
            questions={courseQuestions}
            {...{ onGoToSnapItem, currentIndex, selectedAnswers, isStarted }}
          />
        </Box>
        {!mdMatches && (
          <TestArea
            courseId={courseId}
            courseQuiz={courseQuiz}
            {...{
              isStarted,
              setStarted,
              selectedAnswers,
              setSelectedAnswers,
              snapList,
              timerRef,
              onCloseTimeout,
              openTimeout
            }}
          />
        )}
      </Card>
      {mdMatches && (
        <Box mt={2} mx={-2.5}>
          <TestArea
            courseId={courseId}
            courseQuiz={courseQuiz}
            {...{
              isStarted,
              setStarted,
              selectedAnswers,
              setSelectedAnswers,
              snapList,
              timerRef,
              onCloseTimeout,
              openTimeout
            }}
          />
        </Box>
      )}
      <EditAlert
        onSubmit={onNavigateToManagementPage}
        submitTxt={'확인'}
        title={'시험이 성공적으로 제출되었습니다.'}
        description={'시험 결과를 바로 확인해보세요.'}
        open={open}
      />
    </>
  )
}

export default CourseTestPage
