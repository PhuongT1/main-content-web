'use client'

// mui
import { Box, useTheme } from '@mui/material'

// components
import { Alert as AlertDialog } from '@/components/dialog'
// data
import { useFieldArray, useFormContext } from 'react-hook-form'

import SectionTitle from '@/components/home/section-title'
import { EventNameTBuidlding, MAX_ITEM_PERSON_HOST } from '@/constants/teambuilding/teambuilding.constant'
import useToggle from '@/hooks/use-toggle'
import { TFormValuesStepOnceAndSecond } from '@/types/teambuilding/index.type'

import { AddButton, RefreshButton, SubmitButton } from '@/components/home/button'
import { useRecoilValue } from 'recoil'
import ProfilePersonItem from '../../../_components/profile-person-item'
import { getStep } from '@/atoms/home/teambuilding'
import { GREETING_INTRO_STEP1, ROLE_TEAMBUILDING, ROLE_TYPE } from '@/mock/teambuilding/data'
import { useStepApi } from '@/hooks/use-step-api'
import { StatusStep } from '@/types/step.type'
import { TeambuldingEnumId } from '../..'
import { STEP } from '@/constants/common.constant'
import { defaultValuesStep01, initValues } from '..'
import { useEffect, useState } from 'react'
import ErrorMessage from '@/form/ErrorMessage'
import { listenEvent } from '@/utils/events'
import { isEmpty } from '@/utils/object'
import { useLanguage } from '@/hooks/use-language'
import RefreshIcon from '@/assets/icons/refresh'
import CheckedboxIcon from '@/assets/icons/checkbox/check'

type TStepTBuilding1Props = {}

function Step_01_Edit(props: TStepTBuilding1Props) {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const form = useFormContext<TFormValuesStepOnceAndSecond>()

  const [errorMessage, setErrorMessage] = useState<string>()
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const step = useRecoilValue(
    getStep({ position: TeambuldingEnumId.StepPosition.Step01, deckId: TeambuldingEnumId.DeckId })
  )

  const { mCreate } = useStepApi({})
  const {
    control,
    trigger,
    getValues,
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid, errors }
  } = form

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'data',

    rules: { maxLength: MAX_ITEM_PERSON_HOST }
  })

  const handleAddProfilePerson = async () => {
    // return false if have error
    const isCheckValid = await trigger('data')
    if (fields.length === 1) {
      const { isEmailRequired, isManualDomain, eduandexp, ...other } = getValues('data')[0]

      const isAnyFieldHaveValues = Object.values(other).some((v) => !!v)
      if (eduandexp?.length === 0 && !isAnyFieldHaveValues) {
        setErrorMessage(dict.teambuilding_ceo_required_msg)
        return
      }
    }

    if (fields.length >= MAX_ITEM_PERSON_HOST) {
      setErrorMessage(dict.teambuilding_ceo_3_maxlength_msg)
      return
    }
    if (isCheckValid) {
      append(initValues)
    }
  }

  const handleRemoveProfileItem = (index: number) => {
    remove(index)
    if (errorMessage) {
      setErrorMessage('')
    }
  }
  const handleResetProfilePerson = async () => {
    reset(defaultValuesStep01, { keepDefaultValues: false })
    setToggleShowDialog(false)
  }

  const onSubmit = handleSubmit(async (values: TFormValuesStepOnceAndSecond) => {
    // save step
    
    const parsedData = values?.data?.map((item) => {
      const { description, descriptionEn, role, roleEn, ...prev} = item;
      const { titleEn, titleKr } = GREETING_INTRO_STEP1.find(x => x.id === Number(description)) || { titleEn: '', titleKr: ''};
      const { nameEn, nameKr } = ROLE_TEAMBUILDING.find(x => x.id === Number(role)) || { nameEn: '', nameKr: ''};
      return {
        ...prev,
        description: titleKr || description,
        descriptionEn: titleEn || descriptionEn,
        role: nameKr || role,
        roleEn: nameEn || roleEn
      }
    })

    await mCreate.mutateAsync({
      data: parsedData || [],
      playTime: 0,
      status: StatusStep.FINISHED,
      projectId: 0,
      deckId: TeambuldingEnumId.DeckId,
      stepId: step.id,
      currentStep: STEP.STEP_ONE,
      deletedStepActivitiesIds: []
    })
  })
  useEffect(() => {
    listenEvent(EventNameTBuidlding.CLEAR_ERROR_MSG, () => {
      setErrorMessage('')
    })
  }, [])

  return (
    <Box component={'form'} onSubmit={onSubmit}>
      <SectionTitle title={dict.teambuilding_1_title} subtitle={dict.teambuilding_1_sub_title} />
      {fields.map((field, index) => (
        <ProfilePersonItem
          greetingList={GREETING_INTRO_STEP1}
          markText={dict.teambuilding_ceo}
          role={ROLE_TYPE.MASTER}
          formProps={form}
          handleRemoveProfileItem={handleRemoveProfileItem}
          key={field.id}
          index={index}
        />
      ))}
      <ErrorMessage message={errorMessage} />
      <AlertDialog
        description={dict.dialog_delete_description}
        title={dict.dialog_delete_title}
        open={showDialog}
        onCancel={toggleShowDialog}
        onSubmit={handleResetProfilePerson}
      />
      <Box
        mt={'60px'}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        gap={'60px'}
        width='100%'
      >
        <AddButton disabled={fields.length === MAX_ITEM_PERSON_HOST} onClick={handleAddProfilePerson} />

        <Box display='flex' justifyContent='center' alignItems='center' gap={2} width='100%'>
          <RefreshButton
            onClick={toggleShowDialog}
            sx={{
              backgroundColor: home.gray300,
              color: home.gray50
            }}
            startIcon={<RefreshIcon pathProps={{ stroke: home.gray50 }} />}
          />
          <SubmitButton
            disabled={isSubmitting || !isEmpty(errors) || !isValid}
            type='submit'
            sx={{
              backgroundColor: home.blue500,
              color: home.gray500
            }}
            startIcon={<CheckedboxIcon width={20} height={20} stroke={home.gray500} />}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Step_01_Edit
