'use client'

import { IRBackground } from '@/assets/images/logo'
import { step1, step4 } from '@/atoms/logo'
import { LayoutOneIR } from '@/components/home/layout-IR'
import { Typography } from '@/elements'
import { convertToRem, remConvert } from '@/utils/convert-to-rem'
import { Box, useTheme } from '@mui/material'
import { useRecoilState, useRecoilValue } from 'recoil'
import styles from './layout_01.module.scss'
import * as _ from 'lodash'
import Image from 'next/image'
import { useEffect } from 'react'
import { iRPalette } from '@/atoms/home/stepper'

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

const Layout01 = () => {
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
        return ['강렬', '화려', '열정', '용기', '사랑', '대담', '주도', '결단']
      case '오렌지':
        return ['열정', '희망', '긍정', '따뜻', '유쾌', '활력', '화려', '신선']
      case '옐로우':
        return ['행복', '화합', '창조', '긍정', '유쾌', '활기', '창의', '명량']
      case '그린':
        return ['자연', '청정', '신뢰', '안정', '건강', '성장', '조화', '희망']
      case '블루':
        return ['평온', '차분', '청량', '시원', '안정', '신뢰', '진실', '충실']
      case '핑크':
        return ['사랑', '우애', '희망', '예술', '포근', '로열', '매력', '경쾌']
      case '퍼플':
        return ['독창', '신비', '우아', '창의', '환상', '지성', '로열', '고귀']
      case '그레이 스케일':
        return ['중립', '차분', '신뢰', '균형', '세련', '모던', '고요', '고급']
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

  const getColorByIndex = (index: number) => {
    switch (index) {
      case 1:
        return '100%'
      case 2:
        return '80%'
      case 3:
        return '60%'
      case 4:
        return '40%'
      case 5:
        return '20%'
      case 6:
        return '10%'
    }
  }
  return (
    <LayoutOneIR
      sxContainer={{
        paddingBottom: remConvert('135px'),
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        minHeight: remConvert('595px')
      }}
      header={{
        leftItem: {
          title: 'BRAND IDENTITY',
          subTitle: '브랜드 정체성'
        },
        centerItem: {
          title: '브랜드 로고',
          subTitle: '우리 기업의 브랜드 정체성을 설명해주세요.'
        }
      }}
    >
      <Box sx={{ display: 'flex', gap: '68px', alignItems: 'center', justifyContent: 'center' }} marginTop={'90px'}>
        <Box
          sx={{
            backgroundImage: `url(${IRBackground?.src})`,
            width: '390px',
            height: '260px',
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
        <Box>
          <Typography cate='title_3' fontWeight={600} marginBottom={'6px'} color='#2660D1'>
            {data1.logoColorSection.color}
          </Typography>
          <Box sx={{ display: 'flex', gap: '2px', marginBottom: '6px' }}>
            {getSubTitleByNameColor(data1.logoColorSection.color)?.map((title: string, index: number) => {
              return (
                <Box
                  sx={{
                    backgroundColor: '#5A8EF4',
                    padding: '2px 4px',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  key={index}
                >
                  <Typography cate='sub_title_10' fontSize={'10px'} fontWeight={600} color={home.ir_white}>
                    {title}
                  </Typography>
                </Box>
              )
            })}
          </Box>
          <Box sx={{ display: 'flex', marginBottom: '52px' }}>
            {[1, 2, 3, 4, 5, 6].map((value: number) => {
              return (
                <Box
                  key={value}
                  sx={{
                    width: '86px',
                    height: '120px',
                    backgroundColor: getColorByNameColor(data1.logoColorSection.color),
                    opacity: getColorByIndex(value)
                  }}
                ></Box>
              )
            })}
          </Box>
          <Box>
            <Typography cate='title_60' fontSize={'25px'} marginBottom={'14px'} fontWeight={700} color={'#B3B3B3'}>
              Color Variation
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  width: '173px',
                  padding: '6px 10px',
                  backgroundColor: '#' + data1.logoColorDetailSection.color1
                }}
              >
                <Typography cate='body_30' fontSize={'25px'} fontWeight={600} color={'#FAFAFA'}>
                  #{data1.logoColorDetailSection.color1}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '173px',
                  padding: '6px 10px',
                  backgroundColor: '#' + data1.logoColorDetailSection.color2
                }}
              >
                <Typography cate='body_30' fontSize={'25px'} fontWeight={600} color={'#FAFAFA'}>
                  #{data1.logoColorDetailSection.color2}
                </Typography>
              </Box>
              {!!data1.logoColorDetailSection.color3 && (
                <Box
                  sx={{
                    width: '173px',
                    padding: '6px 10px',
                    backgroundColor: '#' + data1.logoColorDetailSection.color3
                  }}
                >
                  <Typography cate='body_30' fontSize={'25px'} fontWeight={600} color={'#FAFAFA'}>
                    #{data1.logoColorDetailSection.color3}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </LayoutOneIR>
  )
}

export default Layout01
