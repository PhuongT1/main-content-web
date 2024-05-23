import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, Stack, Divider, useTheme } from '@mui/material'
import { IFormValuesTamSamSom } from '@/types/profit-structure.type'
import { STEP } from '@/constants/common.constant'
import { EditButton } from '@/components/home/button'
import SectionTitle from '@/components/home/section-title'
import { convertToRem } from '@/utils/convert-to-rem'
import { useProfitStructureData, useClickButtonEdit } from '../../use-profit-structure'
import CardsView from '../_cards_view'
import styles from './../../style.module.scss'

function Step_05_View() {
  const { palette } = useTheme()
  const { reset } = useFormContext<IFormValuesTamSamSom>()

  const { data } = useProfitStructureData<IFormValuesTamSamSom>(STEP.STEP_FIVE, 'data-tam-sam-som')
  const { handleBtnEdit } = useClickButtonEdit(STEP.STEP_FIVE)

  // =====
  useEffect(() => {
    data?.data && reset(data.data)
  }, [data])

  // =====
  return (
    <Box component={'form'} className={styles.step_content}>
      <Divider sx={{ mt: convertToRem(52), mb: convertToRem(60), width: '100%', borderColor: palette.home.gray200 }} />

      <SectionTitle title='시장규모 측정' />
      <Box
        display={'flex'}
        justifyContent={'center'}
        minHeight={convertToRem(556)}
        bgcolor={palette.home.gray300}
        sx={{ borderRadius: convertToRem(10), p: convertToRem(16) }}
      >
        <CardsView data={data?.data} />
      </Box>

      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <EditButton onClick={handleBtnEdit} />
      </Stack>
    </Box>
  )
}

export default Step_05_View
