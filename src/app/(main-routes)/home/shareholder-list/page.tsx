import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import LoadingComponent from '@/components/loading'
import dynamic from 'next/dynamic'

const ShareholderList = dynamic(() => import('./_clientComponents'), {
  loading: () => <LoadingComponent open />
})

export default function ShareholderListPage() {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShareholderList />
    </HydrationBoundary>
  )
}
