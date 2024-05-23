import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import LoadingComponent from '@/components/loading'
import { getCountries } from '@/services/country.service'
import dynamic from 'next/dynamic'
import { getUserProfile } from '@/actions/apis/user.action'

const UserProfile = dynamic(() => import('./_clientComponents/user-profile'), {
	loading: () => <LoadingComponent open />
})

export default async function UserProfilePage() {
	const queryClient = new QueryClient()
	
	await queryClient.prefetchQuery({
		queryKey: ['user-profile'],
		queryFn: getUserProfile
	})
	
	await queryClient.prefetchQuery({
		queryKey: ['country-list'],
		queryFn: getCountries
	})
	
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<UserProfile />
		</HydrationBoundary>
	)
}
