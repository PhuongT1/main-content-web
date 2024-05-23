import { dataStep1Atom } from '@/atoms/home/articles-of-incorporation'
import { Typography } from '@/elements'
import { TStepApi, TStepPayload } from '@/types/step.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, styled, useTheme } from '@mui/material'
import moment from 'moment'
import { useRecoilState } from 'recoil'
import ListItemContractView from '../list-item-contract-view'
import {
  ARTICLE_0_CHAIRMAN_RIGHT_TO_MAINTAIN_ORDER,
  ARTICLE_0_CLOSURE_AND_RECORD_DATE_OF_SHAREHOLDERS_REGISTER,
  ARTICLE_0_COMMITTEES_WITHIN_THE_BOARD_OF_DIRECTORS,
  ARTICLE_0_COMPENSATION_FOR_EMPLOYEE_INVENTIONS,
  ARTICLE_0_COMPOSITION_OF_THE_BOARD_OF_DIRECTORS,
  ARTICLE_0_CONVERTIBLE_PREFERRED_SHARES,
  ARTICLE_0_CONVOCATION_OF_GENERAL_SHAREHOLDERS_MEETING,
  ARTICLE_0_DIFFERENTIAL_DIVIDENDS,
  ARTICLE_0_DISPOSAL_OF_PROFITS,
  ARTICLE_0_DUTIES_OF_AUDITOR,
  ARTICLE_0_EXECUTION_OF_DUTIES_AND_AGENTS,
  ARTICLE_0_EXTINCTION_OF_RIGHT_TO_CLAM_DIVIDEND_PAYMENT,
  ARTICLE_0_INTERIM_DIVIDENDS,
  ARTICLE_0_LIMITATIONS_ON_DUTIES_AND_RESPONSIBILITIES_OF_EXECUTIVES,
  ARTICLE_0_MATTERS_RESOLVED_BY_THE_BOARD_OF_DIRECTORS,
  ARTICLE_0_MINUTES_OF_BOARD_OF_DIRECTORS,
  ARTICLE_0_MULTIPLE_VOTING_SHARES,
  ARTICLE_0_NUMBER_AND_APPOINTMENT_OF_DIRECTORS_AND_AUDITORS,
  ARTICLE_0_NUMBER_AND_APPOINTMENT_OF_WORKER_REPRESENTATIVES_AND_OUTSIDE_DIRECTORS,
  ARTICLE_0_PREFERRED_SHARES_REGARDING_DISTRIBUTION_OF_RESIDUAL_ASSETS,
  ARTICLE_0_PREPARATION_AND_PROVISION_OF_FINANCIAL_STATEMENTS_AND_BUSINESS_REPORTS,
  ARTICLE_0_PROCEDURES_FOR_CONVENING_THE_BOARD_OF_DIRECTORS,
  ARTICLE_0_PROFIT_DIVIDEND,
  ARTICLE_0_REDEEMABLE_CONVERTIBLE_PREFERRED_SHARES,
  ARTICLE_0_REGISTRATION_OF_SECURITY_INTERESTS_AND_INDICATION_OF_TRUST_PROPERTY,
  ARTICLE_0_REISSUANCE_OF_SHARES,
  ARTICLE_0_REPORT_OF_SHAREHOLDER_NAME_ADDRESS,
  ARTICLE_0_RESOLUTION_METHOD_AT_GENERAL_SHAREHOLDERS_MEETING,
  ARTICLE_0_RESOLUTION_OF_THE_BOARD_OF_DIRECTORS,
  ARTICLE_0_SHAREHOLDER_REGISTRY_AND_PROXY_FOR_NAME_CHANGE,
  ARTICLE_0_STOCK_PURCHASE_OPTION,
  ARTICLE_0_STOCK_PURCHASE_OPTION_OF_VENTURE_COMPANY,
  ARTICLE_0_TERM_OF_OFFICE_OF_DIRECTORS_AND_AUDITORS,
  ARTICLE_0_TRANSFER_OF_SHARES,
  ARTICLE_0_TYPES_OF_GENERAL_MEETINGS,
  ARTICLE_0_TYPES_OF_STOCKS_TO_BE_ISSUED_BY_THE_COMPANY,
  ARTICLE_0_USE_OF_PROFITS_FOR_SOCIAL_PURPOSES,
  ARTICLE_0_VOTING,
  PREFERRED_REPAYMENT_SHARES
} from './contant'

interface IViewPdf {
  dataAddtionalContractTerms: TStepPayload<TStepApi>
}

const RedText = styled('span')({
  color: '#FF3932'
})

const ViewPdf = ({ dataAddtionalContractTerms }: IViewPdf) => {
  const {
    palette: { home, main }
  } = useTheme()
  const [dataBasicInformationArticiesOfIncorporationEdit, setDataBasicInformationArticiesOfIncorporationEdit] =
    useRecoilState(dataStep1Atom)

  const companyEstablishmentDate = dataBasicInformationArticiesOfIncorporationEdit?.data?.companyEstablishmentDate
  const companyEstablishmentYear = moment(companyEstablishmentDate).format('YYYY')
  const companyEstablishmentMonth = moment(companyEstablishmentDate).format('MM')
  const companyEstablishmentDateFormat = moment(companyEstablishmentDate).format('DD')

  const handleGetTextTypeThreeForm = (value: string) => {
    switch (value) {
      case '일반 주식회사 주식매수선택권 규정':
        return (
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (주식매수선택권)
            </Typography>
            <ListItemContractView
              listItem={ARTICLE_0_STOCK_PURCHASE_OPTION}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
        )
      case '벤처기업 특례 적용한 주식매수선택권 규정   (2023.7월 개정내용 포함)':
        return (
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (벤처기업의 주식매수선택권)
            </Typography>
            <ListItemContractView
              listItem={ARTICLE_0_STOCK_PURCHASE_OPTION_OF_VENTURE_COMPANY}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
        )
    }
  }

  return (
    <Box
      component={'div'}
      padding={'60px 54px'}
      borderRadius={convertToRem(10)}
      bgcolor={'#fff'}
      width={'100%'}
      height={'100%'}
    >
      <Typography
        cate='title_70'
        color={'#2C2C34'}
        marginBottom={convertToRem(26)}
        display={'flex'}
        justifyContent={'center'}
      >
        정 관
      </Typography>
      <Typography
        cate='body_20'
        color={'#2C2C34'}
        marginBottom={convertToRem(26)}
        display={'flex'}
        justifyContent={'flex-end'}
      >
        제정 {dataBasicInformationArticiesOfIncorporationEdit?.data?.detailedAddress}
      </Typography>
      <Typography
        cate='button_1_semibold'
        color={'#2C2C34'}
        marginBottom={convertToRem(24)}
        display={'flex'}
        justifyContent={'center'}
      >
        제1장 총 칙
      </Typography>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (상호)
        </Typography>
        <Typography cate='button_20' color={main.gray90}>
          당 회사는 “<RedText>{dataBasicInformationArticiesOfIncorporationEdit?.data?.businessNameType}</RedText>
          ”라 칭한다.(이하 “회사”라 한다)
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)}>
        <Typography cate='button_20' color={main.gray90} marginBottom={convertToRem(6)}>
          제0조 (상호)
        </Typography>
        <Typography cate='button_20' color={main.gray90}>
          당 회사는 “<RedText>{dataBasicInformationArticiesOfIncorporationEdit?.data?.businessName}</RedText>
          ”라 칭하며 영문으로는 “
          <RedText>
            {dataBasicInformationArticiesOfIncorporationEdit?.data?.translationBusinessNameType}{' '}
            {dataBasicInformationArticiesOfIncorporationEdit?.data?.translationBusinessName}
          </RedText>
          ”이라 한다.(이하 “회사”라 한다)
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)}>
        <Typography cate='button_20' color={main.gray90} marginBottom={convertToRem(6)}>
          제0조 (목적)
        </Typography>
        <Typography cate='button_20' color={main.gray70}>
          당 회사는 다음의 사업을 경영함을 목적으로 한다.
        </Typography>
        <Box display={'flex'} flexDirection={'column'} gap={convertToRem(6)}>
          {dataBasicInformationArticiesOfIncorporationEdit?.data?.organization.map((e, i) => {
            return (
              <Typography cate='body_3' key={`e_${i}`}>
                <RedText>
                  {Number(i + 1)}. {e?.name}
                </RedText>
              </Typography>
            )
          })}
        </Box>
      </Box>
      {dataAddtionalContractTerms?.data.data?.typeOne?.socialValueSector && (
        <Box>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (사회적가치 추구)
            </Typography>
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(10)}>
              <Typography cate='body_3' color={main.gray50}>
                당 회사는 사회적 가치 추구 및 사회적 문제 해결을 위해
                <RedText> {dataAddtionalContractTerms?.data?.data?.typeOne?.socialValueSector}</RedText>을 기반으로
                <RedText> {dataAddtionalContractTerms?.data?.data?.typeOne?.detail}</RedText> 를 만들기 위해
                비즈니스모델 수립 및 관련 제품과 서비스 개발을 통한 기업 활동을 추진한다.
              </Typography>
            </Box>
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (사회적 성과의 측정 및 보고체계)
            </Typography>
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(10)}>
              <Typography cate='body_3' color={main.gray50}>
                1. 당 회사는 당사의 활동으로 창출된 사회적 가치의 구체적인 성과를 측정하기 위해 회사의 경영진, 부서
                대표, 이해관계자 등 3인 이상으로 ‘소셜벤처위원회’를 구성한다.
              </Typography>
              <Typography cate='body_3' color={main.gray50}>
                2. 사회적 성과의 측정은 ‘소셜벤처위원회’가 주관하며 최소 연 1회 이상 실시한다.
              </Typography>
              <Typography cate='body_3' color={main.gray50}>
                3. 사회적 성과보고서는 측정 결과, 측정 방식, 그리고 그에 대한 해석 및 개선 계획 등을 포함해야 하며 당
                회사의 홈페이지를 통해 이해관계자 및 일반 대중에게 공개해야 한다.
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (본점의 소재지 및 지점 등의 설치)
        </Typography>
        <Box display={'flex'} flexDirection={'column'} gap={convertToRem(10)}>
          <Typography cate='body_3' color={main.gray50}>
            1. 당 회사의 본점은 대한민국{' '}
            <RedText>{dataBasicInformationArticiesOfIncorporationEdit?.data?.headquartersLocation}</RedText> 내에
            설치한다.
          </Typography>
          <Typography cate='body_3' color={main.gray50}>
            2. 당 회사는 필요에 따라 이사회의 결의로 국내 또는 국외에 지점, 사무소 및 현지법인을 둘 수 있다.
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (공고방법)
        </Typography>
        <Box display={'flex'} flexDirection={'column'} gap={convertToRem(10)}>
          <Typography cate='body_3' color={main.gray50}>
            1. 당 회사의 공고는 회사의 인터넷 홈페이지(
            <RedText>{dataBasicInformationArticiesOfIncorporationEdit?.data?.companyWebsite}</RedText>)에 한다.
          </Typography>
          <Typography cate='body_3' color={main.gray50}>
            2. 다만, 전산장애 또는 그 밖의 부득이한 사유로 회사의 인터넷 홈페이지에 공고를 할 수 없는 때에는 서울특별시
            내에서 발행하는 일간 머니투데이(합병 또는 개칭이 있는 경우 그 승계신문)에 한다.
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (공고방법)
        </Typography>
        <Typography cate='body_3' color={main.gray50}>
          다만, 전산장애 또는 그 밖의 부득이한 사유로 회사의 인터넷 홈페이지에 공고를 할 수 없는 때에는
          <RedText> {dataBasicInformationArticiesOfIncorporationEdit?.data?.publicationArea}</RedText> 내에서 발행하는
          일간 <RedText>{dataBasicInformationArticiesOfIncorporationEdit?.data?.media}</RedText>
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(60)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (외국인에 대한 공고와 보고)
        </Typography>
        <Typography cate='body_3' color={main.gray50}>
          법령 또는 본 정관에 따라 외국인 또는 외국법인에 직접 전달되어야 하는 모든 통지와 보고는 영문으로 작성되어야
          한다.
        </Typography>
      </Box>
      <Typography
        cate='button_1_semibold'
        color={main.gray70}
        justifyContent={'center'}
        alignItems={'center'}
        display={'flex'}
        marginBottom={convertToRem(24)}
      >
        제2장 총 칙
      </Typography>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (회사가 발행할 주식의 총수)
        </Typography>
        <Typography cate='body_3' color={main.gray90}>
          당 회사가 장래에 발행할 주식의 총수(이하 “수권주식”이라 한다)는 일천만{' '}
          <RedText>{dataBasicInformationArticiesOfIncorporationEdit?.data?.totalNumberShares}</RedText> 주로 한다. 당
          회사의 주식은 보통주식으로 한다.
        </Typography>
      </Box>
      {!!dataAddtionalContractTerms?.data?.data?.typeTwo?.isActive ? (
        <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
          <Typography cate='button_20' color={main.gray90}>
            제0조 (회사가 발행할 주식의 종류)
          </Typography>
          <ListItemContractView
            listItem={ARTICLE_0_TYPES_OF_STOCKS_TO_BE_ISSUED_BY_THE_COMPANY}
            styleListItem={{
              color: main.gray50,
              marginLeft: convertToRem(20),
              display: 'flex',
              flexDirection: 'column',
              gap: convertToRem(10)
            }}
            styleItem={{
              color: main.gray50
            }}
          />
        </Box>
      ) : (
        <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
          <Typography cate='button_20' color={main.gray90}>
            제0조 (회사가 발행할 주식의 종류)
          </Typography>
          <Typography cate='body_3' color={main.gray90}>
            당 회사의 주식은 보통주식으로 한다.
          </Typography>
        </Box>
      )}
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (1주의 액면가)
        </Typography>
        <Typography cate='body_3' color={main.gray90}>
          당 회사가 발행하는 주식 1주의 액면가는{' '}
          <RedText>{dataBasicInformationArticiesOfIncorporationEdit?.data?.pricePerShare}</RedText> 원으로 한다.
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (설립과 동시에 발행하는 주식의 총수)
        </Typography>
        <Typography cate='body_3' color={main.gray50}>
          당 회사가 설립과 동시에 발행하는 주식의 총수는{' '}
          <RedText>{dataBasicInformationArticiesOfIncorporationEdit?.data?.totalNumberShares}</RedText> 주로 한다.
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (주권)
        </Typography>
        <Typography cate='body_3' color={main.gray50}>
          본 회사의 주식은 기명주식으로서, 주권은 1주권, 5주권, 10주권, 50주권, 100주권, 500주권, 1,000주권의 7종으로
          한다.
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (주금납입의 지체)
        </Typography>
        <Typography cate='body_3' color={main.gray50}>
          신주인수인, 발기인 또는 주주는 주금납입을 지체할 경우, 당 회사에게 납입기일 다음날부터 납입을 완료할 때까지
          납입을 지체한 주금에 관하여 연 20%의 비율로 계산한 지연손해금을 배상하여야 한다.
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (주식의 소각)
        </Typography>
        <Box display={'flex'} flexDirection={'column'} gap={convertToRem(10)}>
          <Typography cate='body_3' color={main.gray50}>
            1. 당 회사는 주주에게 배당할 이익의 범위(다만, 당해 사업년도말 상법제462조 제1항의 규정에 의한 이익 배당을
            할 수 있는 한도 안에서 관계법령이 정하는 금액 이하이어야 한다.) 내에서 관계 법령이 정하는 바에 따라 이사회
            결의로 당 회사의 주식을 소각할 수 있다.
          </Typography>
          <Typography cate='body_3' color={main.gray50}>
            2. 회사는 이사회의 결의에 의하여 회사가 보유하는 자기주식을 소각할 수 있다.
          </Typography>
        </Box>
      </Box>
      {dataAddtionalContractTerms?.data?.data?.typeTwo?.isActive && (
        <>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (우선주식)
            </Typography>
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(10)}>
              <Typography cate='body_3' color={main.gray50}>
                1. 당 회사는 의결권 없는 우선주식과 의결권 있는 우선주식을 발행할 수 있다.
              </Typography>
              <Typography cate='body_3' color={main.gray50}>
                2. 우선주식에 대하여는 우선배당한다. 우선주식에 대한 우선배당은 이사회가 정한 배당률에 따라 현금으로
                지급한다.
              </Typography>
              <Typography cate='body_3' color={main.gray50}>
                3. 우선주식에 대하여 제2항에 따른 배당을 하고 보통주식에 대하여 종류주식의 배당률과 동률의 배당을 한 후,
                잔여배당가능이익이 있으면 보통주식과 우선주식에 대하여 동등한 비율로 배당한다.
              </Typography>
              <Typography cate='body_3' color={main.gray50}>
                4. 우선주식에 대하여 제2항에 따른 배당을 하지 못한 사업연도가 있는 경우에는 미배당분을 누적하여 다음
                사업연도의 배당시에 우선하여 배당한다.
              </Typography>
              <Typography cate='body_3' color={main.gray50}>
                5. 우선주식의 주주에게는 종류주식에 대하여 제2항에 따른 배당을 하지 아니한다는 결의가 있는 총회의 다음
                총회부터 그 우선적 배당을 한다는 결의가 있는 총회의 종료시까지는 의결권이 있는 것으로 정할 수 있다.
              </Typography>
            </Box>
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (전환우선주식)
            </Typography>
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(10)}>
              <Typography cate='body_3' color={main.gray50}>
                1. 당 회사는 이시회 결의를 통하여 보통주식 또는 우선주식으로 전환할 수 있는 전환우선주식을 발행할 수
                있다.
              </Typography>
              <Typography cate='body_3' color={main.gray50}>
                2. 전환우선주식에 대하여는 우선배당한다. 전환우선주식에 대한 우선배당은 이사회가 정한 배당률에 따라
                현금으로 지급한다.
              </Typography>
              <Typography cate='body_3' color={main.gray50}>
                3. 전환우선주식에 대하여 제2항에 따른 배당을 하고 보통주식에 대하여 종류주식의 배당률과 동률의 배당을 한
                후, 잔여배당가능이익이 있으면 보통주식과 우선주식에 대하여 동등한 비율로 배당한다.
              </Typography>
              <Typography cate='body_3' color={main.gray50}>
                4. 전환우선주식에 대하여 제2항에 따른 배당을 하지 못한 사업연도가 있는 경우에는 미배당분을 누적하여 다음
                사업연도의 배당시에 우선하여 배당한다.
              </Typography>
              <Typography cate='body_3' color={main.gray50}>
                5. 전환우선주식의 주주에게는 종류주식에 대하여 제2항에 따른 배당을 하지 아니한다는 결의가 있는 총회의
                다음 총회부터 그 우선적 배당을 한다는 결의가 있는 총회의 종료시까지는 의결권이 있는 것으로 정할 수 있다.
              </Typography>
              <Typography cate='body_3' color={main.gray50}>
                6. 전환권의 행사로 인하여 발행하는 신주식의 발행가액 및 주식의 수는 전환하기 전의 주식의 발행가액 및
                주식의 수와 동일하다
              </Typography>
              <Typography cate='body_3' color={main.gray50}>
                7. 전환주식의 전환 또는 전환청구를 할 수 있는 기간은 30년 이내의 범위에서 전환주식 발행 시 이사회 결의로
                정한다
              </Typography>
              <Typography cate='body_3' color={main.gray50}>
                8. 제6항 및 제7항의 전환으로 인하여 발행할 주식은 보통주식으로 하고, 그 전환비율은 발행 시 이사회 결의로
                정한다.
              </Typography>
            </Box>
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (상환우선주식)
            </Typography>
            <ListItemContractView
              listItem={PREFERRED_REPAYMENT_SHARES}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (상환우선주식)
            </Typography>
            <ListItemContractView
              listItem={ARTICLE_0_CONVERTIBLE_PREFERRED_SHARES}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (상환전환우선주식)
            </Typography>
            <ListItemContractView
              listItem={ARTICLE_0_REDEEMABLE_CONVERTIBLE_PREFERRED_SHARES}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (잔여재산분배에 관한 우선주식)
            </Typography>
            <ListItemContractView
              listItem={ARTICLE_0_PREFERRED_SHARES_REGARDING_DISTRIBUTION_OF_RESIDUAL_ASSETS}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
        </>
      )}
      {handleGetTextTypeThreeForm(dataAddtionalContractTerms?.data?.data?.typeThree?.socialValueCompany)}

      {dataAddtionalContractTerms?.data?.data?.typeTen?.isActive && (
        <>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (복수의결주식)
            </Typography>
            <ListItemContractView
              listItem={ARTICLE_0_MULTIPLE_VOTING_SHARES}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
        </>
      )}
      {dataAddtionalContractTerms?.data?.data?.typeFour?.socialValueCompany && (
        <>
          <Typography
            cate='button_1_semibold'
            color={main.gray70}
            justifyContent={'center'}
            alignItems={'center'}
            display={'flex'}
            marginBottom={convertToRem(24)}
          >
            제2장 주식
          </Typography>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (주주명부와 명의개서대리인)
            </Typography>
            <ListItemContractView
              listItem={ARTICLE_0_SHAREHOLDER_REGISTRY_AND_PROXY_FOR_NAME_CHANGE}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (질권의 등록 및 신탁재산의 표시)
            </Typography>
            <ListItemContractView
              listItem={ARTICLE_0_REGISTRATION_OF_SECURITY_INTERESTS_AND_INDICATION_OF_TRUST_PROPERTY}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (주권의 재발행)
            </Typography>
            <ListItemContractView
              listItem={ARTICLE_0_REISSUANCE_OF_SHARES}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (주주명부의 폐쇄 및 기준일)
            </Typography>
            <ListItemContractView
              listItem={ARTICLE_0_CLOSURE_AND_RECORD_DATE_OF_SHAREHOLDERS_REGISTER}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (주주의 성명, 주소 등의 신고)
            </Typography>
            <ListItemContractView
              listItem={ARTICLE_0_REPORT_OF_SHAREHOLDER_NAME_ADDRESS}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
        </>
      )}
      {dataAddtionalContractTerms?.data?.data?.typeFour?.socialValueCompany === '자유롭게 주식양도 가능' ? (
        <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
          <Typography cate='button_20' color={main.gray90}>
            제0조 (주식의 양도)
          </Typography>
          <Typography cate='body_3' color={main.gray50}>
            주주는 주식의 양도를 원할 경우 자유롭게 양도가 가능하다.
          </Typography>
        </Box>
      ) : (
        <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
          <Typography cate='button_20' color={main.gray90}>
            제0조 (주식의 양도)
          </Typography>
          <ListItemContractView
            listItem={ARTICLE_0_TRANSFER_OF_SHARES}
            styleListItem={{
              color: main.gray50,
              marginLeft: convertToRem(20),
              display: 'flex',
              flexDirection: 'column',
              gap: convertToRem(10)
            }}
            styleItem={{
              color: main.gray50
            }}
          />
        </Box>
      )}
      <Typography
        cate='button_1_semibold'
        color={main.gray70}
        justifyContent={'center'}
        alignItems={'center'}
        display={'flex'}
        marginBottom={convertToRem(24)}
      >
        제3장 주주 총회
      </Typography>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (총회의 종류)
        </Typography>
        <ListItemContractView
          listItem={ARTICLE_0_TYPES_OF_GENERAL_MEETINGS}
          styleListItem={{
            color: main.gray50,
            marginLeft: convertToRem(20),
            display: 'flex',
            flexDirection: 'column',
            gap: convertToRem(10)
          }}
          styleItem={{
            color: main.gray50
          }}
        />
      </Box>
      {dataAddtionalContractTerms?.data.data?.typeFive?.isActive && (
        <>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (주주총회의 소집)
            </Typography>
            <ListItemContractView
              listItem={ARTICLE_0_CONVOCATION_OF_GENERAL_SHAREHOLDERS_MEETING}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
        </>
      )}
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (의장)
        </Typography>
        <Typography cate='body_3' color={main.gray50}>
          대표이사가 주주총회의 의장이 된다. 단, 대표이사 부재나 유고가 있을 경우에는 이사회에서 선임한 다른 이사가
          의장이 된다.
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (의장의 질서유지권)
        </Typography>
        <ListItemContractView
          listItem={ARTICLE_0_CHAIRMAN_RIGHT_TO_MAINTAIN_ORDER}
          styleListItem={{
            color: main.gray50,
            marginLeft: convertToRem(20),
            display: 'flex',
            flexDirection: 'column',
            gap: convertToRem(10)
          }}
          styleItem={{
            color: main.gray50
          }}
        />
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (주주총회의 의결방법)
        </Typography>
        <ListItemContractView
          listItem={ARTICLE_0_RESOLUTION_METHOD_AT_GENERAL_SHAREHOLDERS_MEETING}
          styleListItem={{
            color: main.gray50,
            marginLeft: convertToRem(20),
            display: 'flex',
            flexDirection: 'column',
            gap: convertToRem(10)
          }}
          styleItem={{
            color: main.gray50
          }}
        />
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (표결)
        </Typography>
        <ListItemContractView
          listItem={ARTICLE_0_VOTING}
          styleListItem={{
            color: main.gray50,
            marginLeft: convertToRem(20),
            display: 'flex',
            flexDirection: 'column',
            gap: convertToRem(10)
          }}
          styleItem={{
            color: main.gray50
          }}
        />
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (총회의 연기 또는 속행)
        </Typography>
        <Typography cate='body_3' color={main.gray50}>
          총회에서는 회의의 연기 또는 속행을 결의할 수 있다. 단, 연기 또는 속행된 회의일까지의 총 일수는 14일을 초과하지
          못한다.
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (총회의 의사록)
        </Typography>
        <Typography cate='body_3' color={main.gray50}>
          주주총회의 의사에 관하여는 그 경과와 결의 내용을 기재한 의사록을 작성하고 의장과 출석한 이사 전원이 기명날인
          또는 서명하여 본점에 비치한다.
        </Typography>
      </Box>
      <Typography
        cate='button_1_semibold'
        color={main.gray70}
        justifyContent={'center'}
        alignItems={'center'}
        display={'flex'}
        marginBottom={convertToRem(24)}
      >
        제4장 이사와 임원
      </Typography>
      {dataAddtionalContractTerms?.data?.data?.typeFive?.isActive && (
        <>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (이사와 감사의 수 및 선임)
            </Typography>
            <ListItemContractView
              listItem={ARTICLE_0_NUMBER_AND_APPOINTMENT_OF_DIRECTORS_AND_AUDITORS}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
        </>
      )}
      {dataAddtionalContractTerms?.data.data?.typeOne?.socialValueSector && (
        <>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (근로자 대표와 사외외사 수 및 선임)
            </Typography>
            <ListItemContractView
              listItem={ARTICLE_0_NUMBER_AND_APPOINTMENT_OF_WORKER_REPRESENTATIVES_AND_OUTSIDE_DIRECTORS}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
        </>
      )}
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (이사 및 감사의 임기)
        </Typography>
        <ListItemContractView
          listItem={ARTICLE_0_TERM_OF_OFFICE_OF_DIRECTORS_AND_AUDITORS}
          styleListItem={{
            color: main.gray50,
            marginLeft: convertToRem(20),
            display: 'flex',
            flexDirection: 'column',
            gap: convertToRem(10)
          }}
          styleItem={{
            color: main.gray50
          }}
        />
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (대표이사)
        </Typography>
        <Typography cate='body_3' color={main.gray50}>
          당 회사는 이사회 결의를 통하여 대표이사를 선임한다. 다만, 본 회사의 이사가 2명 이하여서 이사회가 성립하지 않는
          경우, 주주총회 결의를 통하여 대표이사를 선임한다.
        </Typography>
      </Box>
      {!!dataAddtionalContractTerms?.data.data?.typeSeven?.regulation ? (
        <>
          <Typography cate='button_20' color={main.gray90}>
            제0조 (대표이사)
          </Typography>
          <Typography cate='body_3' color={main.gray50} marginBottom={convertToRem(24)}>
            대표이사는 당 회사를 대표하고, 대표이사가 수 명일 때는 각자 또는 공동으로 회사를 대표할 수 있다.
          </Typography>
        </>
      ) : (
        <>
          <Typography cate='button_20' color={main.gray90}>
            제0조 (대표이사의 선임)
          </Typography>
          <Typography cate='body_3' color={main.gray50} marginBottom={convertToRem(24)}>
            대표이사는 당 회사를 대표하고, 대표이사는 1명으로 둔다.
          </Typography>
        </>
      )}
      {dataAddtionalContractTerms?.data.data?.typeNine?.isActive && (
        <>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (대표이사)
            </Typography>
            <Typography cate='body_3' color={main.gray50}>
              대표이사는 당 회사를 대표하고, 대표이사는 1명으로 둔다.
            </Typography>
          </Box>
        </>
      )}
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (업무집행 및 직무대행자)
        </Typography>
        <ListItemContractView
          listItem={ARTICLE_0_EXECUTION_OF_DUTIES_AND_AGENTS}
          styleListItem={{
            color: main.gray50,
            marginLeft: convertToRem(20),
            display: 'flex',
            flexDirection: 'column',
            gap: convertToRem(10)
          }}
          styleItem={{
            color: main.gray50
          }}
        />
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (임원의 의무와 책임제한)
        </Typography>
        <ListItemContractView
          listItem={ARTICLE_0_LIMITATIONS_ON_DUTIES_AND_RESPONSIBILITIES_OF_EXECUTIVES}
          styleListItem={{
            color: main.gray50,
            marginLeft: convertToRem(20),
            display: 'flex',
            flexDirection: 'column',
            gap: convertToRem(10)
          }}
          styleItem={{
            color: main.gray50
          }}
        />
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (감사의 직무)
        </Typography>
        <ListItemContractView
          listItem={ARTICLE_0_DUTIES_OF_AUDITOR}
          styleListItem={{
            color: main.gray50,
            marginLeft: convertToRem(20),
            display: 'flex',
            flexDirection: 'column',
            gap: convertToRem(10)
          }}
          styleItem={{
            color: main.gray50
          }}
        />
      </Box>
      {Boolean(dataAddtionalContractTerms?.data?.data?.typeEight?.directorCompensation) && (
        <>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (임원의 연간보수한도)
            </Typography>
            <ListItemContractView
              listItem={[
                {
                  item: (
                    <Typography cate='body_3' color={'#2C2C34'}>
                      임원의 보수(여기서 보수란 퇴직을 원인으로 지급받는 소득을 제외하고 급여, 상여금, 인센티브 등
                      매년의 경영성과에 따라 근로제공의 대가로 받는 보수를 말한다)는 대표이사의 경우 1인당 연간{' '}
                      <RedText>{dataAddtionalContractTerms?.data?.data?.typeEight?.representativeCompensation}</RedText>
                      , 이사 및 감사의 경우 1인당 연간
                      <RedText>{dataAddtionalContractTerms?.data?.data?.typeEight?.directorPaySeverant}</RedText> 한도로
                      한다.
                    </Typography>
                  ),
                  key: 0
                },
                {
                  item: '임원의 보수와 관련된 사항은 주주총회 또는 이사회의 결의를 거친 임원 보수 규정 및 임원 상여금 지급 규정에 의한다.',
                  key: 1
                }
              ]}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (임원의 유족보상금)
            </Typography>
            <ListItemContractView
              listItem={[
                {
                  item: (
                    <Typography cate='body_3' color={'#2C2C34'}>
                      재임 중 업무상 사망한 임원에 대한 유족보상금은 평균임금의{' '}
                      <RedText>{dataAddtionalContractTerms?.data?.data?.typeEight?.duty}</RedText> 이내로 이사회의
                      결의를 통해 정해진 유족보상금을 유족에게 지급하고 장례비의 경우 지급사유 발생시 지체없이
                      평균임금의 120일분 이내의 장례비를 지급할 수 있다.
                    </Typography>
                  ),
                  key: 0
                },
                {
                  item: '업무상 이외의 사유로 사망한 경우 순직한 경우의 50% 범위 내에서 이사회에서 결정하여 지급할 수 있다.',
                  key: 1
                },
                {
                  item: '임원에 대한 유족보상금의 지급은 주주총회 또는 이사회의 결의를 거친 유족보상금 지급 규정에 의한다.',
                  key: 2
                }
              ]}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (임원의 퇴직금 한도)
            </Typography>
            <ListItemContractView
              listItem={[
                {
                  item: (
                    <Typography cate='body_3' color={'#2C2C34'}>
                      임원에 대한 퇴직금은 근속기간이 1년이 넘은 임원이 해당하며 대표이사의 경우{' '}
                      <RedText>{dataAddtionalContractTerms?.data?.data?.typeEight?.representativePaySeverant}</RedText>,
                      이사 및 감사의 경우{' '}
                      <RedText>{dataAddtionalContractTerms?.data?.data?.typeEight?.directorCompensation}</RedText>{' '}
                      한도로 근무기간 및 기여도를 반영하여 주주총회 또는 이사회 결의를 거쳐 정한다.
                    </Typography>
                  ),
                  key: 0
                },
                {
                  item: '임원의 보수와 관련된 사항은 주주총회 또는 이사회의 결의를 거친 임원 보수 규정 및 임원 상여금 지급 규정에 의한다.',
                  key: 1
                }
              ]}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
        </>
      )}
      <Typography
        cate='button_1_semibold'
        color={main.gray70}
        justifyContent={'center'}
        alignItems={'center'}
        display={'flex'}
        marginBottom={convertToRem(24)}
      >
        제5장 이사회
      </Typography>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (이사회의 구성)
        </Typography>
        <ListItemContractView
          listItem={ARTICLE_0_COMPOSITION_OF_THE_BOARD_OF_DIRECTORS}
          styleListItem={{
            color: main.gray50,
            marginLeft: convertToRem(20),
            display: 'flex',
            flexDirection: 'column',
            gap: convertToRem(10)
          }}
          styleItem={{
            color: main.gray50
          }}
        />
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (이사회 내의 위원회)
        </Typography>
        <ListItemContractView
          listItem={ARTICLE_0_COMMITTEES_WITHIN_THE_BOARD_OF_DIRECTORS}
          styleListItem={{
            color: main.gray50,
            marginLeft: convertToRem(20),
            display: 'flex',
            flexDirection: 'column',
            gap: convertToRem(10)
          }}
          styleItem={{
            color: main.gray50
          }}
        />
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (이사회의 소집절차)
        </Typography>
        <ListItemContractView
          listItem={ARTICLE_0_PROCEDURES_FOR_CONVENING_THE_BOARD_OF_DIRECTORS}
          styleListItem={{
            color: main.gray50,
            marginLeft: convertToRem(20),
            display: 'flex',
            flexDirection: 'column',
            gap: convertToRem(10)
          }}
          styleItem={{
            color: main.gray50
          }}
        />
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (이사회의 의결사항)
        </Typography>
        <ListItemContractView
          listItem={ARTICLE_0_MATTERS_RESOLVED_BY_THE_BOARD_OF_DIRECTORS}
          styleListItem={{
            color: main.gray50,
            marginLeft: convertToRem(20),
            display: 'flex',
            flexDirection: 'column',
            gap: convertToRem(10)
          }}
          styleItem={{
            color: main.gray50
          }}
        />
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (이사회의 결의)
        </Typography>
        <ListItemContractView
          listItem={ARTICLE_0_RESOLUTION_OF_THE_BOARD_OF_DIRECTORS}
          styleListItem={{
            color: main.gray50,
            marginLeft: convertToRem(20),
            display: 'flex',
            flexDirection: 'column',
            gap: convertToRem(10)
          }}
          styleItem={{
            color: main.gray50
          }}
        />
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (이사회의 의사록)
        </Typography>
        <ListItemContractView
          listItem={ARTICLE_0_MINUTES_OF_BOARD_OF_DIRECTORS}
          styleListItem={{
            color: main.gray50,
            marginLeft: convertToRem(20),
            display: 'flex',
            flexDirection: 'column',
            gap: convertToRem(10)
          }}
          styleItem={{
            color: main.gray50
          }}
        />
      </Box>
      <Typography
        cate='button_1_semibold'
        color={main.gray70}
        justifyContent={'center'}
        alignItems={'center'}
        display={'flex'}
        marginBottom={convertToRem(24)}
      >
        제6장 회 계
      </Typography>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (사업연도)
        </Typography>
        <Typography cate='body_3' color={main.gray50}>
          당 회사의 사연연도는 매년 1월1일부터 12월31일까지로 한다.
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (재무제표, 영업보고서의 작성 비치)
        </Typography>
        <>
          <Typography cate='body_3' color={main.gray50}>
            당 회사의 이사는 정기 주주총회일의 6주 전에 다음 서류를 감사에게 제출하여야 하고, 감사는 위 서류를 받은
            날로부터 4주 내에 감사보고서를 이사에게 제출하여야 한다.
          </Typography>
          <ListItemContractView
            listItem={ARTICLE_0_PREPARATION_AND_PROVISION_OF_FINANCIAL_STATEMENTS_AND_BUSINESS_REPORTS}
            styleListItem={{
              color: main.gray50,
              marginLeft: convertToRem(20),
              display: 'flex',
              flexDirection: 'column',
              gap: convertToRem(10)
            }}
            styleItem={{
              color: main.gray50
            }}
          />
        </>
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (이익금의 처분)
        </Typography>
        <>
          <Typography cate='body_3' color={main.gray50}>
            당 회사는 매 회계연도의 이익금(전 회계년도에서 이월된 이익잉여금 포함)을 다음의 순서에 따라 처분한다.
          </Typography>
          <ListItemContractView
            listItem={ARTICLE_0_DISPOSAL_OF_PROFITS}
            styleListItem={{
              color: main.gray50,
              marginLeft: convertToRem(20),
              display: 'flex',
              flexDirection: 'column',
              gap: convertToRem(10)
            }}
            styleItem={{
              color: main.gray50
            }}
          />
        </>
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (이익배당)
        </Typography>
        <ListItemContractView
          listItem={ARTICLE_0_PROFIT_DIVIDEND}
          styleListItem={{
            color: main.gray50,
            marginLeft: convertToRem(20),
            display: 'flex',
            flexDirection: 'column',
            gap: convertToRem(10)
          }}
          styleItem={{
            color: main.gray50
          }}
        />
      </Box>
      {Boolean(dataAddtionalContractTerms?.data?.data?.typeSix?.regulation === '중간배당') ? (
        <>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (중간배당)
            </Typography>
            <ListItemContractView
              listItem={ARTICLE_0_INTERIM_DIVIDENDS}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </Box>
        </>
      ) : (
        <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
          <Typography cate='button_20' color={main.gray90}>
            제0조 (차등배당)
          </Typography>
          <ListItemContractView
            listItem={ARTICLE_0_DIFFERENTIAL_DIVIDENDS}
            styleListItem={{
              color: main.gray50,
              marginLeft: convertToRem(20),
              display: 'flex',
              flexDirection: 'column',
              gap: convertToRem(10)
            }}
            styleItem={{
              color: main.gray50
            }}
          />
        </Box>
      )}
      {dataAddtionalContractTerms?.data.data?.typeOne?.socialValueSector && (
        <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
          <Typography cate='button_20' color={main.gray90}>
            제0조 (이익금의 사회적 목적 사용)
          </Typography>
          <>
            <Typography cate='body_3' color={main.gray50}>
              위 제1항 3호의 사회적 목적을 위한 사용은 다음의 용도로 사용한다.
            </Typography>
            <ListItemContractView
              listItem={ARTICLE_0_USE_OF_PROFITS_FOR_SOCIAL_PURPOSES}
              styleListItem={{
                color: main.gray50,
                marginLeft: convertToRem(20),
                display: 'flex',
                flexDirection: 'column',
                gap: convertToRem(10)
              }}
              styleItem={{
                color: main.gray50
              }}
            />
          </>
        </Box>
      )}
      {
        <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
          <Typography cate='button_20' color={main.gray90}>
            제0조 (배당금지급청구권의 소멸)
          </Typography>
          <ListItemContractView
            listItem={ARTICLE_0_EXTINCTION_OF_RIGHT_TO_CLAM_DIVIDEND_PAYMENT}
            styleListItem={{
              color: main.gray50,
              marginLeft: convertToRem(20),
              display: 'flex',
              flexDirection: 'column',
              gap: convertToRem(10)
            }}
            styleItem={{
              color: main.gray50
            }}
          />
        </Box>
      }
      <Typography
        cate='button_1_semibold'
        color={main.gray70}
        justifyContent={'center'}
        alignItems={'center'}
        display={'flex'}
        marginBottom={convertToRem(24)}
      >
        제7장 기타 규정
      </Typography>
      {dataAddtionalContractTerms?.data.data?.typeNine?.isActive && (
        <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
          <Typography cate='button_20' color={main.gray90}>
            제0조 (임직원의 직무발명보상)
          </Typography>
          <ListItemContractView
            listItem={ARTICLE_0_COMPENSATION_FOR_EMPLOYEE_INVENTIONS}
            styleListItem={{
              color: main.gray50,
              marginLeft: convertToRem(20),
              display: 'flex',
              flexDirection: 'column',
              gap: convertToRem(10)
            }}
            styleItem={{
              color: main.gray50
            }}
          />
        </Box>
      )}
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (발기인의 성명, 주소 등)
        </Typography>
        <Typography cate='body_3' color={main.gray50}>
          당 회사의 발기인의 성명, 주민등록번호 및 주소는 이 정관 말미에 기재한다
        </Typography>
      </Box>
      <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
        <Typography cate='button_20' color={main.gray90}>
          제0조 (내부규정)
        </Typography>
        <Typography cate='body_3' color={main.gray50}>
          당 회사는 회사 경영에 필요한 규정 등 내규를 이사회의 승인을 받아 채택할 수 있다.
        </Typography>
      </Box>
      {dataAddtionalContractTerms?.data.data?.typeOne?.socialValueSector && (
        <>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (해산 시 잔여재산의 처분)
            </Typography>
            <Typography cate='body_3' color={main.gray50}>
              당 회사의 해산 시 부채를 변제하고도 배분가능한 잔여재산이 발생하는 경우 3분의 2 이상을 다른 사회적기업 및
              공익적 기금 등에 기부한다.
            </Typography>
          </Box>
          <Box display={'flex'} flexDirection={'column'} marginBottom={convertToRem(24)} gap={convertToRem(6)}>
            <Typography cate='button_20' color={main.gray90}>
              제0조 (종사자의 구성 및 임면)
            </Typography>
            <Typography cate='body_3' color={main.gray50}>
              종사자의 구성 및 임면에 관하여는 이사회 결의로 별도의 인사규정을 두어 정한다.
            </Typography>
          </Box>
        </>
      )}
      <Typography
        cate='button_1_semibold'
        color={main.gray70}
        justifyContent={'center'}
        alignItems={'center'}
        display={'flex'}
        marginBottom={convertToRem(24)}
      >
        부 칙
      </Typography>
      <Typography
        cate='button_2_semibold'
        color={main.gray90}
        justifyContent={'center'}
        alignItems={'center'}
        display={'flex'}
        marginBottom={convertToRem(24)}
      >
        이 정관은{' '}
        <RedText>
          {' '}
          {companyEstablishmentYear}년 {companyEstablishmentMonth}월 {companyEstablishmentDateFormat}일{' '}
        </RedText>
        부터 시행한다.
      </Typography>
      <Typography
        cate='body_3'
        color={main.gray50}
        sx={{
          marginBottom: convertToRem(24)
        }}
      >
        발기인
      </Typography>
      {dataBasicInformationArticiesOfIncorporationEdit?.data?.data?.map((e, i) => {
        return (
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            key={i}
            marginBottom={convertToRem(24)}
          >
            <Box display={'flex'} flexDirection={'column'} gap={convertToRem(8)}>
              <Typography cate='caption_1_semibold' color={home.blue500}>
                {e?.name} {e?.numberContributedShares} {e?.position} {e?.investmentAmount}
              </Typography>
              <Typography cate='caption_1_semibold' color={home.blue500}>
                {e?.address}
              </Typography>
            </Box>
            <Typography cate='body_3_medium' color={home.blue500}>
              (서명/인)
            </Typography>
          </Box>
        )
      })}
      <Typography
        cate='button_1_semibold'
        color={main.gray50}
        sx={{
          marginBottom: convertToRem(24),
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        주식회사 메인콘텐츠
      </Typography>
      <Typography
        cate='button_1_semibold'
        color={main.gray50}
        sx={{
          marginBottom: convertToRem(24),
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        동작구 상도로 65 금성빌딩 6층
      </Typography>
    </Box>
  )
}

export default ViewPdf
