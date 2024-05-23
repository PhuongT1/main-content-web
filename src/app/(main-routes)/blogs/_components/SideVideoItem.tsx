import HeartSmIcon from '@/assets/icons/heart-sm'
import ProgressiveImage from '@/elements/progressive-image'
import Typography from '@/elements/typography'
import { IBlog } from '@/types/blog.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { displayTimeDiff } from '@/utils/display-time-diff'
import { formatCurrency } from '@/utils/format-currency'
import {
	Box,
	Chip as MChip,
	ChipProps as MChipProps,
	Stack,
	styled,
	useMediaQuery,
	useTheme
} from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import BookmarkCheckButton from '@/elements/bookmark-checkbox'

export type ChipProps = MChipProps & {
	type?: string
}

type SideVideoProps = {
	item: IBlog
	onBookmark: Function
}
const Chip = styled(MChip)<ChipProps>(({ theme, type }) => ({
	backgroundColor:
		type === 'error' ? theme.palette.main.danger : type === 'warning' ? '#FC7900' : theme.palette.main.primary,
	padding: '1px 5px 2px 5px',
	color: theme.palette.main.white,
	borderRadius: '2px',
	fontSize: convertToRem(12),
	'.MuiChip-label': {
		padding: 0
	},
	fieldset: {
		border: 0,
		backgroundColor: theme.palette.main_grey.gray700
	}
}))
const SideVideoItem = ({ item, onBookmark }: SideVideoProps) => {
	const theme = useTheme()
	const xlUp = useMediaQuery('(min-width: 1200px)')
	const xxlUp = useMediaQuery('(min-width: 1600px)')
	const smDown = useMediaQuery('(max-width: 576px)')
	const isNew = moment().diff(moment(item.createdAt), 'days') < 10
	const router = useRouter()
	return (
		<Stack
			direction={xlUp ? 'row' : 'column'}
			sx={{
				[theme.breakpoints.down('md')]: {
					width: '100%'
				},
				cursor: 'pointer'
			}}
		>
			<Box
				sx={{
					width: xlUp ? '10.5rem' : '100%',
					paddingTop: xlUp ? 0 : 'calc((6 / 10.5) * 100%)',
					height: xlUp ? '6rem' : 'auto',
					flexShrink: xxlUp ? '0' : 1,
					position: 'relative'
				}}
				onClick={() => {
					router.push('/blogs/' + item.id)
				}}
			>
				<ProgressiveImage
					src={!!item?.thumbnail?.url ? item?.thumbnail?.url : '/images/test-img.png'}
					placeholderSrc={!!item?.thumbnail?.url ? item?.thumbnail?.url : '/images/test-img.png'}
					alt={item.thumbnail?.name ? item.thumbnail?.name : 'not-found-alt'}
					style={{
						cursor: 'pointer',
						objectFit: 'cover',
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						borderRadius: convertToRem(8)
					}}
				/>
				<Box position={'absolute'} zIndex={3} bottom={8} right={8}>
					<MChip
						size="small"
						label={!!item.duration ? item.duration : '10:20'}
						sx={{ backgroundColor: theme.palette.main_grey.gray800, fontSize: convertToRem(12) }}
					/>
				</Box>
			</Box>
			<Stack
				direction={'column'}
				sx={{
					width: '100%',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
				ml={xlUp ? 1 : 0}
				mt={xlUp ? 0 : 1}
			>
				<Stack
					direction={'row'}
					sx={{
						width: '100%',
						justifyContent: 'space-between'
					}}
					onClick={() => {
						router.push('/blogs/' + item.id)
					}}
				>
					<Stack direction={'column'} alignItems={'flex-start'} mr={xlUp ? 1 : 0}>
						<Typography
							cate={'caption_10'}
							color={theme.palette.main.point}
							mb={0.5}
							sx={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: '1',
								WebkitBoxOrient: 'vertical'
							}}
						>
							{item.category.name}
						</Typography>
						<Typography
							cate={'caption_10'}
							color={theme.palette.main_grey.gray200}
							sx={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: '1',
								WebkitBoxOrient: 'vertical'
							}}
						>
							{item.instructorName}
						</Typography>
						<Typography
							cate={xlUp || smDown ? 'body_20' : 'sub_title_20'}
							color={theme.palette.main_grey.gray100}
							my={0.5}
							sx={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: '2',
								WebkitBoxOrient: 'vertical',
								fontWeight: 600
							}}
						>
							{item.title}
						</Typography>
					</Stack>
					
					{isNew ? (
						<Chip
							type="error"
							size="small"
							label="new"
							sx={{
								height: convertToRem(17)
							}}
						/>
					) : item.isHot ? (
						<Chip
							type="warning"
							size="small"
							label="hot"
							sx={{
								height: convertToRem(17)
							}}
						/>
					) : (
						<Box />
					)}
				</Stack>
				<Stack
					direction={'row'}
					sx={{
						width: '100%',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<Stack direction={'row'}>
						<Box display={'flex'} flexShrink={0}>
							<HeartSmIcon stroke={theme.palette.main.white} />
						</Box>
						<Typography
							cate={xlUp || smDown ? 'caption_2' : 'body_3'}
							color={theme.palette.main_grey.gray200}
							ml={1}
							mr={3}
							sx={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitLineClamp: '1',
								WebkitBoxOrient: 'vertical'
							}}
						>
							{formatCurrency(item.totalView)} · {displayTimeDiff(item.createdAt)}
						</Typography>
					</Stack>
					<BookmarkCheckButton
						isBookmark={item.isBookmark}
						onBookmark={onBookmark}
						small={true}
						plainColor="main_grey.gray700"
					/>
					{/*<IconButton*/}
					{/*	btnSize="md"*/}
					{/*	sx={{ backgroundColor: theme.palette.main_grey.gray700, padding: convertToRem(4) }}*/}
					{/*	onClick={() => {*/}
					{/*		onBookmark?.()*/}
					{/*	}}*/}
					{/*>*/}
					{/*	{item?.isBookmark ? (*/}
					{/*		<BookmarkUncheckIcon svgProps={{ stroke: theme.palette.main.primary_light }} />*/}
					{/*	) : (*/}
					{/*		<BookmarkUncheckIcon svgProps={{ stroke: theme.palette.main.white }} />*/}
					{/*	)}*/}
					{/*</IconButton>*/}
				</Stack>
			</Stack>
		</Stack>
	)
}

export default SideVideoItem
