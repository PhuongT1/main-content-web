'use client'
import { VolumeDownIcon, VolumeUpIcon } from '@/assets/icons'
import { IconButtonSizes } from '@/elements'
import { Slider as MSlider, SliderProps as MSliderProps, Stack } from '@mui/material'

type SliderProps = {} & MSliderProps

const Slider = ({ value, onChange, min = 0, max = 100, ...rest }: SliderProps) => {
  const curValue = (value as number) || 0

  const onDown = () => {
    if (curValue > min) {
      onChange?.(new Event(''), curValue - 1, 0)
    }
  }
  const onUp = () => {
    if (curValue < max) {
      onChange?.(new Event(''), curValue + 1, 0)
    }
  }
  return (
    <Stack bgcolor='main_grey.gray50' borderRadius={10.5} px={1} spacing={1} direction='row' alignItems='center'>
      <IconButtonSizes btnSize='fit' onClick={onDown}>
        <VolumeDownIcon />
      </IconButtonSizes>
      <MSlider
        value={value}
        onChange={onChange}
        aria-label='Volume'
        slotProps={{
          thumb: {
            style: {
              width: 16,
              height: 16,
              background: '#729afe'
            }
          },
          track: {
            style: {
              background: '#1F1F29',
              borderColor: '#1F1F29'
            }
          },
          rail: {
            style: {
              background: '#ECEFF3',
              borderColor: '#ECEFF3'
            }
          }
        }}
        {...rest}
      />
      <IconButtonSizes btnSize='fit' onClick={onUp}>
        <VolumeUpIcon />
      </IconButtonSizes>
    </Stack>
  )
}

export default Slider
