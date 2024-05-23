import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

const OpenInnovation = dynamic(() => import('../_modules/presenters/pages/open-innovation'), {
  ssr: false,
  loading: () => <LoadingComponent open />
})

type SearchParams = {
  page: number
  searchKeyword: string
}

const OpenInnovationPage = async ({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams: SearchParams
}) => {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OpenInnovation />
    </HydrationBoundary>
  )
}

export default OpenInnovationPage
