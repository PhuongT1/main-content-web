import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'
import { DeckProject } from '@/types/deck.type'
import { getSteps } from '@/services/deck.service'
import { DEFAULT_STEP_SWOT } from '@/constants/swot.constant'
import Box from '@mui/material/Box'
import { pretendard } from '@/utils/font'

const SwotPage = dynamic(() => import('../_clientComponents/swot/swot'), {
  loading: () => <LoadingComponent open />
})
export default async function NamingPage<T>({ params }: { params: { projectId: number }; searchParams: T }) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [`step-list-swot`, { deckId: DEFAULT_STEP_SWOT.deckId }],
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, DeckProject] }) => getSteps(param)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Box className={pretendard.variable} sx={{ fontFamily: 'var(--font-pretendard)' }}>
        <SwotPage projectId={params.projectId} />
      </Box>
    </HydrationBoundary>
  )
}
