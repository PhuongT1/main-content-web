'use client'
import axios from '@/services/axios'
import { IResponse } from '@/types/response.types'
import { EXPLORER_CATEGORY_ENUM, IDetailProject, ISettingProject, ProjectParticipant } from '../domain'
import { TResponseInfinite } from '@/types/types.type'
import { TFeedBacks, TReportFeedbackForm } from '../domain/entities/feedback-project'

const ENDPOINT = '/project-part/projects'
const ENDPOINT_SHARE = '/project-part/project-shares'
const ENDPOINT_FEEDBACK = '/project-part/project-feedbacks'

export const getProjectDetail = async (
  idProject: number | string,
  isShare?: boolean,
  category?: EXPLORER_CATEGORY_ENUM
): Promise<IDetailProject> => {
  if (isShare) {
    const res = await axios.get(`${ENDPOINT}/code/${idProject}`, {
      params: { category: EXPLORER_CATEGORY_ENUM.PARTICIPATING_PROJECTS }
    })
    const { data, error }: IResponse = res
    if (error) throw error
    return data?.data
  }
  const res = await axios.get(`${ENDPOINT}/${idProject}`, { params: { category } })
  const { data, error }: IResponse = res
  if (error) throw error
  return data?.data
}

export const setProjectSetting = async (idProject: number, setting: ISettingProject): Promise<IDetailProject> => {
  const res = await axios.put(`${ENDPOINT}/${idProject}/settings`, { ...setting })
  const { data, error }: IResponse = res
  if (error) throw error
  return data.data
}

export const openInnovation = async (projectId: number): Promise<{ id: number }> => {
  const res = await axios.post(`${ENDPOINT}/open-innovation`, { projectId })
  const { data, error }: IResponse = res
  if (error) throw error
  return data.data
}

export const deleteProject = async (projectId: number): Promise<IDetailProject> => {
  const res = await axios.delete(`${ENDPOINT}/${projectId}`)
  const { data, error }: IResponse = res
  if (error) throw error
  return data
}
export const getProjecParticipants = async (
  projectId: number,
  page: number
): Promise<TResponseInfinite<ProjectParticipant>> => {
  const res = await axios.get(`${ENDPOINT}/participants`, { params: { projectId, page, limit: 10, order: 'DESC' } })
  const { data, error }: IResponse = res
  if (error) throw error
  return data.data
}

///FEEDBACK///

export const getProjectFeedbacks = async (projectId: number, page: number): Promise<TResponseInfinite<TFeedBacks>> => {
  const res = await axios.get(`${ENDPOINT_FEEDBACK}`, { params: { projectId, page, limit: 10, order: 'DESC' } })
  const { data, error }: IResponse = res
  if (error) throw error
  return data.data
}

export const sendProjectFeedbacks = async (projectId: number, content: string) => {
  const res = await axios.post(`${ENDPOINT_FEEDBACK}`, { projectId, content })
  const { data, error }: IResponse = res
  if (error) throw error
  return
}

export const deleteProjectFeedbacks = async (id: number) => {
  const res = await axios.delete(`${ENDPOINT_FEEDBACK}/${id}`)
  const { data, error }: IResponse = res
  if (error) throw error
  return
}

export const reportProjectFeedbacks = async (id: number, form: TReportFeedbackForm) => {
  const res = await axios.post(`${ENDPOINT_FEEDBACK}/${id}/report`, form)
  const { data, error }: IResponse = res
  if (error) throw error
  return
}
