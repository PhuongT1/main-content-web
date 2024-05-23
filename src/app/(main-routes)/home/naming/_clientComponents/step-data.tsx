import ConceptIcon from '@/assets/icons/naming/concept'
import LocalPlaceIcon from '@/assets/icons/naming/local-place'
import NamingKeywordIcon from '@/assets/icons/naming/naming-keyword'
import OnomatopoeiaIcon from '@/assets/icons/naming/onomatopoeia'
import SchumpeterAIIcon from '@/assets/icons/naming/schumpeterAI'
import SecondLanguageIcon from '@/assets/icons/naming/second-language'
import { useLanguage } from '@/hooks/use-language'
import { CartItemList } from '@/types/naming.type'
import { Box } from '@mui/material'

const headerBlue_0 = '(TechFocus)'
const headerBlue_1 = '(WarmTouch)'
const headerBlue_2 = '(QuickMedi)'
const headerBlue_3 = '(HanKkiLife)'
const headerBlue_4 = '(TechFocus)'
const headerBlue_5 = '(BlueNest)'
const headerBlue_6 = '(HappyPocket)'
const headerBlue_7 = '(RoyalConcierge)'

export const dataCart: CartItemList = {
  concept_0: {
    nameEn: {
      title: 'Technological/Innovative',
      subTitle: 'Highlights the innovation or technical features of a product or service',
      content: {
        header: '테크포커스',
        headerBlue: headerBlue_0,
        main: 'Focused on technology and innovation'
      }
    },
    name: {
      title: '기술적/혁신적 네이밍',
      subTitle: '제품이나 서비스의 혁신성이나 기술적 특징을 강조하는 네이밍',
      content: {
        header: '테크포커스',
        headerBlue: headerBlue_0,
        main: '기술과 혁신에 중점을 둔 IT 기업'
      }
    }
  },
  concept_1: {
    nameEn: {
      title: 'Emotional',
      subTitle: "Emphasize the emotional connection with the brand by appealing to consumers' emotions or emotions",
      content: {
        header: '따뜻한손길',
        headerBlue: headerBlue_1,
        main: 'A cafe that emphasizes emotional and warm hands'
      }
    },
    name: {
      title: '감성적 네이밍',
      subTitle: '소비자의 감정이나 감성에 호소하여 브랜드와의 감정적 연결을 강조하는 네이밍',
      content: {
        header: '따뜻한손길',
        headerBlue: headerBlue_1,
        main: '감성적이고 따뜻한 손길을 강조하는 카페'
      }
    }
  },
  concept_2: {
    nameEn: {
      title: 'Functional',
      subTitle: 'Clearly communicate the core functions or benefits of a product or service',
      content: {
        header: '퀵메디',
        headerBlue: headerBlue_2,
        main: 'Fast and efficient healthcare'
      }
    },
    name: {
      title: '기능적 네이밍',
      subTitle: '제품이나 서비스의 핵심 기능 또는 이점을 명확하게 전달하는 네이밍',
      content: {
        header: '퀵메디',
        headerBlue: headerBlue_2,
        main: '빠르고 효율적인 의료 서비스'
      }
    }
  },
  concept_3: {
    nameEn: {
      title: 'Popular',
      subTitle: 'Naming for a wide range of markets, reflecting popular and average consumer tastes',
      content: {
        header: '한끼라이프',
        headerBlue: headerBlue_3,
        main: 'Various and convenient meal service apps'
      }
    },
    name: {
      title: '대중적 네이밍',
      subTitle: '대중적이고 평균적인 소비자 취향을 반영하여 광범위한 시장에 맞춘 네이밍',
      content: {
        header: '한끼라이프',
        headerBlue: headerBlue_3,
        main: '다양하고 편리한 한끼 식사 서비스 앱'
      }
    }
  },
  concept_4: {
    nameEn: {
      title: 'Cultural',
      subTitle: 'To be in line with a particular culture or regional characteristic',
      content: {
        header: '한복한',
        headerBlue: headerBlue_4,
        main: 'A clothing brand that combines traditional Korean culture'
      }
    },
    name: {
      title: '문화적 네이밍',
      subTitle: '특정 문화나 지역적 특성에 부합하는 네이밍',
      content: {
        header: '한복한',
        headerBlue: headerBlue_4,
        main: '기술과 혁신에 중점을 둔 IT 기업'
      }
    }
  },
  concept_5: {
    nameEn: {
      title: 'Symbolic',
      subTitle: "Convey a brand's value or message using symbols or symbols",
      content: {
        header: '블루네스트',
        headerBlue: headerBlue_5,
        main: 'a company that symbolizes trust, stability, and comfort'
      }
    },
    name: {
      title: '심볼리컬 네이밍',
      subTitle: '기호나 상징을 활용하여 브랜드의 가치나 메시지를 전달하는 네이밍',
      content: {
        header: '블루네스트',
        headerBlue: headerBlue_5,
        main: '신뢰,안정,편안을 상징하는 기업'
      }
    }
  },
  concept_6: {
    nameEn: {
      title: 'Humorous',
      subTitle: 'Use humor to make a product or brand easier to remember',
      content: {
        header: '헤피포켓',
        headerBlue: headerBlue_6,
        main: 'A pleasant and humorous money app'
      }
    },
    name: {
      title: '유머러스 네이밍',
      subTitle: '유머를 활용하여 제품이나 브랜드를 기억하기 쉽게 만드는 네이밍',
      content: {
        header: '헤피포켓',
        headerBlue: headerBlue_6,
        main: '유쾌하고 유머러스한 머니 앱'
      }
    }
  },
  concept_7: {
    nameEn: {
      title: 'Elite',
      subTitle: 'Emphasize high quality, exclusivity, luxury, etc. so that it is recognized as a premium brand',
      content: {
        header: '로열컨시어지',
        headerBlue: headerBlue_7,
        main: 'Elite Services for Premium Customers'
      }
    },
    name: {
      title: '엘리트 네이밍',
      subTitle: '높은 품질, 독점성, 럭셔리 등을 강조하여 프리미엄 브랜드로 인식되도록 하는 네이밍',
      content: {
        header: '로열컨시어지',
        headerBlue: headerBlue_7,
        main: '프리미엄 고객을 위한 엘리트 서비스'
      }
    }
  }
}

export const TAB_VALUE = (fill: string) => {
  const { dict } = useLanguage()

  return [
    {
      name: (
        <>
          <SecondLanguageIcon fill={fill} />
          <Box component={'span'}>{dict.naming_step_1_tab_second_language}</Box>
        </>
      )
    },
    {
      name: (
        <>
          <LocalPlaceIcon fill={fill} />
          <Box component={'span'}>{dict.naming_step_1_tab_location}</Box>
        </>
      )
    },
    {
      name: (
        <>
          <NamingKeywordIcon fill={fill} />
          <Box component={'span'}>{dict.naming_step_1_tab_character}</Box>
        </>
      )
    },
    {
      name: (
        <>
          <OnomatopoeiaIcon fill={fill} />
          <Box component={'span'}>{dict.naming_step_1_tab_onomatopoeia}</Box>
        </>
      )
    },
    {
      name: (
        <>
          <ConceptIcon fill={fill} />
          <Box component={'span'}>{dict.naming_step_1_tab_concept}</Box>
        </>
      ),
      value: '컨셉'
    },
    {
      name: (
        <>
          <SchumpeterAIIcon fill={fill} />
          <Box component={'span'}>{dict.naming_step_1_tab_schumpeterAI}</Box>
        </>
      )
    }
  ]
}
