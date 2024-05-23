import ChevronUp from '@/assets/icons/chevrons/chevron-up'
import RocketIcon from '@/assets/icons/rocket.ico'
import Typography from '@/elements/typography'
import { IBlog } from '@/types/blog.type'
import { convertToRem } from '@/utils/convert-to-rem'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Box, useMediaQuery } from '@mui/material'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, {
	AccordionSummaryProps as MAccordionSummaryProps
} from '@mui/material/AccordionSummary'
import { styled, useTheme } from '@mui/material/styles'
import * as React from 'react'
import CourseHorizontalList from './CourseHorizontalList'

type AccordionSummaryProps = MAccordionSummaryProps & {
	expanded?: boolean
}
const Accordion = styled((props: AccordionProps) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))<AccordionProps>(({ theme, expanded }) => ({
	backgroundColor: expanded ? '#152C57' : theme.palette.main_grey.gray800,
	backgroundImage: 'none',
	margin: '2.5rem 0',
	borderRadius: '0.5rem',
	height: expanded ? 'auto' : 110,
	'&:not(:last-child)': {
		borderBottom: 0
	},
	'&:before': {
		display: 'none'
	},
	'.MuiAccordionSummary-root': {
		height: expanded ? 'auto' : '100%',
		backgroundColor: expanded ? '#152C57' : theme.palette.main_grey.gray800,
		borderRadius: '0.5rem',
		paddingTop: expanded ? '1.5rem' : 0,
		paddingLeft: '1.5rem',
		paddingRight: '1.5rem',
		paddingBottom: 0
	},
	'.MuiCollapse-root': {
		display: expanded ? 'block' : 'none',
		backgroundColor: expanded ? '#152C57' : theme.palette.main_grey.gray800,
		borderRadius: '0.5rem',
		paddingTop: 0,
		paddingLeft: '1.5rem',
		paddingRight: '1.5rem',
		paddingBottom: '1.5rem'
	},
	'.MuiAccordionDetails-root': {
		borderTop: '0',
		padding: 0
	}
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
	alignItems: 'center',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(180deg)'
	},
	'& .MuiAccordionSummary-content': {
		borderBottomWidth: 0,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	}
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)'
}))

type CourseDropdown = {
	data: IBlog[]
	handleBookmark: Function
	fetchNextPage?: Function
	hasNextPage?: boolean
	isFetchingNextPage?: boolean
}

export default function CourseDropdown(
	{
		data,
		handleBookmark,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	}: CourseDropdown) {
	const [expanded, setExpanded] = React.useState<boolean>(true)
	const theme = useTheme()
	const handleChange = () => {
		setExpanded((prev) => !prev)
	}
	
	const mdUp = useMediaQuery('(min-width: 768px)')
	
	return (
		<Accordion expanded={expanded} onChange={handleChange}>
			<AccordionSummary
				expandIcon={
					<Box
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						sx={{
							backgroundColor: expanded ? theme.palette.main_primary.black900 : theme.palette.main_grey.gray600,
							width: convertToRem(24),
							height: convertToRem(24),
							borderRadius: convertToRem(250)
						}}
					>
						<ChevronUp stroke={theme.palette.main.white} />
					</Box>
				}
			>
				<Box display="flex" alignItems="center">
					<RocketIcon />
					<Typography ml={2} cate="title_70">
						카드뉴스
					</Typography>
				</Box>
				{!expanded && mdUp && (
					<Typography mr={2} cate="subtitle_1">
						펼쳐보기
					</Typography>
				)}
			</AccordionSummary>
			<AccordionDetails>
				{
					<CourseHorizontalList
						fetchNextPage={fetchNextPage}
						hasNextPage={hasNextPage}
						data={data}
						handleBookmark={handleBookmark}
						isFetchingNextPage={isFetchingNextPage}
						isHideButton={!expanded}
					/>
				}
			</AccordionDetails>
		</Accordion>
	)
}
