import dynamic from 'next/dynamic'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import LoadingComponent from '@/components/loading'

const ProfitStructure = dynamic(() => import('./../index'), {
  loading: () => <LoadingComponent open />
})

export default async function ProfitStructurePage<T>({ params }: { params: { projectId: number }; searchParams: T }) {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfitStructure projectId={params.projectId} />
    </HydrationBoundary>
  )
}
