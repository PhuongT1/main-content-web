import { IRPalette } from '@/types/deck.type'
import { atom } from 'recoil'

const activeStepSelector = atom<number>({
  key: 'activeStep',
  default: 0
})

const completeStepSelector = atom<number[]>({
  key: 'activeComplete',
  default: []
})

const expandStepSelector = atom<number[]>({
  key: 'expandComplete',
  default: []
})

const iRPalette = atom<IRPalette>({
  key: 'iRSelector',
  default: {
    primaryColorID: 0,
    primaryColor: '#3C82F9',
    layoutSelected: 'ONE',
    pageSelected: 1
  }
})

export { activeStepSelector, completeStepSelector, expandStepSelector, iRPalette }
