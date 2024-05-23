import { getCategories } from '@/actions/apis/category.action'
import { Banner, PageTitle } from '@/components'
import LoadingComponent from '@/components/loading'
import { SUB_CATEGORY } from '@/constants/common.constant'
import { BANNER_TYPE } from '@/types/banner.type'
import { SearchParams } from '@/types/types.type'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

const DataRoomTable = dynamic(() => import('./_client-components/data-room-table'), {
  loading: () => <LoadingComponent open />
})

const ReferentRoom = async ({ searchParams: { page } }: { searchParams: SearchParams<{ page: string }> }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['reference-category'],
    queryFn: () => getCategories({ subType: SUB_CATEGORY.REFERENCE_ROOM })
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageTitle>자료실</PageTitle>
      <Banner type={BANNER_TYPE.REFERENCE_ROOM} />
      <DataRoomTable />
    </HydrationBoundary>
  )
}

export default ReferentRoom
