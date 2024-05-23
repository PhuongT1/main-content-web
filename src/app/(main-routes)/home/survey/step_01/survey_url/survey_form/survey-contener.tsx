'use client'
import { Box, useTheme } from '@mui/material'
import React, { FC, ReactNode } from 'react'
import { remConvert } from '@/utils/convert-to-rem'

interface Props {
  children?: ReactNode
  title?: ReactNode
}

const SurveyContener: FC<Props> = ({ children, title }) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={remConvert('20px')}
      sx={{ borderRadius: remConvert('10px'), background: home.gray400, padding: remConvert('20px') }}
    >
      <Box sx={{ fontWeight: 600 }}>{title}</Box>
      {children}
    </Box>
  )
}
export default SurveyContener
