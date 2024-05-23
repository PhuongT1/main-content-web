import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'
import { getSloganConcept } from '@/services/slogan.service'
import { DeckProject } from '@/types/deck.type'
import { getSteps } from '@/services/deck.service'
import { DEFAULT_STEP_SLOGAN } from '@/constants/slogan.constant'

const SloganPage = dynamic(() => import('../_clientComponents/slogan'), {
  loading: () => <LoadingComponent open />
})
const NamingPage = async <T,>({ params }: { params: { projectId: number }; searchParams: T }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['slogan-concept'],
    queryFn: () => getSloganConcept()
  })

  await queryClient.prefetchQuery({
    queryKey: [`step-list-slogan`, { deckId: DEFAULT_STEP_SLOGAN.deckId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SloganPage projectId={params.projectId} />
    </HydrationBoundary>
  )
}

export default NamingPage
