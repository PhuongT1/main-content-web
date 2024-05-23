import { convertToRem } from '@/utils/convert-to-rem'
import { Box, BoxProps, styled } from '@mui/material'

export const Avatar = styled(Box)<BoxProps>(({ theme }) => ({
  width: convertToRem(20),
  height: convertToRem(20),
  img: {
    width: '100%',
    height: '100%',
    borderRadius: '50%'
  }
}))

export const BoxCard = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: convertToRem(16),
  width: `calc((100% - ${convertToRem(24)})/2)`,
  minHeight: convertToRem(175),
  borderRadius: convertToRem(12),
  padding: convertToRem(20),
  backgroundColor: theme.palette.home.gray300,
  border: `1px solid ${theme.palette.home.gray300}`,
  cursor: 'pointer',
  '&:hover, &.selected': {
    backgroundColor: 'rgba(60, 130, 249, 0.10)',
    border: `1px solid ${theme.palette.home.blue500}`
  }
}))

export const BoxIcon = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: convertToRem(16),
  right: convertToRem(16),
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: convertToRem(24),
  height: convertToRem(24),
  borderRadius: '50%',
  cursor: 'pointer'
}))
