'use client'
import ChevronDownIcon from '@/assets/icons/chevrons/chevron-down'
import { Card, Dialog, ReportDialogContent, SanitizationHtml } from '@/components'
import { MENTORING_COURSE_NAME } from '@/constants/community/mentoring.constant'
import { MENTOR_PRODUCT_TYPE } from '@/constants/mentor.constant'
import {
  BaseChip,
  CommentActionMenu,
  DesignedPrimaryButton,
  DesignedSecondaryButton,
  EllipsisText,
  EmptyText,
  Typography
} from '@/elements'
import { useDialog } from '@/hooks/use-dialog'
import { useUserProfile } from '@/hooks/use-user-profile'
import { getReviewsByMentoringId, removeReviews } from '@/services/mentoring.service'
import { MentorProductContent, TMentor, TMentoringReview } from '@/types/community/mentoring.type'
import { formatCurrency } from '@/utils/string'
import { Box, Grid } from '@mui/material'
import { QueryClient, useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

type MetorProgressCardProps = {
  productContent: MentorProductContent
  onPayment: (id: number) => void
  disabled?: boolean
}

const MetorProgressCard = ({ productContent, onPayment, disabled = false }: MetorProgressCardProps) => {
  const { product: { name = '', description = '', price = 0 } = {}, id } = productContent
  const courseName = MENTORING_COURSE_NAME.get(name as MENTOR_PRODUCT_TYPE) || ''

  return (
    <Card sx={{ bgcolor: 'main_grey.gray700', p: 3, width: '100%' }}>
      <Typography cate='title_40' plainColor='main_grey.gray100'>
        {courseName}
      </Typography>
      <EllipsisText lineHeight={1} height={16} mt={1} cate='body_30' plainColor='main_grey.gray300'>
        {description}
      </EllipsisText>
      <Typography cate='title_60' plainColor='main_grey.gray100' mt={2.5}>
        {formatCurrency(price)}
      </Typography>
      <DesignedPrimaryButton
        disabled={disabled}
        onClick={() => onPayment(id)}
        sx={{ mt: 3 }}
        fullWidth
        btnBorder='pill'
        btnSize='designed-sm'
      >
        멘토링 요청
      </DesignedPrimaryButton>
    </Card>
  )
}

const MentorReviewCard = ({ review, isFirst = false }: { review: TMentoringReview; isFirst?: boolean }) => {
  const { content = '', user: { username = '' } = {}, extraKeywords = [], id: reviewId } = review
  const { id } = review?.mentoring?.user
  const { user } = useUserProfile()
  const { open, onClose, onOpen } = useDialog()
  const queryClient = new QueryClient()

  const removeReviewAct = useMutation({
    mutationFn: removeReviews
  })

  const isOwner = user?.id ? +user.id === id : false

  const onRemove = async () => {
    const result = await removeReviewAct.mutateAsync({
      reviewId
    })
    if (result.data.id) {
      queryClient.refetchQueries({
        queryKey: [`mentor-detail-review-${id}`]
      })
    }
  }

  return (
    <Card sx={{ bgcolor: 'main_grey.gray700', p: 3 }}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <Typography cate='title_40' plainColor='main_grey.gray100'>
            {username}
          </Typography>
          {isFirst && (
            <BaseChip
              sx={{ bgcolor: 'main_grey.gray600' }}
              label={
                <Typography cate='sub_title_10' plainColor='main_primary.blue300'>
                  BEST
                </Typography>
              }
            />
          )}
        </Box>
        <CommentActionMenu
          isShowReportBtn={!isOwner}
          isShowRemoveBtn={isOwner}
          isShowEditBtn={false}
          deleteTxt='댓글을 삭제하시겠습니까?'
          handleDelete={onRemove}
          handleReport={onOpen}
          btnSx={{
            bgcolor: 'main_grey.gray600'
          }}
        />
      </Box>
      <Typography mt={1.5} cate='body_30' plainColor='main_grey.gray100'>
        {content}
      </Typography>
      <Box
        mt={3}
        display={'flex'}
        gap={1}
        flexWrap={'wrap'}
        flexDirection={{
          md: 'row',
          xs: 'column'
        }}
      >
        {extraKeywords.map((i, idx) => (
          <BaseChip
            borderStyle='rounded-4'
            sx={{ bgcolor: 'main_grey.gray800' }}
            label={
              <Typography cate='body_10' plainColor='main_primary.blue300'>
                {i}
              </Typography>
            }
            key={idx}
          />
        ))}
      </Box>
      <Dialog onClose={onClose} open={open} PaperProps={{ sx: { maxWidth: 560, width: '100%' } }}>
        <ReportDialogContent id={reviewId} {...{ onClose }} />
      </Dialog>
    </Card>
  )
}

type MentorDetailLeftProps = {
  id: string
  onOpen: () => void
  mentor: TMentor
  isDisabledButton: boolean
}

const MentorDetailLeft = ({ id, onOpen, mentor, isDisabledButton }: MentorDetailLeftProps) => {
  const searchParams = new URLSearchParams(useSearchParams())
  const router = useRouter()
  const {
    fetchNextPage,
    hasNextPage,
    data: result
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [`mentor-detail-review-${id}`],
    queryFn: ({ pageParam }) =>
      getReviewsByMentoringId({
        id: +id,
        page: pageParam,
        limit: 3
      }),
    getNextPageParam: (dataReponse) => {
      if (!dataReponse) return
      const {
        data: {
          metaData: { currentPage, lastPage, nextPage }
        }
      } = dataReponse

      return currentPage < lastPage ? nextPage : undefined
    }
  })

  const reviews = useMemo(() => {
    const data = result?.pages.reduce((acc, curr) => [...acc, ...curr.data.result], [] as TMentoringReview[])
    return data || []
  }, [result])

  const { introduction, productContents = [] } = mentor
  const productContentsOnSale = productContents.filter((i) => i.product.isSale)

  const onPayment = (id: number) => {
    searchParams.set('courseId', `${id}`)
    router.push(`?${searchParams}`, { scroll: false })
    onOpen()
  }

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Box display={'flex'} gap={2} flexDirection={'column'}>
          <Typography cate='title_50' plainColor='main_grey.gray100'>
            멘토 소개
          </Typography>
          <Box>
            <Typography component={'div'} cate='body_30' plainColor='main_grey.gray300'>
              <SanitizationHtml>{introduction || ''}</SanitizationHtml>
            </Typography>
            {/* <Box my={3}>
              <BaseImage
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 8,
                  aspectRatio: 2
                }}
                src={TestImage}
                alt={`expert-mentoring-${0}`}
              />
            </Box>
            <Box>
              <Typography cate='body_30' plainColor='main_grey.gray300'>
                <Box dangerouslySetInnerHTML={{ __html: otherInformation || '' }}></Box>
              </Typography>
            </Box> */}
          </Box>
          {/* <Box display={'flex'} flexDirection={'column'} pt={3} gap={2}>
            <Typography cate='title_50' plainColor='main_grey.gray100'>
              멘토정보
            </Typography>
            <Box pl={1}>
              <Typography cate='body_30' plainColor='main_grey.gray100'>
                삼성자동차 디자인 총괄
              </Typography>
              <Typography mt={0.25} cate='caption_20' plainColor='main_grey.gray300'>
                2000.05 ~ 2005.12
              </Typography>
            </Box>
            <Box pl={1}>
              <Typography cate='body_30' plainColor='main_grey.gray100'>
                삼성자동차 디자인 총괄
              </Typography>
              <Typography mt={0.25} cate='caption_20' plainColor='main_grey.gray300'>
                2000.05 ~ 2005.12
              </Typography>
            </Box>
            <Box pl={1}>
              <Typography cate='body_30' plainColor='main_grey.gray100'>
                삼성자동차 디자인 총괄
              </Typography>
              <Typography mt={0.25} cate='caption_20' plainColor='main_grey.gray300'>
                2000.05 ~ 2005.12
              </Typography>
            </Box>
          </Box> */}
        </Box>
      </Card>
      <Card sx={{ p: 3 }}>
        <Typography cate='title_50' plainColor='main_grey.gray100'>
          멘토링 진행
        </Typography>
        <Box
          mt={2}
          display={'flex'}
          gap={3}
          flexDirection={{
            xxl: 'row',
            xs: 'column'
          }}
        >
          {productContentsOnSale.length > 0 ? (
            productContentsOnSale.map((i) => (
              <Box maxWidth={492} key={i.id} flexGrow={1}>
                <MetorProgressCard disabled={isDisabledButton} onPayment={onPayment} productContent={i} />
              </Box>
            ))
          ) : (
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              height={'100%'}
              width={'100%'}
              my={14}
            >
              <EmptyText>데이터 없습니다.</EmptyText>
            </Box>
          )}
        </Box>
      </Card>
      <Card sx={{ p: 3 }}>
        <Box display={'flex'} gap={1}>
          <Typography cate='title_50' plainColor='main_grey.gray100'>
            멘토링 리뷰
          </Typography>
          <Typography cate='title_50' plainColor='main_primary.blue300'>
            총 {reviews.length}건
          </Typography>
        </Box>
        <Grid container columnSpacing={2} gap={2} mt={2}>
          {reviews.length > 0 ? (
            reviews.map((i, idx) => (
              <Grid item xl={12} lg={12} sm={12} key={i.id}>
                <MentorReviewCard isFirst={idx === 0} review={i} />
              </Grid>
            ))
          ) : (
            <Box
              width={'100%'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              height={'100%'}
              my={14}
            >
              <EmptyText>데이터 없습니다.</EmptyText>
            </Box>
          )}
        </Grid>
        {hasNextPage && (
          <DesignedSecondaryButton
            fitContent
            btnBorder='pill'
            onClick={() => fetchNextPage()}
            sx={{
              bgcolor: 'main_grey.gray700',
              borderColor: 'main_grey.gray700',
              p: '9px 24px',
              mt: 4,
              mb: 2,
              mx: 'auto'
            }}
          >
            <Typography cate='button_20' plainColor='main_grey.gray100'>
              리뷰 더보기
            </Typography>
            <ChevronDownIcon />
          </DesignedSecondaryButton>
        )}
      </Card>
    </>
  )
}

export default MentorDetailLeft
