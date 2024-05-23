import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'
import { PageTitle } from '@/components'
import TabsComponents from '@/app/(main-routes)/(user)/education-application/_components/tabs'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getEducationApplicationList } from '@/services/educational-event.service'
import { SearchParams } from '@/types/types.type'

const EducationApplicationContent = dynamic(() => import('./_components/contents'), {
	loading: () => <LoadingComponent open />
})

const EducationApplication = async ({
	searchParams: { page, type }
}: {
	searchParams: SearchParams<{ page: string; type: string }>
}) => {
	const queryClient = new QueryClient()
	
	await queryClient.prefetchQuery({
		queryKey: ['education-application-content', page, type],
		queryFn: () =>
			getEducationApplicationList({
				type: !!type ? type : undefined,
				page: page,
				limit: 16
			})
	})
	
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<PageTitle>교육 신청</PageTitle>
			<TabsComponents />
			<EducationApplicationContent />
		</HydrationBoundary>
	)
}

export default EducationApplication
