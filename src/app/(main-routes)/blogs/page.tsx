import { PageTitle } from '@/components'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { SUB_CATEGORY } from '@/constants/common.constant'
import { getCategories } from '@/actions/apis/category.action'
import dynamic from 'next/dynamic'
import LoadingComponent from '@/components/loading'
import { getBlogList } from '@/actions/apis/blogs.action'
import { BLOG_TYPE } from '@/utils/constants'

type BlogSearchParams = {
	page: number,
	searchKeyword: string,
	categoryValue: number,
	listTypeValue: string
}

const ContentBlogs = dynamic(
	() => import('./_clientComponent/content-blogs'),
	{ loading: () => <LoadingComponent open /> }
)

const BlogsPage = async ({
	params,
	searchParams
}: {
	params: { slug: string }
	searchParams: BlogSearchParams
}) => {
	const queryClient = new QueryClient()
	
	await queryClient.prefetchQuery({
		queryKey: ['blog-categories'],
		queryFn: () => getCategories({ subType: SUB_CATEGORY.CONTENT })
	})
	
	const page = searchParams.page ? Number(searchParams.page) : 1
	const searchKeyword = searchParams.searchKeyword ? searchParams.searchKeyword : ''
	const categoryValue = searchParams.categoryValue ? Number(searchParams.categoryValue) : 0
	const listTypeValue = searchParams.listTypeValue ? searchParams.listTypeValue : 'POPULARY'
	
	await queryClient.prefetchQuery({
		queryKey: ['blogs-list', { page, searchKeyword, categoryValue, listTypeValue }],
		queryFn: () => getBlogList({
			page: page,
			limit: 16,
			categoryId: categoryValue !== 0 ? categoryValue : undefined,
			listType: listTypeValue,
			keyword: !!searchKeyword ? searchKeyword : undefined,
			type: BLOG_TYPE.VIDEO
		})
	})
	
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<PageTitle subTitle="전문가가 공유하는 노하우부터 트렌드까지, 창업의 모든 지식을 습득해 보세요.">
				콘텐츠 블로그
			</PageTitle>
			<ContentBlogs />
		</HydrationBoundary>
	)
}

export default BlogsPage
