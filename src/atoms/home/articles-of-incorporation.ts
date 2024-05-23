import { atom } from 'recoil'
import {
  IAriticiesOfIncorporationAtomStep1,
  IAriticiesOfIncorporationAtomStep2
} from '../../types/articies-of-incorporation.type'

export const dataStep1Atom = atom<IAriticiesOfIncorporationAtomStep1>({
  key: 'articlesOfIncorporation',
  default: {} as IAriticiesOfIncorporationAtomStep1
})

export const dataStep2Atom = atom<IAriticiesOfIncorporationAtomStep2>({
  key: 'articlesOfIncorporation',
  default: {} as IAriticiesOfIncorporationAtomStep2
})

export interface IValueSuccess {
  typeOne: 'INIT' | 'PROCESS' | 'DONE'
  typeTwo: 'INIT' | 'PROCESS' | 'DONE'
  typeThree: 'INIT' | 'PROCESS' | 'DONE'
  typeFour: 'INIT' | 'PROCESS' | 'DONE'
  typeFive: 'INIT' | 'PROCESS' | 'DONE'
  typeSix: 'INIT' | 'PROCESS' | 'DONE'
  typeSeven: 'INIT' | 'PROCESS' | 'DONE'
  typeEight: 'INIT' | 'PROCESS' | 'DONE'
  typeNine: 'INIT' | 'PROCESS' | 'DONE'
  typeTen: 'INIT' | 'PROCESS' | 'DONE'
}

export const successValue = atom<IValueSuccess>({
  key: 'successValueArticlesOfInCorporation',
  default: {
    typeOne: 'INIT',
    typeTwo: 'INIT',
    typeThree: 'INIT',
    typeFour: 'INIT',
    typeFive: 'INIT',
    typeSix: 'INIT',
    typeSeven: 'INIT',
    typeEight: 'INIT',
    typeNine: 'INIT',
    typeTen: 'INIT'
  } as IValueSuccess
})

export const projectIdArticleOfIncorporation = atom({
  key: 'projectIdArticleOfIncorporation',
  default: 0
})
