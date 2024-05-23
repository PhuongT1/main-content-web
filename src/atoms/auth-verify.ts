import { atom } from 'recoil'
export const authVerifyAtom = atom<boolean | null>({
    key: 'authVerifyAtom',
    default: null
})
