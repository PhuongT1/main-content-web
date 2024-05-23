import { StepList } from '@/types/deck.type'
import { atom } from 'recoil'

const dataDeckActive = atom({
  key: 'dataAdvertisementMarketingActive',
  default: [] as StepList<unknown>[]
})

const projectIdPrMarketing = atom({
  key: 'projectIdPrMarketing',
  default: 0
})

export { dataDeckActive, projectIdPrMarketing }
