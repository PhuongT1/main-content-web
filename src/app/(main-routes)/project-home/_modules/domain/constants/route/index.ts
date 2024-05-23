import { IProjectHomeTab } from '../../entities'
import { EXPLORER_CATEGORY_ENUM, PROJECT_PATHS_ENUM } from '../../enums'

export const PROJECT_HOME_TAB_DATA: IProjectHomeTab[] = [
  {
    label: 'project_home_title_my_project',
    value: PROJECT_PATHS_ENUM.MY_PROJECT,
    url: PROJECT_PATHS_ENUM.MY_PROJECT,
    category: EXPLORER_CATEGORY_ENUM.MY_PROJECTS,
    count: undefined,
    isTab: true,
    pathChilds: [
      PROJECT_PATHS_ENUM.MY_PROJECT,
      PROJECT_PATHS_ENUM.MY_PROJECT_DETAIL,
      PROJECT_PATHS_ENUM.MY_PROJECT_FOLDER
    ]
  },
  {
    label: 'project_home_title_participatory_project',
    value: PROJECT_PATHS_ENUM.PARTICIPATING_PROJECT,
    url: PROJECT_PATHS_ENUM.PARTICIPATING_PROJECT,
    category: EXPLORER_CATEGORY_ENUM.PARTICIPATING_PROJECTS,
    count: undefined,
    isTab: true,
    pathChilds: [
      PROJECT_PATHS_ENUM.PARTICIPATING_PROJECT,
      PROJECT_PATHS_ENUM.PARTICIPATING_PROJECT_FOLDER,
      PROJECT_PATHS_ENUM.PARTICIPATING_PROJECT_DETAIL
    ]
  },
  {
    label: 'project_home_title_open_innovation',
    value: PROJECT_PATHS_ENUM.OPEN_INNOVATION,
    url: PROJECT_PATHS_ENUM.OPEN_INNOVATION,
    category: EXPLORER_CATEGORY_ENUM.OPEN_INNOVATION,
    count: undefined,
    isTab: true,
    pathChilds: [PROJECT_PATHS_ENUM.OPEN_INNOVATION, PROJECT_PATHS_ENUM.OPEN_INNOVATION_DETAIL]
  },
  {
    label: 'project_home_title_startup_benchmarking',
    value: PROJECT_PATHS_ENUM.STARTUP_BENCHMARKING,
    url: PROJECT_PATHS_ENUM.STARTUP_BENCHMARKING,
    category: EXPLORER_CATEGORY_ENUM.STARTUP,
    count: undefined,
    isTab: true,
    pathChilds: [PROJECT_PATHS_ENUM.STARTUP_BENCHMARKING, PROJECT_PATHS_ENUM.STARTUP_BENCHMARKING_DETAIL]
  },
  {
    label: 'project_home_title_announcement',
    value: PROJECT_PATHS_ENUM.NOTICE,
    url: PROJECT_PATHS_ENUM.NOTICE,
    category: EXPLORER_CATEGORY_ENUM.NOTICE,
    count: undefined,
    isTab: true,
    pathChilds: [PROJECT_PATHS_ENUM.NOTICE, PROJECT_PATHS_ENUM.NOTICE_DETAIL]
  },
  {
    label: 'project_home_title_group_project',
    value: PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE,
    url: PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE,
    category: EXPLORER_CATEGORY_ENUM.GROUP_PROJECTS,
    count: undefined,
    isTab: true,
    pathChilds: [
      PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE,
      PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE_DETAIL,
      PROJECT_PATHS_ENUM.GROUP_PROJECT_TEMPLATE_FOLDER,
      PROJECT_PATHS_ENUM.GROUP_PROJECT_DETAIL
    ]
  },
  {
    label: null,
    value: PROJECT_PATHS_ENUM.CREATE_PROJECT,
    url: PROJECT_PATHS_ENUM.CREATE_PROJECT,
    category: undefined,
    count: undefined,
    isTab: false,
    pathChilds: [PROJECT_PATHS_ENUM.CREATE_PROJECT]
  },
  {
    label: null,
    value: PROJECT_PATHS_ENUM.SHARE_PROJECT,
    url: PROJECT_PATHS_ENUM.SHARE_PROJECT,
    category: undefined,
    count: undefined,
    isTab: false,
    pathChilds: [PROJECT_PATHS_ENUM.SHARE_PROJECT]
  },
  {
    label: null,
    value: PROJECT_PATHS_ENUM.EDIT_PROJECT,
    url: PROJECT_PATHS_ENUM.EDIT_PROJECT,
    category: undefined,
    count: undefined,
    isTab: false,
    pathChilds: [PROJECT_PATHS_ENUM.EDIT_PROJECT]
  }
]

export const MAP_URL_CLASS = {
  [PROJECT_PATHS_ENUM.CREATE_PROJECT]: 'create_project_page'
} as Record<PROJECT_PATHS_ENUM, string>
