import { Box, BoxProps, Stack, StackProps, styled } from '@mui/material'

export const SidebarDeckIR = styled(Stack)<StackProps>(({ theme }) => ({
  '&:hover, &:active': {
    backgroundColor: theme.palette.home.alpha_blue_10
  }
}))

export const DragIcon = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'grab'
}))
