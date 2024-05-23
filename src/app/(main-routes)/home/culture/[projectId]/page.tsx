import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'

const CulturePage = dynamic(() => import('../culture-page'), {
  loading: () => <LoadingComponent open />
})
const CultureProjectPage = async <T,>({ params }: { params: { projectId: number }; searchParams: T }) => {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CulturePage projectId={params.projectId} />
    </HydrationBoundary>
  )
}

export default CultureProjectPage
