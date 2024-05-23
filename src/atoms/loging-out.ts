import { atom } from 'recoil'
export const logingOutAtom = atom<boolean>({
    key: 'logingOutAtom',
    default: false
})
