import { Key } from 'react'
import * as yup from 'yup'
import { Metadata } from './types.type'
import { Theme } from '@mui/material'

export const MAX_ITEM_SURVEY_MULTI_CHOICE = 7

export const SURVEY_COLOR = ({ palette: { home } }: Theme) => [
  home.blue800,
  home.purple700,
  home.blue600,
  home.blue500,
  home.blue300,
  home.purple300,
  home.purple500,
  home.cyan,
  home.mint700,
  home.green800,
  home.yellow,
  home.orange500,
  home.red500,
  home.brown500,
  home.brown900,
  home.gray50,
  home.gray100
]

export const SURVEY_FIVE_POINT_COLOR = ({ palette: { home } }: Theme) => [
  home.blue800,
  home.green800,
  home.purple700,
  home.blue300,
  home.red500
]

export const SURVEY_SELECTION_COLOR = ({ palette: { home } }: Theme) => [home.blue800, home.red500]

export const SURVEY_GENDER_COLOR = ({ palette: { home } }: Theme) => [home.mint500, home.orange500]

export interface BasicInformationType {
  title: string
  description: string
  startDate: string
  endDate: string
  imageUrl: string
}

export const BasicInformationYup = yup.object().shape({
  title: yup.string().required(' '),
  description: yup.string().required(' '),
  startDate: yup.string().required(' '),
  endDate: yup.string().required(' '),
  imageUrl: yup.string().required(' ')
})

export enum EnumSurveyItemType {
  MULTI_CHOICE = '객관식',
  SUBJECTIVE = '주관식',
  FIVE_POINT_SCALE = '5점 척도',
  SELECTION = '양자택일',
  DEMOGRAPHIC = '인구통계'
}

export enum DEMOGRAPHIC_TYPE_ENUM {
  GENDER = '성별',
  DOB = '출생연도',
  AGE = '연령대',
  AREA = '지역',
  EDUCATION = '학력',
  NAME = '이름',
  AFFILIATION = '소속',
  ADDRESS = '주소',
  EMAIL = '이메일',
  CONTACT = '연락처'
}

export enum SURVEY_GENDER_ENUM {
  MAN = '남자',
  FEMALE = '여자'
}

export enum SURVEY_AGE_ENUM {
  INFANT = '영유아',
  YOUTH_GROUP = '청소년층',
  YOUNG = '청년층',
  MIDDLE = '중년층',
  OLDER = '장년층',
  ELDERLY = '노년층'
}

export enum SURVEY_AREA_ENUM {
  SEOUL = '서울특별시',
  GYEONGGI = '경기도',
  INCHEON = '인천광역시',
  GANGWON = '강원도',
  DAEJEON = '대전광역시',
  SEJONG = '세종특별자치시',
  CHUNGBUK = '충청북도',
  CHUNGNAM = '충청남도',
  BUSAN = '부산광역시',
  DAEGU = '대구광역시',
  ULSAN = '울산광역시',
  GYEONGBUK = '경상북도',
  GYEONGNAM = '경상남도',
  GWANGJU = '광주광역시',
  JEONBUK = '전라북도',
  JEONNAM = '전라남도',
  JEJU = '제주특별자치도'
}

export enum SURVEY_EDUCATION_ENUM {
  HIGH_SCHOOL = '고등학교',
  TWO_YEAR_COLLEGE = '전문대학(2년제)',
  FOUR_YEAR_COLLEGE = '대학교(4년제)',
  MASTER = '대학원(석사학위)',
  DOCTOR = '대학원(박사학위)'
}

export enum SURVEY_EDUCATION_STATUS_ENUM {
  GRADUATED = '졸업',
  COMPLETED = '수료',
  ON_LEAVE = '휴학',
  ENROLLED = '재학',
  DROPPED_OUT = '자퇴'
}

export const DEMOGRAPHIC_TYPE_ENUM_ORDER = [
  '이름',
  '성별',
  '소속',
  '출생연도',
  '연령대',
  '지역',
  '주소',
  '이메일',
  '학력',
  '연락처'
]

export const REMOVE_DEMOGRAPHIC_TYPE_ENUM_ORDER = ['연령대', '지역']

export interface SurveyItemCommon {
  type: EnumSurveyItemType
  title: string
  imageUrl: string
}

export interface OptionsMultiChoiceType {
  title: string
  imageUrl: string
}

export interface SurveyMultiChoice extends SurveyItemCommon {
  configs: {
    allowMultiSelection: boolean
    allowAddOption: boolean
    isRequired: boolean
  }
  options: OptionsMultiChoiceType[]
}

export const SurveyMultiChoiceSchema = yup.object().shape({
  title: yup.string().required(' '),
  imageUrl: yup.string(),
  type: yup.string().required().oneOf(Object.values(EnumSurveyItemType)),
  configs: yup.object().shape({
    allowMultiSelection: yup.boolean().required(' '),
    allowAddOption: yup.boolean().required(' '),
    isRequired: yup.boolean().required(' ')
  }),
  options: yup.array().min(2).max(MAX_ITEM_SURVEY_MULTI_CHOICE).required(' ')
})

export interface SurveySubjective extends SurveyItemCommon {
  options: null
  configs: { isRequired: boolean; numericInputOnly: boolean }
}

export const SurveySubjectiveSchema = yup.object().shape({
  title: yup.string().required(' '),
  imageUrl: yup.string(),
  type: yup.string().required().oneOf(Object.values(EnumSurveyItemType)),
  configs: yup.object().shape({
    numericInputOnly: yup.boolean().required(' '),
    isRequired: yup.boolean().required(' ')
  })
})

export interface SurveyFivePointScale extends SurveyItemCommon {
  configs: { isRequired: boolean }
  options: { point: number; title: string }[]
}

export const SurveyFivePointScaleSchema = yup.object().shape({
  title: yup.string().required(' '),
  imageUrl: yup.string(),
  type: yup.string().required().oneOf(Object.values(EnumSurveyItemType)),
  options: yup.array().of(
    yup.object().shape({
      title: yup.string().required()
    })
  )
})

export interface SurveySelection extends SurveyItemCommon {
  configs: null
  options: { title: string }[]
}

export const SurveySelectionSchema = yup.object().shape({
  title: yup.string().required(' '),
  imageUrl: yup.string(),
  type: yup.string().required().oneOf(Object.values(EnumSurveyItemType)),
  options: yup.array().of(
    yup.object().shape({
      title: yup.string().required()
    })
  )
})

export interface SurveyDemographic extends SurveyItemCommon {
  configs: null
  options: { type: DEMOGRAPHIC_TYPE_ENUM; title: DEMOGRAPHIC_TYPE_ENUM }[]
}

export const SurveyDemographicSchema = yup.object().shape({
  title: yup.string().required(' '),
  imageUrl: yup.string(),
  type: yup.string().required().oneOf(Object.values(EnumSurveyItemType)),
  options: yup
    .array()
    .test('DOB/AGE', ' ', (options) => {
      return options
        ? options.some(
            (option) => option.type === DEMOGRAPHIC_TYPE_ENUM.DOB || option.type === DEMOGRAPHIC_TYPE_ENUM.AGE
          )
        : true
    })
    .test('AREA/ADDRESS', ' ', (options) => {
      return options
        ? options.some(
            (option) => option.type === DEMOGRAPHIC_TYPE_ENUM.AREA || option.type === DEMOGRAPHIC_TYPE_ENUM.ADDRESS
          )
        : true
    })
})

export type SurveyItems =
  | SurveyMultiChoice
  | SurveySubjective
  | SurveyFivePointScale
  | SurveySelection
  | SurveyDemographic

export type SurveyItemType = {
  basicInformation: BasicInformationType
  surveyItems: SurveyItems[]
}

export const SurveySchema = yup.object().shape({
  basicInformation: BasicInformationYup,
  surveyItems: yup
    .array()
    .min(1)
    .test(' ', ' ', (options) => {
      return options && options?.length > 0
        ? options.every((option) => option.title !== undefined && option.title !== '')
        : true
    })
})
///ReView
export enum SurveyStatusEnum {
  BEFORE_PROGRESS = 'BEFORE_PROGRESS',
  IN_PROGRESS = 'IN_PROGRESS',
  ENDED = 'ENDED'
}
export interface ReviewBasicInformationType extends BasicInformationType {
  id: number
  status: SurveyStatusEnum
  totalRespondents: number
  createdAt: string
  userEnded: boolean
}
export interface SurveyViewType extends ReviewBasicInformationType {
  items: ItemsSurveyViewType[]
}

export interface ReviewSurveyMultiChoice extends SurveyMultiChoice {
  id: number
  options: (OptionsMultiChoiceType & { id: number })[]
}

export interface ReviewSurveySubjective extends SurveySubjective {
  id: number
}

export interface ReviewSurveyFivePointScale extends SurveyFivePointScale {
  id: number
  options: { point: number; title: string; id: number }[]
}
export interface ReviewSurveySelection extends SurveySelection {
  id: number
  options: { title: string; id: number }[]
}

export interface ReviewSurveyDemographic extends SurveyDemographic {
  id: number
  options: { id: number; type: DEMOGRAPHIC_TYPE_ENUM; title: DEMOGRAPHIC_TYPE_ENUM }[]
}

export type ItemsSurveyViewType =
  | ReviewSurveyMultiChoice
  | ReviewSurveySubjective
  | ReviewSurveyFivePointScale
  | ReviewSurveySelection
  | ReviewSurveyDemographic

//Answer
export interface SurveyAnswerType {
  id: number
  answers:
    | Key[]
    | {
        id: number
        answer: string
      }[]
}
export interface SurveyViewAnswersType {
  items: SurveyAnswerType[]
}

//analytics
export type TDataResSurvey<SurveyT, ResponsesT> = {
  surveyItem: SurveyT
  responses: ResponsesT
  metaData?: Metadata
}

export interface AnalyticSurveyMultiChoice extends SurveyMultiChoice {
  id: number
  options: (OptionsMultiChoiceType & { id: number; totalSelections: number; percentOfSelections: number })[]
}

export interface AnalyticSurveyMultiChoice_Responses {
  id: number
  imageUrl: string
  isAdded: boolean
  no: number
  percentOfSelections: number
  title: string
  totalSelections: number
}

export interface AnalyticSurveySubjective_Responses {
  no: number
  answer: string
}

export interface AnalyticSurveyFivePointScale extends SurveyFivePointScale {
  id: number
  averagePoint: number
  maxSumOfPoints: number
  sumOfPoints: number
  options: { point: number; title: string; id: number; totalSelections: number; percentOfSelections: number }[]
}

export interface AnalyticSurveySelection extends SurveySelection {
  id: number
  options: { title: string; id: number; totalSelections: number; percentOfSelections: number }[]
}

export interface AnalyticSurveyDemographic extends SurveyDemographic {
  id: number
  options: {
    answers: { answer: string; percent: number; total: number }[]
    id: number
    type: DEMOGRAPHIC_TYPE_ENUM
    title: DEMOGRAPHIC_TYPE_ENUM
  }[]
}

export interface AnalyticSurveyDemographic_Responses {
  no: string
  [DEMOGRAPHIC_TYPE_ENUM.GENDER]?: string
  [DEMOGRAPHIC_TYPE_ENUM.DOB]?: string
  [DEMOGRAPHIC_TYPE_ENUM.AGE]?: string
  [DEMOGRAPHIC_TYPE_ENUM.AREA]?: string
  [DEMOGRAPHIC_TYPE_ENUM.EDUCATION]?: string
  [DEMOGRAPHIC_TYPE_ENUM.NAME]?: string
  [DEMOGRAPHIC_TYPE_ENUM.AFFILIATION]?: string
  [DEMOGRAPHIC_TYPE_ENUM.ADDRESS]?: string
  [DEMOGRAPHIC_TYPE_ENUM.EMAIL]?: string
  [DEMOGRAPHIC_TYPE_ENUM.CONTACT]?: string
}
