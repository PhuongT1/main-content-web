import { Box, Grid } from '@mui/material'
import SectionTitle from '../../section-title'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import CardItem from '@/components/home/card-item'
import { useQuery } from '@tanstack/react-query'
import { getLogoColor } from '@/services/logo.service'
import ColorDetail from '../color-detail'
import { useRecoilValue } from 'recoil'
import { step1 } from '@/atoms/logo'

const LogoColorSection = forwardRef(({ sendData }: any, ref) => {
  const [cardActive, setCardActive] = useState<any>()
  const [colors, setColors] = useState<any>()

  const dataRecoi = useRecoilValue(step1)

  const { data } = useQuery({
    queryKey: ['get-logo-colors'],
    queryFn: getLogoColor
  })

  useEffect(() => {
    if (dataRecoi.logoColorSection?.color) {
      setCardActive(data?.data.findIndex((color: any) => color.color === dataRecoi.logoColorSection?.color))
      setColors(dataRecoi.logoColorSection)
    } else {
      setCardActive('')
    }
  }, [dataRecoi.logoColorSection])

  useImperativeHandle(ref, () => ({
    resetLogoColorSection() {
      setCardActive('')
      setColors('')
    }
  }))

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

  return (
    <Box sx={{ marginBottom: '60px' }}>
      <SectionTitle maintitle='로고 색상' subTitle='로고의 색상을 선택해 보세요.' />
      <Grid container spacing={2}>
        {data?.data.map((item: any, index: number) => {
          return (
            <Grid key={index} item xs={3}>
              <CardItem
                icon='radio'
                isActive={cardActive === index}
                onClick={() => {
                  setCardActive(index)
                  setColors(item)
                  sendData('logoColorSection', item)
                }}
                cardItem={{
                  title: item.color,
                  subTitle: getSubTitleByNameColor(item.color),
                  content: (
                    <div
                      style={{
                        backgroundColor: getColorByNameColor(item.color),
                        width: '100%',
                        height: '70px',
                        borderRadius: '10px'
                      }}
                    ></div>
                  )
                }}
              />
            </Grid>
          )
        })}
      </Grid>

      {!!colors && (
        <ColorDetail colors={colors?.logoColorData} sendData={(type: string, values: any) => sendData(type, values)} />
      )}
    </Box>
  )
})

export default LogoColorSection
