import LocalStorageService from '@/services/local-storage.service'
import { atom } from 'recoil'
export const authAtom = atom<any>({
  key: 'authAtom',
  default: LocalStorageService.getLocalAccessToken()
})
