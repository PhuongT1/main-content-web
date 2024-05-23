'use client'
import { updateBookmark } from '@/actions/apis/bookmark.action'
import Bookmark from '@/assets/icons/bookmark'
import BookmarkFilled from '@/assets/icons/bookmark-filled'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import { COURSE_STATUS_APPLY_EXAM, COURSE_TYPE_OBJECT } from '@/constants/certificate.constant'
import { PrimaryButton, Typography } from '@/elements'
import Button from '@/elements/button'
import { CertificateExam } from '@/types/certification.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { formatCurrency } from '@/utils/format-currency'
import { Box, Card, CardContent, Stack, SxProps, debounce, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type CertificateCardProps = {
  certificate: CertificateExam
  refetch: () => void
  disabled?: boolean
  buttonText?: string
  sxButton?: SxProps
  onClick?: () => void
  isBookmark?: boolean
}

const CertificateCard = ({ certificate, refetch, onClick, isBookmark }: CertificateCardProps) => {
  const theme = useTheme()
  const imageRef = useRef<any>()
  const [height, setHeight] = useState(171)
  const router = useRouter()

  useEffect(() => {
    const handleResize = debounce(() => {
      setHeight((imageRef.current.clientWidth * 171) / 304)
    })
    imageRef?.current?.addEventListener('resize', handleResize)
    let resizeObserver: any
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize)
      Array.from(imageRef.current.children).forEach((child) => {
        resizeObserver.observe(child)
      })
    }
    return () => {
      handleResize.clear()
      imageRef?.current?.removeEventListener('resize', handleResize)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [])

  const { mutate: executeBookmark } = useMutation({
    mutationFn: updateBookmark,
    onSuccess: async () => {
      await refetch()
    }
  })

  const handleBookmark = (id: number | string) => {
    executeBookmark({
      id: Number(id),
      type: BOOKMARK_TYPE.COURSE
    })
  }

  return (
    <Card
      sx={{
        borderRadius: convertToRem(8),
        position: 'relative',
        backgroundColor: theme.palette.main_grey.gray800,
        backgroundImage: 'none'
      }}
    >
      <CardContent
        sx={{
          paddingBottom: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Stack
          direction={'row'}
          alignItems='center'
          justifyContent={'space-between'}
          sx={{
            width: '100%',
            height: convertToRem(height),
            position: 'relative'
          }}
        >
          <Box
            display={'flex'}
            alignItems='center'
            justifyContent={'space-between'}
            component='div'
            ref={imageRef}
            sx={{
              width: '100%',
              height: convertToRem(height),
              position: 'relative',
              cursor: 'pointer'
            }}
            onClick={() => router.push(`/startup/certification-exam/${certificate.id}`)}
          >
            <Image
              src={certificate.thumbnail.url}
              alt={certificate.thumbnail.name}
              fill={true}
              style={{
                objectFit: 'cover',
                borderRadius: convertToRem(8)
              }}
            />
          </Box>
        </Stack>
        <Stack direction={'column'} gap={0.5}>
          <Typography cate='sub_title_20' color={theme.palette.main.point}>
            {COURSE_TYPE_OBJECT[certificate.type]}
          </Typography>
          <Typography
            cate='title_40'
            plainColor='main_grey.gray100'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical'
            }}
          >
            {certificate.name}
          </Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography cate='body_40' plainColor='main_grey.gray200'>
            {certificate.hasRetest && certificate.statusRecruitmentFormat === COURSE_STATUS_APPLY_EXAM.FAIL
              ? '재응시료'
              : '응시료'}
          </Typography>
          <Typography cate='sub_title_40' plainColor='main_primary.blue300'>
            {formatCurrency(certificate.price)}원
          </Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          {certificate.statusRecruitmentFormat === COURSE_STATUS_APPLY_EXAM.WAITING && (
            <PrimaryButton btnSize='md' onClick={onClick} sx={{ flex: 1 }}>
              <Typography cate='sub_title_30' plainColor='main_grey.gray100'>
                {certificate.statusRecruitmentFormatText}
              </Typography>
            </PrimaryButton>
          )}
          {certificate.statusRecruitmentFormat === COURSE_STATUS_APPLY_EXAM.APPLICANT && (
            <PrimaryButton
              btnSize='md'
              disabled
              sx={{
                bgcolor: 'main_grey.gray800',
                opacity: 0.3,
                flex: 1
              }}
            >
              <Typography cate='sub_title_30' plainColor='main_grey.gray100'>
                {certificate.statusRecruitmentFormatText}
              </Typography>
            </PrimaryButton>
          )}
          {certificate.statusRecruitmentFormat === COURSE_STATUS_APPLY_EXAM.FAIL && certificate.hasRetest && (
            <PrimaryButton
              btnSize='md'
              onClick={onClick}
              sx={{
                backgroundColor: 'sub.horizon_blue700',
                borderColor: 'sub.horizon_blue700',
                '&:hover': {
                  backgroundColor: 'sub.horizon_blue700'
                },
                flex: 1
              }}
            >
              <Typography cate='sub_title_30' plainColor='main_grey.gray100'>
                {certificate.statusRecruitmentFormatText}
              </Typography>
            </PrimaryButton>
          )}
          {certificate.statusRecruitmentFormat === COURSE_STATUS_APPLY_EXAM.FAIL && !certificate.hasRetest && (
            <PrimaryButton
              btnSize='md'
              disabled
              sx={{
                bgcolor: 'main_primary.blue500',
                borderColor: 'main_primary.blue500',
                opacity: 0.3,
                flex: 1
              }}
            >
              <Typography
                cate='sub_title_30'
                plainColor='main_grey.gray100'
                sx={{
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                시험 불합격
              </Typography>
            </PrimaryButton>
          )}
          {certificate.statusRecruitmentFormat === COURSE_STATUS_APPLY_EXAM.COMPLETE && (
            <PrimaryButton
              btnSize='md'
              disabled
              sx={{
                opacity: 0.3,
                '&.Mui-disabled': {
                  bgcolor: 'main_primary.blue500',
                  borderColor: 'main_primary.blue500'
                },
                flex: 1
              }}
            >
              <Typography
                cate='sub_title_30'
                plainColor='main_grey.gray100'
                sx={{
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {certificate.statusRecruitmentFormatText}
              </Typography>
            </PrimaryButton>
          )}
          <Button
            cate={'outlined'}
            sx={{ width: convertToRem(56) + ' !important', minWidth: convertToRem(56) }}
            onClick={() => {
              handleBookmark(certificate?.id)
            }}
            customTitle={
              certificate?.isBookmark || isBookmark ? (
                <BookmarkFilled />
              ) : (
                <Bookmark stroke={theme.palette.main.white} />
              )
            }
          />
        </Stack>
        {certificate.statusRecruitmentFormat === COURSE_STATUS_APPLY_EXAM.COMPLETE ||
          (certificate.statusRecruitmentFormat === COURSE_STATUS_APPLY_EXAM.APPLICANT && (
            <Button
              onClick={() => {
                router.push(`/certificate-management?type=my-test`)
              }}
              customTitle={
                <Typography cate='body_30' plainColor='main_grey.gray200'>
                  나의 시험으로
                </Typography>
              }
            />
          ))}
      </CardContent>
    </Card>
  )
}

export default CertificateCard
