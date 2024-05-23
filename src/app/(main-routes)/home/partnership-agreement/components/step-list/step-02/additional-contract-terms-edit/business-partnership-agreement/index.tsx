import { dataStep1Atom } from '@/atoms/home/partnership-agreement'
import { Typography } from '@/elements'
import { IBusinessPartner, IDetail } from '@/types/partnership-agreement'
import { TStepApi, TStepPayload } from '@/types/step.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, styled, useTheme } from '@mui/material'
import { memo } from 'react'
import { useRecoilState } from 'recoil'
import { MANDATORY_PROFIT_DISTRIBUTION } from './constant'
interface IBusinessPartnershipAgreementProps {
  dataAddtionalContractTerms: TStepPayload<TStepApi>
}

const BlackText = styled('span')({
  color: '#000'
})

const RedText = styled('span')({
  color: '#FF3932'
})

const getNoticeTitle = (value: number) => {
  switch (value) {
    case 1:
      return '①'
    case 2:
      return '②'
    case 3:
      return '③'
    case 4:
      return '④'
    case 5:
      return '⑤'
    case 6:
      return '⑥'
    case 7:
      return '⑦'
    case 8:
      return '⑧'
    case 9:
      return '⑨'
  }
}

const BusinessPartnershipAgreement = ({ dataAddtionalContractTerms }: IBusinessPartnershipAgreementProps) => {
  const {
    palette: { home, main }
  } = useTheme()
  const [dataStep1] = useRecoilState(dataStep1Atom)
  const [dataBusinessContract] = useRecoilState(dataStep1Atom)
  const detailTypeThree = dataAddtionalContractTerms?.data?.data?.typeThree?.detail?.map((e: IDetail) => {
    return e?.detailData?.map((e1) => e1?.detail)
  })
  const DISPLAY_TAB1 =
    dataAddtionalContractTerms?.data?.data?.typeOne?.businessPartners[0]?.businessPartnerData[0]?.investment
  const detailTypeThreeArray = detailTypeThree?.flat(Infinity)

  const dateParts = dataStep1?.contrastDate?.split('.')
  const year = dateParts[0]
  const month = dateParts[1]
  const day = dateParts[2]

  const handleRetrunListRatioPartner = () => {
    return dataAddtionalContractTerms?.data?.data?.typeSix?.partnerData.map((e: any, index: number) => {
      return `${dataStep1?.data[index]?.name || '-'} ${e?.partnerRatio || '-'}%`
    })
  }

  const handleGetTypeSixContractText = (value: string) => {
    switch (value) {
      case MANDATORY_PROFIT_DISTRIBUTION.CAPITAL_CONTRIBUTION_RATIO:
        return (
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(6)}>
            <Typography cate='body_3'>
              <BlackText>
                1. 동업자는 회사의 운영에서 발생한 수익에 대해 매년 1회 이상 당 업체의 전체 이익 중{' '}
                {dataAddtionalContractTerms?.data?.data?.typeSix?.limit} 를 초과하지 않는 범위 안에서 이익금을 본 계약서
                상의 출자비율로 분배한다.
              </BlackText>
            </Typography>
            <Typography cate='body_3'>
              <BlackText>
                2. 단, 이익 분배시기, 금액 등이 상법의 이익배당 관련 규정에 반하는 경우, 반하는 액수를 제외한다.
              </BlackText>
            </Typography>
          </Box>
        )
      case MANDATORY_PROFIT_DISTRIBUTION.SAME_RATIO:
        return (
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(6)}>
            <Typography cate='body_3'>
              <BlackText>
                1. 동업자는 회사의 운영에서 발생한 수익에 대해 매년 1회 이상 당 업체의 전체 이익 중{' '}
                {dataAddtionalContractTerms?.data?.data?.typeSix?.limit}% 를 초과하지 않는 범위 안에서 이익금을 동일한
                비율로 분배한다.
              </BlackText>
            </Typography>
            <Typography cate='body_3'>
              <BlackText>
                2. 단, 이익 분배시기, 금액 등이 상법의 이익배당 관련 규정에 반하는 경우, 반하는 액수를 제외한다.
              </BlackText>
            </Typography>
          </Box>
        )
      case MANDATORY_PROFIT_DISTRIBUTION.TERM:
        return (
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(6)}>
            <Typography cate='body_3'>
              <BlackText>
                1. 동업자는 회사의 운영에서 발생한 수익에 대해 매년 1회 이상 당 업체의 전체 이익 중 30% 를 초과하지 않는
                범위 안에서 이익금을 <RedText>{handleRetrunListRatioPartner().join(',   ')}</RedText>
              </BlackText>
            </Typography>
            <Typography cate='body_3'>
              <BlackText>
                2. 단, 이익 분배시기, 금액 등이 상법의 이익배당 관련 규정에 반하는 경우, 반하는 액수를 제외한다.
              </BlackText>
            </Typography>
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
      <Typography cate='title_2_bold' marginBottom={convertToRem(47)} display={'flex'} justifyContent={'center'}>
        <BlackText>동업계약서</BlackText>
      </Typography>
      <Box display={'flex'} flexDirection={'column'} gap={convertToRem(28)}>
        <Typography cate='body_30'>
          <BlackText>
            {dataBusinessContract?.data?.map((e, index) => (
              <BlackText key={index}>
                동업자 <RedText>{e?.name} </RedText>(이하 동업자 {index + 1})
                {dataBusinessContract?.data.length !== index + 1 && ','}
                {''}
              </BlackText>
            ))}
            는
          </BlackText>
          <RedText>
            {dataBusinessContract?.companyType ?? '-'} {dataBusinessContract?.companyName ?? '-'}{' '}
          </RedText>
          <BlackText>
            (이하 “본 업체” 또는 “회사”,
            <RedText>
              {' '}
              {dataBusinessContract?.companyHeadquartersAddress ?? '-'}{' '}
              {dataBusinessContract?.companyAdditionalAddress ?? '-'}{' '}
            </RedText>
            에 소재)를 설립하고 공동으로 운영하는 과정에서 상호 신뢰를 바탕으로 상호 발전을 도모하기 위하여 다음과 같이
            동업 계약(이하 “본 계약”)을 체결한다.
          </BlackText>
        </Typography>
        <Box display={'flex'} flexDirection={'column'} gap={convertToRem(6)}>
          <Typography cate='button_30' color={main.gray90}>
            제0조 (목적)
          </Typography>
          <Typography cate='body_3'>
            <BlackText>
              “본 계약”은 <RedText>{dataBusinessContract?.companyIdea}</RedText>
              등을 사업목적으로 하는 회사를 설립하여 공동으로 운영함에 있어 동업자 간의 권리와 의무 등 제반 사항을
              규정하고, 발생할 수 있는 분쟁을 사전에 예방함과 동시에 합리적인 해경 방안을 모색하며 향후 회사 경영의
              효율성을 높이고 동업자간의 경제적 이익을 보호하고 도모하는데 그 목적이 있다.
            </BlackText>
          </Typography>
        </Box>
        {Boolean(DISPLAY_TAB1) && (
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(6)}>
            <Typography cate='button_30' color={main.gray90}>
              제0조 (출자 내용 및 출자에 따른 지분 비율)
            </Typography>
            <Typography cate='body_30'>
              <BlackText>
                동업자들은 회사를 설립하고 운영하는데 있어 필요한 자금 및 현물을 회사 설립 과정에서 각자 출자하고 이에
                따른 지분 비율을 아래와 같이 정한다.
              </BlackText>
              <BlackText>
                {dataAddtionalContractTerms?.data?.data?.typeOne?.businessPartners?.map(
                  (e: IBusinessPartner, index: number) => {
                    return (
                      <Box key={`index_${index}`}>
                        {`${index + 1}. 동업자 ${index + 1}의 출자 내용 및 이에 따른 회사 지분 비율은 아래와 같다.`}
                        {e?.businessPartnerData?.map((e1, index1: number) => {
                          return (
                            <Box
                              display={'flex'}
                              flexDirection={'row'}
                              alignItems={'center'}
                              marginLeft={convertToRem(15)}
                              gap={convertToRem(6)}
                              key={`BusinessPartnerData_${index1}`}
                            >
                              <Typography display={'flex'} alignItems={'center'}>
                                <BlackText>{getNoticeTitle(index1 + 1)}</BlackText>
                              </Typography>
                              <Typography cate='body_30' key={`ol_${index1}`}>
                                <BlackText>{e1?.detail} 을 </BlackText>
                                <BlackText>{e1?.investment} 하기로 하고 보통주 </BlackText>
                                <BlackText>{e1?.equityRatio}% 에 상응하는 투자를 한 것으로 한다.</BlackText>
                              </Typography>
                            </Box>
                          )
                        })}
                      </Box>
                    )
                  }
                )}
              </BlackText>
            </Typography>
          </Box>
        )}
        <Box display={'flex'} flexDirection={'column'} gap={convertToRem(6)}>
          <Typography cate='button_30' color={main.gray90}>
            제0조 (의사결정 방식)
          </Typography>
          <Typography cate='body_3'>
            <BlackText>
              출자 내용 및 출자에 따른 지분 비율에서 정한바와 같이 출자액수에 따라 부여된 지분에 비례하여 부여된
              의결권을 행사하여 다수결의 원칙에 따른 의결 방법에 따라 정한다. 만약 동업자간 출자 비율이 동일한 경우,
              동등한 의결권을 부여한다.
            </BlackText>
          </Typography>
        </Box>
        {Boolean(dataAddtionalContractTerms?.data?.data?.typeTwo?.date) && (
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(6)}>
            <Typography cate='button_30' color={main.gray90}>
              제0조 (근속 의무)
            </Typography>
            <Typography cate='body_3'>
              <BlackText
                style={{
                  width: '100%',
                  display: 'block'
                }}
              >
                1. 동업자는 본 계약 체결일로부터 {dataAddtionalContractTerms?.data?.data?.typeTwo?.date} 간 회사의
                임직원으로서 재직하여야 한다.
              </BlackText>
              <BlackText
                style={{
                  width: '100%',
                  display: 'block'
                }}
              >
                2. 동업자가 위 기간 내에 회사를 퇴직하거나, 회사로부터 해고를 당하는 등 사유를 불문하고 회사의
                임직원으로 재직하지 아니하게 될 경우, 해당 동업자는 다른 동업자에게 본인이 보유하고 있는 회사 주식의
                전량을 다른 동업자가 보유한 지분 비율에 따라 액면가로 매도하여야 한다.
              </BlackText>
              <BlackText
                style={{
                  width: '100%',
                  display: 'block'
                }}
              >
                3. 동업자가 병역법에 따른 병역의 의무로 인해 근속을 하지 못한 경우 본 조항을 적용하지 않는다. 단, 병역의
                의무가 완료된 후에는 즉시 회사에 복귀하여 근속 의무 기간을 이어간다.
              </BlackText>
              <BlackText
                style={{
                  width: '100%',
                  display: 'block'
                }}
              >
                4. 동업자는 근속 의무 규정을 어길 경우, {dataAddtionalContractTerms?.data?.data?.typeTwo?.valuePenalty}{' '}
                의 위약금을 본 업체에 지불해야 하며, 이 위약금 지불은 당사자의 손해배상 청구 등과 별개로 한다.
              </BlackText>
            </Typography>
          </Box>
        )}
        {Boolean(dataAddtionalContractTerms?.data?.data?.typeThree?.date) && (
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(6)}>
            <Typography cate='button_30' color={main.gray90}>
              제0조 (경업의 금지)
            </Typography>
            <Typography cate='body_3'>
              <BlackText
                style={{
                  width: '100%',
                  display: 'block'
                }}
              >
                1. 동업자는 다른 동업자의 서면 동의 없이 회사와 유사한 사업을 독립적으로 운영하거나 외부 제3자와 함께
                경영하거나, 다른 유사한 사업체에 종사하거나 해당 사업에 대한 지분을 본인 또는 타인 명의로 취득하는 등
                유사한 사업에 개입해서는 안된다.
              </BlackText>
            </Typography>
            <Typography cate='body_3'>
              <BlackText
                style={{
                  width: '100%',
                  display: 'block'
                }}
              >
                2. 동업자는 계약 해지, 퇴사, 해임 및 그 밖의 사유로 본 계약 종료된 날로부터
                {dataAddtionalContractTerms?.data?.data?.typeThree?.date ?? '-'} 동안 동종 및 경쟁 업체서
                {dataAddtionalContractTerms?.data?.data?.typeThree?.permission ?? '-'}.
              </BlackText>
            </Typography>
            <Typography cate='body_3'>
              <BlackText>
                3. 단, 다음의 내용은 다른 사업이나 직업을 영위할 필요성에 대해서 인정한 것으로 한다.
              </BlackText>
              {detailTypeThreeArray?.map((e: String, index: number) => {
                return (
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    marginLeft={convertToRem(15)}
                    gap={convertToRem(6)}
                    key={`TypeThree_${index}`}
                  >
                    <Typography display={'flex'} alignItems={'center'}>
                      <BlackText>{getNoticeTitle(index + 1)}</BlackText>
                    </Typography>
                    <Typography cate='body_30'>
                      <BlackText>{e}</BlackText>
                    </Typography>
                  </Box>
                )
              })}
            </Typography>
            <Typography cate='body_3'>
              <BlackText
                style={{
                  width: '100%',
                  display: 'block'
                }}
              >
                4. 동업자는 겸직의 금지 규정을 어길 경우,{' '}
                {dataAddtionalContractTerms?.data?.data?.typeThree?.valuePenalty}의 위약금을 본 업체에 지불해야 하며, 이
                위약금 지불은 당사자의 손해배상 청구 등과 별개로 한다.
              </BlackText>
            </Typography>
          </Box>
        )}
        {Boolean(dataAddtionalContractTerms?.data?.data?.typeFour?.date) && (
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(6)}>
            <Typography cate='button_30' color={main.gray90}>
              제0조 (주식의 처분 제한)
            </Typography>
            <Typography cate='body_3'>
              <BlackText>
                1. 동업자는 본 계약체결일로부터 {dataAddtionalContractTerms?.data?.data?.typeFour?.date}간 동업자의 사전
                서면 동의가 없는 한, 보유하고 있는 회사의 주식을 제3자에게 양도, 매각하거나 담보를 설정하는 등의
                처분행위 일체를 행할 수 없다.
              </BlackText>
            </Typography>
            <Typography cate='body_3'>
              <BlackText>
                2. 동업자가 자신의 주식을 매각하고자 할 때 다른 동업자에게 해당 주식을 동일한 조건으로 매각할 기회를
                제공해야 하며, 다른 동업자는 이 매각 기회를 받아들이거나 거절할 수 있다. 이러한 공동매도권(Right of
                First Refusal) 행사 시, 매각 조건과 절차는 별도의 서면 합의를 통해 결정한다.
              </BlackText>
            </Typography>
            <Typography cate='body_3'>
              <BlackText>
                3. 동업자가 자신의 주식을 매각하고자 할 때 다른 동업자에게 해당 주식을 우선적으로 매수할 기회를 제공해야
                하며, 다른 동업자는 이 매수 기회를 받아들어거나 거절할 수 있다. 이러한 우선매수권(Tag-along Right) 행사
                시, 판매 조건과 절차는 별도의 서면 합의를 통해 결정한다.
              </BlackText>
            </Typography>
            <Typography cate='body_3'>
              <BlackText>
                4. 동업자가 주식의 처분 제한 규정을 어길 경우,{' '}
                {dataAddtionalContractTerms?.data?.data?.typeFour?.valuePenalty}의 위약금을 본 업체에 지불해야 하며, 이
                위약금 지불은 당사자의 손해배상 청구 등과 별개로 한다.
              </BlackText>
            </Typography>
          </Box>
        )}
        {Boolean(dataAddtionalContractTerms?.data?.data?.typeFive?.date) && (
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(6)}>
            <Typography cate='button_30' color={main.gray90}>
              제0조 (비밀 유지 의무)
            </Typography>
            <Typography cate='body_3'>
              <BlackText>
                1. 동업자는 다른 동업자의 사전 서면 동의 없이는 본 계약과 관련된 거래 및 회사 정보에 대한 비밀을
                유지해야 하며, 이러한 정보를 본 계약 이외의 목적으로 사용해서는 아니 된다. 또한, 동업자들은 회사의
                비즈니스 정보, 지적재산, 주요자산, 개인정보, 회계정보 등을 동종 또는 경쟁업체와 공유하거나 누설할 수
                없다.
              </BlackText>
            </Typography>
            <Typography cate='body_3'>
              <BlackText>
                2. 비밀 유지 의무는 업무수행이나 계약기간 중은 물론, 본 계약기간이나 본 업체의 업무 종료 후{' '}
                {dataAddtionalContractTerms?.data?.data?.typeFive?.date}간 그 효력을 갖는다.
              </BlackText>
            </Typography>
            <Typography cate='body_3'>
              <BlackText>
                3. 동업자가 비밀 유지 의무 규정을 어길 경우,{' '}
                {dataAddtionalContractTerms?.data?.data?.typeFive?.valuePenalty}의 위약금을 본 업체에 지불해야 하며, 이
                위약금 지불은 당사자의 손해배상 청구 등과 별개로 한다.
              </BlackText>
            </Typography>
          </Box>
        )}
        {Boolean(dataAddtionalContractTerms?.data?.data?.typeSix?.distribution) && (
          <Box display={'flex'} flexDirection={'column'} gap={convertToRem(6)}>
            <Typography cate='button_30' color={main.gray90}>
              제0조 (이익분배의무)
            </Typography>
            {handleGetTypeSixContractText(dataAddtionalContractTerms?.data?.data?.typeSix?.distribution)}
          </Box>
        )}
      </Box>
      <Box display={'flex'} flexDirection={'column'} gap={convertToRem(47)} marginTop={convertToRem(47)}>
        <Typography cate='button_30' display={'flex'} justifyContent={'center'} color={home.red500}>
          {year}년 {month}월 {day}일
        </Typography>
        {dataStep1.data.map((e, index) => {
          return (
            <Box
              display={'flex'}
              justifyContent={'flex-start'}
              flexDirection={'column'}
              gap={convertToRem(10)}
              key={`infor_${index}`}
            >
              <Typography cate='sub_title_30'>
                <BlackText>동업자 {index + 1}</BlackText>
              </Typography>
              <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={convertToRem(10)}>
                <Typography cate='sub_title_30'>
                  <BlackText>성명 :</BlackText>
                </Typography>
                <Typography cate='body_30' color={'#3A3A3A'}>
                  {e.name} (서명 또는 인)
                </Typography>
              </Box>
              <Typography cate='sub_title_30'>
                <BlackText>주민등록번호 :</BlackText>
              </Typography>
              <Typography cate='sub_title_30'>
                <BlackText>주소 :</BlackText>
              </Typography>
              <Typography cate='sub_title_30'>
                <BlackText>연락처 :</BlackText>
              </Typography>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default memo(BusinessPartnershipAgreement)
