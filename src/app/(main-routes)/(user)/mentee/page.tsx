import { getMenteeActivity } from '@/actions/apis/mentoring.action'
import { PageTitle } from '@/components'
import LoadingComponent from '@/components/loading'
import { status } from '@/constants/mentor.constant'
import { IMenteeRequest } from '@/types/mentoring/mentee.type'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

const MenteeActivity = dynamic(() => import('./_component'), { loading: () => <LoadingComponent open /> })

const MenteeActivityPage = async () => {
  const queryClient = new QueryClient()

  const request: IMenteeRequest = {
    page: 1,
    limit: 10,
    status: status.join(',')
  }

  await queryClient.prefetchQuery({
    queryKey: ['mentee-activity', { ...request }],
    queryFn: async () => await getMenteeActivity(request)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageTitle>멘티 활동</PageTitle>
      <MenteeActivity />
    </HydrationBoundary>
  )
}

export default MenteeActivityPage
