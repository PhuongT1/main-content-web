import { Box, BoxProps, styled } from '@mui/material'

const CardBox = styled(Box)<BoxProps>(({ theme }) => (
	{
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: theme.palette.main_grey.gray700,
		backgroundImage: 'none',
		padding: '24px',
		[theme.breakpoints.down('md')]: {
			padding: '16px'
		},
		// [theme.breakpoints.down('md')]: {
		//   backgroundColor: theme.palette.main.gray80,
		// },
		borderRadius: '.5rem'
	}
))

export default CardBox
