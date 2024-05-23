import { convertToRem } from '@/utils/convert-to-rem'
import { Box, BoxProps, styled } from '@mui/material'

export const BoxCard = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 0,
  flex: 1
}))

export const Icon = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: convertToRem(16),
  right: convertToRem(16),
  zIndex: 10,
  cursor: 'pointer'
}))

export const FolderLabel = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -30%)',
  backgroundColor: '#2661C4',
  borderRadius: convertToRem(99),
  padding: `${convertToRem(2)} ${convertToRem(10)}`
}))

export const Checkbox = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: convertToRem(18),
  left: convertToRem(16),
  zIndex: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: convertToRem(25),
  height: convertToRem(25),
  cursor: 'pointer'
}))
