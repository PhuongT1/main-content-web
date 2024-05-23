export const BUSINESS_KOREAN_NAME_TYPES = [
  {
    label: '주식회사 (회사명)',
    value: '주식회사 (회사명)'
  },
  {
    label: '(회사명) 주식회사',
    value: '(회사명) 주식회사'
  }
]

export const BUSINESS_ENGLISH_NAME_TYPES = [
  {
    label: '(회사명) Co,Ltd.',
    value: '(회사명) Co,Ltd.'
  },
  {
    label: '(회사명) Inc.',
    value: '(회사명) Inc.'
  }
]

export const LOCATION_TYPES = [
  {
    label: '서울특별시',
    value: '서울특별시'
  },
  {
    label: '경기도',
    value: '경기도'
  },
  {
    label: '인천광역시',
    value: '인천광역시'
  },
  {
    label: '강원도',
    value: '강원도'
  },
  {
    label: '대전광역시',
    value: '대전광역시'
  },
  {
    label: '세종특별자치시',
    value: '세종특별자치시'
  },
  {
    label: '충청북도',
    value: '충청북도'
  },
  {
    label: '충청남도',
    value: '충청남도'
  },
  {
    label: '부산광역시',
    value: '부산광역시'
  },
  {
    label: '대구광역시',
    value: '대구광역시'
  },
  {
    label: '울산광역시',
    value: '울산광역시'
  },
  {
    label: '경상북도',
    value: '경상북도'
  },
  {
    label: '경상남도',
    value: '경상남도'
  },
  {
    label: '광주광역시',
    value: '광주광역시'
  },
  {
    label: '전라북도',
    value: '전라북도'
  },
  {
    label: '전라남도',
    value: '전라남도'
  },
  {
    label: '제주특별자치도',
    value: '제주특별자치도'
  }
]

export const TOTAL_NUMBER_SHARES_TYPES = [
  {
    label: '100,000주',
    value: '100,000주',
    note: '10만'
  },
  {
    label: '1,000,000주',
    value: '1,000,000주',
    note: '100만'
  },
  {
    label: '10,000,000주',
    value: '10,000,000주',
    note: '1,000만'
  },
  {
    label: '100,000,000주',
    value: '100,000,000주',
    note: '1억'
  }
]

export const SHARE_CAPITAL_TYPES = [
  {
    label: '100원',
    value: '100원',
    note: '100원'
  },
  {
    label: '1,000원',
    value: '1,000원',
    note: '1,000원'
  },
  {
    label: '10,000원',
    value: '10,000원',
    note: '1만원'
  },
  {
    label: '100,000원',
    value: '100,000원',
    note: '10만원'
  },
  {
    label: '1,000,000원',
    value: '1,000,000원',
    note: '100만원'
  },
  {
    label: '5,000,000원',
    value: '5,000,000원',
    note: '500만원'
  },
  {
    label: '10,000,000원',
    value: '10,000,000원',
    note: '1,000만원'
  },
  {
    label: '50,000,000원',
    value: '50,000,000원',
    note: '5,000만원'
  },
  {
    label: '100,000,000원',
    value: '100,000,000원',
    note: '1억원'
  },
  {
    label: '500,000,000원',
    value: '500,000,000원',
    note: '5억원'
  },
  {
    label: '1,000,000,000원',
    value: '1,000,000,000원',
    note: '10억원'
  }
]

export const AMOUNT_PER_SHARE_TYPES = [
  {
    label: '100원',
    value: '100원'
  },
  {
    label: '500원',
    value: '500원'
  },
  {
    label: '1,000원',
    value: '1,000원'
  },
  {
    label: '5,000원',
    value: '5,000원'
  },
  {
    label: '10,000원',
    value: '10,000원'
  }
]

export const FINANCIAL_STATEMENT_TYPES = [
  {
    label: '3월',
    value: '3월'
  },
  {
    label: '6월',
    value: '6월'
  },
  {
    label: '9월',
    value: '9월'
  },
  {
    label: '12월',
    value: '12월'
  }
]

export const SPOT_TYPES = [
  {
    value: '대표이사',
    label: '대표이사'
  },
  {
    value: '사내이사',
    label: '사내이사'
  },
  {
    value: '감사',
    label: '감사'
  },
  {
    value: '주주(직책없음)',
    label: '주주(직책없음)'
  }
]

export const PROMOTER_OR_NOT = [
  {
    value: '일반 구성원(지분보유)',
    label: '일반 구성원(지분보유)'
  },
  {
    value: '일반 구성원(지분없음)',
    label: '일반 구성원(지분없음)'
  }
]

export enum DATA_CEO_ONE {
  SPOT = '대표이사',
  PROMOTER_OR_NOT = '일반 구성원(지분보유)',
  INVESTMENT_AMOUNT = '자동 계산'
}

export enum DATA_CEO_TWO {
  SPOT = '사내이사',
  PROMOTER_OR_NOT = '일반 구성원(지분없음)',
  INVESTMENT_AMOUNT = '없음',
  NUMBER_OF_SHARES_INVESTED = '없음'
}

export const ANNOUNCENMENT_AREA = [
  {
    label: '서울특별시',
    value: '서울특별시'
  },
  {
    label: '광주광역시',
    value: '광주광역시'
  },
  {
    label: '대구광역시',
    value: '대구광역시'
  },
  {
    label: '대전광역시',
    value: '대전광역시'
  },
  {
    label: '부산광역시',
    value: '부산광역시'
  },
  {
    label: '울산광역시',
    value: '울산광역시'
  },
  {
    label: '인천광역시',
    value: '인천광역시'
  },
  {
    label: '제주특별자치도',
    value: '제주특별자치도'
  },
  {
    label: '김해시',
    value: '김해시'
  },
  {
    label: '수원시',
    value: '수원시'
  },
  {
    label: '안동시',
    value: '안동시'
  },
  {
    label: '안산시',
    value: '안산시'
  },
  {
    label: '전주시',
    value: '전주시'
  },
  {
    label: '진주시',
    value: '진주시'
  },
  {
    label: '창원특례시',
    value: '창원특례시'
  },
  {
    label: '청주시',
    value: '청주시'
  },
  {
    label: '춘천시',
    value: '춘천시'
  },
  {
    label: '포항시',
    value: '포항시'
  }
]

export const SEOUL_SPECIAL_CITY = [
  {
    label: '서울신문',
    value: '서울신문'
  },
  {
    label: '조선일보',
    value: '조선일보'
  },
  {
    label: '동아일보',
    value: '동아일보'
  },
  {
    label: '경향신문',
    value: '경향신문'
  },
  {
    label: '한국일보',
    value: '한국일보'
  },
  {
    label: '중앙일보',
    value: '중앙일보'
  },
  {
    label: '한겨레신문',
    value: '한겨레신문'
  },
  {
    label: '국민일보',
    value: '국민일보'
  },
  {
    label: '세계일보',
    value: '세계일보'
  },
  {
    label: '아시아투데이',
    value: '아시아투데이'
  },
  {
    label: '신아일보',
    value: '신아일보'
  },
  {
    label: '문화일보',
    value: '문화일보'
  },
  {
    label: '내일신문',
    value: '내일신문'
  },
  {
    label: '천지일보',
    value: '천지일보'
  },
  {
    label: '서울경제',
    value: '서울경제'
  },
  {
    label: '한국경제신문',
    value: '한국경제신문'
  },
  {
    label: '매일경제신문',
    value: '매일경제신문'
  },
  {
    label: '해럴드경제',
    value: '해럴드경제'
  },
  {
    label: '아시아경제',
    value: '아시아경제'
  },
  {
    label: '파이낸셜뉴스',
    value: '파이낸셜뉴스'
  },
  {
    label: '머니투데이',
    value: '머니투데이'
  },
  {
    label: '이데일리',
    value: '이데일리'
  },
  {
    label: '데일리경제',
    value: '데일리경제'
  }
]

export const GWANGJU_METROPOLITAN_CITY = [
  {
    label: '광남일보',
    value: '광남일보'
  },
  {
    label: '광주일보',
    value: '광주일보'
  },
  {
    label: '광주매일일보',
    value: '광주매일일보'
  },
  {
    label: '전남일보',
    value: '전남일보'
  },
  {
    label: '호남신문',
    value: '호남신문'
  },
  {
    label: '무등일보',
    value: '무등일보'
  },
  {
    label: '전남매일',
    value: '전남매일'
  },
  {
    label: '호남매일',
    value: '호남매일'
  },
  {
    label: '남도일보',
    value: '남도일보'
  },
  {
    label: '광주드림',
    value: '광주드림'
  },
  {
    label: '광주도민일보',
    value: '광주도민일보'
  }
]

export const DAEJEON_METROPOLITAN_CITY = [
  {
    label: '충청투데이',
    value: '충청투데이'
  },
  {
    label: '중도일보',
    value: '중도일보'
  },
  {
    label: '대전일보',
    value: '대전일보'
  },
  {
    label: '금강일보',
    value: '금강일보'
  },
  {
    label: '충남일보',
    value: '충남일보'
  },
  {
    label: '충청신문',
    value: '충청신문'
  },
  {
    label: '대전투데이',
    value: '대전투데이'
  }
]

export const INCHEON_METROPOLITAN_CITY = [
  {
    label: '인천일보',
    value: '인천일보'
  },
  {
    label: '기호일보',
    value: '기호일보'
  }
]

export const ANSAN_CITY = [
  {
    label: '경인매일신문',
    value: '경인매일신문'
  }
]

export const CHEONGJU_CITY = [
  {
    label: '충청일보',
    value: '충청일보'
  },
  {
    label: '충청매일',
    value: '충청매일'
  },
  {
    label: '중부매일',
    value: '중부매일'
  },
  {
    label: '동양일보',
    value: '동양일보'
  },
  {
    label: '충북일보',
    value: '충북일보'
  },
  {
    label: '충청타임즈',
    value: '충청타임즈'
  }
]

export const CHUNCHEON_CITY = [
  {
    label: '강원일보',
    value: '강원일보'
  },
  {
    label: '강원도민일보',
    value: '강원도민일보'
  }
]

export const POHANG_CITY = [
  {
    label: '경북일보',
    value: '경북일보'
  },
  {
    label: '경북도민일보',
    value: '경북도민일보'
  },
  {
    label: '경북매일신문',
    value: '경북매일신문'
  },
  {
    label: '대경일보',
    value: '대경일보'
  }
]

export const JEONJU_CITY = [
  {
    label: '전주일보',
    value: '전주일보'
  },
  {
    label: '전북일보',
    value: '전북일보'
  },
  {
    label: '전북중앙신문',
    value: '전북중앙신문'
  },
  {
    label: '전북도민일보',
    value: '전북도민일보'
  },
  {
    label: '전민일보',
    value: '전민일보'
  },
  {
    label: '새전분신문',
    value: '새전분신문'
  },
  {
    label: '전라매일',
    value: '전라매일'
  },
  {
    label: '전북연합신문',
    value: '새만금일보'
  }
]

export const JEJU_SPECIAL_SELF_GOVERNING_PROVINCE = [
  {
    label: '제주일보',
    value: '제주일보'
  },
  {
    label: '제민일보',
    value: '제민일보'
  },
  {
    label: '한라일보',
    value: '한라일보'
  },
  {
    label: '제주매일',
    value: '제주매일'
  }
]

export const BUSAN_METROPOLITAN_CITY = [
  {
    label: '국제신문',
    value: '국제신문'
  },
  {
    label: '부산일보',
    value: '부산일보'
  },
  {
    label: '부산파이낸셜뉴스',
    value: '부산파이낸셜뉴스'
  }
]

export const DAEGU_METROPOLITAN_CITY = [
  {
    label: '대구신문',
    value: '대구신문'
  },
  {
    label: '매일신문',
    value: '매일신문'
  },
  {
    label: '대구일보',
    value: '대구일보'
  }
]

export const ULSAN_METROPOLITAN_CITY = [
  {
    label: '경상일보',
    value: '경상일보'
  },
  {
    label: '울산매일',
    value: '울산매일'
  },
  {
    label: '울산신문',
    value: '울산신문'
  },
  {
    label: '울산제일일보',
    value: '울산제일일보'
  }
]

export const SUWON_CITY = [
  {
    label: '중부일보',
    value: '중부일보'
  },
  {
    label: '경인일보',
    value: '경인일보'
  },
  {
    label: '경기일보',
    value: '경기일보'
  },
  {
    label: '경기신문',
    value: '경기신문'
  }
]

export const JINJU_CITY = [
  {
    label: '경남일보',
    value: '경남일보'
  },
  {
    label: '일간뉴스경남',
    value: '일간뉴스경남'
  }
]

export const CHANGWON_SPECIAL_SELF_GOVERNING_CITY = [
  {
    label: '경남신문',
    value: '경남신문'
  },
  {
    label: '경남도민일보',
    value: '경남도민일보'
  },
  {
    label: '창원일보',
    value: '창원일보'
  }
]

export const ANDONG_CITY = [
  {
    label: '경안일보',
    value: '경안일보'
  }
]

export const GIMHAE_CITY = [
  {
    label: '경남내일',
    value: '경남내일'
  }
]

export enum MEDIA {
  SEOUL_SPECIAL_CITY = '서울특별시',
  GWANGJU_METROPOLITAN_CITY = '광주광역시',
  DAEGU_METROPOLITAN_CITY = '대구광역시',
  DAEJEON_METROPOLITAN_CITY = '대전광역시',
  BUSAN_METROPOLITAN_CITY = '부산광역시',
  ULSAN_METROPOLITAN_CITY = '울산광역시',
  INCHEON_METROPOLITAN_CITY = '인천광역시',
  JEJU_SPECIAL_SELF_GOVERNING_PROVINCE = '제주특별자치도',
  GIMHAE_CITY = '김해시',
  SUWON_CITY = '수원시',
  ANDONG_CITY = '안동시',
  ANSAN_CITY = '안산시',
  JEONJU_CITY = '전주시',
  JINJU_CITY = '진주시',
  CHANGWON_SPECIAL_SELF_GOVERNING_CITY = '창원특례시',
  CHEONGJU_CITY = '청주시',
  CHUNCHEON_CITY = '춘천시'
}
