'use client'
import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import { ModalReset } from '@/components/dialog/modal-deck'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import Title from '@/components/title'
import { STEP } from '@/constants/common.constant'
import { useDialog } from '@/hooks/use-dialog'
import { postStep } from '@/services/step.service'
import { StatusStep } from '@/types/step.type'
import { convertToRem } from '@/utils/convert-to-rem'
import { Box, Stack } from '@mui/material'
import { QueryClient, useMutation } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import styles from '../../[projectId]/style.module.scss'
import { COMPOSITION_FORM_DEFAULT_VALUES } from '../../constants/business-model-composition.constant'
import { BUSINESS_MODEL, STEP_ID } from '../../constants/business.constant'
import { TBusinessModelCompositionForm } from '../../types/business-model-composition.type'
import BusinessModelComposition from '../business-model-composition'

function Step_02_Edit({projectId}: {projectId: number}) {
  const setActiveStep = useSetRecoilState(activeStepSelector)
  const setCompleteStep = useSetRecoilState(completeStepSelector)
  const form = useFormContext<TBusinessModelCompositionForm>()
  const queryClient = new QueryClient()
  const { handleSubmit, reset } = form
  const { open, onClose, onOpen } = useDialog()

  const submitStep = useMutation({
    mutationFn: postStep<TBusinessModelCompositionForm>,
    onSuccess: ({ data: _ }) => {
      queryClient.refetchQueries({
        queryKey: [`business-model-step-${STEP_ID.STEP_TWO}`]
      })
      handleCompleteStep()
    }
  })

  const onResetForm = () => {
    reset(COMPOSITION_FORM_DEFAULT_VALUES)
    onClose()
  }

  const onSubmit = handleSubmit((values: TBusinessModelCompositionForm) => {
    const payload = {
      projectId: projectId, //TODO: MOCK PROJECTID
      deckId: BUSINESS_MODEL.DECK_ID,
      stepId: STEP_ID.STEP_TWO,
      playTime: 0,
      status: StatusStep.FINISHED,
      currentStep: STEP.STEP_TWO,
      deletedStepActivitiesIds: [],

      data: {
        diagramDatas: values.diagramDatas,
        diagramRelationshipDatas: values.diagramRelationshipDatas
      }
    }
    submitStep.mutateAsync(payload)
  })

  const handleCompleteStep = async () => {
    setCompleteStep((pre) => {
      if (!pre.includes(STEP.STEP_TWO)) {
        return [...pre, STEP.STEP_TWO]
      }
      return pre
    })
    setActiveStep((pre) => pre + 1)
  }

  return (
    <Box component={'form'} onSubmit={onSubmit} onKeyDown={(e) => {
      if (e.key == 'Enter') {
        e.preventDefault()
        return false
      }
    }} className={styles.step_content}>
      <Box sx={{ marginTop: convertToRem(52) }}>
        <Title label='비즈니스 모델 구성' subLabel='다양한 주체 간의 상호 작용을 표현하여 주체들 간의 조직적 구조 상호 의존성에 따라 적합한 비즈니스 모델을 구성해보세요.' />
      </Box>
      <BusinessModelComposition form={form} />
      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <RefreshButton onClick={onOpen} />
        <SubmitButton type='submit' />
      </Stack>
      {/* Modal */}
      <ModalReset open={open} onCancel={onClose} onSubmit={onResetForm} />
    </Box>
  )
}

export default Step_02_Edit
