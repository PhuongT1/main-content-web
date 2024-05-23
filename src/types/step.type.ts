import { StepList } from '@/components/home/step'

export type TStepApi = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: any
  name: string
  deckId: number
  data: any
  position: number
}

export type TStepItem = TStepApi & StepList

export enum StatusStep {
  PENDING = 'PENDING',
  FINISHED = 'FINISHED'
}

export type TStepPayload<T> = {
  projectId: number
  deckId: number
  stepId: number
  status: keyof typeof StatusStep
  data: T
  playTime: number
  deletedStepActivitiesIds: number[]
  currentStep: number
  fnCallback?: VoidFunction
}
export type StepQuery = {
  deckId?: number
  stepId?: number
  projectId?: number
}
