'use client'
import { CardHorizontalSlide, ExpertMentoringCard } from '@/components'
import { MENTORING_BADGE, MENTORING_STATUS } from '@/constants/community/mentoring.constant'
import { EmptyText, Title } from '@/elements'
import { getMentors } from '@/services/mentoring.service'
import { Metadata } from '@/types/types.type'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

const RecommnededExperts = () => {
  const { data: mentorsData, refetch } = useQuery({
    queryKey: [`mentor-recommend`],
    queryFn: getMentors.bind(null, {
      status: [MENTORING_STATUS.APPROVAL],
      badge: [MENTORING_BADGE.RECOMMEND],
      page: 1,
      limit: 16
    })
  })

  const { data: { result: mentors = [], metaData = {} as Metadata } = {} } = mentorsData || ({} as any)
  return (
    <Box>
      <Title>추천 멘토</Title>
      <Box
        sx={{
          mt: {
            md: 3,
            xs: 2
          }
        }}
        mt={3}
      >
        {mentors.length > 0 ? (
          <CardHorizontalSlide listContainerSx={{ gap: 3, px: 2 }} containerSx={{ px: 0 }}>
            {mentors.map((i) => (
              <Box
                sx={{
                  width: {
                    md: 366,
                    xs: 320
                  }
                }}
                key={i.id}
                flexShrink={0}
              >
                <ExpertMentoringCard mentor={i} refetch={() => refetch()} />
              </Box>
            ))}
          </CardHorizontalSlide>
        ) : (
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'} my={14}>
            <EmptyText>데이터 없습니다.</EmptyText>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default RecommnededExperts
