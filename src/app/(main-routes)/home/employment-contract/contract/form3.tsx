import { List, Stack } from '@mui/material'
import { EmploymentFormType, TEXT_STYLE, bgHightLight } from '../utils/constants'
import { Typography } from '@/elements'
import { ListItemStyled, ListStyled } from '.'
import { useRecoilState } from 'recoil'
import { activeFormGroup } from '@/atoms/home/employment-contract'

interface IForm3Data {
  data: {
    [key: string]: string | boolean
  }
}
const ContractForm3: React.FC<IForm3Data> = ({ data }) => {
  const [activeType] = useRecoilState(activeFormGroup)

  return (
    <Stack
      gap={'6px'}
      style={{
        backgroundColor: activeType === EmploymentFormType.probationPeriod ? 'rgba(0, 199, 190, 0.20)' : '#fff'
      }}
    >
      <Typography {...TEXT_STYLE.bodySemi}>제0조 (수습기간)</Typography>
      <ListStyled component='ol'>
        <ListItemStyled>
          <Typography {...TEXT_STYLE.body}>
            채용일로부터 <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.probationPeriod}</Typography>간은
            수습기간을 적용하며, 이 기간 동안의 급여는 본 계약에서 정한 급여의{' '}
            <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.adjustmentMonthlyAmount}</Typography>로 한다.
          </Typography>
        </ListItemStyled>
        <ListItemStyled>
          <Typography {...TEXT_STYLE.body}>
            수습기간 동안 회사는 직원의 근무태도, 업무성과, 품행, 역량, 자질, 직무기술 및 기능, 업무수행능력, 동료와의
            협조 관계 등을 종합적으로 평가한다. 평가 결과, 직원이 회사의 요구 기준에 충족한다고 판단되는 경우, 정식
            인사발령을 진행한다.
          </Typography>
        </ListItemStyled>
        <ListItemStyled>
          <Typography {...TEXT_STYLE.body}>
            수습기간 중에도, 직원이 상기 평가 기준에 부적합하다고 판단되는 경우 회사는 정식 채용을 거부하거나 근로계약을
            종료할 수 있다.
          </Typography>
        </ListItemStyled>
      </ListStyled>
    </Stack>
  )
}

export { ContractForm3 }
