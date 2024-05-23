import { LayoutOneIR } from '@/components/home/layout-IR'
import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import bg from '@/assets/images/naming/bg_layout_1.png'
import { DataNamingIR } from '@/types/naming.type'
import { useLanguage } from '@/hooks/use-language'

const Layout_1_Naming = ({ data }: DataNamingIR) => {
  const indexActive = data?.cardActiveList?.findIndex((item) => item.isActive)
  const {
    palette: { home }
  } = useTheme()
  const { dict } = useLanguage()

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
          title: dict.naming_ir_layout_1_title,
          subTitle: dict.naming_ir_layout_1_sub_title
        }
      }}
    >
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          flex: '1 0 0'
        }}
      >
        <Typography cate='title_2_bold' fontSize={remConvert('54px')} color={home.ir_black}>
          {data?.cardActiveList && data?.cardActiveList[indexActive || 0]?.name}
        </Typography>
        <Typography
          cate='title_2_bold'
          sx={{
            color: home.ir_neutral_alpha20,
            fontSize: remConvert('48px'),
            lineHeight: '130%'
          }}
        >
          {data?.cardActiveList && data?.cardActiveList[indexActive || 0]?.affectTitle}
        </Typography>
      </Box>
    </LayoutOneIR>
  )
}

export default Layout_1_Naming
