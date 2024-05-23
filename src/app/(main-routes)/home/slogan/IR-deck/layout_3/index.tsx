'use client'
import React from 'react'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import { useTheme } from '@mui/material'
import { Box } from '@mui/material'
import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { LayoutThreeIR } from '@/components/home/layout-IR'
import { Slogan_Step4_Type } from '@/types/slogan.type'
import QuoteIcon from '@/assets/icons/slogan/quote'
import { iRPalette } from '@/atoms/home/stepper'

interface ILayout2SloganProps {
  data?: Slogan_Step4_Type
}

const Layout_3_Slogan = ({ data }: ILayout2SloganProps) => {
  // Get color.
  const {
    palette: { home }
  } = useTheme()

  const { primaryColor } = useRecoilValue(iRPalette)

  return (
    data && (
      <LayoutThreeIR
        sxContainer={{
          height: '100%',
          background: home.ir_white,
          overflow: 'hidden'
        }}
        sxChildren={{
          height: '100%',
          width: 'auto',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        header={{
          leftContent: (
            <Typography
              sx={{
                color: home.ir_white,
                fontSize: remConvert('12px'),
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '150%',
                letterSpacing: '-0.6px'
              }}
            >
              SLOGAN
            </Typography>
          )
        }}
      >
        <Box
          component={'div'}
          sx={{
            minWidth: 620,
            minHeight: 320,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: remConvert('40px')
          }}
        >
          {data.imageURL && (
            <Image
              src={data.imageURL}
              width={1000}
              height={1000}
              alt='slogan image'
              style={{
                width: '240px',
                height: '320px',
                objectFit: 'cover',
                borderRadius: remConvert('16px'),
                boxShadow: '0px 10px 10px 0px rgba(0, 0, 0, 0.10)'
              }}
            />
          )}
          <Box
            component={'div'}
            sx={{
              width: 340,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '20px'
            }}
          >
            <QuoteIcon pathProps={{ fill: primaryColor }} />

            <Typography
              cate='large_title'
              sx={{
                color: home.ir_black,
                fontSize: remConvert('48px'),
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '120%',
                letterSpacing: remConvert('2.4px')
              }}
            >
              {data.slogan}
            </Typography>

            <Box
              component={'div'}
              sx={{
                display: 'inline-block',
                transform: 'rotate(180deg)'
              }}
            >
              <QuoteIcon pathProps={{ fill: primaryColor }} />
            </Box>
          </Box>
        </Box>
      </LayoutThreeIR>
    )
  )
}

export default Layout_3_Slogan
