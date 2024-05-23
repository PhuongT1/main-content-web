'use client'
import SharePopup from '@/app/(main-routes)/blogs/_components/share-popup'
import { ChevronLeftSmIcon } from '@/assets/icons'
import BookmarkUncheckIcon from '@/assets/icons/bookmark-uncheck'
import HeartSmIcon from '@/assets/icons/heart-sm'
import Link03 from '@/assets/icons/link-03'
import { loadingAtom } from '@/atoms/loading'
import { userAtom } from '@/atoms/user'
import { PageTitle } from '@/components'
import { SecondaryButton } from '@/elements'
import AlertPopup from '@/elements/alert-popup'
import Typography from '@/elements/typography'
import { RoundedButton } from '@/elements/v2/button'
import { deleteStartupTalkById, getStartupTalkById } from '@/services/startup-talk.service'
import { IStartupTalk } from '@/types/startup-talk.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { displayTimeDiff } from '@/utils/display-time-diff'
import { formatCurrency } from '@/utils/format-currency'
import getCurrentUrl from '@/utils/get-current-url'
import { Avatar, Box, Divider, Grid, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { CommentSection } from '../components/CommentSection'
import ContactPopup from '../components/ContactPopup'
import MainActionMenu from '../components/MainActionMenu'
import SideList from '../components/SideList'
import { StartupTalkInfo } from '../components/StartupTalkInfo'
import EditFormDialog from '../components/EditFormDialog'
import { SUB_CATEGORY } from '@/constants/common.constant'
import { useDialog } from '@/hooks/use-dialog'
import { updateBookmark } from '@/actions/apis/bookmark.action'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import { getCategories } from '@/actions/apis/category.action'
import { Category } from '@/types/types.type'

const StartupTalkDetail = ({ params: { id } }: { params: { id: string } }) => {
	const theme = useTheme()
	const setLoading = useSetRecoilState(loadingAtom)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined)
	const [showError, setShowError] = useState<boolean>(false)
	const [showShare, setShowShare] = useState<boolean>(false)
	const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
	const [openContact, setOpenContact] = useState<boolean>(false)
	const { open: editDialogOpen, onClose: onEditDialogClose, onOpen: onEditDialogOpen } = useDialog()
	const router = useRouter()
	const mdMatches = useMediaQuery(theme.breakpoints.down('md'))
	const user = useRecoilValue(userAtom)
	const onBack = async () => {
		router.back()
	}
	const { data: startupTalkCategories, status: startupTalkCategoriesStatus } = useQuery({
		queryKey: ['startup-talk-categories'],
		queryFn: () => getCategories({ subType: SUB_CATEGORY.STARTUP_TALK })
	})
	
	const onToggleContact = (status: boolean) => {
		setOpenContact(status)
	}
	
	const deleteTalkMutate = useMutation({
		mutationFn: deleteStartupTalkById
	})
	
	const xlUp = useMediaQuery('(min-width: 1200px)')
	const xxlUp = useMediaQuery('(min-width: 1440px)')
	const {
		data: responseDetail,
		isLoading,
		refetch
	} = useQuery<{ data: IStartupTalk }, Error>({
		queryKey: ['startup-talk-detail', id as string],
		queryFn: () => getStartupTalkById(id || ''),
		retry: false,
		enabled: true
	})
	
	const handleBookmark = async (id: number | string) => {
		const { data, error } = await updateBookmark({
			id: Number(id),
			type: BOOKMARK_TYPE.STARTUP_TALK
		})
		if (!error) {
			await refetch()
		}
	}
	
	const handleDelete = async (id: number) => {
		const { data, error } = await deleteTalkMutate.mutateAsync(id)
		if (!error) {
			router.back()
		}
	}
	
	useEffect(() => {
		if ((
			!responseDetail || !responseDetail.data
		) && !isLoading) {
			router.push('/community/startup-talks')
		}
	}, [responseDetail])
	
	useEffect(() => {
		if (startupTalkCategoriesStatus === 'success') {
			setCategories([
				...startupTalkCategories?.data.map((i: Category) => (
					{ ...i, id: i.id + '' }
				))
			])
		}
	}, [startupTalkCategories])
	
	return (
		<>
			<PageTitle>스타트업 토크</PageTitle>
			{!mdMatches && (
				<Box mt={6}>
					<SecondaryButton btnSize="sm" action={onBack} sx={{ borderRadius: '99px !important', width: 121 }}>
						<ChevronLeftSmIcon
							pathProps={{
								stroke: theme.palette.main_grey.gray200
							}}
						/>
						<Typography plainColor="main_grey.gray200" cate="button_20">
							이전으로
						</Typography>
					</SecondaryButton>
				</Box>
			)}
			{!mdMatches && <Divider sx={{ bgcolor: 'main_grey.gray700', my: 6 }} />}
			<Grid container columnSpacing={{ md: 6, xs: 0 }} rowSpacing={{ md: 0, xs: 3 }}>
				<Grid item xs={12} xl={xxlUp ? 8.2 : 7.8}>
					<Box pb={mdMatches ? 0 : 2.5} display={'flex'} flexDirection={'column'}>
						<Typography cate="body_30" color={theme.palette.main.point}>
							{responseDetail?.data?.category?.name}
						</Typography>
						<Stack direction={'row'} display={'flex'} alignItems={'center'} mt={1}>
							<Avatar
								sx={{
									width: '2rem',
									height: '2rem'
								}}
								src={
									responseDetail?.data?.user?.avatar?.url
										? responseDetail?.data?.user?.avatar?.url
										: '/images/blank-user.png'
								}
							/>
							<Typography cate="body_20" ml={true ? 1 : 0}>
								{responseDetail?.data?.user.nickname}
							</Typography>
						</Stack>
						<Typography
							cate="title_60"
							sx={{
								marginTop: convertToRem(8),
								marginBottom: convertToRem(16)
							}}
						>
							{responseDetail?.data?.title}
						</Typography>
						<Stack
							direction={'row'}
							sx={{
								justifyContent: 'space-between',
								alignItems: 'center',
								borderBottom: '1px solid ' + theme.palette.main_grey.gray700
							}}
							pb={3}
						>
							<Stack direction={'row'} alignItems={'center'}>
								<HeartSmIcon stroke={theme.palette.main.white} />
								<Typography cate="caption_10" color={theme.palette.main.white} ml={1}>
									{formatCurrency(responseDetail?.data?.totalView)} ·{' '}
									{displayTimeDiff(responseDetail?.data?.createdAt.toString() || '')}
								</Typography>
							</Stack>
							<Stack direction={'row'} alignItems={'center'} gap={1}>
								<RoundedButton
									btnSize="sm"
									onClick={() => {
										setShowShare(true)
									}}
									sx={{
										width: 'auto',
										paddingY: 0,
										gap: convertToRem(mdMatches ? 8 : 12),
										height: convertToRem(mdMatches ? 33 : 44)
									}}
								>
									<Link03 />
									<Typography cate={mdMatches ? 'caption_10' : 'button_20'} color={theme.palette.main.white}>
										공유
									</Typography>
								</RoundedButton>
								<RoundedButton
									btnSize="sm"
									sx={{
										width: 'auto',
										paddingY: 0,
										gap: convertToRem(mdMatches ? 8 : 12),
										height: convertToRem(mdMatches ? 33 : 44)
									}}
									onClick={() => {
										handleBookmark(id)
									}}
								>
									{!responseDetail?.data?.isBookmark ? (
										<BookmarkUncheckIcon />
									) : (
										<BookmarkUncheckIcon
											pathProps={{
												stroke: '#2D68FE',
												fill: '#2D68FE'
											}}
										/>
									)}
									<Typography cate={mdMatches ? 'caption_10' : 'button_20'} color={theme.palette.main.white}>
										북마크
									</Typography>
								</RoundedButton>
								<MainActionMenu
									isOwn={user?.id === responseDetail?.data?.userId}
									handleDelete={async () => {
										await handleDelete(Number(id))
									}}
									handleEdit={() => {
										onEditDialogOpen()
									}}
									isReport={responseDetail?.data?.isReport || false}
									refetch={refetch}
									commentId={Number(id) || -1}
								/>
							</Stack>
						</Stack>
						<Box width="100%">
							<StartupTalkInfo content={responseDetail?.data?.content || ''} />
						</Box>
						<Divider
							sx={{
								borderBottom: '1px solid ' + theme.palette.main_grey.gray700,
								marginTop: mdMatches ? 3 : 6,
								marginBottom: mdMatches ? 4 : 6
							}}
						/>
						<CommentSection id={Number(id) || 0} totalComment={responseDetail?.data?.totalComment || 0} />
					</Box>
				</Grid>
				<Grid item xs={12} xl={xxlUp ? 3.8 : 4.2}>
					<SideList id={id} />
				</Grid>
			</Grid>
			<ContactPopup
				open={openContact}
				startupData={responseDetail?.data as IStartupTalk}
				onCancel={() => {
					onToggleContact(false)
				}}
				id={id as string}
			/>
			<SharePopup open={showShare} onCancel={() => setShowShare(false)} url={getCurrentUrl()} />
			<AlertPopup
				onSubmit={async () => {
					setShowError(false)
					setErrorMessage('')
					setErrorTitle(undefined)
				}}
				submitTitle={errorTitle ? '모든기기 로그아웃' : '확인'}
				cancelTitle={errorTitle ? '취소' : undefined}
				onCancel={
					errorTitle
						? () => {
							setShowError(false)
							setErrorMessage('')
							setErrorTitle(undefined)
						}
						: undefined
				}
				title={errorTitle}
				description={errorMessage}
				open={showError}
			/>
			<EditFormDialog
				categories={categories}
				open={editDialogOpen}
				item={responseDetail?.data}
				onClose={() => {
					onEditDialogClose()
				}}
				onSuccess={() => {
					onEditDialogClose()
					refetch()
				}}
			/>
		</>
	)
}

export default StartupTalkDetail
