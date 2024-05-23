import { PageTitle } from '@/components'
import { getExamDetail } from '@/services/certificate.service'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

const ExamDetail = dynamic(() => import('./exam-detail'))

const ReferentDetailPage = async <T,>({ params, searchParams }: { params: { id: number }; searchParams: T }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['exam-detail', params.id],
    queryFn: async () => await getExamDetail(params.id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageTitle>자격시험</PageTitle>
      <ExamDetail id={params.id} />
    </HydrationBoundary>
  )
}

export default ReferentDetailPage
