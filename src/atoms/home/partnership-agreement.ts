import { IIdTab } from '@/app/(main-routes)/home/partnership-agreement/components/step-list/step-02/additional-contract-terms-edit/accordion-form-view'
import { IDataStep01, IValueSuccess } from '@/types/partnership-agreement'
import { atom } from 'recoil'

export const dataStep1Atom = atom<IDataStep01>({
  key: 'dataPartnershipAgreementStep1',
  default: {} as IDataStep01
})

export const successValue = atom<IValueSuccess>({
  key: 'successValue',
  default: {
    typeOne: 'INIT',
    typeTwo: 'INIT',
    typeThree: 'INIT',
    typeFour: 'INIT',
    typeFive: 'INIT',
    typeSix: 'INIT'
  } as IValueSuccess
})

export const tabId = atom<IIdTab>({
  key: 'tab',
  default: {} as IIdTab
})

export const projectIdPartnershipAgreement = atom({
  key: 'projectIdPartnershipAgreement',
  default: 0
})
