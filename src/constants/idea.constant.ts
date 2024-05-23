export const MODE_IDEA = {
  DIRECTLY: 'DIRECTLY',
  INSDUSTRY: 'INSDUSTRY'
}

export const INDUSTRIAL_FIELD_LIST = [
  '광고/마케팅',
  '교육/에듀테크',
  '금융/보험/핀테크',
  '게임',
  '모빌리티/자율주행',
  '물류/유통',
  '뷰티/화장품',
  '패션/디자인',
  '소셜/커뮤니티',
  '여행/레저/관광',
  '출산/유아/아동',
  '행정/법률/리걸테크',
  '제조/하드웨어',
  '무역/e커머스',
  '콘텐츠/미디어/예술',
  '부동산/건설/프롭테크',
  '푸드테크/농업',
  '환경/에너지',
  '홈리빙/반려동물',
  '헬스케어/바이오',
  '대행/배달'
]

export const SITUATION = [
  {
    title: '택배를 배송할 때'
  },
  {
    title: '출퇴근 카풀할 때'
  },
  {
    title: '큰 가구나 물건을 옮길 때'
  },
  {
    title: '애완동물을 안전하게 운반할 때'
  },
  {
    title: '대량의 화물을 외국으로 보낼 때'
  },
  {
    title: '신선식품이나 냉동식품을 배송할 때'
  }
]
export const TARGET_CUSTOMER = [
  {
    title: '학생을 대상으로'
  },
  {
    title: '사람을 대상으로'
  },
  {
    title: '동물을 대상으로'
  },
  {
    title: '직장인을 대상으로'
  },
  {
    title: '경력단절여성을 대상으로'
  },
  {
    title: '외국인을 대상으로'
  }
]

export const INCONVENIENCE_FACTOR = [
  {
    title: '비싸다'
  },
  {
    title: '불편하다'
  },
  {
    title: '느리다'
  },
  {
    title: '다양하지 않다'
  },
  {
    title: '불친절하다'
  },
  {
    title: '품질이 낮다'
  }
]
export const KEYWORD = [
  {
    title: '기차'
  },
  {
    title: '버스'
  },
  {
    title: '택시'
  },
  {
    title: '비행기'
  },
  {
    title: '자전거'
  },
  {
    title: '스쿠터'
  }
]
export enum QUERY_KEY_IDEA {
  GET_FOUR_IDEA = 'GET_FOUR_IDEA',
  GET_INSDUSTTRIAL = 'GET_INSDUSTTRIAL',
  GET_RELATEDCOMPANY = 'GET_RELATEDCOMPANY',
  IDEA = 'QUERY_IDEA',
  CREATE_IDEA = 'QUERY_CREATE_IDEA',
  WRITE_IDEA = 'QUERY_WRITE_IDEA'
}

export const DEFAULT_STEP_IDEA = {
  deckId: 2,
  projectId: 4
}

export enum Method {
  minus = 'minus',
  plus = 'plus',
  division = 'division',
  multiplication = 'multiplication',
  none = 'none'
}

export enum EVentIdea {
  RESET_STEP_03 = 'RESET_STEP_03'
}

export const MAX_IDEAS_COUNT = 10
export const MAX_IDEAS_EXCEPT = 3
export const MIN_IDEAS_COUNT = 1
