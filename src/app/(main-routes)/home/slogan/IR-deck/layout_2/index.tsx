'use client'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { remConvert } from '@/utils/convert-to-rem'
import { Typography } from '@/elements'
import { LayoutTwoIR } from '@/components/home/layout-IR'
import { iRPalette } from '@/atoms/home/stepper'
import { Slogan_Step4_Type } from '@/types/slogan.type'

interface ILayout2SloganProps {
  data?: Slogan_Step4_Type
}

const Layout_2_Slogan = ({ data }: ILayout2SloganProps) => {
  // Get color.
  const {
    palette: { home }
  } = useTheme()

  const { primaryColor } = useRecoilValue(iRPalette)

  return (
    data && (
      <LayoutTwoIR
        sxContainer={{
          display: 'flex',
          background: 'linear-gradient(180deg, rgba(60, 130, 249, 0.00) 38%, #3C82F9 100%), #FFF',
          position: 'relative'
        }}
        sxLeft={{
          backgroundColor: home.ir_neutral_alpha10
        }}
      >
        <Box
          component={'div'}
          sx={{
            padding: remConvert('40px 40px 80px')
          }}
        >
          <Typography
            cate='caption_2_semibold'
            sx={{
              fontStyle: 'normal',
              lineHeight: '150%',
              color: primaryColor,
              letterSpacing: '-0.6px'
            }}
          >
            SLOGAN
          </Typography>
          <Box
            component={'div'}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: remConvert('12px')
            }}
          >
            <Typography
              cate='large_title'
              sx={{
                maxWidth: '463px',
                fontStyle: 'normal',
                lineHeight: '120%',
                color: home.ir_black
              }}
            >
              {data?.slogan}
            </Typography>
          </Box>
        </Box>
      </LayoutTwoIR>
    )
  )
}

export default Layout_2_Slogan
