import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'
import { PageProject } from '@/types/deck.type'
import PhuongOI from './phuong'
// const Namming = dynamic(() => import('../_clientComponents/index'), {
//   loading: () => <LoadingComponent open />
// })

const NammingPage = async <T,>({ params }: PageProject<T>) => {
  const queryClient = new QueryClient()

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <PhuongOI />
    // </HydrationBoundary>
  )
}

export default NammingPage
