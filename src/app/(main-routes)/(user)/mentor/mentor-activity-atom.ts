import { atom } from 'recoil'

export const mentorTabVisibleAtom = atom<boolean>({
  key: 'mentorTabVisible',
  default: true
})
