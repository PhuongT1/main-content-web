import { PageTitle } from '@/components'
import LoadingComponent from '@/components/loading'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

const MentorActivity = dynamic(() => import('./_components'), { loading: () => <LoadingComponent open /> })

const MentorActivityPage = async () => {
  const queryClient = new QueryClient()
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageTitle>멘토페이지</PageTitle>
      <MentorActivity />
    </HydrationBoundary>
  )
}

export default MentorActivityPage
