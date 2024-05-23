import { atom } from 'recoil'
export const loadingProjectAtom = atom<boolean>({
  key: 'loadingProjectAtom',
  default: false
})
