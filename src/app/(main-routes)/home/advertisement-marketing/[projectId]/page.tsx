import LoadingComponent from '@/components/loading'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

const AdvertisementMarketing = dynamic(() => import('./../index'), {
  loading: () => <LoadingComponent open />
})

export default async function AdvertisementMarketingPage<T>({
  params
}: {
  params: { projectId: number }
  searchParams: T
}) {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdvertisementMarketing projectId={params.projectId} />
    </HydrationBoundary>
  )
}
