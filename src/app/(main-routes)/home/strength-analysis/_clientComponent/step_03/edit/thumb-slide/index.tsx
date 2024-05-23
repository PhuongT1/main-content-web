import home from '@/containers/home'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Grid, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Slide1 from '../../components/slide-01'
import Slide2 from '../../components/slide-02'
import Slide3 from '../../components/slide-03'
import Slide4 from '../../components/slide-04'
import Slide5 from '../../components/slide-05'
import { useRecoilValue } from 'recoil'
import { activeSlider } from '@/atoms/home/strength-analysis'

type Props = {}

const thumbList = [Slide1, Slide2, Slide3, Slide4, Slide5]

export default function ListSlide({}: Props) {
  const {
    palette: { home }
  } = useTheme()
  const activeSlide = useRecoilValue(activeSlider)

  return (
    <Box
      component={'div'}
      sx={{
        width: '100%',
        borderRadius: remConvert('10px'),
        padding: remConvert('32px'),
        backgroundColor: home.gray300,
        maxHeight: '100%'
      }}
    >
      <Grid display={'flex'} flexDirection={'row'} height={'100%'} direction={'row'} container gap={'30px'}>
        {thumbList.map((Slider, index) => (
          <Grid item xs={12} height={'calc(20% - 24px)'} key={index}>
            <Slider isPreview active={activeSlide === index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
