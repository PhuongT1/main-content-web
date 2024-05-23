import { getBannerByType } from '@/actions/apis/banner.action'
import { getCategories } from '@/actions/apis/category.action'
import { getPoolList } from '@/actions/apis/pool.action'
import { Banner, PageTitle } from '@/components'
import LoadingComponent from '@/components/loading'
import { SUB_CATEGORY } from '@/constants/common.constant'
import { BANNER_SUBTYPE, BANNER_TYPE } from '@/types/banner.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

const CommunityTalents = dynamic(
  () => import('@/app/(main-routes)/community/talents/_clientComponent/community-talent'),
  {
    loading: () => <LoadingComponent open />
  }
)

const CommunityTalentsPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['pools-list', 1, '', ''],
    queryFn: () =>
      getPoolList({
        page: 1,
        limit: 16,
        categoryId: undefined,
        keyword: undefined
      })
  })

  await queryClient.prefetchQuery({
    queryKey: ['talent-community-occupations'],
    queryFn: () => getCategories({ subType: SUB_CATEGORY.OCCUPATION })
  })

  await queryClient.prefetchQuery({
    queryKey: ['banner', BANNER_TYPE.POOL],
    queryFn: () => getBannerByType({ type: BANNER_TYPE.POOL })
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageTitle>인재풀</PageTitle>
      <Banner
        type={BANNER_TYPE.POOL}
        subType={BANNER_SUBTYPE.POOL_TOP}
        sx={{
          mt: convertToRem(24)
        }}
      />
      <CommunityTalents />
    </HydrationBoundary>
  )
}

export default CommunityTalentsPage
