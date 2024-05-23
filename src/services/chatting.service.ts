import { AuthResponse } from '@/types/chat.type'
import { TResponseData } from '@/types/types.type'
import axios from './axios'

const ENDPOINT = '/chatting'

export const getChatAuthToken = async () => {
  const { data: { data } = {} } = await axios.get<TResponseData<AuthResponse>>(`${ENDPOINT}/auth-token`)
  return data
}
