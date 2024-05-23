import { DECK_CATEGORY_ENUM, DECK_TYPE_CHARGE_ENUM, PROJECT_DECK_STATUS_ENUM, PROJECT_TYPE_ENUM } from '..'

export interface IDecksCreateProjectTab {
  label: string
  value: DECK_CATEGORY_ENUM
  count?: number
}

export interface ProjectDeckItem {
  id: number
  deckCode?: string
  name: string
  description?: string
  numberOfStep?: number
  workingTime?: number
  type?: DECK_TYPE_CHARGE_ENUM
  totalUsages?: number
  category?: DECK_CATEGORY_ENUM
  isDisabled?: boolean
  no?: number
  allowDownloadIRDecks?: boolean
  allowDownloadPracticeResults?: boolean
  lastWorkingDate?: Date | string
  hasIRDeck?: boolean
  status?: PROJECT_DECK_STATUS_ENUM
  stepProgress?: string
}

export interface IDeckSelected extends ProjectDeckItem {
  templateId?: number
}

export interface IProjectTemplate {
  id: number
  type: PROJECT_TYPE_ENUM
  name: string
  description: string
  groupName: string
  imageUrls?: string[]
  numberOfDeck: number
  isDisabled?: boolean
  decks: ProjectDeckItem[]
  isMember?: boolean
  allowOtherCreate?: boolean
  no?: number
}
