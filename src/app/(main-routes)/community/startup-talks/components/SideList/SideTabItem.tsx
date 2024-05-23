import { convertToRem } from '@/utils/convert-to-rem'
import { Tab as MTab, TabProps as MTabProps, styled } from '@mui/material'

const SideTabItem = styled(MTab)<MTabProps & { type?: 'secondary' | 'primary' }>(({ theme, type = 'primary' }) => ({
  padding: '0.5rem 0.75rem',
  minHeight: convertToRem(40),
  zIndex: 5,
  color: theme.palette.main.white,
  fontSize: convertToRem(12),
  [theme.breakpoints.down('md')]: {
    height: convertToRem(34),
    minHeight: convertToRem(34)
  },
  height: convertToRem(40),
  borderRadius: convertToRem(250),
  backgroundColor: type === 'primary' ? theme.palette.main.gray60 : 'unset',
  border: type === 'primary' ? '1px solid' : 0,
  borderColor: type === 'primary' ? theme.palette.main.gray60 : 'unset',
  marginRight: '0.5rem',
  lineHeight: `${125}%`,
  fontWeight: 600,
  fontFamily: 'var(--font-pretendard)',
  letterSpacing: 0 ? `${0}%` : 'inherit',
  '&.Mui-selected': {
    backgroundColor: theme.palette.main.primary,
    borderColor: theme.palette.main.primary,
    color: theme.palette.main.white
  }
}))

export default SideTabItem
