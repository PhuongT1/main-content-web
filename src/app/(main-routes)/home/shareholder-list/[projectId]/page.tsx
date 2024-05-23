import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import LoadingComponent from '@/components/loading'
import dynamic from 'next/dynamic'
import { PageProject } from '@/types/deck.type'

const ShareholderList = dynamic(() => import('../_clientComponents'), {
  loading: () => <LoadingComponent open />
})

const ShareholderListPage = async <T,>({ params }: PageProject<T>) => {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShareholderList projectId={params.projectId} />
    </HydrationBoundary>
  )
}

export default ShareholderListPage
