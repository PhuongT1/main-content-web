import { List, Stack } from '@mui/material'
import { EmploymentFormType, TEXT_STYLE, bgHightLight } from '../utils/constants'
import { Typography } from '@/elements'
import { EWageCalculationMethod, Incentives, MonthlySalaryStructure, PAYMENT_TYPE } from '../contractDetailsForm6'
import { useMemo } from 'react'
import { formatNumberWithText } from '@/utils/string'
import React from 'react'
import { ListItemStyled, ListStyled } from '.'
import { useRecoilState } from 'recoil'
import { activeFormGroup } from '@/atoms/home/employment-contract'
import { calculatePaymentNumber } from '../utils'

interface Idata {
  data: {
    [key: string]: string | boolean
  }
}

const monthlyKeys: { [key: string]: string } = {
  monthlySalaryStructureOption1_basicSalary: MonthlySalaryStructure.option1,
  monthlySalaryStructureOption2_mealAllowance: MonthlySalaryStructure.option2,
  monthlySalaryStructureOption3_transportFee: MonthlySalaryStructure.option3,
  monthlySalaryStructureOption4_vehicleMaintenanceCost: MonthlySalaryStructure.option4,
  monthlySalaryStructureOption5_researchActivityCost: MonthlySalaryStructure.option5,
  monthlySalaryStructureOption6_annual: MonthlySalaryStructure.option6,
  monthlySalaryStructureOption7_longevityPay: MonthlySalaryStructure.option7,
  monthlySalaryStructureOption8_annual: MonthlySalaryStructure.option8,
  monthlySalaryStructureOption9_allowance: MonthlySalaryStructure.option9,
  monthlySalaryStructureOption10_allowance: MonthlySalaryStructure.option10
}

const incentiveKeys: { [key: string]: string } = {
  incentiveOption1_input: Incentives.option1,
  incentiveOption2_input: Incentives.option2,
  incentiveOption3_input: Incentives.option3,
  incentiveOption4_input: Incentives.option4
}

const countText = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차']

const ContractForm6: React.FC<Idata> = ({ data }) => {
  const [activeType] = useRecoilState(activeFormGroup)

  const dataToShow = useMemo(() => {
    if (!data) return null

    const bankInfo = (
      <>
        회사는 근로자가 지정한 다음 계좌로 지정된 날에 임금을 지급한다.
        <br />
        <Typography {...TEXT_STYLE.bodySemi}>가. 지급시기 : {data.monthly}</Typography>
        <br />
        <Typography {...TEXT_STYLE.bodySemi}>나. 은행명 : {data.bankName}</Typography>
        <br />
        <Typography {...TEXT_STYLE.bodySemi}>다. 계좌번호 : {data.accountNumber}</Typography>
      </>
    )

    const filteredList = Object.keys(monthlyKeys)
      .map((key) => ({
        key,
        value: data[key]
      }))
      .filter((item) => item.value)

    const incentiveData = Object.keys(incentiveKeys)
      .map((key) => {
        switch (key) {
          case 'incentiveOption1_input':
          case 'incentiveOption2_input':
            return {
              key,
              value: data[key]
            }
          case 'incentiveOption3_input':
            return {
              key,
              value: data['incentiveOption3_name'] + ', ' + data[key]
            }
          case 'incentiveOption4_input':
            return {
              key,
              value: data['incentiveOption4_name'] + ', ' + data[key]
            }
          default:
            return {
              key,
              value: data[key]
            }
        }
      })
      .filter((item) => item.value)

    switch (data.wageCalculationMethod) {
      case EWageCalculationMethod.option1:
        return [
          <>
            회사는 근로자에게{' '}
            <Typography {...TEXT_STYLE.bodySemiHightlight}>
              {formatNumberWithText(Number(data.totalAmountPaid), '원')}
            </Typography>
            의 연봉을 임금으로 지급한다. 연봉의 구성은 각 항목의 연간 총액을 1/12로 나누어 매월 임금지급일에 지급한다.
            <br />
            {filteredList.map((item, index) => (
              <React.Fragment key={item.key}>
                <Typography {...TEXT_STYLE.bodySemiHightlight}>
                  {countText[index]}. {monthlyKeys[item.key]} : 월{' '}
                  {formatNumberWithText(calculatePaymentNumber(item.value as string, PAYMENT_TYPE[1].value), '원')}
                </Typography>
                <br />
              </React.Fragment>
            ))}
          </>,
          '회사는 지급하는 금액(월 지급액)에 공제액(근로소득세, 주민세, 고용보험, 국민연금, 건강보험 등)을 제외한 금액을 지급한다. 단, 회사는 세법 규정에 따라 해당 요건을 충족하는 경우, 식대, 차량유지비 등을 비과세 적용할 수 있다.',
          '상기 금액은 소정의 근로일수를 개근하였을 경우 지급되는 것으로 결근, 지각, 조퇴 등의 사유가 발생하여 근무하지 않은 시간에 대하여는 당월 임금에서 공제한다.',
          bankInfo,
          '상급자의 지시없이 시간외근무 및 야간근무, 휴일근무를 할 경우 자율적으로 하는 것으로 해석한다. 단, 상급자의 지시에 의거하여 추가근무를 하는 경우에는 수당으로 책정하여 지급한다.',
          <>
            회사는 다음과 같은 인센티브제를 적용한다.
            <br />
            {incentiveData.map((item, index) => (
              <React.Fragment key={item.key}>
                <Typography {...TEXT_STYLE.bodySemiHightlight}>
                  {countText[index]}. {incentiveKeys[item.key]} : {item.value}
                </Typography>
                <br />
              </React.Fragment>
            ))}
          </>
        ]
      case EWageCalculationMethod.option2:
        return [
          <>
            회사는 근로자에게 매월 {formatNumberWithText(Number(data.monthlyPaymentAmount), '원')}의 월급을 임금으로
            지급한다.
            <br />
            {filteredList.map((item, index) => (
              <React.Fragment key={item.key}>
                <Typography {...TEXT_STYLE.bodySemiHightlight}>
                  {countText[index]}. {monthlyKeys[item.key]} : 월 {formatNumberWithText(Number(item.value), '원')}
                </Typography>
                <br />
              </React.Fragment>
            ))}
          </>,
          '회사는 지급하는 금액(월 지급액)에 공제액(근로소득세, 주민세, 고용보험, 국민연금, 건강보험 등)을 제외한 금액을 지급한다. 단, 회사는 세법 규정에 따라 해당 요건을 충족하는 경우, 식대, 차량유지비 등을 비과세 적용할 수 있다.',
          '상기 금액은 소정의 근로일수를 개근하였을 경우 지급되는 것으로 결근, 지각, 조퇴 등의 사유가 발생하여 근무하지 않은 시간에 대하여는 당월 임금에서 공제한다.',
          bankInfo,
          '상급자의 지시없이 시간외근무 및 야간근무, 휴일근무를 할 경우 자율적으로 하는 것으로 해석한다. 단, 상급자의 지시에 의거하여 추가근무를 하는 경우에는 수당으로 책정하여 지급한다.',
          <>
            회사는 다음과 같은 인센티브제를 적용한다. <br />
            {incentiveData.map((item, index) => (
              <React.Fragment key={item.key}>
                <Typography {...TEXT_STYLE.bodySemiHightlight}>
                  {countText[index]}. {incentiveKeys[item.key]} : {item.value}
                </Typography>
                <br />
              </React.Fragment>
            ))}
          </>
        ]
      case EWageCalculationMethod.option3:
        return [
          <>
            회사는 근로자에게 시간당{' '}
            <Typography {...TEXT_STYLE.bodySemiHightlight}>
              {formatNumberWithText(Number(data.hourlyPaymentAmount), '원')}
            </Typography>
            의 임금으로 지급한다.{' '}
          </>,
          '회사는 지급하는 금액(월 지급액)에 공제액(근로소득세, 주민세, 고용보험, 국민연금, 건강보험 등)을 제외한 금액을 지급한다. 단, 회사는 세법 규정에 따라 해당 요건을 충족하는 경우, 식대, 차량유지비 등을 비과세 적용할 수 있다.',
          bankInfo,
          <>
            회사는 다음과 같은 인센티브제를 적용한다. <br />
            {incentiveData.map((item, index) => (
              <React.Fragment key={item.key}>
                <Typography {...TEXT_STYLE.bodySemiHightlight}>
                  {countText[index]}. {incentiveKeys[item.key]} : {item.value}
                </Typography>
                <br />
              </React.Fragment>
            ))}
          </>
        ]

      default:
        return null
    }
  }, [data])

  return (
    <Stack
      gap={'6px'}
      style={{
        backgroundColor: activeType === EmploymentFormType.wage ? 'rgba(0, 199, 190, 0.20)' : '#fff'
      }}
    >
      <Typography {...TEXT_STYLE.bodySemi}>제0조 (임금 및 지급방법 등)</Typography>
      <ListStyled component='ol'>
        {dataToShow?.map((item, index) => (
          <ListItemStyled key={index}>
            <Typography {...TEXT_STYLE.body}>{item}</Typography>
          </ListItemStyled>
        ))}
      </ListStyled>
    </Stack>
  )
}

export { ContractForm6 }
