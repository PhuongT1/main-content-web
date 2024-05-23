import { useFormContext, useFieldArray } from 'react-hook-form'
import { Box, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { IItemProfitGenerationStructure } from '@/types/profit-structure.type'
import { getRevenueStructure } from '@/services/profit-structure.service'
import { optionAutoFillItems } from '@/utils/styles'
import { remConvert } from '@/utils/convert-to-rem'
import CardMarketingGoal from '@/components/cards/marketing-goal-card'
import { LoadingProfitStructure } from './../../step_01/_profit-structures'

const type = '가격전략'
function PricingStrategyList() {
  const { palette } = useTheme()
  const { control } = useFormContext()
  const { append, remove, fields: strategyList = [] } = useFieldArray({ control, name: 'strategyList' })

  const { data: dataProfitStructureList = [], isLoading } = useQuery({
    queryKey: ['profit-structure-list-items', type],
    queryFn: () => getRevenueStructure({ type }),
    meta: { offLoading: true }
  })

  // =====
  const handleClickCardItem = (item: IItemProfitGenerationStructure) => {
    if (!item || !item?.id) return

    const index = strategyList?.findIndex((card: IItemProfitGenerationStructure) => item?.name === card?.name)
    if (index > -1) {
      remove(index)
      return
    }

    remove(0)
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
                  sxBoxTitle={{ fontSize: remConvert('20px') }}
                  onClickCardItemData={handleClickCardItem}
                  selectedGoals={strategyList}
                  item={item}
                />
              </Box>
            ))}
      </Box>
    </>
  )
}

export default PricingStrategyList
