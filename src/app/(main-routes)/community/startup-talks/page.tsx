import { getCategories } from '@/actions/apis/category.action'
import { Banner, PageTitle } from '@/components'
import { SUB_CATEGORY } from '@/constants/common.constant'
import { BANNER_SUBTYPE, BANNER_TYPE } from '@/types/banner.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import CommunityTalents from './components'

const CommunityTalentsPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['startup-talk-categories'],
    queryFn: () => getCategories({ subType: SUB_CATEGORY.STARTUP_TALK })
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageTitle>스타트업 토크</PageTitle>
      <Banner
        type={BANNER_TYPE.STARTUP_TALK}
        subType={BANNER_SUBTYPE.STARTUP_TALK_TOP}
        sx={{
          mt: convertToRem(24)
        }}
      />
      <CommunityTalents />
    </HydrationBoundary>
  )
}

export default CommunityTalentsPage
