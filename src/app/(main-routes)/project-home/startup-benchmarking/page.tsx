import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

const StartupBenchmarking = dynamic(() => import('../_modules/presenters/pages/startup-benchmarking'), {
  ssr: false,
  loading: () => <LoadingComponent open />
})

type BlogSearchParams = {
  page: number
  searchKeyword: string
  categoryValue: number
  listTypeValue: string
}

const StartupBenchmarkingPage = async ({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams: BlogSearchParams
}) => {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StartupBenchmarking />
    </HydrationBoundary>
  )
}

export default StartupBenchmarkingPage
