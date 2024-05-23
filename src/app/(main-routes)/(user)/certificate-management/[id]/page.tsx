'use client'
import { ChevronLeftIcon } from '@/assets/icons'
import { InfoAlert } from '@/components/dialog'
import { COURSE_FORMAT_STATUS } from '@/constants/certificate.constant'
import { ERROR_CODES } from '@/constants/common.constant'
import { Divider, SecondaryButton, Typography } from '@/elements'
import { ProductDetailWrapper } from '@/hocs'
import { useDialog } from '@/hooks/use-dialog'
import { useLoading } from '@/hooks/use-loading'
import { getCourseChapter } from '@/services/certificate.service'
import { TCourse } from '@/types/certificate.type'
import { PageParams } from '@/types/types.type'
import { download, zip } from '@/utils/file'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import CertificateLesson from '../_components/certificate-lesson'
import TestButtonByState from '../_components/test-button-by-state'
import { getIsDirectTest } from '../utils/certificate.util'

const CourseDetailPage = ({ params: { id } }: PageParams<{ id: string }>) => {
  const { open: openHaventRegistration, onOpen: onOpenHaventRegistration } = useDialog()
  const theme = useTheme()
  const router = useRouter()
  const { loading, showLoading, hideLoading } = useLoading()
  const [course, setCourse] = useState<TCourse>()
  const mdMatches = useMediaQuery(theme.breakpoints.down('md'))

  const { data } = useQuery({
    queryKey: [`course-${id}`, id],
    queryFn: getCourseChapter.bind(null, +id),
    staleTime: 0,
    gcTime: 0
  })

  const haventRegistration = useMemo(() => (data as any)?.error?.code === ERROR_CODES.HAVENT_REGISTRATION, [data])

  const { documents = [], statusRecruitmentFormatV2 } = course || {}
  const isDirectTest = getIsDirectTest(course)
  const isHaveDocuments = documents.length > 0

  const onBack = () => {
    router.push('/certificate-management')
  }

  const onDownloadSampleQuestions = async () => {
    showLoading()
    if (isHaveDocuments) {
      const url = await zip(documents)
      download(url, 'zip-file')
    }
    hideLoading()
  }

  useEffect(() => {
    if ((data as any)?.data) {
      setCourse((data as any)?.data)
    }
  }, [(data as any)?.data])

  useEffect(() => {
    if (haventRegistration) {
      onOpenHaventRegistration()
    }
  }, [haventRegistration])

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={{
        md: 6,
        xs: 3
      }}
    >
      <Box
        display={{
          md: 'flex',
          xs: !isDirectTest ? 'flex' : 'none'
        }}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <SecondaryButton
          action={onBack}
          btnSize='sm'
          btnBorder='pill'
          sx={{
            width: 121,
            display: {
              md: 'flex',
              xs: 'none'
            }
          }}
        >
          <ChevronLeftIcon
            svgProps={{ width: 16, height: 16 }}
            pathProps={{
              stroke: theme.palette.main_grey.gray200
            }}
          />
          <Typography plainColor='main_grey.gray200' cate='button_20'>
            이전으로
          </Typography>
        </SecondaryButton>
        {!isDirectTest && (
          <Box
            width={{
              md: 'auto',
              xs: '100%'
            }}
            sx={{
              button: {
                height: {
                  md: 56,
                  xs: 44
                }
              }
            }}
            display={'flex'}
            gap={1}
          >
            {isHaveDocuments && (
              <SecondaryButton
                isLoading={loading}
                fullWidth={mdMatches}
                onClick={onDownloadSampleQuestions}
                sx={{ width: 165, height: 56 }}
                btnSize={mdMatches ? 'designed-sm' : 'designed-md'}
              >
                <Typography cate='button_30' breakpoints={{ md: 'button_20' }} plainColor='main_grey.gray200'>
                  기출문제 다운로드
                </Typography>
              </SecondaryButton>
            )}
            {statusRecruitmentFormatV2 !== COURSE_FORMAT_STATUS.FAIL && <TestButtonByState {...{ course }} />}
          </Box>
        )}
      </Box>
      {!mdMatches && <Divider sx={{ borderColor: 'main_grey.gray700' }} />}
      <CertificateLesson {...{ isDirectTest, course, setCourse, onDownloadSampleQuestions }} />

      {/* Alert */}
      <InfoAlert
        onSubmit={onBack}
        submitTxt={'확인'}
        title={'시강좌 신청서를 찾을 수 없습니다.'}
        open={openHaventRegistration}
      />
    </Box>
  )
}

export default ProductDetailWrapper({ component: CourseDetailPage })
