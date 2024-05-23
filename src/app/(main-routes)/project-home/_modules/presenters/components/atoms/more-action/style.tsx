import { convertToRem } from '@/utils/convert-to-rem'
import { Box, BoxProps, Menu, MenuProps, styled } from '@mui/material'

export const Icon = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: convertToRem(24),
  height: convertToRem(28),
  padding: `${convertToRem(12)} ${convertToRem(6)}`,
  cursor: 'pointer',
  borderRadius: convertToRem(4),
  '&:hover': {
    backgroundColor: theme.palette.home.gray200
  }
}))

export const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: convertToRem(10),
    backgroundColor: theme.palette.home.gray400,
    width: convertToRem(150),
    padding: `${convertToRem(12)} 0`,
    color: theme.palette.home.gray50,
    boxShadow: '0px 4px 20px 0px rgba(5, 6, 6, 0.40)',
    '.MuiMenu-list': {
      padding: 0
    },
    '.MuiMenuItem-root': {
      color: theme.palette.home.gray50,
      fontSize: convertToRem(14),
      fontWeight: 400,
      lineHeight: convertToRem(21),
      padding: `${convertToRem(12)} ${convertToRem(16)}`,
      '&:hover, &:active, &.Mui-selected': {
        color: theme.palette.main.white,
        backgroundColor: theme.palette.home.blue500
      }
    }
  }
}))

export const DisabledItem = styled('li')(({ theme }) => ({
  width: '100%',
  height: convertToRem(43),
  padding: `${convertToRem(12)} ${convertToRem(15)}`,
  backgroundColor: 'rgba(25, 26, 28, 0.60)',
  cursor: 'not-allowed'
}))
