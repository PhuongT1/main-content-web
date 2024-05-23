import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Grid, SxProps } from '@mui/material'
import { convertToRem } from '@/utils/convert-to-rem'
import {
  IFormValuesMarketingGoals,
  IFormValuesMarketingChannels,
  IFormValuesMarketingStrategies,
  IFormValuesMarketingKpiList
} from '@/types/advertisement-marketing.type'
import { STEP } from '@/constants/common.constant'
import { useAdvertisementMarketingData } from '../../use-advertisement-marketing'
import CardInputKpiWrapper from '../../_components/card_kpi_wrapper'

interface IMarketingKpiListWrapper {
  form: UseFormReturn<IFormValuesMarketingKpiList>
  sxCard?: SxProps
  data?: IFormValuesMarketingGoals
}
function MarketingKpiListWrapper({ form, sxCard, data }: IMarketingKpiListWrapper) {
  const [activeCard, setActiveCard] = useState<number>(-1)

  const { data: dataStrategies } = useAdvertisementMarketingData<IFormValuesMarketingStrategies>(
    STEP.STEP_TWO,
    'data-advertisement-marketing-strategies'
  )
  const { data: dataChannels } = useAdvertisementMarketingData<IFormValuesMarketingChannels>(
    STEP.STEP_THREE,
    'data-advertisement-marketing-channels'
  )

  // =====
  const onSelectCard = (index: number) => {
    setActiveCard(index)
  }

  // =====
  return (
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
          <CardInputKpiWrapper
            form={form}
            index={index}
            item={item}
            activeCard={activeCard}
            setActiveCard={() => onSelectCard(index)}
            prevDataList={[
              {
                title: '마케팅 전략',
                data:
                  dataStrategies?.data?.data?.[index]?.strategies?.filter(Boolean)?.map((strategy) => strategy?.name) ??
                  []
              },
              {
                title: '홍보 채널',
                data:
                  dataChannels?.data?.data?.[index]?.channels?.filter(Boolean)?.map((channel) => channel?.name) ?? []
              }
            ]}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default MarketingKpiListWrapper
