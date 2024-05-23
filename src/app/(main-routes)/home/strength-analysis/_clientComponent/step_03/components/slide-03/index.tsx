import { Box, SxProps, Theme, useTheme } from '@mui/material'
import React from 'react'
import banner from '@/assets/images/home/strength-analysis/sa_slide_03.png'
import SlideWrapper, { SliderBaseProps } from '../slide-wrapper'

type Props = {} & Omit<SliderBaseProps, 'children'>

export default function Slide3(props: Props) {
  const {
    palette: { home }
  } = useTheme()

  return (
    <SlideWrapper {...props} indexSlider={2} src={banner}>
      Slide1
    </SlideWrapper>
  )
}
