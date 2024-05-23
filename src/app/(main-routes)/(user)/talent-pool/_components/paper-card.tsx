import { Paper, PaperProps, styled } from '@mui/material'
import { convertToRem } from '@/utils/styles'

const PaperCard = styled(Paper)<PaperProps>(({ theme }) => (
	{
		backgroundColor: theme.palette.main_grey.gray800,
		width: '100%',
		padding: convertToRem(24),
		backgroundImage: 'none',
		[theme.breakpoints.down('md')]: {
			// backgroundColor: theme.palette.background.default,
			padding: convertToRem(16)
		},
		borderRadius: '1rem'
	}
))

export default PaperCard
