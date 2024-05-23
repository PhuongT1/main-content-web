import { ChevronRightIcon } from '@/assets/icons'
import LoadingComponent from '@/components/loading'
import { Divider, SecondaryButton, Typography } from '@/elements'
import { getColor } from '@/services/theme.service'
import { SearchParams } from '@/types/types.type'
import { Box } from '@mui/material'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import ApplicationList from './_components/application-list'

const ApplicationTab = async ({ searchParams: { page } }: { searchParams: SearchParams<{ page: string }> }) => {
  const chevronColor = await getColor('main_grey.gray200')

  const navigateToTalentPool = async () => {
    'use server'
    redirect('/community/talents')
  }
  return (
    <Box sx={{ mt: { md: 6, xs: 3 } }}>
      <Typography cate='title_70' breakpoints={{ md: 'title_50' }} plainColor='main_grey.gray100'>
        신청자 리스트
      </Typography>
      <Divider sx={{ my: { md: 6, xs: 3 } }} />
      <Box>
        <Suspense fallback={<LoadingComponent open />}>
          <ApplicationList page={page} />
        </Suspense>
      </Box>
      <Box
        height={204}
        width={'100%'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        borderRadius={4}
        border={'1px solid'}
        borderColor={'main_grey.gray600'}
        gap={2}
        mt={6}
      >
        <Typography
          px={'50px'}
          textAlign={'center'}
          display={'flex'}
          justifyContent={'center'}
          cate='body_30'
          plainColor='main_grey.gray100'
        >
          팀원을 찾고 싶으신가요? 더 많은 인재를 만나보세요.
        </Typography>
        <Box width={161} height={44}>
          <SecondaryButton action={navigateToTalentPool} fullHeight fullWidth sx={{ borderRadius: '99px !important' }}>
            <Typography plainColor='main_grey.gray200' cate='button_20'>
              인재풀 바로가기
            </Typography>
            <ChevronRightIcon
              svgProps={{
                width: 16,
                height: 16
              }}
              pathProps={{
                stroke: chevronColor
              }}
            />
          </SecondaryButton>
        </Box>
      </Box>
    </Box>
  )
}

export default ApplicationTab
