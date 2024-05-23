import { ObserverBox } from '@/components'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { IComment } from '@/types/comments.type'
import { Box, CircularProgress, Stack } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import CommentBlock from './CommentBlock'
import CommentInput from './CommentInput'
import { createComment, getCommentsList } from '@/actions/apis/comment.action'

const CommentSection = ({ id }: { id: string | number }) => {
	const [commentData, setCommentData] = useState<IComment[]>([])
	const queryClient = useQueryClient()
	
	const { fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isFetching } = useInfiniteScroll({
		key: 'comments-list',
		depend: [id],
		initialPageParam: {
			page: 1,
			id
		},
		fn: (pageParam) =>
			getCommentsList({
				page: pageParam.page,
				limit: 10,
				contentBlogId: pageParam.id
			}),
		meta: {
			offLoading: true
		},
		onSuccess(data) {
			const page = data.pages
			let commentsDataRes: IComment[] = []
			
			if (page.length > 0) {
				page.forEach((page: any) =>
					page.data?.result?.forEach((x: IComment) => {
						commentsDataRes.push(x)
					})
				)
			}
			
			setCommentData(commentsDataRes as IComment[])
		}
	})
	
	const commentMutation = useMutation({
		mutationKey: ['create-comment'],
		mutationFn: (comment: string) =>
			createComment({
				comment,
				contentBlogId: Number(id)
			}),
		meta: {
			offLoading: true
		},
		onSuccess: async () => {
			await refetch()
			await queryClient.invalidateQueries({ queryKey: ['blog-detail', id] })
		},
		onError: (error) => {
			enqueueSnackbar(error.message, {
				variant: 'error'
			})
		}
	})
	
	return (
		<Box display="flex" flexDirection="column" my={2} width={'100%'}>
			<CommentInput placeholder="댓글추가..." handleComment={commentMutation.mutate} />
			{commentData.length > 0 ? (
				commentData.map((val: IComment) => {
					return <CommentBlock key={val.id} item={val} />
				})
			) : (
				<Stack width={'100%'} justifyContent={'center'} alignItems={'center'}>
					<CircularProgress color="primary" />
				</Stack>
			)}
			{hasNextPage ? (
				<ObserverBox fetchNext={() => fetchNextPage()} haveNextPage={hasNextPage} showLoading={isFetchingNextPage} />
			) : null}
		</Box>
	)
}

export default CommentSection
