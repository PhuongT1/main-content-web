import { StepList } from '@/types/deck.type'
import { NamingDeck } from '@/types/naming.type'
import { atom } from 'recoil'

const dataDeckActive = atom({
  key: 'dataNamingActive',
  default: [] as StepList<unknown>[]
})

const dataNaming = atom({
  key: 'dataNaming',
  default: {} as NamingDeck
})

export { dataNaming, dataDeckActive }
