import LoadingComponent from '@/components/loading'
import { Divider, Typography } from '@/elements'
import { SearchParams } from '@/types/types.type'
import { Box } from '@mui/material'
import { Suspense } from 'react'
import ApplicationList from './_components/my-application-list'

const MyApplicationsTab = async ({
  searchParams: { page, type }
}: {
  searchParams: SearchParams<{ page: string; type: string }>
}) => {
  return (
    <Box sx={{ mt: { md: 6, xs: 3 } }}>
      <Typography cate='title_70' breakpoints={{ md: 'title_50' }} plainColor='main_grey.gray100'>
        나의 신청 현황
      </Typography>
      <Divider sx={{ my: { md: 6, xs: 3 } }} />
      <Box>
        <Suspense fallback={<LoadingComponent open />}>
          <ApplicationList page={page} />
        </Suspense>
      </Box>
    </Box>
  )
}

export default MyApplicationsTab
