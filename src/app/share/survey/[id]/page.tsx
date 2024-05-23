import LoadingComponent from '@/components/loading'
import { getSurveyWithId } from '@/services/survey.service'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

const SurveyRequest = dynamic(() => import('./survey-request'), {
  loading: () => <LoadingComponent open />
})

const ReferentDetailPage = async <T,>({ params, searchParams }: { params: { id: number }; searchParams: T }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['get-survey-with-id', params.id],
    queryFn: async () => await getSurveyWithId(params.id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SurveyRequest id={params.id} />
    </HydrationBoundary>
  )
}

export default ReferentDetailPage
