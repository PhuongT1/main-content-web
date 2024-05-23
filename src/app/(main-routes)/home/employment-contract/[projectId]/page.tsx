import LoadingComponent from '@/components/loading'
import { getActiveStep, getSteps } from '@/services/deck.service'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { QUERY_KEY } from '../utils/constants'
import { StepList, StepProject } from '@/types/deck.type'

const EmploymentContract = dynamic(() => import('../stepsWrapper'), {
  loading: () => <LoadingComponent open />
})

const EmploymentContractPage = async <T,>({ params }: { params: { projectId: number }; searchParams: T }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEY as any,
    queryFn: ({ queryKey: [, param] }: { queryKey: [string, { deckId: number }] }) => getSteps(param)
  })

  const data: StepList<T>[] | undefined = queryClient.getQueryData(QUERY_KEY)
  const stepDeck = data ? data[0] : undefined

  if (stepDeck) {
    await queryClient.prefetchQuery({
      queryKey: [
        'employment-contract-data',
        { deckId: stepDeck.deckId, stepId: stepDeck.id, projectId: params.projectId }
      ],
      queryFn: ({ queryKey: [, param] }: { queryKey: [string, StepProject] }) => getActiveStep<T>(param)
    })
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EmploymentContract projectId={params.projectId} />
    </HydrationBoundary>
  )
}

export default EmploymentContractPage
