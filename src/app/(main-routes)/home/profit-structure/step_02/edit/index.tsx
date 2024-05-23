'use client'
import { useFormContext } from 'react-hook-form'
import { Box, Stack, useTheme } from '@mui/material'
import { IFormValuesPricingStrategy } from '@/types/profit-structure.type'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { remConvert } from '@/utils/convert-to-rem'
import { ModalReset } from '@/components/dialog/modal-deck'
import { STEP } from '@/constants/common.constant'
import { useProfitStructurePostData } from '../../use-profit-structure'
import { useLanguage } from '@/hooks/use-language'
import useToggle from '@/hooks/use-toggle'
import Title from '@/components/title'
import TipItem from '@/components/home/tip-item'
import PricingStrategies from './../_pricing-strategies'
import styles from './../../style.module.scss'
import { DATA_TIP_PRICING_STRATEGY } from './../../data'

function Step_02_Edit() {
  const { palette } = useTheme()
  const { dict, lang } = useLanguage()
  const form = useFormContext<IFormValuesPricingStrategy>()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { handleSubmit, reset, control, formState } = form

  const { mutation } = useProfitStructurePostData<IFormValuesPricingStrategy>(STEP.STEP_TWO, {
    keyListRefetchQuery: ['data-profit-pricing-strategy'],
    removeIdList: []
  })

  // =====
  const handleResetForm = () => {
    const defaultValue = { strategyList: [] }
    reset(defaultValue)
    setToggleShowDialog(false)
  }
  const onSubmit = handleSubmit((data: IFormValuesPricingStrategy) => {
    mutation(data)
  })

  // =====
  return (
    <Box component={'form'} onSubmit={onSubmit} className={styles.step_content}>
      <Box sx={{ marginTop: remConvert('52px') }}>
        <Title label={dict.profit_step2_title1} subLabel={dict.profit_step2_title1_sub} />

        <PricingStrategies />

        <TipItem
          containerSx={{ paddingY: remConvert('12px'), mt: remConvert('20px') }}
          content={DATA_TIP_PRICING_STRATEGY[lang || 'kr']}
        />
      </Box>

      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton type='submit' disabled={formState.isSubmitting || !formState.isValid} />
      </Stack>
    </Box>
  )
}

export default Step_02_Edit
