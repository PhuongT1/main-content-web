import { Typography } from '@/elements'
import { Box, Grid, useTheme } from '@mui/material'
import CardOption from '../../card-option'
import styles from './logo-designed.module.scss'
import { DataStep1 } from '@/types/logo.type'
import { useRecoilState, useRecoilValue } from 'recoil'
import { step1, step3 } from '@/atoms/logo'
import * as _ from 'lodash'
import { useEffect } from 'react'
import DownloadIcon from '@/assets/icons/download'
import TrashIcon from '@/assets/icons/trash'
import * as htmlToImage from 'html-to-image'
import Image from 'next/image'

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

const LogoDesigned = () => {
  const data1: DataStep1 = useRecoilValue(step1)
  const [data3, setDataStep3] = useRecoilState(step3)
  const {
    palette: { home }
  } = useTheme()

  useEffect(() => {
    if (data3.length) {
      for (const logo of data3) {
        if (!_.isEmpty(logo.htmlSvg)) {
          const elements: any = document.getElementsByClassName(`path_${logo.htmlSvg.id}_${logo.color}`)
          for (var i = 0; i < elements.length; i++) {
            var element = elements[i]

            element.setAttribute('fill', logo.color || 'black')
            element.setAttribute('stroke', logo.color || 'black')
          }
        }
      }
    }
  }, [data3])

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

  const onRemoveLogoDesigned = (index: number) => {
    let newData = [...data3]
    newData.splice(index, 1)
    setDataStep3(newData)
  }

  const onDownloadLogoDesigned = (index: number) => {
    const element: any = document.getElementById(`logoDesigned${index}`)
    htmlToImage.toJpeg(element, { quality: 0.95 }).then(function (dataUrl) {
      var link = document.createElement('a')
      link.download = 'logo.jpeg'
      link.href = dataUrl
      link.click()
    })
  }

  return (
    <Box
      sx={{
        marginTop: '20px',
        padding: '20px 24px',
        border: `1px solid ${home.gray200}`,
        borderRadius: '10px',
        backgroundColor: home.gray500
      }}
      id={'my-node'}
    >
      <Typography cate='title_50' sx={{ color: home.gray0, marginBottom: '18px' }}>
        디자인한 로고
      </Typography>
      <Grid container spacing={2}>
        {data3?.map((logo: any, index: number) => {
          return (
            <Grid key={index} item xs={3}>
              <CardOption
                backgroundColorDefault={
                  logo.backgrounds === 1 || logo.backgrounds === 3
                    ? 'white'
                    : logo.backgrounds === 2 || logo.backgrounds === 4
                    ? 'black'
                    : 'white'
                }
                backgroundColorActive='white'
                active={false}
              >
                <Box sx={{ position: 'relative', height: '100%', minHeight: '140px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'end',
                      gap: '8px',
                      position: 'absolute',
                      top: '8px',
                      right: '8px'
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: '#EDEEF1',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        cursor: 'pointer'
                      }}
                      onClick={() => onDownloadLogoDesigned(index)}
                    >
                      <DownloadIcon svgProps={{ width: 16, height: 16 }} pathProps={{ stroke: '#000000' }} />
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: '#EDEEF1',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        cursor: 'pointer'
                      }}
                      onClick={() => onRemoveLogoDesigned(index)}
                    >
                      <TrashIcon
                        svgProps={{ width: 16, height: 16, viewBox: '0 0 24 24' }}
                        pathProps={{ stroke: '#000000' }}
                      />
                    </Box>
                  </Box>
                  <Box id={`logoDesigned${index}`} className={`${styles[logo.layout]} ${styles.symbolLayout}`}>
                    {!_.isEmpty(logo.symbol) && <Image src={logo.symbol.url} width={50} height={50} alt='' />}
                    {!_.isEmpty(logo.htmlSvg) && (
                      <div
                        className={styles.htmlSvg}
                        dangerouslySetInnerHTML={{
                          __html: logo.htmlSvg.htmlSvg
                        }}
                      />
                    )}
                    <Typography
                      sx={{ fontFamily: logo.font?.id, fontWeight: getFontWeight(logo.font?.weightActive) }}
                      component={'span'}
                      cate='sub_title_30'
                      color={logo.font?.fontColor || 'black'}
                    >
                      {data1.ideaSection.title}
                    </Typography>
                  </Box>
                </Box>
              </CardOption>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default LogoDesigned
