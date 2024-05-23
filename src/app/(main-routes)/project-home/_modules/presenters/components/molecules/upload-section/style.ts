import { convertToRem } from '@/utils/convert-to-rem'
import { Box, BoxProps, styled } from '@mui/material'

export const WrapUpload = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  height: convertToRem(207),
  gap: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: convertToRem(10),
  overflow: 'hidden'
}))

export const BoxOverlay = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  zIndex: 11,
  left: 0,
  top: '100%',
  width: '100%',
  height: '100%',
  transition: 'all 0.3s ease',
  backgroundColor: 'transparent'
}))

export const Overlay = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 11,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(25, 26, 29, 0.8)'
}))

export const BoxContent = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 12,
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent'
}))

export const ContentInner = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: convertToRem(20)
}))

export const BoxIcon = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: convertToRem(20),
  right: convertToRem(20),
  zIndex: 13,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: convertToRem(40),
  height: convertToRem(40),
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  }
}))
