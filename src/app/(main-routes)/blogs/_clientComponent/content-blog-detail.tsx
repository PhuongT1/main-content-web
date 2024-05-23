'use client'
import { ChevronLeftSmIcon } from '@/assets/icons'
import BookmarkUncheckIcon from '@/assets/icons/bookmark-uncheck'
import DownloadCircleIcon from '@/assets/icons/download-circle'
import HeartSmIcon from '@/assets/icons/heart-sm'
import Link03 from '@/assets/icons/link-03'
import { sidebarOpenAtom } from '@/atoms/sidebar-open'
import { Divider, ResponsiveBox } from '@/elements'
import AlertPopup from '@/elements/alert-popup'
import Typography from '@/elements/typography'
import { GhostButton, RoundedButton, SecondaryButton } from '@/elements/v2/button'
import { IBlog } from '@/types/blog.type'
import { BLOG_TYPE } from '@/utils/constants'
import { convertToRem } from '@/utils/convert-to-rem'
import { displayTimeDiff } from '@/utils/display-time-diff'
import { formatCurrency } from '@/utils/format-currency'
import getURL from '@/utils/get-url'
import { getYoutubeId } from '@/utils/get-youtube-id'
import { Avatar, Box, Grid, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useRecoilValue } from 'recoil'
import { BlogInfo } from '../_components/BlogInfo'
import CourseCarousel from '../_components/CourseCarousel'
import SideList from '../_components/SideList'
import CommentSection from '../_components/comment-section'
import SharePopup from '../_components/share-popup'
import { getBlogDetail } from '@/actions/apis/blogs.action'
import { updateBookmark } from '@/actions/apis/bookmark.action'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'
import { downloadCardNews } from '@/services/download.service'

interface NotificationType {
	email: boolean
	sms: boolean
}

export const ASPECT_RATIO = 5.33 / 3

const ContentBlogDetail = ({ id }: { id: string }) => {
	const theme = useTheme()
	const ref = useRef<HTMLElement | null>(null)
	
	const [spaceOfCategory, setSpaceOfCategory] = useState(0)
	const [pageKey, setPageKey] = useState<number>(0)
	// const breadcrumbData = [{ name: '콘텐츠 블로그' }]
	const pathName = usePathname()
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined)
	const [showError, setShowError] = useState<boolean>(false)
	const [showShare, setShowShare] = useState<boolean>(false)
	
	const contentWrapperRef = useRef<any>()
	
	const xxxlUp = useMediaQuery('(min-width: 1920px)')
	const xxlUp = useMediaQuery('(min-width: 1440px)')
	const xlUp = useMediaQuery('(min-width: 1200px)')
	const lgUp = useMediaQuery('(min-width: 992px)')
	const mdDown = useMediaQuery(`(max-width: 768px)`)
	
	const sidebarOpen = useRecoilValue(sidebarOpenAtom)
	
	const [layoutMode, setLayoutMode] = useState<'dark' | 'light'>('dark')
	const [contentHeight, setContentHeight] = useState(0)
	const [contentWidth, setContentWidth] = useState(xxxlUp ? 968 : xxlUp ? 768 : xlUp ? 576 : 448)
	const router = useRouter()
	const query = useSearchParams()
	const [value, setValue] = useState(0)
	const [isDescriptionMode, setIsDescriptionMode] = useState<boolean>(true)
	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}
	
	useEffect(() => {
		if (sidebarOpen) {
			setContentWidth(xxxlUp ? 968 : xxlUp ? 768 : xlUp ? 576 : 448)
		} else {
			setContentWidth(contentWidth + 120)
		}
	}, [sidebarOpen])
	
	useEffect(() => {
		setContentHeight(contentWidth * ASPECT_RATIO)
	}, [contentWidth])
	
	const {
		data: responseDetail,
		isFetching,
		refetch
	} = useQuery<{ data: IBlog }, Error>({
		queryKey: ['blog-detail', Number(id)],
		queryFn: () => getBlogDetail(id || '')
	})
	
	useEffect(() => {
		if (id) {
			setIsDescriptionMode(true)
		}
	}, [id])
	
	const bookmarkExecute = useMutation({
		mutationFn: updateBookmark,
		onSuccess: async () => {
			await refetch()
		}
	})
	
	const handleBookmark = () => {
		bookmarkExecute.mutate({
			id: responseDetail?.data?.id || 0,
			type: BOOKMARK_TYPE.CONTENT_BLOG
		})
	}
	
	const handleDownload = async () => {
		await downloadCardNews(responseDetail?.data?.id || 0)
	}
	
	useEffect(() => {
		if ((
			!responseDetail || !responseDetail.data
		) && !isFetching) {
			router.push('/blogs')
		}
	}, [responseDetail])
	
	useEffect(() => {
		if (ref.current && !isFetching) {
			setSpaceOfCategory((
				ref.current.clientHeight || 0
			) + 64 || 0)
		}
	}, [isFetching, ref])
	
	return (
		<>
			{/* <Breadcrumbs data={breadcrumbData} /> */}
			{!mdDown ? (
				<>
					<Box mt={6}>
						<SecondaryButton
							btnSize="xs-np"
							action={() => {
								router.back()
							}}
							sx={{ borderRadius: '99px !important', width: 121, gap: 1 }}
						>
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
					<Divider sx={{ bgcolor: 'main_grey.gray700', borderColor: 'main_grey.gray700', my: 6 }} />
				</>
			) : null}
			{mdDown ? (
				<Grid container columnSpacing={{ md: 6, xs: 0 }} rowSpacing={{ md: 0, xs: 6 }} marginX={0}>
					<Grid item xs={12} xl={xxlUp ? 8.2 : 7.8} padding={'0 !important'}>
						<ResponsiveBox breakpoints={{ md: { position: 'sticky', top: 64, zIndex: 5 } }}>
							{
								responseDetail && responseDetail.data ?
									<Box ref={ref}>
										{responseDetail.data.type === BLOG_TYPE.VIDEO ? (
											<YouTube
												onReady={(e) => {
													setSpaceOfCategory(e.target.playerInfo.size.height + 55 || 0)
												}}
												videoId={getYoutubeId(responseDetail.data.url || '') as string}
												style={{
													aspectRatio: ASPECT_RATIO
												}}
												opts={{
													width: '100%',
													height: '100%',
													playerVars: {
														autoplay: 1
													}
												}}
											/>
										) : (
											<CourseCarousel
												setSpaceOfCategory={setSpaceOfCategory}
												item={responseDetail?.data} />
										)}
									</Box> : null
							}
						</ResponsiveBox>
						<Box
							px={2.5}
							display={'flex'}
							flexDirection={'column'}
							sx={{
								marginTop: { xs: convertToRem(120), md: convertToRem(48) }
							}}
						>
							<Typography cate={'body_30'} breakpoints={{ md: 'body_20' }}
							            color={theme.palette.main.point} mb={1}>
								{responseDetail?.data?.category?.name}
							</Typography>
							<Stack direction={'row'} display={'flex'} alignItems={'center'}>
								{!!responseDetail?.data?.instructorThumbnail?.url ? (
									<Avatar
										sx={{
											width: '2rem',
											height: '2rem'
										}}
										src={
											!!responseDetail?.data?.instructorThumbnail?.url
												? responseDetail?.data?.instructorThumbnail?.url
												: '/images/blank-user.png'
										}
									/>
								) : (
									<></>
								)}
								{!!responseDetail?.data?.instructorName ? (
									<Typography cate="body_20"
									            ml={!!responseDetail?.data?.instructorThumbnail?.url ? 1 : 0}>
										{responseDetail?.data?.instructorName}
									</Typography>
								) : (
									<></>
								)}
							</Stack>
							<Typography
								cate="title_60"
								breakpoints={{ md: 'sub_title_40' }}
								sx={{
									marginTop: convertToRem(8)
								}}
							>
								{responseDetail?.data?.title}
							</Typography>
							<Stack
								direction={{ xs: 'column', md: 'row' }}
								sx={{
									justifyContent: { xs: 'flex-start', md: 'space-between' },
									alignItems: { xs: 'flex-start', md: 'center' },
									borderBottom: '1px solid ' + theme.palette.main_grey.gray600
								}}
								mt={{ md: 2, xs: 3 }}
								pb={{ md: 2, xs: 3 }}
							>
								<Stack direction={'row'} alignItems={'center'} mb={{ xs: 2, md: 0 }}>
									<HeartSmIcon stroke={theme.palette.main.white} />
									{responseDetail?.data && (
										<Typography cate="caption_2" color={theme.palette.main.white} ml={1} mr={3}>
											{formatCurrency(responseDetail.data.totalView)} ·
											{displayTimeDiff(responseDetail.data.createdAt || '')}
										</Typography>
									)}
								</Stack>
								<Stack direction={'row'} justifyContent={'flex-end'} alignItems={'center'} gap={1}
								       width={'100%'}>
									<RoundedButton
										btnSize="sm"
										onClick={() => {
											setShowShare(true)
										}}
										sx={{
											width: convertToRem(97)
										}}
									>
										<Link03 />
										<Typography cate="button_20" color={theme.palette.main.white}>
											공유
										</Typography>
									</RoundedButton>
									{responseDetail?.data?.type === BLOG_TYPE.CARD_NEWS && (
										<RoundedButton
											btnSize="sm"
											onClick={handleDownload}
											sx={{
												width: convertToRem(121)
											}}
										>
											<DownloadCircleIcon />
											<Typography cate="button_20" color={theme.palette.main.white}>
												다운로드
											</Typography>
										</RoundedButton>
									)}
									<RoundedButton
										btnSize="sm"
										sx={{
											width: convertToRem(110)
										}}
										onClick={handleBookmark}
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
										<Typography cate="button_20" color={theme.palette.main.white}>
											북마크
										</Typography>
									</RoundedButton>
								</Stack>
							</Stack>
							<Box pt={4}>
								<Stack direction={'row'} alignItems={'center'} mb={4} gap={4}>
									<GhostButton
										btnSize="md-np"
										onClick={() => {
											setIsDescriptionMode(true)
										}}
										sx={{
											width: convertToRem(78),
											borderRadius: 0 + ' !important',
											borderBottom: '3px solid ' + (
												isDescriptionMode ? theme.palette.main.blue : 'transparent'
											)
										}}
									>
										<Typography
											cate={`sub_title_30`}
											color={!isDescriptionMode ? theme.palette.main_grey.gray500 : theme.palette.main_grey.gray100}
										>
											콘텐츠 소개
										</Typography>
									</GhostButton>
									<GhostButton
										onClick={() => {
											setIsDescriptionMode(false)
										}}
										btnSize="md-np"
										sx={{
											width: convertToRem(44),
											borderRadius: 0 + ' !important',
											borderBottom: '3px solid ' + (
												!isDescriptionMode ? theme.palette.main.blue : 'transparent'
											)
										}}
									>
										<Typography
											cate={`sub_title_30`}
											color={isDescriptionMode ? theme.palette.main_grey.gray500 : theme.palette.main_grey.gray100}
										>
											댓글 {responseDetail?.data?.totalComment}
										</Typography>
									</GhostButton>
								</Stack>
								<Box width="100%">
									{isDescriptionMode ? (
										<BlogInfo
											content={responseDetail?.data?.content || ''}
											tags={responseDetail?.data?.hashtags || []}
										/>
									) : (
										<CommentSection id={id} />
									)}
								</Box>
							</Box>
						</Box>
						<Grid sx={{ maxWidth: '100% !important' }} item xl={xxlUp ? 3.8 : 4.2} xs={12}>
							<SideList
								spaceOfCategory={spaceOfCategory}
								blogType={responseDetail?.data?.type || BLOG_TYPE.CARD_NEWS}
								id={responseDetail?.data?.id || 0}
							/>
						</Grid>
					</Grid>
				</Grid>
			) : (
				<Grid container columnSpacing={{ md: 6, xs: 0 }} rowSpacing={{ md: 0, xs: 6 }}>
					<Grid item xs={12} xl={xxlUp ? 8.2 : 7.8}>
						<ResponsiveBox breakpoints={{ md: { position: 'sticky', top: 64, zIndex: 5 } }}>
							<Box
								ref={ref}
								sx={{
									'& .ytp-mobile-a11y-hidden-seek-button': {
										display: 'none'
									}
								}}
							>
								{responseDetail?.data?.type === BLOG_TYPE.VIDEO ? (
									<YouTube
										onReady={(e) => {
											setSpaceOfCategory(e.target.playerInfo.size.height + 55 || 0)
										}}
										videoId={getYoutubeId(responseDetail?.data?.url || '') as string}
										style={{
											aspectRatio: ASPECT_RATIO
										}}
										opts={{
											width: '100%',
											height: '100%',
											playerVars: {
												autoplay: 1
											}
										}}
									/>
								) : (
									<CourseCarousel setSpaceOfCategory={setSpaceOfCategory}
									                item={responseDetail?.data} />
								)}
							</Box>
						</ResponsiveBox>
						<Box pb={2.5} display={'flex'} flexDirection={'column'} mt={6}>
							<Typography cate="body_30" color={theme.palette.main.point}>
								{responseDetail?.data?.category?.name}
							</Typography>
							<Stack direction={'row'} display={'flex'} alignItems={'center'} mt={1}>
								{!!responseDetail?.data?.instructorThumbnail?.url ? (
									<Avatar
										sx={{
											width: '2rem',
											height: '2rem'
										}}
										src={
											!!responseDetail?.data?.instructorThumbnail?.url
												? responseDetail?.data?.instructorThumbnail?.url
												: '/images/blank-user.png'
										}
									/>
								) : (
									<></>
								)}
								{!!responseDetail?.data?.instructorName ? (
									<Typography cate="body_20"
									            ml={!!responseDetail?.data?.instructorThumbnail?.url ? 1 : 0}>
										{responseDetail?.data?.instructorName}
									</Typography>
								) : (
									<></>
								)}
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
									borderBottom: '1px solid ' + theme.palette.main_grey.gray600
								}}
								pb={3}
							>
								<Stack direction={'row'} alignItems={'center'}>
									<HeartSmIcon stroke={theme.palette.main.white} />
									{responseDetail?.data && (
										<Typography cate="caption_10" color={theme.palette.main.white} ml={1} mr={3}>
											{formatCurrency(responseDetail.data.totalView)} · {displayTimeDiff(responseDetail.data.createdAt)}
										</Typography>
									)}
								</Stack>
								<Stack direction={'row'} alignItems={'center'} gap={1}>
									<RoundedButton
										btnSize="sm"
										onClick={() => {
											setShowShare(true)
										}}
										sx={{
											width: convertToRem(97),
											height: convertToRem(44)
										}}
									>
										<Link03 />
										<Typography cate="button_20" color={theme.palette.main.white}>
											공유
										</Typography>
									</RoundedButton>
									{responseDetail?.data?.type === BLOG_TYPE.CARD_NEWS && (
										<RoundedButton
											btnSize="sm"
											onClick={handleDownload}
											sx={{
												width: convertToRem(121),
												height: convertToRem(44)
											}}
										>
											<DownloadCircleIcon />
											<Typography cate="button_20" color={theme.palette.main.white}>
												다운로드
											</Typography>
										</RoundedButton>
									)}
									<RoundedButton
										btnSize="sm"
										sx={{
											width: convertToRem(110),
											height: convertToRem(44)
										}}
										onClick={handleBookmark}
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
										<Typography cate="button_20" color={theme.palette.main.white}>
											북마크
										</Typography>
									</RoundedButton>
								</Stack>
							</Stack>
							<Box pt={5}>
								<Stack direction={'row'} alignItems={'center'} mb={5} gap={4}>
									<GhostButton
										btnSize="md-np"
										onClick={() => {
											setIsDescriptionMode(true)
										}}
										sx={{
											width: convertToRem(88),
											borderRadius: 0 + ' !important',
											borderBottom: '3px solid ' + (
												isDescriptionMode ? theme.palette.main.blue : 'transparent'
											)
										}}
									>
										<Typography
											cate={`sub_title_40`}
											color={!isDescriptionMode ? theme.palette.main_grey.gray500 : theme.palette.main_grey.gray100}
										>
											콘텐츠 소개
										</Typography>
									</GhostButton>
									<GhostButton
										onClick={() => {
											setIsDescriptionMode(false)
										}}
										btnSize="md-np"
										sx={{
											width: convertToRem(46),
											borderRadius: 0 + ' !important',
											borderBottom: '3px solid ' + (
												!isDescriptionMode ? theme.palette.main.blue : 'transparent'
											)
										}}
									>
										<Typography
											cate={`sub_title_40`}
											color={isDescriptionMode ? theme.palette.main_grey.gray500 : theme.palette.main_grey.gray100}
										>
											댓글 {responseDetail?.data?.totalComment}
										</Typography>
									</GhostButton>
								</Stack>
								<Box width="100%">
									{isDescriptionMode ? (
										<BlogInfo
											content={responseDetail?.data?.content || ''}
											tags={responseDetail?.data?.hashtags || []}
										/>
									) : (
										<CommentSection id={id} />
									)}
								</Box>
							</Box>
						</Box>
					</Grid>
					<Grid item xl={xxlUp ? 3.8 : 4.2} xs={12}>
						<SideList
							spaceOfCategory={spaceOfCategory}
							blogType={responseDetail?.data?.type || BLOG_TYPE.CARD_NEWS}
							id={responseDetail?.data?.id || 0}
						/>
					</Grid>
				</Grid>
			)}
			<SharePopup
				open={showShare}
				onCancel={() => setShowShare(false)}
				url={responseDetail?.data?.type === BLOG_TYPE.VIDEO ? responseDetail?.data.url : getURL(pathName)}
			/>
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
		</>
	)
}

export default ContentBlogDetail
