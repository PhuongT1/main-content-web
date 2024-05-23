import { USER_ROLE, USER_STATUS } from '@/constants/user.constants'
import { TImage } from './types.type'

export interface IUser {
  id: number
  email: string
  phoneNumber: string
  role: string
  createdAt: string
  updatedAt?: string
  deletedAt?: string
  lastChangedPasswordAt?: string
  username: string
  language?: string
  isDarkMode?: boolean
  isReceiveEventEmail?: boolean
  isReceiveEventPhone?: boolean
  avatar?: IFile
  country?: ICountry
  nickname?: string
  hasBookmark: boolean
  uuid: string
  status: string
  postcode?: string
  address?: string
  addressDetail?: string
  deviceName?: string
  receiveEventEmailDate: Date
  receiveEventPhoneDate: Date
  isPhoneNumberVerified: boolean
  countryId: number
  lastAccessDate: Date
  numberOfLoginFailed: number
  agreeTermsAndConditions: IAgreeTermsAndConditions
  latestLogin: Date
  talentPoolId?: number
  teamBuildingId?: number
  mentoringId?: number | null
  upgradePackage?: USER_UPGRADE_PACKAGE
  upgradePackageValidDate?: string
  upgradePackageStartDate?: string
}

export interface IUserMe {
  createdAt?: string
  updatedAt?: string
  uuid?: string
  id: number
  username?: string
  nickname?: string
  avatarUrl?: string
  email?: string
  role?: USER_ROLE
  language?: string
  isGroupLeader?: boolean
  packageType?: USER_UPGRADE_PACKAGE
}

export interface IAgreeTermsAndConditions {
  termsOfUse: boolean
  termsOfUseDate: Date
  personalInformation: boolean
  personalInformationDate: Date
  thirdPartiesInformation: boolean
  thirdPartiesInformationDate: Date
}
export interface IFile {
  id: number
  url: string
  name: string
  fileType?: string
}

export interface ICountry {
  id: number
  name: string
  code: string
  flag: string
}

export type TUser = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  role: USER_ROLE
  status: USER_STATUS
  email: string
  username: string
  nickname: string
  phoneNumber: string
  postcode: string
  address: string
  addressDetail: string
  deviceName: string
  language: string
  isDarkMode: boolean
  isReceiveEventEmail: boolean
  receiveEventEmailDate: string
  isReceiveEventPhone: boolean
  receiveEventPhoneDate: string
  isPhoneNumberVerified: boolean
  countryId: number
  lastChangedPasswordAt: string
  lastAccessDate: string
  numberOfLoginFailed: number
  agreeTermsAndConditions: Terms
  avatar: TImage
}

export type Terms = {
  termsOfUse: boolean
  termsOfUseDate: string
  personalInformation: boolean
  personalInformationDate: string
  thirdPartiesInformation: boolean
  thirdPartiesInformationDate: string
}

export type JwtToken = {
  accessToken: string
  refreshToken: string
}

export enum USER_UPGRADE_PACKAGE {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM'
}
