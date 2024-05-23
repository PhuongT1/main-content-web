import { LayoutOneIR } from '@/components/home/layout-IR'
import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import bg from '@/assets/images/naming/bg_layout_1.png'
import { DataNamingIR } from '@/types/naming.type'
import { useAdvMarketingDataIR } from '../../use-advertisement-marketing'
import { IFormValuesMarketingGoals } from '@/types/advertisement-marketing.type'

const Layout_1_AdvMarketing = () => {
  const {
    palette: { home }
  } = useTheme()

  return (
    <LayoutOneIR
      sxContainer={{
        paddingBottom: remConvert('100px'),
        background: `${home.ir_white} url(${bg.src}) no-repeat top/cover`,
        display: 'flex',
        flexDirection: 'column'
      }}
      sxChildren={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
      header={{
        centerItem: {
          title: '브랜드 네이밍',
          subTitle: '우리 기업의 브랜드 정체성을 설명해주세요.'
        }
      }}
    >
      zczc
    </LayoutOneIR>
  )
}

export default Layout_1_AdvMarketing
