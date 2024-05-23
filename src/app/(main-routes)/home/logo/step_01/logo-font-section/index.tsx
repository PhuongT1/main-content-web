import { Box, Grid, Popover, useTheme } from '@mui/material'
import SectionTitle from '../../section-title'
import styles from './logo-font-section.module.scss'
import PaletteColorIcon from '@/assets/icons/logo/palette-color'
import InputItem from '@/form/input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import DropdownCustom from '../dropdown-custom'
import CardOption from '../../card-option'
import { useRecoilValue } from 'recoil'
import { step1 } from '@/atoms/logo'
import * as _ from 'lodash'
import { PhotoshopPicker } from 'react-color'

const fontWeights = {
  thin: '100',
  heavy: '900',
  black: '900',
  extraBold: '800',
  medium: '500',
  extraLight: '200',
  bold: '700',
  regular: '400',
  light: '300'
}

const schema = yup.object().shape({
  key: yup.string()
})

const defaultValues: {
  key: string
} = {
  key: ''
}

const fontsImplement: any = [
  {
    name: '나눔고딕',
    id: 'var(--font-nanum)',
    weight: ['Bold', 'ExtraBold', 'Light', 'Regular'],
    weightActive: 'Regular'
  },
  {
    name: '나눔명조',
    id: 'var(--font-nanummyeongjo)',
    weight: ['Bold', 'ExtraBold', 'Regular'],
    weightActive: 'Regular'
  },
  {
    // name: '나눔스퀘어 네오',
    name: '나눔스퀘어...',
    id: 'var(--font-nunumsquare)',
    weight: ['Bold', 'ExtraBold', 'Regular', 'Light', 'Heavy'],
    weightActive: 'Regular'
  },
  {
    // name: '메이플스토리',
    name: '메이플스토...',
    id: 'var(--font-maplestory)',
    weight: ['Bold', 'Light'],
    weightActive: 'Light'
  },
  {
    // name: '박물관문화재단클래식',
    name: '박물관문화...',
    id: 'var(--font-classic)',
    weight: ['Bold', 'Light', 'Medium'],
    weightActive: 'Light'
  },
  {
    name: '스웨거',
    id: 'var(--font-swagger)',
    weight: ['Regular'],
    weightActive: 'Regular'
  },
  {
    name: '조선신명조',
    id: 'var(--font-chosun)',
    weight: ['Regular'],
    weightActive: 'Regular'
  },
  {
    // name: '에스코어드림',
    name: '에스코어드...',
    id: 'var(--font-score)',
    weight: ['Black', 'Bold', 'ExtraBold', 'ExtraLight', 'Heavy', 'Light', 'Medium', 'Regular', 'Thin'],
    weightActive: 'Regular'
  },
  {
    name: '지마켓산스',
    id: 'var(--font-gmarket)',
    weight: ['Bold', 'Light', 'Medium'],
    weightActive: 'Bold'
  },
  {
    name: '부크크명조',
    id: 'var(--font-bookk)',
    weight: ['Bold', 'Light'],
    weightActive: 'Bold'
  },
  {
    name: '야놀자야체',
    id: 'var(--font-ya)',
    weight: ['Bold', 'Regular'],
    weightActive: 'Regular'
  },
  {
    // name: '여기어때잘난체',
    name: '여기어때잘...',
    id: 'var(--font-jalnan)',
    weight: ['Regular'],
    weightActive: 'Regular'
  }
]

const LogoFontSection = forwardRef(({ sendData }: any, ref) => {
  const [cardActive, setCardActive] = useState<any>()
  const [fonts, setFonts] = useState<any>(fontsImplement)

  const data = useRecoilValue(step1)

  const [photoshopPicker, setPhotoshopPicker] = useState('')

  useEffect(() => {
    if (data.logoFontSection?.name) {
      setCardActive(fontsImplement.findIndex((font: any) => font.name === data.logoFontSection?.name))
      const newFonts = _.cloneDeep(fonts)
      newFonts[fontsImplement.findIndex((font: any) => font.name === data.logoFontSection?.name)] = data.logoFontSection
      setFonts(newFonts)
    } else {
      setCardActive('')
    }
  }, [data.logoFontSection])

  useImperativeHandle(ref, () => ({
    resetLogoFontSection() {
      setCardActive('')
    }
  }))

  const {
    palette: { home }
  } = useTheme()

  const { control, getValues, watch } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const onSelected = (weight: string, index: number) => {
    let newFonts: any = _.cloneDeep(fonts)

    newFonts[index].weightActive = weight
    sendData('logoFontSection', newFonts[index])

    setFonts(newFonts)
  }

  const onSelectCard = (index: number, item: any) => {
    if (cardActive === index) return
    setCardActive(index)
    sendData('logoFontSection', item)
  }

  const getFontWeight = (weight: string) => {
    switch (weight) {
      case 'Thin':
        return fontWeights.thin
      case 'Medium':
        return fontWeights.medium
      case 'Black':
        return fontWeights.black
      case 'ExtraLight':
        return fontWeights.extraLight
      case 'Bold':
        return fontWeights.bold
      case 'ExtraBold':
        return fontWeights.extraBold
      case 'Light':
        return fontWeights.light
      case 'Regular':
        return fontWeights.regular
      case 'Heavy':
        return fontWeights.heavy
    }
  }
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
    setPhotoshopPicker(color.hex)
  }
  return (
    <Box sx={{ marginBottom: '60px' }}>
      <SectionTitle maintitle='로고 폰트 스타일' subTitle='로고의 폰트 스타일을 선택해 보세요.' />
      <Box style={{ background: home.gray400 }} className={styles.logoFontSection} component={'div'}>
        <Box className={styles.searchFont} style={{ borderBottom: `1px solid ${home.gray200}` }} component={'div'}>
          <Box className={styles.searchInput} component={'div'}>
            <InputItem
              name='key'
              control={control}
              textFieldProps={{
                required: false,
                placeholder: '브랜드명 기재',
                inputProps: {
                  maxLength: 20
                }
              }}
            />
          </Box>
          <Box
            aria-describedby={id}
            onClick={(event) => {
              handleClick(event)
            }}
          >
            <PaletteColorIcon />
          </Box>
        </Box>

        <Grid container spacing={2}>
          {fonts.map((item: any, index: number) => {
            return (
              <Grid onClick={() => onSelectCard(index, item)} key={index} item xs={3}>
                <CardOption
                  backgroundColorDefault={home.gray300}
                  backgroundColorActive='rgba(60, 130, 249, 0.10)'
                  active={cardActive === index}
                >
                  <Box component={'div'} className={styles.fontCard}>
                    <Box component={'div'} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box
                        style={{
                          color: home.gray50,
                          fontSize: '18px',
                          fontFamily: item.id,
                          fontWeight: getFontWeight(item.weightActive)
                        }}
                        component={'div'}
                      >
                        {item.name}
                      </Box>
                      <DropdownCustom
                        onSelected={(weight: string) => {
                          onSelected(weight, index)
                        }}
                        items={item.weight}
                        itemActive={item.weightActive}
                      />
                    </Box>
                    <Box
                      className={styles.schumpeter}
                      style={{
                        color: photoshopPicker || home.blue500,
                        fontFamily: item.id,
                        fontWeight: getFontWeight(item.weightActive)
                      }}
                      component={'div'}
                    >
                      {watch('key') || 'SCHUMPETER'}
                    </Box>
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
    </Box>
  )
})

export default LogoFontSection
