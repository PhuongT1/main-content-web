import { Box, Grid, Popover, useTheme } from '@mui/material'
import styles from './font.module.scss'
import PaletteColorIcon from '@/assets/icons/logo/palette-color'
import InputItem from '@/form/input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react'
import CardOption from '../../card-option'
import * as _ from 'lodash'
import { PhotoshopPicker } from 'react-color'
import DropdownCustom from '../../step_01/dropdown-custom'

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

const Font = ({ onSelectFont, logoDesign }: any) => {
  const [cardActive, setCardActive] = useState<any>(logoDesign.font || {})
  const [fonts, setFonts] = useState<any>(fontsImplement)
  const [photoshopPicker, setPhotoshopPicker] = useState(logoDesign.font?.fontColor || '')

  const {
    palette: { home }
  } = useTheme()

  const { control, watch } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const onSelected = (weight: string, index: number) => {
    let newFonts: any = _.cloneDeep(fonts)

    newFonts[index].weightActive = weight
    onSelectFont({ ...newFonts[index], fontColor: photoshopPicker })
    setCardActive({ ...newFonts[index], fontColor: photoshopPicker })
    setFonts(newFonts)
  }

  const onSelectCard = (item: any) => {
    setCardActive({ ...item, fontColor: photoshopPicker })
    onSelectFont({ ...item, fontColor: photoshopPicker })
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

    onSelectFont({ ...cardActive, fontColor: color.hex })
  }
  return (
    <Box>
      <Box className={styles.logoFontSection} component={'div'}>
        <Box className={styles.searchFont} style={{ borderBottom: `1px solid #C5C6C7` }} component={'div'}>
          <Box className={styles.searchInput} component={'div'}>
            <InputItem
              name='key'
              control={control}
              textFieldProps={{
                required: false,
                placeholder: '브랜드명 기재',
                inputProps: {
                  maxLength: 20,
                  style: { backgroundColor: '#E4E5E7' }
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
              <Grid onClick={() => onSelectCard(item)} key={index} item xs={3}>
                <CardOption
                  backgroundColorDefault='#E4E5E7'
                  backgroundColorActive='rgba(60, 130, 249, 0.10)'
                  active={cardActive.id === item.id}
                >
                  <Box component={'div'} className={styles.fontCard}>
                    <Box component={'div'} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box
                        style={{
                          color: '#1A1A1A',
                          fontSize: '18px',
                          fontFamily: item.id,
                          fontWeight: getFontWeight(item.weightActive)
                        }}
                        component={'div'}
                      >
                        {item.name}zxcv
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
}

export default Font
