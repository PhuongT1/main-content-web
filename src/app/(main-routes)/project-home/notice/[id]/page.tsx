import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getProjectDetail } from '../../_modules/use-cases/project-detail.use-cases'

const NoticeDetail = dynamic(() => import('../../_modules/presenters/pages/notice-detail'), {
  loading: () => <LoadingComponent open />
})

const NoticeDetailPage = async <T,>({ params }: { params: { id: number }; searchParams: T }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['get-notice-detail', params.id],
    queryFn: async () => await getProjectDetail(params.id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoticeDetail id={params.id} />
    </HydrationBoundary>
  )
}

export default NoticeDetailPage
