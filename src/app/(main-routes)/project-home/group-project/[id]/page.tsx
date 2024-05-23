import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getProjectDetail } from '../../_modules/use-cases/project-detail.use-cases'
import { EXPLORER_CATEGORY_ENUM } from '../../_modules/domain'

const GroupProjectDetail = dynamic(() => import('../../_modules/presenters/pages/project-detail/group-project'), {
  loading: () => <LoadingComponent open />
})

const GroupProjectDetailPage = async <T,>({ params }: { params: { id: number }; searchParams: T }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['get-project-detail', params.id],
    queryFn: async () => await getProjectDetail(params.id, false, EXPLORER_CATEGORY_ENUM.GROUP_PROJECTS)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupProjectDetail id={params.id} />
    </HydrationBoundary>
  )
}
export default GroupProjectDetailPage
