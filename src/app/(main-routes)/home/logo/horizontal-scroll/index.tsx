import React, { FC, useEffect } from 'react'
import { Box, useTheme } from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

export interface Props {
  children: React.ReactNode
}

const HorizontalScroll: FC<Props> = ({ children }) => {
  const [hideButtonLeft, setHideButtonLeft] = React.useState(true)
  const [hideButtonRight, setHideButtonRight] = React.useState(false)
  const [sliderWidth, setSliderWidth] = React.useState(0)

  const {
    palette: { home }
  } = useTheme()

  useEffect(() => {
    const hscroll: any = document.getElementById('hscroll')

    setSliderWidth(hscroll.scrollWidth - hscroll.offsetWidth)
  }, [])

  const moveRight = () => {
    const el: any = document.getElementById(`hscroll`)
    el.scrollLeft += 400
  }

  const moveLeft = () => {
    const el: any = document.getElementById(`hscroll`)
    el.scrollLeft -= 400
  }

  const onHScroll = () => {
    const hscroll: any = document.getElementById('hscroll')

    const el: any = hscroll.scrollLeft
    if (el > 0) {
      setHideButtonLeft(false)
    } else {
      setHideButtonLeft(true)
    }
    if (el < sliderWidth) {
      setHideButtonRight(false)
    } else {
      setHideButtonRight(true)
    }
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {!hideButtonLeft && (
        <Box
          onClick={moveLeft}
          sx={{
            cursor: 'pointer',
            width: '44px',
            height: '44px',
            backgroundColor: home.gray400,
            border: `1px solid ${home.gray200}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            position: 'absolute',
            zIndex: '9999',
            left: '-2%',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          <KeyboardArrowLeftIcon sx={{ color: home.gray0 }} />
        </Box>
      )}

      {!hideButtonRight && (
        <Box
          onClick={moveRight}
          sx={{
            cursor: 'pointer',
            width: '44px',
            height: '44px',
            backgroundColor: home.gray400,
            border: `1px solid ${home.gray200}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            position: 'absolute',
            zIndex: '9999',
            right: '-2%',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        >
          <KeyboardArrowRightIcon sx={{ color: home.gray0 }} />
        </Box>
      )}

      <Box
        sx={{ display: 'flex', overflow: 'hidden', scrollBehavior: 'smooth', gap: '20px' }}
        id={`hscroll`}
        onScroll={() => onHScroll()}
      >
        {children}
      </Box>
    </Box>
  )
}

export default HorizontalScroll
