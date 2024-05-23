import { SecondaryActiveChip } from '@/elements'
import Typography from '@/elements/typography'
import { IExperience } from '@/types/pool.type'
import { Box, BoxProps, styled, useTheme } from '@mui/material'
import moment from 'moment'

const Section = styled(Box)<BoxProps>(({ theme }) => (
	{
		backgroundColor: theme.palette.main.gray70,
		width: '100%',
		padding: '1rem',
		borderRadius: '0.5rem',
		fieldset: {
			border: 0
		}
	}
))

type CareerItemProps = {
	item?: IExperience
}

const CareerItem = ({ item }: CareerItemProps) => {
	const theme = useTheme()
	
	return (
		<Section>
			<Box width={'100%'} display="flex" alignItems={'center'} justifyContent="space-between" mb={2}>
				<Typography cate="title_40">{item?.companyName || '메인콘텐츠'}</Typography>
				{item?.isCurrentlyWorking && (
					<SecondaryActiveChip
						label={
							<Typography cate="caption_20" plainColor="sub.orange600">
								재직중
							</Typography>
						}
						padding={false}
						sx={{
							width: '61px',
							bgcolor: '#241915',
							borderColor: theme.palette.sub.orange600,
							borderRadius: '1000px'
						}}
					/>
				)}
			</Box>
			<Typography cate="body_30" sx={{ whiteSpace: 'pre-line' }} mb={0.5}>
				근무 기간: {moment(item?.startDateAt)
				.format('YYYY.MM.DD')} - {moment(item?.endDateAt)
				.format('YYYY.MM.DD')} (
				{item?.yearsOfExperience}
				년)
			</Typography>
			<Typography cate="body_30" sx={{ whiteSpace: 'pre-line' }}>
				담당 업무: {item?.undertaking}
			</Typography>
		</Section>
	)
}

export default CareerItem
