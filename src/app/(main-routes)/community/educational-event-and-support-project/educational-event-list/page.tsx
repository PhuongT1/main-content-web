import { Banner } from '@/components'
import { EVENT_STATUS_RECRUITMENT } from '@/constants/community/educational-event.constant'
import { Box } from '@mui/material'
import EventList from '../_components/event-list'

const EducationalEventList = async () => {
  return (
    <Box
      sx={{
        mt: {
          md: 0,
          xs: 4
        }
      }}
    >
      <EventList status={EVENT_STATUS_RECRUITMENT.PROGRESS} />
      {/* <Banner
        sx={{
          my: {
            md: 6,
            xs: 4
          }
        }}
      /> */}
      <EventList status={EVENT_STATUS_RECRUITMENT.FINISH} />
    </Box>
  )
}

export default EducationalEventList
