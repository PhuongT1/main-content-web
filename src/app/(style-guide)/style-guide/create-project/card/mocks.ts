import {
  DECK_CATEGORY_ENUM,
  DECK_TYPE_CHARGE_ENUM,
  IProjectTemplate,
  PROJECT_TYPE_ENUM,
  ProjectDeckItem
} from '@/app/(main-routes)/project-home/_modules/domain'

export const DATA_DECKS_ITEMS: ProjectDeckItem[] = [
  {
    id: 1,
    deckCode: 'ABC123',
    name: '아이디어 사업화 1',
    description:
      '팀을 구성하고 조직의 구성원 간의 협력과 효율성을 개선하기 위한 기술과 전략을 배우는 단계로, 비즈니스 아이디어를 실현하기 위한 핵심 요소입니다, 비즈니스 아이디어를 실현하기 위한 핵심 요소입니다.',
    workingTime: 10,
    type: DECK_TYPE_CHARGE_ENUM.FREE,
    totalUsages: 50,
    category: DECK_CATEGORY_ENUM.IDEA_COMMERCIALIZATION,
    isDisabled: false
  },
  {
    id: 2,
    deckCode: 'DEF456',
    name: '아이디어 사업화 2',
    description:
      '팀을 구성하고 조직의 구성원 간의 협력과 효율성을 개선하기 위한 기술과 전략을 배우는 단계로, 비즈니스 아이디어를 실현하기 위한 핵심 요소입니다, 비즈니스 아이디어를 실현하기 위한 핵심 요소입니다.',
    workingTime: 8,
    type: DECK_TYPE_CHARGE_ENUM.COST,
    totalUsages: 30,
    category: DECK_CATEGORY_ENUM.STARTUP_SIMULATION,
    isDisabled: true
  },
  {
    id: 3,
    deckCode: 'DEF457',
    name: '아이디어 사업화 3',
    description:
      '팀을 구성하고 조직의 구성원 간의 협력과 효율성을 개선하기 위한 기술과 전략을 배우는 단계로, 비즈니스 아이디어를 실현하기 위한 핵심 요소입니다, 비즈니스 아이디어를 실현하기 위한 핵심 요소입니다.',
    workingTime: 12,
    type: DECK_TYPE_CHARGE_ENUM.FREE,
    totalUsages: 20,
    category: DECK_CATEGORY_ENUM.STRENGTH_ANALYSIS,
    isDisabled: true
  },
  {
    id: 4,
    deckCode: 'GHI789',
    name: '아이디어 사업화 4',
    description:
      '팀을 구성하고 조직의 구성원 간의 협력과 효율성을 개선하기 위한 기술과 전략을 배우는 단계로, 비즈니스 아이디어를 실현하기 위한 핵심 요소입니다, 비즈니스 아이디어를 실현하기 위한 핵심 요소입니다.',
    workingTime: 15,
    type: DECK_TYPE_CHARGE_ENUM.COST,
    totalUsages: 40,
    category: DECK_CATEGORY_ENUM.OTHERS,
    isDisabled: true
  },
  {
    id: 5,
    deckCode: 'DEF458',
    name: '아이디어 사업화 5',
    description:
      '팀을 구성하고 조직의 구성원 간의 협력과 효율성을 개선하기 위한 기술과 전략을 배우는 단계로, 비즈니스 아이디어를 실현하기 위한 핵심 요소입니다, 비즈니스 아이디어를 실현하기 위한 핵심 요소입니다.',
    workingTime: 10,
    type: DECK_TYPE_CHARGE_ENUM.FREE,
    totalUsages: 25,
    category: DECK_CATEGORY_ENUM.FRAMEWORK,
    isDisabled: true
  }
]

export const DATA_PROJECT_TEMPLATE: IProjectTemplate[] = [
  {
    id: 1,
    groupName: '',
    type: PROJECT_TYPE_ENUM.INDIVIDUAL,
    name: '추천 프로젝트 템플릿 1',
    description:
      '팀을 구성하고 조직의 구성원 간의 협력과 효율성을 개선하기 위한 기술과 전략을 배우는 단계로, 비즈니스 아이디어를 실현하기 위한 핵심 요소입니다, 비즈니스 아이디어를 실현하기 위한 핵심 요소입니다.',
    imageUrls: ['/images/personal-project-template-1.png'],
    numberOfDeck: 15,
    decks: DATA_DECKS_ITEMS,
    isDisabled: true
  },
  {
    id: 2,
    name: '추천 프로젝트 템플릿 2',
    groupName: '',
    type: PROJECT_TYPE_ENUM.INDIVIDUAL,
    description:
      '팀을 구성하고 조직의 구성원 간의 협력과 효율성을 개선하기 위한 기술과 전략을 배우는 단계로, 비즈니스 아이디어를 실현하기 위한 핵심 요소입니다, 비즈니스 아이디어를 실현하기 위한 핵심 요소입니다.',
    imageUrls: ['/images/personal-project-template-2.png'],
    numberOfDeck: 15,
    decks: DATA_DECKS_ITEMS,
    isDisabled: false
  },
  {
    id: 3,
    name: '추천 프로젝트 템플릿 3',
    groupName: '',
    type: PROJECT_TYPE_ENUM.INDIVIDUAL,
    description:
      '문제 인식, 아이디어 발상, 사칙연산 아이디어 발상, 경쟁사 분석, 네이밍&브랜딩 등 인식, 아이디어 발상, 사칙연산아이디어 발상, 경쟁사 분석, 네이밍&브랜딩 등',
    imageUrls: ['/images/personal-project-template-3.png'],
    numberOfDeck: 15,
    decks: DATA_DECKS_ITEMS,
    isDisabled: false
  },
  {
    id: 4,
    name: '추천 프로젝트 템플릿 4',
    groupName: '',
    type: PROJECT_TYPE_ENUM.INDIVIDUAL,
    description: `문제 인식, 아이디어 발상, 사칙연산 아이디어 발상, 경쟁사 분석, 네이밍&브랜딩 등 인식, 아이디어 발상, 사칙연산아이디어 발상, 경쟁사 분석, 네이밍&브랜딩 등`,
    imageUrls: ['/images/personal-project-template-1.png'],
    numberOfDeck: 15,
    decks: DATA_DECKS_ITEMS,
    isDisabled: false
  },
  {
    id: 5,
    name: '추천 프로젝트 템플릿 5',
    groupName: '',
    type: PROJECT_TYPE_ENUM.INDIVIDUAL,
    description:
      '문제 인식, 아이디어 발상, 사칙연산 아이디어 발상, 경쟁사 분석, 네이밍&브랜딩 등 인식, 아이디어 발상, 사칙연산아이디어 발상, 경쟁사 분석, 네이밍&브랜딩 등',
    imageUrls: ['/images/personal-project-template-2.png'],
    numberOfDeck: 15,
    decks: DATA_DECKS_ITEMS,
    isDisabled: true
  },
  {
    id: 6,
    name: '추천 프로젝트 템플릿 6',
    groupName: '',
    type: PROJECT_TYPE_ENUM.INDIVIDUAL,
    description:
      '문제 인식, 아이디어 발상, 사칙연산 아이디어 발상, 경쟁사 분석, 네이밍&브랜딩 등 인식, 아이디어 발상, 사칙연산아이디어 발상, 경쟁사 분석, 네이밍&브랜딩 등',
    imageUrls: ['/images/personal-project-template-3.png'],
    numberOfDeck: 15,
    decks: DATA_DECKS_ITEMS,
    isDisabled: true
  }
]
