import { CARD_NEWS_TYPES } from '@/constants/cardnews.constant'
import { ICardData, ICardNewsAllData } from '@/types/cardnews/index.type'
import { StepList } from '@/types/deck.type'
import { atom } from 'recoil'

const cardNews = atom<{
  type: CARD_NEWS_TYPES
  id: string
  data: ICardData[]
}>({
  key: 'cardNews',
  default: undefined
})

const editCardNews = atom<boolean>({
  key: 'editCardNews',
  default: false
})

const allCardData = atom<ICardNewsAllData[]>({
  key: 'allCardData',
  default: []
})

const dataDeckActive = atom<
  | {
      deckId: number
      stepId: number
    }
  | {}
>({
  key: 'dataCardNewsActive',
  default: {}
})

export { cardNews as cardNewsData, editCardNews, allCardData, dataDeckActive }
