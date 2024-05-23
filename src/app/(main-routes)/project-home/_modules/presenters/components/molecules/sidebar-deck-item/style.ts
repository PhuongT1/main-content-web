import { convertToRem } from '@/utils/convert-to-rem'
import { Box, BoxProps, Stack, StackProps, styled } from '@mui/material'

export const SidebarDeckItem = styled(Stack)<StackProps>(({ theme }) => ({
  '&:hover, &:active': {
    backgroundColor: theme.palette.home.gray300
  }
}))

export const DragIcon = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'grab'
}))

export const CloseIcon = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: convertToRem(2),
  backgroundColor: theme.palette.home.gray300,
  cursor: 'pointer',
  borderRadius: convertToRem(4)
}))
