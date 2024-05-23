import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import { LayoutTwoIR } from '@/components/home/layout-IR'
import { iRPalette } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { DataNamingIR } from '@/types/naming.type'

const Layout_2_AdvMarketing = ({ data }: DataNamingIR) => {
  const {
    palette: { home }
  } = useTheme()
  const { primaryColor } = useRecoilValue(iRPalette)

  const indexActive = data?.cardActiveList?.findIndex((item) => item.isActive)

  return (
    <LayoutTwoIR
      sxContainer={{
        display: 'flex',
        background: primaryColor
      }}
    >
      dss
    </LayoutTwoIR>
  )
}

export default Layout_2_AdvMarketing
