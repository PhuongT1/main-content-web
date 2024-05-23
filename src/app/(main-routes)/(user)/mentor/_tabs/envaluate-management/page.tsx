'use client'
import { userAtom } from '@/atoms/user'
import { Typography } from '@/elements'
import CustomProgressBar from '@/elements/custom-progress-bar'
import { useDialog } from '@/hooks/use-dialog'
import { useHydrate } from '@/hooks/use-hydrate'
import { getReviewOfMentorAnalysis } from '@/services/mentoring.service'
import { color_gray } from '@/themes/system-palette'
import { IReviewOfMentorAnalysis } from '@/types/mentoring.type'
import { randomColor } from '@/types/randomColor'
import getCurrentUrl from '@/utils/get-current-url'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import SectionBox from '../../_components/SectionBox'
import EnvaluateTable from './evaluate-table'

const EnvaluateManagement = () => {
  const theme = useTheme()
  const mdUp = useMediaQuery('(min-width: 768px)')
  const lgUp = useMediaQuery('(min-width: 1200px)')
  const xlUp = useMediaQuery('(min-width: 1407px)')
  const xxlUp = useMediaQuery('(min-width: 1880px)')
  const userData = useRecoilValue(userAtom)
  const [firstColList, setFirstColList] = useState<IReviewOfMentorAnalysis[]>([])
  const [secondColList, setSecondColList] = useState<IReviewOfMentorAnalysis[]>([])
  const [key, setKey] = useState(Math.random().toString())
  const { open: mentorDialogOpen, onClose: onCloseMentorDialog, onOpen: onOpenMentorDialog } = useDialog()
  const [hydrate, setHydrate] = useState(false)
  const pathname = getCurrentUrl()
  const {} = useHydrate()
  useEffect(() => {
    setHydrate(true)
  }, [hydrate])

  useEffect(() => {
    setKey(Math.random().toString())
  }, [pathname])

  const { data, refetch, isFetching, isLoading } = useQuery({
    queryKey: ['mentoring-review-analysis'],
    queryFn: () =>
      getReviewOfMentorAnalysis({
        id: userData?.mentoringId || 0
      }),
    staleTime: 0,
    gcTime: 0
  })

  const reviewNumber = data?.data ? data?.data?.map((i: IReviewOfMentorAnalysis) => i.count || 0) : [0]
  const totalReviewNumber = reviewNumber.reduce((partialSum, a) => partialSum + a, 0)
  const largestReviewNumber = Math.max(...reviewNumber)

  useEffect(() => {
    if (Boolean(data?.data)) {
      const result = data?.data
      let reivewItem: IReviewOfMentorAnalysis[] = []

      if (result && result.length > 0) {
        result.forEach((val) => {
          reivewItem.push(val)
        })
      }

      const reviewFirstData =
        reivewItem.length % 2 === 0
          ? reivewItem.slice(0, reivewItem.length / 2)
          : reivewItem.slice(0, reivewItem.length / 2 + 1)
      const reviewSecondData =
        reivewItem.length % 2 === 0
          ? reivewItem.slice(reivewItem.length / 2)
          : reivewItem.slice(reivewItem.length / 2 + 1)

      setFirstColList(reviewFirstData)
      setSecondColList(reviewSecondData)
    }
  }, [data?.data])

  return (
    <Box display='flex' flexDirection='column' key={key} gap={lgUp ? 6 : 3}>
      <Box display='flex' justifyContent={'flex-start'} flexDirection={'column'} gap={lgUp ? 3 : 2}>
        <Typography cate={lgUp ? 'title_70' : 'title_50'} sx={{ width: lgUp ? 'auto' : '100%' }} textAlign={'left'}>
          멘토링 리뷰 키워드{' '}
          <Box component={'span'} sx={{ color: theme.palette.main_primary.blue300 }}>
            총 {totalReviewNumber}건
          </Box>
        </Typography>
        {!Boolean(data) || !Boolean(data?.data) || data?.data?.length === 0 ? (
          <Typography
            cate={lgUp ? 'body_40' : 'body_20'}
            sx={{ width: '100%' }}
            my={lgUp ? 20 : 17.5}
            color={color_gray[300]}
            textAlign={'center'}
          >
            등록된 리뷰가 없습니다.
          </Typography>
        ) : (
          <Grid container width={'100%'} rowSpacing={lgUp ? 0 : 3} columnSpacing={lgUp ? 3 : 0}>
            <Grid item lg={6} xs={12}>
              <SectionBox py={3} px={3}>
                <Box width={'100%'} display={'flex'} flexDirection='column' gap={1.25}>
                  {firstColList.map((i: IReviewOfMentorAnalysis, index: number) => {
                    return (
                      <CustomProgressBar
                        itemIndex={index}
                        key={i.id}
                        value={(i.count / largestReviewNumber) * 100}
                        progressColor={randomColor()}
                        rawValue={i.count}
                        label={`"${i.keyword}"`}
                      />
                    )
                  })}
                </Box>
              </SectionBox>
            </Grid>
            <Grid item lg={6} xs={12}>
              <SectionBox py={3} px={3}>
                <Box width={'100%'} display={'flex'} flexDirection='column' gap={1.25}>
                  {secondColList.map((i: IReviewOfMentorAnalysis, index: number) => {
                    return (
                      <CustomProgressBar
                        itemIndex={firstColList.length + index}
                        rawValue={i.count}
                        key={i.id}
                        value={(i.count / largestReviewNumber) * 100}
                        label={`"${i.keyword}"`}
                      />
                    )
                  })}
                </Box>
              </SectionBox>
            </Grid>
          </Grid>
        )}
      </Box>
      <EnvaluateTable />
    </Box>
  )
}

export default EnvaluateManagement
