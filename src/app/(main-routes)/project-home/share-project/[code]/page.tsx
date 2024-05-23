import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getProjectDetail } from '../../_modules/use-cases/project-detail.use-cases'
import { EXPLORER_CATEGORY_ENUM } from '../../_modules/domain'

const ShareProjectDetail = dynamic(() => import('../../_modules/presenters/pages/project-detail/share-project'), {
  loading: () => <LoadingComponent open />
})

const ShareProjectDetailPage = async <T,>({ params }: { params: { code: string }; searchParams: T }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['get-project-detail', params.code],
    queryFn: async () => await getProjectDetail(params.code, true, EXPLORER_CATEGORY_ENUM.PARTICIPATING_PROJECTS)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShareProjectDetail id={params.code} />
    </HydrationBoundary>
  )
}
export default ShareProjectDetailPage
