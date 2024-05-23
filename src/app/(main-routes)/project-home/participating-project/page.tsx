import dynamic from 'next/dynamic'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import LoadingComponent from '@/components/loading'

const ParticipatingProject = dynamic(() => import('../_modules/presenters/pages/participating-project'), {
  ssr: false,
  loading: () => <LoadingComponent open />
})

type BlogSearchParams = {
  page: number
  searchKeyword: string
  categoryValue: number
  listTypeValue: string
}

const ParticipatingProjectPage = async ({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams: BlogSearchParams
}) => {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ParticipatingProject />
    </HydrationBoundary>
  )
}

export default ParticipatingProjectPage
