'use server'
import axios from '@/services/axios'
import { CertificateExam, ICertificationExamequest } from '@/types/certification.type'
import { IResponse } from '@/types/response.types'
import { Metadata } from '@/types/types.type'

const ENDPOINT = '/courses/lms'

interface IApplicationRequest {
  courseId: number
  orderId: number
  nickname: string
  phoneNumber: string
  email: string
  postcode?: string
  address?: string
  addressDetail?: string
}

export async function getCertificateExamList(params: ICertificationExamequest) {
  const { data } = await axios.get(`${ENDPOINT}/active`, {
    params: {
      ...params
    }
  })
  return {
    data: data?.data as { metaData: Metadata; result: CertificateExam[] }
  }
}

export async function getCertificateExamDetail(id: number) {
  const res = await axios.get(`${ENDPOINT}/active/${id}`)
  const { data, error }: IResponse = res
  return {
    data: data.data as CertificateExam,
    error
  }
}

export async function createApplicationExam(body: IApplicationRequest) {
  const res = await axios.post(`${ENDPOINT}/application`, { ...body })
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

export async function createRetestApplicationExam(body: { courseId: number; courseApplicationId: number }) {
  const res = await axios.post(`${ENDPOINT}/retest-application`, { ...body })
  const { data, error }: IResponse = res
  return {
    data,
    error
  }
}

// export async function updateMenteeApplicationStatus(params: IMenteeUpdateApplication) {
//   const res = await axios.put(`${ENDPOINT}/mentee/update-application-status`, { ...params })
//   const { data, error }: IResponse = res
//   return {
//     data,
//     error
//   }
// }

// export async function menteeViewReview(id: number) {
//   const res = await axios.get(`${ENDPOINT}/${id}/reviews/get-my-review`)
//   const { data, error }: IResponse = res
//   return {
//     data: data.data,
//     error
//   }
// }

// export async function getMentorStatistic() {
//   const res = await axios.get(`${ENDPOINT}/mentor/dashboard/statistics`)
//   const { data, error }: IResponse = res
//   return {
//     data: data?.data,
//     error
//   }
// }

// export async function getMentoringReviewAnalysis(id: number | null) {
//   const res = await axios.get(`${ENDPOINT}/${id}/reviews-analysis`)
//   const { data, error }: IResponse = res
//   return {
//     data: data?.data,
//     error
//   }
// }

// export async function getRevenueChart() {
//   const res = await axios.get(`${ENDPOINT}/mentor/dashboard/revenue-chart`)
//   const { data, error }: IResponse = res
//   return {
//     data: data?.data,
//     error
//   }
// }

// export async function undoReportComment(id: number) {
//   const res = await axios.delete(`/reports/${id}`)
//   const { data, error }: IResponse = res
//   return {
//     data,
//     error
//   }
// }

// export async function updateComment(reqData: { id: string | number; data: { comment: string; status: string } }) {
//   const res = await axios.put(`${ENDPOINT}/${reqData.id}`, reqData.data)
//   const { data, error }: IResponse = res
//   return {
//     data,
//     error
//   }
// }
