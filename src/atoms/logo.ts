import { atom } from 'recoil'
import { DataStep1, DataStep2, DataStep3 } from '@/types/logo.type'

const step1 = atom<DataStep1>({
  key: 'step1',
  default: {} as DataStep1
})

const step2 = atom<Array<DataStep2>>({
  key: 'step2',
  default: [] as any
})

const step3 = atom<Array<DataStep3>>({
  key: 'step3',
  default: [] as any
})

const step4 = atom<DataStep3>({
  key: 'step4',
  default: {} as any
})

export { step1, step2, step3, step4 }
