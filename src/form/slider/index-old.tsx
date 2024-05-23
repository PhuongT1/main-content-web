import { remConvert } from '@/utils/convert-to-rem'
import { Slider, SxProps, useTheme } from '@mui/material'
import { Controller, FieldPath, FieldValues } from 'react-hook-form'
import { SliderElementProps } from './slider.type'
import { Marks } from '@/components/home/analyzing'
import { useState, useEffect } from 'react'

export default function SliderItem<T, TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  sliderProps,
  onChangeCustom,
  valueCustom,
  ...controllerProp
}: SliderElementProps<T, TFieldValues, TName>) {
  const {
    palette: { home }
  } = useTheme()

  const [marks, setMarks] = useState<Marks[]>()

  useEffect(() => {
    if (!sliderProps) return
    const { max, step } = sliderProps
    if (!max || !step) return
    const markItem: Marks[] = []

    Array.from({ length: max / step }, (_obj, index) => {
      markItem.push({
        value: (index + 1) * step,
        label: (index + 1) * step
      })
    })
    setMarks(markItem)
  }, [sliderProps?.max])

  const positionCenterStyle: SxProps = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%'
  }

  return (
    <Controller
      {...controllerProp}
      render={({ field: { value, onChange } }) => {
        return (
          <Slider
            {...sliderProps}
            aria-label='Analyzing Slider'
            valueLabelDisplay='auto'
            marks={marks}
            value={valueCustom || value || 0}
            onChangeCommitted={(_event, data) => (onChangeCustom ? onChangeCustom(data) : onChange(data))}
            track={false}
            style={{
              marginBottom: 0
            }}
            sx={{
              '.MuiSlider-thumb': {
                pointerEvents: 'none',
                '.MuiSlider-valueLabelOpen': {
                  display: 'none'
                },
                '&:before': {
                  width: remConvert('15px'),
                  height: remConvert('15px'),
                  background: home.gray50,
                  ...positionCenterStyle
                },
                '&:after': {
                  width: remConvert('10px'),
                  height: remConvert('10px'),
                  backgroundColor: home.blue500,
                  ...positionCenterStyle
                }
              },
              '.MuiSlider-valueLabel': {
                background: home.blue500,
                borderRadius: remConvert('99px'),
                padding: remConvert('3px 10px'),
                fontSize: remConvert('12px'),
                minWidth: remConvert('28px'),
                transition: 'none',
                '&:before': {
                  display: 'none'
                }
              },
              '.MuiSlider-markLabel': {
                transform: 'translate(-50%, -240%)',
                scale: 0,
                background: home.blue500,
                borderRadius: remConvert('99px'),
                padding: remConvert('3px 10px'),
                fontSize: remConvert('12px'),
                color: home.gray50
              },
              '.MuiSlider-mark': {
                '&:hover': {
                  '> div': {
                    backgroundColor: `${home.blue500} !important`,
                    display: value ? 'flex' : 'none',
                    width: `${remConvert('24px')} !important`,
                    height: `${remConvert('24px')} !important`,
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: `${remConvert('-11px')} !important`,
                    marginLeft: `${remConvert('-11px')} !important`,
                    position: 'relative',
                    '> div': {
                      width: `${remConvert('16px')} !important`,
                      height: `${remConvert('16px')} !important`,
                      background: `${home.gray50} !important`,
                      lineHeight: 'none',
                      ...positionCenterStyle,
                      '> div': {
                        width: `${remConvert('10px')}`,
                        height: `${remConvert('10px')}`,
                        background: `${home.blue500} !important`,
                        ...positionCenterStyle,
                        borderRadius: '50%',
                        lineHeight: 'none'
                      }
                    }
                  },
                  '+ span': {
                    scale: '1'
                  }
                }
              }
            }}
            slotProps={{
              mark: {
                children: (
                  <div
                    style={{
                      margin: remConvert('-9px'),
                      backgroundColor: home.gray200,
                      width: remConvert('18px'),
                      height: remConvert('18px'),
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: home.gray100,
                        borderRadius: '50%'
                      }}
                    >
                      <div></div>
                    </div>
                  </div>
                )
              },
              thumb: {
                style: {
                  color: home.blue500,
                  display: value ? 'flex' : 'none',
                  width: remConvert('24px'),
                  height: remConvert('24px'),
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center'
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
