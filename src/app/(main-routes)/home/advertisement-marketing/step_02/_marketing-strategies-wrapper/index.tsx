import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Grid, SxProps } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import { IFormValuesMarketingStrategies, IFormValuesMarketingGoals } from '@/types/advertisement-marketing.type'
import CardInputCheckbox from '../../_components/card_strategies_checkbox'
import MarketingStrategiesItem from '../_marketing-strategies-items'

interface IMarketingStrategiesWrapper {
  form: UseFormReturn<IFormValuesMarketingStrategies>
  sxCard?: SxProps
  data?: IFormValuesMarketingGoals
}
function MarketingStrategiesWrapper({ form, sxCard, data }: IMarketingStrategiesWrapper) {
  const [activeCard, setActiveCard] = useState<number>(0)
  const [activeInput, setActiveInput] = useState<number>(-1)

  const { getValues, setValue, watch } = form
  const selectedStrategies = watch(`data.${activeCard}.strategies`)?.filter(Boolean)

  // =====
  const onSelectCard = (index: number) => {
    setActiveCard(index)
  }

  const handleClickIconInputCheckbox = (indexCard: number, indexInput: number) => {
    if (indexCard !== activeCard) return

    const selectedId = getValues(`data.${activeCard}.strategies.${indexInput}.id`)
    if (selectedId && selectedStrategies?.some((com) => com?.id === selectedId)) {
      setValue(`data.${activeCard}.strategies.${indexInput}`, undefined as any)
    }

    setActiveInput(indexInput)
  }

  // =====
  return (
    <>
      <Grid
        spacing={2}
        container
        display='flex'
        alignItems='stretch'
        position='relative'
        sx={{ padding: convertToRem(2), ...sxCard }}
      >
        {(data?.selectedGoals ?? []).filter(Boolean).map((item, index: number) => (
          <Grid item xs={12} md={4} alignItems='stretch' key={item?.id}>
            <CardInputCheckbox
              index={index}
              item={item}
              activeCard={activeCard}
              setActiveCard={() => onSelectCard(index)}
              onClickInputIcon={handleClickIconInputCheckbox}
              formValueSelected={form.watch(`data.${index}.strategies`) ?? []}
            />
          </Grid>
        ))}
      </Grid>

      {activeCard >= 0 && (
        <MarketingStrategiesItem
          form={form}
          indexCard={activeCard}
          indexInput={activeInput}
          setActiveInput={setActiveInput}
        />
      )}
    </>
  )
}

export default MarketingStrategiesWrapper
