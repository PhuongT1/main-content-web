import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Grid, SxProps } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import {
  IFormValuesMarketingChannels,
  IFormValuesMarketingGoals,
  IFormValuesMarketingStrategies
} from '@/types/advertisement-marketing.type'
import { STEP } from '@/constants/common.constant'
import { useAdvertisementMarketingData } from '../../use-advertisement-marketing'
import CardInputCheckbox from '../../_components/card_strategies_checkbox'
import MarketingChannelsItem from '../_marketing-channels-items'

interface IMarketingChannelsWrapper {
  form: UseFormReturn<IFormValuesMarketingChannels>
  sxCard?: SxProps
  data?: IFormValuesMarketingGoals
}
function MarketingChannelsWrapper({ form, sxCard, data }: IMarketingChannelsWrapper) {
  const [activeCard, setActiveCard] = useState<number>(0)
  const [activeInput, setActiveInput] = useState<number>(-1)
  const { getValues, setValue, watch } = form
  const selectedChannels = watch(`data.${activeCard}.channels`)?.filter(Boolean)

  const { data: dataStrategies } = useAdvertisementMarketingData<IFormValuesMarketingStrategies>(
    STEP.STEP_TWO,
    'data-advertisement-marketing-strategies'
  )

  // =====
  const onSelectCard = (index: number) => {
    setActiveCard(index)
  }

  const handleClickIconInputCheckbox = (indexCard: number, indexInput: number) => {
    if (indexCard !== activeCard) return

    const selectedId = getValues(`data.${activeCard}.channels.${indexInput}.id`)
    if (selectedId && selectedChannels?.some((com) => com?.id === selectedId)) {
      setValue(`data.${activeCard}.channels.${indexInput}`, undefined as any)
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
              title={'홍보 채널'}
              activeCard={activeCard}
              setActiveCard={() => onSelectCard(index)}
              onClickInputIcon={handleClickIconInputCheckbox}
              formValueSelected={form.watch(`data.${index}.channels`) ?? []}
              prevDataList={[
                {
                  title: '마케팅 전략',
                  data:
                    dataStrategies?.data?.data?.[index]?.strategies
                      ?.filter(Boolean)
                      ?.map((strategy) => strategy?.name) ?? []
                }
              ]}
            />
          </Grid>
        ))}
      </Grid>

      {activeCard >= 0 && (
        <MarketingChannelsItem
          form={form}
          indexCard={activeCard}
          indexInput={activeInput}
          setActiveInput={setActiveInput}
        />
      )}
    </>
  )
}

export default MarketingChannelsWrapper
