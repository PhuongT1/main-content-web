'use client'
import { useFormContext } from 'react-hook-form'
import { Box, Stack, useTheme } from '@mui/material'
import { IFormValuesTamSamSom } from '@/types/profit-structure.type'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { remConvert } from '@/utils/convert-to-rem'
import { ModalReset } from '@/components/dialog/modal-deck'
import { STEP } from '@/constants/common.constant'
import { useProfitStructurePostData } from '../../use-profit-structure'
import useToggle from '@/hooks/use-toggle'
import Title from '@/components/title'
import TableTamSamSom from '../_table'
import CardsTamSamSom from '../_cards'
import styles from './../../style.module.scss'

function Step_05_Edit() {
  const { palette } = useTheme()
  const form = useFormContext<IFormValuesTamSamSom>()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const { handleSubmit, reset, watch, setValue, formState } = form
  const dataCards = watch('data') || []

  const { mutation } = useProfitStructurePostData<IFormValuesTamSamSom>(STEP.STEP_FIVE, {
    keyListRefetchQuery: ['data-tam-sam-som'],
    removeIdList: []
  })

  // =====
  const handleResetForm = () => {
    const defaultValue = { type: '', data: [] }
    reset(defaultValue)

    if (dataCards && dataCards?.length > 0) {
      const defaultValueCardItem = { marketCate: '', marketSize: '', calculationBasis: '' }
      dataCards.forEach((_, index) => setValue(`data.${index}`, defaultValueCardItem))
    }

    setToggleShowDialog(false)
  }
  const onSubmit = handleSubmit((data: IFormValuesTamSamSom) => {
    mutation(data)
  })

  // =====
  return (
    <Box component={'form'} onSubmit={onSubmit} className={styles.step_content}>
      <Box sx={{ marginTop: remConvert('52px') }}>
        <Title label='시장규모 측정' subLabel='시장규모를 TAM SAM SOM에 맞게 구분해서 작성해보세요.' />
        <TableTamSamSom />
      </Box>

      <Box sx={{ marginTop: remConvert('60px') }}>
        <Title label='TAM SAM SOM 디자인' subLabel='원하는 디자인 형태를 선택해보세요.' />
        <CardsTamSamSom />
      </Box>

      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton type='submit' disabled={formState.isSubmitting || !formState.isValid} />
      </Stack>
    </Box>
  )
}

export default Step_05_Edit
