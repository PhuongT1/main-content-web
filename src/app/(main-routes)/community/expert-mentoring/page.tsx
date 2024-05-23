import { Banner, PageTitle } from '@/components'
import { BANNER_SUBTYPE, BANNER_TYPE } from '@/types/banner.type'
import { Box, Stack } from '@mui/material'
import BeMentor from './_components/be-mentor'
import BestReviews from './_components/best-reviews'
import MentorList from './_components/mentor-list'
import MentorsOfTheMonth from './_components/mentors-of-the-month'
import RecommnededExperts from './_components/recommended-experts'

const ExpertMentoringPage = () => {
  return (
    <Stack gap={3}>
      <PageTitle>전문가 멘토링</PageTitle>
      <Banner type={BANNER_TYPE.MENTORING} subType={BANNER_SUBTYPE.MENTORING_TOP} />
      <Stack sx={{ gap: { md: 6, xs: 5 } }}>
        <RecommnededExperts />
        <MentorsOfTheMonth />
        <BestReviews />
        <Box mt={3}>
          <BeMentor />
        </Box>
        <MentorList />
      </Stack>
    </Stack>
  )
}

export default ExpertMentoringPage
