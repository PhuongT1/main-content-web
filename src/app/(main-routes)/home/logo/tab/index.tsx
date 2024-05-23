import { styled, Tab as MTab, TabProps as MTabProps } from '@mui/material'

const Tab = styled(MTab)<MTabProps>(({ theme }) => ({
  minWidth: '140px',
  padding: '0.5rem 2rem',
  minHeight: 'unset',
  height: '100%',
  zIndex: 5,
  borderRadius: '500px',
  color: theme.palette.home.gray100,
  [theme.breakpoints.down('sm')]: {
    border: '1px solid ' + theme.palette.main.gray50,
    marginRight: '0.5rem',
    padding: '0.5rem 1rem',
    minWidth: 0
  },
  '&.Mui-selected': {
    color: theme.palette.main.white,
    [theme.breakpoints.down('sm')]: {
      border: '1px solid ' + theme.palette.main.primary,
      borderRadius: '500px'
    }
  }
}))

export default Tab
