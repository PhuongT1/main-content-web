import { Box, Grid } from '@mui/material'
import SectionTitle from '../../section-title'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import {
  LogoConcept1,
  LogoConcept2,
  LogoConcept3,
  LogoConcept4,
  LogoConcept5,
  LogoConcept6,
  LogoConcept7,
  LogoConcept8
} from '@/assets/images/logo'
import Image from 'next/image'
import CardItem from '@/components/home/card-item'
import { useRecoilValue } from 'recoil'
import { step1 } from '@/atoms/logo'

const LogoConceptSection = forwardRef(({ sendData }: any, ref) => {
  const [cardActive, setCardActive] = useState<any>()
  const data = useRecoilValue(step1)

  useEffect(() => {
    if (data.logoConceptSection?.name) {
      setCardActive(logoConcepts.findIndex((logo: any) => logo.name === data.logoConceptSection?.name))
    } else {
      setCardActive('')
    }
  }, [data.logoConceptSection])

  useImperativeHandle(ref, () => ({
    resetLogoConceptSection() {
      setCardActive('')
    }
  }))

  const logoConcepts = [
    {
      name: '뉴트로',
      description: '과거의 문화와 스타일을 현대적으로 재해석해 현대적 디자인 원칙을 활용',
      image: LogoConcept1
    },
    {
      name: '미니멀리즘',
      description: '기업명을 약자나 축약어로 표현하여 간결하고 외기성 있는 네이밍을 생성합니다.',
      image: LogoConcept2
    },
    {
      name: '럭셔리',
      description: '고급스러운 폰트, 컬러, 형상을 활용해 명성, 품질, 세련된 이미지를 강조',
      image: LogoConcept3
    },
    {
      name: '유니크',
      description: '독특하고 혁신적인 디자인으로 브랜드의 독특한 아이덴티티와 메시지를 전달',
      image: LogoConcept4
    },
    {
      name: '인더스트리얼',
      description: '직관적인 디자인과 강력한 시각적 요소를 사용하여 산업적이고 탄탄한 느낌',
      image: LogoConcept5
    },
    { name: '캐주얼', description: '부드러운 색상, 친숙한 글꼴을 사용한 친근하고 일상적인 느낌', image: LogoConcept6 },
    { name: '클래식', description: '간결하고 우아한 디자인으로 브랜드의 안정성과 신뢰성을 표현', image: LogoConcept7 },
    {
      name: '퓨처리스틱',
      description: '고급스럽고 현대적인 디자인으로 기술적 혁신과 미래적 감각을 표현',
      image: LogoConcept8
    }
  ]

  return (
    <Box sx={{ marginBottom: '60px' }}>
      <SectionTitle
        maintitle='로고 컨셉'
        subTitle='기업, 브랜드, 제품 또는 서비스의 이미지를 시각적으로 보여주는 로고의 컨셉을 선택해 보세요.'
      />
      <Grid container spacing={2}>
        {logoConcepts.map((item: any, index: number) => {
          return (
            <Grid key={index} item xs={3}>
              <CardItem
                icon='radio'
                onClick={() => {
                  setCardActive(index)
                  sendData('logoConceptSection', item)
                }}
                isActive={cardActive === index}
                cardItem={{
                  title: item.name,
                  subTitle: item.description,
                  content: (
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 10
                      }}
                      src={item.image}
                      alt=''
                    />
                  )
                }}
              />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
})

export default LogoConceptSection
