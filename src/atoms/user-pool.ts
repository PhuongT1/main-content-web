import { IPool } from '@/types/pool.type'
import { atom } from 'recoil'

export const userPoolAtom = atom<IPool | null>({
  key: 'userPoolAtom',
  default: {} as IPool
})
