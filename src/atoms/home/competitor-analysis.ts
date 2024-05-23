import { atom } from 'recoil'
import { StepList } from '@/types/deck.type'
import {
  IFormValuesStepOne,
  IFormValuesStepTwo,
  IFormValuesStepThree,
  TDataToolbarEditor,
  IFormValuesStepFour
} from '@/types/competitor-analysis.type'

const projectIdCompanyAnalysis = atom({
  key: 'projectIdCompanyAnalysis',
  default: 0
})

const dataDeckActive = atom({
  key: 'dataDeckCompanyAnalysisActive',
  default: [] as StepList<unknown>[]
})

const dataCompanyAnalyzingStep1 = atom<IFormValuesStepOne>({
  key: 'dataCompanyAnalyzingStep1',
  default: {} as IFormValuesStepOne
})

const dataCompanyAnalyzingStep2 = atom<IFormValuesStepTwo>({
  key: 'dataCompanyAnalyzingStep2',
  default: {} as IFormValuesStepTwo
})

const dataCompanyAnalyzingStep3 = atom<IFormValuesStepThree>({
  key: 'dataCompanyAnalyzingStep3',
  default: {} as IFormValuesStepThree
})

const dataDiagramCompetitorSelector = atom<IFormValuesStepFour>({
  key: 'dataDiagramCompetitorSelector',
  default: {
    nodes: [],
    edges: []
  }
})

const selectedCompetitorNodeSelector = atom<string>({
  key: 'selectedCompetitorNodeSelector',
  default: ''
})

const toolbarEditorSelector = atom<TDataToolbarEditor>({
  key: 'toolbarEditorSelecttor',
  default: {
    color: '',
    fontSize: '16px',
    fontWeight: 'normal'
  } as TDataToolbarEditor
})

export {
  projectIdCompanyAnalysis,
  dataDeckActive,
  dataCompanyAnalyzingStep1,
  dataCompanyAnalyzingStep2,
  dataCompanyAnalyzingStep3,
  dataDiagramCompetitorSelector,
  selectedCompetitorNodeSelector,
  toolbarEditorSelector
}
