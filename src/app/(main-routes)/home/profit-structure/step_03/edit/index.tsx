'use client'
import { useFormContext } from 'react-hook-form'
import { Box, Stack, useTheme } from '@mui/material'
import { IFormValuesSalesAnalysis } from '@/types/profit-structure.type'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { remConvert } from '@/utils/convert-to-rem'
import { ModalReset } from '@/components/dialog/modal-deck'
import { STEP } from '@/constants/common.constant'
import { useProfitStructurePostData } from '../../use-profit-structure'
import { useLanguage } from '@/hooks/use-language'
import useToggle from '@/hooks/use-toggle'
import Title from '@/components/title'
import ExpectedSales from '../_expected-sales'
import AnnualSales from '../_annual-sales'
import { DATA_UNIT_CURRENCY } from './../../data'
import styles from './../../style.module.scss'

function Step_03_Edit() {
  const { palette } = useTheme()
  const { dict, lang } = useLanguage()
  const form = useFormContext<IFormValuesSalesAnalysis>()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { handleSubmit, reset, setValue, watch, formState } = form
  const selectedExpectedSaleList = watch('expectedSales') || []
  const selectedSaleGoalList = watch('annualSalesGoals') || []

  const { mutation } = useProfitStructurePostData<IFormValuesSalesAnalysis>(STEP.STEP_THREE, {
    keyListRefetchQuery: ['data-profit-sales-analysis'],
    removeIdList: []
  })

  // =====
  const handleResetForm = () => {
    const defaultValue = { currency: DATA_UNIT_CURRENCY[lang || 'kr'][0].value, startYear: 0 }
    reset(defaultValue)

    if (selectedExpectedSaleList && selectedExpectedSaleList?.length > 0) {
      const defaultValueExpectedSales = { unit: '', quantity: '' }
      selectedExpectedSaleList.forEach((_, index) => setValue(`expectedSales.${index}`, defaultValueExpectedSales))
    }
    if (selectedSaleGoalList && selectedSaleGoalList?.length > 0) {
      const defaultValueSaleGoals = { sale: '', desc: '', color: '' }
      selectedSaleGoalList.forEach((_, index) => setValue(`annualSalesGoals.${index}`, defaultValueSaleGoals))
    }

    setToggleShowDialog(false)
  }
  const onSubmit = handleSubmit((data: IFormValuesSalesAnalysis) => {
    mutation(data)
  })

  // =====
  return (
    <Box component={'form'} onSubmit={onSubmit} className={styles.step_content}>
      <Box sx={{ marginTop: remConvert('52px') }}>
        <Title label={dict.profit_step3_title2} subLabel={dict.profit_step3_title2_sub} />
        <ExpectedSales />
      </Box>

      <Box sx={{ marginTop: remConvert('60px') }}>
        <Title label={dict.profit_step3_title3} subLabel={dict.profit_step3_title3_sub} />
        <AnnualSales />
      </Box>

      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton type='submit' disabled={formState.isSubmitting || !formState.isValid} />
      </Stack>
    </Box>
  )
}

export default Step_03_Edit
