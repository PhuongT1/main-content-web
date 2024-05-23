import { CardElementProps } from '@/components/home/card-item'
import { remConvert } from '@/utils/convert-to-rem'
import { Box } from '@mui/material'
import CardAnalyze from '../../_components/card-analyze'
import { useFormContext } from 'react-hook-form'
import { CustomerProfile, Goal, PurchaseDesign } from '@/types/customer-service.type'
import SectionTitle from '@/components/home/section-title'
import { STEP } from '@/constants/common.constant'
import { CUSTOMER_PROFILE_CUSTOMER } from '@/constants/customer-service.constant'
import { useCustomerData } from '../../use-customer'

export interface CardAnalyzeProps {
  item: CardElementProps
}

const AnalyzeSolve = () => {
  const { setValue, watch } = useFormContext<PurchaseDesign>()
  const solve = watch('solve')
  const { data } = useCustomerData<CustomerProfile>(STEP.STEP_TWO, CUSTOMER_PROFILE_CUSTOMER, false)

  return (
    <>
      <SectionTitle
        title='해결하고 싶은 문제'
        subtitle='타깃고객의 고민, 요구사항, 불만 등을 분석하기 위해 우선순위가 높은 문제를 선택해 주세요.'
      />
      <Box component={'div'} display={'flex'} gap={remConvert('12px')} flexDirection={'column'}>
        {data?.data?.painPointList.map((item, index) => (
          <CardAnalyze
            key={index}
            item={item}
            isActive={solve && solve.inputGoal === item.inputGoal && solve.selectCategory === item.selectCategory}
            onClick={() => {
              setValue('solve', item as Required<Goal>, { shouldValidate: true })
            }}
          />
        ))}
      </Box>
    </>
  )
}

export default AnalyzeSolve
