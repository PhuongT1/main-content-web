export interface IInventoryData {
  id: number
  uuid: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  userId: number
  fileName: string
  fileUrl: string
  fileSize: string
  width: string
  height: string
  category1: string
  category2: string
  no: number
}
