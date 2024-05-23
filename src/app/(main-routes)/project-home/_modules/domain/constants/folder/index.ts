import { IMoreActionItem } from '../../entities'
import { MORE_ACTIONS } from '../../enums'

export const NEW_FOLDER_NAME = 'New Folder'
export const TEXT_DELETE_FOLDER = 'project_home_text_delete_folder'
export const MAX_LEVEL_FOLDER_ALLOWED = 2

export const FOLDER_MORE_OPTIONS: IMoreActionItem[] = [MORE_ACTIONS.TITLE_CHANGE, MORE_ACTIONS.DELETE].map(
  (option) => ({
    label: option,
    value: option
  })
)
