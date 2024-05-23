import { updateBookmark } from '@/actions/apis/bookmark.action'
import SharePopup from '@/app/(main-routes)/blogs/_components/share-popup'
import { BookMarkIcon } from '@/assets/icons'
import ChevronDownIcon from '@/assets/icons/chevrons/chevron-down'
import LinkMdIcon from '@/assets/icons/link-md'
import { Card, LinearBar, MentorAchievement } from '@/components'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import {
  BaseImage,
  DesignedLinkButton,
  DesignedPrimaryButton,
  DesignedSecondaryButton,
  EmptyText,
  SecondaryIconButton,
  Typography
} from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { getReviewsAnalysisByMentoringId } from '@/services/mentoring.service'
import { ColorPalette } from '@/themes/get-design-tokens'
import { TMentor } from '@/types/community/mentoring.type'
import { ResponseMessage } from '@/types/types.type'
import getCurrentUrl from '@/utils/get-current-url'
import { Box, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const LINEAR_COLORS: ColorPalette[] = [
  'main_primary.blue800',
  'main_primary.blue500',
  'main_primary.blue40',
  'main_primary.blue40',
  'main_primary.blue70',
  'sub.purple10'
]

type MentorDetailRightProps = {
  onOpen: () => void
  id: string
  mentor: TMentor
  refetch?: () => void
  isDisabledButton: boolean
}

const MentorDetailRight = ({ onOpen, id, mentor, refetch, isDisabledButton }: MentorDetailRightProps) => {
  const theme = useTheme()
  const [isShowMoreReviewAnalysis, setShowMoreReviewAnalysis] = useState(false)
  const { open, onClose, onOpen: openSharePopup } = useDialog()

  const { data: reviewsAnalysisData } = useQuery({
    queryKey: [`mentor-detail-review-analysis-${id}`, id],
    queryFn: getReviewsAnalysisByMentoringId.bind(null, {
      id: +id
    })
  })

  const reviewsAnalysis = (reviewsAnalysisData as any)?.data || []

  const bookmarkSvgColor = theme.palette.main_primary.blue500
  const shareSvgColor = theme.palette.main_grey.gray400

  const { avatar } = mentor.user || {}
  const {
    nameOfAffiliation = '',
    username = '',
    totalReviews = 0,
    totalApplications = 0,
    otherInformation = '',
    isBookmark,
    categories = []
  } = mentor

  const bookmarkAct = useMutation({
    mutationFn: updateBookmark,
    onSuccess: (data: ResponseMessage) => {
      refetch?.()
    }
  })

  const onBookmark = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    bookmarkAct.mutateAsync({
      type: BOOKMARK_TYPE.MENTORING,
      id: +id
    })
  }

  return (
    <>
      <Card sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
        <Box
          display={'flex'}
          flexDirection={{
            md: 'column',
            xs: 'row'
          }}
          alignItems={'center'}
          gap={{
            md: 0,
            xs: 2
          }}
        >
          <Box
            height={{
              md: 160,
              xs: 88
            }}
            width={{
              md: 160,
              xs: 88
            }}
            alignSelf={'center'}
          >
            <BaseImage
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 99
              }}
              src={avatar?.url || ''}
              alt={`mentoring-${0}`}
            />
          </Box>
          <Box
            textAlign={{
              md: 'center',
              xs: 'left'
            }}
          >
            <Typography
              alignSelf={'center'}
              mt={{
                md: 2.5,
                xs: 0
              }}
              cate='title_40'
              plainColor='sub.teal400'
            >
              {nameOfAffiliation}
            </Typography>
            <Box alignSelf={'center'} mt={0.5} display={'flex'} gap={0.5}>
              <Typography cate='title_60' plainColor='main_grey.gray100'>
                {username} 멘토
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          mt={0.5}
          mb={2}
          alignSelf={{
            md: 'center',
            xs: 'flex-start'
          }}
        >
          <MentorAchievement
            rocketSize='sm'
            totalApplications={totalApplications}
            totalReviews={totalReviews}
            containerSx={{
              my: {
                md: 0,
                xs: 2
              }
            }}
          />
        </Box>
        <Typography cate='sub_title_30' plainColor='main_grey.gray100'>
          소개
        </Typography>
        <Typography mt={0.5} cate='body_30' plainColor='main_grey.gray300'>
          {otherInformation}
        </Typography>
        <Typography mt={2} cate='sub_title_30' plainColor='main_grey.gray100'>
          전문분야
        </Typography>
        <Typography cate='body_30' plainColor='main_primary.blue300'>
          {categories.map((i) => i.name).join(', ')}
        </Typography>
        <Box display={'flex'} gap={1} alignItems={'center'} mt={2}>
          <DesignedPrimaryButton disabled={isDisabledButton} onClick={onOpen} fullWidth btnSize='designed-md'>
            멘토링 요청
          </DesignedPrimaryButton>
          <SecondaryIconButton
            onClick={onBookmark}
            btnSize='md'
            sx={{ height: 56, width: 56, borderColor: 'main_grey.gray500' }}
          >
            <BookMarkIcon
              pathProps={{
                ...(isBookmark && { fill: bookmarkSvgColor, stroke: bookmarkSvgColor })
              }}
            />
          </SecondaryIconButton>
        </Box>
        <DesignedLinkButton onClick={openSharePopup} fitContent sx={{ mt: 3, mx: 'auto' }}>
          <LinkMdIcon gProps={{ fill: shareSvgColor }} />
          <Typography cate='button_2_semibold' plainColor='main_grey.gray200'>
            공유하기
          </Typography>
        </DesignedLinkButton>
      </Card>
      <Card sx={{ p: 3 }}>
        <Typography textAlign={'center'} cate='title_40' plainColor='main_grey.gray100'>
          멘토링 리뷰 키워드
        </Typography>
        {reviewsAnalysis.length > 0 ? (
          <Box mt={3} display={'flex'} flexDirection={'column'} gap={1}>
            {(isShowMoreReviewAnalysis ? reviewsAnalysis : reviewsAnalysis.slice(0, 5)).map((i, idx) => {
              return (
                <LinearBar value={i.count} key={idx} max={20} barBg={LINEAR_COLORS[idx < 5 ? idx : idx % 6]}>
                  <Typography cate='sub_title_30' plainColor='main_grey.gray100'>
                    {i.keyword}
                  </Typography>
                </LinearBar>
              )
            })}
          </Box>
        ) : (
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'} my={14}>
            <EmptyText>데이터 없습니다.</EmptyText>
          </Box>
        )}
        {reviewsAnalysis.length > 5 && (
          <DesignedSecondaryButton
            fitContent
            btnBorder='pill'
            onClick={() => setShowMoreReviewAnalysis((pre) => !pre)}
            sx={{
              bgcolor: 'main_grey.gray700',
              borderColor: 'main_grey.gray700',
              p: '9px 24px',
              mt: 4,
              mb: 2,
              mx: 'auto'
            }}
          >
            <Typography cate='button_20' plainColor='main_grey.gray200'>
              {isShowMoreReviewAnalysis ? '접기' : '더보기'}
            </Typography>
            <ChevronDownIcon
              style={{
                transform: isShowMoreReviewAnalysis ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
              stroke={theme.palette.main_grey.gray200}
            />
          </DesignedSecondaryButton>
        )}
      </Card>
      {/* Popup */}
      <SharePopup open={open} onCancel={onClose} url={getCurrentUrl()} />
    </>
  )
}

export default MentorDetailRight
