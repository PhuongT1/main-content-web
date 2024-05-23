import { SUB_CATEGORY } from '@/constants/common.constant'
import SearchInput from '@/elements/search-input'
import Typography from '@/elements/typography'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { getStartupTalkList } from '@/services/startup-talk.service'
import { IStartupTalk } from '@/types/startup-talk.type'
import { BLOG_LIST_TYPE } from '@/utils/constants'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, CircularProgress, Grid, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import SideTab from './SideTab'
import SideTabItem from './SideTabItem'
import { getCategories } from '@/actions/apis/category.action'
import { Category } from '@/types/types.type'

const SideList = ({ id }: { id: string | number }) => {
	const [categoryValue, setCategoryValue] = useState(0)
	const mdUp = useMediaQuery('(min-width: 768px)')
	const theme = useTheme()
	const router = useRouter()
	const { ref, inView } = useInView()
	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setCategoryValue(newValue)
	}
	const [keyword, setKeyword] = useState<string>('')
	const [searchKeyword, setSearchKeyword] = useState<string>('')
	const [categories, setCategories] = useState<Category[]>([])
	const [startupTalkData, setStartupTalkData] = useState<IStartupTalk[]>([])
	
	const searchBlogs = () => {
		setSearchKeyword(keyword.trim())
		setKeyword(keyword.trim())
	}
	
	const { data: startupTalkCategories, status: startupTalkCategoriesStatus } = useQuery({
		queryKey: ['startup-talk-categories'],
		queryFn: () => getCategories({ subType: SUB_CATEGORY.STARTUP_TALK })
	})
	
	const { refetch, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading, isFetching } = useInfiniteScroll({
		key: 'startup-talk-list-in-detail',
		depend: [searchKeyword, categoryValue],
		initialPageParam: {
			page: 1,
			categoryId: categoryValue !== 0 ? categoryValue : undefined,
			listType: BLOG_LIST_TYPE[1].value,
			keyword: !!searchKeyword ? searchKeyword : undefined,
			currentId: id
		},
		fn: (pageParam: any) =>
			getStartupTalkList({
				page: pageParam.page,
				limit: 16,
				categoryId: pageParam.categoryId,
				keyword: pageParam.keyword,
				currentId: pageParam.currentId
			}),
		onSuccess: (data) => {
			const page = data.pages as any[]
			let startupTalkDataRes: IStartupTalk[] = []
			
			page.forEach((page: any) =>
				page?.data?.result?.forEach((x: IStartupTalk) => {
					startupTalkDataRes.push(x)
				})
			)
			
			setStartupTalkData(startupTalkDataRes as IStartupTalk[])
		}
	})
	
	useEffect(() => {
		if (startupTalkCategoriesStatus === 'success') {
			setCategories([{ id: 0, name: '전체' } as Category, ...startupTalkCategories?.data])
		}
	}, [startupTalkCategories])
	
	useEffect(() => {
		if (inView) fetchNextPage()
	}, [inView])
	
	return (
		<Box display={'flex'} flexDirection={'column'}>
			<Box>
				<SearchInput
					fullWidth
					placeholder="Search"
					sx={{ marginBottom: '1.5rem' }}
					onChange={(e) => {
						setKeyword(e.target.value)
					}}
					value={keyword}
					onRemove={() => {
						setKeyword('')
						setSearchKeyword('')
					}}
					onSearch={searchBlogs}
				/>
			</Box>
			{mdUp ? (
				<SideTab
					value={categoryValue}
					onChange={handleChange}
					variant="scrollable"
					scrollButtons
					allowScrollButtonsMobile
					aria-label="scrollable force tabs example"
				>
					{categories?.map((i: Category) => (
						<SideTabItem value={i.id} label={i.name} key={i.id} />
					))}
				</SideTab>
			) : (
				<SideTab
					sx={{
						zIndex: 5,
						bgcolor: 'main_grey.gray800',
						px: 2,
						py: '13px'
					}}
					value={categoryValue}
					onChange={handleChange}
					variant="scrollable"
					scrollButtons={false}
				>
					{categories?.map((i: Category) => (
						<SideTabItem type="secondary" sx={{ height: 34 }} value={i.id} label={i.name} key={i.id} />
					))}
				</SideTab>
			)}
			{startupTalkData.length === 0 && !isLoading && !isFetchingNextPage ? (
				<Box width={'100%'}>
					<Typography cate="body_3" textAlign={'center'} color={theme.palette.main.gray30} mt={15}>
						{searchKeyword === '' && categoryValue !== 0
							? '등록된 스타트업 토크가 없습니다.'
							: '검색된 게시글이 없습니다. 다시 시도해주세요.'}
					</Typography>
				</Box>
			) : (
				<Box
					sx={{
						borderRadius: convertToRem(16),
						p: 3,
						gap: 3,
						display: 'flex',
						flexDirection: 'column',
						mt: 2,
						backgroundColor: theme.palette.main_grey.gray800
					}}
				>
					<Typography cate="title_40">스타트업</Typography>
					<Grid container gap={2} maxHeight={438} overflow={'auto'} sx={{ overflowX: 'hidden' }}>
						{startupTalkData.map((i: IStartupTalk) => {
							return (
								<Grid
									item
									xs={12}
									key={i.id}
									sx={{ cursor: 'pointer' }}
									onClick={() => {
										router.push('/community/startup-talks/' + i.id)
									}}
								>
									<Typography
										sx={{
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											width: '100%',
											display: '-webkit-box',
											WebkitLineClamp: '1',
											WebkitBoxOrient: 'vertical',
											wordBreak: 'break-all'
										}}
										cate="body_30"
									>
										{'· ' + i.title}
									</Typography>
								</Grid>
							)
						})}
						{hasNextPage && (
							<Box width={'100%'} display={'flex'} justifyContent={'center'} ref={ref}>
								{isFetchingNextPage ? <CircularProgress color="primary" /> : null}
							</Box>
						)}
					</Grid>
				</Box>
			)}
		</Box>
	)
}

export default SideList
