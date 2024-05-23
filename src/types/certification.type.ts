import { COURSE_STATUS_APPLY_EXAM } from '@/constants/certificate.constant'

export interface ICertificationExamequest {
  page?: number | string
  limit?: number | string
}

export interface CertificateExam {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  status: string
  type: string
  name: string
  code: string
  price: number
  hasRetest: boolean
  retestPrice: number
  retestPeriod: null
  hasTextbook: boolean
  textbookName: string
  registrationNumber: string
  competentDepartment: string
  qualificationValidityPeriod: number
  entitlementInformation: string
  jobDescription: string
  grade: string
  passingPoint: number
  courseQuizId: number
  thumbnailId: number
  certificateId: number
  totalBookmark: number
  userId: number
  studyType: null
  completeType: null
  hasUseChapter: null
  percentWatchVideo: null
  courseChapters: any[]
  courseQuiz: CourseQuiz
  productContents: ProductContent
  courseApplications: CourseApplication[]
  courseUserCertifications: any[]
  courseUserEducations: any[]
  courseUserHistories: any[]
  thumbnail: Certificate
  documents: any[]
  certificate: Certificate
  user: User
  statusRecruitmentFormat: COURSE_STATUS_APPLY_EXAM
  statusRecruitmentFormatText: string
  typeFormat: string
  no: number
  isBookmark: boolean
}

export interface Certificate {
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
  fileSize: null | string
  type: string
  userId: null
}

export interface CourseApplication {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  statusRecruitment: string
  courseId: number
  nickname: string
  phoneNumber: string
  email: string
  postcode: string
  address: string
  addressDetail: string
  point: number
  percentEducation: number
  userId: number
  orders: Order[]
  courseUserHistories: CourseUserHistory[]
  user: User
}

export interface CourseUserHistory {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  type: string
  result: string
  questions: Question[]
  point: number
  passingPoint: number
  totalPoint: number
  timeTaken: number
  wrongAnswer: number
  courseId: number
  courseApplicationId: number
  userId: number
  user: User
}

export interface Question {
  id: number
  point: number
  answers: Answer[]
  content: string
  question: string
}

export interface Answer {
  content: Content
  isAnswer: boolean
  hasSelect: boolean
  isCorrect: boolean
}

export enum Content {
  Answer1 = 'Answer 1',
  Answer2 = 'Answer 2',
  Answer3 = 'Answer 3',
  Answer4 = 'Answer 4',
  Answer5 = 'Answer 5',
  AnswerOX1 = 'Answer OX 1',
  AnswerOX2 = 'Answer OX 2'
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
  tax: number | null
  note: string
  code: string
  eventId: null
  courseId: number
  courseApplicationId: number
  mentoringId: null
  mentoringApplicationId: null
  productContentId: number
  fee: number
  feeAmount: number
}

export interface User {
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
  phoneNumber: null | string
  postcode: null
  address: null
  addressDetail: null
  deviceName: string
  language: string
  isDarkMode: boolean
  isReceiveEventEmail: boolean
  receiveEventEmailDate: string
  isReceiveEventPhone: boolean
  receiveEventPhoneDate: string
  isPhoneNumberVerified: boolean
  avatarId: null
  countryId: number | null
  lastChangedPasswordAt: string
  lastAccessDate: string
  upgradePackage: string
  upgradePackageValidDate: null
  numberOfLoginFailed: number
  agreeTermsAndConditions: AgreeTermsAndConditions | null
  talentPoolId: null
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
  mentoringId: null
  teamBuildingId: null
  avatar?: null
}

export interface AgreeTermsAndConditions {
  termsOfUse: boolean
  termsOfUseDate: string
  personalInformation: boolean
  personalInformationDate: string
  thirdPartiesInformation: boolean
  thirdPartiesInformationDate: string
}

export interface CourseQuiz {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  status: string
  typeOrder: string
  categoryId: number
  title: string
  code: null
  hasShuffle: null
  testTimeDuration: number
  userId: number
  isPublic: boolean
  isUsed: boolean
  totalQuestion: number
  totalPoint: number
  user: User
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
  mentoringId: null
  courseId: number
  orderId: null
}
