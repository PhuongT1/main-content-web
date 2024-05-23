import { Pagination } from '@/components'
import { BaseChip, Typography } from '@/elements'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import moment from 'moment'

import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getReviewOfMentorList } from '@/services/mentoring.service'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/atoms/user'
import { useEffect, useState } from 'react'
import { IReviewMentor } from '@/types/mentoring.type'
import MenteeReviewDialog from './_components/mentee-review-dialog'
import { MENTORING_BADGE } from '@/constants/community/mentoring.constant'
import ReportPopup from './_components/report-popup'
import { color_gray } from '@/themes/system-palette'
const EnvaluateTable = () => {
  const theme = useTheme()
  const lgUp = useMediaQuery('(min-width: 1200px)')
  const [openReview, setOpenReview] = useState<boolean>(false)
  const [selectedReview, setSelectedReview] = useState<IReviewMentor | null>(null)
  const [reportOpen, setReportOpen] = useState<boolean>(false)
  const userData = useRecoilValue(userAtom)
  const router = useRouter()
  const queryData = useSearchParams()
  const pathName = usePathname()
  const [page, setPage] = useState(Number(queryData.get('page')) || 1)
  const {
    data: reviewList,
    refetch,
    isFetching,
    isLoading
  } = useQuery({
    queryKey: ['mentoring-review-list', page],
    queryFn: () =>
      getReviewOfMentorList({
        id: userData?.mentoringId || 0,
        page: page,
        limit: 16
      }),
    staleTime: 0,
    gcTime: 0
  })

  const handlePageChange = (newValue: number) => {
    let newQuery = new URLSearchParams(Array.from(queryData.entries()))
    if (newValue !== 1) {
      newQuery.set('page', newValue + '')
    } else {
      if (!!newQuery.get('page')) {
        newQuery.delete('page')
      }
    }

    router.push(`${pathName}?${newQuery}`)
  }

  const resData = reviewList?.data || null

  useEffect(() => {
    const page = queryData.get('page')
    setPage(!!page ? Number(page) : 1)
  }, [queryData])

  return (
    <>
      <Box display='flex' justifyContent={'flex-start'} flexDirection={'column'} gap={lgUp ? 3 : 2}>
        <Typography
          cate={lgUp ? 'title_70' : 'title_50'}
          color={color_gray[300]}
          sx={{ width: lgUp ? 'auto' : '100%' }}
          textAlign={'left'}
        >
          멘토링 리뷰 관리
        </Typography>
        {!Boolean(resData) || !Boolean(resData?.result) || resData?.result?.length === 0 ? (
          <Typography
            cate={lgUp ? 'body_40' : 'body_20'}
            sx={{ width: '100%' }}
            my={lgUp ? 20 : 17.5}
            textAlign={'center'}
            color={color_gray[300]}
          >
            등록된 리뷰가 없습니다.
          </Typography>
        ) : (
          <Box sx={{ width: lgUp ? 'auto' : '100%', display: 'flex', flexDirection: 'column', gap: 5 }}>
            <Box display='flex' flexDirection={'column'}>
              <Grid
                container
                bgcolor={theme.palette.main_grey.gray700}
                sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
              >
                <Grid item xs={10} p={2}>
                  <Typography cate='sub_title_20' width={'100%'} textAlign={'center'}>
                    내용
                  </Typography>
                </Grid>
                <Grid item xs={2} p={2}>
                  <Typography cate='sub_title_20' width={'100%'} textAlign={'center'}>
                    일시
                  </Typography>
                </Grid>
              </Grid>
              {resData?.result.map((item: IReviewMentor) => {
                return (
                  <Grid
                    key={item.id}
                    container
                    py={2}
                    px={0}
                    gap={lgUp ? 0 : 1}
                    sx={{
                      borderBottom: '1px solid ' + theme.palette.main_grey.gray600
                    }}
                    onClick={() => {
                      setSelectedReview(item)
                      setOpenReview(true)
                    }}
                  >
                    <Grid
                      item
                      xl={10}
                      xs={12}
                      display='flex'
                      gap={lgUp ? 2 : 1}
                      alignItems={lgUp ? 'center' : 'flex-start'}
                      flexDirection={lgUp ? 'row' : 'column'}
                    >
                      <BaseChip
                        label={
                          <Typography cate='sub_title_10' plainColor='main_primary.blue300'>
                            {'BEST'}
                          </Typography>
                        }
                        sx={{
                          backgroundColor: theme.palette.main_grey.gray700,
                          opacity: item.badge && item.badge.includes(MENTORING_BADGE.BEST_OF_REVIEW) ? 1 : 0
                        }}
                      />
                      <Typography cate='body_20' width={'100%'} textAlign={'left'}>
                        {item.content}
                      </Typography>
                    </Grid>
                    <Grid item xl={2} xs={12} display='flex' alignItems={'center'}>
                      <Typography cate='body_20' width={'100%'} textAlign={lgUp ? 'center' : 'right'}>
                        {moment(item.createdAt).format('YYYY.MM.DD - HH:mm')}
                      </Typography>
                    </Grid>
                  </Grid>
                )
              })}
            </Box>
            <Pagination action={handlePageChange} sx={{}} page={page} count={reviewList?.data.metaData.totalPages} />
          </Box>
        )}
      </Box>
      <MenteeReviewDialog
        open={openReview}
        title={'리뷰 상세'}
        onCancel={() => {
          setSelectedReview(null)
          setOpenReview(false)
        }}
        onSubmit={() => {
          setSelectedReview(null)
          refetch()
          setOpenReview(false)
        }}
        onReport={() => {
          setOpenReview(false)
          setReportOpen(true)
        }}
        {...selectedReview}
        id={undefined}
        reviewId={Number(selectedReview?.id) || 0}
      />
      <ReportPopup
        open={reportOpen}
        mentoringReviewId={selectedReview?.id || 0}
        onCancel={() => {
          setSelectedReview(null)
          refetch()
          setReportOpen(false)
        }}
      />
    </>
  )
}

export default EnvaluateTable
