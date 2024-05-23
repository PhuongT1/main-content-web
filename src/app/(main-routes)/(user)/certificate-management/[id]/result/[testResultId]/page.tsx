'use client'
import { TestFailImg, TestSuccessImg } from '@/assets/images'
import { Card, Dialog } from '@/components'
import { COURSE_APPLICATION_HISTORY_RESULT } from '@/constants/certificate.constant'
import { BaseImage, DesignedPrimaryButton, DesignedSecondaryButton, Typography } from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { getExamResultDetail } from '@/services/certificate.service'
import { PageParams } from '@/types/types.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { secondsToHours } from '@/utils/date'
import { Box, Grid } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import CertificationIssurance from '../../../_components/certificate-issurance'
import { getDuration } from '../../../utils/certificate.util'

const getContentSet = (name: string = '') => {
  return {
    [COURSE_APPLICATION_HISTORY_RESULT.PASS]: {
      img: TestSuccessImg,
      title: (
        <>
          <Typography
            cate='title_70'
            breakpoints={{
              md: 'title_40'
            }}
            plainColor='main_grey.gray100'
          >
            축하드립니다!
          </Typography>
          <Typography
            cate='title_70'
            breakpoints={{
              md: 'title_40'
            }}
            plainColor='main_grey.gray100'
          >
            {name} 시험 결과{' '}
            <Typography
              cate='title_70'
              breakpoints={{
                md: 'title_40'
              }}
              component={'span'}
              plainColor='sub.teal400'
            >
              합격
            </Typography>
            했어요.
          </Typography>
        </>
      ),
      description: '강사활동을 위한 과제 및 안내사항을 메일로 보내드립니다. 메일을 꼭 확인해 주세요.'
    },
    [COURSE_APPLICATION_HISTORY_RESULT.FAIL]: {
      img: TestFailImg,
      title: (
        <>
          <Typography
            cate='title_70'
            breakpoints={{
              md: 'title_40'
            }}
            plainColor='main_grey.gray100'
          >
            {name} 시험 결과{' '}
            <Typography
              component={'span'}
              cate='title_70'
              breakpoints={{
                md: 'title_40'
              }}
              plainColor='sub.red500'
            >
              불합격
            </Typography>
            했어요.
          </Typography>
          <Typography
            cate='title_70'
            breakpoints={{
              md: 'title_40'
            }}
            plainColor='main_grey.gray100'
          >
            다음 기회엔 꼭 합격할 거예요!
          </Typography>
        </>
      ),
      description: '재응시하기를 통해 언제든 다시 시험에 응시하실 수 있습니다.'
    }
  }
}

type TResultTableProps = {
  time: string
  score: string
  numberOfWrongAnswer: string
}

const ResultTable = ({ time, score, numberOfWrongAnswer }: TResultTableProps) => {
  return (
    <Grid
      container
      sx={{
        height: 72,
        borderBottom: '1px solid',
        borderColor: 'main_grey.gray600'
      }}
    >
      <Grid m={'auto'} xs={4} item>
        <Typography cate='body_3' plainColor='main_grey.gray100'>
          {time}
        </Typography>
      </Grid>
      <Grid m={'auto'} xs={4} item>
        <Typography cate='body_3' plainColor='main_grey.gray100'>
          {score}
        </Typography>
      </Grid>
      <Grid m={'auto'} xs={4} item>
        <Typography cate='body_3' plainColor='main_grey.gray100'>
          {numberOfWrongAnswer}
        </Typography>
      </Grid>
    </Grid>
  )
}

const TestResult = ({ params: { testResultId } }: PageParams<{ testResultId: string }>) => {
  const parsedTestResultId = +testResultId
  const { open, onOpen, onClose } = useDialog()
  const router = useRouter()

  const { data } = useQuery({
    queryKey: [`exam-result-${parsedTestResultId}`, parsedTestResultId],
    queryFn: getExamResultDetail.bind(null, +parsedTestResultId),
    staleTime: 0,
    gcTime: 0
  })
  const quizResult = (data as any)?.data
  const {
    result,
    timeTaken = 0,
    point = 0,
    totalPoint = 0,
    wrongAnswer = 0,
    course: { id: courseId = 0, name = '' } = {},
    course,
    id
  } = quizResult || {}

  const testResult = result || COURSE_APPLICATION_HISTORY_RESULT.FAIL
  const isFail = testResult === COURSE_APPLICATION_HISTORY_RESULT.FAIL

  const contentSet = getContentSet(name)[testResult]
  const parsedTimeTaken = secondsToHours(getDuration(timeTaken))
  const score = `${point}/${totalPoint}`

  const onBackToMyList = () => {
    router.push('/certificate-management')
  }

  const onNavigateToPaperCheck = () => {
    router.push(`/certificate-management/${courseId}/test-paper-check/${id}`)
  }

  console.log('quizResult', quizResult)

  return (
    <>
      {quizResult && (
        <Box>
          <Card
            sx={{
              display: 'flex',
              gap: {
                md: 3,
                xs: 2
              },
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              px: {
                md: 0,
                xs: 2
              },
              pt: {
                md: 7,
                xs: 2
              },
              pb: {
                md: 10,
                xs: 2
              }
            }}
          >
            <Box
              height={{
                md: 320,
                xs: 199
              }}
              width={{
                md: 320,
                xs: 199
              }}
              flexShrink={0}
            >
              <BaseImage
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 10
                }}
                src={contentSet.img}
                alt={`congratulation`}
              />
            </Box>
            <Box>
              {contentSet.title}
              <Typography cate='body_3' plainColor='main_grey.gray100' mt={1.875}>
                {contentSet.description}
              </Typography>
            </Box>
            <Box
              width={'100%'}
              maxWidth={666}
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'column'}
              alignItems={'center'}
              justifyItems={'center'}
            >
              <Box
                height={41}
                width={'100%'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                bgcolor={'main_grey.gray700'}
              >
                <Typography cate='body_3' plainColor='main_grey.gray100'>
                  귀하의 채점결과는 아래와 같습니다.
                </Typography>
              </Box>
              <ResultTable time='소요시간' score='점수' numberOfWrongAnswer='오답' />
              <ResultTable time={`${parsedTimeTaken}`} score={score} numberOfWrongAnswer={`${wrongAnswer}문항`} />
            </Box>
            <Box mt={1} width={'100%'}>
              <Box display={'flex'} gap={1} justifyContent={'center'}>
                <DesignedSecondaryButton
                  onClick={onNavigateToPaperCheck}
                  sx={{ maxWidth: 165, width: '100%', height: 56 }}
                  btnSize='designed-md'
                >
                  시험지 확인
                </DesignedSecondaryButton>
                <DesignedPrimaryButton
                  onClick={isFail ? onBackToMyList : onOpen}
                  sx={{ maxWidth: 160, width: '100%' }}
                  btnSize='designed-md'
                >
                  {isFail ? '나의 시험으로' : '자격증 발급'}
                </DesignedPrimaryButton>
              </Box>
            </Box>
          </Card>
          {/* Dialog */}
          <Dialog
            mdFullScreen
            onClose={onClose}
            open={open}
            PaperProps={{ sx: { maxWidth: 560, width: '100%', borderRadius: { sm: convertToRem(16) } } }}
            sx={{
              padding: { md: convertToRem(0), sm: convertToRem(24) }
            }}
          >
            <CertificationIssurance onClose={onClose} {...{ course }} />
          </Dialog>
        </Box>
      )}
    </>
  )
}

export default TestResult
