import { useState, useEffect } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { Box, Stack, useTheme, Skeleton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { convertToRem } from '@/utils/convert-to-rem'
import { MAX_LENGTH } from '@/constants/profit-structure.constant'
import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'
import { IItemProfitGenerationStructure } from '@/types/profit-structure.type'
import { getRevenueStructure } from '@/services/profit-structure.service'
import { useLanguage } from '@/hooks/use-language'
import { optionAutoFillItems } from '@/utils/styles'
import { listenEvent } from '@/utils/events'
import CardMarketingGoal from '@/components/cards/marketing-goal-card'
import TipItem from '@/components/home/tip-item'
import ErrorMessage from '@/form/ErrorMessage'
import { DATA_TIP_PROFIT_GENERATION_STRUCTURE } from './../../data'

const type = '수익창출 구조'
function ProfitStructureList() {
  const { palette } = useTheme()
  const [messageAlert, setMessageAlert] = useState('')
  const { control } = useFormContext()
  const { append, remove, fields: profitStructureList = [] } = useFieldArray({ control, name: 'profitStructureList' })
  const { lang, t } = useLanguage()

  const { data: dataProfitStructureList = [], isLoading } = useQuery({
    queryKey: ['profit-structure-list-items', type],
    queryFn: () => getRevenueStructure({ type }),
    meta: { offLoading: true }
  })

  // =====
  useEffect(() => {
    listenEvent(EventNameTBuidlding.CLEAR_ERROR_MSG, () => {
      setMessageAlert('')
    })
  }, [])

  const handleClickCardItem = (item: IItemProfitGenerationStructure) => {
    if (!item || !item?.id) return

    const index = profitStructureList?.findIndex((card: IItemProfitGenerationStructure) => item?.name === card?.name)
    if (index > -1) {
      remove(index)
      return
    }
    if (profitStructureList?.length >= MAX_LENGTH.REVENUE_GENERATION_STRUCTURE) {
      setMessageAlert(t('profit_step1_error_msg_maxLength', { number: MAX_LENGTH.REVENUE_GENERATION_STRUCTURE }))
      return
    }

    append(item)
  }

  // =====
  return (
    <>
      <Box sx={{ ...optionAutoFillItems({ minWidth: 200, mediaQuery: 1480, gap: 12 }) }}>
        {isLoading
          ? Array.from({ length: 8 }, (_, index) => <LoadingProfitStructure key={index} />)
          : dataProfitStructureList?.map((item) => (
              <Box key={item?.id}>
                <CardMarketingGoal
                  sxCard={{ backgroundColor: palette.home.gray400 }}
                  sxBoxTitle={{ fontSize: convertToRem(20) }}
                  onClickCardItemData={handleClickCardItem}
                  selectedGoals={profitStructureList}
                  item={item}
                />
              </Box>
            ))}
      </Box>

      <TipItem
        containerSx={{ paddingY: convertToRem(12), mt: convertToRem(20) }}
        content={DATA_TIP_PROFIT_GENERATION_STRUCTURE[lang || 'kr']}
      />

      {messageAlert && (
        <Box component={'div'} sx={{ mt: convertToRem(20) }}>
          <ErrorMessage message={messageAlert} />
        </Box>
      )}
    </>
  )
}

export const LoadingProfitStructure = () => {
  const { palette } = useTheme()
  return (
    <Box p={convertToRem(20)} borderRadius={convertToRem(10)} sx={{ background: palette.home.gray400 }}>
      <Stack gap={convertToRem(12)}>
        <Skeleton variant='rounded' sx={{ width: '40%', height: 24 }} />
        <Skeleton variant='rounded' sx={{ height: 24 }} />
        <Skeleton variant='rounded' sx={{ height: 120, borderRadius: convertToRem(10) }} />
      </Stack>
    </Box>
  )
}

export default ProfitStructureList
