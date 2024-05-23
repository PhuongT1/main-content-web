import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { getUserPool } from '@/actions/apis/pool.action'

const TalentPoolPage = async ({ children }: { children: ReactNode }) => {
	const queryClient = new QueryClient()
	
	await queryClient.prefetchQuery({
		queryKey: ['user-talent-profile'],
		queryFn: async () => await getUserPool()
	})
	
	return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}

export default TalentPoolPage
