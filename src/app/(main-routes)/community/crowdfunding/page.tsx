import { type Metadata } from 'next'
import { type JSX, Suspense } from 'react'
import { Stack } from '@mui/material'
import { Banner, PageTitle } from '@/components'
import { BANNER_SUBTYPE, BANNER_TYPE } from '@/types/banner.type'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import {
  getCompletedMockFundingList,
  getCrowdfundingStatus,
  getOngoingMockFundingList
} from '@/actions/apis/simulation-funding.action'
import { OngoingMockFundingList } from '@/app/(main-routes)/community/crowdfunding/components/OngoingMockFundingList'
import { CompletedMockFundingList } from '@/app/(main-routes)/community/crowdfunding/components/CompletedMockFundingList'
import { CrowdfundingStatus } from '@/app/(main-routes)/community/crowdfunding/components/CrowdfundingStatus'
import LoadingComponent from '@/components/loading'

// 1. Add four status card
// 2. CrowdfundingList 진행 중인 모의 펀딩
//   2.1 CrowdfundingCard:
//     - Image (Thumbnail)
//     - Funding Subject, Deadline D-day
//     - Funding Title
//     - Total Investment Amount, Number of Investors
//     - Participating Companies in Funding, Public Disclosure, Funding Type Display
//     - Deadline
//     - Function Participation Button
// 3. CrowdfundingListList 완료된 모의 편딩
//  3.1 CrowdfundingCard:
//    - Image (Thumbnail)
//    - Funding Subject, Deadline D-day
//    - Funding Title
//    - Total Investment Amount, Number of Investors
//    - Participating Companies in Funding, Public Disclosure, Funding Type Display
//    - Deadline
// 4. Status Card
//   - Funding numbers
//   - Participating companies
//   - Total investment amount
//   - Cumulative investment amount
//     - if 1,000,000 ₩ -> 1 백만원 ex) 28.4백만원
//     - if 10,000,000 ₩ -> 1 천만원 ex) 28.4 천만원
//     - if 100,000,000 ₩ -> 1 억원 ex) 28.4 억원
// 5. Three Modals
//   - Public Funding with type Fair Modal
//   - Public Funding with type Ranking Modal
//   - Private Funding Modal

export const metadata: Metadata = {
  title: 'Schumpeter'
}

export default async function SimulationFundingPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<JSX.Element> {
  // searchParams page is string, so convert to number, if it is array, it will be last element
  const page = Array.isArray(searchParams.page)
    ? Number(searchParams.page[searchParams.page.length - 1] || 1)
    : Number(searchParams.page || 1)

  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['crowdfunding-ongoing-mock-funding', page],
      queryFn: () => getOngoingMockFundingList({ page })
    }),

    queryClient.prefetchQuery({
      queryKey: ['crowdfunding-completed-mock-funding', 1],
      queryFn: () => getCompletedMockFundingList()
    }),

    queryClient.prefetchQuery({
      queryKey: ['crowdfunding-status'],
      queryFn: () => getCrowdfundingStatus()
    })
  ])

  const dehydratedState = dehydrate(queryClient)

  return (
    <Suspense fallback={<LoadingComponent open />}>
      <HydrationBoundary state={dehydratedState}>
        <Stack gap={{ md: 6, sm: 3 }}>
          <PageTitle>모의 크라우드 펀딩</PageTitle>
          <Banner
            sx={{ my: { md: 6, xs: 4 } }}
            type={BANNER_TYPE.CROWDFUNDING}
            subType={BANNER_SUBTYPE.CROWDFUNDING_TOP}
          />
          <CrowdfundingStatus />
          <OngoingMockFundingList page={page} />
          <CompletedMockFundingList />
        </Stack>
      </HydrationBoundary>
    </Suspense>
  )
}
