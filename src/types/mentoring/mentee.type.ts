export interface IMenteeRequest {
  page?: number | string
  limit?: number | string
  status: string
  fromDate?: Date | string
  toDate?: Date | string
  keySearch?: string
  keyword?: string
}

export interface Mentee {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  status: string
  mentoringTransactionStatus: string
  paidForMentorAt: null
  bankAccountName: null
  bankAccountNumber: null
  bankName: null
  note: string
  mentoringId: number
  userId: number
  mentorId: number
  orderId: number
  productContentId: number
  approvedAt: null
  inProcessAt: string
  completedAt: string
  cancelledAt: null
  menteeCancelledAt: null
  menteeWroteReviewAt: null
  mentorWroteReviewAt: string
  mentorReport: string
  user: Mentor
  order: Order
  productContent: ProductContent
  mentor: Mentor
  mentoring: Mentoring
  no: number
}

export interface Mentor {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  role: string
  status: string
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
  avatarId: number | null
  countryId: number
  lastChangedPasswordAt: string
  lastAccessDate: string
  upgradePackage: string
  upgradePackageValidDate: null
  numberOfLoginFailed: number
  agreeTermsAndConditions: AgreeTermsAndConditions
  talentPoolId: number | null
  totalContactTeamBuilding: number
  totalContactTalentPool: number
  totalContactOutsourcingCompany: number
  totalSentContactTeamBuilding: number
  totalSentContactTalentPool: number
  totalSentContactOutsourcingCompany: number
  totalSentContactMentoring: number
  totalMentoringApplied: number
  currentMoney: number
  totalMoney: number
  totalMoneyPurchase: number
  mentoringId: number | null
  avatar: Avatar | null
  teamBuildingId: null
}

export interface AgreeTermsAndConditions {
  termsOfUse: boolean
  termsOfUseDate: string
  personalInformation: boolean
  personalInformationDate: string
  thirdPartiesInformation: boolean
  thirdPartiesInformationDate: string
}

export interface Mentoring {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  status: string
  username: string
  badge: string[]
  email: string
  nameOfAffiliation: string
  position: string
  introduction: string
  otherInformation: string
  urls: string[]
  totalApplications: number
  totalApplicationsCompleted: number
  totalApplicationsReport: number
  reason: null
  rejectedAt: null
  approvedAt: string
  userId: number
  totalView: number
  totalViewByDay: number
  totalReviews: number
  totalBookmark: number
  isPublic: boolean
  bankAccountName: null
  bankAccountNumber: null
  bankName: null
  user: Mentor
}

export interface Avatar {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  status: string
  url: string
  baseUrl: string
  key: string
  name: string
  originalname: string
  fileType: string
  fileSize: string
}

export interface Order {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  status: string
  type: string
  paymentMethod: string
  name: string
  email: string
  userId: number
  productId: number
  quantity: number
  price: number
  totalAmount: number
  lastTotalAmount: number
  couponId: null
  tax: null
  note: string
  eventId: null
  courseId: null
  mentoringId: number
  mentoringApplicationId: number
  productContentId: number
  fee: number
  feeAmount: number
}

export interface ProductContent {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  type: string
  code: string
  productId: number
  eventId: null
  mentoringId: number
  orderId: null
  product: Product
}

export interface Product {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  status: string
  type: string
  code: string
  name: string
  description: string
  price: number
  isSale: boolean
  hasSettlement: boolean
  userId: null
  user: null
}
