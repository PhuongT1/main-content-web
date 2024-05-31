import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { PageProject } from '@/types/deck.type'
import NamingPage from '../_clientComponents/index'

const Namming = dynamic(() => import('../_clientComponents/index'))

const NammingPage = async <T,>({ params }: PageProject<T>) => {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <Namming projectId={params.projectId} /> */}
      <NamingPage projectId={params.projectId} />
    </HydrationBoundary>
  )
}

export default NammingPage
