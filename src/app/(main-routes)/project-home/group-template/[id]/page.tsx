import dynamic from 'next/dynamic'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import LoadingComponent from '@/components/loading'

const GroupProject = dynamic(() => import('../../_modules/presenters/pages/group-project'), {
  ssr: false,
  loading: () => <LoadingComponent open />
})

type SearchParams = {
  page: number
  searchKeyword: string
}

const GroupProjectTemplateDetailPage = async ({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams: SearchParams
}) => {
  const queryClient = new QueryClient()
  const { id } = params

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupProject id={id} />
    </HydrationBoundary>
  )
}

export default GroupProjectTemplateDetailPage
