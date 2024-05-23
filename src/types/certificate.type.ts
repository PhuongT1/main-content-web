import {
  COURSE_APPLICATION_HISTORY_RESULT,
  COURSE_APPLICATION_HISTORY_TYPE,
  COURSE_APPLICATION_STATUS_RECRUITMENT,
  COURSE_CHAPTER_TYPE,
  COURSE_COMPLETE_TYPE,
  COURSE_EDUCATION_STATUS_RECRUITMENT,
  COURSE_FORMAT_STATUS,
  COURSE_QUIZ_TYPE_ORDER,
  COURSE_QUIZ_TYPE_QUESTION,
  COURSE_STATUS,
  COURSE_STUDY_TYPE,
  COURSE_TYPE,
  STATUS_FORMAT,
  STATUS_RECRUITMENT_FORMAT
} from '@/constants/certificate.constant'
import { TImage } from './types.type'
import { TUser } from './user.type'

export type TCourseInfo = {
  courseQuiz: TCourseQuiz
}

export type TCourseQuiz = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  status: string
  typeOrder: COURSE_QUIZ_TYPE_ORDER
  categoryId: number
  title: string
  code: string
  hasShuffle: boolean
  testTimeDuration: number
  userId: number | null
  isPublic: boolean
  type: COURSE_APPLICATION_HISTORY_TYPE
  isUsed: boolean
  totalQuestion: number
  totalPoint: number
  courseQuestions: TCourseQuestion[]
  user: TUser
  courses: TCourse[]
  canTest?: boolean
}

export type TCourseQuestion = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  type: COURSE_QUIZ_TYPE_QUESTION
  question: string
  content: string
  point: number
  totalAnswers: number
  answers: TAnswer[]
  courseQuizId: number
}

export type TAnswer = {
  content: string
  isAnswer: boolean
}

export type TCourseResult = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  type: string
  result: COURSE_APPLICATION_HISTORY_RESULT
  questions: TQuestionResult[]
  point: number
  passingPoint: number
  totalPoint: number
  timeTaken: number
  wrongAnswer: number
  courseId: number
  courseApplicationId: number
  userId: number
  course: TCourse
  courseApplication: TCourseApplications
  user: TUser
}

export type TQuestionResult = {
  id: number
  point: number
  answers: TAnswerResult[]
  content: string
  question: string
  isCorrect: boolean
}

export type TAnswerResult = {
  content: string
  isAnswer: boolean
  hasSelect: boolean
  isCorrect: boolean
}
export type TCourse = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  status: COURSE_STATUS
  type: COURSE_TYPE
  name: string
  code: string
  price: number
  hasRetest: boolean
  retestPrice: number
  retestPeriod: string
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
  studyType: string
  completeType: COURSE_COMPLETE_TYPE
  hasUseChapter: boolean
  percentWatchVideo: number
  courseChapters: TCourseChapter[]
  courseApplications: TCourseApplications
  courseUserCertifications: TCourseUserCertifications
  thumbnail: TImage
  documents: TImage[]
  certificate: TImage
  user: TImage
  statusFormatText: string
  statusFormat: STATUS_FORMAT
  statusRecruitmentFormatText: string
  statusRecruitmentFormat: STATUS_RECRUITMENT_FORMAT
  canTest: boolean
  courseUserHistories: TCourseResult
  statusRecruitmentFormatV2: COURSE_FORMAT_STATUS
  recentChapterId: number
  recentEducationVideoId: number
}

export type TCourseApplications = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  statusRecruitment: COURSE_APPLICATION_STATUS_RECRUITMENT
  courseId: number
  nickname: string
  phoneNumber: string
  email: string
  address: string
  point: string
  percentEducation: number
  userId: number
  user: TUser
}

export type TCourseChapter = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  name: string
  type: COURSE_CHAPTER_TYPE
  isComplete: boolean
  isUsed: boolean
  courseId: number
  courseUserEducations: TCourseUserEducation[]
}

export type TCourseUserEducation = {
  id: number
  studyType: COURSE_STUDY_TYPE
  order: number
  duration: number
  currentDuration: number
  percent: number
  videoUrl: string
  statusRecruitment: COURSE_EDUCATION_STATUS_RECRUITMENT
  statusRecruitmentFormat: string
  title: string
  description: string
}

export type TCourseUserCertifications = {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  nickname: string
  dateOfBirth: string
  userImageId: number
  certificateId: number
  courseId: number
  courseApplicationId: number
  userId: number
  userImage: TImage
  certificate: TImage
  user: TUser
}

export type TSelectedAnswers = { [k: number]: number[] }
