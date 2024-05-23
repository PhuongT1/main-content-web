import { convertToRem } from '@/utils/convert-to-rem'
import { Box, BoxProps, Chip, ChipProps, styled } from '@mui/material'

export const BoxCard = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 0,
  flex: 1
}))

export const Tag = styled(Chip)<ChipProps>(({ theme }) => ({
  minWidth: convertToRem(52),
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

export const IconsClosed = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: '0',
  right: '0',
  zIndex: '2',
  padding: convertToRem(5)
}))
