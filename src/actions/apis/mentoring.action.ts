'use server'
import { APPLICATION_PROGRESS } from '@/constants/mentor.constant'
import axios from '@/services/axios'
import { Mentee } from '@/types/mentoring/mentee.type'
import { IResponse } from '@/types/response.types'
import { IMenteeRequest } from './../../types/mentoring/mentee.type'
import { Metadata } from '@/types/types.type'

const ENDPOINT = '/mentoring'

interface IMenteeAddReview {
  extraKeywords: string[]
  content: string
  mentoringApplicationId: number
}

interface IMenteeUpdateApplication {
  mentoringId: number
  status: APPLICATION_PROGRESS
  mentoringApplicationId: number
}

export async function getMenteeActivity(params: IMenteeRequest) {
  const { data } = await axios.get(`${ENDPOINT}/mentee/my-page`, {
    params: {
      ...params
    }
  })
  return {
    data: data?.data as { metaData: Metadata; result: Mentee[] }
  }
}

export async function getMentoring(id: number) {
  const res = await axios.get(`${ENDPOINT}/${id}`)
  const { data, error }: IResponse = res
  return {
    data: data.data,
    error
  }
}

export async function menteeAddReview(id: number, body: IMenteeAddReview) {
  const res = await axios.post(`${ENDPOINT}/${id}/reviews`, { ...body })
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

export async function updateMenteeApplicationStatus(params: IMenteeUpdateApplication) {
  const res = await axios.put(`${ENDPOINT}/mentee/update-application-status`, { ...params })
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

export async function menteeViewReview(id: number) {
  const res = await axios.get(`${ENDPOINT}/${id}/reviews/get-my-review`)
  const { data, error }: IResponse = res
  return {
    data: data.data,
    error
  }
}

export async function getMentorStatistic() {
  const res = await axios.get(`${ENDPOINT}/mentor/dashboard/statistics`)
  const { data, error }: IResponse = res
  return {
    data: data?.data,
    error
  }
}

export async function getMentoringReviewAnalysis(id: number | null) {
  const res = await axios.get(`${ENDPOINT}/${id}/reviews-analysis`)
  const { data, error }: IResponse = res
  return {
    data: data?.data,
    error
  }
}

export async function getRevenueChart() {
  const res = await axios.get(`${ENDPOINT}/mentor/dashboard/revenue-chart`)
  const { data, error }: IResponse = res
  return {
    data: data?.data,
    error
  }
}

export async function undoReportComment(id: number) {
  const res = await axios.delete(`/reports/${id}`)
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

export async function updateComment(reqData: { id: string | number; data: { comment: string; status: string } }) {
  const res = await axios.put(`${ENDPOINT}/${reqData.id}`, reqData.data)
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}
