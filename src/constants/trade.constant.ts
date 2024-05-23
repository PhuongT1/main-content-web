import { ITradeConceptType } from '@/app/(main-routes)/home/trade/_clientComponents/step_02/card_data'
import { BrandType_1, BrandType_2, BrandType_3 } from '@/assets/images/trade'

export const PARENT_CATEGORY = {
  LOCATION: '지역/장소',
  MYTH: '신화',
  CONCEPT: '컨셉',
  ONOMATOPOEIA: '의성어/의태어'
}

export const DEFAULT_STEP_TRADE = {
  deckId: 4,
  projectId: 7
}

export const conceptData: ITradeConceptType[] = [
  {
    title: '문자 상표',
    content: {
      description: `단어, 글자, 숫자 등 문자로 구성된 상표를 말합니다. 이는 브랜드명이나 회사명을 상표로 등록하는 경우에 주로 사용됩니다. 예를 들어, '삼성'이나 'LG' 같은 상표는 문자상표에 해당합니다.`,
      main: '기술과 혁신에 중점을 둔 IT 기업',
      image: BrandType_1
    }
  },
  {
    title: '도형 상표',
    content: {
      description: `그림, 디자인, 로고 등 시각적 요소가 포함된 상표를 말합니다. 디자인이 독특하고 인식하기 쉬울수록 도형상표는 효과적입니다. 예를 들어, 애플의 logo나 트위터의 logo는 도형상표에 해당합니다.`,
      main: '감성적이고 따뜻한 손길을 강조하는 카페',
      image: BrandType_2
    }
  },
  {
    title: '복합 상표',
    content: {
      description: `문자와 도형이 함께 포함된 상표를 말합니다. 이 경우, 상표는 브랜드명과 로고의 결합으로 구성되며 결합된 형태로 보호를 받습니다. 예를 들어 'Starbucks' 글씨체와 머메이드 로고가 있는 스타벅스 로고는 복합상표에 해당합니다.`,
      main: '빠르고 효율적인 의료 서비스',
      image: BrandType_3
    }
  }
]
