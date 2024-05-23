import * as yup from 'yup'

export const MAX_ITEM_REFERENCE_SLOGAN = 10
export const MAX_ITEM_USER_SLOGAN = 3
export interface ReferenceSloganType {
  en: string
  kr: string
}

export interface GetReferenceSloganType {
  brandName: string
  idea: string
  concept: string
}
export interface Slogan_Step1_Type {
  brandName: string
  idea: string
  conceptID: number
  referenceSloganAI: ReferenceSloganType[]
  referenceSlogan: ReferenceSloganType[]
}

export const Slogan_Step1_Yup = yup.object().shape({
  brandName: yup.string().required(' '),
  idea: yup.string().required(' '),
  conceptID: yup.number().required(' '),
  referenceSloganAI: yup.array().required(),
  referenceSlogan: yup.array().required(' ').min(1).max(MAX_ITEM_REFERENCE_SLOGAN)
})

export interface Slogan_Step2_Type {
  addSlogan?: string
  userSlogan: { value: string }[]
}

export const Slogan_Step2_Yup = yup.object().shape({
  userSlogan: yup.array().required(' ').min(1).max(MAX_ITEM_USER_SLOGAN),
  addSlogan: yup.string().when('userSlogan', {
    is: (data: { value: string }[]) => data.length < 1,
    then: (schema) => schema.required(' ')
  })
})

export interface Slogan_Step3_Type {
  checkPointSlogan: { value: string; point: number[]; isActive: boolean }[]
}

export const Slogan_Step3_Yup = yup.object().shape({
  checkPointSlogan: yup
    .array()
    .required(' ')
    .min(1)
    .max(MAX_ITEM_USER_SLOGAN)
    .test('at-least-one-active', ' ', function (value) {
      return value.some((item) => item.isActive)
    })
})

export interface Slogan_Step4_Type {
  imageURL: string
  slogan: string
}

export const Slogan_Step4_Yup = yup.object().shape({
  imageURL: yup.string().required(' '),
  slogan: yup.string().required(' ')
})

export interface SloganConceptType {
  id: number
  description: string
  imageUrl: string
  nameEn: string
  nameKr: string
  altTextKr: string
  altTextEn: string
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}
