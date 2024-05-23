// 'use server'
import {
  DeckProject,
  ResponseAllActivities,
  ResponseProject,
  ResponseStepList,
  StepActivity,
  StepProject
} from '@/types/deck.type'
import axios from './axios'

const ENDPOINT_PROJECT_PART = '/project-part'
// const ENDPOINT = `${ENDPOINT_PROJECT_PART}/step-resources/naming-data`

const getProject = async (id: number) => {
  const {
    data: { data }
  } = await axios.get(`${ENDPOINT_PROJECT_PART}/decks/project/${id}`)
  return data
}

const getSteps = async (params: DeckProject) => {
  const {
    data: { data }
  } = await axios.get<ResponseStepList>(`${ENDPOINT_PROJECT_PART}/steps`, { params })
  return data
}

const getActiveStep = async <T>(params: StepProject) => {
  const {
    data: { data }
  } = await axios.get<ResponseProject<T>>(`${ENDPOINT_PROJECT_PART}/steps/activities`, { params })
  console.log(data, params)
  return data
}

const postSteps = async <T>(dataPost: StepActivity<T>) => {
  const {
    data: { data }
  } = await axios.post<ResponseProject<T>>(`${ENDPOINT_PROJECT_PART}/steps`, dataPost)
  return data
}

const getAllActiveStep = async <T extends unknown>(params: StepProject) => {
  const {
    data: { data }
  } = await axios.get<ResponseAllActivities<T>>(`${ENDPOINT_PROJECT_PART}/steps/activities/all`, { params })
  return data
}

export { postSteps, getSteps, getProject, getActiveStep, getAllActiveStep }
