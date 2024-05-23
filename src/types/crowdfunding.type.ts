interface Thumbnail {
  baseUrl: string
  createdAt: string
  deletedAt: string | null
  fileSize: string
  fileType: string
  id: number
  key: string
  name: string
  originalname: string
  status: string
  type: string
  updatedAt: string
  url: string
  userId: number | null
  uuid: string
}

interface User {
  address: string | null
  addressDetail: string | null
  agreeTermsAndConditions: {
    personalInformation: boolean
    personalInformationDate: string
    termsOfUse: boolean
    termsOfUseDate: string
    thirdPartiesInformation: boolean
    thirdPartiesInformationDate: string
  }
  avatarId: number | null
  countryId: number
  createdAt: string
  currentMoney: number
  deletedAt: string | null
  deviceName: string
  email: string
  id: number
  isDarkMode: boolean
  isPhoneNumberVerified: boolean
  isReceiveEventEmail: boolean
  isReceiveEventPhone: boolean
  language: string
  lastAccessDate: string
  lastChangedPasswordAt: string
  mentoringId: number | null
  nickname: string
  numberOfLoginFailed: number
  phoneNumber: string
  postcode: string | null
  receiveEventEmailDate: string
  receiveEventPhoneDate: string
  role: string
  status: string
  talentPoolId: number | null
  teamBuildingId: number | null
  totalContactOutsourcingCompany: number
  totalContactTalentPool: number
  totalContactTeamBuilding: number
  totalMentoringApplied: number
  totalMoney: number
  totalMoneyPurchase: number
  totalSentContactMentoring: number
  totalSentContactOutsourcingCompany: number
  totalSentContactTalentPool: number
  totalSentContactTeamBuilding: number
  updatedAt: string
  upgradePackage: string
  upgradePackageStartDate: string | null
  upgradePackageValidDate: string | null
  username: string
  uuid: string
}

export interface CrowdfundingCompany {
  content: string
  createdAt: string
  crowdfundingId: number
  deletedAt: string | null
  description: string
  id: number
  name: string
  representative: string
  thumbnail: Thumbnail
  thumbnailId: number
  updatedAt: string
  user: User
  userId: number
  uuid: string
}

export enum CROWDFUNDING_STATUS {
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
  REMOVED = 'REMOVED'
}

export enum CROWDFUNDING_STATUS_RECRUITMENT {
  WAITING = 'WAITING',
  PROGRESS = 'PROGRESS',
  FINISH = 'FINISH'
}

export enum CROWDFUNDING_TYPE {
  PAIR = 'PAIR',
  RANK = 'RANK'
}

export enum CROWDFUNDING_CLASSIFICATION {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC'
}

export interface Crowdfunding {
  classification: CROWDFUNDING_CLASSIFICATION
  classificationFormat: string
  createdAt: string
  createdAtFormat: string
  crowdfundingCompanies: CrowdfundingCompany[]
  crowdfundingInvestors: any[]
  deadlineDate: string
  deletedAt: string | null
  endTime: string
  endTimeFormat: string
  fundingEntity: string
  fundingTitleName: string
  id: number
  investmentAmount: number
  no: number
  numberOfCompany: number
  numberOfInvestmentCompanies: number
  numberOfInvestor: number
  startTime: string
  startTimeFormat: string
  status: CROWDFUNDING_STATUS
  statusRecruitment: string
  statusRecruitmentFormat: string
  thumbnail: Thumbnail
  thumbnailId: number
  totalFunding: number
  type: CROWDFUNDING_TYPE
  typeFormat: string
  updatedAt: string
  user: User
  userId: number
  uuid: string
  whitelistUsers: any[]
}
