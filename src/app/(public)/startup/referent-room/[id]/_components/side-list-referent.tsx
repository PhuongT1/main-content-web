'use client'
import { getReferenceRoomList } from '@/actions/apis/startup-toolkit.action'
import { ObserverBox } from '@/components'
import { FilledTabStack, FillTabItem, SideListTabItem, SideListTabs } from '@/components/tabs'
import { Typography } from '@/elements'
import SearchInput from '@/elements/search-input'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { ReferenceRoom } from '@/types/startup/toolkit.type'
import { BLOG_LIST_TYPE } from '@/utils/constants'
import { Box, Grid, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import SideCardReferent from './side-card-referent'
import { updateBookmark } from '@/actions/apis/bookmark.action'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import { getCategories } from '@/actions/apis/category.action'
import { SUB_CATEGORY } from '@/constants/common.constant'
import { Category } from '@/types/types.type'

const SideListReferent = ({ id, spaceOfCategory }: { id: number; spaceOfCategory: number }) => {
	const theme = useTheme()
	const queryClient = useQueryClient()

	const [categoryValue, setCategoryValue] = useState(0)
	const mdUp = useMediaQuery('(min-width: 768px)')

	const handleChange = (_: any, newValue: number) => {
		setCategoryValue(newValue)
	}
	const [keyword, setKeyword] = useState<string>('')
	const [referentData, setReferentData] = useState<ReferenceRoom[]>([])
	// const fetchingRef = useRef<boolean>(false)

	const handleSelectChange = (event: any) => {
		setCategoryValue(event.target?.value)
	}

	const searchBlogs = () => {
		setKeyword(keyword.trim())
	}

	const { data: referentCategory } = useQuery({
		queryKey: ['referent-categories'],
		queryFn: () => getCategories({ subType: SUB_CATEGORY.REFERENCE_ROOM }),
		select(data) {
			return [{ id: 0, name: '전체' } as Category, ...data.data]
		},
		meta: {
			offLoading: true
		}
	})

	const {
		refetch,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		isLoading,
		isFetching
	} = useInfiniteScroll({
		key: 'referent-list-in-detail',
		depend: [keyword, categoryValue],
		initialPageParam: {
			page: 1,
			categoryId: categoryValue !== 0 ? categoryValue : undefined,
			listType: BLOG_LIST_TYPE[1].value,
			keyword: !!keyword ? keyword : undefined,
			currentId: id
		},
		meta: {
			offLoading: true
		},
		fn: (pageParam) =>
			getReferenceRoomList({
				page: pageParam.page,
				limit: 10,
				categoryId: pageParam.categoryId,
				listType: pageParam.listType,
				keyword: pageParam.keyword,
				currentId: pageParam.currentId
			}),
		onSuccess: (data) => {
			const page = data.pages as any[]
			let referDataRes: ReferenceRoom[] = []
			console.log("go go go", data.pages)
			page.forEach((page: any) =>
				page?.data?.result?.forEach((x: ReferenceRoom) => {
					referDataRes.push(x)
				})
			)

			setReferentData(referDataRes as ReferenceRoom[])
		}
	})

	const bookmarkExecute = useMutation({
		mutationFn: updateBookmark,
		onSuccess: async () => {
			await refetch()
			await queryClient.invalidateQueries({ queryKey: ['referent-room-detail', id] })
		}
	})
	return (
		<Stack direction={'column'} gap={2}>
			<SearchInput
				fullWidth
				placeholder="Search"
				onChange={(e) => {
					setKeyword(e.target.value)
				}}
				value={keyword}
				onRemove={() => {
					setKeyword('')
				}}
				onSearch={searchBlogs}
			/>
			{mdUp ? (
				<SideListTabs
					value={categoryValue}
					onChange={handleChange}
					variant="scrollable"
					scrollButtons
					allowScrollButtonsMobile
				>
					{referentCategory?.map((i) => (
						<SideListTabItem value={i.id} label={i.name} key={i.id} />
					))}
				</SideListTabs>
			) : (
				<FilledTabStack
					sx={{
						top: spaceOfCategory,
						position: 'sticky',
						zIndex: 5
					}}
					value={categoryValue}
					onChange={handleChange}
					variant="scrollable"
					scrollButtons={false}
				>
					{referentCategory?.map((i) => (
						<FillTabItem value={i.id} label={i.name} key={i.id} />
					))}
				</FilledTabStack>
			)}
			{referentData.length === 0 && !isLoading && !isFetchingNextPage ? (
				<Box width={'100%'}>
					<Typography cate="body_3" textAlign={'center'} color={theme.palette.main.gray30} mt={15}>
						{keyword === '' && categoryValue !== 0
							? '등록된 콘텐츠가 없습니다.'
							: '검색 결과가 없습니다. 확인 후 다시 시도해주세요.'}
					</Typography>
				</Box>
			) : (
				<Box>
					<Grid container spacing={3}>
						{referentData.map((i: ReferenceRoom) => {
							return (
								<Grid item xs={6} key={i.id}>
									<SideCardReferent
										item={i}
										onBookmark={() => {
											bookmarkExecute.mutate({ id: i.id || 0, type: BOOKMARK_TYPE.REFERENCE_ROOM })
										}}
									/>
								</Grid>
							)
						})}
					</Grid>
					{hasNextPage && (
						<ObserverBox
							haveNextPage={hasNextPage}
							fetchNext={() => fetchNextPage()}
							showLoading={isFetchingNextPage}
						/>
					)}
				</Box>
			)}
		</Stack>
	)
}

export default SideListReferent
