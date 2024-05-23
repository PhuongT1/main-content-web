import { userAtom } from '@/atoms/user'
import { PrimaryButton, PrimaryTextarea, ResponsiveBox, Typography } from '@/elements'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { IComment } from '@/types/comments.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { ChangeEvent, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { CommentItem } from './CommentItem'
import { RoundedButton } from '@/elements/v2/button'
import ChevronDownIcon from '@/assets/icons/chevrons/chevron-down'
import { createComment, getCommentsList } from '@/actions/apis/comment.action'

type CommentSectionProps = {
	id: number
	totalComment: number
}

export const CommentSection = ({ id, totalComment }: CommentSectionProps) => {
	const mdUp = useMediaQuery('(min-width: 768px)')
	const [commentValue, setCommentValue] = useState<string>('')
	const [commentData, setCommentData] = useState<IComment[]>([])
	const user = useRecoilValue(userAtom)
	const theme = useTheme()
	
	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch: refetchComments,
		isFetching
	} = useInfiniteScroll({
		key: `startup-talk-comment-list-${id}`,
		depend: [id],
		initialPageParam: {
			page: 1,
			id
		},
		fn: (pageParam: any) =>
			getCommentsList({
				page: pageParam.page,
				limit: 10,
				startupTalkId: pageParam.id
			}),
		onSuccess(data) {
			const page = data.pages as any[]
			let commentsDataRes: IComment[] = []
			
			page?.forEach((page: any) =>
				page?.data?.result?.forEach((x: IComment) => {
					commentsDataRes.push(x)
				})
			)
			setCommentData(commentsDataRes as IComment[])
		}
	})
	
	const sendCommentMutate = useMutation({
		mutationFn: createComment,
		onSuccess: async () => {
			await refetchComments()
			setCommentValue('')
		},
		onError: (error) => {
			enqueueSnackbar(error.message, {
				variant: 'error'
			})
		}
	})
	const submitComment = async () => {
		sendCommentMutate.mutate({ comment: commentValue, startupTalkId: id })
	}
	
	return (
		<Box display="flex" flexDirection={'column'} width={'100%'}>
			<Typography cate="title_40">답변하기</Typography>
			<Box sx={{ width: '100%', mt: 1, mb: 2 }}>
				<PrimaryTextarea
					maxRows={4.6}
					minRows={4.6}
					value={commentValue}
					maxLength={500}
					sx={{ width: '100%', boxShadow: 0 }}
					placeholder="파운더의 질문의 진심으로 답변해주세요. 감사합니다."
					onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
						setCommentValue(e.target.value)
					}}
				/>
			</Box>
			<Box display={'flex'} width="100%" justifyContent={'flex-end'}>
				<PrimaryButton
					sx={{
						width: mdUp ? convertToRem(132) : '100%',
						'&.Mui-disabled': {
							bgcolor: 'rgba(45, 104, 254, 0.10)'
						},
						border: 'none !important'
					}}
					disabled={!Boolean(commentValue.trim())}
					btnSize={'md'}
					onClick={submitComment}
				>
					<Typography
						cate="button_30"
						color={!Boolean(commentValue.trim()) ? theme.palette.main_grey.gray500 : theme.palette.main_grey.gray100}
					>
						등록하기
					</Typography>
				</PrimaryButton>
			</Box>
			<Box display={'flex'} width="100%" flexDirection={'column'} justifyContent={'flex-end'} mt={mdUp ? 6 : 4} gap={2}>
				<Typography cate="title_40">답변수 {totalComment}개</Typography>
				{commentData?.map((i: IComment) => (
					<CommentItem
						key={i.id}
						{...i}
						isOwn={Number(user?.id || -1) === Number(i.userId)}
						handleRefetch={refetchComments}
					/>
				))}
			</Box>
			{hasNextPage && (
				<ResponsiveBox height={36} width={124} mt={2} mb={1.5} mx={'auto'}>
					<RoundedButton
						fullHeight
						fullWidth
						sx={{ gap: 1 }}
						onClick={() => {
							fetchNextPage()
						}}
					>
						{isFetchingNextPage ? (
							<Box width={'100%'} display={'flex'} justifyContent={'center'}>
								<CircularProgress color="primary" />
							</Box>
						) : (
							<>
								<Typography cate="button_20" plainColor="main_grey.gray100">
									더보기
								</Typography>
								<ChevronDownIcon stroke={theme.palette.main_grey.gray100} />
							</>
						)}
					</RoundedButton>
				</ResponsiveBox>
			)}
		</Box>
	)
}
