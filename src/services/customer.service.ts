import axios from './axios'
import {
  Customer,
  LiftStyle,
  ReponseChatGPT,
  ReponseData,
  ResponseDataInfinite,
  TypeLiftStyle
} from '@/types/customer-service.type'

const ENDPOINT_PROJECT_PART = '/project-part'
const ENDPOINT = `${ENDPOINT_PROJECT_PART}/step-resources/customer-presona`

const getInformationChatGpt = async (params: Customer) => {
  const {
    data: { data }
  } = await axios.get<ReponseChatGPT>(`${ENDPOINT}/chat-gpt`, {
    params
  })
  return data
}

const getLiftStyle = async (param: TypeLiftStyle) => {
  const {
    data: { data }
  } = await axios.get<ReponseData<LiftStyle>>(`${ENDPOINT}/lift-style`, {
    params: { type: param }
  })
  return data
}

const getBrandData = async (params: any) => {
  const { data } = await axios.get<ResponseDataInfinite<LiftStyle>>(`${ENDPOINT}/brand`, {
    params
  })
  return data
}

export { getInformationChatGpt, getLiftStyle, getBrandData }
