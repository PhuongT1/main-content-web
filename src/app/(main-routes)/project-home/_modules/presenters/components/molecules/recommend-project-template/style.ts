import { convertToRem } from '@/utils/convert-to-rem'
import { Box, BoxProps, styled } from '@mui/material'

export const BoxCard = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: convertToRem(576),
  height: convertToRem(192),
  borderRadius: convertToRem(10),
  padding: convertToRem(24)
}))

export const WrapLockIcon = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: convertToRem(32),
  height: convertToRem(32),
  backgroundColor: theme.palette.main.white,
  borderRadius: '50%'
}))

export const LockOverlay = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: convertToRem(6),
  width: '100%',
  height: '100%',
  background: 'rgba(25, 26, 28, 0.60)',
  backdropFilter: 'blur(1px)'
}))
