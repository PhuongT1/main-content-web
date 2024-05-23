'use client'
import { useFormContext } from 'react-hook-form'
import { Box, Stack, useTheme } from '@mui/material'
import { IFormValuesProfitGenerationStructure } from '@/types/profit-structure.type'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { remConvert } from '@/utils/convert-to-rem'
import { ModalReset } from '@/components/dialog/modal-deck'
import { MAX_LENGTH } from '@/constants/profit-structure.constant'
import { STEP } from '@/constants/common.constant'
import { useProfitStructurePostData } from '../../use-profit-structure'
import { useLanguage } from '@/hooks/use-language'
import useToggle from '@/hooks/use-toggle'
import InputWrapper from '@/components/input-wrapper'
import Title from '@/components/title'
import ProfitStructureList from '../_profit-structures'
import styles from './../../style.module.scss'

function Step_01_Edit() {
  const { palette } = useTheme()
  const form = useFormContext<IFormValuesProfitGenerationStructure>()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { handleSubmit, reset, control, formState, watch, trigger } = form
  const { dict, t } = useLanguage()

  const { mutation } = useProfitStructurePostData<IFormValuesProfitGenerationStructure>(STEP.STEP_ONE, {
    keyListRefetchQuery: ['data-profit-generation-structures']
  })

  // =====
  const handleResetForm = () => {
    const defaultValue = { brand: '', idea: '', profitStructureList: [] }
    reset(defaultValue)
    setToggleShowDialog(false)
  }
  const onSubmit = handleSubmit((data: IFormValuesProfitGenerationStructure) => {
    mutation(data)
  })

  // =====
  return (
    <Box component={'form'} onSubmit={onSubmit} className={styles.step_content}>
      <InputWrapper
        title={dict.profit_step1_title2}
        subTitle={dict.profit_step1_title2_sub}
        items={[
          {
            name: 'brand',
            label: dict.profit_step1_input1_label,
            column: 3,
            placeholder: dict.profit_step1_input1_placeholder,
            propsInput: { control },
            textFieldProps: { inputProps: { maxLength: MAX_LENGTH.BRAND } }
          },
          {
            name: 'idea',
            label: dict.profit_step1_input2_label,
            column: 9,
            placeholder: dict.profit_step1_input2_placeholder,
            propsInput: { control },
            textFieldProps: { inputProps: { maxLength: MAX_LENGTH.IDEA } }
          }
        ]}
        sxWrapper={{
          '.MuiInputBase-root': { height: remConvert('56px') },
          '.MuiInputBase-input': { padding: remConvert('10px') }
        }}
      />

      <Box sx={{ marginTop: remConvert('60px') }}>
        <Title
          label={
            <>
              <Box component={'h2'} sx={{ color: palette.home.gray50 }}>
                {dict.profit_step1_title3}
              </Box>
              <Box component={'h4'} sx={{ color: palette.home.mint500, fontWeight: 600, marginLeft: 1 }}>
                {t('profit_step1_title3_note', { number: MAX_LENGTH.REVENUE_GENERATION_STRUCTURE })}
              </Box>
            </>
          }
          subLabel={dict.profit_step1_title3_sub}
        />

        <ProfitStructureList />
      </Box>

      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton type='submit' disabled={formState.isSubmitting || !formState.isValid} />
      </Stack>
    </Box>
  )
}

export default Step_01_Edit
