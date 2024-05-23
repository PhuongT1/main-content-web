import { TImage } from '../types.type'
import { IUser, TUser } from '../user.type'

export type TStamp = {
  id: number
  createdAt: string
  updatedAt: string
  deletedAt: string
  status: SIGNATURE_STAMPS_STATUS
  type: SIGNATURE_STAMPS_TYPE
  name: string
  imageId: number
  userId: number
  user: IUser
  image: TImage
}

export enum SIGNATURE_STAMPS_STATUS {
  ACTIVE = 'ACTIVE',
  REMOVED = 'REMOVED'
}

export enum SIGNATURE_STAMPS_TYPE {
  SIGNATURE = 'SIGNATURE',
  STAMPS = 'STAMPS'
}

export interface DrawProps {
  canvas?: HTMLCanvasElement
  context: CanvasRenderingContext2D
  radius?: number
  width: number
  height: number
  name?: string
  bold?: boolean
}

export interface SealDemoProps {
  type: 'star' | 'dot'
  companyName: string
  bold: boolean
}

export type StampRecord = {
  name: string
  imageId: number
  type: string
  userId: number
  deletedAt: string
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  status: string
}

export type StampListRecord = StampRecord & {
  no: 10
  user: TUser
  image: TImage
}
