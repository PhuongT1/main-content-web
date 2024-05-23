import { IResponse } from '@/types/response.types'
import axios from './axios'
import {
  BasicInformationType,
  ItemsSurveyViewType,
  ReviewBasicInformationType,
  SurveyItems,
  SurveyViewAnswersType,
  SurveyViewType,
  TDataResSurvey
} from '@/types/survey.type'
import moment from 'moment-timezone'

const ENDPOINT = '/project-part/step-resources/surveys'

export async function createrSurveyBasicInformation(
  projectId: number,
  form: BasicInformationType
): Promise<ReviewBasicInformationType> {
  const { startDate, endDate, ...prew } = form
  const { data, error }: IResponse = await axios.post(`${ENDPOINT}`, {
    projectId,
    startDate: moment(startDate).tz('Asia/Seoul').startOf('day').toISOString(),
    endDate: moment(endDate).tz('Asia/Seoul').endOf('day').toISOString(),
    ...prew
  })
  if (error) throw error
  return data.data
}

export async function addSurveyItem(surveyId: number, form: SurveyItems[]): Promise<ItemsSurveyViewType[]> {
  const { data, error }: IResponse = await axios.post(`${ENDPOINT}/${surveyId}`, { items: form })
  if (error) throw error
  return data.data
}

export async function getSurveyWithProjectId(projectId: number): Promise<SurveyViewType | undefined> {
  const { data, error }: IResponse = await axios.get(`${ENDPOINT}/projects/${projectId}`)
  if (error) throw error
  return data.data
}

export async function getSurveyWithId(surveyId: number): Promise<SurveyViewType> {
  const { data, error }: IResponse = await axios.get(`${ENDPOINT}/${surveyId}`)
  if (error) throw error
  return data.data
}

export async function postRespondSurvey(surveyId: number, form: SurveyViewAnswersType) {
  const { data, error }: IResponse = await axios.post(`${ENDPOINT}/${surveyId}/respond`, form)
  if (error) throw error
}

export async function getSurveyAnalytics<SurveyT, ResponsesT>(
  surveyId: number,
  surveyItemId: number
): Promise<TDataResSurvey<SurveyT, ResponsesT>> {
  const { data, error }: IResponse = await axios.get(`${ENDPOINT}/analytics`, {
    params: {
      surveyId,
      surveyItemId,
      all: 'true',
      order: 'DESC'
    }
  })
  if (error) throw error
  return data.data
}

export async function setEndSurvey(surveyId: number) {
  const { data, error }: IResponse = await axios.put(`${ENDPOINT}/${surveyId}`, { userEnded: true })
  if (error) throw error
  return
}

export async function updateSurvey(surveyId: number, form: { startDate: string; endDate: string }) {
  const { data, error }: IResponse = await axios.put(`${ENDPOINT}/${surveyId}`, {
    startDate: moment(form.startDate).tz('Asia/Seoul').startOf('day').toISOString(),
    endDate: moment(form.endDate).tz('Asia/Seoul').endOf('day').toISOString()
  })
  if (error) throw error
  return
}

export async function getSurveyExcel(surveyId: number) {
  const { data, error }: IResponse = await axios.get(`${ENDPOINT}/${surveyId}/export-excel`, {
    responseType: 'blob'
  })
  if (error) throw error
  var binaryData = []
  binaryData.push(data)
  const urlblob = URL.createObjectURL(new Blob(binaryData, { type: 'application/zip' }))
  const outputFilename = `survey_${surveyId}.xlsx`
  const link = document.createElement('a')
  link.href = urlblob
  link.setAttribute('download', outputFilename)
  document.body.appendChild(link)
  link.click()
}

export async function deleteSurvey(surveyId: number) {
  const { data, error }: IResponse = await axios.delete(`${ENDPOINT}/${surveyId}`)
  if (error) throw error
  return
}
