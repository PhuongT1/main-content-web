import { Card } from '@/components'
import { SideListTabItem, SideListTabs } from '@/components/tabs'
import {
  COURSE_EDUCATION_STATUS_RECRUITMENT,
  COURSE_FORMAT_STATUS,
  COURSE_STUDY_TYPE
} from '@/constants/certificate.constant'
import { DesignedSecondaryButton, Divider, SecondaryButton, Typography } from '@/elements'
import { TCourse, TCourseChapter, TCourseUserEducation } from '@/types/certificate.type'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Dispatch, SyntheticEvent, useEffect, useState } from 'react'
import LectureBox from '../lecture-box'
import LessonInfo from '../lesson-info'
import TestButtonByState from '../test-button-by-state'

const PROGRESS_BUTTON_TXT_BY_STATE = new Map([
  [COURSE_FORMAT_STATUS.LEARNING, '미응시'],
  [COURSE_FORMAT_STATUS.CAN_TEST, '미응시'],
  [COURSE_FORMAT_STATUS.PASS, '합격 | 시험지보기'],
  [COURSE_FORMAT_STATUS.COMPLETE, '합격 | 시험지보기'],
  [COURSE_FORMAT_STATUS.FAIL, '불합격 | 시험지보기'],
  [COURSE_FORMAT_STATUS.FAIL_RETEST, '불합격 | 시험지보기'],
  [COURSE_FORMAT_STATUS.RETEST, '재응시 | 이전 시험지보기']
])

const ProgressButtonByState = ({
  state,
  courseId,
  resultId
}: {
  state: COURSE_FORMAT_STATUS
  courseId: number
  resultId: number
}) => {
  const theme = useTheme()
  const router = useRouter()

  const bgObj = {
    [COURSE_FORMAT_STATUS.PASS]: `${theme.palette.sub.horizon_blue700} !important`,
    [COURSE_FORMAT_STATUS.COMPLETE]: `${theme.palette.sub.horizon_blue700} !important`,
    [COURSE_FORMAT_STATUS.FAIL]: `${theme.palette.sub.red500} !important`,
    [COURSE_FORMAT_STATUS.FAIL_RETEST]: `${theme.palette.sub.red500} !important`,
    [COURSE_FORMAT_STATUS.RETEST]: `${theme.palette.sub.purple100} !important`,
    [COURSE_FORMAT_STATUS.LEARNING]: `${theme.palette.main_grey.gray700} !important`,
    [COURSE_FORMAT_STATUS.CAN_TEST]: `${theme.palette.main_grey.gray700} !important`
  }
  const { LEARNING } = COURSE_FORMAT_STATUS
  const Component = DesignedSecondaryButton
  const isDisabled = state === LEARNING
  const txt = PROGRESS_BUTTON_TXT_BY_STATE.get(state)
  const bgColor = { bgcolor: bgObj[state] }

  return (
    <Component
      onClick={() => router.push(`/certificate-management/${courseId}/result/${resultId}`)}
      disabled={isDisabled}
      sx={{
        minWidth: {
          md: 160
        },
        height: {
          md: '100%',
          xs: 33
        },
        border: 0,
        flexShrink: 0,
        ...bgColor
      }}
      btnSize='designed-md'
      typographyProps={{
        cate: 'button_30',
        breakpoints: { md: 'button_10' }
      }}
    >
      {txt}
    </Component>
  )
}

const NonLessonInfo = ({
  onDownloadSampleQuestions,
  isHaveDocuments,
  course
}: {
  onDownloadSampleQuestions: () => void
  isHaveDocuments: boolean
  course?: TCourse
}) => {
  const { statusRecruitmentFormatV2 } = course || {}
  return (
    <>
      <Divider
        sx={{
          mt: {
            md: 6,
            xs: 3
          }
        }}
      />
      <Box
        height={{
          md: 412,
          xs: 364
        }}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        width={'100%'}
      >
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <Typography cate='body_3' plainColor='main_grey.gray300'>
            강의가 없는 자격증 시험입니다.
          </Typography>
          <Box mt={4} display={'flex'} flexDirection={'column'} gap={2}>
            {isHaveDocuments && (
              <SecondaryButton
                onClick={onDownloadSampleQuestions}
                sx={{
                  width: {
                    md: 165,
                    xs: 240
                  },
                  height: 56
                }}
                btnSize='designed-md'
              >
                <Typography
                  cate='button_30'
                  breakpoints={{ md: 'button_20' }}
                  plainColor='button.secondary.disabled.label'
                >
                  기출문제 다운로드
                </Typography>
              </SecondaryButton>
            )}
            {statusRecruitmentFormatV2 !== COURSE_FORMAT_STATUS.FAIL && <TestButtonByState {...{ course }} />}
          </Box>
        </Box>
      </Box>
    </>
  )
}

type TCertificateLessonProps = {
  isDirectTest: boolean
  course?: TCourse
  setCourse: Dispatch<TCourse>
  onDownloadSampleQuestions: () => void
}

const CertificateLesson = ({ isDirectTest, course, setCourse, onDownloadSampleQuestions }: TCertificateLessonProps) => {
  const [selectedChapterId, setSelectedChapterId] = useState<number>()
  const [selectedLectureId, setSelectedLectureId] = useState<number>()
  const [isInit, setIsInit] = useState(false)
  const theme = useTheme()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))

  const {
    id = 0,
    name,
    courseChapters = [],
    courseUserHistories,
    documents = [],
    statusRecruitmentFormatV2,
    hasUseChapter,
    recentChapterId,
    recentEducationVideoId
  } = course || {}
  const retakeText = statusRecruitmentFormatV2 === COURSE_FORMAT_STATUS.RETEST ? '재응시' : ''
  const { id: resultId = 0 } = courseUserHistories || {}
  const lectureByChapter = courseChapters.find((i) => i.id === selectedChapterId)?.courseUserEducations || []
  const lectureByChapterSortByOrder = lectureByChapter.toSorted((a, b) => a.order - b.order)
  const selectedLecture = lectureByChapter.find((i) => i.id === selectedLectureId)
  const studyType = selectedLecture?.studyType
  const isHaveDocuments = documents.length > 0
  const lectureIndex = lectureByChapter.findIndex((i) => i.id === selectedLectureId)
  const chapterIndex = courseChapters.findIndex((i) => i.id === selectedChapterId)
  const isHaveNextChapter = !!courseChapters[chapterIndex + 1]?.id
  const isHaveNextLecture = !!lectureByChapter[lectureIndex + 1]?.id
  const isAbleToGoNext = selectedLecture?.statusRecruitment === COURSE_EDUCATION_STATUS_RECRUITMENT.COMPLETE
  const isDisabledGoButton = !isAbleToGoNext
  const isShowButtonTestButton = isHaveNextChapter || isHaveNextLecture

  const handleGoButton = () => {
    if (isAbleToGoNext) {
      if (isHaveNextLecture) {
        const nextLecture = lectureByChapter[lectureIndex + 1]
        setSelectedLectureId(nextLecture.id)
      } else if (isHaveNextChapter) {
        const nextChapter = courseChapters[chapterIndex + 1]
        setSelectedChapterId(nextChapter.id)
        const firstLecture = nextChapter.courseUserEducations[0]?.id
        if (firstLecture) {
          setSelectedLectureId(firstLecture)
        }
      }
    }
  }

  const onChangeChapter = (_: SyntheticEvent, newValue: number) => {
    setSelectedChapterId(newValue)
  }

  const getLectureDisabled = (curItem: TCourseUserEducation, preItem?: TCourseUserEducation) => {
    if (!preItem) return false
    if (studyType === COURSE_STUDY_TYPE.NON_SEQUENTIAL) return false
    return !(
      studyType === COURSE_STUDY_TYPE.SEQUENTIAL &&
      preItem?.statusRecruitment === COURSE_EDUCATION_STATUS_RECRUITMENT.COMPLETE
    )
  }

  const getChapterDisabled = (_curItem: TCourseChapter, preItem?: TCourseChapter) => {
    if (!preItem) return false
    if (studyType === COURSE_STUDY_TYPE.NON_SEQUENTIAL) return false
    return !(studyType === COURSE_STUDY_TYPE.SEQUENTIAL && preItem?.isComplete)
  }

  useEffect(() => {
    if (!isInit) {
      const recentChapter = courseChapters.find((i) => i.id === recentChapterId)
      const initChapter = recentChapter || courseChapters?.[0]
      if (initChapter) {
        setSelectedChapterId(initChapter.id)
        setIsInit(true)
      }
    }
  }, [courseChapters])

  useEffect(() => {
    if (selectedChapterId) {
      const selectedChapterObj = course?.courseChapters.find((i) => i.id === selectedChapterId)
      const recentLecture = selectedChapterObj?.courseUserEducations?.find((i) => i.id === recentEducationVideoId)
      const selectedlecture = recentLecture || selectedChapterObj?.courseUserEducations?.[0]
      if (selectedlecture) {
        setSelectedLectureId(selectedlecture.id)
      }
    }
  }, [selectedChapterId])

  return (
    <Box
      display={'flex'}
      flexDirection={{
        lg: 'row',
        xs: 'column'
      }}
      gap={{
        md: 4,
        xs: 3
      }}
    >
      <Card
        sx={{
          p: {
            md: 4,
            xs: 2
          },
          flexGrow: 1,
          maxWidth: isDirectTest ? 787 : '100%',
          ...(isDirectTest && {
            m: 'auto',
            width: '100%'
          })
        }}
      >
        <Box gap={2} display={'flex'} justifyContent={'space-between'}>
          <Box
            mt={{
              md: 0,
              xs: 1.25
            }}
          >
            <Typography
              cate='body_3'
              breakpoints={{
                md: 'sub_title_20'
              }}
              plainColor='sub.teal400'
            >
              {isDirectTest ? '자격시험' : '교육+자격시험'}
              {retakeText && `+${retakeText}`}
            </Typography>
            {!mdMatches && (
              <Typography mt={2} cate='title_70' breakpoints={{ md: 'title_50' }} plainColor='main_grey.gray100'>
                {name}
              </Typography>
            )}
          </Box>
          <ProgressButtonByState
            state={statusRecruitmentFormatV2 || COURSE_FORMAT_STATUS.LEARNING}
            courseId={id!}
            {...{ resultId }}
          />
        </Box>
        {mdMatches && (
          <Typography mt={2} cate='title_70' breakpoints={{ md: 'title_50' }} plainColor='main_grey.gray100'>
            {name}
          </Typography>
        )}
        {isDirectTest ? (
          <NonLessonInfo {...{ onDownloadSampleQuestions, isHaveDocuments, course }} />
        ) : (
          <LessonInfo
            isShowButtonTestButton={isShowButtonTestButton}
            {...{ selectedLecture, setCourse, handleGoButton, isDisabledGoButton, course }}
          />
        )}
      </Card>
      {!isDirectTest && (
        <Box
          width={'100%'}
          maxWidth={{
            xl: 506,
            lg: 400,
            md: 300
          }}
          flexShrink={0}
        >
          {hasUseChapter && (
            <SideListTabs
              sx={{
                height: '60px !important',
                bgcolor: {
                  md: 'unset',
                  xs: 'main_grey.gray800'
                },
                '.button': {
                  minWidth: {
                    md: 48,
                    xs: 54
                  }
                },
                '& .MuiTabs-flexContainer': {
                  padding: {
                    md: 0,
                    xs: '15px'
                  }
                },
                mx: {
                  md: 0,
                  xs: -2
                }
              }}
              value={selectedChapterId}
              onChange={onChangeChapter}
              variant='scrollable'
              scrollButtons
              allowScrollButtonsMobile
              aria-label='scrollable force tabs example'
            >
              {courseChapters.map((i, idx, arr) => (
                <SideListTabItem
                  disabled={getChapterDisabled(i, arr?.[idx - 1])}
                  value={i.id}
                  label={i.name}
                  key={i.id}
                />
              ))}
            </SideListTabs>
          )}
          <Box mt={hasUseChapter ? 2 : 0} display={'flex'} flexDirection={'column'} gap={1}>
            {lectureByChapterSortByOrder.map((i, idx, arr) => (
              <LectureBox
                disabled={getLectureDisabled(i, arr?.[idx - 1])}
                onClick={() => {
                  setSelectedLectureId(i.id)
                }}
                item={i}
                key={i.id}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default CertificateLesson
