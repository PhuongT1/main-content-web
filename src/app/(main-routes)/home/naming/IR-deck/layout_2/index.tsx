import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import { LayoutTwoIR } from '@/components/home/layout-IR'
import { iRPalette } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { DataNamingIR } from '@/types/naming.type'
import { useLanguage } from '@/hooks/use-language'

const Layout_2_Naming = ({ data }: DataNamingIR) => {
  const {
    palette: { home }
  } = useTheme()
  const { dict } = useLanguage()
  const { primaryColor } = useRecoilValue(iRPalette)

  const indexActive = data?.cardActiveList?.findIndex((item) => item.isActive)

  return (
    <LayoutTwoIR
      sxContainer={{
        display: 'flex',
        background: primaryColor
      }}
    >
      <Box
        component={'div'}
        sx={{
          padding: remConvert('40px 40px 100px'),
          height: 1
        }}
      >
        <Box
          component={'div'}
          sx={{
            position: 'relative',
            height: 1
          }}
        >
          <Typography
            cate='body_2_semibold'
            sx={{
              letterSpacing: '-0.9px',
              marginBottom: remConvert('6px'),
              color: home.ir_white
            }}
          >
            BRAND IDENTITY
          </Typography>
          <Typography cate='title_60' fontWeight={700}>
            {dict.naming_ir_layout_2_3_sub_title}
          </Typography>
          <Typography
            cate='link_20_bold'
            sx={{
              fontSize: remConvert('110px'),
              fontWeight: 300,
              color: home.ir_neutral_25,
              lineHeight: '90%',
              opacity: '0.06',
              marginTop: remConvert('74px')
            }}
          >
            AaBbCcDdEe <br />
            FeGgHhIiJjKk <br />
            LlMmNnOoPp <br />
            QqRrSsTtUu <br />
            VvWwXxYyZz
          </Typography>
          <Box
            component={'div'}
            sx={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
              gap: remConvert('12px')
            }}
          >
            <Typography
              cate='title_1_bold'
              sx={{
                fontSize: remConvert('54px'),
                color: home.ir_white
              }}
            >
              {data?.cardActiveList && data?.cardActiveList[indexActive || 0]?.name}
            </Typography>
            <Typography
              cate='title_1_bold'
              sx={{
                lineHeight: '130%',
                fontSize: remConvert('48px'),
                color: home.ir_white
              }}
            >
              {data?.cardActiveList && data?.cardActiveList[indexActive || 0]?.affectTitle}
            </Typography>
          </Box>
        </Box>
      </Box>
    </LayoutTwoIR>
  )
}

export default Layout_2_Naming
