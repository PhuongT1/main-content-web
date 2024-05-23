import AnswerMenuIcon from '@/assets/icons/comment-menu'
import EditIcon from '@/assets/icons/edit'
import ReportIcon from '@/assets/icons/report'
import TrashIcon from '@/assets/icons/trash'
import Typography from '@/elements/typography'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, IconButton, SwipeableDrawer, useMediaQuery, useTheme } from '@mui/material'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { alpha, styled } from '@mui/material/styles'
import * as React from 'react'
import { useState } from 'react'
import ReportPopup from './ReportPopup'
import { TrashAlert } from '@/components/dialog'
import { useMutation } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { reportComment } from '@/actions/apis/comment.action'

const StyledMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right'
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right'
		}}
		{...props}
	/>
))(({ theme }) => (
	{
		'& .MuiPaper-root': {
			borderRadius: 6,
			backgroundColor: theme.palette.main_grey.gray900,
			marginTop: theme.spacing(1),
			width: 'auto',
			padding: '0.75rem 0',
			color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
			boxShadow:
				'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
			'& .MuiMenu-list': {
				padding: '4px 0'
			},
			'& .MuiMenuItem-root': {
				'& .MuiSvgIcon-root': {
					fontSize: 18,
					color: theme.palette.text.secondary,
					marginRight: theme.spacing(1.5)
				},
				'&:active': {
					backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
				}
			}
		}
	}
))

const StyledBox = styled(Box)(({ theme }) => (
	{
		backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.main_grey.gray800
	}
))

const Puller = styled(Box)(({ theme }) => (
	{
		width: 32,
		height: 4,
		backgroundColor: theme.palette.mode === 'light' ? theme.palette.main_grey.gray900 : theme.palette.main_grey.gray300,
		borderRadius: 3,
		position: 'absolute',
		top: 8,
		left: 'calc(50% - 15px)'
	}
))

const StyledBottomDrawer = styled(SwipeableDrawer)(({ theme }) => (
	{
		'& .MuiPaper-root': {
			height: 'auto',
			margin: 8,
			borderRadius: 16,
			backgroundColor: theme.palette.main.gray70
		}
	}
))

type CommentActionMenuProps = {
	isOwn: boolean
	handleDelete: any
	commentId: number
	handleEdit: any
	isReport: boolean
	refetch: any
}
export default function CommentActionMenu({
	isOwn,
	handleDelete,
	commentId,
	handleEdit,
	isReport,
	refetch
}: CommentActionMenuProps) {
	const theme = useTheme()
	const mdDown = useMediaQuery(`(max-width: 768px)`)
	const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)
	
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const [bottomMenuOpen, setBottomMenuOpen] = React.useState<boolean>(false)
	const [showError, setShowError] = useState<boolean>(false)
	const [reportOpen, setReportOpen] = useState<boolean>(false)
	
	const removeReportMutation = useMutation({
		mutationKey: ['remove-report-mutate'],
		mutationFn: async () => {
			const body = {
				type: 'COMMENT',
				commentId: commentId,
				category: [1]
			}
			
			const { data, error } = await reportComment(body)
			
			if (error) throw error
			
			return data
		},
		onSuccess: async () => {
			refetch?.()
		},
		onError: () => {
			enqueueSnackbar('신고 접수가 취소되었습니다.', { variant: 'error' })
		}
	})
	
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation()
		if (mdDown) {
			setBottomMenuOpen(true)
		} else {
			setAnchorEl(event.currentTarget)
		}
	}
	const handleClose = (event: any) => {
		event.stopPropagation()
		setAnchorEl(null)
	}
	
	const handleCloseBottomMenu = (event: any) => {
		event.stopPropagation()
		setBottomMenuOpen(false)
	}
	
	return (
		<Box>
			<IconButton
				id="demo-customized-button"
				aria-controls={open ? 'demo-customized-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				sx={{
					background: theme.palette.main_grey.gray700,
					width: convertToRem(30),
					height: convertToRem(30),
					padding: 0
				}}
				onClick={handleClick}
			>
				<AnswerMenuIcon />
			</IconButton>
			<StyledMenu
				MenuListProps={{
					'aria-labelledby': 'demo-customized-button'
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				{isOwn && (
					<>
						<MenuItem
							onClick={(event: any) => {
								handleClose(event)
								handleEdit()
							}}
							disableRipple
						>
							<EditIcon stroke={theme.palette.main_grey.gray100} />
							<Typography cate="caption_1" ml={2}>
								수정하기
							</Typography>
						</MenuItem>
						<MenuItem
							onClick={(event: any) => {
								handleClose(event)
								setShowError(true)
							}}
							disableRipple
						>
							<TrashIcon />
							<Typography cate="caption_1" ml={2}>
								삭제하기
							</Typography>
						</MenuItem>
					</>
				)}
				{!isOwn && (
					<MenuItem
						onClick={(event: any) => {
							if (isReport) {
								handleClose(event)
								removeReportMutation.mutate()
							} else {
								handleClose(event)
								setReportOpen(true)
							}
						}}
						disableRipple
					>
						<ReportIcon />
						<Typography cate="caption_1" ml={2}>
							{isReport ? '신고취소' : '신고하기'}
						</Typography>
					</MenuItem>
				)}
			</StyledMenu>
			<StyledBottomDrawer
				anchor="bottom"
				open={bottomMenuOpen}
				onClose={handleCloseBottomMenu}
				onOpen={handleCloseBottomMenu}
				disableSwipeToOpen
				ModalProps={{
					keepMounted: true
				}}
			>
				<StyledBox
					sx={{
						height: convertToRem(16),
						position: 'relative'
					}}
				>
					<Puller />
				</StyledBox>
				<StyledBox
					sx={{
						px: 3,
						pb: 1,
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center'
					}}
				>
					{!isOwn && (
						<MenuItem
							onClick={(event: any) => {
								if (isReport) {
									handleCloseBottomMenu(event)
									removeReportMutation.mutate()
								} else {
									handleCloseBottomMenu(event)
									setReportOpen(true)
								}
							}}
							disableRipple
						>
							<Box
								p={1}
								borderRadius={convertToRem(250)}
								sx={{
									backgroundColor: theme.palette.main.gray50,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								<ReportIcon />
							</Box>
							<Typography cate="body_2" ml={2}>
								{isReport ? '신고취소' : '신고하기'}
							</Typography>
						</MenuItem>
					)}
					{isOwn && (
						<>
							<MenuItem
								onClick={(event: any) => {
									handleCloseBottomMenu(event)
									handleEdit()
								}}
								disableRipple
							>
								<Box
									p={1}
									borderRadius={convertToRem(250)}
									sx={{
										backgroundColor: theme.palette.main.gray50,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}
								>
									<EditIcon stroke={theme.palette.main_grey.gray100} />
								</Box>
								<Typography cate="body_2" ml={2}>
									수정하기
								</Typography>
							</MenuItem>
							<MenuItem
								onClick={(event: any) => {
									handleCloseBottomMenu(event)
									setShowError(true)
								}}
								disableRipple
							>
								<Box
									p={1}
									borderRadius={convertToRem(250)}
									sx={{
										backgroundColor: theme.palette.main.gray50,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}
								>
									<TrashIcon />
								</Box>
								<Typography cate="body_2" ml={2}>
									삭제하기
								</Typography>
							</MenuItem>
						</>
					)}
				</StyledBox>
			</StyledBottomDrawer>
			<ReportPopup
				open={reportOpen}
				commentId={commentId}
				onClose={() => {
					refetch()
					setReportOpen(false)
				}}
				onCancel={() => {
					refetch()
					setReportOpen(false)
				}}
			/>
			<TrashAlert
				onSubmit={async (event: any) => {
					event.stopPropagation()
					setShowError(false)
					handleDelete()
				}}
				submitTxt={'확인'}
				cancelTxt={'취소'}
				title="정말 답변을 삭제하시겠습니까?"
				onCancel={(event: any) => {
					event.stopPropagation()
					setShowError(false)
				}}
				open={showError}
			/>
		</Box>
	)
}
