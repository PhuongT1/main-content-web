import { TypographyProps } from '@/elements/typography/typography.type'

export const DEFAULT_STEP = {
  deckId: 17
}

export enum EmploymentFormType {
  partiesToEmploymentContract = 'partiesToEmploymentContract',
  employmentType = 'employmentType',
  probationPeriod = 'probationPeriod',
  dutiesAndWorkLocation = 'dutiesAndWorkLocation',
  vacation = 'vacation',
  wage = 'wage'
}

export enum UserTypes {
  corporation = 'corporation',
  individualBusinessOwner = 'individualBusinessOwner',
  individual = 'individual'
}

export enum UserTypesText {
  corporation = '법인',
  individualBusinessOwner = '개인사업자',
  individual = '개인'
}
export const TEXT_STYLE: {
  [key: string]: TypographyProps
} = {
  title: {
    cate: 'title_2_semibold',
    color: 'main_grey.gray700',
    component: 'h2'
  },
  body: {
    cate: 'body_30',
    color: 'main_grey.gray700',
    component: 'p'
  },
  bodySemi: {
    cate: 'sub_title_30',
    color: 'main_grey.gray700',
    component: 'span'
  },
  bodySemiHightlight: {
    cate: 'sub_title_30',
    color: 'main_grey.gray700',
    component: 'span',
    sx: {
      textDecoration: 'underline'
    }
  },
  bodySmall: {
    cate: 'body_30',
    color: 'main_grey.gray550',
    component: 'p'
  }
}
export const bgHightLight = {
  backgroundColor: 'home.alpha_blue_10'
}

export const PHONE_NUMBER_REGEX = /^([0-9]*[-]*){1,15}$/
export const WEEKLY_WORKING_REGEX = /^[0-9]{1}$/
export const HOURS_REGEX = /^[0-9]{1,2}$/
export const ACCOUNT_NUMBER_REGEX = /^([0-9]*[-]*){1,20}$/

export const HOUR_FORMAT = 'HH:mm'

export const RESET_FORM_DATA = 'RESET_FORM_DATA'
export const SUBMIT_FORM_DATA = 'SUBMIT_FORM_DATA'

export const QUERY_KEY = [
  `employment-contract`,
  {
    deckId: DEFAULT_STEP.deckId
  }
]

export const getStepDataQueryKey = ({
  deckId,
  stepId,
  projectId
}: {
  deckId: number
  stepId: number
  projectId: number
}) => ['employment-contract-data', { deckId, stepId, projectId }]

export const WEEK_DAYS = [
  {
    label: '월',
    value: '월요일'
  },
  {
    label: '화',
    value: '화요일'
  },
  {
    label: '수',
    value: '수요일'
  },
  {
    label: '목',
    value: '목요일'
  },
  {
    label: '금',
    value: '금요일'
  },
  {
    label: '토',
    value: '토요일'
  },
  {
    label: '일',
    value: '일요일'
  }
]
