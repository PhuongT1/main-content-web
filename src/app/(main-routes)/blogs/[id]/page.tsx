import { PageTitle } from '@/components'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getBlogDetail } from '@/actions/apis/blogs.action'
import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'

const ContentBlogDetail = dynamic(
	() => import('../_clientComponent/content-blog-detail'),
	{ loading: () => <LoadingComponent open /> }
)

const ContentBlogDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
	const queryClient = new QueryClient()
	
	await queryClient.prefetchQuery({
		queryKey: ['blog-detail', Number(id)],
		queryFn: () => getBlogDetail(id || '')
	})
	
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<PageTitle subTitle="전문가가 공유하는 노하우부터 트렌드까지, 창업의 모든 지식을 습득해 보세요.">
				콘텐츠 블로그
			</PageTitle>
			<ContentBlogDetail id={id} />
		</HydrationBoundary>
	)
}

export default ContentBlogDetailPage
