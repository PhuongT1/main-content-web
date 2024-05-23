import { StepList } from '@/types/deck.type'
import { StrengthType } from '@/types/strength-analysis.type'
import { atom } from 'recoil'

const dataDeckActive = atom({
  key: 'dataSAActive',
  default: [] as StepList<unknown>[]
})

const activeSlider = atom({
  key: 'activeSlider',
  default: 0
})

const selectedRange = atom({
  key: 'selectedRange',
  default: {
    strength: [],
    weakness: []
  } as StrengthType
})

export { dataDeckActive, selectedRange, activeSlider }
