import { Box, Grid, useTheme } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import styles from './color-detail.module.scss'
import CardItem from '@/components/home/card-item'
import { PhotoshopPicker } from 'react-color'
import Popover from '@mui/material/Popover'
import PlusColorPickIcon from '@/assets/icons/logo/plus-color-pick'
import { useRecoilValue } from 'recoil'
import { step1 } from '@/atoms/logo'
import * as _ from 'lodash'
export interface Props {
  colors: any
  sendData: any
}

const ColorDetail: FC<Props> = ({ colors, sendData }) => {
  const [tabActive, setTabActive] = useState(1)
  const [cardActive, setCardActive] = useState<any>()
  const [colorPick1, setColorPick1] = useState('')
  const [colorPick2, setColorPick2] = useState('')
  const [colorPick3, setColorPick3] = useState('')
  const [colorPickActive, setColorPickActive] = useState<number>()

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const data = useRecoilValue(step1)
  useEffect(() => {
    if (!_.isEmpty(data.logoColorDetailSection)) {
      if (data.logoColorDetailSection?.id) {
        setCardActive(
          colors[data.logoColorDetailSection?.type || ''].findIndex(
            (color: any) => color.id === data.logoColorDetailSection?.id
          )
        )
        setTabActive(data.logoColorDetailSection?.type === '2가지' ? 1 : 2)
      } else {
        console.log(data)
        setColorPick1(data.logoColorDetailSection?.color1)
        setColorPick2(data.logoColorDetailSection?.color2)
        setColorPick3(data.logoColorDetailSection?.color3)
        setTabActive(data.logoColorDetailSection?.type === '2가지' ? 1 : 2)

        setCardActive(null)
      }
    } else {
      setCardActive('')
      setTabActive(1)
    }
  }, [data.logoColorDetailSection])

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover1' : undefined

  const {
    palette: { home }
  } = useTheme()

  const handleChangeComplete = (color: any) => {
    if (colorPickActive === 1) {
      setColorPick1(color.hex)
    }
    if (colorPickActive === 2) {
      setColorPick2(color.hex)
    }
    if (colorPickActive === 3) {
      setColorPick3(color.hex)
    }
    const colors: any = {
      color1: colorPick1,
      color2: colorPick2
    }
    if (colorPick3) {
      colors.color3 = colorPick3
    }
    sendData('logoColorDetailSection', colors)
  }

  return (
    <Box component={'div'} style={{ background: home.gray400 }} className={styles.colorDetail}>
      <Box component={'div'} className={styles.tabs}>
        <Box
          onClick={() => {
            setTabActive(1)
            setColorPick1(''), setColorPick2(''), setColorPick3('')
          }}
          component={'span'}
          className={styles.tab}
          style={{
            color: tabActive === 1 ? home.mint500 : home.gray100,
            borderBottom: tabActive === 1 ? `2px solid ${home.mint500}` : ''
          }}
        >
          2가지 색상
        </Box>
        <Box
          onClick={() => {
            setTabActive(2), setColorPick1(''), setColorPick2(''), setColorPick3('')
          }}
          component={'span'}
          className={styles.tab}
          style={{
            color: tabActive === 2 ? home.mint500 : home.gray100,
            borderBottom: tabActive === 2 ? `2px solid ${home.mint500}` : ''
          }}
        >
          3가지 색상
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12 / 5}>
          <CardItem
            sxCard={{ backgroundColor: home.gray300 }}
            onClick={() => {
              setCardActive(null)
              sendData('logoColorDetailSection', { color1: colorPick1, color2: colorPick2, color3: colorPick3 })
            }}
            icon='radio'
            isActive={cardActive === null}
            cardItem={{
              title: (
                <Box component={'div'} className={styles.colors}>
                  <Box
                    aria-describedby={id}
                    onClick={(event) => {
                      handleClick(event)
                      setColorPickActive(1)
                    }}
                    style={{ backgroundColor: colorPick1 || home.gray200, border: 'none' }}
                    className={styles.color}
                    component={'button'}
                  >
                    {colorPick1 ? null : (
                      <Box component={'div'} className={styles.colorPickText} style={{ color: home.gray100 }}>
                        <PlusColorPickIcon />
                        <Box>직접</Box>
                      </Box>
                    )}
                  </Box>
                  <Box
                    aria-describedby={id}
                    onClick={(event) => {
                      handleClick(event)
                      setColorPickActive(2)
                    }}
                    style={{ backgroundColor: colorPick2 || home.gray200, border: 'none' }}
                    className={styles.color}
                    component={'button'}
                  >
                    {colorPick2 ? null : (
                      <Box component={'div'} className={styles.colorPickText} style={{ color: home.gray100 }}>
                        <PlusColorPickIcon />
                        <Box>직접</Box>
                      </Box>
                    )}
                  </Box>
                  {tabActive !== 1 ? (
                    <Box
                      aria-describedby={id}
                      onClick={(event) => {
                        handleClick(event)
                        setColorPickActive(3)
                      }}
                      style={{ backgroundColor: colorPick3 || home.gray200, border: 'none' }}
                      className={styles.color}
                      component={'button'}
                    >
                      {colorPick3 ? null : (
                        <Box component={'div'} className={styles.colorPickText} style={{ color: home.gray100 }}>
                          <PlusColorPickIcon />
                          <Box>직접</Box>
                        </Box>
                      )}
                    </Box>
                  ) : null}
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                  >
                    <PhotoshopPicker
                      onAccept={() => setAnchorEl(null)}
                      onCancel={() => setAnchorEl(null)}
                      color={colorPickActive === 1 ? colorPick1 : colorPickActive === 2 ? colorPick2 : colorPick3}
                      onChangeComplete={handleChangeComplete}
                    />
                  </Popover>
                </Box>
              )
            }}
          />
        </Grid>

        {colors[tabActive === 1 ? '2가지' : '3가지']?.map((item: any, index: number) => {
          return (
            <Grid key={index} item xs={12 / 5}>
              <CardItem
                sxCard={{ backgroundColor: home.gray300 }}
                onClick={() => {
                  setCardActive(index), sendData('logoColorDetailSection', item)
                }}
                icon='radio'
                isActive={cardActive === index}
                cardItem={{
                  title: (
                    <Box component={'div'} className={styles.colors}>
                      <Box
                        style={{ backgroundColor: '#' + item.color1 }}
                        className={styles.color}
                        component={'div'}
                      ></Box>
                      <Box
                        style={{ backgroundColor: '#' + item.color2 }}
                        className={styles.color}
                        component={'div'}
                      ></Box>
                      {!!item.color3 && (
                        <Box
                          style={{ backgroundColor: '#' + item.color3 }}
                          className={styles.color}
                          component={'div'}
                        ></Box>
                      )}
                    </Box>
                  )
                }}
              />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default ColorDetail
