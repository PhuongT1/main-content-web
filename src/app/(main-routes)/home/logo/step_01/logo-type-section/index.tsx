import { Box, Grid } from '@mui/material'
import SectionTitle from '../../section-title'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import {
  LogoType1,
  LogoType2,
  LogoType3,
  LogoType4,
  LogoType5,
  LogoType6,
  LogoType7,
  LogoType8
} from '@/assets/images/logo'
import CardItem from '@/components/home/card-item'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import { step1 } from '@/atoms/logo'

export interface Props {
  sendData: any
}

const LogoTypeSection = forwardRef(({ sendData }: any, ref) => {
  const [cardActive, setCardActive] = useState<any>()

  const data = useRecoilValue(step1)

  useEffect(() => {
    if (data.logoTypeSection?.name) {
      setCardActive(logoTypes.findIndex((logo: any) => logo.name === data.logoTypeSection?.name))
    } else {
      setCardActive('')
    }
  }, [data.logoTypeSection])

  useImperativeHandle(ref, () => ({
    resetLogoTypeSection() {
      setCardActive('')
    }
  }))
  const logoTypes = [
    {
      name: '워드마크',
      description: '과거의 문화와 스타일을 현대적으로 재해석해 현대적 디자인 원칙을 활용',
      image: LogoType1
    },
    { name: '심볼', description: '시각적인 그림이나 아이콘을 중심으로 브랜드 아이덴티티를 표현', image: LogoType2 },
    {
      name: '앰블럼',
      description: '심볼과 텍스트를 통합해 주로 원형 또는 방패 모양으로 고유한 식별성을 강조',
      image: LogoType3
    },
    { name: '캘리그라피', description: '예술적인 또는 독특하고 장식적인 필기체를 사용해서 표현', image: LogoType4 },
    { name: '네거티브 스페이스', description: '배경 또는 공간을 활용하여 숨겨진 의미와 형상을 표현', image: LogoType5 },
    {
      name: '그래픽',
      description: '아이콘, 이미지, 색상, 텍스트를 사용해 특정 브랜드, 기업, 제품 또는 서비스를 표현',
      image: LogoType6
    },
    {
      name: '마스코트',
      description: '대표하는 캐릭터나 의인화된 동물, 인간 등 상징적인 존재로 표현',
      image: LogoType7
    },
    {
      name: '모노그램',
      description: '브랜드 고유의 이름이나 이니셜의 일부를 조합해 간결한 문자로 표현',
      image: LogoType8
    }
  ]

  return (
    <Box sx={{ marginBottom: '60px' }}>
      <SectionTitle maintitle='로고 종류' subTitle='로고의 형태를 선택해 보세요.' />
      <Grid container spacing={2}>
        {logoTypes.map((item: any, index: number) => {
          return (
            <Grid key={index} item xs={3}>
              <CardItem
                onClick={() => {
                  setCardActive(index)
                  sendData('logoTypeSection', item)
                }}
                icon='radio'
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

export default LogoTypeSection
