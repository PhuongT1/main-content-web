import axios from './axios'
import { PARENT_CATEGORY } from '@/constants/naming.constant'
import {
  ChatGPT,
  ChildCategory,
  DataChatGPT,
  NamingLocation,
  NamingTab,
  OpenAISearch,
  ResponseDataNaming,
  SearchTab,
  TranslatePapago,
  TranslateResult
} from '@/types/naming.type'

const ENDPOINT_PROJECT_PART = '/project-part'
const ENDPOINT = `${ENDPOINT_PROJECT_PART}/step-resources/naming-data`

const getParentCategory = async (category: keyof typeof PARENT_CATEGORY) => {
  const { data } = await axios.get<NamingLocation[]>(`${ENDPOINT}/parent-category`, {
    params: { type: PARENT_CATEGORY[category] }
  })
  return data
}

const getChildCategory = async (params: ChildCategory) => {
  const { data } = await axios.get<NamingLocation[]>(`${ENDPOINT}/child-category`, {
    params: { ...params, type: PARENT_CATEGORY[params.type] }
  })
  return data
}

const getNamingData = async (params: SearchTab) => {
  const { data } = await axios.get<ResponseDataNaming<NamingTab>>(ENDPOINT, {
    params
  })
  return data
}

const translatePapago = async (params: TranslatePapago) => {
  const { data } = await axios.post<TranslateResult>(`${ENDPOINT_PROJECT_PART}/papago`, params)
  return data?.data as TranslateResult
}

const getOpenAI = async (params: OpenAISearch) => {
  const { concept } = params

  const {
    data: { data }
  } = await axios.get<DataChatGPT>(`${ENDPOINT}/openai/keyword`, {
    params: { ...params, concept }
  })

  return data
}

const getOpenaiKeyword = async (dataPost: string[]) => {
  const {
    data: { data }
  } = await axios.post<DataChatGPT>(`${ENDPOINT}/openai/candidates`, { keywords: dataPost })
  return data
}

const getIndustry = async () => {
  const {
    data: { data }
  } = await axios.get<DataChatGPT>(`${ENDPOINT}/industry`)
  return data
}

const getProject = async (id: number) => {
  const {
    data: { data }
  } = await axios.get(`${ENDPOINT_PROJECT_PART}/decks/project/${id}`)
  return data
}

export {
  getParentCategory,
  getChildCategory,
  translatePapago,
  getNamingData,
  getOpenAI,
  getOpenaiKeyword,
  getProject,
  getIndustry
}
