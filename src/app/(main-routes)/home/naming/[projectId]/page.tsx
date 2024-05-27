import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { PageProject } from '@/types/deck.type'

const Namming = dynamic(() => import('../_clientComponents/index'))

const NammingPage = <T,>({ params }: PageProject<T>) => {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Namming projectId={params.projectId} />
    </HydrationBoundary>
  )
}

export default NammingPage
