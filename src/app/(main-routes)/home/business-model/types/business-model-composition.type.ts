export type TArrow = {
  iconId: number
  description: string
  added: boolean
}

export type TRelationBox = {
  added: boolean
  forward: TArrow
  reverse: TArrow
}

export type TModelBox = {
  iconId: number
  name: string
  added: boolean
}

export type TArrowType = 'forward' | 'reverse'

export type TArrowDirectionType = 'vertical' | 'horizontal'

export type TBusinessModelCharacteristics = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  name: string
  type: string
  url: string
  description: string
}

export type TBusinessModelCompositionForm = {
  diagramDatas: { [k: number]: TModelBox }
  diagramRelationshipDatas: { [k: number]: TRelationBox }
}
