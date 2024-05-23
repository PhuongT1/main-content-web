import { NumberIcon } from '@/assets/icons'
import { CircularDeterminate, SanitizationHtml } from '@/components'
import { EditAlert } from '@/components/dialog'
import { COURSE_QUIZ_TYPE_QUESTION } from '@/constants/certificate.constant'
import { DesignedPrimaryButton, Typography } from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { useInactivityTimeout } from '@/hooks/use-inactive-timeout'
import { saveExamResult } from '@/services/certificate.service'
import { TCourseQuestion, TCourseQuiz, TSelectedAnswers } from '@/types/certificate.type'
import { Box, Button, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Dispatch, MutableRefObject } from 'react'
import Countdown from 'react-countdown'
import { SnapItem, SnapList } from 'react-snaplist-carousel'
import { getDuration } from '../../utils/certificate.util'

const MINUTES_AFTER_INACTIVE = 10

type TQuestionProps = {
  question: TCourseQuestion
  selectedAnswersById: number[]
  onSelectAnswerById: (idx: number, type: COURSE_QUIZ_TYPE_QUESTION) => void
  idx: number
}

const Question = ({ question, selectedAnswersById, onSelectAnswerById, idx }: TQuestionProps) => {
  const theme = useTheme()
  return (
    <Typography
      mt={4}
      component={'div'}
      width={'100%'}
      maxWidth={704}
      position={'relative'}
      cate='sub_title_40'
      breakpoints={{ md: 'sub_title_20' }}
      plainColor='main_grey.gray700'
    >
      {idx + 1}. {question.question}
      {question.content && (
        <Box borderRadius={2.5} bgcolor={'main_grey.gray100'} p={2} width={'100%'}>
          <Typography
            cate='body_3'
            sx={{
              color: '#383B45'
            }}
          >
            {question.content}
          </Typography>
        </Box>
      )}
      <Box></Box>
      <Box component={'ul'} mt={1.25} display={'flex'} gap={0.5} flexDirection={'column'}>
        {question.answers.map((i, idx) => {
          const selected = selectedAnswersById?.includes(idx)
          const selectedAnswerSvgProps = selected && {
            pathProps: { fill: theme.palette.main_primary.blue500 },
            rectProps: { stroke: theme.palette.main_primary.blue500 }
          }
          return (
            <Button
              key={idx}
              onClick={onSelectAnswerById.bind(null, idx, question.type)}
              sx={{
                borderRadius: 2,
                p: 1.25,
                border: '1px solid',
                borderColor: selected ? 'main_primary.blue500' : 'main_grey.gray200',
                display: 'flex',
                gap: 1.25,
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%'
              }}
              component={'li'}
            >
              {<NumberIcon number={idx + 1} {...selectedAnswerSvgProps} />}
              <Typography
                cate='body_30'
                breakpoints={{
                  md: 'body_20'
                }}
                plainColor={selected ? 'main_primary.blue500' : 'main_grey.gray600'}
              >
                <SanitizationHtml>{i.content}</SanitizationHtml>
              </Typography>
            </Button>
          )
        })}
      </Box>
    </Typography>
  )
}

type TTestAreaProps = {
  courseQuiz?: TCourseQuiz
  courseId: number
  isStarted: boolean
  setStarted: Dispatch<boolean>
  timerRef: MutableRefObject<Countdown | null>
  onCloseTimeout: () => void
  openTimeout: boolean
  selectedAnswers: TSelectedAnswers
  setSelectedAnswers: Dispatch<TSelectedAnswers>
  snapList: MutableRefObject<null>
}

const TestArea = ({
  courseQuiz,
  courseId,
  isStarted,
  setStarted,
  timerRef,
  onCloseTimeout,
  openTimeout,
  selectedAnswers,
  setSelectedAnswers,
  snapList
}: TTestAreaProps) => {
  const { open: openInactive, onClose: onCloseInactive, onOpen: onOpenInactive } = useDialog()
  const { open: openBackToManagementPage, onOpen: onOpenBackToManagementPage } = useDialog()

  const router = useRouter()
  useInactivityTimeout(MINUTES_AFTER_INACTIVE, () => {
    timerRef?.current?.api?.pause()
    onOpenInactive()
  })

  const saveExamResultAct = useMutation({
    mutationFn: saveExamResult
  })

  const { testTimeDuration = 0, courseQuestions = [], id: courseQuizId, totalQuestion = 0, type } = courseQuiz || {}

  const progress = `${Object.keys(selectedAnswers).length}/${totalQuestion}`
  const isDisabledButton = Object.keys(selectedAnswers).length < totalQuestion
  const blurSx = !isStarted && {
    filter: 'blur(5px)'
  }

  const handleMappingPayload = () => {
    const answers = Object.entries(selectedAnswers)
    const mappingAnswersById = courseQuestions.map((question, questionIdx) => {
      const answerEntry = answers.find(([id, _]) => +id === question.id)
      const answerArr = answerEntry ? answerEntry[1] : []

      const mappingAnswers = question.answers.map((answer, idx) => {
        const isSelected = answerArr.includes(idx)
        return {
          content: answer.content,
          hasSelect: isSelected
        }
      })

      return { id: question.id, answers: mappingAnswers }
    })

    const timeTaken = getDuration(testTimeDuration) - (timerRef?.current?.state?.timeDelta?.total || 0) / 1000

    const courseInfo = {
      courseId: courseId,
      courseQuizId: courseQuizId!,
      timeTaken: timeTaken,
      type: type!,
      questions: mappingAnswersById
    }
    return courseInfo
  }

  const onSubmit = async () => {
    if (courseQuizId) {
      const payload = handleMappingPayload()
      const data = await saveExamResultAct.mutateAsync(payload)
      if (data?.data?.id) {
        const testResultId = data.data.id
        router.push(`/certificate-management/${courseId}/result/${testResultId}`)
      }
    }
  }

  const onSelectAnswer = (id: number) => (idx: number, type: COURSE_QUIZ_TYPE_QUESTION) => {
    const isMultipleChoice = type === COURSE_QUIZ_TYPE_QUESTION.MULTIPLE_CHOICE
    let clone = selectedAnswers?.[id] || []
    if (isMultipleChoice) {
      clone = clone.includes(idx) ? (clone.length === 1 ? clone : clone.filter((i) => i !== idx)) : [...clone, idx]
    } else {
      clone = [idx]
    }
    setSelectedAnswers({ ...selectedAnswers, [id]: clone })
  }

  const onTimeout = () => {
    onSubmit()
    onCloseTimeout()
  }

  const onNavigateToManagementPage = () => {
    router.push('/certificate-management')
  }

  return (
    <>
      <Box
        height={{
          md: 590,
          xs: '70vh'
        }}
        width={'100%'}
        bgcolor={'white'}
        borderRadius={{
          md: 2.5,
          xs: 0
        }}
        position={'relative'}
        sx={{
          '& .snaplist': {
            pt: 5,
            px: {
              xl: 40,
              lg: 20,
              md: 10,
              xs: 5.5
            }
          },
          '& .snapitem': {
            justifyContent: 'center'
          }
        }}
      >
        <SnapList
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            overflow: isStarted ? 'auto' : 'hidden',
            ...blurSx
          }}
          direction='vertical'
          ref={snapList}
        >
          {courseQuestions.map((i, idx) => (
            <SnapItem snapAlign='start' key={i.id}>
              <Question
                onSelectAnswerById={onSelectAnswer(i.id)}
                question={i}
                selectedAnswersById={selectedAnswers[i.id]}
                idx={idx}
              />
            </SnapItem>
          ))}
          <Box id='hidden_box' minHeight={450}></Box>
        </SnapList>
        {!isStarted && (
          <Box
            position={'absolute'}
            top={0}
            bottom={0}
            right={0}
            left={0}
            display={'flex'}
            justifyContent={'center'}
            alignSelf={'center'}
            height={'100%'}
            width={'100%'}
            alignItems={'center'}
          >
            <DesignedPrimaryButton onClick={setStarted.bind(null, true)} sx={{ width: 160 }} btnSize='designed-md'>
              시험 시작하기
            </DesignedPrimaryButton>
          </Box>
        )}
      </Box>
      <Box
        display={'flex'}
        justifyContent={{
          md: 'flex-end',
          xs: 'unset'
        }}
        width={'100%'}
      >
        <Box
          display={'flex'}
          gap={2.5}
          justifyContent={{
            md: 'flex-end',
            xs: 'center'
          }}
          alignItems={'center'}
          width={'100%'}
          mt={2}
        >
          <Typography
            width={{
              md: 'auto',
              xs: 100
            }}
            textAlign={'center'}
            cate='title_70'
            breakpoints={{
              md: 'title_50'
            }}
            plainColor='main_primary.blue300'
          >
            {progress}
          </Typography>
          <DesignedPrimaryButton
            onClick={onSubmit}
            disabled={isDisabledButton}
            sx={{
              width: {
                md: 160,
                xs: 200
              }
            }}
            btnSize='designed-md'
          >
            답안제출
          </DesignedPrimaryButton>
        </Box>
      </Box>
      {/* Alert */}
      {/* Timer complete */}
      <EditAlert
        onSubmit={onTimeout}
        submitTxt={'결과 확인'}
        title={'시험 시간이 종료되었습니다.'}
        description={'시험 결과를 확인해보세요 !'}
        open={openTimeout}
      />
      {/* Inactive */}
      <EditAlert
        onSubmit={() => {
          onCloseInactive()
          timerRef?.current?.api?.start()
        }}
        submitTxt={'확인'}
        title={'시험을 진행중이신가요?'}
        additonalFooterContent={
          <CircularDeterminate
            onTimeout={() => {
              onCloseInactive()
              onOpenBackToManagementPage()
            }}
            size={50.444}
            sx={{
              color: 'main_primary.blue300'
            }}
            second={10}
          />
        }
        description={
          <>
            활동이 감지되지 않습니다.
            <br />
            ‘확인’을 10초동안 클릭하지 않을 경우, 시험이 종료되며 처음부터 시험을 다시 응시할 수 있습니다.
          </>
        }
        open={openInactive}
      />
      {/* No Action Popip */}
      <EditAlert
        onSubmit={onNavigateToManagementPage}
        submitTxt={'확인'}
        title={'시험이 중단되었습니다.'}
        description={'10분동안 활동이 감지되지 않아 시험을 중단하였습니다. 시험은 다시 응시할 수 있습니다.'}
        open={openBackToManagementPage}
      />
    </>
  )
}

export default TestArea
