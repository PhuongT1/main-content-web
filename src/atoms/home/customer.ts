import { StepActivity, StepList } from '@/types/deck.type'
import { atom } from 'recoil'

const toggleChangData = atom({
  key: 'togdleChangData',
  default: false
})

const deckList = atom({
  key: 'customerList',
  default: [] as StepList<unknown>[]
})

const deckCompleteList = atom({
  key: 'completeCustomerList',
  default: [] as StepActivity<unknown>[]
})

export { toggleChangData, deckList, deckCompleteList }
