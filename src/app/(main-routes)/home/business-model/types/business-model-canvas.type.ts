import { ColorPalette } from '@/themes/get-design-tokens'
import { ReactNode } from 'react'
import { BUSINESS_MODEL_CHARACTERISTIC_ENUM } from '../constants/business-model-canvas.constant'
import { TBusinessModelCharacteristics } from './business-model-composition.type'

type TKeyOfBussinessModel = keyof typeof BUSINESS_MODEL_CHARACTERISTIC_ENUM

export type TSelectedCharacteristicByModel = {
  [K in TKeyOfBussinessModel]: TBusinessModelCharacteristics[]
}

export type TModel = TKeyOfBussinessModel

export type TSelectionBusinessListProps = {
  icon: ReactNode
  title: string
  selections: TBusinessModelCharacteristics[]
  selectionBgColor: string
  bgColor?: ColorPalette
  isSelected?: boolean
  listHeight?: number
  onClick?: () => void
  onDelete: (id: TBusinessModelCharacteristics) => void
  isViewing: boolean
  isErr?: boolean
  height?: number
}

export type TBusinessModelCavansForm = {
  industry: string
  idea: string
  selectedCharacteristicByModel: TSelectedCharacteristicByModel
}

export type TRequiredCharacteristicError = {
  corePartnership: boolean
  customerSegment: boolean
}
