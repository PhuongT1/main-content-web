'use client'
import SharePopup from '@/app/(main-routes)/blogs/_components/share-popup'
import { ChevronLeftSmIcon } from '@/assets/icons'
import Bookmark from '@/assets/icons/bookmark'
import BookmarkFilled from '@/assets/icons/bookmark-filled'
import LinkCommunity from '@/assets/icons/link-community'
import { loadingAtom } from '@/atoms/loading'
import { userAtom } from '@/atoms/user'
import { PageTitle } from '@/components'
import { IconButton, SecondaryButton } from '@/elements'
import Button from '@/elements/button'
import Typography from '@/elements/typography'
import { getTeamBuildingById } from '@/services/team-building.service'
import { getTextStyles } from '@/themes/get-design-tokens'
import { ICategory } from '@/types/category.type'
import { IMember, IRecruit, ITeamBuilding } from '@/types/team-building.type'
import { convertToRem } from '@/utils/convert-to-rem'
import getCurrentUrl from '@/utils/get-current-url'
import { Box, Divider, Grid, GridProps, styled, useMediaQuery, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import ContactPopup from '../_components/ContactPopup'
import HorizontalImageList from '../_components/HorizontalImageList'
import MemberItem from '../_components/MemberItem'
import RecruitmentItem from '../_components/RecruitmentItem'
import { InfoAlert } from '@/components/dialog'
import { updateBookmark } from '@/actions/apis/bookmark.action'
import { useLanguage } from '@/hooks/use-language'

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

export interface ISelectCategories extends ICategory {
	recruitmentId: number | string
}

const TeamBuildingDetail = ({ params: { id } }: { params: { id: string } }) => {
	const { dict } = useLanguage()
	const theme = useTheme()
	const setLoading = useSetRecoilState(loadingAtom)
	const mdMatches = useMediaQuery(theme.breakpoints.down('md'))
	const [showError, setShowError] = useState<boolean>(false)
	const [showShare, setShowShare] = useState<boolean>(false)
	const [openContact, setOpenContact] = useState<boolean>(false)
	const [applicantCategories, setApplicantCategories] = useState<ISelectCategories[]>([])
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
	} = useQuery<{ data: ITeamBuilding }, Error>({
		queryKey: [`team-${id}-building-detail`, id as string],
		queryFn: () => getTeamBuildingById(id || ''),
		staleTime: 0,
		gcTime: 0,
		retry: true,
		enabled: Boolean(id)
	})
	
	const handleBookmark = async (id: number | string) => {
		const { data, error } = await updateBookmark({
			id: Number(id),
			type: 'TEAM_BUILDING'
		})
		if (!error) {
			await refetch()
		}
	}
	
	const openFormContact = (category?: ISelectCategories) => {
		if (user?.talentPoolId) {
			onToggleContact(true)
			updateApplicantCategories(category)
		} else {
			setShowError(true)
		}
	}
	
	useEffect(() => {
		if ((
			!responseDetail || !responseDetail.data
		) && !isLoading) {
			// router.push('/community/team-building')
		}
	}, [responseDetail])
	
	const updateApplicantCategories = (category?: ISelectCategories) => {
		if (category) {
			setApplicantCategories([category])
		} else {
			setApplicantCategories(
				responseDetail?.data?.recruits?.map((i: IRecruit) => (
					{ ...i.category, recruitmentId: i.id }
				)) || []
			)
		}
	}
	
	return (
		<>
			<PageTitle>팀빌딩</PageTitle>
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
					<Grid container rowGap={2} width={'100%'}>
						<Section sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
							<Typography cate="title_50" mb={0}>
								{responseDetail?.data?.slogan}
							</Typography>
							<Typography
								cate="body_20"
								mb={0}
								color={theme.palette.main_grey.gray100}
								sx={{
									whiteSpace: 'pre-line'
								}}
							>
								{responseDetail?.data?.introduction}
							</Typography>
						</Section>
						<Section
							sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', padding: 2, paddingRight: 0 }}
						>
							<HorizontalImageList data={responseDetail?.data?.activityImages || []} />
						</Section>
						<Section sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
							<Typography cate="title_50" mb={0}>
								프로젝트 및 서비스 소개
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
								dangerouslySetInnerHTML={{ __html: responseDetail?.data?.description || '' }}
							></Box>
						</Section>
						{responseDetail?.data?.recruits && responseDetail?.data?.recruits.length > 0 ? (
							<Section sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
								<Typography cate="title_50" mb={0}>
									모집공고
								</Typography>
								{responseDetail?.data?.recruits.map((i: IRecruit) => (
									<RecruitmentItem
										key={i.id}
										isOwner={responseDetail?.data?.user.id === user?.id}
										onClick={() => {
											openFormContact({ ...i.category, recruitmentId: i.id })
										}}
										{...i}
									/>
								))}
							</Section>
						) : (
							<></>
						)}
						<Section sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
							<Typography cate="title_50" mb={0}>
								{dict.teambuilding_members}
							</Typography>
							<Box display={'flex'} flexWrap={'wrap'} gap={2}>
								{responseDetail?.data?.members.map((member: IMember) => (
									<MemberItem key={member.id} {...member} />
								))}
							</Box>
						</Section>
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
								alt="img"
								src={
									!!responseDetail?.data?.thumbnail?.url
										? responseDetail?.data?.thumbnail?.url
										: '/images/blank-user.png'
								}
								width={120}
								height={120}
								style={{ borderRadius: '0.5rem', objectFit: 'cover' }}
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
							<Typography cate="caption_20" color={theme.palette.sub.teal400}>
								{responseDetail?.data?.name}
							</Typography>
							<Typography
								cate="sub_title_30"
								sx={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									width: '100%',
									display: '-webkit-box',
									WebkitLineClamp: '1',
									WebkitBoxOrient: 'vertical'
								}}
								color={theme.palette.main_grey.gray100}
							>
								{responseDetail?.data?.slogan}
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
								{responseDetail?.data?.introduction}
							</Typography>
						</Box>
						<Box display={'flex'} flexDirection="column" alignItems="flex-start" width="100%" gap={0.5} mt={1}>
							<Typography cate="sub_title_30">{'제품/서비스'}</Typography>
							<Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1}>
								{responseDetail?.data?.productOrService &&
									responseDetail?.data?.productOrService.map((i: string, index: number) => (
										<Box
											sx={{
												background: theme.palette.main_grey.gray700,
												borderRadius: 250,
												padding: '0.5rem 1rem'
											}}
											key={index}
										>
											<Typography cate="sub_title_10" color={theme.palette.main_grey.gray300}>
												{i}
											</Typography>
										</Box>
									))}
							</Box>
						</Box>
						{user?.id !== responseDetail?.data?.user?.id ? (
							<Box display={'flex'} alignItems={'center'} width={'100%'} gap={1}>
								<Button
									customType={'active'}
									cate={'primary'}
									customTitle={'참여요청'}
									fullWidth
									onClick={() => {
										openFormContact()
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
				{...(
					responseDetail?.data as ITeamBuilding
				)}
				onCancel={() => {
					onToggleContact(false)
				}}
				id={id as string}
				categories={applicantCategories}
			/>
			<SharePopup open={showShare} onCancel={() => setShowShare(false)} url={getCurrentUrl()} />
			<InfoAlert
				onSubmit={async (event: any) => {
					event.stopPropagation()
					setShowError(false)
				}}
				hideCancelBtn
				submitTxt={'확인'}
				cancelTxt={'취소'}
				title="인재풀 등록이 되지 않았습니다."
				description="인재풀 프로필 등록 완료 후 참여 요청이 가능합니다."
				// onCancel={(event: any) => {
				//   event.stopPropagation()
				//   setShowError(false)
				// }}
				open={showError}
			/>
		</>
	)
}

export default TeamBuildingDetail
