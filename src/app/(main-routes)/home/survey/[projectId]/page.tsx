import LoadingComponent from '@/components/loading'
import { getSurveyWithProjectId } from '@/services/survey.service'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

const SurveyPage = dynamic(() => import('../_clientComponents/survey'), {
  loading: () => <LoadingComponent open />
})

const ReferentDetailPage = async <T,>({ params }: { params: { projectId: number }; searchParams: T }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [`get-survey-with-project-id`, params.projectId],
    queryFn: () => getSurveyWithProjectId(params.projectId)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SurveyPage projectId={params.projectId} />
    </HydrationBoundary>
  )
}

export default ReferentDetailPage
