'use client'
import Breadcrumb from '@/components/breadcrumb'
import LoadingComponent from '@/components/loading'
import PageHeader from '@/components/page-header'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

const PartnershipContractPage = dynamic(() => import('../components/step-list/index'), {
  loading: () => <LoadingComponent open />
})

export default async function CompetitorAnalysisPage<T>({
  params
}: {
  params: { projectId: number }
  searchParams: T
}) {
  const queryClient = new QueryClient()

  const breadcrumb = [
    { icon: '' },
    { label: '프로젝트', title: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼' },
    { label: 'DECK', title: '동업계약' }
  ]

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Breadcrumb list={breadcrumb} />
      <PageHeader title='동업계약' />
      <PartnershipContractPage projectId={params.projectId} />
    </HydrationBoundary>
  )
}
