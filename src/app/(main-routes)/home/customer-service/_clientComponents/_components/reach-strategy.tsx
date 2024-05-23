import SectionTitle from '@/components/home/section-title'
import TextareaItem from '@/form/textarea'
import { PurchaseDesign } from '@/types/customer-service.type'
import { useFormContext } from 'react-hook-form'

export interface ReachStrategyProps {
  isView?: boolean
}
const ReachStrategy = ({ isView = false }: ReachStrategyProps) => {
  const { control } = useFormContext<PurchaseDesign>()

  return (
    <>
      <SectionTitle
        title='고객 접근 전략'
        subtitle={
          !isView ? '타깃고객의 구매여정을 바탕으로 타깃고객에게 접근하기 위한 전략을 작성해보세요.' : undefined
        }
      />
      <TextareaItem
        control={control}
        name={'reachStrategy'}
        textFieldProps={{
          required: true,
          placeholder: '내용을 입력해주세요.',
          rows: 3.3,
          inputProps: {
            maxLength: 100
          },
          InputProps: {
            readOnly: isView
          }
        }}
      />
    </>
  )
}

export default ReachStrategy
