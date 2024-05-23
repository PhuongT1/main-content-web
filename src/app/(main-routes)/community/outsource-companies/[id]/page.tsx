'use client'
import SharePopup from '@/app/(main-routes)/blogs/_components/share-popup'
import { BookMarkIcon, ChevronLeftSmIcon, HeartIcon } from '@/assets/icons'
import Bookmark from '@/assets/icons/bookmark'
import BookmarkFilled from '@/assets/icons/bookmark-filled'
import LinkCommunity from '@/assets/icons/link-community'
import { userAtom } from '@/atoms/user'
import { PageTitle } from '@/components'
import { IconButton, SecondaryButton } from '@/elements'
import AlertPopup from '@/elements/alert-popup'
import Button from '@/elements/button'
import Typography from '@/elements/typography'
import { getOutsourceCompanyById } from '@/services/outsource-company.service'
import { getTextStyles } from '@/themes/get-design-tokens'
import { ICategory } from '@/types/category.type'
import { IOutsourceCompany } from '@/types/outsource-company.type'
import { IFile } from '@/types/user.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { formatCurrency } from '@/utils/format-currency'
import getCurrentUrl from '@/utils/get-current-url'
import { Box, Divider, Grid, GridProps, styled, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import FileCategory from '../../talents/components/FileCategory'
import UrlCategory from '../../talents/components/UrlCategory'
import ContactPopup from '../_components/ContactPopup'
import HorizontalImageList from '../_components/HorizontalImageList'
import { updateBookmark } from '@/actions/apis/bookmark.action'

const Section = styled(Grid)<GridProps>(({ theme }) => (
	{
		backgroundColor: theme.palette.main.gray80,
		padding: '1.5rem',
		borderRadius: '1rem',
		fieldset: {
			border: 0
		}
	}
))

const OutsourceCompanyDetail = ({ params: { id } }: { params: { id: string } }) => {
	const theme = useTheme()
	const mdMatches = useMediaQuery(theme.breakpoints.down('md'))
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [errorTitle, setErrorTitle] = useState<string | undefined>(undefined)
	const [showError, setShowError] = useState<boolean>(false)
	const [showShare, setShowShare] = useState<boolean>(false)
	const [openContact, setOpenContact] = useState<boolean>(false)
	const router = useRouter()
	const user = useRecoilValue(userAtom)
	const onBack = async () => {
		router.back()
	}
	const onToggleContact = (status: boolean) => {
		setOpenContact(status)
	}
	
	const xlUp = useMediaQuery('(min-width: 1200px)')
	const {
		data: responseDetail,
		isLoading,
		refetch
	} = useQuery<{ data: IOutsourceCompany }, Error>({
		queryKey: ['outsource-company-detail', id as string],
		queryFn: () => getOutsourceCompanyById(id || ''),
		retry: false,
		staleTime: 0,
		gcTime: 0,
		enabled: true
	})
	
	const handleBookmark = async (id: number | string) => {
		const { data, error } = await updateBookmark({
			id: Number(id),
			type: 'OUTSOURCING_COMPANY'
		})
		if (!error) {
			refetch()
		}
	}
	
	useEffect(() => {
		if ((
			!responseDetail || !responseDetail.data
		) && !isLoading) {
			// router.push('/community/talents')
		}
	}, [responseDetail])
	
	return (
		<>
			<PageTitle>공식 외주기업</PageTitle>
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
			<Grid
				container
				columnGap={2.5}
				my={4}
				sx={{ flexWrap: xlUp ? 'nowrap' : 'wrap' }}
				direction={xlUp ? 'row' : 'column-reverse'}
			>
				<Grid item md={12} xl={9.06} width={'100%'}>
					<Grid container rowGap={2}>
						{responseDetail?.data?.shortIntroduction && (
							<Section sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
								<Typography cate="title_50" mb={0}>
									{responseDetail?.data?.name}
								</Typography>
								<Typography
									cate="body_20"
									mb={0}
									color={theme.palette.main_grey.gray100}
									sx={{
										whiteSpace: 'pre-line'
									}}
								>
									{responseDetail?.data?.shortIntroduction || ''}
								</Typography>
							</Section>
						)}
						{responseDetail?.data?.introduction && (
							<Section sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
								<Typography cate="title_50" mb={0}>
									외주 기업소개
								</Typography>
								<Box
									sx={{
										// backgroundColor: theme.palette.main.gray10,
										maxHeight: convertToRem(510),
										overflow: 'auto',
										...getTextStyles(14, 150, 400, 0),
										color: theme.palette.main_grey.gray100,
										img: {
											maxWidth: '100%'
										}
									}}
									dangerouslySetInnerHTML={{ __html: responseDetail?.data?.introduction || '' }}
								></Box>
							</Section>
						)}
						{responseDetail?.data?.images && responseDetail?.data?.images?.length > 0 && (
							<Section
								sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', padding: 2, paddingRight: 0 }}
							>
								<HorizontalImageList data={responseDetail?.data?.images || []} />
							</Section>
						)}
						{(
							(
								responseDetail?.data?.attachments && responseDetail?.data?.attachments.length > 0
							) ||
							(
								responseDetail?.data?.urls && responseDetail?.data?.urls.length > 0
							)
						) && (
							<Section item xs={12}>
								<Typography cate="title_50" mb={2}>
									포트폴리오
								</Typography>
								{responseDetail?.data?.attachments && responseDetail?.data?.attachments.length > 0 ? (
									<Box display={'flex'} flexDirection={'column'} mb={2}>
										{/* {responseDetail?.data?.files?.map((i: any) => {
										 return ( */}
										<Typography cate="title_40" mb={2}>
											파일
										</Typography>
										<Box display={'flex'} flexDirection={'row'} gap={1} flexWrap={'wrap'}>
											{responseDetail?.data?.attachments?.map((item: IFile) => (
												<FileCategory key={item.id} item={item} />
											))}
											{/* )
											 })} */}
										</Box>
									</Box>
								) : (
									<></>
								)}
								{responseDetail?.data?.urls && responseDetail?.data?.urls.length > 0 ? (
									<Box display={'flex'} flexDirection={'column'} gap={2}>
										<Typography cate="title_40">URL</Typography>
										{responseDetail?.data?.urls?.map((i: any) => {
											return <UrlCategory key={i.id} item={i} />
										})}
									</Box>
								) : (
									<></>
								)}
							</Section>
						)}
					</Grid>
				</Grid>
				<Grid item md={12} xl={2.94} mb={xlUp ? 0 : 2}>
					<Section
						sx={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							gap: 2
						}}
					>
						<Box display="flex" width="100%" justifyContent="flex-start">
							<Image
								alt="imagesg"
								src={
									!!responseDetail?.data?.thumbnail?.url
										? responseDetail?.data?.thumbnail?.url
										: '/imagesages/blank-user.png'
								}
								width={120}
								height={120}
								style={{ borderRadius: '0.5rem' }}
							/>
						</Box>
						{/* <Avatar
						 sx={{ width: '10rem', height: '10rem' }}
						 src={
						 !!responseDetail?.data?.user?.avatar?.url
						 ? responseDetail?.data?.user?.avatar?.url
						 : '/images/blank-user.png'
						 }
						 /> */}
						<Box display={'flex'} alignItems="flex-start" flexDirection={'column'} gap={0.5}>
							<Typography
								cate="caption_20"
								color={theme.palette.sub.teal400}
								sx={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									width: '100%',
									display: '-webkit-box',
									WebkitLineClamp: '1',
									WebkitBoxOrient: 'vertical'
								}}
							>
								{responseDetail?.data?.categories?.map((i: ICategory) => i.name)
									?.join('/')}
							</Typography>
							<Typography cate="sub_title_30" color={theme.palette.main_grey.gray100}>
								{responseDetail?.data?.name}
							</Typography>
							<Typography
								cate="body_20"
								color={theme.palette.main_grey.gray300}
								sx={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									width: '100%',
									display: '-webkit-box',
									WebkitLineClamp: '2',
									WebkitBoxOrient: 'vertical'
								}}
							>
								{responseDetail?.data?.shortIntroduction}
							</Typography>
							<Box display={'flex'} gap={0.5} alignItems={'center'}>
								<HeartIcon
									svgProps={{ height: 16, width: 16 }}
									pathProps={{ stroke: theme.palette.main_grey.gray50 }}
								/>
								<Typography plainColor="main_grey.gray300" cate="caption_10" mr={0.5}>
									{formatCurrency(responseDetail?.data?.totalView)}
								</Typography>
								<BookMarkIcon pathProps={{ stroke: theme.palette.main_grey.gray50 }} />
								<Typography plainColor="main_grey.gray300" cate="caption_10">
									{formatCurrency(responseDetail?.data?.totalBookmark)}
								</Typography>
							</Box>
						</Box>
						<Box display={'flex'} flexDirection="column" alignItems="flex-start" width="100%" gap={0.5} mt={1}>
							<Typography cate="sub_title_30">{'홈페이지/SNS'}</Typography>
							<Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1}>
								{responseDetail?.data?.homePage && (
									<Box
										sx={{
											background: theme.palette.main_grey.gray700,
											borderRadius: 250,
											padding: '0.5rem 1rem'
										}}
									>
										<Typography cate="sub_title_10" color={theme.palette.main_grey.gray300}>
											{responseDetail?.data?.homePage}
										</Typography>
									</Box>
								)}
								{responseDetail?.data?.snsAddress && (
									<Box
										sx={{
											background: theme.palette.main_grey.gray700,
											borderRadius: 250,
											padding: '0.5rem 1rem'
										}}
									>
										<Typography cate="sub_title_10" color={theme.palette.main_grey.gray300}>
											{responseDetail?.data?.snsAddress}
										</Typography>
									</Box>
								)}
							</Box>
						</Box>
						{user?.id !== responseDetail?.data?.user?.id ? (
							<Box display={'flex'} alignItems={'center'} width={'100%'} gap={1}>
								<Button
									customType={'active'}
									cate={'primary'}
									title={'연락하기'}
									fullWidth
									onClick={() => {
										onToggleContact(true)
									}}
								/>
								<Button
									cate={'outlined'}
									onClick={() => {
										handleBookmark(id)
									}}
									sx={{ width: convertToRem(56), minWidth: convertToRem(56) }}
									customTitle={
										responseDetail?.data?.isBookmark ? (
											<BookmarkFilled />
										) : (
											<Bookmark stroke={theme.palette.main.white} />
										)
									}
								/>
							</Box>
						) : (
							<></>
						)}
						<Box width="100%" justifyContent={'center'} display="flex" mt={1}>
							<IconButton
								sx={{ borderRadius: 1 }}
								onClick={() => {
									setShowShare(true)
								}}
							>
								<LinkCommunity />
								<Typography color={theme.palette.main_grey.gray300}>공유하기</Typography>
							</IconButton>
						</Box>
					</Section>
				</Grid>
			</Grid>
			<ContactPopup
				open={openContact}
				data={responseDetail?.data as IOutsourceCompany}
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
		</>
	)
}

export default OutsourceCompanyDetail
