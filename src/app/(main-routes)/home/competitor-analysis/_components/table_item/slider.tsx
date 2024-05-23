import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTheme, SxProps, SliderOwnProps, Slider as BaseSlider } from '@mui/material'
import { remConvert } from '@/utils/convert-to-rem'

interface Marks {
  value: number
  label?: React.ReactNode
}
interface SliderItemProps {
  name: string
  control: any
  sliderProps?: SliderOwnProps
}

const SliderItem: React.FC<SliderItemProps> = ({ name, control, sliderProps }) => {
  const [marks, setMarks] = useState<Marks[]>()
  const {
    palette: { home }
  } = useTheme()

  const COLOR_BY_INDEX = {
    1: home.red500,
    2: home.mint500,
    3: home.blue500
  }
  const TEXT_BY_INDEX = {
    1: '낮음',
    2: '보통',
    3: '높음'
  }

  const positionCenterStyle: SxProps = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%'
  }

  useEffect(() => {
    if (!sliderProps) return
    const { max, step } = sliderProps
    if (!max || !step) return
    const markItem: Marks[] = []

    Array.from({ length: max / step }, (_obj, index) => {
      markItem.push({
        value: (index + 1) * step,
        label: TEXT_BY_INDEX?.[(index + 1) as 1 | 2 | 3]
      })
    })
    setMarks(markItem)
  }, [sliderProps?.max, sliderProps?.min])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <BaseSlider
            aria-label='Analyzing Slider'
            value={value || 0}
            valueLabelDisplay='auto'
            onChangeCommitted={(_event, data) => onChange(data)}
            marks={marks}
            {...sliderProps}
            track={false}
            style={{ marginBottom: 0 }}
            sx={{
              '.MuiSlider-thumb': {
                '&:before': {
                  width: remConvert('16px'),
                  height: remConvert('16px'),
                  background: home.gray50,
                  ...positionCenterStyle
                },
                '&:after': {
                  width: remConvert('10px'),
                  height: remConvert('10px'),
                  backgroundColor: COLOR_BY_INDEX?.[value as 1 | 3 | 3],
                  ...positionCenterStyle
                }
              },
              '.MuiSlider-valueLabel': {
                display: 'none'
              },
              '.MuiSlider-markLabel': {
                color: home.gray200,
                fontSize: remConvert('12px'),
                top: remConvert('-18px')
              },
              '.MuiSlider-markLabelActive': {
                color: !!value ? home.gray50 : home.gray200
              },
              '.MuiSlider-mark': {
                '&:hover': {
                  '> div': {
                    backgroundColor: `${COLOR_BY_INDEX?.[value as 1 | 2 | 3]} !important`,
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
                        background: `${COLOR_BY_INDEX?.[value as 1 | 2 | 3]} !important`,
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
                  color: COLOR_BY_INDEX?.[value as 1 | 2 | 3],
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

export default SliderItem
