'use client'
import { Pagination } from '@/components'
import EducationApplicationCard from '@/components/cards/education.application.card.'
import { ResponsiveList, Typography } from '@/elements'
import { getEducationApplicationList } from '@/services/educational-event.service'
import { EventList } from '@/types/community/educational-event.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, CircularProgress, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { memo, useState } from 'react'

const EducationApplicationContent = () => {
  const queryData = useSearchParams()
  const theme = useTheme()
  const [page, setPage] = useState(Number(queryData.get('page')) || 1)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const type = queryData.get('type')

  const {
    data: educationApplicationList,
    refetch: refetchEducationApplication,
    isFetching,
    isLoading: isLoadingEducationApplication
  } = useQuery({
    queryKey: ['education-application-content', page, type],
    queryFn: () =>
      getEducationApplicationList({
        type: !!type ? type : undefined,
        page: page,
        limit: 16
      }),
    meta: {
      offLoading: true
    }
  })

  return (
    <Stack direction={'column'} gap={3} marginTop={isMobile ? convertToRem(24) : convertToRem(48)}>
      {educationApplicationList && educationApplicationList.data.result && !isFetching ? (
        <Box>
          {educationApplicationList.data?.result.length > 0 ? (
            <ResponsiveList minGap={[264, 24]} minBreakpoints={{ md: [320, 24] }}>
              {educationApplicationList?.data.result.map((i: EventList, idx: number) => (
                <EducationApplicationCard item={i} key={idx} />
              ))}
            </ResponsiveList>
          ) : (
            <Stack
              direction={'row'}
              justifyContent={'center'}
              width={'100%'}
              minHeight={convertToRem(488)}
              alignItems={'center'}
            >
              <Typography cate='body_40' color={theme.palette.main.gray30}>
                표시할 교육 행사가 없습니다.
              </Typography>
            </Stack>
          )}
          {educationApplicationList.data?.metaData && educationApplicationList.data?.metaData.totalPages > 1 ? (
            <Pagination
              page={page}
              sx={{ mt: 6 }}
              count={educationApplicationList.data?.metaData.totalPages}
              action={(page) => {
                setPage(page)
              }}
            />
          ) : null}
        </Box>
      ) : (
        <Stack direction={'row'} justifyContent={'center'}>
          <CircularProgress color='primary' />
        </Stack>
      )}
    </Stack>
  )
}

export default memo(EducationApplicationContent)
