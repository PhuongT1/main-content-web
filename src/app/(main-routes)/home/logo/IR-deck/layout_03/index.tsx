import { LayoutThreeIR } from '@/components/home/layout-IR'
import { Typography } from '@/elements'
import { Box } from '@mui/material'
import { useRecoilState, useRecoilValue } from 'recoil'
import { iRPalette } from '@/atoms/home/stepper'
import { useLanguage } from '@/hooks/use-language'
import { step1, step4 } from '@/atoms/logo'
import styles from './layout_03.module.scss'
import * as _ from 'lodash'
import Image from 'next/image'
import { useEffect } from 'react'
import LogoColorVersion from './logo-color-version'
import LogoWhiteVersion from './logo-white-version'

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

const Layout03 = () => {
  const { dict } = useLanguage()
  const { primaryColor } = useRecoilValue(iRPalette)
  const data1: any = useRecoilValue(step1)
  const [data4, setDataStep4] = useRecoilState(step4)

  useEffect(() => {
    if (!_.isEmpty(data4.htmlSvg)) {
      const elements: any = document.getElementsByClassName(`path_${data4.htmlSvg?.id}_${data4.color}`)
      elements[2].setAttribute('fill', data4.color || 'black')
      elements[2].setAttribute('stroke', data4.color || 'black')
    }
  }, [data4])

  const getColorByNameColor = (name: string) => {
    switch (name) {
      case '레드':
        return '#FF3737'
      case '오렌지':
        return '#FF7F37'
      case '옐로우':
        return '#F0DA15'
      case '그린':
        return '#00C750'
      case '블루':
        return '#3971FF'
      case '핑크':
        return '#FF83DC'
      case '퍼플':
        return '#B721FE'
      case '그레이 스케일':
        return '#AEAEAF'
    }
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
      default:
        return ''
    }
  }

  return (
    <LayoutThreeIR
      sxContainer={{
        background: '#FFF',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}
      header={{ leftContent: 'CREATIVE DESTRUCTION', rightContent: 'SCHUMPETER PROGRAM' }}
    >
      <Box>
        <Box sx={{ height: '500px', display: 'flex', alignItems: 'center', gap: '135px', justifyContent: 'center' }}>
          <Box>
            <Typography cate='title_60' marginBottom={'6px'} fontWeight={700} color={'#000000'}>
              {data1.ideaSection.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Box
                sx={{
                  padding: '6px 16px',
                  backgroundColor: 'white',
                  borderRadius: '999px',
                  border: '1px solid #3C82F9'
                }}
              >
                <Typography cate='body_10' fontWeight={700} color={'#3C82F9'}>
                  {data1.logoConceptSection.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  padding: '6px 16px',
                  backgroundColor: 'white',
                  borderRadius: '999px',
                  border: '1px solid #3C82F9'
                }}
              >
                <Typography cate='body_10' fontWeight={700} color={'#3C82F9'}>
                  {data1.logoTypeSection.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  padding: '6px 16px',
                  backgroundColor: 'white',
                  borderRadius: '999px',
                  border: '1px solid #3C82F9'
                }}
              >
                <Typography cate='body_10' fontWeight={700} color={'#3C82F9'}>
                  {data1.logoFontSection.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  padding: '6px 16px',
                  backgroundColor: 'white',
                  borderRadius: '999px',
                  border: '1px solid #3C82F9'
                }}
              >
                <Typography cate='body_10' fontWeight={700} color={'#3C82F9'}>
                  {data1.logoColorSection.color}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ height: '100%' }}>
            <Box id={`logoDesigned0`} className={`${styles[data4.layout]} ${styles.symbolLayout}`}>
              {!_.isEmpty(data4.symbol) && <Image src={data4.symbol?.url || ''} width={50} height={50} alt='' />}
              {!_.isEmpty(data4.htmlSvg) && (
                <div
                  className={styles.htmlSvg}
                  dangerouslySetInnerHTML={{
                    __html: data4.htmlSvg?.htmlSvg || ''
                  }}
                />
              )}
              <Typography
                sx={{ fontFamily: data4.font?.id, fontWeight: getFontWeight(data4.font?.weightActive) }}
                component={'span'}
                cate='sub_title_30'
                color={data4.font?.fontColor || 'black'}
              >
                {data1.ideaSection.title}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '6px' }}>
          <Box
            sx={{
              height: '210px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#102456'
            }}
          >
            <LogoColorVersion />
          </Box>
          <Box
            sx={{
              height: '210px',
              width: '100%',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000000'
            }}
          >
            <LogoWhiteVersion />
          </Box>
        </Box>
      </Box>
    </LayoutThreeIR>
  )
}

export default Layout03
