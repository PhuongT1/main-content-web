import { v4 as uuidv4 } from 'uuid'
import * as yup from 'yup'

export const DERIVATION_OF_BUSINESS_OBJECTIVES = [
  {
    tag: '시장 점유율 확대',
    tagEn: 'Expand Market Share',
    title: '특정 산업이나 시장에서의 점유율을 명확한 비율로 늘리기.',
    titleEn: 'Increase the market share in a specific industry or market by a clear percentage.',
    uuid: uuidv4()
  },
  {
    tag: '제품 혁신',
    tagEn: 'Product Innovation',
    title: '새로운 기술이나 기능을 도입하여 제품을 혁신하기.',
    titleEn: 'Innovate products by introducing new technologies or features.',
    uuid: uuidv4()
  },
  {
    tag: '고객 만족도 향상',
    tagEn: 'Improve Customer Satisfaction',
    title: '고객 만족도 조사를 통해 특정 수준 이상의 만족도 달성하기.',
    titleEn: 'Achieve a certain level of satisfaction through customer satisfaction surveys.',
    uuid: uuidv4()
  },
  {
    tag: '브랜드 인지도 증가',
    tagEn: 'Increase Brand Awareness',
    title: '타깃 시장에서 브랜드 인지도를 높이는 캠페인 수행하기.',
    titleEn: 'Conduct campaigns to raise brand awareness in the target market.',
    uuid: uuidv4()
  },
  {
    tag: '매출 증대',
    tagEn: 'Increase Revenue',
    title: '특정 기간 내에 매출을 명확한 비율로 증가시키기.',
    titleEn: 'Increase sales by a clear percentage within a specific period',
    uuid: uuidv4()
  },
  {
    tag: '신규 고객 확보',
    tagEn: 'Acquire New Customers',
    title: '새로운 고객층을 타깃으로 한 마케팅 전략 실행하기.',
    titleEn: 'Execute marketing strategies targeting new customer segments.',
    uuid: uuidv4()
  },
  {
    tag: '고객 충성도 개선',
    tagEn: 'Improve Customer Loyalty',
    title: '재구매율 또는 구독률을 높이기 위한 전략 수립하기.',
    titleEn: 'Establish strategies to increase the rate of repurchase or subscription.',
    uuid: uuidv4()
  },
  {
    tag: '지속 가능한 성장',
    tagEn: 'Sustainable Growth ',
    title: '환경, 사회, 거버넌스(ESG) 목표를 설정하고 이행하기.',
    titleEn: 'Set and implement Environmental, Social, and Governance (ESG) goals.',
    uuid: uuidv4()
  },
  {
    tag: '효율적인 운영 관리',
    tagEn: 'Efficient Operations Management',
    title: '운영 효율성을 개선하여 비용 절감 목표 달성하기.',
    titleEn: 'Improve operational efficiency to achieve cost reduction goals.',
    uuid: uuidv4()
  },
  {
    tag: '팀의 성장 및 개발',
    tagEn: 'Team Growth and Development',
    title: '직원 교육 및 개발 프로그램을 통해 팀 역량 강화하기.',
    titleEn: 'Strengthen team capabilities through employee training and development programs.',
    uuid: uuidv4()
  },
  {
    tag: '제품 라인 확장',
    tagEn: 'Expand Product Line ',
    title: '기존 제품이나 서비스 외에 새로운 라인업 추가하기.',
    titleEn: 'Add new lineups beyond existing products or services.',
    uuid: uuidv4()
  },
  {
    tag: '시장 다각화',
    tagEn: 'Market Diversification',
    title: '새로운 지역이나 시장에 진출하기.',
    titleEn: 'Enter new regions or markets.',
    uuid: uuidv4()
  },
  {
    tag: '기술 리더십 확립',
    tagEn: 'Establish Technological Leadership',
    title: '업계에서 기술적 선두주자로서의 위치 확보하기.',
    titleEn: 'Secure a position as a technological leader in the industry.',
    uuid: uuidv4()
  },
  {
    tag: '사회적 책임 이행',
    tagEn: 'Fulfill Social Responsibility',
    title: '사회적 기업 책임(CSR) 활동을 통해 사회적 가치 창출하기.',
    titleEn: 'Create social value through Corporate Social Responsibility (CSR) activities.',
    uuid: uuidv4()
  },
  {
    tag: '파트너십 및 협력 관계 강화',
    tagEn: 'Strengthen Partnerships and Collaborations ',
    title: '전략적 파트너와의 협력 관계 구축 및 강화하기.',
    titleEn: 'Build and strengthen cooperation with strategic partners.',
    uuid: uuidv4()
  },
  {
    tag: '데이터 기반 의사결정',
    tagEn: 'Data-Driven Decision Making',
    title: '데이터 분석을 통해 의사결정 과정 최적화하기.',
    titleEn: 'Optimize decision-making processes through data analysis.',
    uuid: uuidv4()
  },
  {
    tag: '고객 서비스 개선',
    tagEn: 'Improve Customer Service',
    title: '고객 지원과 서비스 품질을 높이기.',
    titleEn: 'Enhance customer support and service quality.',
    uuid: uuidv4()
  },
  {
    tag: '지적 재산권 확보',
    tagEn: 'Secure Intellectual Property',
    title: '특허, 상표, 저작권 등의 지적 재산 보호 및 확장하기.',
    titleEn: 'Protect and expand intellectual property such as patents, trademarks, and copyrights.',
    uuid: uuidv4()
  },
  {
    tag: '네트워크 효과 증대',
    tagEn: 'Increase Network Effects',
    title: '사용자 기반 확대를 통해 제품 가치 증가시키기.',
    titleEn: 'Increase product value by expanding the user base.',
    uuid: uuidv4()
  },
  {
    tag: '커뮤니티 구축',
    tagEn: 'Build Community',
    title: '브랜드에 대한 고객 커뮤니티 구축 및 관리하기.',
    titleEn: 'Build and manage a customer community for the brand.',
    uuid: uuidv4()
  },
  {
    tag: '지속가능성 목표 달성',
    tagEn: 'Achieve Sustainability Goals',
    title: '환경 친화적 접근 방식으로 지속가능한 사업 모델 구축하기.',
    titleEn: 'Build a sustainable business model through environmentally friendly approaches.',
    uuid: uuidv4()
  },
  {
    tag: '제품 품질 개선',
    tagEn: 'Improve Product Quality',
    title: '지속적인 품질 개선을 통해 고객 만족도 증가시키기.',
    titleEn: 'Increase customer satisfaction through continuous quality improvement.',
    uuid: uuidv4()
  },
  {
    tag: '국제 시장 진출',
    tagEn: 'Enter International Markets',
    title: '해외 시장에 제품이나 서비스를 성공적으로 론칭하기.',
    titleEn: 'Successfully launch products or services in foreign markets.',
    uuid: uuidv4()
  },
  {
    tag: '고객 피드백 기반 개선',
    tagEn: 'Improve Based on Customer Feedback',
    title: '고객 피드백을 수집하고 이를 제품 개선에 반영하기.',
    titleEn: 'Collect customer feedback and reflect it in product improvement.',
    uuid: uuidv4()
  },
  {
    tag: '재무 안정성 달성',
    tagEn: 'Achieve Financial Stability',
    title: '재무 목표를 설정하고 이를 달성하기 위한 전략 수립하기.',
    titleEn: 'Set financial goals and establish strategies to achieve them.',
    uuid: uuidv4()
  },
  {
    tag: '재무적 자립',
    tagEn: 'Financial Independence',
    title: '투자 유치, 수익성 개선 등을 통해 재무적으로 자립하기.',
    titleEn: 'Achieve financial independence through investment attraction and profitability improvement.',
    uuid: uuidv4()
  },
  {
    tag: '문화 및 가치 전파',
    tagEn: 'Propagate Culture and Values ',
    title: '회사 문화와 가치를 잘 전달하고 내부화하기.',
    titleEn: 'Effectively communicate and internalize company culture and values.',
    uuid: uuidv4()
  },
  {
    tag: '위기 관리 능력 강화',
    tagEn: 'Enhance Crisis Management Capability',
    title: '비상 상황에 대비한 위기 관리 계획 수립하기.',
    titleEn: 'Establish crisis management plans for emergency situations.',
    uuid: uuidv4()
  },
  {
    tag: '법규 준수',
    tagEn: 'Regulatory Compliance',
    title: '모든 관련 법규를 준수하며 사업 운영하기.',
    titleEn: 'Operate the business in compliance with all relevant regulations.',
    uuid: uuidv4()
  },
  {
    tag: '지속적인 학습 및 혁신',
    tagEn: 'Continuous Learning and Innovation',
    title: '새로운 기술, 시장 트렌드에 대한 지속적인 학습과 혁신 추구하기.',
    titleEn: 'Pursue continuous learning and innovation in new technologies and market trends.',
    uuid: uuidv4()
  }
]

const MAX_ITEM_SWOT = 3

export const Swot_Step1_Yup = yup.object().shape({
  strengthArray: yup.array().required().max(MAX_ITEM_SWOT),
  weaknessArray: yup.array().required().max(MAX_ITEM_SWOT),
  opportunityArray: yup.array().required().max(MAX_ITEM_SWOT),
  threatArray: yup.array().required().max(MAX_ITEM_SWOT),
  brandName: yup.string().required(),
  idea: yup.string().required()
})

export const listStrength = {
  opportunity: [
    {
      id: 1,
      content: '신규 시장 개척에 집중하여 시장 점유율 확대'
    },
    {
      id: 2,
      content: '정부 규제 완화에 대응하는 전략 계획 수립'
    },
    {
      id: 3,
      content: '고품질 제품으로 가격 경쟁에서 우위 확보'
    },
    {
      id: 4,
      content: '새로운 기술이나 서비스 개발을 통한 시장 리더십 강화'
    },
    {
      id: 5,
      content: '우수한 팀과 제품의 품질로 브랜드 인지도 향상'
    }
  ],
  thread: [
    {
      id: 1,
      content: '경쟁 상대 압력에 맞서는 혁신적인 전략 수립'
    },
    {
      id: 2,
      content: '경쟁사 대비 우수한 품질로 시장 신뢰 확보'
    },
    {
      id: 3,
      content: '경쟁사와의 차별화를 위해 지속적인 혁신 유지'
    },
    {
      id: 4,
      content: '경쟁 상대의 압력에 맞서는 강력한 마케팅 및 브랜딩'
    },
    {
      id: 5,
      content: '현지화 전략 및 유통 채널 다각화에 대응'
    }
  ]
}

export const listWeakness = {
  opportunity: [
    {
      id: 1,
      content: '신규 시장 요구에 맞는 다양한 제품 개발'
    },
    {
      id: 2,
      content: '효율적인 생산 및 관리 시스템 구축으로 시장 기회 활용'
    },
    {
      id: 3,
      content: '새로운 시장과 정부 정책에 맞춰 생산량 확대'
    },
    {
      id: 4,
      content: '다양한 시장의 요구에 맞는 제품 및 서비스 제공'
    },
    {
      id: 5,
      content: '약점을 극복하기 위한 팀워크 및 역량 개발 집중'
    }
  ],
  thread: [
    {
      id: 1,
      content: '제품 다양성 부족과 시스템 통합 문제 해결을 통한 경쟁력 강화'
    },
    {
      id: 2,
      content: '생산량 부족 문제 해결을 위한 유연한 계획 및 실행'
    },
    {
      id: 3,
      content: '경쟁 상대의 압력에 대응하는 위기 관리 전략 개발'
    },
    {
      id: 4,
      content: '경쟁사 대비 차별화된 제품 라인업 구축'
    },
    {
      id: 5,
      content: '현지화 전략 및 유통 채널 다각화를 위한 외부 협력 강화'
    }
  ]
}
