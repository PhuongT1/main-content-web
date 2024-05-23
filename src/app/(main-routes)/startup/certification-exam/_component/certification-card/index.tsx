'use client'
import { COURSE_STATUS_APPLY_EXAM, COURSE_TYPE } from '@/constants/certificate.constant'
import { PrimaryButton, Typography } from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { CertificateExam } from '@/types/certification.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { formatCurrency } from '@/utils/format-currency'
import { Box, Card, CardContent, Stack, debounce, useTheme } from '@mui/material'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import PaymentModal from '../payment-modal'

type CertificateCardProps = {
  certificate: CertificateExam
}

const CertificateCard = ({ certificate }: CertificateCardProps) => {
  const theme = useTheme()
  const router = useRouter()
  const path = usePathname()
  const imageRef = useRef<any>()
  const [height, setHeight] = useState(171)
  const { open: openModal, onClose: onCloseModal, onOpen: onOpenModal } = useDialog()

  const isRetest = certificate.statusRecruitmentFormat === COURSE_STATUS_APPLY_EXAM.FAIL && certificate.hasRetest

  const proceedPayment = () => {
    onOpenModal()
  }

  const proceedDetail = () => {
    router.push(`${path}/${certificate.id}`)
  }

  const renderButtonText = () => {
    let text = ''

    if (isRetest) {
      if (certificate.type === COURSE_TYPE.EDUCATION) {
        text = '교육+자격시험(재응시)'
      } else {
        text = `${certificate.grade}급 (재응시)`
      }
    } else {
      if (certificate.type === COURSE_TYPE.EDUCATION) {
        text = '교육+자격시험'
      } else {
        text = `${certificate.grade}급`
      }
    }

    return text
  }

  const renderPrice = () => {
    return isRetest ? certificate.retestPrice : certificate.price || 0
  }

  useEffect(() => {
    if (imageRef.current) {
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
    }
  }, [imageRef])

  return (
    <>
      <Card
        sx={{
          color: theme.palette.main_grey.gray800,
          borderRadius: convertToRem(8),
          position: 'relative'
        }}
      >
        <CardContent
          sx={{
            padding: convertToRem(16) + '!important',
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
                position: 'relative'
              }}
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
              {certificate.typeFormat}
            </Typography>
            <Typography
              cate='sub_title_30'
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
            <Typography cate='body_30' plainColor='main_grey.gray300'>
              {certificate.statusRecruitmentFormat === COURSE_STATUS_APPLY_EXAM.FAIL && certificate.hasRetest
                ? '재응시료'
                : '응시료'}
            </Typography>
            <Typography cate='sub_title_30' plainColor='main_primary.blue300'>
              {renderPrice().toLocaleString()}원
            </Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'} gap={1}>
            <PrimaryButton btnSize='md' outlined onClick={proceedDetail} sx={{ height: convertToRem(44) }}>
              <Typography cate='button_30' plainColor='main_grey.gray100'>
                자세히보기
              </Typography>
            </PrimaryButton>
            {certificate.statusRecruitmentFormat === COURSE_STATUS_APPLY_EXAM.WAITING && (
              <PrimaryButton btnSize='md' onClick={proceedPayment} sx={{ height: convertToRem(44) }}>
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
                  height: convertToRem(44)
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
                onClick={proceedPayment}
                sx={{
                  height: convertToRem(44),
                  backgroundColor: 'sub.horizon_blue700',
                  borderColor: 'sub.horizon_blue700',
                  '&:hover': {
                    backgroundColor: 'sub.horizon_blue700'
                  }
                }}
              >
                <Typography cate='sub_title_30' plainColor='main_grey.gray100'>
                  {certificate.statusRecruitmentFormatText}
                </Typography>
              </PrimaryButton>
            )}
            {certificate.statusRecruitmentFormat === COURSE_STATUS_APPLY_EXAM.FAIL && !certificate.hasRetest && (
              <PrimaryButton
                btnSize='sm'
                disabled
                sx={{
                  bgcolor: 'main_primary.blue500',
                  borderColor: 'main_primary.blue500',
                  opacity: 0.3
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
                btnSize='sm'
                disabled
                sx={{
                  opacity: 0.3,
                  '&.Mui-disabled': {
                    bgcolor: 'main_primary.blue500',
                    borderColor: 'main_primary.blue500'
                  }
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
          </Stack>
        </CardContent>
      </Card>
      <PaymentModal
        price={renderPrice()}
        onClose={onCloseModal}
        open={openModal}
        title={certificate.name}
        examId={certificate.id}
        buttonText={renderButtonText()}
      />
    </>
  )
}

export default CertificateCard
