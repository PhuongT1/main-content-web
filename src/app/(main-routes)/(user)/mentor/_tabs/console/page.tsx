'use client'
import { getMentorStatistic, getMentoringReviewAnalysis, getRevenueChart } from '@/actions/apis/mentoring.action'
import { ChevronRightIcon } from '@/assets/icons'
import MentorCancelIcon from '@/assets/icons/mentor/cancel'
import MentorCompleteIcon from '@/assets/icons/mentor/complete'
import MentorProgressIcon from '@/assets/icons/mentor/progress'
import MentorReportIcon from '@/assets/icons/mentor/report'
import MentorRocketIcon from '@/assets/icons/mentor/rocket'
import QuestionSmIcon from '@/assets/icons/question-sm'
import { userAtom } from '@/atoms/user'
import CardBox from '@/components/cards/card-box'
import { ResponsiveList, Typography } from '@/elements'
import CustomProgressBar from '@/elements/custom-progress-bar'
import { MentorStatistic, MentoringReviewAnalysis, RevenueChart, RevenueChartResponse } from '@/types/mentoring.type'
import { formatCurrency } from '@/utils/format-currency'
import getCurrentUrl from '@/utils/get-current-url'
import { CircularProgress, Grid, Stack, useMediaQuery } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import ChartSection from '../../_components/ChartSection'

const ConsoleTab = () => {
  const userProfile = useRecoilValue(userAtom)
  const mdUp = useMediaQuery('(min-width: 768px)')
  const lgUp = useMediaQuery('(min-width: 1120px)')
  const xlUp = useMediaQuery('(min-width: 1407px)')
  const xxlUp = useMediaQuery('(min-width: 1880px)')
  const [key, setKey] = useState(Math.random().toString())
  const [hydrate, setHydrate] = useState(false)
  const [largestNumber, setLargestNumber] = useState<number>(0)
  const pathname = getCurrentUrl()
  // const {} = useHydrate()

  const { data: statistic, isFetching: statisticFetching } = useQuery({
    queryKey: ['mentor-dashboard-statistic'],
    queryFn: () => getMentorStatistic(),
    select: (data) => {
      return data.data as MentorStatistic
    },
    meta: {
      offLoading: true
    }
  })

  const { data: analysis, isFetching: analysisFetching } = useQuery({
    queryKey: ['mentoring-review-analysis', userProfile?.mentoringId],
    queryFn: () => getMentoringReviewAnalysis(userProfile?.mentoringId ? userProfile.mentoringId : null),
    select: (data) => {
      return data.data as MentoringReviewAnalysis[]
    },
    meta: {
      offLoading: true
    }
  })

  const { data: revenue, isFetching: revenueFetching } = useQuery({
    queryKey: ['revenue-chart'],
    queryFn: () => getRevenueChart(),
    select: (data) => {
      return data.data as RevenueChartResponse
    },
    meta: {
      offLoading: true
    }
  })

  const revenueSumCalculate = (array: RevenueChart[]) => {
    return array.reduce((a, b) => a + (b.sum !== null ? b.sum : 0), 0)
  }

  useEffect(() => {
    setKey(Math.random().toString())
  }, [pathname])

  useEffect(() => {
    if (!analysisFetching && analysis) {
      setLargestNumber(Math.max(...analysis.map((val) => val.count)))
    }
  }, [analysisFetching])

  return (
    <Stack key={key}>
      <Stack direction={'row'} alignItems={'center'} justifyContent='space-between'>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography cate={mdUp ? 'title_70' : 'title_50'}>멘토 활동</Typography>
          <ChevronRightIcon
            svgProps={{
              width: 24,
              height: 24,
              viewBox: '0 0 24 28'
            }}
          />
        </Stack>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <QuestionSmIcon />
          <Typography cate='body_3'>주문 상태 안내</Typography>
        </Stack>
      </Stack>

      <ResponsiveList
        mt={3}
        justifyContent={{ md: 'flex-start', sm: 'center' }}
        minGap={[xxlUp ? 336 : xlUp ? 460 : 336, lgUp ? 24 : 8]}
        minBreakpoints={{ sm: [320, 8] }}
      >
        <CardBox
          py={{ md: 3, sm: 2 }}
          sx={{
            flexDirection: { md: 'column', sm: 'row' },
            justifyContent: 'space-between',
            backgroundColor: 'main_grey.gray800'
          }}
          alignItems={{ md: 'flex-start', sm: 'center' }}
        >
          <Stack alignItems={'center'} gap={2} direction={'row'} flexShrink={0}>
            <MentorRocketIcon svgProps={{ width: lgUp ? '44px' : '28px', height: lgUp ? '44px' : '28px' }} />
            <Typography cate={mdUp ? 'title_60' : 'title_40'}>신청</Typography>
          </Stack>
          <Typography cate={mdUp ? 'title_70' : 'title_60'} textAlign={'right'} width={'100%'}>
            {statistic ? statistic.numberOfMentoringPending : 0}
          </Typography>
        </CardBox>
        <CardBox
          py={{ md: 3, sm: 2 }}
          sx={{
            flexDirection: { md: 'column', sm: 'row' },
            justifyContent: 'space-between',
            backgroundColor: 'main_grey.gray800'
          }}
          alignItems={{ md: 'flex-start', sm: 'center' }}
        >
          <Stack alignItems={'center'} gap={2} direction={'row'} flexShrink={0}>
            <MentorProgressIcon svgProps={{ width: lgUp ? '44px' : '28px', height: lgUp ? '44px' : '28px' }} />
            <Typography cate={mdUp ? 'title_60' : 'title_40'}>진행</Typography>
          </Stack>
          <Typography cate={mdUp ? 'title_70' : 'title_60'} textAlign={'right'} width={'100%'}>
            {statistic ? statistic.numberOfMentoringInProcess : 0}
          </Typography>
        </CardBox>
        <CardBox
          py={{ md: 3, sm: 2 }}
          sx={{
            flexDirection: { md: 'column', sm: 'row' },
            justifyContent: 'space-between',
            backgroundColor: 'main_grey.gray800'
          }}
          alignItems={{ md: 'flex-start', sm: 'center' }}
        >
          <Stack alignItems={'center'} gap={2} direction={'row'} flexShrink={0}>
            <MentorReportIcon svgProps={{ width: lgUp ? '44px' : '28px', height: lgUp ? '44px' : '28px' }} />
            <Typography cate={mdUp ? 'title_60' : 'title_40'}>보고서 작성</Typography>
          </Stack>
          <Typography cate={mdUp ? 'title_70' : 'title_60'} textAlign={'right'} width={'100%'}>
            {statistic ? statistic.numberOfMentoringDuringReport : 0}
          </Typography>
        </CardBox>
        <Stack gap={{ md: 2, sm: 1 }}>
          <CardBox
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{
              flexDirection: 'row',
              backgroundColor: 'main_grey.gray800'
            }}
          >
            <Stack alignItems={'center'} gap={2} direction={'row'}>
              <MentorCancelIcon svgProps={{ width: lgUp ? '44px' : '28px', height: lgUp ? '44px' : '28px' }} />
              <Typography cate={mdUp ? 'title_60' : 'title_40'}>신청 취소</Typography>
            </Stack>
            <Typography cate={mdUp ? 'title_70' : 'title_60'} textAlign={'right'}>
              {statistic ? statistic.numberOfMentoringCanceled : 0}
            </Typography>
          </CardBox>
          <CardBox
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{
              flexDirection: 'row',
              backgroundColor: 'main_grey.gray800'
            }}
          >
            <Stack alignItems={'center'} gap={2} direction={'row'}>
              <MentorCompleteIcon svgProps={{ width: lgUp ? '44px' : '28px', height: lgUp ? '44px' : '28px' }} />
              <Typography cate={mdUp ? 'title_60' : 'title_40'}>멘토링 완료</Typography>
            </Stack>
            <Typography cate={mdUp ? 'title_70' : 'title_60'} textAlign={'right'}>
              {statistic ? statistic.numberOfMentoringCompleted : 0}
            </Typography>
          </CardBox>
        </Stack>
      </ResponsiveList>
      <Grid container mt={{ md: 6, sm: 3 }} columnSpacing={{ md: 3, sm: 0 }} rowSpacing={{ md: 0, sm: 3 }}>
        <Grid item xs={12} lg={6} display={'flex'} flexDirection='column' gap={3}>
          <Stack direction={'row'} alignItems={'center'}>
            <Typography cate={mdUp ? 'title_70' : 'title_50'}>정산 내역</Typography>
            <ChevronRightIcon
              svgProps={{
                width: 24,
                height: 24,
                viewBox: '0 0 24 28'
              }}
            />
          </Stack>
          <Stack gap={2}>
            <CardBox
              px={{ md: 5, sm: 2 }}
              py={{ md: 2.5, sm: 2 }}
              alignItems={{ md: 'center', sm: 'flex-start' }}
              flexDirection={{ ms: 'row', sm: 'column' }}
              justifyContent={{ md: 'space-between', sm: 'flex-start' }}
              gap={{ md: 0, sm: 1 }}
              sx={{
                flexDirection: { md: 'row', sm: 'column' },
                backgroundColor: 'main_grey.gray800'
              }}
            >
              <Typography cate={mdUp ? 'subtitle_1_semibold' : 'sub_title_30'} plainColor={'main_grey.gray200'}>
                이번 달 정산 예정 금액
              </Typography>
              <Typography cate={mdUp ? 'title_2_bold' : 'title_60'} color={'main_grey.gray100'}>
                {!revenueFetching && revenue && revenue.revenueChart.length > 0
                  ? formatCurrency(revenueSumCalculate(revenue.revenueChart))
                  : 0}
                원
              </Typography>
            </CardBox>
            <CardBox
              px={{ md: 5, sm: 2 }}
              py={5}
              alignItems='center'
              sx={{
                backgroundColor: 'main_grey.gray800'
              }}
            >
              {revenue && !revenueFetching ? <ChartSection revenue={revenue?.revenueChart} /> : <CircularProgress />}
            </CardBox>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={6} display={'flex'} flexDirection='column' gap={3}>
          <Stack direction={'row'} alignItems={'center'}>
            <Typography cate={mdUp ? 'title_70' : 'title_50'}>리뷰 관리</Typography>
            <ChevronRightIcon
              svgProps={{
                width: 24,
                height: 24,
                viewBox: '0 0 24 28'
              }}
            />
          </Stack>
          <CardBox
            px={{ md: 5, sm: 2 }}
            py={5}
            alignItems='center'
            height={'100%'}
            gap={{ md: 6, sm: 3 }}
            sx={{
              backgroundColor: 'main_grey.gray800'
            }}
          >
            <Stack direction={'row'} alignItems={'center'} justifyContent='space-between' width={'100%'}>
              <Typography cate={mdUp ? 'title_50' : 'sub_title_30'}>멘토링 리뷰 키워드</Typography>
              <Typography cate={mdUp ? 'title_50' : 'title_40'}>
                {analysis ? analysis.reduce((a, b) => a + b.count, 0) : 0}건
              </Typography>
            </Stack>
            <Stack width={'100%'} gap={1.25}>
              {!analysisFetching && analysis ? (
                analysis
                  .sort((a, b) => b.count - a.count)
                  .map((val, idx) => (
                    <CustomProgressBar
                      key={idx}
                      value={(val.count / largestNumber) * 100}
                      rawValue={val.count}
                      label={`"${val.keyword}"`}
                      itemIndex={idx}
                    />
                  ))
              ) : (
                <Stack justifyContent={'center'} alignItems={'center'}>
                  <CircularProgress />
                </Stack>
              )}
            </Stack>
          </CardBox>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default ConsoleTab
