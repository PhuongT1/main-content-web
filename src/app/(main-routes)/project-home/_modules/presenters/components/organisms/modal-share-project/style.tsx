import { Box, BoxProps, styled } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import ButtonCustom from '@/elements/button'
import { ButtonProps } from '@/elements/button/button.type'

export const Content = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: convertToRem(20),
  flex: 1,
  padding: `${convertToRem(20)} ${convertToRem(32)}`,
  borderTop: `1px solid ${theme.palette.home.gray200}`,
  borderBottom: `1px solid ${theme.palette.home.gray200}`,
  overflow: 'hidden',
  overflowY: 'auto'
}))

export const Actions = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: convertToRem(12),
  justifyContent: 'flex-end',
  padding: convertToRem(32)
}))

export const Button = styled(ButtonCustom)<ButtonProps>(({ theme }) => ({
  minWidth: convertToRem(120),
  minHeight: convertToRem(44),
  fontSize: convertToRem(16),
  padding: `${convertToRem(12)} ${convertToRem(24)}`,
  fontWeight: 600
}))

export const LockOverlay = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 10,
  width: '100%',
  height: '100%',
  background: 'rgba(25, 26, 28, 0.60)',
  borderRadius: convertToRem(10),
  cursor: 'not-allowed'
}))

export const EmptyStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
}
