import { IProfitDiagram } from '@/types/profit-structure.type'
import { StepList, StepActivity } from '@/types/deck.type'
import { atom } from 'recoil'

const deckList = atom({
  key: 'profitDeckList',
  default: [] as StepList<unknown>[]
})

const deckCompleteList = atom({
  key: 'profitCompleteDeckList',
  default: [] as StepActivity<unknown>[]
})

const projectIdProfitStructure = atom({
  key: 'projectIdProfitStructure',
  default: 0
})

const dataDiagramProfitStructureSelector = atom<IProfitDiagram>({
  key: 'dataDiagramProfitStructureSelector',
  default: {
    nodes: [],
    edges: [],
    type: {}
  }
})

export { deckList, deckCompleteList, dataDiagramProfitStructureSelector, projectIdProfitStructure }
