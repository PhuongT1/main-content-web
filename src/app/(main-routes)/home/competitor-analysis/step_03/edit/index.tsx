'use client'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSetRecoilState, useRecoilState } from 'recoil'
import { useMutation } from '@tanstack/react-query'
import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import { dataDeckActive, projectIdCompanyAnalysis } from '@/atoms/home/competitor-analysis'
import { Box, Stack } from '@mui/material'
import { TStepPayload, StatusStep } from '@/types/step.type'
import { IFormValuesStepThree } from '@/types/competitor-analysis.type'
import { postStep } from '@/services/step.service'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import Title from '@/components/title'
import { convertToRem } from '@/utils/convert-to-rem'
import { STEP } from '@/constants/common.constant'
import { DEFAULT_STEP } from '@/constants/competitor-analysis'
import { ModalReset } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'
import { FIELD_TYPE } from './../../_components/utils'
import TableComparison from '../../_components/table_comparison'
import styles from './../../style.module.scss'

function Step_03_Edit() {
  const [projectId] = useRecoilState(projectIdCompanyAnalysis)
  const setActiveStep = useSetRecoilState(activeStepSelector)
  const setCompleteStep = useSetRecoilState(completeStepSelector)
  const [deckActive] = useRecoilState(dataDeckActive)
  const form = useFormContext<IFormValuesStepThree>()
  const { handleSubmit, reset, formState, watch } = form
  const rowList = watch('rowList') ?? []

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const handleResetForm = () => {
    const defaultValue = rowList.filter((row) =>
      [FIELD_TYPE.TARGET_CUSTOMER, FIELD_TYPE.DIFFERENT_CHARACTERISTICS].includes(row?.type)
    ).map((row) => ({...row, name: row?.type === FIELD_TYPE.TARGET_CUSTOMER ? '타깃고객' : '차별화특성' }))

    reset({ rowList: defaultValue })
    setToggleShowDialog(false)
  }
  const handleCompleteStep = async () => {
    setCompleteStep((pre) => {
      if (!pre.includes(STEP.STEP_THREE)) {
        return [...pre, STEP.STEP_THREE]
      }
      return pre
    })
    setActiveStep((pre) => pre + 1)
  }

  const submitStep = useMutation({
    mutationFn: postStep<IFormValuesStepThree>,
    onSuccess: ({}) => handleCompleteStep()
  })
  const onSubmit = handleSubmit((values: IFormValuesStepThree) => {
    const payload = {
      ...DEFAULT_STEP,
      projectId,
      stepId: Number(deckActive[STEP.STEP_THREE]?.id || 3),
      playTime: 0,
      status: StatusStep.FINISHED,
      currentStep: STEP.STEP_THREE,
      deletedStepActivitiesIds: [],
      data: { ...values }
    }
    submitStep.mutateAsync(payload as TStepPayload<IFormValuesStepThree>)
  })

  const isValidOptionRow = useMemo(() => {
    return rowList.every((row) =>
      Object.values(row?.data).every((value) => typeof value !== 'string' || value.trim() !== '')
    )
  }, [JSON.stringify(rowList)])

  return (
    <Box component={'form'} onSubmit={onSubmit} className={styles.step_content}>
      <Box sx={{ marginTop: convertToRem(52) }}>
        <Title
          label='경쟁사 비교분석'
          subLabel='수익구조, 홍보마케팅 등 다양한 비교항목 양식을 추가해 내 기업과 경쟁사의 강점과 약점을 분석해 보세요.'
        />
      </Box>

      <TableComparison form={form} />

      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <RefreshButton onClick={() => setToggleShowDialog(true)} />
        <SubmitButton type='submit' disabled={formState.isSubmitting || !isValidOptionRow || !formState.isValid} />
      </Stack>
    </Box>
  )
}

export default Step_03_Edit
