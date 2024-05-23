import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, useTheme } from '@mui/material'
import { optionAutoFillItems } from '@/utils/styles'
import { remConvert } from '@/utils/convert-to-rem'
import { IItemProfitGenerationStructure } from '@/types/profit-structure.type'
import { useGetDefaultValueProfitDiagram } from './../useValue'
import CardMarketingGoal from '@/components/cards/marketing-goal-card'
import EditorFlow from './../_editor'

function ProfitDiagrams() {
  const { palette } = useTheme()
  const { setValue, watch } = useFormContext()
  const watchSelectedDiagram = watch('profitDiagram.type')
  const { dataProfitDiagrams } = useGetDefaultValueProfitDiagram({})
  const [isChangeTypeDiagram, setIsChangeTypeDiagram] = useState(false)

  // =====
  const handleClickCardItem = (item: IItemProfitGenerationStructure) => {
    if (!item || !item?.id) return
    if (watchSelectedDiagram?.id === item?.id) return setValue('profitDiagram.type', {})
    setValue('profitDiagram.type', { ...item, image: '' })
    setIsChangeTypeDiagram(true)
  }

  // =====
  return (
    <>
      <Box sx={{ ...optionAutoFillItems({ minWidth: 240, mediaQuery: 1248, gap: 12, maxColumn: 3 }) }}>
        {dataProfitDiagrams?.map((item) => (
          <Box key={item?.id}>
            <CardMarketingGoal
              icon='radio'
              sxCard={{
                backgroundColor: palette.home.gray400,
                button: { '.MuiBox-root': { backgroundColor: 'initial' } }
              }}
              onClickCardItemData={handleClickCardItem}
              selectedGoals={[watchSelectedDiagram]}
              item={item}
            >
              <Box textAlign={'center'} p={remConvert('16px')}>
                {item?.image}
              </Box>
            </CardMarketingGoal>
          </Box>
        ))}
      </Box>

      {watchSelectedDiagram?.id && (
        <EditorFlow type={watchSelectedDiagram.id} isChangeTypeDiagram={isChangeTypeDiagram} />
      )}
    </>
  )
}

export default ProfitDiagrams
