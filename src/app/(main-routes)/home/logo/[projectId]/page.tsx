import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'

const LogoPage = dynamic(() => import('../logo-page'), {
  loading: () => <LoadingComponent open />
})
const LogoProjectPage = async <T,>({ params }: { params: { projectId: number }; searchParams: T }) => {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LogoPage projectId={params.projectId} />
    </HydrationBoundary>
  )
}

export default LogoProjectPage
