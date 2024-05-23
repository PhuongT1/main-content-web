'use client'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material'
import { LayoutOneIR } from '@/components/home/layout-IR'
import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Slogan_Step4_Type } from '@/types/slogan.type'
import { leftHeaderTitle, leftHeaderSubTitle, rightHeader, txtSlogan } from './style'

interface ILayout1SloganProps {
  data?: Slogan_Step4_Type
}

const Layout_1_Slogan = ({ data }: ILayout1SloganProps) => {
  // Get color.
  const {
    palette: { home }
  } = useTheme()

  return (
    data && (
      <LayoutOneIR
        sxContainer={{
          paddingBottom: remConvert('70px'),
          background: `url(${data.imageURL}) no-repeat top/cover`,
          display: 'flex',
          flexDirection: 'column',
          minHeight: remConvert('595px'),
          position: 'relative'
        }}
        sxChildren={{
          display: 'flex',
          justifyContent: 'center'
        }}
        header={{
          leftItem: {
            title: (
              <Typography sx={{ color: home.ir_white, fontSize: remConvert('12px'), ...leftHeaderTitle }}>
                SLOGAN
              </Typography>
            ),
            subTitle: (
              <Typography cate='ir_12' sx={{ color: home.ir_white, ...leftHeaderSubTitle }}>
                브랜드 정체성
              </Typography>
            )
          },
          centerItem: { title: <></>, subTitle: <></> },
          rightItem: (
            <Typography cate='ir_12_bold' sx={{ letterSpacing: -0.6, color: home.ir_white, ...rightHeader }}>
              SCHUMPETER <br />
              PROGRAM
            </Typography>
          )
        }}
      >
        <Box
          component={'div'}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: remConvert('12px'),
            minHeight: remConvert('46px')
          }}
        >
          <Box
            component={'div'}
            sx={{
              position: 'absolute',
              top: '0%',
              left: '0%',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(25, 26, 28, 0.5)'
            }}
          />
          <Typography cate='title_2_bold' sx={{ color: home.ir_white, fontSize: remConvert('32px'), ...txtSlogan }}>
            {data.slogan}
          </Typography>
        </Box>
      </LayoutOneIR>
    )
  )
}

export default Layout_1_Slogan
