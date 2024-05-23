import { Dictionary } from '@/types/types.type'
import { atom } from 'recoil'

export const dictAtom = atom<Dictionary>({
  key: 'dictAtom',
  default: {} as Dictionary
})

export const langPeter = atom<any>({
  key: 'dictlang',
  default: 'en'
})
