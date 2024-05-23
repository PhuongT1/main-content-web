import { StepActivity } from '@/types/deck.type'
import { atom } from 'recoil'

export type SloganAtomType = [StepActivity<[]>, StepActivity<[]>]

export const SloganAtom = atom<SloganAtomType>({
  key: 'sloganStep',
  default: [] as unknown as SloganAtomType
})

export const LinesAtom = atom<any>({
  key: 'lines',
  default: [] as any
})
