'use client'

// mui
import { Box, useTheme } from '@mui/material'

// form

// data
import { UseFormProps, useForm } from 'react-hook-form'

import FormProvider from '@/form/FormProvider'
import useToggle from '@/hooks/use-toggle'

import { diagramDataSelector, getStep, statusTabSelector } from '@/atoms/home/teambuilding'
import { Alert as AlertDialog } from '@/components/dialog'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import SectionTitle from '@/components/home/section-title'
import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'
import { useStepApi } from '@/hooks/use-step-api'
import { StatusStep } from '@/types/step.type'
import { listenEvent, sendEvent } from '@/utils/events'
import { useRecoilState, useRecoilValue } from 'recoil'
import { TeambuldingEnumId } from '../..'
import OrganizationEditor from '../editor'
import TreeOrganzation from '../tree-organizaion'
import { STEP } from '@/constants/common.constant'
import { activeStepSelector, completeStepSelector, expandStepSelector } from '@/atoms/home/stepper'
import ErrorMessage from '@/form/ErrorMessage'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/hooks/use-language'
import CheckedboxIcon from '@/assets/icons/checkbox/check'
import RefreshIcon from '@/assets/icons/refresh'

export type TFormValues = {
  contents: string
}

function Step_04_Edit() {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const diagramData = useRecoilValue(diagramDataSelector)
  const isNotEditorMode = useRecoilValue(statusTabSelector)
  const [, setCompleteStep] = useRecoilState(completeStepSelector)
  const [, setActiveStep] = useRecoilState(activeStepSelector)
  const expandStep = useRecoilValue(expandStepSelector)
  const activeTab = useRecoilValue(statusTabSelector)

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const step = useRecoilValue(
    getStep({ position: TeambuldingEnumId.StepPosition.Step04, deckId: TeambuldingEnumId.DeckId })
  )
  const { mCreate } = useStepApi({})

  const [errorMessage, setErrorMessage] = useState<string>()

  const onDispatchMessage = () => {
    setErrorMessage('10개까지 추가할 수 있습니다')
  }
  useEffect(() => {
    listenEvent(EventNameTBuidlding.CLEAR_ERROR_MSG, () => {
      setErrorMessage('')
    })
  }, [])

  const formOption: UseFormProps<TFormValues> = {
    defaultValues: { contents: '' }
  }
  const methods = useForm<TFormValues>(formOption)

  const { handleSubmit } = methods

  const checkAllDataEntered = () => {
    if (!diagramData || diagramData.nodes.length === 0) return false
    return diagramData.nodes.every((node) => node.data.position && node.data.name)
  }

  const onSubmit = handleSubmit(async (values: TFormValues) => {
    const isCanUpdate = checkAllDataEntered()
    if (!isNotEditorMode) {
      const data = await mCreate.mutateAsync({
        data: diagramData,
        playTime: 0,
        status: StatusStep.FINISHED,
        projectId: 0,
        deckId: TeambuldingEnumId.DeckId,
        stepId: step.id,
        currentStep: STEP.STEP_FOUR,
        deletedStepActivitiesIds: []
      })
    } else {
      !expandStep.includes(STEP.STEP_FOUR) && setActiveStep((pre) => pre + 1)
      setCompleteStep((pre) => {
        if (!pre.includes(STEP.STEP_FOUR)) {
          return [...pre, STEP.STEP_FOUR]
        }
        return pre
      })
    }
  })

  const handleReset = () => {
    sendEvent(EventNameTBuidlding.RESET_TBUIDLING_ST4, {})
    setToggleShowDialog(false)
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <SectionTitle title={dict.teambuilding_4_title} subtitle={dict.teambuilding_4_sub_title} />
      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='100%'>
        <AlertDialog
          onSubmit={handleReset}
          description={dict.teambuilding_refresh_sub_title}
          title={dict.teambuilding_refresh_title}
          cancelTxt={dict.common_cancel}
          submitTxt={dict.common_deck_yes}
          open={showDialog}
          onCancel={toggleShowDialog}
        />
        {activeTab ? <TreeOrganzation /> : <OrganizationEditor onDispatchMessage={onDispatchMessage} />}

        <Box width={1} mt={3}>
          <ErrorMessage message={errorMessage} />
        </Box>

        <Box display='flex' justifyContent='center' alignItems='center' gap={'20px'} mt={'60px'} width='100%'>
          <RefreshButton
            onClick={toggleShowDialog}
            sx={{
              backgroundColor: home.gray300,
              color: home.gray50
            }}
            startIcon={<RefreshIcon pathProps={{ stroke: home.gray50 }} />}
          />
          <SubmitButton
            disabled={diagramData.nodes.length === 0 && !activeTab}
            type='submit'
            sx={{
              backgroundColor: home.blue500,
              color: home.gray500
            }}
            startIcon={<CheckedboxIcon width={20} height={20} stroke={home.gray500} />}
          />
        </Box>
      </Box>
    </FormProvider>
  )
}

export default Step_04_Edit
