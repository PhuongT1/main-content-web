import dynamic from 'next/dynamic'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import LoadingComponent from '@/components/loading'

const GroupProjectTemplate = dynamic(() => import('../_modules/presenters/pages/group-project-template'), {
  ssr: false,
  loading: () => <LoadingComponent open />
})

type SearchParams = {
  page: number
  searchKeyword: string
}

const GroupProjectTemplatePage = async ({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams: SearchParams
}) => {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupProjectTemplate />
    </HydrationBoundary>
  )
}

export default GroupProjectTemplatePage
