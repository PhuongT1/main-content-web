import { Grid, GridProps, styled } from '@mui/material'

export const Section = styled(Grid)<GridProps>(({ theme }) => ({
  backgroundColor: theme.palette.main_grey.gray800,
  padding: '1.5rem',
  borderRadius: '1rem',
  fieldset: {
    border: 0
  }
}))
