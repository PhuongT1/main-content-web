import { TalentPoolForm } from '@/types/pool.type'
import { atom } from 'recoil'
export const talentPoolFormAtom = atom<TalentPoolForm>({
  key: 'talentPoolFormAtom',
  default: {} as TalentPoolForm
})
