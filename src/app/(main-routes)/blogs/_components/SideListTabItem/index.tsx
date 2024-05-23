import { convertToRem } from '@/utils/convert-to-rem'
import { Tab as MTab, TabProps as MTabProps, styled } from '@mui/material'

const SideListTabItem = styled(MTab)<MTabProps & { type?: 'secondary' | 'primary' }>(({ theme, type = 'primary' }) => ({
  padding: '0.5rem 0.75rem',
  minHeight: '40px',
  zIndex: 5,
  color: theme.palette.main.white,
  fontSize: convertToRem(12),
  fontWeight: 600,
  height: convertToRem(40),
  borderRadius: convertToRem(250),
  backgroundColor: type === 'primary' ? theme.palette.main_grey.gray600 : 'unset',
  border: type === 'primary' ? '1px solid' : 0,
  borderColor: theme.palette.main_grey.gray300,
  marginRight: '0.5rem',
  '&.Mui-selected': {
    backgroundColor: theme.palette.main.primary,
    borderColor: theme.palette.main.primary,
    color: theme.palette.main.white
  }
}))

export default SideListTabItem
