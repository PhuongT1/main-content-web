import { getSteps, getStep as getStepApi } from '@/services/step.service'
import { StepList } from '@/types/deck.type'
import { StepQuery, TStepApi } from '@/types/step.type'
import { EditorNodeList, TDataToolbarEditor } from '@/types/teambuilding/index.type'
import { isEmpty } from '@/utils/object'
import { Edge, Node } from 'reactflow'
import { atom, selectorFamily } from 'recoil'

const toolbarEditorSelector = atom<TDataToolbarEditor>({
  key: 'toolbarEditorSelecttor',
  default: {
    color: '#252629',
    fontSize: '16px'
  } as TDataToolbarEditor
})

const selectedNodeSelector = atom<string>({
  key: 'selectedNodeSelector',
  default: ''
})

const statusTabSelector = atom<number>({
  key: 'statusTabSelector',
  default: 0
})

const dataDeckActive = atom({
  key: 'dataTeambuildingActive',
  default: [] as StepList<unknown>[]
})

const diagramDataSelector = atom<{
  nodes: Node<EditorNodeList>[]
  edges: Edge[]
}>({
  key: 'diagramDataSelector',
  default: {
    nodes: [],
    edges: []
  }
})

const dataTeamBuildingSelector = atom({
  key: 'dataTeamBuildingSelector',
  default: {
    step01: [],
    step02: [],
    step03: {},
    step04: {}
  }
})

export const _cacheSteps = atom<any | null>({
  key: '_cacheSteps',
  default: null
})

export const getStep = selectorFamily({
  key: 'step',
  get:
    ({ position, deckId }: { position: number; deckId: number }) =>
    ({ get }: any) => {
      const steps = get(stepsSelector({ deckId }))
      if (steps) {
        return steps?.find((item: TStepApi) => item.position === position)
      }
    }
})

export const getStepData = selectorFamily({
  key: 'stepData',
  get:
    ({ position, deckId, projectId, stepId }: StepQuery & { position: number }) =>
    async ({ get }: any) => {
      const { data } = await getStepApi({ projectId, deckId, stepId })
      return !isEmpty(data?.data) ? data?.data : null
    }
})

export const stepsSelector = selectorFamily({
  key: 'steps',
  get:
    (query: { deckId: number }) =>
    async ({ get }: any) => {
      const cache = get(_cacheSteps)
      if (cache) {
        return cache
      }
      const data = await getSteps(query)

      return data?.data
      // call api
    }
})

export {
  dataTeamBuildingSelector,
  diagramDataSelector,
  dataDeckActive,
  selectedNodeSelector,
  statusTabSelector,
  toolbarEditorSelector
}
