'use client'
import React, { ReactElement } from 'react'
import { Box, Typography, useTheme, SxProps } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'
import styles from './style.module.scss'

interface ITitle {
  label: string | ReactElement
  subLabel?: string
  sxLabel?: SxProps
  sxSubLabel?: SxProps
}

export default function Title({ label, subLabel, sxLabel, sxSubLabel }: ITitle) {
  const {
    palette: { home }
  } = useTheme()

  return (
    <>
      <Box component={'div'} className={`${styles.title}`} sx={{ ...sxLabel }}>
        {typeof label === 'string' ? (
          <Box component={'h2'} sx={{ color: home.gray50 }}>
            {label}
          </Box>
        ) : (
          label
        )}
      </Box>
      <Typography sx={{ mb: remConvert('20px'), color: home.gray100, ...sxSubLabel }}>{subLabel}</Typography>
    </>
  )
}
