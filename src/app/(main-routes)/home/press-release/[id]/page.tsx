import Home from '@/assets/icons/home'
import MenuIcon from '@/assets/icons/menu'
import { IBreadcrumbItem } from '@/components/breadcrumb'
import { StepList } from '@/components/home/step'
import LoadingComponent from '@/components/loading'
import { getStep } from '@/services/step.service'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

const PressRelease = dynamic(() => import('../_clientComponent'), {
  loading: () => <LoadingComponent open />
})
const Breadcrumb = dynamic(() => import('@/components/breadcrumb'))
const StepItem = dynamic(() => import('@/components/home/step'))
const ProjectHeader = dynamic(() => import('@/components/project-header'))

const PressReleasePage = async ({ params, searchParams }: { params: { id: string }; searchParams: any }) => {
  const queryClient = new QueryClient()

  const steps: StepList[] = [
    {
      title: 'Step 1',
      subtTitle: '보도자료',
      description: <PressRelease id={params.id} />
    }
  ]

  const breadcrumbList: IBreadcrumbItem[] = [
    { icon: <Home stroke='#ffffff' /> },
    { label: '프로젝트', title: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼' },
    { label: 'DECK', title: '보도자료' }
  ]

  await queryClient.prefetchQuery({
    queryKey: ['press-release', { id: params.id }],
    queryFn: () => getStep({ projectId: +params.id, deckId: 14, stepId: 1 })
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Breadcrumb list={breadcrumbList} />
      <ProjectHeader title='보도자료' list={[{ icon: <MenuIcon />, title: '리스트' }]} />
      <StepItem stepList={steps} />
    </HydrationBoundary>
  )
}

export default PressReleasePage
