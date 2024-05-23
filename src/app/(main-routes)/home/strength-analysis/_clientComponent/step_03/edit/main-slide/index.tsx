import { Box, IconButton, useTheme } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import 'react-multi-carousel/lib/styles.css'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import Slide1 from '../../components/slide-01'
import Slide4 from '../../components/slide-04'
import Slide3 from '../../components/slide-03'
import Slide2 from '../../components/slide-02'
import Slide5 from '../../components/slide-05'

import styles from './main-slide.module.scss'
import { useRecoilState } from 'recoil'
import { activeSlider } from '@/atoms/home/strength-analysis'
import { listenEvent } from '@/utils/events'
import { SnapItem, SnapList, useScroll, useVisibleElements } from 'react-snaplist-carousel'
import { remConvert } from '@/utils/convert-to-rem'

type Props = {}

const slideList = [Slide1, Slide2, Slide3, Slide4, Slide5]

export default function MainSlide({}: Props) {
  const {
    palette: { home }
  } = useTheme()
  const snapListRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useRecoilState(activeSlider)

  const selectedIndex = useVisibleElements({ ref: snapListRef, debounce: 10 }, (elements) => elements[0])

  const goToSnapItem = useScroll({ ref: snapListRef })

  useEffect(() => {
    listenEvent('CHANGE_THUMB_SLIDER', (e: CustomEventInit) => {
      const { detail } = e
      setActiveSlide(detail.index)
      goToSnapItem?.(detail.index)
    })
  }, [])

  useEffect(() => {
    if (boxRef.current) {
      const width = boxRef.current.clientWidth
      const newHeight = width * 1.41512605042
      boxRef.current.style.height = `${newHeight}px`
    }
  }, [boxRef.current])

  return (
    <Box
      ref={boxRef}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      component={'div'}
      sx={{
        minWidth: 545,
        maxWidth: '100%'
      }}
      gap={remConvert('32px')}
    >
      <SnapList
        tabIndex={0}
        role='region' // context for screen readers
        aria-label='my awesome snaplist' // for screen readers to read out loud on focus
        width='100%'
        height='100%'
        ref={snapListRef}
        style={{
          borderRadius: remConvert('10px')
        }}
        direction='horizontal'
      >
        {slideList.map((Slide, index) => {
          return (
            <SnapItem width='100%' margin={{ left: '4px', right: '4px' }} key={index} snapAlign='center'>
              <Slide />
            </SnapItem>
          )
        })}
      </SnapList>
      <Box component={'div'} display={'inline-flex'} gap={remConvert('24px')}>
        <IconButton
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            width: 44,
            height: 44,
            backgroundColor: home.gray200
          }}
          disabled={selectedIndex === 0}
          onClick={() => goToSnapItem(selectedIndex - 1)}
        >
          <ArrowBackIos viewBox='-8 -5 37 35' fontSize='medium' />
        </IconButton>
        <IconButton
          sx={{
            width: 44,
            height: 44,
            backgroundColor: home.gray200
          }}
          disabled={selectedIndex === 4}
          onClick={() => goToSnapItem(selectedIndex + 1)}
        >
          <ArrowForwardIos viewBox='-8 -5 37 35' fontSize='medium' />
        </IconButton>
      </Box>
    </Box>
  )
}
