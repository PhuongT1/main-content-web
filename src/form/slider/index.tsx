import { remConvert } from '@/utils/convert-to-rem'
import { Box, Slider, useTheme } from '@mui/material'
import { Controller, FieldPath, FieldValues } from 'react-hook-form'
import { SliderElementProps, labelActiveStyle, positionCenterStyle } from './slider.type'
import { Marks } from '@/components/home/analyzing'
import { useState, useEffect } from 'react'
import { RadioEllipse, RadioEllipseActive } from '@/assets/icons/radio-ellipse'
import ReactDOMServer from 'react-dom/server'

export default function SliderItem<T, TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  sliderProps,
  onChangeCustom,
  valueCustom,
  markIcon,
  thumbIcon,
  labelMark,
  sxSlider,
  sxLabel,
  ...controllerProp
}: SliderElementProps<T, TFieldValues, TName>) {
  const {
    palette: { home }
  } = useTheme()
  const [marks, setMarks] = useState<Marks[]>()

  useEffect(() => {
    if (!sliderProps?.step || !sliderProps?.max || !!sliderProps?.marks) return
    const { max, step } = sliderProps
    const markItem: Marks[] = []

    Array.from({ length: max / step }, (_obj, index) => {
      markItem.push({
        value: (index + 1) * step,
        label: (labelMark && labelMark[index]) || (index + 1) * step
      })
    })

    setMarks(markItem)
  }, [sliderProps?.max, sliderProps?.step, sliderProps?.marks])

  const iconActive = (
    <RadioEllipseActive
      circleProps={{
        fill: '#fff',
        stroke: home.blue500
      }}
      circlePropsChild={{
        fill: home.blue500
      }}
      {...thumbIcon}
    />
  )

  const renderThumb = (instance: HTMLSpanElement | null) => {
    if (!instance?.querySelector('#thumbSlider')) {
      const div = document.createElement('div')
      const iconThumb = ReactDOMServer.renderToString(iconActive)
      div.innerHTML = iconThumb
      instance?.appendChild(div)
    }
  }

  return (
    <Controller
      {...controllerProp}
      render={({ field: { value, onChange } }) => {
        return (
          <Slider
            aria-label='Slider'
            marks={marks}
            {...sliderProps}
            className={[
              sliderProps?.className,
              sliderProps?.valueLabelDisplay === 'on' && 'MuiSlider-showLabelCustom',
              !!value && 'MuiSlider-activeCustom'
            ].join(' ')}
            value={valueCustom || Number(value ?? 0)}
            onChangeCommitted={(_event, data) => (onChangeCustom ? onChangeCustom(data) : onChange(data))}
            track={false}
            style={{
              marginBottom: 0
            }}
            sx={{
              '.MuiSlider-thumb': {
                pointerEvents: 'none',
                '&::before,::after': {
                  visibility: 'hidden'
                },
                '.MuiSlider-valueLabelOpen': {
                  display: 'none'
                },
                svg: {
                  ...positionCenterStyle
                }
              },
              '.MuiSlider-markLabel': {
                scale: 0,
                background: home.blue500,
                borderRadius: remConvert('99px'),
                padding: remConvert('3px 10px'),
                fontSize: remConvert('12px'),
                color: home.gray50
              },
              '&.MuiSlider-showLabelCustom': {
                '.MuiSlider-markLabel': {
                  ...labelActiveStyle,
                  background: 'transparent',
                  color: home.gray200,
                  fontSize: remConvert('12px'),
                  ...sxLabel
                }
              },
              '&.MuiSlider-activeCustom': {
                '.MuiSlider-markActive': {
                  '+ span': {
                    color: home.gray0
                  }
                }
              },
              '.MuiSlider-mark': {
                width: 0,
                height: 0,
                transform: 'translateY( -50%)',
                '.icon-thumb': {
                  display: 'none'
                },
                '&:hover': {
                  '.icon-mark': {
                    display: 'none'
                  },
                  '.icon-thumb': {
                    display: 'flex'
                  },
                  '+ span': labelActiveStyle
                }
              },
              ...sxSlider
            }}
            slotProps={{
              mark: {
                children: (
                  <Box
                    component={'span'}
                    style={{
                      ...positionCenterStyle,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Box component={'span'} className='icon-mark' display={'inline-flex'}>
                      <RadioEllipse
                        circleProps={{
                          fill: home.gray100,
                          stroke: home.gray200
                        }}
                        {...markIcon}
                      />
                    </Box>
                    <Box component={'span'} className='icon-thumb'>
                      {iconActive}
                    </Box>
                  </Box>
                )
              },
              thumb: {
                ref: renderThumb,
                style: {
                  color: 'transparent',
                  display: value ? 'flex' : 'none'
                }
              },
              rail: {
                style: {
                  color: home.gray200,
                  height: remConvert('2px')
                }
              }
            }}
          />
        )
      }}
    />
  )
}
