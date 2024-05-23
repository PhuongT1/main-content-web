import { remConvert } from '@/utils/convert-to-rem'
import { Box, Button, useTheme } from '@mui/material'
import React from 'react'
import DoughnutChart from './chart'
import { Typography } from '@/elements'

import banner from '@/assets/images/home/strength-analysis/sa_slide_01.png'
import logo from '@/assets/images/home/strength-analysis/Logo.png'

import SlideWrapper, { SliderBaseProps } from '../slide-wrapper'
import Image from 'next/image'

type Props = {} & Omit<SliderBaseProps, 'children'>

export default function Slide1(props: Props) {
  const {
    palette: { home, main_grey }
  } = useTheme()

  return (
    <SlideWrapper {...props} indexSlider={0} src={banner}>
      <Box component={'div'} display={'flex'} flexDirection={'column'}>
        <Box
          component={'div'}
          width={1}
          display={'flex'}
          justifyContent={'space-between'}
          sx={{
            borderBottom: `2px solid ${main_grey.gray900}`,
            paddingBottom: remConvert('12px')
          }}
        >
          <Typography cate='caption_20' color={home.gray500}>
            Schumpeter Strengths Test
          </Typography>
          <Image src={logo} alt='Logo' objectFit='covert' width={49} height={14} />
        </Box>
        <Box component={'div'} mt={remConvert('68px')} mb={remConvert('55px')}>
          <Button
            disableFocusRipple
            disableElevation
            disableTouchRipple
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '100px',
              mb: remConvert('20px'),
              padding: remConvert('8px 20px'),
              border: `1px solid ${home.base_black}`,
              fontSize: remConvert('14px'),
              color: home.base_black,
              fontWeight: 400,
              lineHeight: '150%',
              '&:hover': {
                border: `1px solid ${home.base_black}`,
                backgroundColor: home.base_white
              }
            }}
            variant='outlined'
            disableRipple
          >
            장점유형 분석
          </Button>
          <Typography cate='sub_title_30' color={home.base_black}>
            상황과 비교대상에 따라 달라지는 강점
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: remConvert('32px'),
              lineHeight: '130%',
              color: home.base_black,
              mt: remConvert('8px')
            }}
          >
            강점유형과 인재유형을
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: remConvert('32px'),
              lineHeight: '130%',
              color: home.base_black,
              mb: remConvert('8px')
            }}
          >
            분석하는 강점검사
          </Typography>
          <Typography cate='sub_title_30' color={home.base_black} fontWeight={400}>
            상황과 비교대상에 따라 달라지는 강점
          </Typography>
        </Box>
      </Box>
      <Box flex={1} display={'flex'} alignItems={'end'} justifyContent={'end'} width={1}>
        <Box width={500}>
          <DoughnutChart
            backgroundColor={['#DF9A3F', '#6BAF58', '#4572B6', '#953272']}
            data={[1, 1, 1, 1]}
            labels={[]}
          />
        </Box>
      </Box>
    </SlideWrapper>
  )
}
