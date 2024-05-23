import { Box, BoxProps, styled } from '@mui/material'

export const PageTitleStyled = styled(Box)<BoxProps>(({ theme }) => ({
  flex: '1',
  '.MuiBox-root': {
    marginTop: 0
  }
}))
