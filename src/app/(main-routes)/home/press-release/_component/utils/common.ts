import { DATE_FORMAT } from '@/constants/common.constant'
import { PRESS_RELEASE_TYPES, inputNames } from '@/constants/press-release.constant'
import yup from '@/services/yup.service'
import { IPressReleaseGroup, IPressReleaseGroups, IPressReleaseInput } from '@/types/press-release/press-release.type'
import { StatusStep } from '@/types/step.type'
import moment from 'moment'

const MAXLENGTH_BRAND_CORE_MESSAGE = 100
const MAXLENGTH_BRAND_MISSION_VALUES = 100
const MAXLENGTH_BRAND_PERFORMANCE = 80
const MAXLENGTH_BRAND_NAME = 20

export const defaultPayload = {
  projectId: 10,
  deckId: 14,
  stepId: 1,
  status: StatusStep.FINISHED,
  playTime: 0,
  currentStep: 1,
  deletedStepActivitiesIds: [],
  data: []
}

export const pressReleaseTypes = [
  { id: 1, label: '개발', value: PRESS_RELEASE_TYPES.DEVELOPMENT },
  { id: 2, label: '공모', value: PRESS_RELEASE_TYPES.ANNOUNCEMENT },
  { id: 3, label: '사회적 가치창출', value: PRESS_RELEASE_TYPES.SOCIAL_VALUE_CREATION },
  { id: 4, label: '성과', value: PRESS_RELEASE_TYPES.PERFORMANCE },
  { id: 5, label: '수상 및 인증', value: PRESS_RELEASE_TYPES.AWARDS_AND_CERTIFICATIONS },
  { id: 6, label: '사업기획', value: PRESS_RELEASE_TYPES.BUSINESS_PLAINNING },
  { id: 7, label: '수주', value: PRESS_RELEASE_TYPES.ORDERS },
  { id: 8, label: '인물동정', value: PRESS_RELEASE_TYPES.PEOPLE_NEWS },
  { id: 9, label: '창립', value: PRESS_RELEASE_TYPES.FOUNDING },
  { id: 10, label: '정책 및 제안', value: PRESS_RELEASE_TYPES.POLICIES_AND_PROPOSALS },
  { id: 11, label: '신제품 출시', value: PRESS_RELEASE_TYPES.NEW_PRODUCT_LAUNCH },
  { id: 12, label: '채용', value: PRESS_RELEASE_TYPES.RECRUITMENT },
  { id: 13, label: '연구조사', value: PRESS_RELEASE_TYPES.RESEARCH },
  { id: 14, label: '투자활동', value: PRESS_RELEASE_TYPES.INVESTMENT_ACTIVITIES },
  { id: 15, label: '이벤트', value: PRESS_RELEASE_TYPES.EVENT },
  { id: 16, label: '인사', value: PRESS_RELEASE_TYPES.PERSONNEL },
  { id: 17, label: '인수합병', value: PRESS_RELEASE_TYPES.MERGERS_AND_ACQUISITIONS },
  { id: 18, label: '전시행사', value: PRESS_RELEASE_TYPES.EXHIBITION_EVENT },
  { id: 19, label: '판촉활동', value: PRESS_RELEASE_TYPES.SALES_PROMOTION },
  { id: 20, label: '파트너십', value: PRESS_RELEASE_TYPES.PARTNERSHIP }
]

const commonGroupForm: IPressReleaseGroup = {
  title: '기본 정보',
  fields: [
    {
      column: 6,
      type: 'input',
      name: inputNames.companyName,
      label: '회사명',
      subLabel: '',
      inputProps: {
        required: true,
        placeholder: '회사명',
        maxLength: MAXLENGTH_BRAND_CORE_MESSAGE
      },
      validations: [{ params: [100], type: 'max' }]
    },
    {
      column: 6,
      type: 'input',
      name: inputNames.representativeName,
      label: '대표자명',
      subLabel: '',
      inputProps: {
        required: true,
        placeholder: '대표자명',
        maxLength: MAXLENGTH_BRAND_CORE_MESSAGE
      },
      validations: [{ params: [100], type: 'max' }]
    },
    {
      type: 'date',
      column: 12,
      name: inputNames.distributionDate,
      label: '배포일자',
      subLabel: '',
      inputProps: {
        required: true,
        placeholder: moment().format(DATE_FORMAT.DASH_REV)
      }
    }
  ]
}

const quoteMessageForm = (des: string): IPressReleaseInput => {
  return {
    column: 12,
    type: 'textarea',
    name: inputNames.quoteMessage,
    label: '인용문 / 메시지',
    subLabel: des,
    inputProps: {
      placeholder: '인용문 / 메시지',
      maxLength: MAXLENGTH_BRAND_MISSION_VALUES,
      multiline: true,
      rows: 2
    },
    validations: [{ params: [100], type: 'max' }]
  }
}

export const pressReleaseFormTypes: IPressReleaseGroups[] = [
  {
    title: '개발',
    description:
      '조직이 기술적 혁신을 추구하고, 새로운 제품 또는 서비스를 소개함으로써 시장에서의 경쟁력을 강화해보세요.',
    tip: '기술적인 부분을 알기 쉽게 설명하고, 프로젝트의 결과물과 성과를 구체적으로 제시하여, 기술 및 개발에 대한 보도 내용을 이해할 수 있습니다.',
    type: PRESS_RELEASE_TYPES.DEVELOPMENT,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.projectNameAndPurpose,
            label: '프로젝트 명과 목적 소개',
            subLabel: '개발 프로젝트의 명칭과 주요 목적을 간단히 소개하여 프로젝트의 방향성을 제시합니다.',
            inputProps: {
              placeholder: '프로젝트 명과 목적 소개',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.developmentScopeAndContent,
            label: '개발 범위와 내용 설명',
            subLabel: '사용된 기술이나 개발 방법에 대한 간략한 소개를 통해 프로젝트의 기술적 측면을 강조합니다.',
            inputProps: {
              placeholder: '개발 범위와 내용 설명',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.techniqueOrMethod,
            label: '기술 또는 방법 소개',
            subLabel: '사용된 기술이나 개발 방법에 대한 간략한 소개를 통해 프로젝트의 기술적 측면을 강조합니다.',
            inputProps: {
              placeholder: '기술 또는 방법 소개',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.collaborationOrTeamIntroduction,
            label: '협력 또는 팀 소개',
            subLabel:
              '협력사 또는 팀원 소개를 통해 협업의 중요성을 강조하고, 다양한 전문성을 갖추고 있음을 보여줍니다.',
            inputProps: {
              placeholder: '협력 또는 팀 소개',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.developmentResultsAndAchievements,
            label: '개발 결과물 및 성과 소개',
            subLabel: '개발로 얻은 결과물이나 성과를 소개하여 프로젝트의 실질적인 성과를 강조합니다.',
            inputProps: {
              placeholder: '개발 결과물 및 성과 소개',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm(
            '투자를 한 투자자 또는 기업 대표의 의견이나 코멘트를 인용문으로 추가하여 감정적으로 다가갈 수 있습니다.'
          )
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '공모',
    description:
      '참가자 모집, 주제 강조, 창의성 부각 등을 통해 대중들의 관심을 끄는 중요한 홍보 수단으로 활용해보세요.',
    tip: '진행하는 공모의 독특한 측면과 가치를 강조해 대중의 관심을 끌 수 있어야 합니다. 상세한 참가 방법 및 혜택을 강조해 참여를 독려할 수 있습니다.',
    type: PRESS_RELEASE_TYPES.ANNOUNCEMENT,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.contestTopicAndPurpose,
            label: '공모 주제 및 목적',
            subLabel:
              '공모의 주요 주제와 목적을 간결하게 서술합니다. 어떤 분야 또는 주제를 다루는지와 그 공모의 목적을 설명합니다.',
            inputProps: {
              placeholder: '공모 주제 및 목적',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.hostingAndSponsoringOrganizations,
            label: '주최 및 협찬 기관 소개',
            subLabel: '공모를 주최하는 단체, 기업 또는 개인에 대한 정보를 소개합니다.',
            inputProps: {
              placeholder: '주최 및 협찬 기관 소개',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.participantBenefitInformation,
            label: '참가자 혜택 정보',
            subLabel:
              '참가자들이 받을 수 있는 혜택, 상금 또는 기타 장려금 등에 대한 정보를 설명하여 참여 동기를 부각시킵니다.',
            inputProps: {
              placeholder: '참가자 혜택 정보',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.contestEligibilityAndParticipationMethod,
            label: '공모 자격 및 참가 방법',
            subLabel:
              '공모의 내용과 관련된 세부 정보를 제공합니다. 참가 자격, 기간, 참가 방법 등을 설명하여 공모에 참여하고자 하는 사람들에게 정보를 제공합니다.',
            inputProps: {
              placeholder: '공모 자격 및 참가 방법',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.screeningAndEvaluationCriteria,
            label: '심사 및 평가 기준',
            subLabel:
              '참여 내용을 평가하는 기준과 방법에 대해 설명합니다. 평가의 공정성과 심사 과정을 간단히 설명하여 참가자들에게 이해를 돕습니다.',
            inputProps: {
              placeholder: '심사 및 평가 기준',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm(
            '공모와 관련된 주요 메시지나 주최자, 전문가의 인용문을 추가하여 보도자료의 핵심 내용을 강조합니다.'
          )
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '사회적 가치 창출',
    description: '사회적 문제를 개선하고, 사회 전반에 긍정적인 영향을 끼치는 프로젝트를 다뤄보세요.',
    tip: '프로젝트의 실질적인 사회적 영향과 결과에 집중하여 효과적인 홍보 수단으로 활용할 수 있습니다.',
    type: PRESS_RELEASE_TYPES.SOCIAL_VALUE_CREATION,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.projectIntroduction,
            label: '프로젝트 소개',
            subLabel: '사회적 가치창출을 위한 프로젝트의 개요와 목적을 간략하게 소개합니다.',
            inputProps: {
              placeholder: '프로젝트 소개',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.participantsAndPartnerOrganizations,
            label: '참여자 및 협력 기관 소개',
            subLabel:
              '프로젝트에 참여한 사람들이나 기업, 단체 등을 소개하여 프로젝트에 참여한 다양한 이해관계자들을 강조합니다.',
            inputProps: {
              placeholder: '참여자 및 협력 기관 소개',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.settingSocialIssuesOrGoals,
            label: '사회적 문제 또는 목표 설정',
            subLabel: '프로젝트가 해결하거나 개선하고자 하는 사회적 문제나 목표를 구체적으로 설명합니다.',
            inputProps: {
              placeholder: '사회적 문제 또는 목표 설정',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.activityContentAndResults,
            label: '활동 내용과 결과',
            subLabel:
              '프로젝트에서 이루어진 구체적인 활동과 그로 인한 결과를 보다 자세히 설명하여 사회적 가치창출의 실제적 영향을 강조합니다.',
            inputProps: {
              placeholder: '활동 내용과 결과',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.sustainabilityAndFuturePlans,
            label: '지속 가능성과 향후 계획',
            subLabel:
              '프로젝트의 장기적인 영향과 지속 가능성을 강조하고, 향후 계획이나 지속적인 발전 방향을 소개합니다.',
            inputProps: {
              placeholder: '지속 가능성과 향후 계획',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm(
            '프로젝트의 주요 가치나 메시지를 강조하는 인용문을 제공하여 사회적 가치창출의 중요성을 강조합니다.'
          )
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '성과',
    description: '조직이 어떤 재무, 기술, 사회적 성과를 달성했는지를 알려 조직의 실력과 성공을 강조해보세요.',
    tip: '수상의 신뢰성과 영향력을 강조하기 위해서 수상 배경 및 업적을 구체적으로 설명할 수 있습니다.',
    type: PRESS_RELEASE_TYPES.PERFORMANCE,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.overviewAndSummary,
            label: '성과 개요 및 요약',
            subLabel: '성과를 간결하게 요약하여 어떤 성과가 이루어졌는지 강조합니다.',
            inputProps: {
              placeholder: '성과 개요 및 요약',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.reasonsAndFactors,
            label: '성과 이유와 요인',
            subLabel: '성과가 이루어진 이유와 관련된 요인들을 설명하여 성과의 원인을 간략히 기술합니다.',
            inputProps: {
              placeholder: '성과 이유와 요인',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.influenceAndEffect,
            label: '영향과 효과',
            subLabel: '성과가 가져온 영향과 효과를 구체적으로 설명하여 그 가치를 강조합니다.',
            inputProps: {
              placeholder: '영향과 효과',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.maintenanceAndDevelopmentDirection,
            label: '성과 유지 및 발전 방향',
            subLabel: '성과를 유지하고 발전시키기 위한 방향성과 계획을 소개하여 지속 가능성을 강조합니다.',
            inputProps: {
              placeholder: '성과 유지 및 발전 방향',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.futureProspectsAndPlans,
            label: '향후 전망과 계획',
            subLabel: '성과를 바탕으로 예상되는 향후 계획과 전망을 제시하여 지속적인 발전을 강조합니다.',
            inputProps: {
              placeholder: '향후 전망과 계획',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm('성과에 대한 감사나 믿음을 표현하는 인용문을 제공하여 성과의 의미와 중요성을 강조합니다.')
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '수상 및 인증',
    description:
      '조직이 어떠한 영광스러운 결과를 얻거나 특정 기준에 따라 인증을 받았음을 전달하여 조직의 우수성을 강조해보세요.',
    tip: '수상의 신뢰성과 영향력을 강조하기 위해서 수상 배경 및 업적을 구체적으로 설명할 수 있습니다.',
    type: PRESS_RELEASE_TYPES.AWARDS_AND_CERTIFICATIONS,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.awardDetailsAndBackground,
            label: '수상 내용 및 배경',
            subLabel: '어떤 상이 수여되었는지, 그 배경과 함께 수상 내용을 간략하게 소개합니다.',
            inputProps: {
              placeholder: '수상 내용 및 배경',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.winnerInformationAndAchievements,
            label: '수상자 정보와 업적',
            subLabel:
              '수상을 받은 개인 또는 단체의 정보와 수상 이유, 업적 등을 소개하여 그들의 신뢰성과 성과를 강조합니다.',
            inputProps: {
              placeholder: '수상자 정보와 업적',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.meaningAndValueOfAward,
            label: '수상의 의미와 가치',
            subLabel: '수상이 의미하는 바와 그 가치를 설명하여 수상의 중요성을 강조합니다.',
            inputProps: {
              placeholder: '수상의 의미와 가치',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.impactOfAwards,
            label: '수상의 영향과 파급력',
            subLabel: '수상이 가져온 영향과 그 파급력에 대해 구체적으로 설명하여 수상의 결과를 강조합니다.',
            inputProps: {
              placeholder: '수상의 영향과 파급력',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm('수상자의 감사 인사나 수상 소감을 담은 인용문을 제공하여 그들의 정직한 감정을 전달합니다.')
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '사업기획',
    description:
      '새로운 사업 또는 전략을 성공적으로 기획하고 시작함을 알리며, 기업의 미래 전망과 성장 방향을 공유해보세요.',
    tip: '사업기획은 신중하고 구체적인 계획이 전달되어야 합니다. 또한, 이해관게자들의 의견을 수렴한 내용을 작성해야 합니다.',
    type: PRESS_RELEASE_TYPES.BUSINESS_PLAINNING,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.businessIdeaAndOverview,
            label: '사업 아이디어와 개요',
            subLabel: '사업 아이디어와 기획 개요를 간략하게 소개하여 사업의 전반적인 내용을 알립니다.',
            inputProps: {
              placeholder: '사업 아이디어와 개요',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.marketResearchAndAnalysisResults,
            label: '시장 조사 및 분석 결과',
            subLabel: '시장 조사와 분석 결과를 토대로 시장의 상황과 가능성을 구체적으로 설명합니다.',
            inputProps: {
              placeholder: '시장 조사 및 분석 결과',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.goalsAndStrategies,
            label: '목표와 전략',
            subLabel: '사업의 목표와 그를 달성하기 위한 전략을 명확하게 제시하여 사업의 방향성을 강조합니다.',
            inputProps: {
              placeholder: '목표와 전략',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.findingBusinessModels,
            label: '사업 모델과 수익 모색',
            subLabel: '사업의 모델과 수익 창출 방안을 기술하여 사업의 비즈니스적 측면을 강조합니다.',
            inputProps: {
              placeholder: '사업 모델과 수익 모색',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.riskManagementAndResponseStrategy,
            label: '리스크 관리와 대응 전략',
            subLabel: '예상되는 리스크와 그에 대한 대응 전략을 소개하여 사업의 안정성을 강조합니다.',
            inputProps: {
              placeholder: '리스크 관리와 대응 전략',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm('사업의 핵심 가치를 강조하거나 사업에 대한 비전을 담은 관계자의 인용문을 제공합니다.')
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '수주',
    description:
      '조직이 새로운 인재를 영입하거나 특정 포지션에 인재를 채용했음을 알리며, 조직의 성장과 전략에 대한 메시지를 전달해보세요.',
    tip: '수주로 인한 확대된 기회와 향후 전망에 대해 구체적으로 기술해야 합니다.',
    type: PRESS_RELEASE_TYPES.ORDERS,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.orderContract,
            label: '수주 계약 내용과 범위',
            subLabel: '수주한 계약의 내용과 범위를 구체적으로 소개하여 어떤 일을 맡았는지를 명확히 밝힙니다.',
            inputProps: {
              placeholder: '수주 계약 내용과 범위',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.customerReceivedOrder,
            label: '수주한 기업 또는 고객사 정보',
            subLabel: '수주한 기업 또는 고객사에 대한 정보와 그들과의 협력에 관한 내용을 제공하여 신뢰성을 높입니다.',
            inputProps: {
              placeholder: '수주한 기업 또는 고객사 정보',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.orderWinningStrategy,
            label: '수주 전략',
            subLabel: '수주를 이루기 위해 사용된 전략과 기업의 경쟁력을 강조하여 성공적인 수주의 배경을 설명합니다.',
            inputProps: {
              placeholder: '수주를 이끈 전략과 경쟁력',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.valueOfOrders,
            label: '수주의 가치',
            subLabel:
              '수주가 기업에 미치는 경제적 영향과 수주로부터 기대되는 가치를 소개하여 수주의 중요성을 강조합니다.',
            inputProps: {
              placeholder: '수주의 가치',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.opportunitiesAndFutureProspects,
            label: '수주로 인한 기회 및 향후 전망',
            subLabel: '수주로 인해 기업의 확대된 기회와 향후 전망을 제시하여 기업의 성장성을 강조합니다.',
            inputProps: {
              placeholder: '수주로 인한 기회 및 향후 전망',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm('수주와 관련된 관계자의 인용문구를 활용해 더욱 효과적으로 기업 수주 소감을 전달합니다.')
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '인물동정',
    description:
      '조직 내부의 주요 인물에 대한 소식과 업적, 또는 새로운 역할에 대한 정보를 공유하여 조직의 리더십을 강조해보세요.',
    tip: '창립에 관한 정보를 정확하게 제공하여 기업 또는 단체의 초기 정체성과 가치를 알립니다. 창립 이후의 발전과 성장, 그리고 창립 이후의 기업이나 단체의 중요한 성과를 강조합니다.',
    type: PRESS_RELEASE_TYPES.PEOPLE_NEWS,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.backgroundAndCareer,
            label: '인물의 배경과 경력',
            subLabel: '해당 인물의 개인적 배경과 경력을 소개하여 그들의 신뢰성과 역량을 강조합니다.',
            inputProps: {
              placeholder: '인물의 배경과 경력',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.personAchievements,
            label: '인물의 업적과 성과',
            subLabel: '인물이 이룬 주요 업적과 성과를 구체적으로 기술하여 그들의 능력과 역량을 강조합니다.',
            inputProps: {
              placeholder: '인물의 업적과 성과',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.participationAndInfluence,
            label: '인물의 참여 및 영향력',
            subLabel: '해당 인물이 참여한 프로젝트, 사업 등의 영향력과 그들의 역할에 관한 내용을 제공합니다.',
            inputProps: {
              placeholder: '인물의 참여 및 영향력',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.valuesAndVision,
            label: '인물의 가치관과 비전',
            subLabel: '인물의 가치관, 비전, 목표 등을 소개하여 그들의 리더십과 성장을 강조합니다.',
            inputProps: {
              placeholder: '인물의 가치관과 비전',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.socialActivitiesAndContributions,
            label: '인물의 사회적 활동 및 기여',
            subLabel: '해당 인물이 사회에 기여한 활동과 사회적 영향력을 소개하여 그들의 사회적 책임감을 강조합니다.',
            inputProps: {
              placeholder: '인물의 사회적 활동 및 기여',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm('해당 인물과 관련된 동료 또는 이해관계자의 인용문을 제공해 가치와 영향력을 강조합니다.')
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '창립',
    description: '조직이 설립된 배경, 목적, 그리고 창립자들의 비전을 소개하여 조직의 기원과 첫걸음을 강조해보세요.',
    tip: '창립에 관한 정보를 정확하게 제공하여 기업 또는 단체의 초기 정체성과 가치를 알립니다. 창립 이후의 발전과 성장, 그리고 창립 이후의 기업이나 단체의 중요한 성과를 강조합니다.',
    type: PRESS_RELEASE_TYPES.FOUNDING,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.backgroundAndHistory,
            label: '창립 배경과 역사',
            subLabel: '창립 당시의 배경과 기업 또는 단체의 역사적인 이야기를 소개하여 창립의 시작을 설명합니다.',
            inputProps: {
              placeholder: '창립 배경과 역사',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.founderIntroduction,
            label: '설립자 소개',
            subLabel:
              '설립자나 주요 창립 멤버들의 역할과 이들의 열정, 비전 등을 강조하여 창립에 대한 인물적 요소를 소개합니다.',
            inputProps: {
              placeholder: '설립자 소개',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.purposeAndVision,
            label: '창립 목적과 비전',
            subLabel: '창립 시의 목적과 그로부터의 비전을 명확하게 설명하여 창립 의도와 방향성을 강조합니다.',
            inputProps: {
              placeholder: '창립 목적과 비전',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.developmentAndGrowth,
            label: '창립 이후의 발전과 성장',
            subLabel: '창립 이후의 성장 과정과 발전을 간략히 소개하여 초기 비전과의 연결성을 보여줍니다.',
            inputProps: {
              placeholder: '창립 이후의 발전과 성장',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.foundingCeremony,
            label: '창립 기념 행사',
            subLabel: '창립 기념 행사 계획 또는 일정을 소개합니다.',
            inputProps: {
              placeholder: '창립 기념 행사',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm(
            '창립자나 주요 인물들의 견해, 미래에 대한 비전, 조직의 가치와 목표를 강조하여 조직의 핵심 이념과 문화를 감정적으로 전달합니다.'
          )
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '정책 및 제안',
    description: '기업과 관련된 새로운 정책이나 제안을 소개하여 기업 및 사회적 영향과 변화에 대한 의견을 다뤄보세요.',
    tip: '정책 및 제안 보도자료에서는 해당 정책이나 제안이 사회적으로 가져올 영향과 변화에 대해 신중히 고려하여 분석하고 기술해야 합니다. 이해관계자들의 의견을 고려하고, 정책이나 제안이 가져올 다양한 영향을 명확하게 제시하는 것이 중요합니다.',
    type: PRESS_RELEASE_TYPES.POLICIES_AND_PROPOSALS,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.policyOverviewAndPurpose,
            label: '정책 개요와 목적',
            subLabel: '해당 정책의 개요와 목적을 간략하게 소개합니다.',
            inputProps: {
              placeholder: '정책 개요와 목적',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.proposedPolicyContentAndKeyPoints,
            label: '제안된 정책 내용과 핵심',
            subLabel: '제안된 정책의 세부 사항과 그 핵심을 구체적으로 설명하여 정책의 내용을 명확하게 전달합니다.',
            inputProps: {
              placeholder: '제안된 정책 내용과 핵심',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.impactAndEffectAnalysis,
            label: '영향과 효과 분석',
            subLabel: '제안된 정책이나 제안의 예상되는 영향과 효과를 분석하여 이를 통해 예상되는 결과를 설명합니다.',
            inputProps: {
              placeholder: '영향과 효과 분석',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.planAccordingToImplementationAndImplementation,
            label: '시행 및 실행에 따른 계획',
            subLabel: '정책이나 제안의 시행 및 실행에 따라 기업의 구체적인 계획을 설명합니다.',
            inputProps: {
              placeholder: '시행 및 실행에 따른 계획',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm('해당 정책에 영향을 받는 이해관계자들의 의견이나 참여 내용을 반영하여 정보를 제공합니다.')
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '신제품 출시',
    description: '조직이 어떤 재무, 기술, 사회적 성과를 달성했는지를 알려 조직의 실력과 성공을 강조해보세요.',
    tip: '신제품 출시 보도자료에서는 제품의 혁신성과 차별점, 그리고 소비자들에게 제공하는 가치에 중점을 두어야 합니다. 제품 출시 전략과 가격 정보를 명확하게 제시하고, 전문가 리뷰나 테스트 결과를 통해 제품의 신뢰성을 강조하는 것이 중요합니다.',
    type: PRESS_RELEASE_TYPES.NEW_PRODUCT_LAUNCH,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.productIntroductionAndFunctionDescription,
            label: '제품 소개와 기능 설명',
            subLabel: '새로운 제품의 특징과 기능을 간략하게 소개하여 제품의 주요 포인트를 설명합니다.',
            inputProps: {
              placeholder: '제품 소개와 기능 설명',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.differencesComparedToExistingProducts,
            label: '기존 제품 대비 차별점',
            subLabel: '신제품이 기존 제품과 비교했을 때의 혁신성과 차별점을 강조하여 새로운 가치를 전달합니다.',
            inputProps: {
              placeholder: '기존 제품 대비 차별점',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.productMarketEntryStrategyAndTargets,
            label: '제품의 시장 진입 전략과 타겟',
            subLabel: '새 제품의 시장 진입 전략과 타겟 층에 대한 정보를 소개하여 제품의 목표를 설명합니다.',
            inputProps: {
              placeholder: '제품의 시장 진입 전략과 타겟',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.productReleaseScheduleAndPricingInformation,
            label: '제품 출시 일정 및 가격 정보',
            subLabel: '제품의 출시 일정과 예상 가격 등의 정보를 제공하여 소비자들에게 유용한 정보를 전달합니다.',
            inputProps: {
              placeholder: '제품 출시 일정 및 가격 정보',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.productTestingOrReviewContent,
            label: '제품 테스트 또는 리뷰 내용',
            subLabel: '제품 테스트 결과 또는 리뷰의 전반적인 내용을 다뤄 신뢰도를 높입니다.',
            inputProps: {
              placeholder: '제품 테스트 또는 리뷰 내용',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm('제품 출시와 관련된 관계자 또는 고객의 말을 인용한 메시지를 전달합니다.')
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '채용',
    description:
      '조직이 새로운 인재를 영입하거나 특정 포지션에 인재를 채용했음을 알리며, 조직의 성장과 전략에 대한 메시지를 전달해보세요.',
    tip: '채용 보도자료는 구체적인 업무 내용과 회사의 가치를 명확하게 설명하여 지원자들이 관심을 가질 수 있도록 합니다. 채용 프로세스나 자격 요건을 명확히 제시하고, 회사의 문화와 가치를 소개하여 적합한 인재들이 지원할 수 있도록 유도해야 합니다.',
    type: PRESS_RELEASE_TYPES.RECRUITMENT,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.introductionAndBackgroundOfTheRecruitingCompany,
            label: '채용 회사의 소개 및 배경',
            subLabel: '회사의 소개와 배경을 간략히 소개하여 채용하는 회사의 특징을 나타냅니다.',
            inputProps: {
              placeholder: '채용 회사의 소개 및 배경',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.recruitmentJobAndRoleDescription,
            label: '채용 직무와 역할 설명',
            subLabel: '채용되는 직무와 해당 역할의 주요 책임과 업무 내용을 구체적으로 설명합니다.',
            inputProps: {
              placeholder: '채용 직무와 역할 설명',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.qualificationsAndPreferences,
            label: '자격 요건과 우대 사항',
            subLabel: '지원자에게 요구되는 자격 요건과 우대 사항을 명확하게 기술하여 적합한 지원자를 유도합니다.',
            inputProps: {
              placeholder: '자격 요건과 우대 사항',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.recruitmentProcessAndSchedule,
            label: '채용 프로세스 및 일정',
            subLabel: '채용 프로세스와 각 단계의 일정을 안내하여 지원자들에게 정보를 제공합니다.',
            inputProps: {
              placeholder: '채용 프로세스 및 일정',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.companyCultureAndValues,
            label: '회사 문화와 가치',
            subLabel: '회사의 문화와 가치관을 소개하여 지원자들에게 회사의 분위기와 가치를 전달합니다.',
            inputProps: {
              placeholder: '회사 문화와 가치',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm('채용 담당자 또는 동료의 말을 인용해 더욱 기업이 원하는 인재상의 지원을 독려합니다.')
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '연구조사',
    description: '조직이 수행한 연구나 조사 결과를 발표함으로써, 해당 분야에서의 전문성과 기술적 역량을 강조해보세요.',
    tip: '연구조사 보도자료는 결과 요약과 함께 의미 있는 인사이트를 제공하여 이해를 돕는 것이 중요합니다. 연구 방법과 데이터 신뢰성에 대한 정보를 명확히 제시하고, 연구 결과의 실제적인 의미와 현실 적용 가능성을 강조해야 합니다.',
    type: PRESS_RELEASE_TYPES.RESEARCH,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.introductionAndBackgroundOfTheRecruitingCompany,
            label: '연구 주제와 목적',
            subLabel: '연구의 주요 주제와 목적을 간단히 소개하여 연구의 방향성을 설명합니다.',
            inputProps: {
              placeholder: '연구 주제와 목적',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.recruitmentJobAndRoleDescription,
            label: '연구 방법과 프로세스',
            subLabel: '연구에서 사용된 방법론과 프로세스를 설명하여 연구의 신뢰성과 타당성을 강조합니다.',
            inputProps: {
              placeholder: '연구 방법과 프로세스',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.qualificationsAndPreferences,
            label: '주요 연구 결과 요약',
            subLabel: '연구에서 얻은 주요 결과를 간략히 요약하여 연구의 중요성을 강조합니다.',
            inputProps: {
              placeholder: '주요 연구 결과 요약',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.recruitmentProcessAndSchedule,
            label: '연구 결과의 의미',
            subLabel: '연구 결과가 가진 의미와 실제 현실에 적용 가능한 부분을 소개하여 유용성을 설명합니다.',
            inputProps: {
              placeholder: '연구 결과의 의미',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.companyCultureAndValues,
            label: '연구 팀 또는 참여자 정보',
            subLabel: '연구에 참여한 팀이나 연구자들의 정보를 제공하여 연구의 신뢰성을 높입니다.',
            inputProps: {
              placeholder: '연구 팀 또는 참여자 정보',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm('연구 팀의 팀원 또는 참여자의 인용문을 활용해 연구 과정 및 노력을 드러냅니다.')
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '투자활동',
    description:
      '조직이 새로운 자금을 유치하거나 투자를 받아들였음을 알리며, 해당 투자가 조직의 성장과 발전에 어떻게 기여할 것인지 강조해보세요.',
    tip: '투자 관련된 정보는 비공개되는 경우가 있습니다. 투자 유치 관련 보도자료 배포 시 투자자와 언론 공개 여부를 상의하여 결정해야 합니다.',
    type: PRESS_RELEASE_TYPES.INVESTMENT_ACTIVITIES,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.researchTopicAndPurpose,
            label: '투자내용 및 규모',
            subLabel: '합병되는 기업의 주요 정보, 배경에 대한 정보를 제공합니다.',
            inputProps: {
              placeholder: '투자내용 및 규모',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.researchMethodsAndProcesses,
            label: '투자자 정보',
            subLabel:
              '투자를 한 기관 또는 개인의 정보를 제공합니다. 투자자의 신뢰성과 전문성에 대한 정보를 강조할 수 있습니다.',
            inputProps: {
              placeholder: '투자자 정보',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.summaryOfKeyFindings,
            label: '투자의 목적과 기대효과',
            subLabel:
              '투자의 목적과 기대효과를 명확히 설명합니다. 이는 기업의 성장, 혁신, 향후 계획 등을 다룰 수 있습니다.',
            inputProps: {
              placeholder: '투자의 목적과 기대효과',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.whatTheFindingsMean,
            label: '투자 활용 계획',
            subLabel:
              '투자를 어떻게 활용할 것인지에 대한 구체적인 계획을 제시합니다. 예를 들어, 연구 및 개발, 시장 확장, 기술 개선 등의 내용을 다룰 수 있습니다.',
            inputProps: {
              placeholder: '투자 활용 계획',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.researchTeamOrParticipantInformation,
            label: '향후 전망과 계획',
            subLabel: '투자를 통해 기대되는 향후 성과와 기업의 전략적 계획을 간략히 소개합니다.',
            inputProps: {
              placeholder: '향후 전망과 계획',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm(
            '투자를 한 투자자 또는 기업 대표의 의견이나 코멘트를 인용문으로 추가하여 감정적으로 다가갈 수 있습니다.'
          )
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '이벤트',
    description:
      '조직의 특별한 행사나 활동을 소개하여 이벤트의 의미와 참가자들에게 전달하고자 하는 메시지를 알려보세요.',
    tip: '이벤트 보도자료는 참여 대상, 참가 방법, 이벤트의 목적과 내용을 명확하고 간결하게 전달하여 참여를 유도해야 합니다. 특별 게스트나 프로그램 소개를 통해 이벤트의 흥미를 높이는 것이 중요합니다. ',
    type: PRESS_RELEASE_TYPES.EVENT,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.eventNameAndSchedule,
            label: '이벤트명과 일정',
            subLabel: '이벤트의 이름과 개최 일정을 소개하여 독자들에게 시기를 알려줍니다.',
            inputProps: {
              placeholder: '이벤트명과 일정',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.evenPurposeAndMainContent,
            label: '이벤트 목적과 주요 내용',
            subLabel: '이벤트의 주요 목적과 예정된 내용을 소개하여 참여할 이벤트의 가치를 전달합니다.',
            inputProps: {
              placeholder: '이벤트 목적과 주요 내용',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.whoCanParticipateAndHowToParticipate,
            label: '참여 대상과 참가 방법',
            subLabel: '이벤트에 참여할 수 있는 대상과 참가 방법을 설명하여 참여자들을 유도합니다.',
            inputProps: {
              placeholder: '참여 대상과 참가 방법',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.eventLocationAndFormat,
            label: '이벤트 장소와 형식',
            subLabel: '이벤트가 개최되는 장소와 형식을 설명하여 참석자들이 이벤트를 상상할 수 있도록 돕습니다.',
            inputProps: {
              placeholder: '이벤트 장소와 형식',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.introducingSpecialGuestsOrPrograms,
            label: '특별 게스트 또는 프로그램 소개',
            subLabel: '이벤트에 특별 게스트나 프로그램이 있다면 소개하여 참여자들의 기대감을 높입니다.',
            inputProps: {
              placeholder: '특별 게스트 또는 프로그램 소개',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm('이벤트를 준비한 관게자의 소감을 인용하여 이벤트에 대한 기대감을 높입니다.')
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '인사',
    description:
      '조직 내에서의 인사 이동, 새로운 임원의 부임 또는 퇴임 등 인사와 관련된 소식을 공개하여 조직의 동향과 리더십 변화를 알립니다.',
    tip: '인사 보도자료에서는 인사 결정의 전략적 중요성을 강조하고, 새로운 역할에 대한 인사 대상자의 역량과 경험을 구체적으로 강조하는 것이 중요합니다. 또한 조직 내 변화에 대한 긍정적인 전망과 기대감을 전달하는 것도 중요합니다.',
    type: PRESS_RELEASE_TYPES.PERSONNEL,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.personnelAppointmentAndPersonnelBackground,
            label: '인사 발령과 인사 배경',
            subLabel: '인사 발령에 대한 배경과 그 이유를 간략히 소개하여 인사 결정에 대한 내용을 제공합니다.',
            inputProps: {
              placeholder: '인사 발령과 인사 배경',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.introductionToTheDutiesAndRolesOfPersonnelCandidates,
            label: '인사 대상자의 업무 및 역할 소개',
            subLabel: '인사 대상자의 새로운 역할과 업무 내용을 소개하여 그들의 새로운 책임을 설명합니다.',
            inputProps: {
              placeholder: '인사 대상자의 업무 및 역할 소개',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.organizationalChanges,
            label: '조직 구성 변경 사항',
            subLabel: '조직 내 구성 변경 사항과 이에 따른 변화를 설명하여 조직의 향후 방향성을 제시합니다.',
            inputProps: {
              placeholder: '조직 구성 변경 사항',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.strategicIntentionOfPersonnelDecisions,
            label: '인사 결정의 전략적 의도',
            subLabel: '해당 인사 결정이 조직의 전략과 목표에 어떻게 부합하는지를 강조하여 전략적인 의도를 설명합니다.',
            inputProps: {
              placeholder: '인사 결정의 전략적 의도',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.introductionAndCareerOfPersonnel,
            label: '인사자의 소개와 경력',
            subLabel: '새로운 인사자의 프로필과 경력을 간단하게 소개하여 그들의 역량을 강조합니다.',
            inputProps: {
              placeholder: '인사자의 소개와 경력',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm('인사 관련 결정자 및 새로운 인사자의 인용문을 통해 인사 소식에 대한 내용을 알립니다.')
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '인수합병',
    description:
      '조직이 다른 기업을 인수하거나 합병하는 사건을 소개하여 이에 대한 배경, 목적, 그리고 두 기업이 기대하는 효과를 알리는 것입니다.',
    tip: '합병의 목적과 효과를 명확히 설명하고, 합병이 주는 조직 변화와 이에 따른 전망을 이해하기 쉽게 전달하는 것이 중요합니다. 인용문을 통해 이에 따른 긍정적인 측면을 강조해야 합니다.',
    type: PRESS_RELEASE_TYPES.MERGERS_AND_ACQUISITIONS,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.introductionAndBackgrounOfTheMergedCompany,
            label: '합병 기업 소개와 배경',
            subLabel: '합병되는 기업의 주요 정보, 배경에 대한 정보를 제공합니다.',
            inputProps: {
              placeholder: '합병 기업 소개와 배경',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.purposeAndExpectedEffectsOfMerger,
            label: '합병의 목적과 기대 효과',
            subLabel: '합병이 예상되는 목적과 기대되는 긍정적인 효과를 설명하여 합병의 의도와 가치를 전달합니다.',
            inputProps: {
              placeholder: '합병의 목적과 기대 효과',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.mergerProcessAndSchedule,
            label: '합병 프로세스와 일정',
            subLabel: '합병의 프로세스와 각 단계의 일정을 안내하여 관련된 기간과 절차를 설명합니다.',
            inputProps: {
              placeholder: '합병 프로세스와 일정',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.organizationalChangesAndImpactsResultingFromTheMerger,
            label: '합병으로 인한 조직 변화 및 영향',
            subLabel: '합병으로 인한 조직 내 변화와 이에 따른 영향을 소개하여 변화에 대한 이해를 돕습니다.',
            inputProps: {
              placeholder: '합병으로 인한 조직 변화 및 영향',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.postMergerOutlookAndPlans,
            label: '합병 후 전망과 계획',
            subLabel: '합병 이후의 전망과 계획을 간략히 소개하여 향후 기업의 방향성을 제시합니다.',
            inputProps: {
              placeholder: '합병 후 전망과 계획',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm('인수 및 합병과 관련한 관계자들의 인용문을 추가해 더욱 사실적으로 소식을 알립니다.')
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '전시행사',
    description:
      '조직이 제품, 서비스, 이벤트 등을 대중과 언론에 알리기 위해 다양한 커뮤니케이션을 사용한다는 점을 알려보세요.',
    tip: '행사의 목적과 주제를 명확하게 전달하고, 특별한 프로그램이나 참여 기업들을 소개하여 행사의 특별성을 부각시키는 것이 중요합니다.',
    type: PRESS_RELEASE_TYPES.EXHIBITION_EVENT,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.introductionToExhibitionEventNameAndSchedule,
            label: '전시행사명과 일정 소개',
            subLabel: '전시행사의 명칭과 개최 일정을 간략히 소개하여 관련된 기본 정보를 제공합니다.',
            inputProps: {
              placeholder: '전시행사명과 일정 소개',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.exhibitionThemeAndPurpose,
            label: '전시행사 주제와 목적',
            subLabel: '전시행사의 주제와 목적을 설명하여 행사의 주요 의도를 전달합니다.',
            inputProps: {
              placeholder: '전시행사 주제와 목적',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.introductionToParticipatingCompaniesAndParticipants,
            label: '참여 기업 및 참가자 소개',
            subLabel: '전시행사에 참여하는 기업들과 참가자들을 소개하여 행사 참여의 다양성을 보여줍니다.',
            inputProps: {
              placeholder: '참여 기업 및 참가자 소개',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.exhibitionEventScheduleAndProgramInformation,
            label: '전시행사 일정과 프로그램 안내',
            subLabel: '전시행사의 세부 일정과 프로그램을 안내하여 관람객들에게 행사 내용을 전달합니다.',
            inputProps: {
              placeholder: '전시행사 일정과 프로그램 안내',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.elementsThatHighlightTopicality,
            label: '화제성 부각 요소',
            subLabel: '특별한 행사나 주목받는 요소를 소개하여 전시행사의 특별성을 부각시킵니다.',
            inputProps: {
              placeholder: '화제성 부각 요소',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm(
            '행사 준비 관계자 또는 행사 참여자의 소감을 인용해 행사 참여 독려 또는 생생항 행사 현장의 분위기를 알릴 수 있습니다.'
          )
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '판촉활동',
    description:
      '조직이 제품, 서비스, 이벤트 등을 대중과 언론에 알리기 위해 다양한 커뮤니케이션을 사용한다는 점을 알려보세요.',
    tip: '활동의 목적과 혜택을 명확히 전달하고, 이전 활동의 성과를 언급하여 활동의 신뢰성을 높이는 것이 중요합니다.',
    type: PRESS_RELEASE_TYPES.SALES_PROMOTION,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.purposeAndPeriodOfPromotionalActivities,
            label: '판촉활동 목적과 기간',
            subLabel: '판촉활동의 목적과 진행 기간을 소개하여 활동의 의도를 설명합니다.',
            inputProps: {
              placeholder: '판촉활동 목적과 기간',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.discountBenefitsAndEventDetails,
            label: '할인 혜택 및 이벤트 내용',
            subLabel: '제공되는 할인 혜택이나 이벤트 내용을 상세히 설명하여 참여자들에게 혜택을 제시합니다.',
            inputProps: {
              placeholder: '할인 혜택 및 이벤트 내용',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.introductionToTargetProductsOrServices,
            label: '대상 제품 또는 서비스 소개',
            subLabel: '해당 판촉활동에 대상이 되는 제품 또는 서비스를 소개하여 홍보합니다.',
            inputProps: {
              placeholder: '참여 기업 및 참가자 소개',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.informationOnHowToParticipateAndTheBenefitsOfParticipation,
            label: '참여 방법과 참여 혜택 안내',
            subLabel: '참여하는 방법과 참여 시 얻을 수 있는 혜택을 안내하여 참여를 유도합니다.',
            inputProps: {
              placeholder: '참여 방법과 참여 혜택 안내',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.introductionToPreviousPromotionalActivities,
            label: '이전 판촉활동 성과 소개',
            subLabel: '이전 판촉활동의 성과나 성공 사례를 소개하여 신뢰성과 효과를 부각시킵니다.',
            inputProps: {
              placeholder: '이전 판촉활동 성과 소개',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm('판촉활동 진행 담당자의 소감을 인용해 활동을 더욱 활발하게 알립니다.')
        ]
      },
      commonGroupForm
    ]
  },
  {
    title: '파트너십',
    description:
      '다른 기업, 기관, 또는 단체와의 협력 혹은 파트너십을 체결했을 때 해당 소식을 소개하여 협력의 의도, 목적, 기대효과 등을 알립니다.',
    tip: '파트너십을 통해 어떻게 더 다양한 시장에 접근하고, 새로운 기회를 창출할 수 있는지에 대한 정보를 제공합니다.',
    type: PRESS_RELEASE_TYPES.PARTNERSHIP,
    groups: [
      {
        title: '보도자료 정보',
        fields: [
          {
            column: 12,
            type: 'textarea',
            name: inputNames.partnershipPurposeAndBenefits,
            label: '파트너십 목적과 이점',
            subLabel: '파트너십의 주요 목적과 얻을 수 있는 이점을 간략히 설명하여 협력의 의도를 전달합니다.',
            inputProps: {
              placeholder: '파트너십 목적과 이점',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.partnerIntroductionAndRoles,
            label: '파트너사 소개와 역할',
            subLabel: '협력하는 파트너사의 소개와 역할을 설명하여 파트너십의 다양성을 보여줍니다.',
            inputProps: {
              placeholder: '파트너사 소개와 역할',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.collaborativeProjectOrPlanDescription,
            label: '협력 프로젝트 또는 계획 설명',
            subLabel: '공동으로 추진하는 프로젝트나 계획을 소개하여 파트너십의 실질적인 활동을 보여줍니다.',
            inputProps: {
              placeholder: '협력 프로젝트 또는 계획 설명',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.cooperationMethodsAndExpectedResults,
            label: '협력 방식과 기대효과',
            subLabel: '협력하는 방식과 이로 인해 기대되는 효과를 소개하여 파트너십의 가치를 설명합니다.',
            inputProps: {
              placeholder: '협력 방식과 기대효과',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          {
            column: 12,
            type: 'textarea',
            name: inputNames.introductionToPastAchievementsAndSuccessStories,
            label: '과거 성과 및 성공 사례 소개',
            subLabel: '이전 협력의 성과나 성공 사례를 소개하여 파트너십의 신뢰성과 효과를 강조합니다.',
            inputProps: {
              placeholder: '과거 성과 및 성공 사례 소개',
              maxLength: MAXLENGTH_BRAND_CORE_MESSAGE,
              multiline: true
            },
            validations: [{ params: [100], type: 'max' }]
          },
          quoteMessageForm('파트너십을 맡은 담당자 또는 파트너사의 소감을 인용하여 원활한 파트너십을 알립니다.')
        ]
      },
      commonGroupForm
    ]
  }
]

const commonFormValidateSchema = {
  [inputNames.quoteMessage]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, ''),
  [inputNames.companyName]: yup.string().max(MAXLENGTH_BRAND_CORE_MESSAGE).required('required'),
  [inputNames.representativeName]: yup.string().max(MAXLENGTH_BRAND_CORE_MESSAGE).required('required'),
  [inputNames.distributionDate]: yup.date().required('required')
}

export const PressReleaseValidateSchema = {
  [PRESS_RELEASE_TYPES.DEVELOPMENT]: yup.object().shape({
    [inputNames.projectNameAndPurpose]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.developmentScopeAndContent]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.techniqueOrMethod]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.collaborationOrTeamIntroduction]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.developmentResultsAndAchievements]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.ANNOUNCEMENT]: yup.object().shape({
    [inputNames.contestTopicAndPurpose]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.hostingAndSponsoringOrganizations]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.participantBenefitInformation]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.contestEligibilityAndParticipationMethod]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.screeningAndEvaluationCriteria]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.SOCIAL_VALUE_CREATION]: yup.object().shape({
    [inputNames.projectIntroduction]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.participantsAndPartnerOrganizations]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.settingSocialIssuesOrGoals]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.activityContentAndResults]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.sustainabilityAndFuturePlans]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.PERFORMANCE]: yup.object().shape({
    [inputNames.overviewAndSummary]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.reasonsAndFactors]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.influenceAndEffect]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.maintenanceAndDevelopmentDirection]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.futureProspectsAndPlans]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.AWARDS_AND_CERTIFICATIONS]: yup.object().shape({
    [inputNames.awardDetailsAndBackground]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.winnerInformationAndAchievements]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.meaningAndValueOfAward]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.impactOfAwards]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.BUSINESS_PLAINNING]: yup.object().shape({
    [inputNames.businessIdeaAndOverview]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.marketResearchAndAnalysisResults]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.goalsAndStrategies]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.findingBusinessModels]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.riskManagementAndResponseStrategy]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.ORDERS]: yup.object().shape({
    [inputNames.orderContract]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.customerReceivedOrder]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.orderWinningStrategy]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.valueOfOrders]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.opportunitiesAndFutureProspects]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.PEOPLE_NEWS]: yup.object().shape({
    [inputNames.backgroundAndCareer]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.personAchievements]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.participationAndInfluence]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.valuesAndVision]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.socialActivitiesAndContributions]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.FOUNDING]: yup.object().shape({
    [inputNames.backgroundAndHistory]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.founderIntroduction]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.purposeAndVision]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.developmentAndGrowth]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.foundingCeremony]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.POLICIES_AND_PROPOSALS]: yup.object().shape({
    [inputNames.policyOverviewAndPurpose]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.proposedPolicyContentAndKeyPoints]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.impactAndEffectAnalysis]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.planAccordingToImplementationAndImplementation]: yup
      .string()
      .max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.NEW_PRODUCT_LAUNCH]: yup.object().shape({
    [inputNames.productIntroductionAndFunctionDescription]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.differencesComparedToExistingProducts]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.productMarketEntryStrategyAndTargets]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.productReleaseScheduleAndPricingInformation]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.productTestingOrReviewContent]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.RECRUITMENT]: yup.object().shape({
    [inputNames.introductionAndBackgroundOfTheRecruitingCompany]: yup
      .string()
      .max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.recruitmentJobAndRoleDescription]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.qualificationsAndPreferences]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.recruitmentProcessAndSchedule]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.companyCultureAndValues]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.RESEARCH]: yup.object().shape({
    [inputNames.researchTopicAndPurpose]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.researchMethodsAndProcesses]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.summaryOfKeyFindings]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.whatTheFindingsMean]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.researchTeamOrParticipantInformation]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.INVESTMENT_ACTIVITIES]: yup.object().shape({
    [inputNames.investmentDetailsAndScale]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.investorInformation]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.investmentPurposeAndExpectedEffects]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.investmentUtilizationPlan]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.investmentFutureProspectsAndPlans]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.EVENT]: yup.object().shape({
    [inputNames.eventNameAndSchedule]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.evenPurposeAndMainContent]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.whoCanParticipateAndHowToParticipate]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.eventLocationAndFormat]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.introducingSpecialGuestsOrPrograms]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.PERSONNEL]: yup.object().shape({
    [inputNames.personnelAppointmentAndPersonnelBackground]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.introductionToTheDutiesAndRolesOfPersonnelCandidates]: yup
      .string()
      .max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.organizationalChanges]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.strategicIntentionOfPersonnelDecisions]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.introductionAndCareerOfPersonnel]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.MERGERS_AND_ACQUISITIONS]: yup.object().shape({
    [inputNames.introductionAndBackgrounOfTheMergedCompany]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.purposeAndExpectedEffectsOfMerger]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.mergerProcessAndSchedule]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.organizationalChangesAndImpactsResultingFromTheMerger]: yup
      .string()
      .max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.postMergerOutlookAndPlans]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.EXHIBITION_EVENT]: yup.object().shape({
    [inputNames.introductionToExhibitionEventNameAndSchedule]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.exhibitionThemeAndPurpose]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.introductionToParticipatingCompaniesAndParticipants]: yup
      .string()
      .max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.exhibitionEventScheduleAndProgramInformation]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.elementsThatHighlightTopicality]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.SALES_PROMOTION]: yup.object().shape({
    [inputNames.purposeAndPeriodOfPromotionalActivities]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.discountBenefitsAndEventDetails]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.introductionToTargetProductsOrServices]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.informationOnHowToParticipateAndTheBenefitsOfParticipation]: yup
      .string()
      .max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.introductionToPreviousPromotionalActivities]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  }),
  [PRESS_RELEASE_TYPES.PARTNERSHIP]: yup.object().shape({
    [inputNames.partnershipPurposeAndBenefits]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.partnerIntroductionAndRoles]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.collaborativeProjectOrPlanDescription]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.cooperationMethodsAndExpectedResults]: yup.string().max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    [inputNames.introductionToPastAchievementsAndSuccessStories]: yup
      .string()
      .max(MAXLENGTH_BRAND_MISSION_VALUES, 'Max'),
    ...commonFormValidateSchema
  })
}
