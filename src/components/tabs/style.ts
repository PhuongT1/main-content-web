import { convertToRem } from '@/utils/convert-to-rem'
import { styled } from '@mui/material'
import { Typography } from '@/elements'
import { TypographyProps } from '@/elements/typography/typography.type'

export const CountLabel = styled(Typography)<TypographyProps>(({ theme, bgcolor }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: convertToRem(21),
  padding: `${convertToRem(2)} ${convertToRem(8)}`,
  backgroundColor: `${bgcolor}`,
  borderRadius: convertToRem(99)
}))

export const LineBottom = styled('span')(({ theme }) => ({
  position: 'absolute',
  bottom: '0',
  left: '0',
  zIndex: 2,
  width: '100%',
  height: convertToRem(2),
  backgroundColor: theme.palette.home.mint500
}))
