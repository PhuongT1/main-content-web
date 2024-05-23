'use client'
import { ChevronLeftSmIcon } from '@/assets/icons'
import { Divider, SecondaryButton, Typography } from '@/elements'

import { Box, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useSetRecoilState } from 'recoil'
import { loadingAtom } from '@/atoms/loading'
import { getExamDetail } from '@/services/certificate.service'
import { TableHorizontal, TableVertical } from '@/components/table'
import {
  COLUMN_DETAIL,
  COLUMN_DETAIL_BOTTOM,
  COLUMN_DETAIL_MIDDLE,
  COLUMN_EDUCATION
} from '@/constants/startup/cerificate.constants'
import { convertToRem } from '@/utils/styles'
import DownloadIcon from '@/assets/icons/download'
import { downloadDataReferentFile } from '@/services/download.service'
import CertificateCard from '../_component/certification-card'
import TipCard from '../../_component/tip-card'
import Image from 'next/image'
import { StepsDesktop, StepsMobile } from '../_imgs'
import { COURSE_APPLICATION_STATUS_RECRUITMENT_FILTER, COURSE_TYPE } from '@/constants/certificate.constant'
import { useDialog } from '@/hooks/use-dialog'
import PaymentModal from '../../_component/payment-modal'

const ExamDetail = ({ id }: { id: number }) => {
  const theme = useTheme()
  const router = useRouter()
  const mdDown = useMediaQuery(`(max-width: 768px)`)
  const isMatch = useMediaQuery(`(max-width: 600px)`)
  const setLoading = useSetRecoilState(loadingAtom)
  const { open: openModal, onClose: onCloseModal, onOpen: onOpenModal } = useDialog()

  const {
    data: detailData,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ['exam-detail', id],
    queryFn: async () => await getExamDetail(id),
    select(data) {
      return data.data
    },
    meta: {
      offLoading: true
    },
    staleTime: 0
  })

  const handleDownload = async (file: any) => {
    setLoading(true)
    try {
      await downloadDataReferentFile(file.url as string, file.name)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const { statusRecruitmentFormat, hasRetest, type, name, grade, price, retestPrice } = detailData || {}

  const isDisabledButton = () => {
    if (
      [
        COURSE_APPLICATION_STATUS_RECRUITMENT_FILTER.COMPLETE,
        COURSE_APPLICATION_STATUS_RECRUITMENT_FILTER.LEARNING
      ].includes(statusRecruitmentFormat as any)
    ) {
      return true
    } else if (statusRecruitmentFormat === COURSE_APPLICATION_STATUS_RECRUITMENT_FILTER.FAIL && !hasRetest) {
      return true
    } else {
      return false
    }
  }

  const isRetest = statusRecruitmentFormat === COURSE_APPLICATION_STATUS_RECRUITMENT_FILTER.FAIL && hasRetest

  const renderTextButton = () => {
    let text = ''
    if (statusRecruitmentFormat === COURSE_APPLICATION_STATUS_RECRUITMENT_FILTER.LEARNING) {
      text = '신청 완료'
    } else if (statusRecruitmentFormat === COURSE_APPLICATION_STATUS_RECRUITMENT_FILTER.COMPLETE) {
      text = '합격한 자격증입니다'
    } else if (isRetest) {
      text = '재응시'
    } else if (statusRecruitmentFormat === COURSE_APPLICATION_STATUS_RECRUITMENT_FILTER.FAIL && !hasRetest) {
      text = '신청하기'
    } else {
      text = '신청하기'
    }
    return text
  }

  const handleOpenModal = () => {
    onOpenModal()
  }

  const renderPrice = () => {
    return isRetest ? retestPrice : price || 0
  }

  const renderButtonText = () => {
    let text = ''

    if (isRetest) {
      if (type === COURSE_TYPE.EDUCATION) {
        text = '교육+자격시험(재응시)'
      } else {
        text = `${grade}급 (재응시)`
      }
    } else {
      if (type === COURSE_TYPE.EDUCATION) {
        text = '교육+자격시험'
      } else {
        text = `${grade}급`
      }
    }

    return text
  }

  return (
    <Box
      sx={{
        marginTop: { sm: 3 }
      }}
    >
      {!mdDown ? (
        <>
          <Box mt={6}>
            <SecondaryButton
              btnSize='xs-np'
              action={() => {
                router.back()
              }}
              sx={{ borderRadius: '99px !important', width: 121, gap: 1 }}
            >
              <ChevronLeftSmIcon
                pathProps={{
                  stroke: theme.palette.main_grey.gray200
                }}
              />
              <Typography plainColor='main_grey.gray200' cate='button_20'>
                이전으로
              </Typography>
            </SecondaryButton>
          </Box>
          <Divider sx={{ my: 6 }} />
        </>
      ) : null}
      <Box sx={{ display: 'flex', gap: convertToRem(24), flexWrap: 'wrap-reverse' }}>
        <Box
          sx={{
            paddingX: isMatch ? convertToRem(20) : convertToRem(32),
            paddingY: isMatch ? convertToRem(24) : convertToRem(32),
            borderRadius: convertToRem(16),
            display: 'flex',
            flexDirection: 'column',
            gap: isMatch ? convertToRem(32) : convertToRem(40),
            background: theme.palette.main.gray80,
            flex: 1
          }}
        >
          {type === COURSE_TYPE.EDUCATION && (
            <Box>
              <Typography cate='title_60' plainColor='main.grayf7' sx={{ marginBottom: convertToRem(24) }}>
                과정 이수 및 자격증 발급 절차
              </Typography>
              <Box
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: convertToRem(40) }}
              >
                <Image
                  src={isMatch ? StepsMobile.src : StepsDesktop.src}
                  alt={'sign'}
                  height={142}
                  width={737}
                  style={{
                    borderRadius: convertToRem(8),
                    objectFit: 'scale-down',
                    width: '100%',
                    height: '100%'
                  }}
                />
              </Box>
              <TableVertical direction='column' columns={COLUMN_EDUCATION} rows={[detailData]} />
            </Box>
          )}
          <Box>
            <Typography cate='title_60' plainColor='main.grayf7' sx={{ marginBottom: convertToRem(24) }}>
              시험 정보
            </Typography>
            {isMatch ? (
              <TableVertical direction='column' columns={COLUMN_DETAIL} rows={[detailData]} />
            ) : (
              <TableHorizontal direction='column' columns={COLUMN_DETAIL} rows={[detailData]} />
            )}
          </Box>
          <Box>
            <Typography cate='title_60' plainColor='main.grayf7' sx={{ marginBottom: convertToRem(24) }}>
              자격증 정보
            </Typography>
            <TableVertical direction='column' columns={COLUMN_DETAIL_MIDDLE} rows={[detailData]} />
          </Box>
          <Box>
            <Typography cate='title_60' plainColor='main.grayf7' sx={{ marginBottom: convertToRem(24) }}>
              자격취득현황
            </Typography>
            {isMatch ? (
              <TableVertical direction='column' columns={COLUMN_DETAIL_BOTTOM} rows={[detailData]} />
            ) : (
              <TableHorizontal direction='column' columns={COLUMN_DETAIL_BOTTOM} rows={[detailData]} />
            )}
          </Box>
          <TipCard
            title='안내사항'
            contents={[
              '자격증의 유효기간을 확인하시고, 정기적 보수교육 필수 민간 사이트 내용 확인 필요',
              '온라인으로 제공되는 교육 영상 수강완료 후 자격시험 응시가 가능합니다.',
              '정해진 시험기간이 지난 이후 교육 영상 시청 및 시험 응시는 불가합니다.'
            ]}
          />
          {!!detailData?.documents?.length && (
            <Box sx={{ display: 'flex', gap: convertToRem(8), flexWrap: 'wrap' }}>
              {detailData?.documents.map((item: any, index: number) => (
                <SecondaryButton
                  key={index}
                  endIcon={<DownloadIcon />}
                  btnSize='sm-np'
                  sx={{
                    gap: 0,
                    borderRadius: convertToRem(1000)
                  }}
                  onClick={() => handleDownload(item)}
                >
                  <Typography cate='body_30'>{item.name}</Typography>
                </SecondaryButton>
              ))}
            </Box>
          )}
        </Box>
        <Box sx={{ width: isMatch ? '100%' : 'auto', display: 'flex', flexDirection: 'column', gap: convertToRem(24) }}>
          <CertificateCard
            certificate={detailData as any}
            refetch={refetch}
            disabled={isDisabledButton()}
            buttonText={renderTextButton()}
            onClick={handleOpenModal}
            sxButton={{
              background: isRetest ? '#0691AE' : theme.palette.main_primary.blue500,
              border: isRetest ? 'none' : 'inherit'
            }}
          />
        </Box>
      </Box>
      <PaymentModal
        price={renderPrice() as any}
        onClose={onCloseModal}
        open={openModal}
        title={name as any}
        examId={id}
        buttonText={renderButtonText()}
      />
    </Box>
  )
}

export default ExamDetail
