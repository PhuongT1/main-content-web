import dynamic from 'next/dynamic'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import LoadingComponent from '@/components/loading'
import Breadcrumb from '@/components/breadcrumb'
import PageHeader from '@/components/page-header'

const ArticlesOfIncorporation = dynamic(() => import('../_clientComponents/index'), {
  loading: () => <LoadingComponent open />
})

export default async function ArticlesOfIncorporationPage<T>({
  params
}: {
  params: { projectId: number }
  searchParams: T
}) {
  const queryClient = new QueryClient()

  const breadcrumb = [
    { icon: '' },
    { label: '프로젝트', title: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼' },
    { label: 'DECK', title: '법인정관' }
  ]

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Breadcrumb list={breadcrumb} />
      <PageHeader title='법인정관' />
      <ArticlesOfIncorporation projectId={params.projectId} />
    </HydrationBoundary>
  )
}
