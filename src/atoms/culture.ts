import { atom } from 'recoil'

const tab = atom<'ABOUT_US' | 'DIRECTION' | 'CULTURE' | 'PEOPLE' | 'OTHERS'>({
  key: 'tab',
  default: 'ABOUT_US'
})

const culture_forms = atom<any>({
  key: 'culture_forms',
  default: {} as any
})

export { tab, culture_forms }
