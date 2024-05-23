import { List, Stack } from '@mui/material'
import { EmploymentFormType, TEXT_STYLE, bgHightLight } from '../utils/constants'
import { Typography } from '@/elements'
import { ListItemStyled, ListStyled } from '.'
import { useRecoilState } from 'recoil'
import { activeFormGroup } from '@/atoms/home/employment-contract'

interface IForm6Data {
  data: {
    [key: string]: string | boolean
  }
}
const ContractForm4: React.FC<IForm6Data> = ({ data }) => {
  const [activeType] = useRecoilState(activeFormGroup)

  return (
    <Stack
      gap={'6px'}
      style={{
        backgroundColor: activeType === EmploymentFormType.dutiesAndWorkLocation ? 'rgba(0, 199, 190, 0.20)' : '#fff'
      }}
    >
      <Typography {...TEXT_STYLE.bodySemi}>제0조 (담당업무 및 근무장소)</Typography>
      <ListStyled component='ol'>
        <ListItemStyled>
          <Typography {...TEXT_STYLE.body}>
            담당업무 : <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.probationPeriod}</Typography>
            {data.probationPeriodExtend && (
              <>
                {' '}
                및 <Typography {...TEXT_STYLE.bodySemiHightlight}>사용자가 지정하는 업무</Typography>
              </>
            )}
          </Typography>
        </ListItemStyled>
        <ListItemStyled>
          <Typography {...TEXT_STYLE.body}>
            직위 : <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.spot}</Typography>
          </Typography>
        </ListItemStyled>
        <ListItemStyled>
          <Typography {...TEXT_STYLE.body}>
            근무장소 : <Typography {...TEXT_STYLE.bodySemiHightlight}>{data.workingPlace}</Typography>
            {data.workingPlaceExtend && (
              <>
                {' '}
                또는 <Typography {...TEXT_STYLE.bodySemiHightlight}>사용자가 지정하는 장소</Typography>
              </>
            )}
          </Typography>
        </ListItemStyled>
        <ListItemStyled>
          <Typography {...TEXT_STYLE.body}>
            회사의 인사명령 등에 의하여 담당업무 및 근무장소 등에 변동이 있는 경우 근로자는 이에 따른다.
          </Typography>
        </ListItemStyled>
      </ListStyled>
    </Stack>
  )
}

export { ContractForm4 }
