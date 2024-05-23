import { COURSE_TYPE } from '@/constants/certificate.constant'
import { TCourse } from '@/types/certificate.type'

export const getIsDirectTest = (course?: TCourse) => {
  return course?.type === COURSE_TYPE.TEST
}

export const getDuration = (seconds: number) => {
  return seconds
}
