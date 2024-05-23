import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import Bookmarks from './_clientComponent/bookmark'
import { getAllBookmarks } from '@/actions/apis/bookmark.action'

const BookMarkGroupPage = async () => {
	const queryClient = new QueryClient()
	
	await queryClient.prefetchQuery({
		queryKey: ['all-bookmarks'],
		queryFn: getAllBookmarks
	})
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Bookmarks />
		</HydrationBoundary>
	)
}

export default BookMarkGroupPage
