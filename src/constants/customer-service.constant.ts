import {
  ColumnTable,
  CustomerProfile,
  Purchasing,
  TablePurchaseCustomer,
  VirtualTargetCustomer
} from '@/types/customer-service.type'
const errorMax3Message = (max = 3) => `최대 ${max}개까지 선택 가능합니다.`

const DEFAULT_STEP_CUSTOMER_SERVICE = {
  deckId: 9,
  projectId: 1
}

const pointDefault = {
  point: 3
}
const MULTIPLE_DATA_CHART = 5
const VIRTUAL_TARGET_CUSTOMER = 'virtual-target-customer'
const CUSTOMER_PROFILE_CUSTOMER = 'customer-profile'
const CUSTOMER_ACTIVE_STEP = 'customer-active-step'

const purchaseMethod: Purchasing[] = [
  {
    title: '경험',
    subTitle: '고객이 새로운 경험을 찾거나 체험 및 공유 등을 중요시하며 구매하려는 동기',
    ...pointDefault
  },
  {
    title: '충동',
    subTitle: '고객이 갑자기 느끼는 강한 욕구나 감정적인 결정에 따라 즉시 구매하려는 동기',
    ...pointDefault
  },
  {
    title: '가치',
    subTitle: '고객이 제품의 품질, 효용성, 브랜드 신뢰 등을 중요시하며 구매하려는 동기',
    ...pointDefault
  },
  {
    title: '가격',
    subTitle: '고객이 가격에 민감하며 가격 할인, 특가 상품, 할인 쿠폰 등과 같은 경제적 이점을 추구하며 구매하려는 동기',
    ...pointDefault
  },
  {
    title: '성취',
    subTitle: '고객이 목표 달성 또는 성공 경험을 추구하며 제품 또는 서비스를 구매하려는 동기',
    ...pointDefault
  },
  {
    title: '흥미',
    subTitle: '고객이 특정 주제, 취미, 관심사에 관련된 제품 또는 서비스를 찾으며 구매하려는 동기',
    ...pointDefault
  }
]

const channelInfluence: Purchasing[] = [
  {
    title: 'TV/라디오 광고',
    subTitle: '대중 매체에서 브랜드와 제품을 소개하여 시청자 및 청취자에게 영향을 주는 방법',
    ...pointDefault
  },
  {
    title: '매장 추천',
    subTitle: '매장 내에서 직원이 고객에게 제품을 추천하고 구매 도움을 주는 방식',
    ...pointDefault
  },
  {
    title: '소셜미디어',
    subTitle: '온라인 플랫폼을 활용하여 브랜드와 제품을 홍보하고 상호작용하는 방법',
    ...pointDefault
  },
  {
    title: '텔레마케팅',
    subTitle: '전화를 통해 고객과 직접 소통하며 제품을 소개하고 판매하는 방식',
    ...pointDefault
  },
  {
    title: '언론보도',
    subTitle: '언론 매체를 통해 제품과 브랜드 관련된 정보를 전달하는 방식',
    ...pointDefault
  },
  {
    title: '이벤트',
    subTitle: '행사나 박람회를 통해 직접 고객과 상호작용하고 제품을 소개하는 방식',
    ...pointDefault
  },
  {
    title: '지인추천',
    subTitle: '가족, 친구 또는 동료로부터 제품을 추천받는 방식',
    ...pointDefault
  },
  {
    title: '할인행사',
    subTitle: '가격 인센티브를 통해 고객을 유도하는 방식',
    ...pointDefault
  }
]

const DEFAULT_TARGET_CUSTOMER = {
  brandName: '',
  idea: '',
  customer: {
    age: '',
    familySituation: '',
    gender: '',
    incomeLevel: '',
    job: '',
    mbti: '',
    name: '',
    path: '',
    region: ''
  },
  introductionCustomer: '',
  selectList: [],
  countAI: 0
} as VirtualTargetCustomer

const DEFAULT_CUSTOMER_PROFILE = {
  achievementGoalList: [],
  painPointList: [],
  selectList: [],
  goal: {
    inputGoal: '',
    selectCategory: ''
  },
  painPointGoal: {
    inputGoal: '',
    selectCategory: ''
  },
  selectedItem: [],
  paymentMethod: [],
  purchaseMethod,
  channelInfluence,
  activeTab: '0'
} as CustomerProfile

const ROW_ITEM_DEFAULT: TablePurchaseCustomer[] = [
  {
    title: '구분',
    motivation: '동기',
    quest: '탐색',
    experience: '경험',
    attainment: '달성',
    feedback: '피드백'
  },
  {
    title: '상황',
    type: 'input'
  },
  {
    title: '생각',
    type: 'input'
  },
  {
    title: '행동',
    type: 'input'
  },
  {
    title: '분석',
    type: 'point'
  },
  {
    title: '감정',
    type: 'icon'
  },
  {
    title: '기회',
    type: 'input'
  }
] as unknown as TablePurchaseCustomer[]

const columnsTable: ColumnTable[] = [
  {
    title: '구분',
    dataIndex: 'title'
  },
  {
    title: '동기',
    dataIndex: 'motivation'
  },
  {
    title: '탐색',
    dataIndex: 'quest'
  },
  {
    title: '경험',
    dataIndex: 'experience'
  },
  {
    title: '달성',
    dataIndex: 'attainment'
  },
  {
    title: '피드백',
    dataIndex: 'feedback'
  }
]

const defaultValuesDesign = {
  purchaseCustomer: ROW_ITEM_DEFAULT,
  solve: {},
  reachStrategy: ''
}

const LABEL_POINT: string[] = [
  '얼마나 불편한가?',
  '어디서 찾는가?',
  '비교할 제품이 있는가?',
  '문제를 해결했는가?',
  '주변에 추천할 것인가?'
]

export {
  errorMax3Message,
  DEFAULT_STEP_CUSTOMER_SERVICE,
  VIRTUAL_TARGET_CUSTOMER,
  DEFAULT_TARGET_CUSTOMER,
  CUSTOMER_PROFILE_CUSTOMER,
  DEFAULT_CUSTOMER_PROFILE,
  ROW_ITEM_DEFAULT,
  columnsTable,
  LABEL_POINT,
  CUSTOMER_ACTIVE_STEP,
  defaultValuesDesign,
  MULTIPLE_DATA_CHART
}
