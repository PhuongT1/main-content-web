import { dataStep2Atom } from '@/atoms/home/articles-of-incorporation'
import { Typography } from '@/elements'
import { styled } from '@mui/material'
import { useRecoilState } from 'recoil'

export const PREFERRED_REPAYMENT_SHARES = [
  {
    item: '당 회사는 이시회 결의를 통하여 특정 조건 하에 상환받을 수 있는 상환우선주식을 발행할 수 있다.',
    key: 0
  },
  {
    item: '상환우선주식에 대하여는 우선배당한다. 상환우선주식에 대한 우선배당은 이사회가 정한 배당률에 따라 현금으로 지급한다.',
    key: 1
  },
  {
    item: '상환우선주식에 대하여 제2항에 따른 배당을 하고 보통주식에 대하여 종류주식의 배당률과 동률의 배당을 한 후, 잔여배당가능이익이 있으면 보통주식과 우선주식에 대하여 동등한 비율로 배당한다',
    key: 2
  },
  {
    item: '상환우선주식에 대하여 제2항에 따른 배당을 하지 못한 사업연도가 있는 경우에는 미배당분을 누적하여 다음 사업연도의 배당시에 우선하여 배당한다.',
    key: 3
  },
  {
    item: '상환우선주식의 주주에게는 종류주식에 대하여 제2항에 따른 배당을 하지 아니한다는 결의가 있는 총회의 다음 총회부터 그 우선적 배당을 한다는 결의가 있는 총회의 종료시까지는 의결권이 있는 것으로 정할 수 있다.',
    key: 4
  },
  {
    item: '당 회사는 이사회 결의로 상환우선주식을 상환할 수 있다.',
    key: 5
  },
  {
    item: '주주는 회사에 대하여 상환우선주식의 상환을 청구할 수 있다.',
    key: 6
  },
  {
    item: '상환가액은 [발행가액 + 발행가액 x 발행일로부터 상환일까지의 경과일수 ÷ 364 x 우선배당률]의 기준에 따라 산정한다. 단, 이사회가 정하는 바에 따라 위 기준에서 상환일까지 지급된 배당금을 차감하여 상환가액을 정할 수 있다.',
    key: 7
  },
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          상환기간(또는 상환청구 기간)은 이사회 결의를 통하여 발행일 속하는 회계연도에 대한 정기주주총회 종료일
          다음날부터 발행일 이후 10년이 되는 날이 속하는 회게연도에 대한 정기주주총회 종료 후 30일이 경과하는 날 이내의
          범위에서 정한다. 다만, 각 호의 1에 해당하는 사유가 발행하는 경우에는 그 사유가 해소될 때까지 상환 기간은
          연장된다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 상환주식에 대하여 우선적 배당이 완료되지 아니한 경우
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ③ 해당 회사의 파산 등으로 주식매수선택권 행사에 응할 수 없는 경우
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ③ 해당 회사의 파산 등으로 주식매수선택권 행사에 응할 수 없는 경우
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ④ 그 밖에 주식매수선택권을 부여받은 자와 체결한 주식매수선택권 부여계약서에서 정한 취소사유가 발생한 경우
        </Typography>
      </>
    ),
    key: 8
  },
  {
    item: '당 회사는 상환우선주식을 일시에 또는 분할하여 상환할 수 있다. 다만, 분할하여 상환하는 경우에는 추첨 또는 안분비례의 방법에 의하여 상환할 주식을 정할 수 있고, 안분비례시 발행하는 단주는 상환에서 제외한다.',
    key: 9
  },
  {
    item: '회사는 주식의 취득의 대가로 현금 이외에 유가증권이나 (다른 종류의 주식은 제외한다) 그 밖의 자산을 교부할 수 있다.',
    key: 10
  },
  {
    item: '당 회사가 상환우선주식을 상환할 경우에는 상환일정, 상환의 대상이 되는 주식을 공고해야 한다.',
    key: 11
  }
]

export const ARTICLE_0_CONVERTIBLE_PREFERRED_SHARES = [
  {
    item: '당 회사는 이시회 결의를 통하여 보통주식 또는 우선주식으로 전환할 수 있는 전환우선주식을 발행할 수 있다.',
    key: 0
  },
  {
    item: '전환우선주식에 대하여는 우선배당한다. 전환우선주식에 대한 우선배당은 이사회가 정한 배당률에 따라 현금으로 지급한다.',
    key: 1
  },
  {
    item: '전환우선주식에 대하여 제2항에 따른 배당을 하고 보통주식에 대하여 종류주식의 배당률과 동률의 배당을 한 후, 잔여배당가능이익이 있으면 보통주식과 우선주식에 대하여 동등한 비율로 배당한다.',
    key: 2
  },
  {
    item: '전환우선주식에 대하여 제2항에 따른 배당을 하지 못한 사업연도가 있는 경우에는 미배당분을 누적하여 다음 사업연도의 배당시에 우선하여 배당한다.',
    key: 3
  },
  {
    item: '전환우선주식의 주주에게는 종류주식에 대하여 제2항에 따른 배당을 하지 아니한다는 결의가 있는 총회의 다음 총회부터 그 우선적 배당을 한다는 결의가 있는 총회의 종료시까지는 의결권이 있는 것으로 정할 수 있다.',
    key: 4
  },
  {
    item: '전환권의 행사로 인하여 발행하는 신주식의 발행가액 및 주식의 수는 전환하기 전의 주식의 발행가액 및 주식의 수와 동일하다.',
    key: 5
  },
  {
    item: '전환권의 행사로 인하여 발행하는 신주식의 발행가액 및 주식의 수는 전환하기 전의 주식의 발행가액 및 주식의 수와 동일하다.',
    key: 6
  },
  {
    item: '전환주식의 전환 또는 전환청구를 할 수 있는 기간은 30년 이내의 범위에서 전환주식 발행 시 이사회 결의로 정한다.',
    key: 7
  },
  {
    item: '제6항 및 제7항의 전환으로 인하여 발행할 주식은 보통주식으로 하고, 그 전환비율은 발행 시 이사회 결의로 정한다.',
    key: 8
  }
]

export const ARTICLE_0_REDEEMABLE_CONVERTIBLE_PREFERRED_SHARES = [
  {
    item: '당 회사는 이사회 결의를 통하여 전환우선주식임과 동시에 상환우선주식인 상환전환우선주식을 발행할 수 있다.',
    key: 0
  },
  {
    item: '전환과 상환에 관한 내용은 본 정관의 ‘전환우선주식’ 및 ‘상환우선주식’ 조항을 준용한다.',
    key: 1
  }
]

export const ARTICLE_0_PREFERRED_SHARES_REGARDING_DISTRIBUTION_OF_RESIDUAL_ASSETS = [
  {
    item: '당 회사는 이사회 결의를 통하여 잔여재산 분배에 관한 우선주식을 발행할 수 있다.',
    key: 0
  },
  {
    item: '제1항의 우선주식을 소유한 주주는 보통주을 소유한 주주보다 청산 등 절차에서 우선적으로 잔여재산을 분배받을 수 있고, 보통주에 대한 잔여재산 분배율이 위 우선주식에 대한 잔여재산분배율을 초과하는 경우 그 초과분에 대하여 보통주와 동일한 분배율로 참가하여 분배를 받을 수 있다.',
    key: 1
  },
  {
    item: '제1항의 우선주식을 발행함에 있어 잔여재산 분배에 관한 구체적 사항은 이사회 결의로 정할 수 있다.',
    key: 2
  }
]

export const ARTICLE_0_STOCK_PURCHASE_OPTION = [
  {
    item: '당 회사는 상법의 규정에 따라 주주총회의 특별결의에 의하여 발행주식 총수의 100분의 10 범위 내에서 주식매수선택권을 부여할 수 있다.',
    key: 0
  },
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          주식매수선택권을 부여받을 자는 회사의 설립과 경영, 기술혁신 등에 기여하였거나 기여할 능력을 갖춘 회사의
          임직원으로 한다. 다만, 다음 각 호의 1에 해당하는 자는 제외한다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 상법 제542조의8 제2항 제5호의 최대주주와 그 특수관계인 및 제6호의 주요주주와 그 특수관계인, 다만, 회사의
          임원이 됨으로써 특수관계인에 해당하게 된 자(그 임원이 계열회사의 상무에 종사하지 아니하는 이사, 감사인 경우를
          포함한다)
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ③ 주식매수선택권의 행사로 주요주주가 되는 자
        </Typography>
      </>
    ),
    key: 1
  },
  {
    item: '주식매수선택권의 행사로 발행되거나 양도될 주식은 보통주식으로 한다. 주식매수선택권의 행사가격과 시가와의 차액을 현금 또는 자기주식으로 교부하는 경우 그 차액의 산정기준도 보통주식으로 한다.',
    key: 2
  },
  {
    item: '주식매수선택권을 부여받은 자의 수는 재직하는 임직원의 100분의 90을 초과할 수 없고, 임직원 1인에 대하여 부여하는 주식매수선택권은 발행주식총수의 100분의 10을 초과할 수 없다.',
    key: 3
  },
  {
    item: '주식매수선택권의 행사기간은 당해 주식매수선택권을 부여하는 주주총회의 또는 이사회결의로 정한다.',
    key: 4
  },
  {
    item: '주식매수선택권을 부여받은 자는 제1항의 결의일로부터 2년 이상 재임 또는 재직하여야 이를 행사할 수 있다. 다만, 주식매수선택권을 부여받은 자가 제1항의 결의일로부터 2년 내에 사망하거나 그 밖에 본인의 책임이 아닌 사유로 퇴임 또는 퇴직하는 경우에는 그 행사기간 동안 주식매수선택을 행사할 수 있다.',
    key: 5
  },
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          다음 각 호 1에 해당하는 경우에는 이사회의 결의로 주식매수선택권의 부여를 취소할 수 있다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 주식매수선택권을 부여받은 자가 본인의 의사에 따라 사임 또는 사직한 경우
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ② 주식매수선택권을 부여받은 자가 고의 또는 과실로 회사에 중대한 손해를 초래하게 한 경우
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ③ 해당 회사의 파산 등으로 주식매수선택권 행사에 응할 수 없는 경우
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ④ 그 밖에 주식매수선택권을 부여받은 자와 체결한 주식매수선택권 부여계약서에서 정한 취소사유가 발생한 경우
        </Typography>
      </>
    ),
    key: 6
  }
]

export const ARTICLE_0_STOCK_PURCHASE_OPTION_OF_VENTURE_COMPANY = [
  {
    item: '당 회사는 [벤처기업육성에 관한 특별조치법]에 따라 설립 또는 기술, 경영의 혁신 등에 기여하였거나 기여할 능력을 갖춘 자에게 주주총회의 특별결의를 통해 특별히 유리한 가격으로 신주를 매수할 수 있는 권리나 그 밖에 회사의 주식을 매입할 수 있는 권리(이하 ‘주식매수선택권’이라 한다)을 부여할 수 있다.',
    key: 0
  },
  {
    item: '주식매수선택권으로 내줄 수 있는 주식은 기명식 보통주식으로 한다.',
    key: 1
  },
  {
    item: '주식매수선택권으로 내줄 수 있는 주식의 총 한도는 발행주식총수의 100분의 50이며, 주식매수선택권으로 1인에 대하여 내줄 수 있는 주식의 한도는 발행주식 총수의 100분의 10을 초과할 수 없다.',
    key: 2
  },
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          회사는 제1항에 따라 다음 각 호의 어느 하나에 해당하는 자에게 주식매수선택권을 부여할 수 있다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 회사의 임직원
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ② 회사와 계약을 체결하여 전문성을 제공한 외부 전문가
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ③ 회사와 계약을 체결하여 전문성을 제공한 대학 또는 연구기관
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ④ 회사가 인수한 기업의 임직원
        </Typography>
      </>
    ),
    key: 3
  },
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          제4항에도 불구하고, 다음 각 호의 어느 하나에 해당하는 자에게는 주식매수선택권을 부여할 수 없다. 다만, 회사의
          임원이 됨으로써 특수관계인에 해당하게 된 자(그 임원이 자회사의 비상근 임원인 자를 포함한다)에게는
          주식매수선택권을 부여할 수 있다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 상법 제542조의8제2항제5호에 따른 최대주주 및 그 특수관계인
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ② 상법 제542조의8제2항제6호에 따른 주요주주 및 그 특수관계인
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ③ 그 밖에 [벤처기업육성에 관한 특별조치법] 등 관계 법령에서 주식매수선택권 부여를 금지하고 있는 자
        </Typography>
      </>
    ),
    key: 4
  },
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          제1항에 따라 부여할 주식매수선택권은 다음 각 호의 어느 하나에 해당하는 방법으로 부여한다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 주식매수선택권의 행사가격으로 신주를 발행해서 주거나 자기주식을 주는 방법
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ② 주식매수선택권의 행사가격과 주식매수선택권을 행사한 날을 기준으로 평가한 해당 주식의 시가와의
          차액(행사가격이 시가보다 낮은 경우의 차액을 말한다)을 현금이나 자기주식으로 주는 방법
        </Typography>
      </>
    ),
    key: 5
  },
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          주식매수선택권의 행사가격은 다음 각 호의 가액 이상이어야 하며, 각 시점별 주식의 시가는 각 시점을 기준으로
          [상속세 및 증여세법] 제60조를 준용하여 평가한다. 주식매수선택권의 행사가격을 조정하는 경우에도 또한 같다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 신주를 발행하는 경우에는 주식매수선택권을 부여한 날을 기준으로 평가한 해당 주식의 시가(이하 부여당시 시가)
          또는 해당 주식의 권면액 중 높은 금액
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ② 현금이나 자기주식으로 주는 경우에는 부여 당시 시가
        </Typography>
      </>
    ),
    key: 6
  },
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          제7항의 규정에도 불구하고, 회사는 [벤처기업육성에 관한 특별조치법] 시행령 제11조의3 제3항에 따라 다음 각 호의
          요건을 모두 갖춘 경우에는 주식매수선택권의 행사가격을 부여 당시 시가보다 낮은 가액으로 할 수 있다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 주식매수선택권의 행사가격으로 신주를 발행하여 주는 방법으로 부여
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ② 주식매수선택권의 행사가격이 해당 주식의 권면액 이상일 것
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ③ 주식매수선택권을 부여받을 자가 부여 당시 시가보다 낮은 행사가격으로 부여받았거나 부여받을 각
          주식매수선택권에 대하여 다음 계산식에 따라 계산한 금액의 누적 합계가 5억원 이하일 것 (부여 당시 시가 - 행사
          가격) X 주식매수선택권으로 부여받을 주식의 수
        </Typography>
      </>
    ),
    key: 7
  },
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          제1항에 따른 주주총회의 특별결의에서는 다음 각 호의 사항을 정하여야 한다. 다만, 주식매수선택권으로 내줄 주식
          총수의 100의 20 이내에서 임직원 외의 자에게 부여하는 경우에는 [벤처기업육성에 관한 특별조치법] 제16조의3
          제4항에 따라 제1호 및 제4호의 사항을 이사회에서 정하게 할 수 있다. 이 경우 주식매수선택권을 부여한 후 처음으로
          소집되는 주주총회의 승인을 받아야 한다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 주식매수선택권을 부여받을 자의 성명 또는 명칭
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ② 주식매수선택권의 부여 방법
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ③ 주식매수선택권의 행사 가격 및 행사 기간
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ④ 주식매수선택권을 부여받을 자 각각에 대하여 주식매수선택권 행사로 내줄 주식의 종류와 수
        </Typography>
      </>
    ),
    key: 8
  },
  {
    item: '주식매수선택권을 부여받은 자는 주주총회 또는 이사회 결의로부터 2년 이상 경과한 날부터 행사할 수 있다. 다만, 회사의 임직원의 경우에는 부여받은 날로부터 2년 이상 재임 또는 재직하여야 행사할 수 있다.',
    key: 9
  },
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          다음 각 호의 어느 하나에 해당하는 경우에는 이사회의 결의로 주식매수선택권의 부여를 취소할 수 있다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 주식매수선택권을 부여받은 임직원이 본인의 의사에 따라 퇴임하거나 퇴직한 경우
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ② 주식매수선택권을 부여받은 임직원이 고의 또는 과실로 회사에 중대한 손해를 끼친 경우
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ③ 회사의 파산 또는 해산 등으로 주식매수선택권의 행사에 응할 수 없는 경우
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ④ 그 밖에 주식매수선택권 부여 계약에서 정한 취소사유가 발생한 경우
        </Typography>
      </>
    ),
    key: 10
  }
]

export const ARTICLE_0_MULTIPLE_VOTING_SHARES = [
  {
    item: '당 회사는 주주총회 특별결의를 통하여 특정 조건 하에 의결권을 1주당 최대 10주로 하는 복수의결주식을 발행할 수 있다.',
    key: 0
  },
  {
    item: '복수의결주식의 존속기간은 10년까지 유지되며, 상장될 경우 기간은 최대 3년으로 축소된다. 다만, 공시대상기업집단에 편입되는 경우 즉시 보통주로 전환되며 허위 또는 부정한 방법으로 발행시 보통주식 발행으로 간주한다.',
    key: 1
  },
  {
    item: '제2항에서 정한 기간이 지나면 복수의결주식은 보통주식으로 자동 전환된다.',
    key: 2
  },
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          복수의결주식을 보유할 수 있는 자는 다음 각 호의 자격을 갖춘 경영에 참여하는 창업주에 한한다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 벤처기업 설립 당시 정관에 기재된 발기인
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ② 주주총회에서 선임되고 회사의 상무에 종사하는 사내이사
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ③ 벤처기업 설립 당시부터 가장 최근의 투자를 받기 전까지 계속하여 30% 이상의 주식을 보유한 등기이사
        </Typography>
      </>
    ),
    key: 3
  },
  {
    item: '복수의결주식을 발행하기 위해서는 벤처기업으로서 100억 이상의 누적투자와 마지막 투자가 50억 이상이면서 제4항에 해당하는 자의 주식이 30% 미만으로 떨어지게 된 경우, 가중된 특별결의(발행주식총수의 4분의3 이상의 동의)를 통해 신주 발행할 수 있다. 단, ‘총주주 동의’시 창업주가 보유한 보통주로 납입가능하다.',
    key: 4
  },
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          복수의결주식을 보유할 수 있는 자는 다음 각 호의 자격을 갖춘 경영에 참여하는 창업주에 한한다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 복수의결권 존속기간 변경을 위한 정관 변경
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ② 이사의 보수 및 책임의 감면, 감사 및 감사위원의 선임 및 해임
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ③ 자본금 감소의 결의
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ④ 이익의 배당
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ⑤ 해산의 결의
        </Typography>
      </>
    ),
    key: 5
  },
  {
    item: '당 회사가 복수의결주식을 발행할 경우에는 복수의결주식 발행내용 및 중요사항을 중소벤처기업부에 보고하여야 하며, 본점과 지점에 비치 및 공고해야 한다.',
    key: 6
  }
]

export const ARTICLE_0_TRANSFER_OF_SHARES = [
  {
    item: '주주는 주식의 양도를 원할 경우 이사회의 동의를 받아야 하며, 이사회는 주식양도 동의를 위한 회의를 수시로 개최할 수 있다.',
    key: 0
  },
  {
    item: '주주가 주식의 양도를 원할 경우에는 그 의사를 이사회에 서면으로 통지하여야 한다. 이사회는 주식 양도 통제를 받은 날로부터 30일 이내에 그 주식의 양도를 승인하거나 거절하는 결정을 해야 하며, 그 결과를 주식양도 의사를 통지한 주주에게 서면으로 알려야 한다.',
    key: 1
  },
  {
    item: '이사회는 주식의 양도를 거절할 경우, 그 이유를 명시해야 하며, 이는 주식의 투명성을 해치거나 법인의 재정 상태를 위협하거나 법인의 목적을 위협하는 경우에 한한다.',
    key: 2
  },
  {
    item: '주식양도의 동의가 이루어진 경우, 주식의 매매는 그 동의를 받은 날로부터 60일 이내에 이루어져야 한다.',
    key: 3
  },
  {
    item: '주주의 주식양도 의사표시가 있을 경우, 법인은 우선적으로 그 주식을 인수할 권리를 가진다.',
    key: 4
  },
  {
    item: '주식의 양도는 등기를 필요로 하며, 등기가 되지 않은 주식의 양도는 법인에 대하여 효력이 없다.',
    key: 5
  }
]

export const ARTICLE_0_SHAREHOLDER_REGISTRY_AND_PROXY_FOR_NAME_CHANGE = [
  {
    item: '당 회사는 주주명부 또는 그 사본을 작성, 비치해야 한다.',
    key: 0
  },
  {
    item: '당 회사는 주주명부의 변경, 관리에 대한 사무를 처리하기 위하여 주식의 명의개서대리인을 둘 수 있다. 명의개서 대리인 및 그 사무취급장소와 대행업무의 범위는 이사회의 결의로 정한다.',
    key: 1
  },
  {
    item: '주주가 주식을 양도하여 명의개서를 요구할 경우, 주권과 당 회사 양식의 청구서를 제출해야 한다. 또한, 주주가 증여, 상속, 유증, 강제집행을 통한 취득 등 계약 이외의 사유로 인하여 주식을 취득한 경우, 취득원인을 증명하는 서류를 함께 제출해야 한다.',
    key: 2
  }
]

export const ARTICLE_0_REGISTRATION_OF_SECURITY_INTERESTS_AND_INDICATION_OF_TRUST_PROPERTY = [
  {
    item: '주주는 회사의 주식에 대하 질권 등록 또는 신탁재산 표시를 청구할 권리가 있다. 이를 위해 주주는 주권과 당 회사 양식의 청구서를 제출해야 한다.',
    key: 0
  },
  {
    item: '주주는 질권 등록 또는 신탁재산 표시의 수정 또는 말소를 청구할 수 있다. 이러한 청구를 위해서도 주권과 당 회사 양식의 청구를 제출해야 한다.',
    key: 1
  }
]

export const ARTICLE_0_REISSUANCE_OF_SHARES = [
  {
    item: '당 회사는 주주명부 또는 그 사본을 작성, 비치해야 한다.',
    key: 0
  },
  {
    item: '당 회사는 주주명부의 변경, 관리에 대한 사무를 처리하기 위하여 주식의 명의개서대리인을 둘 수 있다. 명의개서 대리인 및 그 사무취급장소와 대행업무의 범위는 이사회의 결의로 정한다.',
    key: 1
  },
  {
    item: '주주가 주식을 양도하여 명의개서를 요구할 경우, 주권과 당 회사 양식의 청구서를 제출해야 한다. 또한, 주주가 증여, 상속, 유증, 강제집행을 통한 취득 등 계약 이외의 사유로 인하여 주식을 취득한 경우, 취득원인을 증명하는 서류를 함께 제출해야 한다.',
    key: 1
  }
]

export const ARTICLE_0_CLOSURE_AND_RECORD_DATE_OF_SHAREHOLDERS_REGISTER = [
  {
    item: '당 회사는 사업연도 종료 익일부터 그 사업연도에 관한 정기주주총회의 종결일까지 주주명부를 폐쇄하고 주주명부의 변경을 정지한다.',
    key: 0
  },
  {
    item: '당 회사는 매년 12월 31일 최종의 주주명부에 기재되어 있는 주주를 그 결신가에 관한 정기주주총회에서 권리를 행사할 주주로 한다.',
    key: 1
  },
  {
    item: '당 회사는 임시주주총회의 소집 기타 필요한 경우 이사회의 결의로 정한 날에 주주명부에 기재되어 있는 주주를 그 권리를 행사할 주주로 할 수 있고, 이 경우 회사는 이사회의 결의로 정한 날의 2주 전에 공지하여야 한다.',
    key: 2
  }
]

export const ARTICLE_0_REPORT_OF_SHAREHOLDER_NAME_ADDRESS = [
  {
    item: '당 회사의 주주, 등록된 질권자, 주식의 신탁회사는 성명(상호), 주소, 주민등록번호(법인등록번호), 연락처, 전자우편 주소 등의 정보를 당 회사로 신고해야 한다.',
    key: 0
  },
  {
    item: '제1항의 정보에 변경이 발생한 경우, 해당 주체는 변경 사항을 즉시 당 회사에 신고해야 한다.',
    key: 1
  }
]

export const ARTICLE_0_TYPES_OF_GENERAL_MEETINGS = [
  {
    item: '당 회사의 주주총회는 정기주주총회와 임시주주총회 두 가지로 한다.',
    key: 0
  },
  {
    item: '정기주주총회는 사업연도 말일의 다음날부터 3개월 이내에 소집한다.',
    key: 1
  },
  {
    item: '임시주주총회는 이사회의 결의와 대한민국 법령에 따라 소집한다.',
    key: 2
  },
  {
    item: '모든 주주총회는 원칙적으로 한국어로 진행한다. 다만, 필요한 경우 한국어와 영어로 진행한다.',
    key: 3
  }
]

export const ARTICLE_0_CONVOCATION_OF_GENERAL_SHAREHOLDERS_MEETING = [
  {
    item: '모든 주주총회는 이사회의 결의에 의해 소집되며, 장소는 이사회의 다른 결의가 없을 경우 본점 소재지 또는 그 인접지로 한다. 다만, 이사회의 결의가 있을 경우 국내 또는 국외의 다른 장소에서 소집할 수 있다.',
    key: 0
  },
  {
    item: '주주총회를 소집함에는 총회일 기준 최소 14일 이전에 주주 및 그 외에 통지를 받아야 하는 자에게 대표이사가 서면으로 통지를 발송하거나 각 주주의 동의를 받아 전자문서로 통지를 발송하여야 한다. 다만, 총회일 이전에 모든 주주의 서면 동의(우편, 인편, 항공 특송, 팩스, 텔렉스, 전보, E-mail 등에 의한)가 있을 시에는 기간을 단축할 수 있다. 소집 통지에는 일시, 장소 및 표결할 결의사항 등 총회에서 다룰 사항을 구체적으로 기재하여야 하며, 주주들(불참 주주 포함)의 전원 동의 없이는 사전에 통지되지 않은 사안을 결의할 수 없다.',
    key: 1
  },
  {
    item: '위 제2항의 규정에도 불구하고, 의결권 있는 발행주식 총수의 100분의 1이하의 주식을 소유한 주주에 대해서는 주주총회 소집과 회의 목적사항을 회사 인터넷 홈페이지에 게재하거나 서울특별시 에 발행하는 일간지 머니투데이 신문에 각 2회 이상 총회일 2주 전에 공고하거나 금융감독원 또는 한국거래소가 운용하는 전자공시 시스템에 공고함으로써 소집 통지를 갈음할 수 있다.',
    key: 2
  },
  {
    item: '본조의 2항에도 불구하고 당 회사의 자본금 총액이 10억원 미만인 경우, 주주총회일의 10일 전에 각 주주에게 서면으로 통지를 발송하거나 각 주주의 동의를 받아 전자문서로 통지를 발송할 수 있다.',
    key: 3
  },
  {
    item: '본조의 2항에도 불구하고 당 회사의 자본금 총액이 10억원 미만인 경우, 주주 전원의 동의가 있을 경우에는 소집절차 없이 주주총회를 개최할 수 있고, 서면에 의한 결의로써 주주총회의 결의를 갈음할수 있다. 결의의 목적사항에 대하여 주주 전원이 서면으로 동의를 한 때에는 서면에 의한 결의가 있는 것으로 본다.',
    key: 4
  }
]

export const ARTICLE_0_CHAIRMAN_RIGHT_TO_MAINTAIN_ORDER = [
  {
    item: '주주총회의 의장은 고의로 의사진행을 방해하기 위한 발언 및 행동을 하는 등 현저히 질서를 문란하게 하는 자에 대하여 그 발언의 정지 또는 퇴장을 명할 수 있다.',
    key: 0
  },
  {
    item: '주주총회의 의장은 의사진행의 원할을 기하기 위하여 필요하다고 인정할 때에는 주주의 발언 시간 및 횟수를 제한할 수 있다.',
    key: 1
  }
]

export const ARTICLE_0_RESOLUTION_METHOD_AT_GENERAL_SHAREHOLDERS_MEETING = [
  {
    item: '주주총회의 일반결의는 법령 또는 정관에 다른 규정이 있는 경우를 제외하고는 출석한 주주의 의결권 과반수로 하되 발행 주식 총수의 4분의 1이상의 수로써 하여야 한다.',
    key: 0
  },
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          다음 각 호에 해당하는 주주총회의 특별결의는 출석한 주주의 의결권의 3분의2 이상의 수와 발행주식 총수의 3분의1
          이상의 수로써 하여야 한다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 정관변경
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ② 회사의 합병, 분할, 분할합병, 해산, 청산
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ③ 영업의 전부 또는 중요한 일부의 양도
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ④ 영업 전부의 임대 또는 경영위임, 타인과 영업의 손익 전부를 같이 하는 계약, 그 밖에 이에 준하는 계약의 체결,
          변경 또는 해약
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ⑤ 회사의 영업에 중대한 영향을 미치는 다른 회사의 영업 전부 또는 일부의 양수
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ⑥ 이사, 감사 및 청산인의 해임
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ⑦ 자본의 감소
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ⑧ 기타 법령의 규정에 의한 경우
        </Typography>
      </>
    ),
    key: 3
  }
]

export const ARTICLE_0_VOTING = [
  {
    item: '주주의 의결권은 1주당 1표로 한다. 다만, 상법 제344조의3 제1항, 제369조 제2항, 제3항의 의결권 없는 주식의 수는 발행주식총수에 산입하지 아니한다.',
    key: 0
  },
  {
    item: '당 회사가 보유한 자기주식은 의결권이 없다.',
    key: 1
  },
  {
    item: '당 회사, 모회사 및 자회사 또는 자회사가 다른 회사의 발행주식의 총수의 10분의1을 초과하는 주식을 가지고 있는 경우, 그 다른 회사가 가지고 있는 회사 또는 모회자의 주식은 의결권이 없다.',
    key: 2
  },
  {
    item: '주주는 대리인으로 하여금 의결권을 행사하도록 할 수 있으며, 그러한 경우에 대리인은 그 대리권을 증명하는 서면문서를 대리권을 행사하는 주주총회마다 반드시 제출하여야 한다.',
    key: 3
  },
  {
    item: '당 회사의 주주는 타인의 주식을 신탁 기타의 근거로 보유하고 있는 경우에 한하여 의결권을 통일하지 아니하고 행사할 수 있다. 이 경우 주주는 회의일 3일 전에 당 회사에 대하여 서면으로 그 뜻과 이유, 신탁 등의 근거로 가지고 있는 타인의 주식 수를 통지하여야 한다.',
    key: 4
  },
  {
    item: '주주는 총회에 출석하지 아니하고 서면에 의하여 의결권을 행사할 수 있다.',
    key: 5
  },
  {
    item: '모든 주주총회는 원칙적으로 한국어로 진행한다. 다만 필요한 경우 한국어와 영어로 진행한다.',
    key: 6
  }
]

export const ARTICLE_0_NUMBER_AND_APPOINTMENT_OF_DIRECTORS_AND_AUDITORS = [
  {
    item: '당 회사의 이사는 3인 이상, 감사는 1인 이상으로 한다. 이사의 경우 사외이사 및 비상무이사를 둘 수 있다.',
    key: 0
  },
  {
    item: '본조 1항에도 불구하고 회사의 자본금이 10억원 미만인 경우에는 이사는 1인 이상으로 하고 감사는 선임하지 않을 수 있다.',
    key: 1
  },
  {
    item: '이사와 감사는 주주총회에서 선임한다. 다만 감사 선임의 경우 의결권 없는 주식을 제외한 발행주식 총수의 100분의3을 초과하는 주식을 가진 주주는 그 초과하는 주식에 관하여 선임의결권을 행하지 못한다.',
    key: 2
  }
]

export const ARTICLE_0_NUMBER_AND_APPOINTMENT_OF_WORKER_REPRESENTATIVES_AND_OUTSIDE_DIRECTORS = [
  {
    item: '이사 중 1인 이상은 반드시 근로자 대표로 선임하며, 사회서비스 수혜자나 연계기관 인사 등 외부이해관계자를 사외이사로 선임해야 한다.',
    key: 0
  },
  {
    item: '이사는 근로자 대표와 사외이사를 포함하여 선임하여야 하며, 대표자와 직접적 이해관계자는 근로자 대표나 사외이사가 될 수 없다.',
    key: 1
  }
]

export const ARTICLE_0_TERM_OF_OFFICE_OF_DIRECTORS_AND_AUDITORS = [
  {
    item: '이사의 임기는 취임 후 3년으로 한다. 다만 임기가 최종 결산기에 관한 정기주주총회 이전에 만료될 경우에는 그 총회의 종결시까지 그 임기를 연장한다.',
    key: 0
  },
  {
    item: '보결 또는 증원에 의하여 선임된 이사의 임기는 다른 이사의 잔여 임기와 같이 한다.',
    key: 1
  },
  {
    item: '감사의 임기는 취임 후 3년 내의 최종결산기에 관한 정기주주총회의 종결시까지로 한다.',
    key: 2
  }
]

export const ARTICLE_0_EXECUTION_OF_DUTIES_AND_AGENTS = [
  {
    item: '대표이사는 당 회사의 업무를 통할하고 이사, 감사는 대표이사를 보좌하여 그 업무를 분장한다.',
    key: 0
  },
  {
    item: '대표이사 유고시에는 사내이사가 그 직무를 대행한다. 이 때, 대표권이 없는 사내이사가 2인 이상인 경우 사내이사로 재임한 기간이 가장 긴 사람이 직무를 대행하고, 재임기간이 동일한 사내이사가 2명 이상인 경우, 연장자가 직무를 대행한다.',
    key: 0
  }
]

export const ARTICLE_0_LIMITATIONS_ON_DUTIES_AND_RESPONSIBILITIES_OF_EXECUTIVES = [
  {
    item: '임원은 법령과 정관의 규정에 따라 선량한 관리자의 주의로서 회사를 위하여 그 직무를 수행하여야 한다.',
    key: 0
  },
  {
    item: '이사는 회사에 현저하게 손해를 미칠 염려가 있는 사실을 발견한 때에는 즉시 이를 감사에게 보고하여야 한다.',
    key: 1
  },
  {
    item: '임원이 상법 제399조 제1항에 따라 과실로 인하여 당 회사에 대하여 손해배상책임을 지는 경우, 그 책임은 행위를 한 날 이전 최근 1년간의 보수액(상여금과 주식매수선택권의 행사로 인한 이익 등을 포함한다)의 6배(사외이사의 경우는 3배)를 한도로 한다. 다만, 임원이 고의 또는 중대한 과실로 인하여 손해를 발생시킨 경우와 상법 제397조 및 제398조에 해당하는 경우에는 그러하지 아니한다.',
    key: 2
  }
]

export const ARTICLE_0_DUTIES_OF_AUDITOR = [
  {
    item: '감사는 이사의 직무 집행을 감사한다.',
    key: 0
  },
  {
    item: '감사는 언제든지 이사에 대하여 영업에 관한 보고를 요구하거나 회사의 영업과 재산상태를 조사할 수 있다.',
    key: 1
  },
  {
    item: '감사는 회사의 비용으로 전문가의 도움을 구할 수 있다.',
    key: 2
  }
]

export const ARTICLE_0_COMPOSITION_OF_THE_BOARD_OF_DIRECTORS = [
  {
    item: '당 회사는 매월 1회 정기이사회를 개최함을 원칙으로 하고 필요에 따라 수시로 임시이사회를 개최할 수 있다.',
    key: 0
  },
  {
    item: '당 회사의 이사가 2명 이하인 경우 이사회를 구성하지 아니한다.',
    key: 1
  },
  {
    item: '특별한 안건이 없는 경우 이사회 개최를 생략할 수 있다.',
    key: 2
  },
  {
    item: '이사회는 동영상과 음성을 동시 송수신하는 통신수단으로 개최할 수 있다.',
    key: 3
  }
]

export const ARTICLE_0_COMMITTEES_WITHIN_THE_BOARD_OF_DIRECTORS = [
  {
    item: '당 회사는 필요시 이사회 내에 2인 이상의 이사로 구성되는 위원회를 둘 수 있다.',
    key: 0
  },
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          이사회는 다음 각 호의 사항을 제외하고 그 권한을 위원회에 위임할 수 있다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 주주총회의 승인을 요하는 사항의 제안
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ② 대표이사의 선임 및 해임
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ③ 위원회의 설치 및 그 위원의 선임 및 해임
        </Typography>
      </>
    ),
    key: 1
  },
  {
    item: '위원회의 설치, 구성, 운영 등에 관한 세부사항은 이사회의 결의로 정할 수 있다.',
    key: 2
  }
]

export const ARTICLE_0_PROCEDURES_FOR_CONVENING_THE_BOARD_OF_DIRECTORS = [
  {
    item: '이사회는 각 이사가 소집한다. 그러나 이사회에서 따로 정한 이사가 있을 때에는 그러하지 아니한다.',
    key: 0
  },
  {
    item: '이사회는 국내 또는 국외에서 소집할 수 있다.',
    key: 1
  },
  {
    item: '이사회를 소집하는 이사는 회의 개최 3일 이전까지 이를 각 이사에게 통지하여야 한다. 다만, 이사 및 감사 전원의 동의가 있는 때에는 그 소집절차를 생략할 수도 있다.',
    key: 2
  }
]

export const ARTICLE_0_MATTERS_RESOLVED_BY_THE_BOARD_OF_DIRECTORS = [
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          이사회는 다음 사항을 의결한다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 이 정관에서 별도로 정하지 아니한 사항 중 상법, 기타 법률에 의하여 이사회의 권한으로 정한 사항
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ② 사업계획 수립, 예산의 책정, 결산에 관한 사항
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ③ 정관변경안의 심사, 채택
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ④ 대표이사 또는 지배인의 선임과 해임
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ⑤ 지점, 분사무소의 설치 및 폐쇄, 자회사의 설립
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ⑥ 근로규칙의 제정 및 개폐에 관한 사항
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ⑦ 주주총회의 소집에 관한 사항
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ⑧ 대규모 자금의 차입, 핵심 자산의 취득, 매각 및 자본증가에 관한 사항(유상증자, 무상증자 등)
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ⑨ 주요 소송의 제기, 응소, 조정, 화해에 관한 사항
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ⑩ 이사의 겸업, 겸직허가
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ⑪ 주식의 양도승인(주식양도제한이 존재하는 경우 한정)
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ⑫ 주식매수선택권의 부여의 취소결정
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ⑬ 계약상 이사회의 승인 또는 결의사항으로 정하고 있는 사항
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ⑭ 이사회내 위원회의 설치와 그 위원의 선임 및 해임
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ⑮ 기타 이사회의 결의사항으로 삼을 필요가 있는 중요사항
        </Typography>
      </>
    ),
    key: 0
  },
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          전항에도 불구하고 당 회사의 이사가 2인 이하여서 이사회가 성립하지 않는 경우, 다음 각호에 의한다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 위 제1항 제1호, 3호, 4호, 8호, 11호, 12호는 주주총회의 결의사항으로 한다. 그 밖의 경우에는 “이사회”의
          결의사항을 “대표이사”의 결정사항으로 한다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ② 각 조항의 “이사회”는 각각 “주주총회”로 보고, “이사회 결의가 있는 때”는 “주주총회의 결의가 있는 때”로 본다.
        </Typography>
      </>
    ),
    key: 0
  }
]

export const ARTICLE_0_RESOLUTION_OF_THE_BOARD_OF_DIRECTORS = [
  {
    item: '이사회의 결의는 이사 과반수의 출석과 출석이사 과반수로 한다.',
    key: 0
  },
  {
    item: '이사회 결의에 특별한 이해관계가 있는 이사는 의결권을 행사하지 못한다.',
    key: 1
  },
  {
    item: '이사회는 이사의 전부 또는 일부가 직접 회의에 출석하지 아니하고 모든 이사가 음성을 동시에 송수신하는 통신수단에 의하여 결의에 참가하는 것을 허용할 수 있다. 이 경우 당 이사는 이사회에 직접 출석한 것으로 본다.',
    key: 2
  }
]

export const ARTICLE_0_MINUTES_OF_BOARD_OF_DIRECTORS = [
  {
    item: '이사회의 의사에 관하여는 의사록을 작성하여야 한다.',
    key: 0
  },
  {
    item: '이사회의사록에는 의사의 안건, 경과요령, 그 겨로가, 반대하는 자와 반대이유를 기재하고 출석한 이사 및 감사가 기명날인 또는 서명하여야 한다.',
    key: 1
  }
]

export const ARTICLE_0_PREPARATION_AND_PROVISION_OF_FINANCIAL_STATEMENTS_AND_BUSINESS_REPORTS = [
  {
    item: '재무상태표',
    key: 0
  },
  {
    item: '손익계산서',
    key: 1
  },
  {
    item: '이익금 처분계산서 또는 결손금 처리계산서',
    key: 2
  },
  {
    item: '영업보고서 및 재산목록',
    key: 3
  }
]

export const ARTICLE_0_DISPOSAL_OF_PROFITS = [
  {
    item: '이익준비금',
    key: 0
  },
  {
    item: '기타의 법정적립금',
    key: 1
  },
  {
    item: '임의적립금',
    key: 2
  },
  {
    item: '배당금',
    key: 3
  },
  {
    item: '기타 이익잉여금 처분액',
    key: 4
  },
  {
    item: '차기이월 이익금',
    key: 4
  }
]

export const ARTICLE_0_PROFIT_DIVIDEND = [
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          당 회사는 재무상태표의 순자산액으로부터 다음의 금액을 공제한 액을 한도로 하여 이익배당을 할 수 있다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 자본금의 액
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ② 그 결산기까지 적립된 자본준비금과 이익준비금의 합계액
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ③ 그 결산기에 적립하여야 할 이익준비금의 액
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ④ 대통령령으로 정하는 미실현이익
        </Typography>
      </>
    ),
    key: 0
  },
  {
    item: '이익배당은 주주총회의 결의로 정하며 현금, 주식, 금전 외의 재산으로 할 수 있다.',
    key: 1
  },
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          제2항에 따라 현물 배당을 할 때에는 이사회의 결의로 다음 각 호의 사항을 정한다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 주주가 배당되는 금전 외의 재산 대신 금전의 지급을 회사에 청구할 수 있도록 한 경우에는 그 금액 및 청구할 수
          있는 기간
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ② 일정 수 미만의 주식을 보유한 주주에게 금전 외의 재산 대신 금전을 지급하기로 한 경우에는 그 일정 수 및 금액
        </Typography>
      </>
    ),
    key: 0
  }
]

export const ARTICLE_0_INTERIM_DIVIDENDS = [
  {
    item: '당 회사는 사업연도 중 1회에 한하여 일정한 날을 정해 그 날의 주주에게 상법 제462조의3에 의한 중간배당을 할 수 있다. 중간배당은 금전, 주식, 금전 외의 재산으로 한다.',
    key: 0
  },
  {
    item: (
      <>
        <Typography cate='body_3' color={'#2C2C34'}>
          중간배당은 직전 결산기의 재무상태표상의 순자산액에서 다음 각 호의 금액을 공제한 액을 한도로 한다.
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ① 직전 결산기의 자본금의 액
        </Typography>
        <Typography cate='body_3' color={'#2C2C34'}>
          ④ 중간배당에 따라 당해 결산기에 적립하여야 할 이익준비금
        </Typography>
      </>
    ),
    key: 1
  },
  {
    item: '당 회사는 당해 결산기의 재무상태표상의 순자산액이 상법 제462조 제1항 각 호의 금액의 합계액에 미치지 못할 우려가 있는 때에는 중간배당을 하여서는 아니된다.',
    key: 2
  },
  {
    item: '제1항의 중간배당은 이사회의 결의로 정한다.',
    key: 3
  },
  {
    item: '당 회사가 사업연도개시일 이후 제1항의 기준일 이전에 신주를 발행한 경우(준비금의 자본전입, 주식배당, 전환사채의 전환청구, 신주인수권 행사, 주식매수선택권의 행사 등), 해당 신주는 직전사업연도말에 발행된 것으로 간주하여 중간배당을 실시한다.',
    key: 4
  }
]

export const ARTICLE_0_DIFFERENTIAL_DIVIDENDS = [
  {
    item: '이익배당을 포기하거나 다른 주주보다 낮은 배당을 받은 주주 전원의 동의가 있는 경우에는 소액주주의 이익을 해치지 않는 범위 내에서 주주들 간에 배당금액을 다르게 설정할 수 있다.',
    key: 0
  },
  {
    item: '차등배당의 결정은 주주 전원의 동의를 받아 주주총회의 승인을 거쳐 이루어져야 하며, 모든 주주가 동등하게 정보를 얻을 수 있도록 제공되어야 한다.',
    key: 1
  },
  {
    item: '차등배당이 이루어질 경우, 배당금액의 차이는 해당 주식의 종류나 주주의 특성, 리스크, 기대 수익 등을 고려하여 합리적으로 결정되어야 한다.',
    key: 2
  }
]

export const ARTICLE_0_USE_OF_PROFITS_FOR_SOCIAL_PURPOSES = [
  {
    item: '근로자의 근로조건 개선(임금인상, 복리후생비, 성과금 등)',
    key: 0
  },
  {
    item: '지역사회 기부 등 사회공헌사업',
    key: 1
  },
  {
    item: '고용확대를 위한 시설투자 등',
    key: 2
  }
]

export const ARTICLE_0_EXTINCTION_OF_RIGHT_TO_CLAM_DIVIDEND_PAYMENT = [
  {
    item: '주주는 배당금 지급을 결정한 결의일로부터 5년 내에 배당금지급청구권을 행사하여야 한다.',
    key: 0
  },
  {
    item: '이익배당금에 대하여는 이자를 지급하지 않는다.',
    key: 1
  },
  {
    item: '소멸시효의 완성 후 배당금은 회사에 귀속된다.',
    key: 2
  }
]

export const ARTICLE_0_COMPENSATION_FOR_EMPLOYEE_INVENTIONS = [
  {
    item: '당 회사의 임직원은 발명진흥법에 따른 직무발명(이 때, “발명”이란 특허법, 실용신안법, 디자인보호법 또는 저작권법에 따라 보호 대상이 되는 발명, 고안 및 창작을 말한다)을 한 때에는 즉시 이 사실을 당 회사에 신고하여야 한다. 또한, 신고 여부와 관계없이 당 회사로부터 명시적인 서면 승인을 받은 경우가 아니라면 제3자에게 발명에 관한 정보를 누설하거나 제3자로 하여금 발명에 관한 정보를 이용하게 할 수 없다.',
    key: 0
  },
  {
    item: '제1항의 경우, 당 회사의 임직원은 특허를 받을 수 있는 권리와 디자인등록을 받을 수 있는 권리를 포함하여 직무발명에 관한 권리를 당 회사에게 양도하고 당 회사는 이를 승계한다. 다만, 당 회사는 발명진흥법 제15조 1항에 따라 임직원에게 정당한 보상을 할 의무를 부담한다.',
    key: 1
  },
  {
    item: '기타 직무발명보상에 관한 사항은 주주총회 결의를 거친 직무발명보상규정에 의한다.',
    key: 2
  }
]

export const ARTICLE_0_TYPES_OF_STOCKS_TO_BE_ISSUED_BY_THE_COMPANY = [
  {
    item: '당 회사의 주식은 보통주식과 종류주식으로 하며, 회사가 발행하는 종류주식은 이익배당 또는 잔여재산분배에 관한 종류주식, 의결권 배제 또는 제한에 관한 주식, 상환주식, 전환주식 및 이들의 전부 또는 일부를 혼합한 주식으로 한다.',
    key: 0
  },
  {
    item: '당 회사가 발행하는 종류주식의 발행 총수는 발행주식 총수의 5분의4 이내로 한다.',
    key: 1
  }
]

export const ARTICLE_0_APPOINTMENT_OF_WORKER_REPRESENTATIVES_AND_OUTSIDE_DIRECTORS = [
  {
    item: '이사 중 1인 이상은 반드시 근로자 대표로 선임하며, 사회서비스 수혜자나 연계기관 인사 등 외부이해관계자를 사외이사로 선임해야 한다.',
    key: 0
  },
  {
    item: '이사는 근로자 대표와 사외이사를 포함하여 선임하여야 하며, 대표자와 직접적 이해관계자는 근로자 대표나 사외이사가 될 수 없다.',
    key: 1
  }
]
