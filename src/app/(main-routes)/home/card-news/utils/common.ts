import { CARD_NEWS_TYPES } from '@/constants/cardnews.constant'
import yup from '@/services/yup.service'
import { ICardData, ICardNewsGroups, ICardNewsResponeData } from '@/types/cardnews/index.type'

export const cardNewsTypes = [
  {
    value: CARD_NEWS_TYPES.BRAND_PROMOTION,
    label: '브랜드 홍보'
  },
  {
    value: CARD_NEWS_TYPES.PRODUCT_AND_SERVICE_INTRODUCTION,
    label: '제품 및 서비스 소개'
  },
  {
    value: CARD_NEWS_TYPES.CUSTOMER_ENGAGEMENT_AND_INTERACTION,
    label: '고객 참여 및 상호작용'
  },
  {
    value: CARD_NEWS_TYPES.COOPORATE_UPDATE_NEWS,
    label: '기업 업데이트 뉴스'
  },
  {
    value: CARD_NEWS_TYPES.EVENT_AND_PROMOTIONS,
    label: '이벤트 및 프로모션'
  },
  {
    value: CARD_NEWS_TYPES.SHARING_INFORMATION,
    label: '정보성 공유'
  },
  {
    value: CARD_NEWS_TYPES.JOB_POSTING,
    label: '채용 공고'
  }
]

const MAXLENGTH_DEFAULT = 100
// const DATE_FORMAT = 'YYYY-MM-DD';

export enum FormStatus {
  inprogress = 'inprogress',
  completed = 'completed',
  inActive = 'inActive'
}

enum inputNames {
  //common
  companyName = 'companyName',
  prodDate = 'prodDate',
  serviceName = 'serviceName',

  //types
  brandCoreMessage = 'brandCoreMessage',
  brandMissionAndValues = 'brandMissionAndValues',
  brandStory = 'brandStory',
  brandPerformace = 'brandPerformace',
  brandName = 'brandName',

  productAndServiceIntroduction = 'productAndServiceIntroduction',
  productAndServiceKeyBenefits = 'productAndServiceKeyBenefits',
  useCaseAndApplication = 'useCaseAndApplication',
  customerPerformanceOrReview = 'customerPerformanceOrReview',
  introducingFutureUpdatesOrAdditionalFeatures = 'introducingFutureUpdatesOrAdditionalFeatures',

  specialMomentsWithCustomers = 'specialMomentsWithCustomers',
  customerOpinionsAndFeedback = 'customerOpinionsAndFeedback',
  communicationPlanWithCustomers = 'communicationPlanWithCustomers',
  guidanceForFutureWithCustomers = 'guidanceForFutureWithCustomers',
  expressingAppreciationToCustomers = 'expressingAppreciationToCustomers',

  latestNewsAndUpdate = 'latestNewsAndUpdate',
  overallCooprateStatusAndCompanyPerformance = 'overallCooprateStatusAndCompanyPerformance',
  cooporateVisionAndFuturePlan = 'cooporateVisionAndFuturePlan',
  //guidanceForFutureWithCustomers = 'guidanceForFutureWithCustomers',
  //expressingAppreciationToCustomers = 'expressingAppreciationToCustomers',

  //EVENT_AND_PROMOTIONS
  introductionToEventsAndPromotions = 'introductionToEventsAndPromotions',
  participationInEventsAndPromotions = 'participationInEventsAndPromotions',
  benefitsAndRewards = 'benefitsAndRewards',
  eventsAndPromotionsKeyRules = 'eventsAndPromotionsKeyRules',
  pastEventsAndPromotions = 'pastEventsAndPromotions',

  //SHARING_INFORMATION
  introductionToTopicAndContent = 'introductionToTopicAndContent',
  keyContentAndImportantPoints = 'keyContentAndImportantPoints',
  moreInformation = 'moreInformation',
  additionalResources = 'additionalResources',
  summaryAndConclusion = 'summaryAndConclusion',
  quoteOrMessage = 'quoteOrMessage',

  //JOB_POSTING
  recruitmentPositionIntroduction = 'recruitmentPositionIntroduction',
  qualificationsCompetencies = 'qualificationsCompetencies',
  companyIntroductionAndCulture = 'companyIntroductionAndCulture',
  welfareAndBenefits = 'welfareAndBenefits',
  applicationMethodsAndProcedures = 'applicationMethodsAndProcedures',
  companyPerformanceAndFuturePlan = 'companyPerformanceAndFuturePlan'
}

export const formInputs: ICardNewsGroups = {
  title: '브랜드 홍보',
  subTitle: '브랜드의 핵심 가치, 메시지 및 장점을 전달해 브랜드 인식을 높이고 고객과의 신뢰도를 향상시켜보세요.',
  tip: '브랜드 정보를 보여주는 카드뉴스 제작을 위해, 브랜드 이름 또는 주제에 맞는 간결한 제목을 작성해 주세요. 다음, 브랜드의 핵심 메시지, 미션과 가치관, 역사, 성과를 작성해 타겟에게 브랜드 정보를 보여주세요.',
  type: CARD_NEWS_TYPES.BRAND_PROMOTION,
  groups: [
    {
      title: '브랜드 홍보 정보',
      fields: [
        {
          column: 12,
          type: 'textarea',
          name: inputNames.brandCoreMessage,
          label: '브랜드의 핵심 메시지',
          subLabel: '프로젝트의 범위와 주요 내용을 설명하여 어떤 분야 또는 산업에 초점을 맞추는지를 보여줍니다.',
          inputProps: {
            placeholder: '브랜드의 핵심 메시지',
            maxLength: MAXLENGTH_DEFAULT,
            multiline: true
          }
        },
        {
          column: 12,
          type: 'textarea',
          name: inputNames.brandMissionAndValues,
          label: '브랜드 미션 및 가치관',
          subLabel: '사용된 기술이나 개발 방법에 대한 간략한 소개를 통해 프로젝트의 기술적 측면을 강조합니다.',
          inputProps: {
            placeholder: '브랜드 미션 및 가치관',
            multiline: true,
            maxLength: MAXLENGTH_DEFAULT
          }
        },
        {
          column: 12,
          type: 'textarea',
          name: inputNames.brandStory,
          label: '브랜드 이야기',
          subLabel: '협력사 또는 팀원 소개를 통해 협업의 중요성을 강조하고, 다양한 전문성을 갖추고 있음을 보여줍니다.',
          inputProps: {
            placeholder: '브랜드 이야기',
            multiline: true,
            maxLength: MAXLENGTH_DEFAULT
          }
        },
        {
          column: 12,
          type: 'textarea',
          name: inputNames.brandPerformace,
          label: '브랜드 성과',
          subLabel: '개발로 얻은 결과물이나 성과를 소개하여 프로젝트의 실질적인 성과를 강조합니다.',
          inputProps: {
            placeholder: '브랜드 성과',
            multiline: true,
            maxLength: MAXLENGTH_DEFAULT
          }
        }
      ]
    },
    {
      title: '기본 정보',
      fields: [
        {
          column: 12,
          type: 'textarea',
          name: inputNames.companyName,
          label: '회사명',
          subLabel: '',
          inputProps: {
            required: true,
            placeholder: '회사명',
            maxLength: MAXLENGTH_DEFAULT,
            multiline: true
          }
        },
        {
          column: 12,
          type: 'textarea',
          name: inputNames.serviceName,
          label: '브랜드명',
          subLabel: '',
          inputProps: {
            required: true,
            placeholder: '브랜드명',
            maxLength: MAXLENGTH_DEFAULT,
            multiline: true
          }
        },
        {
          type: 'date',
          column: 12,
          name: 'prodDate',
          label: '카드뉴스 공개일',
          subLabel: '',
          inputProps: {
            required: true,
            placeholder: '2023-12-25',
            readonly: true
          }
        }
      ]
    }
  ]
}

export const cardNewsFormTypes: ICardNewsGroups[] = [
  formInputs,
  {
    title: '제품 및 서비스 소개',
    subTitle: '브랜드의 제품 및 서비스의 이점 및 사례를 들어 구체적으로 소개해 효과적으로 알려보세요.',
    tip: '제품 또는 서비스의 핵심적인 정보를 쉽고 간결하게 전달하여 고객들이 쉽게 이해하고 참고할 수 있도록 돕습니다.',
    type: CARD_NEWS_TYPES.PRODUCT_AND_SERVICE_INTRODUCTION,
    groups: [
      {
        title: '제품 및 서비스 소개 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.productAndServiceIntroduction,
            label: '제품 및 서비스 소개',
            subLabel:
              '제품 또는 서비스의 핵심적인 정보를 간결하게 소개합니다. 제품의 특징, 서비스의 주요 기능 등을 간략하게 설명합니다.',
            inputProps: {
              placeholder: '제품 및 서비스 소개',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.productAndServiceKeyBenefits,
            label: '제품 및 서비스 주요 이점',
            subLabel:
              '고객이 얻을 수 있는 주요 이점이나 장점을 강조합니다. 편의성, 성능, 경제성 등을 강조하여 설명합니다.',
            inputProps: {
              placeholder: '제품 및 서비스 주요 이점',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.useCaseAndApplication,
            label: '사용 사례 및 적용 분야',
            subLabel:
              '제품 또는 서비스의 사용 사례나 적용 분야를 소개하여 고객이 어떻게 활용할 수 있는지를 보여줍니다.',
            inputProps: {
              placeholder: '사용 사례 및 적용 분야',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.customerPerformanceOrReview,
            label: '고객의 성과 또는 리뷰',
            subLabel: '제품 또는 서비스를 사용한 고객의 성과나 리뷰를 공유하여 실제 사용자의 의견을 보여줍니다.',
            inputProps: {
              placeholder: '고객의 성과 또는 리뷰',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.introducingFutureUpdatesOrAdditionalFeatures,
            label: '향후 업데이트 또는 추가 기능 소개',
            subLabel:
              '제품 또는 서비스의 향후 업데이트 계획이나 추가 기능에 대한 정보를 제공하여 고객에게 기대감을 줍니다.',
            inputProps: {
              placeholder: '향후 업데이트 또는 추가 기능 소개',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          }
        ]
      },
      {
        title: '기본 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.companyName,
            label: '회사명',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '회사명',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.serviceName,
            label: '브랜드명',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '브랜드명',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            type: 'date',
            column: 12,
            name: inputNames.prodDate,
            label: '카드뉴스 공개일',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '2023-12-25',
              readonly: true
            }
          }
        ]
      }
    ]
  },
  {
    title: '고객 참여 및 상호작용',
    subTitle: '고객 상호작용을 통해 고객과의 친밀도를 높여보세요. 고객의 의견을 추가로 듣고 반영할 수 있습니다.',
    tip: '고객과의 상호작용을 강화하고 그들의 경험과 성과를 강조하여 브랜드와의 긍정적인 연결을 형성할 수 있습니다.',
    type: CARD_NEWS_TYPES.CUSTOMER_ENGAGEMENT_AND_INTERACTION,
    groups: [
      {
        title: '고객 참여 및 상호작용 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.specialMomentsWithCustomers,
            label: '고객과의 특별한 순간',
            subLabel: '특별했던 고객의 경험이나 이야기를 공유해 기업과의 상호작용하며 이야기를 공유합니다.',
            inputProps: {
              placeholder: '고객과의 특별한 순간',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.customerOpinionsAndFeedback,
            label: '고객의 의견과 피드백',
            subLabel:
              '프로젝트에 참여한 사람들이나 기업, 단체 등을 소개하여 프로젝트에 참여한 다양한 이해관계자들을 강조합니다.',
            inputProps: {
              placeholder: '고객의 의견과 피드백',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.communicationPlanWithCustomers,
            label: '고객과의 소통 방안',
            subLabel: '해당 고객을 위한 특별한 제안이나 맞춤형 서비스를 제공하는 방법에 대한 정보를 공유합니다.',
            inputProps: {
              placeholder: '고객과의 소통 방안',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.guidanceForFutureWithCustomers,
            label: '고객과의 향후 상호작용을 위한 안내',
            subLabel:
              '미래에도 계속적인 연결을 위해, 고객에게 다가가는 방법이나 향후 상호작용을 위한 안내를 제공합니다.',
            inputProps: {
              placeholder: '고객과의 향후 상호작용을 위한 안내',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.expressingAppreciationToCustomers,
            label: '고객에 대한 감사의 표시',
            subLabel: '특정 고객에 대한 감사의 의미로, 그들의 지원과 협력에 대한 감사를 표현합니다.',
            inputProps: {
              placeholder: '고객에 대한 감사의 표시',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          }
        ]
      },
      {
        title: '기본 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.companyName,
            label: '회사명',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '회사명',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.serviceName,
            label: '브랜드명',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '브랜드명',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            type: 'date',
            column: 12,
            name: inputNames.prodDate,
            label: '카드뉴스 공개일',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '2023-12-25',
              readonly: true
            }
          }
        ]
      }
    ]
  },

  {
    title: '기업 업데이트 뉴스',
    subTitle:
      '최신 업데이트 및 소식을 통해 브랜드의 성장과 발전 상황을 고객들과 공유하며, 회사의 비전과 목표를 이루기 위한 노력을 공유하세요.',
    tip: '기업의 최신 업데이트와 발전 상황을 보여주고 고객들에게 기업의 역량과 방향성을 소개합니다.',
    type: CARD_NEWS_TYPES.COOPORATE_UPDATE_NEWS,
    groups: [
      {
        title: '기업 업데이트 뉴스 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.latestNewsAndUpdate,
            label: '기업의 최신 소식 및 업데이트',
            subLabel:
              '최신 사업 또는 제품 런칭, 새로운 서비스 개시, 중요한 인사 소식 등과 같은 기업의 최신 소식을 소개합니다.',
            inputProps: {
              placeholder: '기업의 최신 소식 및 업데이트',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.overallCooprateStatusAndCompanyPerformance,
            label: '전반적인 기업 현황 및 성과',
            subLabel: '기업의 최근 경영 현황, 재정 상태, 성과 및 성장 동향 등을 요약하여 고객들에게 보여줍니다.',
            inputProps: {
              placeholder: '전반적인 기업 현황 및 성과',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.cooporateVisionAndFuturePlan,
            label: '기업의 비전 및 미래 계획',
            subLabel: '기업의 장기적인 방향성, 비전, 미래 전망, 다가오는 프로젝트 또는 계획 등을 공유합니다.',
            inputProps: {
              placeholder: '기업의 비전 및 미래 계획',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.guidanceForFutureWithCustomers,
            label: '고객 또는 파트너에 대한 감사와 소통',
            subLabel: '고객이나 파트너들에 대한 감사의 인사나 소통을 강조하며, 기업과 그들 간의 협력을 강화합니다.',
            inputProps: {
              placeholder: '고객 또는 파트너에 대한 감사와 소통',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          }
        ]
      },
      {
        title: '기본 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.companyName,
            label: '회사명',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '회사명',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.serviceName,
            label: '브랜드명',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '브랜드명',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            type: 'date',
            column: 12,
            name: 'prodDate',
            label: '카드뉴스 공개일',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '2023-12-25',
              readonly: true
            }
          }
        ]
      }
    ]
  },
  {
    title: '이벤트 및 프로모션',
    subTitle:
      '다양한 이벤트와 프로모션을 통해 고객들에게 특별한 혜택을 제공하고, 상호작용을 증진시키며 브랜드의 인지도와 관심도를 높여보세요.',
    tip: '이벤트 또는 프로모션의 목적, 참여 방법, 혜택, 규정 등을 명확하게 전달하여 고객들에게 유익한 정보를 제공할 수 있습니다.',
    type: CARD_NEWS_TYPES.EVENT_AND_PROMOTIONS,
    groups: [
      {
        title: '이벤트 및 프로모션 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.introductionToEventsAndPromotions,
            label: '이벤트 및 프로모션 소개',
            subLabel: '이벤트 또는 프로모션의 주제, 목적, 기간, 혜택에 대한 간단한 소개를 제공합니다.',
            inputProps: {
              placeholder: '이벤트 및 프로모션 소개',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.participationInEventsAndPromotions,
            label: '이벤트 및 프로모션 참여 방법',
            subLabel: '고객들이 이벤트에 참여하거나 프로모션 혜택을 받을 수 있는 방법과 절차를 설명합니다.',
            inputProps: {
              placeholder: '이벤트 및 프로모션 참여 방법',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.benefitsAndRewards,
            label: '혜택 및 보상 내용',
            subLabel: '이벤트 또는 프로모션 참여 시 제공되는 혜택, 할인 혜택, 경품 또는 보상에 대한 정보를 제공합니다.',
            inputProps: {
              placeholder: '혜택 및 보상 내용',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.eventsAndPromotionsKeyRules,
            label: '이벤트 및 프로모션 주요 규정',
            subLabel:
              '참여자들이 알아야 할 주요 규정이나 조건을 설명하여 이벤트/프로모션 참여에 필요한 요건을 안내합니다.',
            inputProps: {
              placeholder: '이벤트 및 프로모션 주요 규정',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.pastEventsAndPromotions,
            label: '지난 이벤트 및 프로모션 성과 또는 리뷰',
            subLabel: '이전 이벤트/프로모션의 성과나 고객 리뷰를 통해 성공적인 경험을 공유합니다.',
            inputProps: {
              placeholder: '지난 이벤트 및 프로모션 성과 또는 리뷰',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          }
        ]
      },
      {
        title: '기본 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.companyName,
            label: '회사명',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '회사명',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.serviceName,
            label: '브랜드명',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '브랜드명',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            type: 'date',
            column: 12,
            name: 'prodDate',
            label: '카드뉴스 공개일',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '2023-12-25',
              readonly: true
            }
          }
        ]
      }
    ]
  },
  {
    title: '정보 공유',
    subTitle: '유용한 정보와 산업 동향을 공유하여 브랜드의 산업군 내에서의 위치를 강화 전문성을과 신뢰도를 높여보세요.',
    tip: '정보를 명확하게 전달하고, 시각적인 요소를 활용하여 정보를 쉽게 이해하고 소화할 수 있도록 돕습니다.',
    type: CARD_NEWS_TYPES.SHARING_INFORMATION,
    groups: [
      {
        title: '정보 공유 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.introductionToTopicAndContent,
            label: '주제 및 내용 소개',
            subLabel: '공유할 정보의 주제나 주요 내용을 간략하게 소개하고, 왜 이 정보가 중요한지를 간단히 설명합니다.',
            inputProps: {
              placeholder: '주제 및 내용 소개',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.keyContentAndImportantPoints,
            label: '핵심 내용 및 중요 포인트',
            subLabel: '정보의 핵심 내용을 요약하여 보여주고, 주요 포인트를 강조하여 시각적으로 제시합니다.',
            inputProps: {
              placeholder: '핵심 내용 및 중요 포인트',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.moreInformation,
            label: '상세 정보',
            subLabel: '데이터를 포함한 상세 정보에 대한 내용을 제시합니다.',
            inputProps: {
              placeholder: '상세 정보',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.additionalResources,
            label: '추가 리소스 제공',
            subLabel:
              '정보를 보충하는 추가 자료, 링크, 참고 자료 등을 제공하여 관련 정보에 대한 깊이 있는 이해를 돕습니다.',
            inputProps: {
              placeholder: '추가 리소스 제공',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.summaryAndConclusion,
            label: '요약 및 결론',
            subLabel: '정보를 요약하고, 그것이 의미하는 바 또는 추론을 제공하여 독자에게 정보의 핵심을 강조합니다.',
            inputProps: {
              placeholder: '요약 및 결론',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.quoteOrMessage,
            label: '인용문 / 메시지',
            subLabel: '사업의 핵심 가치를 강조하거나 사업에 대한 비전을 담은 관계자의 인용문을 제공합니다.',
            inputProps: {
              placeholder: '인용문 / 메시지',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          }
        ]
      },
      {
        title: '기본 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.companyName,
            label: '회사명',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '회사명',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.serviceName,
            label: '브랜드명',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '브랜드명',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            type: 'date',
            column: 12,
            name: 'prodDate',
            label: '카드뉴스 공개일',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '2023-12-25',
              readonly: true
            }
          }
        ]
      }
    ]
  },
  {
    title: '채용 공고',
    subTitle: '기업의 성장을 위한 인재를 모집할 때, 필요 역량을 중시하여 팀 협력이 효과적인 인재를 찾아보세요.',
    tip: '채용 포지션에 대한 명확한 정보와 회사의 매력을 전달하여 적합한 인재를 모집할 수 있도록 도와줍니다.',
    type: CARD_NEWS_TYPES.JOB_POSTING,
    groups: [
      {
        title: '채용 공고 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.recruitmentPositionIntroduction,
            label: '채용 포지션 소개',
            subLabel: '해당 포지션의 제목과 직무에 대한 간단한 설명을 제공하여 어떤 역할을 하는지를 소개합니다.',
            inputProps: {
              placeholder: '채용 포지션 소개',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.qualificationsCompetencies,
            label: '자격 요건 및 역량',
            subLabel: '채용 대상자에게 요구되는 자격, 기술, 경험 등에 대한 명확한 요건을 설명합니다.',
            inputProps: {
              placeholder: '자격 요건 및 역량',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.companyIntroductionAndCulture,
            label: '회사 소개 및 문화',
            subLabel:
              '회사의 업무 분야, 가치관, 문화, 사내 분위기 등에 대한 간략한 소개를 통해 회사의 매력을 설명합니다.',
            inputProps: {
              placeholder: '회사 소개 및 문화',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.welfareAndBenefits,
            label: '복지 및 혜택',
            subLabel: '채용 대상자들에게 제공되는 혜택, 복지, 근무 환경 등에 대한 안내를 제공합니다.',
            inputProps: {
              placeholder: '복지 및 혜택',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.applicationMethodsAndProcedures,
            label: '지원 방법 및 절차',
            subLabel: '지원 방법, 절차, 마감일 등에 대한 명확한 안내를 제공하여 지원자들이 신청할 수 있도록 돕습니다.',
            inputProps: {
              placeholder: '지원 방법 및 절차',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.companyPerformanceAndFuturePlan,
            label: '회사의 성과 및 향후 전망',
            subLabel:
              '회사의 성과나 향후 전망에 대한 정보를 제공하여 지원자들에게 회사의 방향성과 잠재적인 성장 가능성을 보여줍니다.',
            inputProps: {
              placeholder: '회사의 성과 및 향후 전망',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          }
        ]
      },
      {
        title: '기본 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.companyName,
            label: '회사명',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '회사명',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.serviceName,
            label: '브랜드명',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '브랜드명',
              maxLength: MAXLENGTH_DEFAULT,
              multiline: true
            }
          },
          {
            type: 'date',
            column: 12,
            name: inputNames.prodDate,
            label: '카드뉴스 공개일',
            subLabel: '',
            inputProps: {
              required: true,
              placeholder: '2023-12-25',
              readonly: true
            }
          }
        ]
      }
    ]
  }
]

export const CardNewsValidateSchema = {
  [CARD_NEWS_TYPES.BRAND_PROMOTION]: yup.object().shape({
    [inputNames.brandCoreMessage]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.brandMissionAndValues]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.brandPerformace]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.brandStory]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.companyName]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.serviceName]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.prodDate]: yup.date().required('required')
  }),

  [CARD_NEWS_TYPES.PRODUCT_AND_SERVICE_INTRODUCTION]: yup.object().shape({
    [inputNames.productAndServiceIntroduction]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.productAndServiceKeyBenefits]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.useCaseAndApplication]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.customerPerformanceOrReview]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.introducingFutureUpdatesOrAdditionalFeatures]: yup
      .string()
      .max(MAXLENGTH_DEFAULT, 'Max')
      .required('required'),
    [inputNames.companyName]: yup.string().max(MAXLENGTH_DEFAULT).required('required'),
    [inputNames.serviceName]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.prodDate]: yup.date().required('required')
  }),

  [CARD_NEWS_TYPES.CUSTOMER_ENGAGEMENT_AND_INTERACTION]: yup.object().shape({
    [inputNames.specialMomentsWithCustomers]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.customerOpinionsAndFeedback]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.communicationPlanWithCustomers]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.guidanceForFutureWithCustomers]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.expressingAppreciationToCustomers]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.companyName]: yup.string().max(MAXLENGTH_DEFAULT).required('required'),
    [inputNames.serviceName]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.prodDate]: yup.date().required('required')
  }),

  [CARD_NEWS_TYPES.COOPORATE_UPDATE_NEWS]: yup.object().shape({
    [inputNames.latestNewsAndUpdate]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.overallCooprateStatusAndCompanyPerformance]: yup
      .string()
      .max(MAXLENGTH_DEFAULT, 'Max')
      .required('required'),
    [inputNames.cooporateVisionAndFuturePlan]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.guidanceForFutureWithCustomers]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    // [inputNames.expressingAppreciationToCustomers]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.companyName]: yup.string().max(MAXLENGTH_DEFAULT).required('required'),
    [inputNames.serviceName]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.prodDate]: yup.date().required('required')
  }),

  [CARD_NEWS_TYPES.EVENT_AND_PROMOTIONS]: yup.object().shape({
    [inputNames.introductionToEventsAndPromotions]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.participationInEventsAndPromotions]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.benefitsAndRewards]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.eventsAndPromotionsKeyRules]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.pastEventsAndPromotions]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.companyName]: yup.string().max(MAXLENGTH_DEFAULT).required('required'),
    [inputNames.serviceName]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.prodDate]: yup.date().required('required')
  }),

  [CARD_NEWS_TYPES.SHARING_INFORMATION]: yup.object().shape({
    [inputNames.introductionToTopicAndContent]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.keyContentAndImportantPoints]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.moreInformation]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.additionalResources]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.summaryAndConclusion]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.quoteOrMessage]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.companyName]: yup.string().max(MAXLENGTH_DEFAULT).required('required'),
    [inputNames.serviceName]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.prodDate]: yup.date().required('required')
  }),

  [CARD_NEWS_TYPES.JOB_POSTING]: yup.object().shape({
    [inputNames.recruitmentPositionIntroduction]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.qualificationsCompetencies]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.companyIntroductionAndCulture]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.welfareAndBenefits]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.applicationMethodsAndProcedures]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.companyPerformanceAndFuturePlan]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.companyName]: yup.string().max(MAXLENGTH_DEFAULT).required('required'),
    [inputNames.serviceName]: yup.string().max(MAXLENGTH_DEFAULT, 'Max').required('required'),
    [inputNames.prodDate]: yup.date().required('required')
  })
}

export const convertDataToCard = (datas: ICardNewsResponeData[], images: string[]): ICardData[] => {
  let count = 0

  return datas.map((data) => {
    const newData = { ...data }
    const krContent = data.content.kr.map((item) => ({
      title: item,
      imgURL: images[count++ % IMAGE_PAGE_LIMIT]
    }))
    const enContent = data.content.en.map((item, index) => ({ title: item, imgURL: krContent[index].imgURL }))
    return {
      ...newData,
      imgURL: images[count++ % IMAGE_PAGE_LIMIT],
      content: {
        kr: krContent,
        en: enContent
      }
    }
  })
}

interface ChangeImageInContentProps {
  data: ICardData[]
  idx: number
  contentIdx?: number
  newUrl: string
}

export const onChangeImageInContent = ({ data, idx, newUrl, contentIdx }: ChangeImageInContentProps) => {
  return data.map((item, index) => {
    if (idx === index) {
      return {
        ...item,
        content: {
          ...item.content,
          kr: item.content.kr.map((c, cIdx) => (cIdx === contentIdx ? { ...c, imgURL: newUrl } : c))
        }
      }
    }
    return item
  })
}

export const onChangeImageInCardData = ({ data, idx, newUrl }: ChangeImageInContentProps) => {
  return data.map((item, index) => {
    if (idx === index) return { ...item, imgURL: newUrl }
    return item
  })
}

interface ChangeTitleProps {
  data: ICardData[]
  idx: number
  contentIdx?: number
  newTitle: string
}

export const onChangeContentTitle = ({ data, idx, newTitle, contentIdx }: ChangeTitleProps) => {
  return data.map((item, index) => {
    if (idx === index) {
      return {
        ...item,
        content: {
          ...item.content,
          kr: item.content.kr.map((c, cIdx) => (cIdx === contentIdx ? { ...c, title: newTitle } : c))
        }
      }
    }
    return item
  })
}

export const onChangeTitle = ({ data, idx, newTitle }: ChangeTitleProps) => {
  return data.map((item, index) => {
    if (idx === index)
      return {
        ...item,
        title: {
          ...item.title,
          kr: newTitle
        }
      }
    return item
  })
}

export const onChangeSubTitle = ({ data, idx, newTitle, contentIdx }: ChangeTitleProps) => {
  return data.map((item, index) => {
    if (idx === index) {
      const krContent = [...item.subtitle.kr]
      krContent[contentIdx || 0] = newTitle
      return {
        ...item,
        subtitle: {
          ...item.subtitle,
          kr: krContent
        }
      }
    }

    return item
  })
}

export const DEFAULT_STEP = {
  deckId: 13,
  projectId: 1
}

export enum CardNewsEvents {
  RESET_FORM = 'RESET_FORM'
}

export const IMAGE_PAGE_LIMIT = 20
