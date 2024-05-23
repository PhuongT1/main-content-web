export interface ICategory {
  id: number
  uuid: string
  createdAt: Date
  updatedAt: Date
  deletedAt: null
  status: string
  type: string
  subType: string
  name: string
  code: string
  note: string
  order: null
  isEditable: boolean
  totalItems: number
}
