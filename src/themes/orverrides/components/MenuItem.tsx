import { Theme } from '@mui/material/styles'

// ----------------------------------------------------------------------

export default function MenuItem(theme: Theme) {
	return {
		MuiMenuItem: {
			styleOverrides: {
				root: {
					padding: '15px 16px',
					'&.Mui-selected': {
						backgroundColor: theme.palette.main_primary.blue500,
						'&:hover': {
							backgroundColor: theme.palette.main_primary.blue500
						}
					}
					
				}
			}
		}
	}
}
