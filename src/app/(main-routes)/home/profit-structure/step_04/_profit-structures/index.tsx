import { useFormContext, useFieldArray } from 'react-hook-form'
import { Box, useTheme } from '@mui/material'
import { IItemProfitGenerationStructure } from '@/types/profit-structure.type'
import { optionAutoFillItems } from '@/utils/styles'
import { remConvert } from '@/utils/convert-to-rem'
import { LoadingProfitStructure } from './../../step_01/_profit-structures'
import CardMarketingGoal from '@/components/cards/marketing-goal-card'
import { useGetDefaultValueProfitStructures } from './../useValue'

function ProfitStructures() {
  const { palette } = useTheme()
  const { control } = useFormContext()
  const { append, remove, fields: profitStructures = [] } = useFieldArray({ control, name: 'profitStructures' })
  const { isLoadingProfitStructureList, dataProfitStructureList = [] } = useGetDefaultValueProfitStructures()

  // =====
  const handleClickCardItem = (item: IItemProfitGenerationStructure) => {
    if (!item || !item?.id) return
    const index = profitStructures?.findIndex((card: IItemProfitGenerationStructure) => item?.name === card?.name)
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
      <Box sx={{ ...optionAutoFillItems({ minWidth: 200, mediaQuery: 1048, gap: 12, maxColumn: 3 }) }}>
        {isLoadingProfitStructureList
          ? Array.from({ length: 3 }, (_, index) => <LoadingProfitStructure key={index} />)
          : dataProfitStructureList?.map((item) => (
              <Box key={item?.id}>
                <CardMarketingGoal
                  sxCard={{
                    backgroundColor: palette.home.gray400,
                    img: { height: `${remConvert('200px')} !important` }
                  }}
                  sxBoxTitle={{ fontSize: remConvert('20px') }}
                  onClickCardItemData={handleClickCardItem}
                  selectedGoals={profitStructures}
                  item={item}
                />
              </Box>
            ))}
      </Box>
    </>
  )
}

export default ProfitStructures
