export enum BANNER_TYPE {
  POOL = 'POOL',
  TEAM_BUILDING = 'TEAM_BUILDING',
  EVENT = 'EVENT',
  COMPANY = 'COMPANY',
  STARTUP_TALK = 'STARTUP_TALK',
  MENTORING = 'MENTORING',
  STAMP_SIGNATURE = 'STAMP_SIGNATURE',
  REFERENCE_ROOM = 'REFERENCE_ROOM',
  CERTIFICATION = 'CERTIFICATION',
  IDEA_CONTEST = 'IDEA_CONTEST',
  STRENGTH_ANALYSIS = 'STRENGTH_ANALYSIS',
  CROWDFUNDING = 'CROWDFUNDING'
}

export enum BANNER_SUBTYPE {
  POOL_TOP = 'POOL_TOP',
  TEAM_BUILDING_TOP = 'TEAM_BUILDING_TOP',
  EVENT_TOP = 'EVENT_TOP',
  SUPPORT_PROJECT_TOP = 'SUPPORT_PROJECT_TOP',
  COMPANY_TOP = 'COMPANY_TOP',
  STARTUP_TALK_TOP = 'STARTUP_TALK_TOP',
  MENTORING_TOP = 'MENTORING_TOP',
  STAMP_SIGNATURE_TOP = 'STAMP_SIGNATURE_TOP',
  REFERENCE_ROOM_TOP = 'REFERENCE_ROOM_TOP',
  CERTIFICATION_TOP = 'CERTIFICATION_TOP',
  IDEA_CONTEST_TOP = 'IDEA_CONTEST_TOP',
  IDEA_CONTEST_MIDDLE = 'IDEA_CONTEST_MIDDLE',
  STRENGTH_ANALYSIS_TOP = 'STRENGTH_ANALYSIS_TOP',
  STRENGTH_ANALYSIS_EXPLAIN = 'STRENGTH_ANALYSIS_EXPLAIN',
  STRENGTH_ANALYSIS_ADVANTAGE_TOP = 'STRENGTH_ANALYSIS_ADVANTAGE_TOP',
  STRENGTH_ANALYSIS_SITUATIONAL_TOP = 'STRENGTH_ANALYSIS_SITUATIONAL_TOP',
  STRENGTH_ANALYSIS_TRADE_TOP = 'STRENGTH_ANALYSIS_TRADE_TOP',
  CROWDFUNDING_TOP = 'CROWDFUNDING_TOP'
}

export enum targetShow {
  PC = 'PC',
  MOBILE = 'MOBILE'
}

export interface BannerType {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  status: string
  type: string
  subType: string
  name: string
  code: string
  note: string
  order: null
  isEditable: boolean
  menuUrl: string
  hasShow: boolean
  startTimeShow: string
  endTimeShow: string
  targetShow: string[]
  hasOpenUrl: boolean
  pcUrl: string
  mobileUrl: string
  pcImageId: number
  mobileImageId: number
  pcImage: Image
  mobileImage: Image
}

export interface Image {
  id: number
  uuid: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  status: string
  url: string
  baseUrl: string
  key: string
  name: string
  originalname: string
  fileType: string
  fileSize: string
}
