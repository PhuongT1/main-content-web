import { Typography } from '@/elements'
import { remConvert } from '@/utils/convert-to-rem'
import { Box, Grid, useTheme } from '@mui/material'
import { LayoutTwoIR } from '@/components/home/layout-IR'
import { iRPalette } from '@/atoms/home/stepper'
import { useRecoilState, useRecoilValue } from 'recoil'
import { IRBackground } from '@/assets/images/logo'
import * as _ from 'lodash'

import { step1, step4 } from '@/atoms/logo'
import styles from './layout_02.module.scss'
import { useEffect } from 'react'
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

const Layout02 = () => {
  const { primaryColor } = useRecoilValue(iRPalette)
  const {
    palette: { home }
  } = useTheme()

  const data1: any = useRecoilValue(step1)
  const [data4, setDataStep4] = useRecoilState(step4)
  useEffect(() => {
    if (!_.isEmpty(data4.htmlSvg)) {
      const elements: any = document.getElementsByClassName(`path_${data4.htmlSvg.id}_${data4.color}`)
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i]
        element.setAttribute('fill', data4.color || 'black')
        element.setAttribute('stroke', data4.color || 'black')
      }
    }
  }, [data4])

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

  const getSubTitleByNameColor = (name: string) => {
    switch (name) {
      case '레드':
        return '강렬, 화려, 열정, 용기, 사랑, 대담, 주도, 결단'
      case '오렌지':
        return '열정, 희망, 긍정, 따뜻, 유쾌, 활력, 화려, 신선'
      case '옐로우':
        return '행복, 화합, 창조, 긍정, 유쾌, 활기, 창의, 명량'
      case '그린':
        return '자연, 청정, 신뢰, 안정, 건강, 성장, 조화, 희망'
      case '블루':
        return '평온, 차분, 청량, 시원, 안정, 신뢰, 진실, 충실'
      case '핑크':
        return '사랑, 우애, 희망, 예술, 포근, 로열, 매력, 경쾌'
      case '퍼플':
        return '독창, 신비, 우아, 창의, 환상, 지성, 로열, 고귀'
      case '그레이 스케일':
        return '중립, 차분, 신뢰, 균형, 세련, 모던, 고요, 고급'
    }
  }

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

  return (
    <LayoutTwoIR
      sxContainer={{
        display: 'flex',
        background: 'while'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '33px',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            padding: '12px',
            backgroundColor: 'white',
            borderRadius: '6px',
            boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.10)'
          }}
        >
          <Typography cate='body_30' marginBottom={'6px'} fontWeight={700} color={'#2D68FE'}>
            {data1.ideaSection.title}
          </Typography>
          <Box
            sx={{
              backgroundImage: `url(${IRBackground?.src})`,
              width: '436px',
              height: '198px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box>
              <Box id={`logoDesigned0`} className={`${styles[data4.layout]} ${styles.symbolLayout}`}>
                {!_.isEmpty(data4.symbol) && <Image src={data4.symbol.url} width={50} height={50} alt='' />}
                {!_.isEmpty(data4.htmlSvg) && (
                  <div
                    className={styles.htmlSvg}
                    dangerouslySetInnerHTML={{
                      __html: data4.htmlSvg.htmlSvg
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
        </Box>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.10)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Typography cate='body_30' fontWeight={700} color={'#2D68FE'}>
                    경제적 측면
                  </Typography>
                  <Box
                    sx={{
                      padding: '4px 6px',
                      backgroundColor: '#3C82F91A',
                      borderRadius: '999px'
                    }}
                  >
                    <Typography cate='body_10' fontWeight={700} color={'#2D68FE'}>
                      {data1.logoConceptSection.name}
                    </Typography>
                  </Box>
                </Box>
                <Typography cate='body_10' fontWeight={400} color={home.ir_neutral_alpha80}>
                  {data1.logoConceptSection.description}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.10)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Typography cate='body_30' fontWeight={700} color={'#2D68FE'}>
                    경제적 측면
                  </Typography>
                  <Box
                    sx={{
                      padding: '4px 6px',
                      backgroundColor: '#3C82F91A',
                      borderRadius: '999px'
                    }}
                  >
                    <Typography cate='body_10' fontWeight={700} color={'#2D68FE'}>
                      {data1.logoTypeSection.name}
                    </Typography>
                  </Box>
                </Box>
                <Typography cate='body_10' fontWeight={400} color={home.ir_neutral_alpha80}>
                  {data1.logoTypeSection.description}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  height: '154px',
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.10)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Typography cate='body_30' fontWeight={700} color={'#2D68FE'}>
                    경제적 측면
                  </Typography>
                  <Box
                    sx={{
                      padding: '4px 6px',
                      backgroundColor: '#3C82F91A',
                      borderRadius: '999px'
                    }}
                  >
                    <Typography cate='body_10' fontWeight={700} color={'#2D68FE'}>
                      {data1.logoColorSection.color}
                    </Typography>
                  </Box>
                </Box>
                <Typography cate='body_10' marginBottom={'6px'} fontWeight={400} color={home.ir_neutral_alpha80}>
                  {getSubTitleByNameColor(data1.logoColorSection.color)}
                </Typography>
                <Box sx={{ width: '100%', height: '60px', display: 'flex' }}>
                  <Box
                    sx={{
                      width: '50%',
                      height: '100%',
                      backgroundColor: getColorByNameColor(data1.logoColorSection.color)
                    }}
                  ></Box>
                  <Box
                    sx={{
                      width: '50%',
                      height: '100%'
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: !!data1.logoColorDetailSection.color3 ? 100 / 3 + '%' : '50%',
                        backgroundColor: '#' + data1.logoColorDetailSection.color1
                      }}
                    ></Box>

                    <Box
                      sx={{
                        width: '100%',
                        height: !!data1.logoColorDetailSection.color3 ? 100 / 3 + '%' : '50%',
                        backgroundColor: '#' + data1.logoColorDetailSection.color2
                      }}
                    ></Box>

                    {!!data1.logoColorDetailSection.color3 && (
                      <Box
                        sx={{
                          width: '100%',
                          height: !!data1.logoColorDetailSection.color3 ? 100 / 3 + '%' : '50%',
                          backgroundColor: '#' + data1.logoColorDetailSection.color3
                        }}
                      ></Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  height: '154px',

                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.10)'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Typography cate='body_30' fontWeight={700} color={'#2D68FE'}>
                    경제적 측면
                  </Typography>
                  <Box
                    sx={{
                      padding: '4px 6px',
                      backgroundColor: '#3C82F91A',
                      borderRadius: '999px'
                    }}
                  >
                    <Typography cate='body_10' fontWeight={700} color={'#2D68FE'}>
                      {data1.logoFontSection.name}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  style={{
                    width: '100%',
                    height: '100px',
                    color: home.blue500,
                    fontFamily: data1.logoFontSection.id,
                    fontWeight: getFontWeight(data1.logoFontSection.weightActive),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {data1.ideaSection.title}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </LayoutTwoIR>
  )
}

export default Layout02
