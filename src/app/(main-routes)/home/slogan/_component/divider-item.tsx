import React, { FC, memo } from 'react'
import { Divider, useTheme } from '@mui/material'

type Props = {
  isView?: boolean
}

const DividerItem: FC<Props> = ({ isView = false }) => {
  const {
    palette: { home }
  } = useTheme()

  return isView ? <Divider sx={{ borderColor: home.gray60 }} /> : <></>
}

export default DividerItem
