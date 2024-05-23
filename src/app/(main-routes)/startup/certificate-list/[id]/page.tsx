import { getReferenceRoomById } from '@/actions/apis/startup-toolkit.action'
import { PageTitle } from '@/components'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

const ReferentDetail = dynamic(() => import('./referent-detail'))

const ReferentDetailPage = async <T,>({ params, searchParams }: { params: { id: number }; searchParams: T }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['referent-room-detail', params.id],
    queryFn: async () => await getReferenceRoomById(params.id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageTitle>자료실</PageTitle>
      <ReferentDetail id={params.id} />
    </HydrationBoundary>
  )
}

export default ReferentDetailPage
