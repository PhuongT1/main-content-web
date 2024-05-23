import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'

const Notice = dynamic(() => import('../_modules/presenters/pages/notice'), {
  ssr: false,
  loading: () => <LoadingComponent open />
})

type BlogSearchParams = {
  page: number
  searchKeyword: string
  categoryValue: number
  listTypeValue: string
}

const NoticePage = async ({ params, searchParams }: { params: { slug: string }; searchParams: BlogSearchParams }) => {
  const queryClient = new QueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notice />
    </HydrationBoundary>
  )
}

export default NoticePage
