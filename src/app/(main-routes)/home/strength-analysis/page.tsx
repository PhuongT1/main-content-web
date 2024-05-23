import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import LoadingComponent from '@/components/loading'
import dynamic from 'next/dynamic'

const SA = dynamic(() => import('./_clientComponent/index'), {
  loading: () => <LoadingComponent open />
})

export default function SAPage() {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SA />
    </HydrationBoundary>
  )
}
