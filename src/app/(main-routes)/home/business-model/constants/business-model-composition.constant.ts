import { generateObjectFromN } from '@/utils/object'

export const RESET_DATA = {
  iconId: 7,
  name: '',
  added: false
}

export const RELATION_RESET_DATA = {
  added: false,
  forward: {
    iconId: 0,
    description: '',
    added: true
  },
  reverse: {
    iconId: 0,
    description: '',
    added: true
  }
}

export const COMPOSITION_FORM_DEFAULT_VALUES = {
  diagramDatas: generateObjectFromN(9, RESET_DATA),
  diagramRelationshipDatas: generateObjectFromN(12, RELATION_RESET_DATA)
}
