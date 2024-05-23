'use client'
import { getReferenceRoomById } from '@/actions/apis/startup-toolkit.action'
import { ChevronLeftSmIcon } from '@/assets/icons'
import ChevronDownSmIcon from '@/assets/icons/chevrons/chevron-down-sm'
import ChevronUp from '@/assets/icons/chevrons/chevron-up'
import BulletDotIcon from '@/assets/icons/commons/bullet-dot.ico'
import { Carousel } from '@/components'
import DocumentCard from '@/components/cards/document.card'
import { LockAlert } from '@/components/dialog'
import FilePreviewModal from '@/components/file-preview-backdrop'
import ShareBottom from '@/components/share-bottom'
import { Divider, SecondaryButton, Tag, Typography } from '@/elements'
import { CardBadge } from '@/elements/v2/badge'
import { RoundedButton } from '@/elements/v2/button'
import { Thumbnail } from '@/types/startup/toolkit.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Collapse, Grid, List, ListItem, Stack, useMediaQuery, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment, useEffect, useRef, useState } from 'react'
import { CONTENT_TYPE } from '../../_client-components/data-room-table'
import SideListReferent from '../_components/side-list-referent'
import { useSetRecoilState } from 'recoil'
import { loadingAtom } from '@/atoms/loading'
import { downloadDataReferentFile } from '@/services/download.service'
import { updateBookmark } from '@/actions/apis/bookmark.action'
import { BOOKMARK_TYPE } from '@/constants/bookmark.constant'

const ReferentDetail = ({ id }: { id: number }) => {
	const theme = useTheme()
	const router = useRouter()
	const pathName = usePathname()
	const mdDown = useMediaQuery(`(max-width: 768px)`)
	const setLoading = useSetRecoilState(loadingAtom)
	
	const [show, setShow] = useState<boolean>(false)
	const visibleCharacters = 450
	
	const [open, setOpen] = useState<boolean>(false)
	const [docFile, setDocFile] = useState<Thumbnail>()
	const [purchaseDialog, setPurchaseDialog] = useState<boolean>(false)
	
	const [spaceOfCategory, setSpaceOfCategory] = useState(0)
	const ref = useRef<HTMLElement | null>(null)
	
	const {
		data: detailData,
		isFetching,
		refetch
	} = useQuery({
		queryKey: ['referent-room-detail', id],
		queryFn: async () => await getReferenceRoomById(id),
		select(data) {
			return data.data
		},
		meta: {
			offLoading: true
		}
	})
	
	const bookmarkAction = useMutation({
		mutationFn: updateBookmark,
		onSuccess: async () => {
			await refetch()
		},
		onError: () => {
			console.log('something went wrong!!')
		}
	})
	
	const handleBookmark = async () => {
		bookmarkAction.mutate({
			id,
			type: BOOKMARK_TYPE.REFERENCE_ROOM
		})
	}
	
	const handleDownload = async (file: Thumbnail) => {
		if (detailData && !detailData.hasDownload) {
			setPurchaseDialog(true)
		} else {
			setLoading(true)
			try {
				await downloadDataReferentFile(file.url as string, file.name)
				setLoading(false)
			} catch (error) {
				console.log(error)
				setLoading(false)
			}
		}
	}
	
	const handlePreviewFile = (doc: Thumbnail) => {
		if (detailData && !detailData.hasDownload) {
			setPurchaseDialog(true)
		} else {
			if (doc !== undefined) setDocFile(doc)
			setOpen(true)
		}
	}
	
	useEffect(() => {
		if (ref.current && !isFetching) {
			setSpaceOfCategory((
				ref.current.clientHeight || 0
			) + 64 || 0)
		}
	}, [isFetching, ref])
	
	return (
		<Box sx={{
			marginTop: { sm: 3 }
		}}>
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
					<Divider sx={{ my: 6 }} />
				</>
			) : null}
			<Grid container columnSpacing={{ md: 6, sm: 0 }} rowSpacing={{ md: 0, sm: 6 }}>
				<Grid item sm={12} md={8.2}>
					{detailData && <Carousel images={detailData.images} />}
					<Stack mt={{ md: 6, sm: 5 }}>
						<Stack
							direction={'column'}
							gap={2}
							sx={{
								borderBottom: '0.5px solid ' + theme.palette.main_grey.gray600
							}}
						>
							<Stack direction={'row'} gap={1} alignItems={'center'}>
								<CardBadge
									state={detailData?.type === CONTENT_TYPE.FREE ? 'FREE' : 'PREMIUM'}
									label={detailData?.type === CONTENT_TYPE.FREE ? '무료' : '프리미엄'}
								/>
								<Typography cate="body_30" plainColor="sub.teal400">
									{detailData?.category.name}
								</Typography>
							</Stack>
							<Typography cate="title_60" plainColor="main_grey.gray100"
							            sx={{ marginTop: convertToRem(-8) }}>
								{detailData?.title}
							</Typography>
							<Box>
								{detailData?.hashtags.map((i, idx) => (
									<Fragment key={idx}>
										<Tag>{i.name}</Tag>&nbsp;
									</Fragment>
								))}
							</Box>
							{detailData && (
								<ShareBottom
									align={true}
									bookmark={handleBookmark}
									data={{
										...detailData,
										createdAt: detailData.createdAt,
										isBookmark: detailData.isBookmark,
										totalView: detailData.totalView,
										type: detailData.type
									}}
									showTimeAgo={false}
									url={pathName}
								/>
							)}
						</Stack>
						{detailData && (
							<Stack gap={5} mt={5}>
								<Typography cate="title_40">자료실 소개</Typography>
								<Stack gap={5} alignItems={{ md: 'flex-start', sm: 'center' }}>
									<Collapse in={show} collapsedSize={336}>
										<Box
											dangerouslySetInnerHTML={{
												__html: show
													? detailData.content
													: detailData.content.length > visibleCharacters
														? `${detailData.content.slice(0, visibleCharacters)}...`
														: detailData.content
											}}
											sx={{
												'& img': {
													width: '100%'
												},
												'& p': {
													color: 'main_grey.gray300'
												}
											}}
										/>
									</Collapse>
									<RoundedButton
										btnSize="xxs-np"
										sx={{
											width: '104px'
										}}
										onClick={() => {
											setShow((prev) => !prev)
										}}
									>
										{show ? (
											<>
												<Typography cate="button_20">접기</Typography>
												<ChevronUp stroke={'white'} />
											</>
										) : (
											<>
												<Typography cate="button_20">더보기</Typography>
												<ChevronDownSmIcon stroke={'white'} />
											</>
										)}
									</RoundedButton>
								</Stack>
								<Stack gap={1}>
									{detailData.documents.map((val) => (
										<DocumentCard
											key={val.uuid}
											doc={val}
											download={() => {
												handleDownload(val)
											}}
											preview={() => {
												handlePreviewFile(val)
											}}
										/>
									))}
								</Stack>
								<Stack
									direction={'column'}
									sx={{
										padding: {
											md: `${convertToRem(30)} ${convertToRem(35)}`,
											sm: `${convertToRem(24)}`
										},
										border: '1px solid ' + theme.palette.main_grey.gray600,
										borderRadius: convertToRem(8),
										width: '100%'
									}}
								>
									<Typography cate="sub_title_30">재배포 금지</Typography>
									<List sx={{ padding: 0 }}>
										<ListItem
											sx={{
												padding: { md: 0 }
											}}
										>
											<BulletDotIcon />
											<Typography
												cate="body_30"
												sx={{
													textWrap: 'pretty'
												}}
											>
												메인콘텐츠에서 제공하는 자료실 내 모든 자료는 저작권에 의해 보호받고 있습니다.
											</Typography>
										</ListItem>
										<ListItem
											sx={{
												padding: { md: 0 }
											}}
										>
											<BulletDotIcon />
											<Typography
												cate="body_30"
												sx={{
													textWrap: 'pretty'
												}}
											>
												온라인 업로드 및 제3자에게 제공 등 어떠한 경우에도 재배포 금지입니다.
											</Typography>
										</ListItem>
									</List>
								</Stack>
							</Stack>
						)}
					</Stack>
				</Grid>
				<Grid item sm={12} md={3.8}>
					<SideListReferent spaceOfCategory={spaceOfCategory} id={id} />
				</Grid>
			</Grid>
			{/* File Preview Modal */}
			{docFile &&
        <FilePreviewModal open={open} handleClose={() => setOpen(false)} docObject={docFile} />}
			{/* Popup Section */}
			<LockAlert
				open={purchaseDialog}
				title={'프리미엄 회원 전용 자료입니다.'}
				description={`프리미엄으로 업그레이드 하시고\n슘페터의 다양한 자료를 무제한으로 다운로드 받아보세요.`}
				submitTxt="업그레이드 하기"
				cancelTxt="확인"
				onSubmit={() => {
					router.push('/purchase')
				}}
				onCancel={() => {
					setPurchaseDialog(false)
				}}
			/>
		</Box>
	)
}

export default ReferentDetail
