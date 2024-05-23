'use client'
import React, { FC } from 'react'
import { Divider, SxProps, useTheme } from '@mui/material'

type Props = {
  isView?: boolean
  sx?: SxProps
}

const DividerItem: FC<Props> = ({ isView = false, sx }) => {
  const {
    palette: { home }
  } = useTheme()

  return isView ? <Divider sx={{ borderColor: home.gray60, ...sx }} /> : <></>
}

export default DividerItem
