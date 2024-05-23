import { FormStatus } from '@/app/(main-routes)/home/card-news/utils/common'
import { EmploymentFormType } from '@/app/(main-routes)/home/employment-contract/utils/constants'
import { de } from 'date-fns/locale'
import { atom } from 'recoil'

const employmentContractDeckActive = atom<{
  deckId: number
  stepId: number
}>({
  key: 'employment-contract-deck-active',
  default: undefined
})

export interface FromGroupData {
  status: FormStatus
  type: EmploymentFormType
  data: { [key: string]: string }
}
const formGroup1 = atom<FromGroupData>({
  key: 'formGroup1',
  default: undefined
})

const formGroup2 = atom<FromGroupData>({
  key: 'formGroup2',
  default: undefined
})

const formGroup3 = atom<FromGroupData>({
  key: 'formGroup3',
  default: undefined
})

const formGroup4 = atom<FromGroupData>({
  key: 'formGroup4',
  default: undefined
})

const formGroup5 = atom<FromGroupData>({
  key: 'formGroup5',
  default: undefined
})

const formGroup6 = atom<FromGroupData>({
  key: 'formGroup6',
  default: undefined
})

const activeFormGroup = atom<EmploymentFormType>({
  key: 'activeFormGroup',
  default: undefined
})

export {
  employmentContractDeckActive,
  formGroup1,
  formGroup2,
  formGroup3,
  formGroup4,
  formGroup5,
  formGroup6,
  activeFormGroup
}
