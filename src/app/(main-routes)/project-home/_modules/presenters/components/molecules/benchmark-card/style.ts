import { convertToRem } from '@/utils/convert-to-rem'
import { Box, BoxProps, styled } from '@mui/material'

export const BoxCard = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 0,
  flex: 1
}))

export const Icon = styled(Box)<BoxProps>(({ theme }) => ({
  padding: convertToRem(8),
  cursor: 'pointer'
}))

export const Checkbox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: convertToRem(25),
  minWidth: convertToRem(25),
  height: convertToRem(25),
  cursor: 'pointer'
}))
