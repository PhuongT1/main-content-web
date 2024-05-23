import { EnumLayoutIR } from '@/types/deck.type'
import { BorderStyles } from '@/types/types.type'

export const termList = [
  { id: 1, title: '서비스 이용 동의', required: true },
  { id: 2, title: '개인정보 수집 동의', required: true },
  { id: 3, title: '이벤트 / 정보 알림 수신 동의', required: false }
]

export enum LANG {
  KR = 'kr',
  EN = 'en'
}

export enum COOKIES_KEY {
  LANG = 'lang',
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
  THEME_MODE = 'themeMode'
}

export enum LS_KEY {
  LANG = 'lang',
  USER = 'user'
}

export enum THEME_MODE {
  DARK = 'dark',
  LIGHT = 'light'
}

export enum FORM_DATA_KEY {
  FILE_UPLOAD = 'fileUpload',
  FILE_UPLOADS = 'fileUploads',
  FOLDER_NAME = 'folderName'
}

export enum RES_MESSAGE {
  SUCCESS = 'success'
}

export enum IMAGE_FOLDER {
  COMMON = 'common',
  CONTENT_BLOG = 'content-blog',
  EVENT = 'event',
  POOL = 'pool',
  COMMENT = 'comment',
  SIGNATURE_STAMPS = 'signature-stamp',
  DATA_ROOM = 'data-room',
  OUTSOURCING_COMPANY = 'outsourcing-company',
  TEAM_BUILDING = 'team-building',
  MENTORING = 'mentoring',
  BANNER = 'banner',
  CERTIFICATION = 'certification',
  CROWDFUNDING = 'crowdfunding',
  IDEA_CONTEST = 'idea-contest',
  GALLERY = 'gallery',
  SURVEY = 'survey',
  IDEA = 'idea',
  LOGO = 'logo',
  CARD_NEWS = 'card-news',
  CULTURE = 'culture',
  HUMAN = 'human',
  INDUSTRIAL = 'industrial',
  CHARACTER = 'character',
  ETC = 'etc',
  MY_IMAGE = 'my-image',
  PROJECT_HOME = 'project-home'
}

export const AUTH_PATH = [
  '/sign-up',
  '/sign-in',
  '/forgot-password',
  '/reset-password',
  '/verify-signup',
  '/find-password'
]

export const PUBLIC_PATHS = ['/startup/referent-room', '/share/survey']

export enum CATEGORY {
  NORMAL = 'NORMAL',
  CONTENT = 'CONTENT',
  EVENT = 'EVENT',
  POOL = 'POOL',
  COMPANY = 'COMPANY',
  TEAM_BUILDING = 'TEAM_BUILDING',
  STARTUP_TALK = 'STARTUP_TALK',
  REFERENCE_ROOM = 'REFERENCE_ROOM',
  MENTORING = 'MENTORING'
}

export enum SUB_CATEGORY {
  NORMAL = 'NORMAL',
  CONTENT = 'CONTENT',
  EVENT = 'EVENT',
  POOL = 'POOL',
  OCCUPATION = 'OCCUPATION',
  DEGREE = 'DEGREE',
  INDUSTRY = 'INDUSTRY',
  TEAM_BUILDING = 'TEAM_BUILDING',
  STARTUP_TALK = 'STARTUP_TALK',
  REFERENCE_ROOM = 'REFERENCE_ROOM',
  OUTSOURCING = 'OUTSOURCING',
  PRODUCT = 'PRODUCT',
  GAME = 'GAME',
  BLOCKCHAIN = 'BLOCKCHAIN',
  TB_RECRUIT = 'TB_RECRUIT',
  TB_MEMBER = 'TB_MEMBER'
}
export const ONE_BYTE = 1024

export const IMAGE_TYPES = '.jpg,.png,.pdf,.jpeg,.JPG,.JPEG,.PNG,.PDF'

export enum DATE_FORMAT {
  EMPTY_REV = 'YYYYMMDD',
  EMPTY = 'DDMMYYYY',
  SLASH = 'DD/MM/YYYY',
  DASH = 'DD-MM-YYYY',
  DASH_REV = 'YYYY-MM-DD',
  DOT_REV = 'YYYY.MM.DD',
  SPACE_WITH_TEXT = 'YYYY년 MM월 DD일'
}

export const BORDER_VALUE = new Map<BorderStyles, number | string>([
  ['pill', 99],
  ['rounded-4', '4px'],
  ['rounded-6', '6px'],
  ['rounded-8', '8px'],
  ['rounded-10', '10px']
])

export enum STEP {
  STEP_ONE = 0,
  STEP_TWO = 1,
  STEP_THREE = 2,
  STEP_FOUR = 3,
  STEP_FIVE = 4
}

export enum ERROR_CODES {
  HAVENT_REGISTRATION = '2306'
}

export enum ENUM_LAYOUT {
  ONE = 1,
  TWO = 2,
  THREE = 3
}

export interface IItemLayout {
  value: string
}

export interface layoutData {
  value: EnumLayoutIR
  name: string
}

export const ENUM_LAYOUT_DATA: layoutData[] = [
  {
    value: 'ONE',
    name: '기본 레이아웃' // Default layout.
  },
  {
    value: 'TWO',
    name: '심플 레이아웃' // Simple Layout.
  },
  {
    value: 'THREE',
    name: '강조 레이아웃' // Emphasis Layout.
  }
]

export const DELETE_ON_DOWNLOAD_PDF = 'deleteOnDownloadPdf'

export const BREAKPOINTS_MODAL_IR = 1400

export const BANKS = [
  {
    bankName: '경남은행',
    KFTCCode: '039',
    code: '39',
    hangulCode: '경남',
    englishCode: 'KYONGNAMBANK'
  },
  {
    bankName: '광주은행',
    KFTCCode: '034',
    code: '34',
    hangulCode: '광주',
    englishCode: 'GWANGJUBANK'
  },
  {
    bankName: '단위농협(지역농축협)',
    KFTCCode: '012',
    code: '12',
    hangulCode: '단위농협',
    englishCode: 'LOCALNONGHYEOP'
  },
  {
    bankName: '부산은행',
    KFTCCode: '032',
    code: '32',
    hangulCode: '부산',
    englishCode: 'BUSANBANK'
  },
  {
    bankName: '새마을금고',
    KFTCCode: '045',
    code: '45',
    hangulCode: '새마을',
    englishCode: 'SAEMAUL'
  },
  {
    bankName: '산림조합',
    KFTCCode: '064',
    code: '64',
    hangulCode: '산림',
    englishCode: 'SANLIM'
  },
  {
    bankName: '신한은행',
    KFTCCode: '088',
    code: '88',
    hangulCode: '신한',
    englishCode: 'SHINHAN'
  },
  {
    bankName: '신협',
    KFTCCode: '048',
    code: '48',
    hangulCode: '신협',
    englishCode: 'SHINHYEOP'
  },
  {
    bankName: '씨티은행',
    KFTCCode: '027',
    code: '27',
    hangulCode: '씨티',
    englishCode: 'CITI'
  },
  {
    bankName: '우리은행',
    KFTCCode: '020',
    code: '20',
    hangulCode: '우리',
    englishCode: 'WOORI'
  },
  {
    bankName: '우체국예금보험',
    KFTCCode: '071',
    code: '71',
    hangulCode: '우체국',
    englishCode: 'POST'
  },
  {
    bankName: '저축은행중앙회',
    KFTCCode: '050',
    code: '50',
    hangulCode: '저축',
    englishCode: 'SAVINGBANK'
  },
  {
    bankName: '전북은행',
    KFTCCode: '037',
    code: '37',
    hangulCode: '전북',
    englishCode: 'JEONBUKBANK'
  },
  {
    bankName: '제주은행',
    KFTCCode: '035',
    code: '35',
    hangulCode: '제주',
    englishCode: 'JEJUBANK'
  },
  {
    bankName: '카카오뱅크',
    KFTCCode: '090',
    code: '90',
    hangulCode: '카카오',
    englishCode: 'KAKAOBANK'
  },
  {
    bankName: '케이뱅크',
    KFTCCode: '089',
    code: '89',
    hangulCode: '케이',
    englishCode: 'KBANK'
  },
  {
    bankName: '토스뱅크',
    KFTCCode: '092',
    code: '92',
    hangulCode: '토스',
    englishCode: 'TOSSBANK'
  },
  {
    bankName: '하나은행',
    KFTCCode: '081',
    code: '81',
    hangulCode: '하나',
    englishCode: 'HANA'
  },
  {
    bankName: '홍콩상하이은행',
    KFTCCode: '054',
    code: '54',
    hangulCode: '-',
    englishCode: 'HSBC'
  },
  {
    bankName: 'IBK기업은행',
    KFTCCode: '003',
    code: '03',
    hangulCode: '기업',
    englishCode: 'IBK'
  },
  {
    bankName: 'KB국민은행',
    KFTCCode: '004',
    code: '06',
    hangulCode: '국민',
    englishCode: 'KOOKMIN'
  },
  {
    bankName: 'DGB대구은행',
    KFTCCode: '031',
    code: '31',
    hangulCode: '대구',
    englishCode: 'DAEGUBANK'
  },
  {
    bankName: 'KDB산업은행',
    KFTCCode: '002',
    code: '02',
    hangulCode: '산업',
    englishCode: 'KDBBANK'
  },
  {
    bankName: 'NH농협은행',
    KFTCCode: '011',
    code: '11',
    hangulCode: '농협',
    englishCode: 'NONGHYEOP'
  },
  {
    bankName: 'SC제일은행',
    KFTCCode: '023',
    code: '23',
    hangulCode: 'SC제일',
    englishCode: 'SC'
  },
  {
    bankName: 'Sh수협은행',
    KFTCCode: '007',
    code: '07',
    hangulCode: '수협',
    englishCode: 'SUHYEOP'
  }
]
