import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import LoadingComponent from '@/components/loading'
import dynamic from 'next/dynamic'
import { DeckProject } from '@/types/deck.type'
import { getSteps } from '@/services/deck.service'

const Trade = dynamic(() => import('../_clientComponents/index'), {
  loading: () => <LoadingComponent open />
})

export default async function TradePage<T>({ params }: { params: { projectId: number }; searchParams: T }) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [`step-list-trade`, { deckId: params.projectId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Trade projectId={params.projectId} />
    </HydrationBoundary>
  )
}
