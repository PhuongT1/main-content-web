import { convertToRem } from '@/utils/convert-to-rem'
import { Box, BoxProps, styled } from '@mui/material'

export const BoxCard = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  gap: convertToRem(16),
  borderRadius: convertToRem(12),
  padding: `${convertToRem(40)} 0`,
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.home.blue500,
    backgroundColor: 'rgba(60, 130, 249, 0.10)'
  }
}))

export const LockOverlay = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 10,
  width: '100%',
  height: '100%',
  background: 'rgba(25, 26, 28, 0.60)',
  backdropFilter: 'blur(1px)',
  borderRadius: convertToRem(12),
  cursor: 'not-allowed'
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
