import { TValueCardSelect } from '@/app/(main-routes)/home/idea/_clientComponents/_components/card'
import { Method } from '@/constants/idea.constant'
import { ICompetitiveCompaniesRequest } from '@/types/competitor-analysis.type'
import { StepList } from '@/types/deck.type'
import { CaculationMethod, CaculationModeEnum, IdeaDeck, QueryIndustrial, TMethod } from '@/types/idea.type'
import { atom } from 'recoil'

const modeIdeaSelector = atom<TValueCardSelect>({
  key: 'modeIdeaSelector',
  default: ''
})

const modeCalculationIdeaSelector = atom<CaculationMethod>({
  key: 'modeCalculationIdeaSelector',
  default: {
    plus: CaculationModeEnum.EDIT,
    minus: CaculationModeEnum.EDIT,
    division: CaculationModeEnum.EDIT,
    multiplication: CaculationModeEnum.EDIT
  }
})

const modeWriteIdeaSelector = atom<TMethod | 'none'>({
  key: 'modeWriteIdeaSelector',
  default: 'none'
})

const filterFourIdeaSelector = atom<QueryIndustrial>({
  key: 'filterFourIdea',
  default: {
    industrialField: ''
  }
})

const filterRelatedCompanySelector = atom<ICompetitiveCompaniesRequest>({
  key: 'filterRelatedCompanySelectorIdea',
  default: {
    name: '',
    // type: '',
    industryId: false,
    page: 1,
    limit: 50,
    order: 'DESC'
  }
})

const dataDeckActive = atom({
  key: 'dataIdeaActive',
  default: [] as StepList<unknown>[]
})

const dataIdea = atom({
  key: 'dataIdea',
  default: {} as IdeaDeck
})

export {
  modeIdeaSelector,
  filterFourIdeaSelector,
  filterRelatedCompanySelector,
  dataDeckActive,
  dataIdea,
  modeWriteIdeaSelector,
  modeCalculationIdeaSelector
}
