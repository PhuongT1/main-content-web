import { COURSE_APPLICATION_HISTORY_TYPE } from '@/constants/certificate.constant'
import { TCourse, TCourseQuiz, TCourseResult } from '@/types/certificate.type'
import { IResponse } from '@/types/response.types'
import { AxiosError } from 'axios'
import axios from './axios'

const ENDPOINT = '/courses'

type TSaveExamResultPayload = {
  courseId: number
  courseQuizId: number
  timeTaken: number
  type: COURSE_APPLICATION_HISTORY_TYPE
  questions: { id: number; answers: { content: string; hasSelect: boolean }[] }[]
}

type TCreateCertificatePayload = {
  nickname: string
  dateOfBirth: string
  courseId: number
  userImageId: number
}

//LMS
export const getCourseChapter = async (id: number) => {
  const res = await axios.get(`${ENDPOINT}/lms/education/active?courseApplicationId=${id}`)

  const { data, error }: IResponse = res
  return {
    data: data?.data as TCourse,
    error: error as AxiosError
  }
}

export const getMyTest = async (params: { page: number }): Promise<any> => {
  const data = await axios.get(`${ENDPOINT}/lms/application/active`, { params, showErrorDialog: true })
  return data.data
}

export const getMyCertificateList = async (params: { listType: string; page: number }): Promise<any> => {
  const data = await axios.get(`${ENDPOINT}/lms/certification/active`, { params })
  return data.data
}

export const getExamDetail = async (id: number) => {
  const data = await axios.get(`${ENDPOINT}/lms/active/${id}`)
  return data.data
}

export const saveLectureProgress = async ({ duration, id }: { duration: number; id: number }) => {
  const data = await axios.patch(`${ENDPOINT}/lms/education/${id}`, {
    currentDuration: duration
  })
  return data.data
}

export const saveExamResult = async (payload: TSaveExamResultPayload) => {
  const data = await axios.post(`${ENDPOINT}/lms/test-history`, payload, {
    showErrorDialog: true
  })
  return data.data as { data: TCourseResult }
}

export const getExamResultDetail = async (id: number) => {
  const data = await axios.get(`${ENDPOINT}/lms/history/active/${id}`)
  return data.data as { data: TCourseResult }
}

export const createCertificate = async (payload: TCreateCertificatePayload) => {
  const data = await axios.post(`${ENDPOINT}/lms/certification`, payload)
  return data.data as { data: TCourseResult }
}

//CMS
export const getExam = async (id: number) => {
  const data = await axios.get(`${ENDPOINT}/cms/quizzes/${id}`, {
    showErrorDialog: true
  })
  return data.data as { data: TCourseQuiz }
}
