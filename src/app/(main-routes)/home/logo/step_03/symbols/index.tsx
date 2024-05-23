import { Box, Grid, Popover, useTheme } from '@mui/material'
import styled from './symbols.module.scss'
import { Typography } from '@/elements'
import { useState } from 'react'
import SquareIcon from '@/assets/icons/logo/suqare-icon'
import TriangleIcon from '@/assets/icons/logo/triangle-icon'
import CircleIcon from '@/assets/icons/logo/circle-icon'
import StarIcon from '@/assets/icons/logo/star-icon'
import PaletteButton from '@/assets/icons/logo/palette-button'
import { useQuery } from '@tanstack/react-query'
import { fetchSymbols } from '@/services/logo.service'
import CardOption from '../../card-option'
import { PhotoshopPicker } from 'react-color'
import Image from 'next/image'

const symbolTabs = [
  { label: '네모', icon: SquareIcon },
  { label: '세모', icon: TriangleIcon },
  { label: '동그라미', icon: CircleIcon },
  { label: '기타', icon: StarIcon }
]

const paletteColors = [
  '#FF0202',
  '#FF820E',
  '#FFD12F',
  '#8BD131',
  '#0CBE93',
  '#1FC9FF',
  '#1F6BFF',
  '#1814CF',
  '#9C1FFF',
  '#ED1FFF',
  '#FFA0E5',
  '#000000'
]

const Symbols = ({ onSelectSymbol, onFillColor, logoDesign }: any) => {
  const [tabActive, setTabActive] = useState<any>(symbolTabs[0])
  const [symbolActive, setSymbolActive] = useState<any>(logoDesign.htmlSvg || {})
  const [photoshopPicker, setPhotoshopPicker] = useState(logoDesign.color || '')

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover1' : undefined

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChangeComplete = (color: any) => {
    onFillColor(color.hex)
    setPhotoshopPicker(color.hex)
  }

  const {
    palette: { home }
  } = useTheme()

  const { data: symbols } = useQuery({
    queryKey: ['fetch-symbols', tabActive.label],
    queryFn: () => fetchSymbols({ symbolType: tabActive.label })
  })

  const getSvgFromUrl = async (symbol: any) => {
    onSelectSymbol(symbol)
    setSymbolActive(symbol)
  }
  return (
    <>
      <Box
        sx={{
          marginTop: '24px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          padding: '0 32px'
        }}
      >
        <Box className={styled.symbolTabs}>
          {symbolTabs.map((tab: any, index: number) => {
            return (
              <Box component={'div'} onClick={() => setTabActive(tab)} key={index} className={`${styled.tab}`}>
                <tab.icon rectProps={{ fill: tabActive.label === tab.label ? '#44BDBD' : '  #9498A3' }} />
                <Typography
                  cate='body_2_semibold'
                  style={{ color: tabActive.label === tab.label ? home.mint500 : home.gray100, cursor: 'pointer' }}
                >
                  {tab.label}
                </Typography>
              </Box>
            )
          })}
        </Box>
        <Box
          aria-describedby={id}
          onClick={(event) => {
            handleClick(event)
          }}
          sx={{ position: 'absolute', right: '32px', top: '0', cursor: 'pointer' }}
        >
          <PaletteButton />
        </Box>
      </Box>
      <Box sx={{ height: '379px', overflow: 'scroll', margin: '24px 32px 0px 32px', padding: '32px 22px 0px 22px' }}>
        <Grid container spacing={1}>
          {symbols?.data.map((symbol: any, index: number) => {
            return (
              <Grid
                onClick={() => {
                  getSvgFromUrl(symbol)
                }}
                key={index}
                item
                xs={1}
              >
                <CardOption
                  backgroundColorDefault={'#fff'}
                  backgroundColorActive='rgba(60, 130, 249, 0.10)'
                  active={symbol.id === symbolActive.id}
                  boxShadowWidth='2px'
                >
                  <Box
                    sx={{
                      padding: '6px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    <Image src={symbol.url} width={50} height={50} alt='' />
                  </Box>
                </CardOption>
              </Grid>
            )
          })}
        </Grid>
      </Box>
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
          color={photoshopPicker}
          onChangeComplete={handleChangeComplete}
        />
      </Popover>
    </>
  )
}

export default Symbols
