'use client'
import { CardHorizontalSlide } from '@/components'
import BestMentorCard from '@/components/cards/best-review-mentor.card'
import { EmptyText, Title } from '@/elements'
import { getMentorsWithBestReview } from '@/services/mentoring.service'
import { Metadata } from '@/types/types.type'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

const BestReviews = () => {
  const { data: mentorsData, refetch } = useQuery({
    queryKey: [`mentor-best-review`],
    queryFn: getMentorsWithBestReview.bind('', {
      page: 1,
      limit: 16
    })
  })

  const { data: { result: mentors = [], metaData = {} as Metadata } = {} } = mentorsData as any

  return (
    <Box>
      <Title>베스트 리뷰</Title>
      <Box mt={3}>
        {mentors.length ? (
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
                <BestMentorCard mentor={i.mentoring as any} bestReview={i.content} reviewerName={i.user.username} />
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

export default BestReviews
