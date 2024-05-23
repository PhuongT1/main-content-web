'use client'
import { useState, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { Box } from '@mui/material'
import { IFormValuesMarketingChannels, IMarketingChannelsResponse } from '@/types/advertisement-marketing.type'
import { getMarketingPromotionalChannels } from '@/services/advertisement-marketing.service'
import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'
import { convertToRem } from '@/utils/convert-to-rem'
import { listenEvent } from '@/utils/events'
import { BoxLayout } from '@/components/home/box/box-custom'
import ErrorMessage from '@/form/ErrorMessage'
import CardMarketingStrategiesWrapper from '../../_components/card_strategies_wrapper'

type MarketingChannelsItemProps = {
  form: UseFormReturn<IFormValuesMarketingChannels>
  indexCard: number
  indexInput: number
  setActiveInput: (index: number) => void
}
function MarketingChannelsItem({
  form: { watch, setValue, getValues },
  indexCard = 0,
  indexInput = -1,
  setActiveInput
}: MarketingChannelsItemProps) {
  const [messageAlert, setMessageAlert] = useState('')
  const selectedChannels = watch(`data.${indexCard}.channels`)?.filter(Boolean)

  const { data: dataMarketingChannelsList, isLoading } = useQuery({
    queryKey: [`marketing-promotional-channels`],
    queryFn: () => getMarketingPromotionalChannels(),
    meta: { offLoading: true }
  })

  // =====
  useEffect(() => {
    listenEvent(EventNameTBuidlding.CLEAR_ERROR_MSG, () => {
      setMessageAlert('')
    })
  }, [])

  const handleClickCardItem = (item: IMarketingChannelsResponse | undefined) => {
    if (!item || !item.id) return
    setActiveInput(-1)
    const setItem = (index: number) => setValue(`data.${indexCard}.channels.${index}`, item)
    const removeItem = () =>
      setValue(
        `data.${indexCard}.channels`,
        selectedChannels?.filter((channel) => channel.id !== item.id)
      )

    if (selectedChannels?.some((channel) => channel.id === item.id)) {
      removeItem()
      return
    }
    if (indexInput > -1 && !getValues(`data.${indexCard}.channels.${indexInput}`)) {
      setItem(indexInput)
      return
    }

    if (selectedChannels?.length >= 3) {
      setMessageAlert(`홍보 채널은 3개까지 선택 가능합니다.`)
      return
    } else setMessageAlert('')
    for (let i = 0; i < 3; i++) {
      if (!getValues(`data.${indexCard}.channels.${i}`)) {
        setItem(i)
        break
      }
    }
  }

  // =====
  return (
    <>
      <Box sx={{ marginTop: convertToRem(20), width: '100%' }}>
        <BoxLayout
          flexDirection={'column'}
          alignItems={'flex-start'}
          sx={{
            backgroundColor: (theme) => theme.palette.home.gray400
          }}
        >
          <CardMarketingStrategiesWrapper
            data={(dataMarketingChannelsList || []) as IMarketingChannelsResponse[]}
            handleClickCardItem={handleClickCardItem as any}
            selectedData={selectedChannels}
            isLoading={isLoading}
          />
        </BoxLayout>

        {messageAlert && (
          <Box component={'div'} sx={{ mt: convertToRem('20px') }}>
            <ErrorMessage message={messageAlert} />
          </Box>
        )}
      </Box>
    </>
  )
}

export default MarketingChannelsItem
