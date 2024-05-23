import { Box, useTheme } from '@mui/material'
import HorizontalScroll from '../../horizontal-scroll'
import { useRecoilState, useRecoilValue } from 'recoil'
import { step1, step2, step3 } from '@/atoms/logo'
import CardOption from '../../card-option'
import { Typography } from '@/elements'
import { useEffect, useState } from 'react'
import { PrimaryCheckbox } from '@/elements/v2/checkbox'
import { PrimaryCheckedIcon } from '@/assets/icons'
import WhiteUncheckIcon from '@/assets/icons/logo/white-uncheck-icon'
import Background from '@/assets/images/logo/Background.png'
import Tabs from '@/elements/tabs'
import Tab from '../../tab'
import Layout from '../layout'
import Symbols from '../symbols'
import styled from './logo-design-section.module.scss'
import * as _ from 'lodash'
import Font from '../font'
import Backgrounds from '../background'
import { AddButton } from '@/components/home/button'
import { DataStep1, DataStep2 } from '@/types/logo.type'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import { getSymbol } from '@/services/logo.service'
import axios from 'axios'

const tabs = ['레이아웃', '심볼', '폰트', '배경']
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

const LogoDesignSection = () => {
  const data1: DataStep1 = useRecoilValue(step1)
  const data2: DataStep2[] = useRecoilValue(step2)
  const [data3, setDataStep3] = useRecoilState(step3)
  console.log(data2)
  const [cardActive, setCardActive] = useState<any>({})
  const [tabActive, setTabActive] = useState(0)
  const [logoDesign, setLogoDesign] = useState<any>({ layout: 'flexColumn', color: '', backgrounds: 1 })
  const {
    palette: { home }
  } = useTheme()
  const handleCategoryChange = (event: any, newValue: number) => {
    setTabActive(newValue)
  }

  useEffect(() => {
    onFillColor()
  }, [tabActive, logoDesign.layout, logoDesign.htmlSvg, logoDesign.font, logoDesign.backgrounds])

  useEffect(() => {
    if (!_.isEmpty(logoDesign.htmlSvg)) {
      onSelectSymbol(logoDesign.htmlSvg)
    }
  }, [logoDesign.color])

  const onFillColor = () => {
    if (!_.isEmpty(logoDesign.htmlSvg)) {
      const elements: any = document.getElementsByClassName(`path_${logoDesign.htmlSvg.id}_${logoDesign.color}`)
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i]
        element.setAttribute('fill', logoDesign.color || 'black')
        element.setAttribute('stroke', logoDesign.color || 'black')
      }
    }
  }

  const fetchSymbol = useMutation({
    mutationFn: getSymbol,
    onSuccess: async (res: any) => {
      const { data, error } = res || {}
      if (error) {
        throw error
      } else if (data) {
        return data
      }
    },
    onError: (err: any) => {
      console.error(err)
    }
  })

  const onSelectSymbol = async (symbolData: any) => {
    const { data } = await axios.get(symbolData.url, {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0'
      }
    })

    const svg = data.replaceAll('<path', `<path class="path_${symbolData.id}_${logoDesign.color}"`)
    setLogoDesign({
      ...logoDesign,
      htmlSvg: { ...symbolData, htmlSvg: svg }
    })

    // if (!!symbolData) {
    //   fetch(symbolData.url)
    //     .then((response) => response.text())
    //     .then((svg) => {
    //       svg = svg.replaceAll('<path', `<path class="path_${symbolData.id}_${logoDesign.color}"`)
    //       setLogoDesign({
    //         ...logoDesign,
    //         htmlSvg: { ...symbolData, htmlSvg: svg }
    //       })
    //     })
    // }
  }
  const getFontWeight = (weight: string) => {
    if (!weight) return
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

  return (
    <>
      <Box sx={{ padding: '62px 40px 20px 40px', backgroundColor: home.gray300, borderRadius: '10px' }}>
        <HorizontalScroll>
          {data2.map((symbol: any, index: number) => (
            <Box
              onClick={() => {
                setCardActive(symbol), onSelectSymbol(symbol)
              }}
              sx={{ minWidth: '214px' }}
              key={index}
            >
              <CardOption
                backgroundColorDefault={'white'}
                backgroundColorActive={'white'}
                active={symbol.id === cardActive.id}
                boxShadowWidth='4px'
              >
                <Box sx={{ padding: '22px 12px', position: 'relative' }}>
                  <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <PrimaryCheckbox
                      style={{ padding: '0' }}
                      checkedIcon={<PrimaryCheckedIcon />}
                      icon={<WhiteUncheckIcon />}
                      checked={symbol.id === cardActive.id}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}
                  >
                    <Image src={symbol.url} width={50} height={50} alt='' />
                    <Typography component={'span'} cate='sub_title_30' color={'#090A0B'}>
                      {data1.ideaSection.title}
                    </Typography>
                  </Box>
                </Box>
              </CardOption>
            </Box>
          ))}
        </HorizontalScroll>
      </Box>
      <Box
        sx={{
          backgroundColor:
            logoDesign.backgrounds === 1 || logoDesign.backgrounds === 3
              ? 'white'
              : logoDesign.backgrounds === 2 || logoDesign.backgrounds === 4
              ? 'black'
              : 'white',
          borderRadius: '10px'
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${Background.src})`,
            width: '100%',
            height: '440px',
            borderRadius: '10px',
            margin: '20px 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {!_.isEmpty(logoDesign.htmlSvg) && (
            <Box className={styled[logoDesign.layout]}>
              <div
                className={styled.htmlSvg}
                dangerouslySetInnerHTML={{
                  __html: logoDesign.htmlSvg.htmlSvg
                }}
              />
              <Typography
                sx={{
                  fontFamily: logoDesign.font?.id || '',
                  fontWeight: getFontWeight(logoDesign.font?.weightActive || '')
                }}
                component={'span'}
                cate='large_title'
                color={logoDesign.font?.fontColor || '#090A0B'}
              >
                {data1.ideaSection.title}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px 0'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Tabs onChange={handleCategoryChange} style={{ backgroundColor: '#EDEEF1', margin: '0' }} value={tabActive}>
            {tabs.map((item: string, index: number) => (
              <Tab key={index} value={index} label={item} />
            ))}
          </Tabs>
          {tabActive === 0 && (
            <Layout
              logoDesign={logoDesign}
              onSelectLayout={(layout: any) => setLogoDesign({ ...logoDesign, layout })}
            />
          )}
          {tabActive === 1 && (
            <Symbols
              logoDesign={logoDesign}
              onSelectSymbol={(htmlSvg: any) => {
                onSelectSymbol(htmlSvg), setCardActive({})
              }}
              onFillColor={(color: string) => setLogoDesign({ ...logoDesign, color })}
            />
          )}
          {tabActive === 2 && (
            <Font logoDesign={logoDesign} onSelectFont={(font: any) => setLogoDesign({ ...logoDesign, font })} />
          )}
          {tabActive === 3 && (
            <Backgrounds
              logoDesign={logoDesign}
              onSelectBackgrounds={(backgrounds: any) =>
                setLogoDesign({
                  ...logoDesign,
                  backgrounds,
                  color: backgrounds === 3 ? 'black' : backgrounds === 4 ? 'white' : logoDesign.color,
                  font: {
                    ...logoDesign.font,
                    fontColor:
                      backgrounds === 3 ? 'black' : backgrounds === 4 ? 'white' : logoDesign.font?.fontColor || 'black'
                  }
                })
              }
            />
          )}
        </Box>
        <Box sx={{ textAlign: 'center', marginTop: '24px' }}>
          <AddButton
            title='디자인 완료'
            sx={{
              backgroundColor: 'rgba(60, 130, 249, 0.10)'
            }}
            disabled={data3.length >= 10 || !logoDesign.htmlSvg}
            onClick={() => (data3.length >= 10 || !logoDesign.htmlSvg ? '' : setDataStep3([...data3, logoDesign]))}
          />
        </Box>
      </Box>
    </>
  )
}

export default LogoDesignSection
