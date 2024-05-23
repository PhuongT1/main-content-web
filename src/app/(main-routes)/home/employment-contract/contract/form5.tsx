import { List, Stack } from '@mui/material'
import { EmploymentFormType, TEXT_STYLE, bgHightLight } from '../utils/constants'
import { Typography } from '@/elements'
import { EVacationPolicy } from '../contractDetailsForm5'
import { ListItemStyled, ListStyled } from '.'
import { useRecoilState } from 'recoil'
import { activeFormGroup } from '@/atoms/home/employment-contract'

interface IForm3Data {
  data: {
    [key: string]: string | boolean
  }
}
const ContractForm5: React.FC<IForm3Data> = ({ data }) => {
  const [activeType] = useRecoilState(activeFormGroup)
  return (
    <Stack
      gap={'6px'}
      style={{
        backgroundColor: activeType === EmploymentFormType.vacation ? 'rgba(0, 199, 190, 0.20)' : '#fff'
      }}
    >
      <Typography {...TEXT_STYLE.bodySemi}>제0조 (휴가)</Typography>
      <ListStyled component='ol'>
        {data.vacationPolicy === EVacationPolicy.option1 && (
          <>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                회사는 1년간 8할 이상 출근한 직원에 대하여 15일의 유급휴가를 지급한다. 다만, 계속 근로연수가 1년 미만
                직원에 대하여는 1개월간 개근 시 1일 휴가를 부여한다.
              </Typography>
            </ListItemStyled>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                회사는 3년 이상 계속하여 근로한 근로자에게 매 2년에 대하여 1일을 가산한 유급휴가를 주어야 한다. 이 때,
                가산휴가를 포함한 총 휴가 일수는 25일을 한도로 한다.
              </Typography>
            </ListItemStyled>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                근로기준법 제60조 제7항에 따라, 회사의 귀책사유로 근로자가 유급휴가를 사용하지 못한 경우에는 유급휴가를
                이월하거나 수당으로 지급해야 한다.
              </Typography>
            </ListItemStyled>
          </>
        )}
        {data.vacationPolicy === EVacationPolicy.option2 && (
          <>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                회사는 직원에게 근로기준법에서 정한 유급휴가 기간에 더해 추가로 무제한으로 유급휴가를 부여한다.
              </Typography>
            </ListItemStyled>
            <ListItemStyled>
              <Typography {...TEXT_STYLE.body}>
                근로기준법 제60조 제7항에 따라, 회사의 귀책사유로 근로자가 근로기준법에서 정한 유급휴가를 사용하지 못한
                경우에는 유급휴가를 이월하거나 수당으로 지급해야 한다.
              </Typography>
            </ListItemStyled>
          </>
        )}
      </ListStyled>
    </Stack>
  )
}

export { ContractForm5 }
