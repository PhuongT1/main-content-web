import React, { FC } from 'react'
import { Box, useTheme } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'

interface LabelProgressBarProps {
  label: string
  order?: number
  percent: number
  colorPercent?: string
}

const LabelProgressBar: FC<LabelProgressBarProps> = ({ label, order, percent, colorPercent }) => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <Box
      display={'flex'}
      gap={remConvert('10px')}
      sx={{ color: home.gray50, fontSize: remConvert('16px'), fontWeight: 600 }}
    >
      {order && (
        <Box
          sx={{
            fontSize: remConvert('16px'),
            borderRadius: '50%',
            width: remConvert('25px'),
            height: remConvert('25px'),
            display: 'inline-flex',
            border: `2px solid`,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {order}
        </Box>
      )}
      <Box>{label}</Box>
      <Box sx={{ color: colorPercent || home.mint500 }}>{percent || 0}%</Box>
    </Box>
  )
}

export default LabelProgressBar
