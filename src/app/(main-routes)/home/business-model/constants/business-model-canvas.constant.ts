import { TSelectedCharacteristicByModel } from '../types/business-model-canvas.type'

export enum BUSINESS_MODEL_CHARACTERISTIC_ENUM {
  corePartnership = '핵심 파트너십',
  coreActivity = '핵심 활동',
  coreResource = '핵심 자원',
  valueProposition = '가치 제안',
  customerRelationship = '고객 관계',
  distributionChannel = '유통 채널',
  customerSegment = '고객 세그먼트',
  costStructure = '비용 구조',
  revenueSource = '수익원'
}

export const SELECTED_MODEL_DEFAULT_DATA: TSelectedCharacteristicByModel = Object.keys(
  BUSINESS_MODEL_CHARACTERISTIC_ENUM
).reduce((acc, key) => {
  acc[key as keyof TSelectedCharacteristicByModel] = []
  return acc
}, {} as TSelectedCharacteristicByModel)

export const CANVAS_FORM_DEFAULT_DATA = {
  industry: '',
  idea: '',
  selectedCharacteristicByModel: SELECTED_MODEL_DEFAULT_DATA
}
