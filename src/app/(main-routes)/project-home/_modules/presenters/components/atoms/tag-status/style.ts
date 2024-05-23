import { convertToRem } from '@/utils/convert-to-rem'
import { Chip, ChipProps, styled } from '@mui/material'

export const TagStatus = styled(Chip)<ChipProps>(({ theme }) => ({
  minWidth: 'max-content',
  height: convertToRem(32),
  fontSize: convertToRem(12),
  color: theme.palette.main_grey.gray300,
  backgroundColor: 'transparent',
  padding: '0.8rem',
  border: '1px solid ' + theme.palette.main_grey.gray_scale_50,
  borderRadius: convertToRem(250),
  '.MuiChip-label': {
    padding: 0
  },
  '.MuiTypography-root': {
    margin: 0
  },
  fieldset: {
    border: 0,
    backgroundColor: theme.palette.main_grey.gray700
  }
}))
