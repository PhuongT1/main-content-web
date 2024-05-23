export enum TIME_REMAIN_ERROR {
  EXPIRED = 'EXPIRED',
  INVALID_DATE = 'INVALID_DATE'
}

export enum PROJECT_PATHS_ENUM {
  MY_PROJECT = '/project-home',
  MY_PROJECT_FOLDER = '/project-home/folder/{id}',
  MY_PROJECT_DETAIL = '/project-home/{id}',

  PARTICIPATING_PROJECT = '/project-home/participating-project',
  PARTICIPATING_PROJECT_FOLDER = '/project-home/participating-project/folder/{id}',
  PARTICIPATING_PROJECT_DETAIL = '/project-home/participating-project/{id}',

  GROUP_PROJECT_TEMPLATE = '/project-home/group-template',
  GROUP_PROJECT_TEMPLATE_DETAIL = '/project-home/group-template/{id}',
  GROUP_PROJECT_TEMPLATE_FOLDER = '/project-home/group-template/{id}/folder/{folderId}',
  GROUP_PROJECT_DETAIL = '/project-home/group-project/{id}',

  OPEN_INNOVATION = '/project-home/open-innovation',
  OPEN_INNOVATION_DETAIL = '/project-home/open-innovation/{id}',

  STARTUP_BENCHMARKING = '/project-home/startup-benchmarking',
  STARTUP_BENCHMARKING_DETAIL = '/project-home/startup-benchmarking/{id}',

  NOTICE = '/project-home/notice',
  NOTICE_DETAIL = '/project-home/notice/{id}',

  CREATE_PROJECT = '/project-home/create-project',
  EDIT_PROJECT = '/project-home/edit/{id}',
  SHARE_PROJECT = '/project-home/share-project'
}

export enum PROJECT_TYPE_ENUM {
  INDIVIDUAL = 'INDIVIDUAL',
  GROUP = 'GROUP',
  CLONE = 'CLONE',
  STARTUP = 'STARTUP',
  OPEN_INNOVATION = 'OPEN_INNOVATION'
}

export enum TYPE_RENDER_PROJECT_DETAIL {
  SHARE = 'SHARE',
  GROUP = 'GROUP'
}

export enum PROJECT_GROUP_MEMBER_ROLE_ENUM {
  LEADER = 'LEADER',
  MEMBER = 'MEMBER'
}

export enum PROJECT_STATUS_ENUM {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export enum PROJECT_SHARING_SCOPE_ENUM {
  PRIVATE = 'PRIVATE',
  PARTIAL_PUBLIC = 'PARTIAL_PUBLIC'
}

export enum EXPLORER_ITEM_TYPE_ENUM {
  AD = 'AD',
  FOLDER = 'FOLDER',
  NOTICE = 'NOTICE',
  PROJECT = 'PROJECT',
  GROUP_PROJECT = 'GROUP_PROJECT'
}

export enum PROJECT_DECK_STATUS_ENUM {
  UNWORKING = 'UNWORKING',
  WORKING = 'WORKING',
  COMPLETED = 'COMPLETED'
}

export enum NOTICE_CATEGORY {
  GUIDE = 'GUIDE',
  ADVERTISEMENT = 'AD',
  NOTICE = 'NOTICE'
}

export enum EXPLORER_CATEGORY_ENUM {
  MY_PROJECTS = 'MY_PROJECTS',
  PARTICIPATING_PROJECTS = 'PARTICIPATING_PROJECTS',
  GROUP_PROJECTS = 'GROUP_PROJECTS',
  OPEN_INNOVATION = 'OPEN_INNOVATION',
  STARTUP = 'STARTUP',
  NOTICE = 'NOTICE'
}

export enum SORT_PROJECT_ENUM {
  CREATED_AT = 'createdAt',
  TOTAL_VIEWS = 'totalViews',
  TOTAL_FEEDBACKS = 'totalFeedbacks'
}

export enum MORE_ACTIONS {
  TITLE_CHANGE = '타이틀 변경',
  EDIT_DECK_LIST = 'Deck 리스트 편집',
  DUPLICATE_PROJECT = '프로젝트 복제',
  PUBLISH_PROJECT = '프로젝트 공개하기',
  SET_SHARING = '공유범위 설정',
  MOVE_LOCATION = '위치 이동',
  DELETE = '프로젝트 삭제'
}

export enum MORE_ACTIONS_FEEDBACK {
  REPORT = '신고하기',
  DELETE_FEEDBACK = '피드백 삭제하기'
}

export enum MORE_ACTIONS_PARTICIPATING {
  DELETE = '신고하기',
  CLONE = '피드백 삭제하기'
}

export enum DECK_TYPE_CHARGE_ENUM {
  FREE = 'FREE',
  COST = 'COST'
}

export enum DECK_CATEGORY_ENUM {
  ALL = 'ALL',
  IDEA_COMMERCIALIZATION = 'IDEA_COMMERCIALIZATION',
  STARTUP_SIMULATION = 'STARTUP_SIMULATION',
  STRENGTH_ANALYSIS = 'STRENGTH_ANALYSIS',
  OTHERS = 'OTHERS',
  FRAMEWORK = 'FRAMEWORK'
}

interface ProjectDeckItem {
  link: string
}

interface ProjectDeckEnum {
  [key: number]: ProjectDeckItem
}

export enum PROJECT_ID_DECK_ENUM {
  TeamBuilding = 1,
  Idea4 = 2,
  Naming = 3,
  TradeApply = 4,
  Slogan = 5,
  Logo = 6,
  CompetitorAnalysis = 7,
  SWOT = 8,
  CustomerPersona = 9,
  EstabilshmentOfStructure = 10,
  PRMarketing = 11,
  BusinessModel = 12,
  CardNews = 13,
  ReportDocument = 14,
  PartnershipAgreement = 15,
  ArticlesOfIncorporation = 16,
  LaborContract = 17,
  ShareholderList = 18,
  Survey = 19,
  ColtureDeck = 20,
  StrengthAnalysis = 21,
  StartupCaseStudy = 22
}

export const PROJECT_DECK_ENUM: ProjectDeckEnum = {
  [PROJECT_ID_DECK_ENUM.TeamBuilding]: {
    link: '/home/teambuilding'
  },
  [PROJECT_ID_DECK_ENUM.Idea4]: {
    link: '/home/idea'
  },
  [PROJECT_ID_DECK_ENUM.Naming]: {
    link: '/home/naming'
  },
  [PROJECT_ID_DECK_ENUM.TradeApply]: {
    link: '/home/trade'
  },
  [PROJECT_ID_DECK_ENUM.Slogan]: {
    link: '/home/slogan'
  },
  [PROJECT_ID_DECK_ENUM.Logo]: {
    link: '/home/logo'
  },
  [PROJECT_ID_DECK_ENUM.CompetitorAnalysis]: {
    link: '/home/competitor-analysis'
  },
  [PROJECT_ID_DECK_ENUM.SWOT]: {
    link: '/home/swot'
  },
  [PROJECT_ID_DECK_ENUM.CustomerPersona]: {
    link: '/home/customer-service'
  },
  [PROJECT_ID_DECK_ENUM.EstabilshmentOfStructure]: {
    link: '/home/profit-structure'
  },
  [PROJECT_ID_DECK_ENUM.PRMarketing]: {
    link: '/home/advertisement-marketing'
  },
  [PROJECT_ID_DECK_ENUM.BusinessModel]: {
    link: '/home/business-model'
  },
  [PROJECT_ID_DECK_ENUM.CardNews]: {
    link: '/home/card-news'
  },
  [PROJECT_ID_DECK_ENUM.ReportDocument]: {
    link: '/home/press-release'
  },
  [PROJECT_ID_DECK_ENUM.PartnershipAgreement]: {
    link: '/home/partnership-agreement'
  },
  [PROJECT_ID_DECK_ENUM.ArticlesOfIncorporation]: {
    link: '/home/articles-of-incorporation'
  },
  [PROJECT_ID_DECK_ENUM.LaborContract]: {
    link: '/home/employment-contract'
  },
  [PROJECT_ID_DECK_ENUM.ShareholderList]: {
    link: '/home/shareholder-list'
  },
  [PROJECT_ID_DECK_ENUM.Survey]: {
    link: '/home/survey'
  },
  [PROJECT_ID_DECK_ENUM.ColtureDeck]: {
    link: '/home/culture'
  },
  [PROJECT_ID_DECK_ENUM.StrengthAnalysis]: {
    link: '/home/strength-analysis'
  }
  // 22: {
  //   link: '/home/startupcasestudy'
  // }
}

export enum PROJECT_ERRORS_CODE {
  NOT_FOUND = '2001',
  FORBIDDEN = '2002',
  FOLDER_NOT_FOUND = '2003',
  EXPLORER_ITEM_NOT_FOUND = '2004',
  INVALID_TARGET_EXPLORER = '2005',
  EXCEED_MAX_FREE_PROJECTS = '2006',
  EXCEED_MAX_FREE_DECKS = '2007',
  NOT_FREE_DECK = '2008',
  NOT_FREE_TEMPLATE = '2009',
  PROJECT_EXISTED = '2010',
  NOT_GROUP_MEMBER = '2011'
}

export enum PROJECT_REPORT_FEEDBACK {
  COMMERCIAL_PURPOSE_PUBLICITY = 'COMMERCIAL_PURPOSE_PUBLICITY',
  PRIVACY_DISCLOSURE = 'PRIVACY_DISCLOSURE',
  ILLEGAL_INFORMATION = 'ILLEGAL_INFORMATION',
  OBSCENITY_SUGGESTIBILITY = 'OBSCENITY_SUGGESTIBILITY',
  ABUSIVE_LANGUAGE_PERSONAL_ABUSE = 'ABUSIVE_LANGUAGE_PERSONAL_ABUSE',
  ID_DB_TRANSACTION = 'ID_DB_TRANSACTION',
  REPEAT_SAME_CONTENT = 'REPEAT_SAME_CONTENT',
  OTHER = 'OTHER'
}

export enum NOTICE_ADD_REACT_ENUM {
  MARK_DELETE = 'MARK_DELETE'
}

export enum TYPE_MODAL_CONFIRM {
  SUCCESS = 'SUCCESS',
  CAN_NOT_ACTION = 'CAN_NOT_ACTION',
  DELETE = 'DELETE',
  ERROR = 'ERROR'
}

export enum IMAGE_TYPE_ENUM {
  THUMBNAIL = '썸네일',
  LOGO = '로고'
}
