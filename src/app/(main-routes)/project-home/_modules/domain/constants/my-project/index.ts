import { IMoreActionItem } from '../../entities'
import {
  MORE_ACTIONS,
  PROJECT_PATHS_ENUM,
  PROJECT_SHARING_SCOPE_ENUM,
  PROJECT_TYPE_ENUM,
  SORT_PROJECT_ENUM
} from '../../enums'

export const MAX_SHOW_AVATAR = 3
export const PROJECT_REPLICATION_PERMISSIONS = [
  {
    lable: '허용',
    value: true
  },
  {
    lable: '차단',
    value: false
  }
]
export const PROJECT_ADMIN_REPLICATION_PERMISSIONS = [
  {
    lable: '노출',
    value: PROJECT_SHARING_SCOPE_ENUM.PARTIAL_PUBLIC
  },
  {
    lable: '숨김',
    value: PROJECT_SHARING_SCOPE_ENUM.PRIVATE
  }
]
export const PROJECT_MORE_OPTIONS: IMoreActionItem[] = [
  {
    label: MORE_ACTIONS.TITLE_CHANGE,
    value: MORE_ACTIONS.TITLE_CHANGE
  },
  {
    label: MORE_ACTIONS.EDIT_DECK_LIST,
    value: MORE_ACTIONS.EDIT_DECK_LIST
  },
  {
    label: MORE_ACTIONS.DUPLICATE_PROJECT,
    value: MORE_ACTIONS.DUPLICATE_PROJECT
  },
  {
    label: MORE_ACTIONS.PUBLISH_PROJECT,
    value: MORE_ACTIONS.PUBLISH_PROJECT
  },
  {
    label: MORE_ACTIONS.SET_SHARING,
    value: MORE_ACTIONS.SET_SHARING
  },
  {
    label: MORE_ACTIONS.MOVE_LOCATION,
    value: MORE_ACTIONS.MOVE_LOCATION
  },
  {
    label: MORE_ACTIONS.DELETE,
    value: MORE_ACTIONS.DELETE
  }
]

export const OPEN_INNOVATION_MORE_OPTIONS = (disabled: boolean): IMoreActionItem[] => [
  {
    value: MORE_ACTIONS.DUPLICATE_PROJECT,
    label: '내 프로젝트로 복제',
    disabled
  }
]

export const OPEN_INNOVATION_MORE_OPTIONS_ADMIN: IMoreActionItem[] = [
  {
    value: MORE_ACTIONS.TITLE_CHANGE,
    label: '타이틀 변경'
  },
  {
    value: MORE_ACTIONS.EDIT_DECK_LIST,
    label: 'Deck 리스트 편집'
  },
  {
    value: MORE_ACTIONS.DELETE,
    label: '프로젝트 삭제'
  }
]

export const STARTUP_BENCHMARKING_MORE_OPTIONS_ADMIN: IMoreActionItem[] = [
  {
    value: MORE_ACTIONS.TITLE_CHANGE,
    label: '타이틀 변경'
  },
  {
    value: MORE_ACTIONS.DELETE,
    label: '프로젝트 삭제'
  }
]

export const SORT_PROJECT_OPTIONS = [
  {
    value: SORT_PROJECT_ENUM.CREATED_AT,
    label: '최신순'
  },
  {
    value: SORT_PROJECT_ENUM.TOTAL_VIEWS,
    label: '조회순'
  },
  {
    value: SORT_PROJECT_ENUM.TOTAL_FEEDBACKS,
    label: '댓글순'
  }
]

export const IS_MYPROJECT = [PROJECT_TYPE_ENUM.CLONE, PROJECT_TYPE_ENUM.GROUP, PROJECT_TYPE_ENUM.INDIVIDUAL]
export const IS_HAVE_FEEDBACK = [PROJECT_TYPE_ENUM.STARTUP, PROJECT_TYPE_ENUM.OPEN_INNOVATION]

export const GROUP_PROJECT_PATHS = [
  PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE,
  PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE_DETAIL,
  PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE_FOLDER,
  PROJECT_PATHS_ENUM.GROUP_PROJECT_DETAIL
]

export const ADMIN_PROJECT_PATHS = [
  PROJECT_PATHS_ENUM.OPEN_INNOVATION,
  PROJECT_PATHS_ENUM.OPEN_INNOVATION_DETAIL,
  PROJECT_PATHS_ENUM.STARTUP_BENCHMARKING,
  PROJECT_PATHS_ENUM.STARTUP_BENCHMARKING_DETAIL,
  PROJECT_PATHS_ENUM.CREATE_PROJECT
]
