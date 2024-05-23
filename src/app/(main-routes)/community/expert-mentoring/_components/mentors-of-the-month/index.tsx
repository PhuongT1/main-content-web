'use client'
import MentorOfTheMonthCard from '@/components/cards/mentor-of-the-month.card'
import { MENTORING_BADGE, MENTORING_STATUS } from '@/constants/community/mentoring.constant'
import { EmptyText, Title } from '@/elements'
import { getMentors } from '@/services/mentoring.service'
import { Box, Grid } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

const MentorsOfTheMonth = () => {
  const { data: mentorsData, refetch } = useQuery({
    queryKey: [`mentor-best-of-the-month`],
    queryFn: getMentors.bind(null, {
      status: [MENTORING_STATUS.APPROVAL],
      badge: [MENTORING_BADGE.BEST_OF_MONTH],
      page: 1,
      limit: 2
    })
  })

  const { data: { result: mentors = [] } = {} } = mentorsData || ({} as any)

  return (
    <Box>
      <Title>이달의 멘토</Title>
      {mentors.length > 0 ? (
        <Grid columnSpacing={3} rowGap={3} container sx={{ mt: { md: 3, xs: 2 } }}>
          {mentors.map((i) => (
            <Grid key={i.id} item lg={6} xs={12}>
              <MentorOfTheMonthCard mentor={i} refetch={refetch} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'} my={14}>
          <EmptyText>데이터 없습니다.</EmptyText>
        </Box>
      )}
    </Box>
  )
}

export default MentorsOfTheMonth
