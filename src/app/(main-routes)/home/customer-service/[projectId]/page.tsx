import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'
import { PageProject } from '@/types/deck.type'
import { Suspense } from 'react'
// import LoadingPhuong from './loading-1'
// import GlobalLoading from '@/layouts/loading'

const CustomerService = dynamic(() => import('../_clientComponents/index'), {
  loading: () => <LoadingComponent open />,
  ssr: false
})

const CustomerPage = async <T,>({ params }: PageProject<T>) => {
  const queryClient = new QueryClient()
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <Suspense fallback={<LoadingPhuong />}> */}
      <CustomerService projectId={params.projectId} />
      {/* </Suspense> */}
    </HydrationBoundary>
  )
}

export default CustomerPage
