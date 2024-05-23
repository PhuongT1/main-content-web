import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import { LayoutThreeIR } from '@/components/home/layout-IR'
import React, { CSSProperties } from 'react'
import { DataNamingIR } from '@/types/naming.type'
import { iRPalette } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { getColorAlpha } from '@/utils/styles'

const Layout_3_AdvMarketing = ({ data }: DataNamingIR) => {
  const indexActive = data?.cardActiveList?.findIndex((item) => item.isActive)
  const { primaryColor } = useRecoilValue(iRPalette)
  const {
    palette: { home }
  } = useTheme()

  return (
    <LayoutThreeIR
      sxContainer={{
        background: home.ir_white,
        overflow: 'hidden',
        height: 1,
        position: 'relative'
      }}
    >
      sdfds
    </LayoutThreeIR>
  )
}

export default Layout_3_AdvMarketing
