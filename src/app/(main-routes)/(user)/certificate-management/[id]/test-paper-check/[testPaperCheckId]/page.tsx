'use client'
import { Card } from '@/components'
import { COURSE_APPLICATION_HISTORY_RESULT, COURSE_FORMAT_STATUS } from '@/constants/certificate.constant'
import { BaseChip, DesignedSecondaryButton, Divider, Typography } from '@/elements'
import { getExamResultDetail } from '@/services/certificate.service'
import { TSelectedAnswers } from '@/types/certificate.type'
import { PageParams } from '@/types/types.type'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useScroll, useVisibleElements } from 'react-snaplist-carousel'
import QuestionList from '../../../_components/question-list'
import TestPaperCheckArea from '../../../_components/test-paper-check-area'
import { getIsDirectTest } from '../../../utils/certificate.util'

const TestPaperCheck = ({ params: { id, testPaperCheckId } }: PageParams<{ id: string; testPaperCheckId: string }>) => {
  const [selectedAnswers] = useState<TSelectedAnswers>({})
  const router = useRouter()
  const snapList = useRef(null)
  const currentIndex = useVisibleElements({ debounce: 10, ref: snapList }, ([element]) => element)
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))
  const onGoToSnapItem = useScroll({ ref: snapList })

  const parsedCourseQuizId = +testPaperCheckId
  const { data } = useQuery({
    queryKey: [`exam-result-${parsedCourseQuizId}`, parsedCourseQuizId],
    queryFn: getExamResultDetail.bind(null, +parsedCourseQuizId),
    staleTime: 0,
    gcTime: 0
  })

  const examResult = (data as any)?.data
  const { course, questions = [], point, totalPoint, result } = examResult || {}
  const { name = '', statusRecruitmentFormatV2 } = course || {}
  const retakeText = statusRecruitmentFormatV2 === COURSE_FORMAT_STATUS.RETEST ? '재응시' : ''
  const score = `${point}/${totalPoint}`
  const isFail = result === COURSE_APPLICATION_HISTORY_RESULT.FAIL
  const isDirectTest = getIsDirectTest(course)

  return (
    <>
      <Card
        sx={{
          p: {
            md: 5,
            xs: 2
          },
          display: 'flex',
          gap: {
            md: 5,
            xs: 2
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
            <Typography cate='title_70' breakpoints={{ md: 'title_50' }} plainColor='main_grey.gray100'>
              {name || ''}
            </Typography>
          </Box>
        </Box>
        {!mdMatches && <Divider sx={{ borderColor: 'main_grey.gray700' }} />}
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <BaseChip
            sx={{
              bgcolor: isFail ? 'sub.red500' : 'main_primary.blue500'
            }}
            label={
              <Typography cate='sub_title_10' plainColor='main_grey.gray100'>
                합격
              </Typography>
            }
          />
          <Typography
            breakpoints={{
              md: 'title_50'
            }}
            plainColor={isFail ? 'sub.red500' : 'main_primary.blue500'}
            cate='title_70'
          >
            {score}점
          </Typography>
        </Box>
        <Box>
          <QuestionList type='checking' questions={questions} {...{ onGoToSnapItem, currentIndex, selectedAnswers }} />
        </Box>
        {!mdMatches && (
          <>
            <TestPaperCheckArea questions={questions} {...{ snapList }} />
            <DesignedSecondaryButton
              onClick={() => router.push('/certificate-management')}
              sx={{
                width: 248,
                m: 'auto'
              }}
              btnSize='designed-md'
            >
              나의 시험으로
            </DesignedSecondaryButton>
          </>
        )}
      </Card>
      {mdMatches && (
        <Box mt={2} mx={-2.5}>
          <TestPaperCheckArea questions={questions} {...{ snapList }} />
          <Box px={2}>
            <DesignedSecondaryButton
              onClick={() => router.push('/certificate-management')}
              sx={{
                width: {
                  md: 248,
                  xs: '100%'
                },
                m: 'auto',
                mt: 2
              }}
              btnSize='designed-md'
            >
              나의 시험으로
            </DesignedSecondaryButton>
          </Box>
        </Box>
      )}
    </>
  )
}

export default TestPaperCheck
