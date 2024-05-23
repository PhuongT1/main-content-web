'use client'
import { dataCompanyAnalyzingStep1 } from '@/atoms/home/competitor-analysis'
import { activeStepSelector, completeStepSelector } from '@/atoms/home/stepper'
import { ModalReset } from '@/components/dialog/modal-deck'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import InputWrapper from '@/components/input-wrapper'
import { STEP } from '@/constants/common.constant'
import { useDialog } from '@/hooks/use-dialog'
import { postStep } from '@/services/step.service'
import { IFormValuesStepOne } from '@/types/competitor-analysis.type'
import { StatusStep, TStepPayload } from '@/types/step.type'
import { Box, Stack } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import styles from '../../[projectId]/style.module.scss'
import { CANVAS_FORM_DEFAULT_DATA } from '../../constants/business-model-canvas.constant'
import { BUSINESS_MODEL, MAX_LENGTH, STEP_ID } from '../../constants/business.constant'
import { TBusinessModelCavansForm, TRequiredCharacteristicError } from '../../types/business-model-canvas.type'
import BusinessModelCanvas from '../business-model-canvas'

interface IStep_01_Edit {
  data?: TStepPayload<IFormValuesStepOne>
  requiredCharacteristicErr: TRequiredCharacteristicError
  projectId: number
}
function Step_01_Edit({ data, requiredCharacteristicErr, projectId }: IStep_01_Edit) {
  const form = useFormContext<TBusinessModelCavansForm>()
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const [, setDataStep1] = useRecoilState(dataCompanyAnalyzingStep1)
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const { open, onClose, onOpen } = useDialog()

  const { handleSubmit, reset, control } = form

  const submitStep = useMutation({
    mutationFn: postStep<TBusinessModelCavansForm>,
    onSuccess: ({ data }) => {
      setDataStep1(data?.data)
      handleCompleteStep()
    }
  })

  const onResetForm = () => {
    reset(CANVAS_FORM_DEFAULT_DATA)
    onClose()
  }

  const onSubmit = handleSubmit((data: TBusinessModelCavansForm) => {
    const payload = {
      projectId: projectId,
      deckId: BUSINESS_MODEL.DECK_ID,
      stepId: STEP_ID.STEP_ONE,
      playTime: 0,
      status: StatusStep.FINISHED,
      currentStep: STEP.STEP_ONE,
      deletedStepActivitiesIds: [],

      data: {
        industry: data?.industry,
        idea: data?.idea,
        selectedCharacteristicByModel: data?.selectedCharacteristicByModel,
        isSubmit: true
      }
    }
    submitStep.mutateAsync(payload)
  })

  const handleCompleteStep = async () => {
    setCompleteStep((prev) => {
      if (!prev.includes(STEP.STEP_ONE)) {
        return [...prev, STEP.STEP_ONE]
      }
      return prev
    })
    handleOpenEditStepTwo()
  }

  const handleOpenEditStepTwo = () => {
    setCompleteStep((pre) => {
      const removeStep = pre.filter((item) => item !== STEP.STEP_TWO)
      return removeStep
    })
    setActiveStep(STEP.STEP_TWO)
  }

  // =====
  return (
    <Box component={'form'} onSubmit={onSubmit} className={styles.step_content} onKeyDown={(e) => {
      if (e.key == 'Enter') {
        e.preventDefault()
        return false
      }
    }}>
      <InputWrapper
        title='사업 아이디어'
        subTitle='사업 아이디어를 간략하게 정리해보세요.'
        items={[
          {
            name: 'industry',
            label: '타이틀',
            column: 3,
            placeholder: '브랜드명 입력',
            propsInput: { control },
            textFieldProps: { inputProps: { maxLength: MAX_LENGTH.INDUSTRY } }
          },
          {
            name: 'idea',
            label: '아이디어',
            column: 9,
            placeholder: '사회적 문제 해결을 위한 직장인 대상 해양 액티비티 선택 플랫폼',
            propsInput: { control },
            textFieldProps: { inputProps: { maxLength: MAX_LENGTH.IDEA } }
          }
        ]}
      />

      <BusinessModelCanvas form={form} data={data} {...{ requiredCharacteristicErr }} />

      <Stack flexDirection={'row'} className={styles.btn_wrapper}>
        <RefreshButton onClick={onOpen} />
        <SubmitButton type='submit' />
      </Stack>

      {/* Modal */}
      <ModalReset open={open} onCancel={onClose} onSubmit={onResetForm} />
    </Box>
  )
}

export default Step_01_Edit
