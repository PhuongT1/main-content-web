import { GhostBorderButton, PrimaryButton, PrimaryTextarea, Typography } from '@/elements'
import { IUser } from '@/types/user.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { displayTimeDiff } from '@/utils/display-time-diff'
import { Avatar, Box, useMediaQuery, useTheme } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { ChangeEvent, useEffect, useState } from 'react'
import CommentActionMenu from './CommentActionMenu'
import { deleteComment, updateComment } from '@/actions/apis/comment.action'

type CommentItemProps = {
	user?: IUser
	comment?: string
	isOwn: boolean
	id?: number
	handleRefetch?: Function
	createdAt: string
	isReport: boolean
}

export const CommentItem = ({ user, comment, isOwn, id, handleRefetch, createdAt, isReport }: CommentItemProps) => {
	const mdUp = useMediaQuery('(min-width: 768px)')
	const theme = useTheme()
	const [commentValue, setCommentValue] = useState<string>()
	const [isEdit, setIsEdit] = useState<boolean>(false)
	
	useEffect(() => {
		setCommentValue(comment || '')
	}, [comment, isEdit])
	
	const updateCommentMutate = useMutation({
		mutationFn: async (params: { id: number, data: { comment: string, status: string } }) => await updateComment(
			params),
		onSuccess: () => {
			handleRefetch?.()
			setIsEdit(false)
		},
		onError: (error) => {
			enqueueSnackbar(error.message, {
				variant: 'error'
			})
		}
	})
	
	const deleteCommentMutate = useMutation({
		mutationFn: deleteComment
	})
	
	const submitEditComment = async () => {
		updateCommentMutate.mutate({
			id: id || 0,
			data: { comment: commentValue || '', status: 'ACTIVE' }
		})
	}
	
	const handleDeleteComment = async () => {
		const { data, error } = await deleteCommentMutate.mutateAsync(id || '')
		if (!error) {
			handleRefetch?.()
		} else {
			enqueueSnackbar(error.message, {
				variant: 'error'
			})
		}
	}
	return (
		<Box
			display="flex"
			flexDirection={'column'}
			width={'100%'}
			gap={2}
			sx={{
				p: 2,
				borderRadius: 2,
				backgroundColor: theme.palette.main_grey.gray800
			}}
		>
			<Box display="flex" justifyContent={'space-between'} alignItems={'center'}>
				<Box display="flex" gap={1} alignItems={'center'}>
					<Avatar
						sx={{ width: convertToRem(32), height: convertToRem(32) }}
						src={user?.avatar?.url ? user?.avatar?.url : '/images/blank-user.png'}
					/>
					<Typography cate="caption_20">{user?.nickname}</Typography>
				</Box>
				<Box display="flex" gap={2} alignItems={'center'}>
					<Typography cate="caption_20" plainColor="main_grey.gray200">
						{displayTimeDiff(createdAt)}
					</Typography>
					<CommentActionMenu
						isReport={isReport}
						refetch={handleRefetch}
						isOwn={isOwn}
						handleDelete={handleDeleteComment}
						handleEdit={() => {
							setIsEdit(true)
						}}
						commentId={id || -1}
					/>
				</Box>
			</Box>
			<Box>
				{isEdit ? (
					<PrimaryTextarea
						maxRows={8}
						minRows={8}
						sx={{ width: '100%' }}
						maxLength={500}
						onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
							setCommentValue(event.target.value)
						}}
						value={commentValue}
					/>
				) : (
					<Typography
						cate="body_30"
						color={theme.palette.main_grey.gray300}
						sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}
					>
						{comment}
					</Typography>
				)}
			</Box>
			{isEdit ? (
				<Box display={'flex'} width="100%" justifyContent={'flex-end'} gap={1}>
					<GhostBorderButton
						sx={{ width: mdUp ? convertToRem(132) : '100%' }}
						btnSize={'xs'}
						onClick={() => {
							setCommentValue(comment)
							setIsEdit(false)
						}}
					>
						<Typography cate="button_30">취소</Typography>
					</GhostBorderButton>
					<PrimaryButton
						sx={{ width: mdUp ? convertToRem(132) : '100%' }}
						disabled={comment === commentValue || !commentValue}
						btnSize={'xs'}
						onClick={submitEditComment}
					>
						<Typography cate="button_30">등록하기</Typography>
					</PrimaryButton>
				</Box>
			) : (
				<></>
			)}
		</Box>
	)
}
