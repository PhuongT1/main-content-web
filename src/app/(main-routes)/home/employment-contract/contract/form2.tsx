import { Stack } from '@mui/material'
import { ListItemStyled, ListStyled } from '.'
import { EmploymentFormType, TEXT_STYLE } from '../utils/constants'
import {
  EFlexibleWorkSystem,
  EOperationPeriod,
  EWorkingHourCalculation,
  EWorkingType,
  EmploymentType
} from '../contractDetailsForm2'
import { Typography } from '@/elements'
import { useRecoilState } from 'recoil'
import { activeFormGroup } from '@/atoms/home/employment-contract'

interface IForm3Data {
  data: {
    [key: string]: string | boolean
  }
}
const ContractForm2: React.FC<IForm3Data> = ({ data }) => {
  const [activeType] = useRecoilState(activeFormGroup)

  return (
    <div
      style={{ backgroundColor: activeType === EmploymentFormType.employmentType ? 'rgba(0, 199, 190, 0.20)' : '#fff' }}
    >
      {
        <Stack gap={'6px'}>
          <Typography {...TEXT_STYLE.bodySemi}>제0조 (계약기간)</Typography>
          <ListStyled component='ol'>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                {data.employmentType === EmploymentType.fulltimeEmployee && (
                  <>
                    근로계약 기간은 <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.startDate}</Typography>부터
                    기간의 정함이 없는 것으로 한다.
                  </>
                )}

                {data.employmentType === EmploymentType.contractEmployee && (
                  <>
                    근로계약 기간은 <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.startDate}</Typography>부터{' '}
                    <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.endDate}</Typography>까지로 한다.
                  </>
                )}

                {data.employmentType === EmploymentType.parttimeJob && (
                  <>
                    근로계약 기간은 <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.startDate}</Typography>부터{' '}
                    <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.endDate}</Typography>까지로 한다.
                  </>
                )}
              </Typography>
            </ListItemStyled>
          </ListStyled>
        </Stack>
      }

      {data.workType === EWorkingType.fixedWorkSystem && (
        <Stack gap={'6px'}>
          <Typography {...TEXT_STYLE.bodySemi}>제0조 (근무일 및 근무시간)</Typography>
          <ListStyled component='ol'>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                근무시간은{' '}
                <Typography {...TEXT_STYLE.bodySemiHightlight}>
                  {data.workingHourStart}~{data.workingHourEnd} (휴게시간 {data.recessTimeStart}~{data.recessTimeEnd})
                </Typography>
                으로 한다. 다만, 업무에 따라서 정해진 휴게시간에 휴게할 수 없는 경우에는 별도의 시간대에 소정의 휴게를
                부여하는 것으로 한다.
              </Typography>
            </ListItemStyled>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                근무일은 매주{' '}
                <Typography {...TEXT_STYLE.bodySemiHightlight}>
                  {(data?.workDay as unknown as string[]).join(', ')}
                </Typography>
                금요일로 한다.{' '}
              </Typography>
            </ListItemStyled>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                유급휴일은 <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.paidHoliday}</Typography>
                로 한다. 다만, 아래 각호에 해당하는 날은 제외하고 근로자 대표와 서면으로 합의한 경우 특정한 근로일로
                대체할 수 있다.
                <br />
                가. 근로자의 날(5월 1일)
                <br />
                나. 법정공휴일 및 대체공휴일
                <br />
                다. 기타 정부 또는 회사에서 임시 지정한 날<br />
              </Typography>
            </ListItemStyled>
          </ListStyled>
        </Stack>
      )}

      {data.workType === EWorkingType.flexibleWorkSystem &&
        data.flexibleWorkSystem === EFlexibleWorkSystem.option1 &&
        data.operationPeriod === EOperationPeriod.option1 && (
          <Stack gap={'6px'}>
            <Typography {...TEXT_STYLE.bodySemi}>제0조 (근무일 및 근무시간)</Typography>
            <ListStyled component='ol'>
              <ListItemStyled>
                <Typography {...TEXT_STYLE.body}>
                  근무시간은{' '}
                  <Typography {...TEXT_STYLE.bodySemiHightlight}>
                    {data.workingHourStart}~{data.workingHourEnd} (휴게시간 {data.recessTimeStart}~{data.recessTimeEnd})
                  </Typography>
                  으로 한다. 다만, 업무에 따라서 정해진 휴게시간에 휴게할 수 없는 경우에는 별도의 시간대에 소정의 휴게를
                  부여하는 것으로 한다.
                </Typography>
              </ListItemStyled>
              <ListItemStyled>
                <Typography {...TEXT_STYLE.body}>
                  근무일은 매주{' '}
                  <Typography {...TEXT_STYLE.bodySemiHightlight}>
                    {(data?.workDay as unknown as string[]).join(', ')}
                  </Typography>
                  금요일로 한다.
                </Typography>
              </ListItemStyled>
              <ListItemStyled>
                <Typography {...TEXT_STYLE.body}>
                  유급휴일은 <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.paidHoliday}</Typography>로 한다.
                  다만, 아래 각호에 해당하는 날은 제외하고 근로자 대표와 서면으로 합의한 경우 특정한 근로일로 대체할 수
                  있다.
                  <br />
                  가. 근로자의 날(5월 1일)
                  <br />
                  나. 법정공휴일 및 대체공휴일
                  <br />
                  다. 기타 정부 또는 회사에서 임시 지정한 날<br />
                </Typography>
              </ListItemStyled>
              <ListItemStyled>
                <Typography {...TEXT_STYLE.body}>
                  ‘회사’는 <Typography {...TEXT_STYLE.bodySemiHightlight}>2주 단위</Typography>로 탄력적 근로시간제를
                  운영할 수 있다. 다만, 특정한 주의 근로시간은 48시간을 초과할 수 없다.
                </Typography>
              </ListItemStyled>
            </ListStyled>
          </Stack>
        )}

      {data.workType === EWorkingType.flexibleWorkSystem &&
        data.flexibleWorkSystem === EFlexibleWorkSystem.option1 &&
        data.operationPeriod === EOperationPeriod.option2 && (
          <Stack gap={'6px'}>
            <Typography {...TEXT_STYLE.bodySemi}>제0조 (근무일 및 근무시간)</Typography>
            <ListStyled component='ol'>
              <ListItemStyled>
                <Typography {...TEXT_STYLE.body}>
                  근무시간은{' '}
                  <Typography {...TEXT_STYLE.bodySemiHightlight}>
                    {data.workingHourStart}~{data.workingHourEnd} (휴게시간 {data.recessTimeStart}~{data.recessTimeEnd})
                  </Typography>
                  으로 한다. 다만, 업무에 따라서 정해진 휴게시간에 휴게할 수 없는 경우에는 별도의 시간대에 소정의 휴게를
                  부여하는 것으로 한다.
                </Typography>
              </ListItemStyled>
              <ListItemStyled>
                <Typography {...TEXT_STYLE.body}>
                  근무일은 매주{' '}
                  <Typography {...TEXT_STYLE.bodySemiHightlight}>
                    {(data?.workDay as unknown as string[]).join(', ')}
                  </Typography>
                  금요일로 한다.{' '}
                </Typography>
              </ListItemStyled>
              <ListItemStyled>
                <Typography {...TEXT_STYLE.body}>
                  유급휴일은 <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.paidHoliday}</Typography>로 한다.
                  다만, 아래 각호에 해당하는 날은 제외하고 근로자 대표와 서면으로 합의한 경우 특정한 근로일로 대체할 수
                  있다.
                  <br />
                  가. 근로자의 날(5월 1일)
                  <br />
                  나. 법정공휴일 및 대체공휴일
                  <br />
                  다. 기타 정부 또는 회사에서 임시 지정한 날<br />
                </Typography>
              </ListItemStyled>
              <ListItemStyled>
                <Typography {...TEXT_STYLE.body}>
                  ‘회사’는 <Typography {...TEXT_STYLE.bodySemiHightlight}>1개월 단위</Typography>로 탄력적 근로시간제를
                  운영할 수 있다. 다만, 특정한 주의 근로시간은 52시간을, 특정한 날의 근로시간은 12시간을 초과할 수 없다.
                </Typography>
              </ListItemStyled>
            </ListStyled>
          </Stack>
        )}

      {data.workType === EWorkingType.flexibleWorkSystem &&
        data.flexibleWorkSystem === EFlexibleWorkSystem.option1 &&
        data.operationPeriod === EOperationPeriod.option3 && (
          <Stack gap={'6px'}>
            <Typography {...TEXT_STYLE.bodySemi}>제0조 (근무일 및 근무시간)</Typography>
            <ListStyled component='ol'>
              <ListItemStyled>
                <Typography {...TEXT_STYLE.body}>
                  근무시간은{' '}
                  <Typography {...TEXT_STYLE.bodySemiHightlight}>
                    {data.workingHourStart}~{data.workingHourEnd} (휴게시간 {data.recessTimeStart}~{data.recessTimeEnd})
                  </Typography>
                  으로 한다. 다만, 업무에 따라서 정해진 휴게시간에 휴게할 수 없는 경우에는 별도의 시간대에 소정의 휴게를
                  부여하는 것으로 한다.
                </Typography>
              </ListItemStyled>
              <ListItemStyled>
                <Typography {...TEXT_STYLE.body}>
                  근무일은 매주{' '}
                  <Typography {...TEXT_STYLE.bodySemiHightlight}>
                    {(data?.workDay as unknown as string[]).join(', ')}
                  </Typography>
                  금요일로 한다.{' '}
                </Typography>
              </ListItemStyled>
              <ListItemStyled>
                <Typography {...TEXT_STYLE.body}>
                  유급휴일은 <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.paidHoliday}</Typography>로 한다.
                  다만, 아래 각호에 해당하는 날은 제외하고 근로자 대표와 서면으로 합의한 경우 특정한 근로일로 대체할 수
                  있다.
                  <br />
                  가. 근로자의 날(5월 1일)
                  <br />
                  나. 법정공휴일 및 대체공휴일
                  <br />
                  다. 기타 정부 또는 회사에서 임시 지정한 날<br />
                </Typography>
              </ListItemStyled>
              <ListItemStyled>
                <Typography {...TEXT_STYLE.body}>
                  ‘회사’는 <Typography {...TEXT_STYLE.bodySemiHightlight}>3개월 단위</Typography>로 탄력적 근로시간제를
                  운영할 수 있다. 다만, 특정한 주의 근로시간은 52시간을, 특정한 날의 근로시간은 12시간을 초과할 수 없다.
                </Typography>
              </ListItemStyled>
            </ListStyled>
          </Stack>
        )}

      {data.workType === EWorkingType.flexibleWorkSystem &&
        data.flexibleWorkSystem === EFlexibleWorkSystem.option1 &&
        data.operationPeriod === EOperationPeriod.option4 && (
          <Stack gap={'6px'}>
            <Typography {...TEXT_STYLE.bodySemi}>제0조 (근무일 및 근무시간)</Typography>
            <ListStyled component='ol'>
              <ListItemStyled>
                <Typography {...TEXT_STYLE.body}>
                  근무시간은{' '}
                  <Typography {...TEXT_STYLE.bodySemiHightlight}>
                    {data.workingHourStart}~{data.workingHourEnd} (휴게시간 {data.recessTimeStart}~{data.recessTimeEnd})
                  </Typography>
                  으로 한다. 다만, 업무에 따라서 정해진 휴게시간에 휴게할 수 없는 경우에는 별도의 시간대에 소정의 휴게를
                  부여하는 것으로 한다.
                </Typography>
              </ListItemStyled>
              <ListItemStyled>
                <Typography {...TEXT_STYLE.body}>
                  근무일은 매주{' '}
                  <Typography {...TEXT_STYLE.bodySemiHightlight}>
                    {(data?.workDay as unknown as string[]).join(', ')}
                  </Typography>
                  금요일로 한다.{' '}
                </Typography>
              </ListItemStyled>
              <ListItemStyled>
                <Typography {...TEXT_STYLE.body}>
                  유급휴일은 <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.paidHoliday}</Typography>로 한다.
                  다만, 아래 각호에 해당하는 날은 제외하고 근로자 대표와 서면으로 합의한 경우 특정한 근로일로 대체할 수
                  있다.
                  <br />
                  가. 근로자의 날(5월 1일)
                  <br />
                  나. 법정공휴일 및 대체공휴일
                  <br />
                  다. 기타 정부 또는 회사에서 임시 지정한 날<br />
                </Typography>
              </ListItemStyled>
              <ListItemStyled>
                <Typography {...TEXT_STYLE.body}>
                  ‘회사’는 <Typography {...TEXT_STYLE.bodySemiHightlight}>6개월 단위</Typography>로 탄력적 근로시간제를
                  운영할 수 있다. 다만, 특정한 주의 근로시간은 52시간을, 특정한 날의 근로시간은 12시간을 초과할 수 없다.
                </Typography>
              </ListItemStyled>
            </ListStyled>
          </Stack>
        )}
      {data.workType === EWorkingType.flexibleWorkSystem && data.flexibleWorkSystem === EFlexibleWorkSystem.option2 && (
        <Stack gap={'6px'}>
          <Typography {...TEXT_STYLE.bodySemi}>제0조 (근무조건)</Typography>
          <ListStyled component='ol'>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                총 근무시간은 1일 8시간 x 해당 월의 소정근로일수(휴일, 휴무일은 제외)로 계산한다.
              </Typography>
            </ListItemStyled>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                근무시간대는 <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.availableWorkingHour}</Typography>{' '}
                중에서 ‘근로자’의 선택에 따라 출퇴근하여 근로 제공이 가능하며, 정산기간을 평균하여 주 40시간이 넘지 않는
                한도 내에서 근로일 및 근로 시간을 조절할 수 있다.
              </Typography>
            </ListItemStyled>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                의무근로 시간대는{' '}
                <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.manadatoryWorkingHour}</Typography>로 한다.
                휴게시간은 ‘근로자’가 선택하여 정한다.
              </Typography>
            </ListItemStyled>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                근무일은 매주{' '}
                <Typography {...TEXT_STYLE.bodySemiHightlight}>
                  {(data?.workDay as unknown as string[]).join(', ')}
                </Typography>
                금요일로 한다.
              </Typography>
            </ListItemStyled>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                유급휴일은 <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.paidHoliday}</Typography>
                로 한다. 다만, 아래 각호에 해당하는 날은 제외하고 근로자 대표와 서면으로 합의한 경우 특정한 근로일로
                대체할 수 있다.
                <br />
                가. 근로자의 날(5월 1일)
                <br />
                나. 법정공휴일 및 대체공휴일
                <br />
                다. 기타 정부 또는 회사에서 임시 지정한 날<br />
              </Typography>
            </ListItemStyled>
          </ListStyled>
        </Stack>
      )}
      {data.workType === EWorkingType.flexibleWorkSystem && data.flexibleWorkSystem === EFlexibleWorkSystem.option3 && (
        <Stack gap={'6px'}>
          <Typography {...TEXT_STYLE.bodySemi}>제0조 (근무일 및 근무시간)</Typography>
          <ListStyled component='ol'>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                근무시간은{' '}
                <Typography {...TEXT_STYLE.bodySemiHightlight}>
                  {data.workingHourStart}~{data.workingHourEnd} (휴게시간 {data.recessTimeStart}~{data.recessTimeEnd})
                </Typography>
                으로 한다. 다만, 업무에 따라서 정해진 휴게시간에 휴게할 수 없는 경우에는 별도의 시간대에 소정의 휴게를
                부여하는 것으로 한다.
              </Typography>
            </ListItemStyled>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                근무일은 매주{' '}
                <Typography {...TEXT_STYLE.bodySemiHightlight}>
                  {(data?.workDay as unknown as string[]).join(', ')}
                </Typography>
                금요일로 한다.{' '}
              </Typography>
            </ListItemStyled>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                유급휴일은 <Typography {...TEXT_STYLE.bodySemi}>{data.paidHoliday}</Typography>로 한다. 다만, 아래
                각호에 해당하는 날은 제외하고 근로자 대표와 서면으로 합의한 경우 특정한 근로일로 대체할 수 있다.
                <br />
                가. 근로자의 날(5월 1일)
                <br />
                나. 법정공휴일 및 대체공휴일
                <br />
                다. 기타 정부 또는 회사에서 임시 지정한 날<br />
              </Typography>
            </ListItemStyled>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                ‘근로자’의 업무 필요에 따라, 회사 밖에서 1일 통산근로시간의 전부 또는 일부를 사업장 밖에 있어서의 업무에
                종사하고, 근로시간을 산정하기 어려운 경우에는 휴게시간을 제외하고{' '}
                <Typography {...TEXT_STYLE.bodySemiHightlight}>
                  {data.workingHourCalculation === EWorkingHourCalculation.option1
                    ? '소정근로시간'
                    : '근로자대표와 서면합의로 정한 시간'}
                </Typography>
                을 근로 시간으로 본다.
              </Typography>
            </ListItemStyled>
          </ListStyled>
        </Stack>
      )}

      {data.workType === EWorkingType.flexibleWorkSystem && data.flexibleWorkSystem === EFlexibleWorkSystem.option4 && (
        <Stack gap={'6px'}>
          <Typography {...TEXT_STYLE.bodySemi}>제0조 (근무조건)</Typography>
          <ListStyled component='ol'>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                총 근무시간은 1일 8시간 x 해당 월의 소정근로일수(휴일, 휴무일은 제외)로 계산한다.
              </Typography>
            </ListItemStyled>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                ‘근로자’는 총 근무시간을 준수하되, 업무 수행방법, 시간 및 장소에 대해 재량을 가진다.
              </Typography>
            </ListItemStyled>
          </ListStyled>
        </Stack>
      )}
    </div>
  )
}

export default ContractForm2
