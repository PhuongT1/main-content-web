import { useEffect, useState } from 'react'
import { STEP } from '@/constants/common.constant'
import { IFormValuesMarketingChannels, IFormValuesMarketingKpiList } from '@/types/advertisement-marketing.type'
import { useAdvertisementMarketingData } from '../../use-advertisement-marketing'

function useGetDefaultValue<T>() {
  const [defaultValue, setDefaultValue] = useState<T>({} as any)
  const { data: dataChannelList } = useAdvertisementMarketingData<IFormValuesMarketingChannels>(
    STEP.STEP_THREE,
    'data-advertisement-marketing-channels'
  )
  const { data: dataKpiList } = useAdvertisementMarketingData<IFormValuesMarketingKpiList>(
    STEP.STEP_FOUR,
    'data-advertisement-marketing-kpiList'
  )

  // ====
  useEffect(() => {
    const { data: kpiList = [], unitCurrency: kpiUnitCurrency } = dataKpiList?.data ?? {}
    if (kpiList && kpiList?.length > 0) {
      const totalBudget = kpiList.reduce((total, kpi) => {
        const budgetValue = Number(kpi?.budget?.replace(/,/g, ''))
        return total + budgetValue
      }, 0)

      setDefaultValue((prev) => ({
        ...prev,
        startMonth: 1,
        unitCurrency: kpiUnitCurrency ?? '원',
        totalBudget: totalBudget?.toLocaleString(),
        remainBudget: totalBudget?.toLocaleString()
      }))
    }
  }, [dataKpiList])

  useEffect(() => {
    const { data: channelList = [] } = dataChannelList?.data ?? {}
    if (channelList && channelList?.length > 0) {
      const channelNames = channelList.flatMap((entry) => entry?.channels?.map((channel) => channel?.name))
      const uniqueChannelNames = Array.from(new Set(channelNames)) ?? []
      const defaultValuesForm = Array.from({ length: uniqueChannelNames?.length }, (_, index) => ({
        channel: uniqueChannelNames?.[index],
        monthSelectedList: Array(12).fill(''),
        budget: ''
      }))

      setDefaultValue((prev) => ({ ...prev, data: defaultValuesForm }))
    }
  }, [dataChannelList])

  // ====
  return { ...defaultValue }
}

export { useGetDefaultValue }
