import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getProjectDetail } from '../_modules/use-cases/project-detail.use-cases'

const MyProjectDetail = dynamic(() => import('../_modules/presenters/pages/project-detail/my-project'), {
  ssr: false,
  loading: () => <LoadingComponent open />
})

const MyProjectDetailPage = async <T,>({ params }: { params: { id: number }; searchParams: T }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['get-project-detail', params.id],
    queryFn: async () => await getProjectDetail(params.id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyProjectDetail id={params.id} />
    </HydrationBoundary>
  )
}
export default MyProjectDetailPage
