export const drawerWidth = 240
export const drawerWidthClosed = 96
export const appbarHeight = 104
export const appbarHeightSm = 64

export const DEFAULT_LANGUAGE = 'kr'

export const BLOG_LIST_TYPE = [
  { title: '인기순', value: 'POPULARY' },
  { title: '최신순', value: 'NEWEST' }
]

export const STARTUP_TALK_LIST_TYPE = [
  { title: '인기순', value: 'POPULARY' },
  { title: '최신순', value: 'NEWEST' },
  { title: '오래된순', value: 'OLDEST' }
]

export enum BLOG_TYPE {
  VIDEO = 'VIDEO',
  CARD_NEWS = 'CARD_NEWS'
}

export const HORIZONTAL_THRESHOLD = 80

export enum USER_JOB_TITLE_KR {
  DEVELOPMENT = '개발',
  DESIGN = '디자인',
  SALES = '영업',
  OPERATION_MANAGEMENT = '운영관리',
  MARKETING = '마케팅',
  PLANNING = '기획',
  GREETING = '인사',
  SERVER = '서버',
  PLANNING_PM = '기획PM',
  DEVELOPMENT_PM = '개발PM'
}

export const ADDRESS_LIST = {
  서울특별시: [
    '종로구',
    '중구',
    '용산구',
    '성동구',
    '광진구',
    '동대문구',
    '중랑구',
    '성북구',
    '강북구',
    '도봉구',
    '노원구',
    '은평구',
    '서대문구',
    '마포구',
    '양천구',
    '강서구',
    '구로구',
    '금천구',
    '영등포구',
    '동작구',
    '관악구',
    '서초구',
    '강남구',
    '송파구',
    '강동구'
  ],
  부산광역시: [
    '중구',
    '서구',
    '동구',
    '영도구',
    '부산진구',
    '동래구',
    '남구',
    '북구',
    '강서구',
    '해운대구',
    '사하구',
    '금정구',
    '연제구',
    '수영구',
    '사상구',
    '기장군'
  ],
  인천광역시: ['중구', '동구', '남구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군'],
  대구광역시: ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
  광주광역시: ['동구', '서구', '남구', '북구', '광산구'],
  대전광역시: ['동구', '중구', '서구', '유성구', '대덕구'],
  울산광역시: ['중구', '남구', '동구', '북구', '울주군'],
  세종특별자치시: [],
  경기도: [
    '가평군',
    '고양시',
    '과천시',
    '광명시',
    '광주시',
    '구리시',
    '군포시',
    '김포시',
    '남양주시',
    '동두천시',
    '부천시',
    '성남시',
    '수원시',
    '시흥시',
    '안산시',
    '안성시',
    '안양시',
    '양주시',
    '양평군',
    '여주시',
    '연천군',
    '오산시',
    '용인시',
    '의왕시',
    '의정부시',
    '이천시',
    '파주시',
    '평택시',
    '포천시',
    '하남시',
    '화성시'
  ],
  강원도: [
    '원주시',
    '춘천시',
    '강릉시',
    '동해시',
    '속초시',
    '삼척시',
    '홍천군',
    '태백시',
    '철원군',
    '횡성군',
    '평창군',
    '영월군',
    '정선군',
    '인제군',
    '고성군',
    '양양군',
    '화천군',
    '양구군'
  ],
  충청북도: [
    '청주시',
    '충주시',
    '제천시',
    '보은군',
    '옥천군',
    '영동군',
    '증평군',
    '진천군',
    '괴산군',
    '음성군',
    '단양군'
  ],
  충청남도: [
    '천안시',
    '공주시',
    '보령시',
    '아산시',
    '서산시',
    '논산시',
    '계룡시',
    '당진시',
    '금산군',
    '부여군',
    '서천군',
    '청양군',
    '홍성군',
    '예산군',
    '태안군'
  ],
  경상북도: [
    '포항시',
    '경주시',
    '김천시',
    '안동시',
    '구미시',
    '영주시',
    '영천시',
    '상주시',
    '문경시',
    '경산시',
    '군위군',
    '의성군',
    '청송군',
    '영양군',
    '영덕군',
    '청도군',
    '고령군',
    '성주군',
    '칠곡군',
    '예천군',
    '봉화군',
    '울진군',
    '울릉군'
  ],
  경상남도: [
    '창원시',
    '김해시',
    '진주시',
    '양산시',
    '거제시',
    '통영시',
    '사천시',
    '밀양시',
    '함안군',
    '거창군',
    '창녕군',
    '고성군',
    '하동군',
    '합천군',
    '남해군',
    '함양군',
    '산청군',
    '의령군'
  ],
  전라북도: [
    '전주시',
    '익산시',
    '군산시',
    '정읍시',
    '완주군',
    '김제시',
    '남원시',
    '고창군',
    '부안군',
    '임실군',
    '순창군',
    '진안군',
    '장수군',
    '무주군'
  ],
  전라남도: [
    '여수시',
    '순천시',
    '목포시',
    '광양시',
    '나주시',
    '무안군',
    '해남군',
    '고흥군',
    '화순군',
    '영암군',
    '영광군',
    '완도군',
    '담양군',
    '장성군',
    '보성군',
    '신안군',
    '장흥군',
    '강진군',
    '함평군',
    '진도군',
    '곡성군',
    '구례군'
  ],
  제주특별자치도: ['제주시', '서귀포시']
}

export const SCHOOL_TYPE = ['고등학교', '대학교(2,3년)', '대학교(4년)', '대학원(석사)', '대학원(박사)']
export const GRADUATE_TYPE = ['졸업', '재학중', '휴학중', '졸업예정']

export enum INVENTORY_TAB {
  PERSON = 'PERSON',
  INDUSTRY = 'INDUSTRY',
  CHARACTER = 'CHARACTER',
  LOGO = 'LOGO',
  OTHER = 'OTHER',
  MY_CATEGORY = 'MY_CATEGORY'
}

export const CATEGORY_PERSON = [
  {
    title: '전체',
    value: ''
  },
  {
    title: '유아, 아동',
    value: 'BABY'
  },
  {
    title: '청소년',
    value: 'CHILD'
  },
  {
    title: '청년',
    value: 'TEENAGER'
  },
  {
    title: '중장년',
    value: 'YOUTH'
  },
  {
    title: '노인',
    value: 'MIDDLE_AGE'
  }
]
export const CATEGORY_INDUSTRY = [
  {
    title: '전체',
    value: ''
  },
  {
    title: '광고/마케팅',
    value: 'ADVERTISING_MARKETING'
  },
  {
    title: '교육/에듀테크',
    value: 'EDUCATION_EDUTECH'
  },
  {
    title: '금융/보험/핀테크',
    value: 'FINANCE_INSURANCE_FINTECH'
  },
  {
    title: '게임',
    value: 'GAME'
  },
  {
    title: '모빌리티/교통/자율주행',
    value: 'MOBILITY_TRANSPORT_AUTONOMOUS_DRIVING'
  },
  {
    title: '물류/유통',
    value: 'LOGISTICS_DISTRIBUTION'
  },
  {
    title: '뷰티/화장품',
    value: 'BEAUTY_COSMETICS'
  },
  {
    title: '패션/디자인',
    value: 'FASHION_DESIGN'
  },
  {
    title: '소셜/커뮤니티',
    value: 'SOCIAL_COMMUNITY'
  },
  {
    title: '여행/레저/관광',
    value: 'TRAVEL_LEISURE_TOURISM'
  },
  {
    title: '출산/유아/아동',
    value: 'BIRTH_BABY_CHILD'
  },
  {
    title: '행정/법률/리컬테크',
    value: 'ADMINISTRATION_LAW_LEGALTECH'
  },
  {
    title: '제조/하드웨어',
    value: 'MANUFACTURING_HARDWARE'
  },
  {
    title: '무역/e커머스',
    value: 'TRADE_ECOMMERCE'
  },
  {
    title: '콘텐츠/미디어 예술',
    value: 'CONTENTS_MEDIA_ART'
  },
  {
    title: '부동산/건설/프롭테크',
    value: 'REAL_ESTATE_CONSTRUCTION_PROPTECH'
  },
  {
    title: '음식/식품/푸드테크',
    value: 'FOOD_FOODTECH'
  },
  {
    title: '환경/에너지',
    value: 'ENVIRONMENT_ENERGY'
  },
  {
    title: '홈리빙/반려동물',
    value: 'HOME_LIVING_PETS'
  },
  {
    title: '헬스케어/바이오',
    value: 'HEALTHCARE_BIOTECH'
  },
  {
    title: '대행/배달',
    value: 'AGENCY_DELIVERY'
  },
  {
    title: '농축산/수산',
    value: 'AGRICULTURE_FISHERY'
  },
  {
    title: '스포츠/운동',
    value: 'SPORTS_EXERCISE'
  },
  {
    title: '인공지능/로봇',
    value: 'ARTIFICIAL_INTELLIGENCE_ROBOTICS'
  }
]
export const CATEGORY_CHARACTER = [
  {
    title: '전체',
    value: ''
  },
  {
    title: '사람',
    value: 'HUMAN'
  },
  {
    title: '로봇',
    value: 'ANIMAL '
  },
  {
    title: '사물',
    value: 'ROBOT'
  },
  {
    title: '사물',
    value: 'OBJECT'
  },
  {
    title: '기타',
    value: 'OTHER'
  }
]

export const CATEGORY_LOGO = [
  // {
  //   title: '전체',
  //   value: ''
  // },
  {
    title: '빨강',
    value: 'RED',
    color: '#FF0202'
  },
  {
    title: '주황',
    value: 'ORANGE',
    color: '#FF820E'
  },
  {
    title: '노랑',
    value: 'YELLOW',
    color: '#FFD12F'
  },
  {
    title: '녹색',
    value: 'GREEN',
    color: '#0CBE93'
  },
  {
    title: '파랑',
    value: 'BLUE',
    color: '#1814CF'
  },
  {
    title: '보라',
    value: 'PURPLE',
    color: '#9C1FFF'
  },
  {
    title: '핑크',
    value: 'PINK',
    color: '#FFA0E5'
  },
  {
    title: '검정',
    value: 'BLACK',
    color: '#000000'
  }
  // {
  //   title: '하얀색',
  //   value: 'WHITE',
  //   color: '#FFFFFF'
  // }
]
