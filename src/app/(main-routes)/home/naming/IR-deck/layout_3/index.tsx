import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import { LayoutThreeIR } from '@/components/home/layout-IR'
import React, { CSSProperties } from 'react'
import { DataNamingIR } from '@/types/naming.type'
import { iRPalette } from '@/atoms/home/stepper'
import { useRecoilValue } from 'recoil'
import { getColorAlpha } from '@/utils/styles'
import { useLanguage } from '@/hooks/use-language'

const Layout_3_Naming = ({ data }: DataNamingIR) => {
  const indexActive = data?.cardActiveList?.findIndex((item) => item.isActive)
  const { primaryColor } = useRecoilValue(iRPalette)
  const {
    palette: { home }
  } = useTheme()

  const { dict } = useLanguage()

  const bgLeftContent: CSSProperties = {
    color: home.ir_white,
    WebkitTextStrokeColor: getColorAlpha(primaryColor, home.ir_alpha6),
    WebkitTextStrokeWidth: remConvert('1.3px')
  }

  const bgRightContent: CSSProperties = {
    color: getColorAlpha(primaryColor, home.ir_alpha6)
  }

  const styleCommon: CSSProperties = {
    fontWeight: 800,
    width: '50%',
    fontSize: remConvert('61px'),
    lineHeight: '130%'
  }

  const contentBg = () => {
    return Array.from({ length: 4 }, (_, i) => {
      const styleFirst = i % 2 === 0 ? bgLeftContent : bgRightContent
      const styleRight = i % 2 === 0 ? bgRightContent : bgLeftContent

      return (
        <React.Fragment key={i}>
          <Box
            component={'div'}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: remConvert('18px'),
              position: 'relative',
              minHeight: remConvert('46px')
            }}
          >
            <Typography sx={{ ...styleCommon, textAlign: 'right' }}>
              <Box
                component={'span'}
                sx={{
                  display: 'inline-block',
                  right: 0,
                  whiteSpace: 'nowrap',
                  textAlign: 'right',
                  ...styleFirst
                }}
              >
                {data?.cardActiveList && data?.cardActiveList[indexActive || 0]?.name}
              </Box>
            </Typography>
            <Typography sx={{ ...styleCommon, textAlign: 'left' }}>
              <Box component={'span'} sx={{ whiteSpace: 'nowrap', ...styleRight }}>
                {data?.cardActiveList && data?.cardActiveList[indexActive || 0]?.name}
              </Box>
            </Typography>
          </Box>
        </React.Fragment>
      )
    })
  }

  return (
    <LayoutThreeIR
      sxContainer={{
        background: home.ir_white,
        overflow: 'hidden',
        height: 1,
        position: 'relative'
      }}
    >
      <Box
        component={'div'}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          flex: '1 0 0',
          padding: remConvert('0 40px 80px')
        }}
      >
        <Typography
          cate='title_2_bold'
          sx={{
            color: home.ir_black,
            textAlign: 'center',
            marginTop: remConvert('32px'),
            marginBottom: remConvert('60px')
          }}
        >
          {dict.naming_ir_layout_2_3_sub_title}
        </Typography>
        <Box
          component={'div'}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: remConvert('12px'),
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '100%'
          }}
        >
          <>{contentBg()}</>
        </Box>
        <Box
          component={'div'}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: remConvert('16px'),
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Typography
            cate='title_1_bold'
            sx={{
              fontSize: remConvert('54px'),
              color: home.ir_black
            }}
          >
            {data?.cardActiveList && data?.cardActiveList[indexActive || 0]?.name}
          </Typography>
          <Typography
            cate='body_2_bold'
            sx={{
              fontWeight: 800,
              fontSize: remConvert('28px'),
              letterSpacing: remConvert('2.8px'),
              color: home.ir_neutral_500,
              textTransform: 'uppercase',
              textAlign: 'center'
            }}
          >
            {data?.cardActiveList && data?.cardActiveList[indexActive || 0]?.affectTitle}
          </Typography>
        </Box>
      </Box>
    </LayoutThreeIR>
  )
}

export default Layout_3_Naming
