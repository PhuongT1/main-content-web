import { activeSlider } from '@/atoms/home/strength-analysis'
import ImageItem from '@/components/home/image'
import { remConvert } from '@/utils/convert-to-rem'
import { sendEvent } from '@/utils/events'
import { Button, SxProps, Theme, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import React, { useRef } from 'react'

export type SliderBaseProps = {
  active?: boolean
  children: React.ReactNode
  isPreview?: boolean
  src?: string | StaticImport
  indexSlider?: number
  sxBoxWrapper?: SxProps
}

export default function SlideWrapper({ active, isPreview, src, children, indexSlider, sxBoxWrapper }: SliderBaseProps) {
  const {
    palette: { home }
  } = useTheme()

  const ele = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    sendEvent('CHANGE_THUMB_SLIDER', { index: indexSlider })
    if (ele.current) {
      ele.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    }
  }

  if (isPreview && src) {
    return (
      <Button
        component={'button'}
        onClick={handleClick}
        ref={ele}
        sx={{
          padding: 0,
          borderRadius: remConvert('10px'),
          filter: active ? 'brightness(100%)' : 'brightness(60%)',
          width: '100%',
          outline: 'none',
          border: active ? `3px solid ${home.blue500}` : 'none'
        }}
      >
        <ImageItem width={200} height={1} alt='image' src={src} />
      </Button>
    )
  }
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      p={remConvert('40px')}
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: home.base_white,
        border: active ? `3px solid ${home.blue500}` : 'none',
        color: home.dark_blue700,
        ...sxBoxWrapper
      }}
    >
      {children}
    </Box>
  )
}
