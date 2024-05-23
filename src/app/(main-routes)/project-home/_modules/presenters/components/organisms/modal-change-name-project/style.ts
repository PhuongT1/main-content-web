import { Box, BoxProps, styled } from '@mui/material'
import ButtonCustom from '@/elements/button'
import { convertToRem } from '@/utils/convert-to-rem'
import { ButtonProps } from '@/elements/button/button.type'

export const Button = styled(ButtonCustom)<ButtonProps>(({ theme }) => ({
  minWidth: convertToRem(120),
  minHeight: convertToRem(44),
  fontSize: convertToRem(16),
  padding: `${convertToRem(12)} ${convertToRem(24)}`,
  fontWeight: 600
}))

export const Form = styled('form')(({ theme }) => ({
  display: 'block'
}))

export const Content = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: convertToRem(8),
  padding: `${convertToRem(20)} ${convertToRem(32)}`,
  borderTop: `1px solid ${theme.palette.home.gray200}`,
  borderBottom: `1px solid ${theme.palette.home.gray200}`,
  overflow: 'hidden',
  overflowY: 'auto'
}))

export const HeadModal = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: convertToRem(32)
}))

export const Actions = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: convertToRem(12),
  justifyContent: 'flex-end',
  padding: convertToRem(32)
}))
