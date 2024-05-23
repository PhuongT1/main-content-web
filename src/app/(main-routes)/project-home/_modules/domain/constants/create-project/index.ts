import { IDecksCreateProjectTab } from '../../entities'
import { DECK_CATEGORY_ENUM } from '../../enums'

export const DECKS_TYPE_TAB_DATA: IDecksCreateProjectTab[] = [
  {
    label: '전체',
    value: DECK_CATEGORY_ENUM.ALL
  },
  {
    label: '아이디어 사업화',
    value: DECK_CATEGORY_ENUM.IDEA_COMMERCIALIZATION
  },
  {
    label: '창업 시뮬레이션',
    value: DECK_CATEGORY_ENUM.STARTUP_SIMULATION
  },
  {
    label: '기타',
    value: DECK_CATEGORY_ENUM.OTHERS
  }
]
