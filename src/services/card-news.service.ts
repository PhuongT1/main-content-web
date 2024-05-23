import { ICardNewsResponeData } from '@/types/cardnews/index.type'
import axios from './axios'

const CARD_NEWS_CHAT_GPT_URL = '/project-part/step-resources/card-new/chat-gpt'
export async function createCardNews(formData: object): Promise<{ data: ICardNewsResponeData[] }> {
  const data = await axios.post(CARD_NEWS_CHAT_GPT_URL, formData)
  return data.data
}
