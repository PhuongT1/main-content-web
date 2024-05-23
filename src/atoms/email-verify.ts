import { atom } from 'recoil'
export const emailVerifyAtom = atom<boolean | null>({
  key: 'emailVerifyAtom',
  default: null
})
