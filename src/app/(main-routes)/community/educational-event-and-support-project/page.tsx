'use client'
import { ChevronRightIcon } from '@/assets/icons'
import { Banner, CardHorizontalSlide, EducationalEventCard, PageTitle } from '@/components'
import LoadingComponent from '@/components/loading'
import { EVENT_STATUS_RECRUITMENT } from '@/constants/community/educational-event.constant'
import { EmptyText, GhostButton, Typography } from '@/elements'
import { getActiveEducationalEvents } from '@/services/educational-event.service'
import { BANNER_SUBTYPE, BANNER_TYPE } from '@/types/banner.type'
import { Box, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import SupportProject from './_components/support-project'

const EducationalEventAndSupportPorject = () => {
  const router = useRouter()

  const navigateEducationalEventList = () => {
    router.push('educational-event-and-support-project/educational-event-list')
  }

  const { data: events, refetch } = useQuery({
    queryKey: [`active-events`],
    queryFn: () => {
      return getActiveEducationalEvents({
        page: 1,
        limit: 16,
        statusRecruitment: EVENT_STATUS_RECRUITMENT.PROGRESS
      })
    }
  })

  // const { data: bannerEvent, isFetching } = useQuery({
  //   queryKey: [`banner`, BANNER_TYPE.EVENT, BANNER_SUBTYPE.SUPPORT_PROJECT_TOP],
  //   queryFn: async () =>
  //     await getBannerByType({ type: BANNER_TYPE.EVENT, subType: BANNER_SUBTYPE.SUPPORT_PROJECT_TOP }),
  //   select: (data) => {
  //     return data.data
  //   }
  // })

  return (
    <Stack mt={{ md: 0, xs: 1 }} gap={3}>
      <PageTitle>교육행사&지원사업</PageTitle>
      <Banner type={BANNER_TYPE.EVENT} subType={BANNER_SUBTYPE.EVENT_TOP} />
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          mt: {
            md: 0,
            xs: 6
          },
          mr: {
            md: 0,
            xs: -2.5
          }
        }}
      >
        <Typography cate='title_70' breakpoints={{ md: 'title_60' }} plainColor='main_grey.gray100'>
          진행중인 행사
        </Typography>
        <GhostButton fitContent onClick={navigateEducationalEventList}>
          <Typography cate='title_40' plainColor='main_grey.gray100'>
            전체보기
          </Typography>
          <ChevronRightIcon />
        </GhostButton>
      </Stack>
      <Box
        sx={{
          mt: {
            md: 3,
            xs: 2
          }
        }}
      >
        <Suspense fallback={<LoadingComponent open />}>
          <CardHorizontalSlide
            listContainerSx={{
              gap: 3
            }}
          >
            {(events?.data?.result?.length || 0) > 0 ? (
              <>
                {events?.data.result!.map((i) => (
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
                    <EducationalEventCard
                      refetch={() => {
                        refetch()
                      }}
                      item={i}
                    />
                  </Box>
                ))}
              </>
            ) : (
              <Box
                flexGrow={1}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                height={'100%'}
                my={14}
              >
                <EmptyText>{'등록된 교육행사가 없습니다.'}</EmptyText>
              </Box>
            )}
          </CardHorizontalSlide>
        </Suspense>
      </Box>

      <Banner sx={{ my: { md: 6, xs: 4 } }} type={BANNER_TYPE.EVENT} subType={BANNER_SUBTYPE.SUPPORT_PROJECT_TOP} />

      <SupportProject />
    </Stack>
  )
}

export default EducationalEventAndSupportPorject
