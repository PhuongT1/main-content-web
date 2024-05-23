import { convertToRem } from '@/utils/convert-to-rem'
import { Box, BoxProps, styled } from '@mui/material'

export const BoxCard = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: convertToRem(16),
  width: convertToRem(286),
  minHeight: convertToRem(250),
  padding: convertToRem(16),
  backgroundColor: theme.palette.home.gray400,
  outline: `1px solid ${theme.palette.home.gray400}`,
  borderRadius: convertToRem(10),

  '&:hover, &:focus': {
    backgroundColor: 'rgba(60, 130, 249, 0.10)',
    outline: `1px solid ${theme.palette.home.blue500}`
  }
}))
