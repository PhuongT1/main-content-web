import { atom } from 'recoil'

export interface IPressResult {
  Title: string
  Core_Headline_1: string
  Core_Headline_2: string
  Core_Headline_3: string
  Content_Introduction: string
  Content_Main_1: string
  Content_Main_2: string
  Content_Main_3: string
  Content_Conclusion: string
  Distribution_Date?: Date | string
  Press_Thumbnail?: string
}

export interface IOpenAiPressRelease {
  result: IPressResult
  referenceId: number | false | undefined
  payload: any
}

export const pressReleaseAtom = atom<Array<any>>({
  key: 'pressReleaseAtom',
  default: []
})

export const openAIPressRelease = atom<IOpenAiPressRelease[]>({
  key: 'openAIPressRelease',
  default: []
})

export const pressExpand = atom<number | false>({
  key: 'pressExpand',
  default: false
})

export const editPressRelease = atom<boolean>({
  key: 'editPressRelease',
  default: false
})
