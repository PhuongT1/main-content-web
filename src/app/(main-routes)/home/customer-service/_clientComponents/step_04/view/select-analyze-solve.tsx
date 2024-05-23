import { CardElementProps } from '@/components/home/card-item'
import CardAnalyze from '../../_components/card-analyze'
import { useFormContext } from 'react-hook-form'
import { PurchaseDesign } from '@/types/customer-service.type'
import SectionTitle from '@/components/home/section-title'

export interface CardAnalyzeProps {
  item: CardElementProps
}

const SelectAnalyzeSolve = () => {
  const { watch } = useFormContext<PurchaseDesign>()
  const solve = watch('solve')

  return (
    <>
      <SectionTitle title='해결하고 싶은 문제' />
      {solve && <CardAnalyze isView item={solve} />}
    </>
  )
}

export default SelectAnalyzeSolve
