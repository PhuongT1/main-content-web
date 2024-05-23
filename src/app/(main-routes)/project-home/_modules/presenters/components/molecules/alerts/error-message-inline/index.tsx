'use client'
import { Box, BoxProps, styled, useTheme } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import { Typography } from '@/elements'
import InfoIcon from '@/assets/icons/alert/info'

interface IErrorMessageInline {
  message: string
}

export const ErrorMessage = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  gap: convertToRem(10),
  padding: `${convertToRem(16)} ${convertToRem(20)}`,
  backgroundColor: 'rgba(234, 57, 57, 0.10)',
  marginTop: convertToRem(8),
  borderRadius: convertToRem(8)
}))

export const ErrorMessageInline = ({ message }: IErrorMessageInline) => {
  const { palette } = useTheme()

  return (
    <ErrorMessage>
      <InfoIcon pathPropsClip={{ fill: palette.home.gray500 }} />
      <Typography cate='body_3' color={palette.home.gray50}>
        {message || ''}
      </Typography>
    </ErrorMessage>
  )
}
