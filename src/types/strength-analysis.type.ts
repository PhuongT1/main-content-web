import { STRENGTH_TYPE } from '@/constants/strength-analysis.constant'
export type TTypesSA = {
  id: number
  uuid?: string
  strengthType: string
  url: string
  keyword: string
  star: string
  description: string
  talentType: string
}

export type TFormValuesType = {
  strengthList: TTypesSA[]
  weaknessList: TTypesSA[]
}

export type TFormValuesRangeType = {
  strength: TTypesSA[][]
  weakness: TTypesSA[][]
}
export type StrengthType = {
  strength: number[]
  weakness: number[]
}

export type KeyStrengthType = keyof typeof STRENGTH_TYPE
