'use client'

// mui
import { Box, useTheme } from '@mui/material'

// components
import { Alert as AlertDialog } from '@/components/dialog'

// form

// data
import { useFieldArray, useFormContext } from 'react-hook-form'

import { getStep } from '@/atoms/home/teambuilding'
import { AddButton, RefreshButton, SubmitButton } from '@/components/home/button'
import SectionTitle from '@/components/home/section-title'
import { STEP } from '@/constants/common.constant'
import { EventNameTBuidlding, MAX_ITEM_PERSON_MEMBER } from '@/constants/teambuilding/teambuilding.constant'
import FormProvider from '@/form/FormProvider'
import { useStepApi } from '@/hooks/use-step-api'
import useToggle from '@/hooks/use-toggle'
import { GREETING_INTRO_STEP3, ROLE_TEAMBUILDING, ROLE_TYPE } from '@/mock/teambuilding/data'
import { StatusStep } from '@/types/step.type'
import { TFormValuesStepOnceAndSecond } from '@/types/teambuilding/index.type'
import { useRecoilValue } from 'recoil'
import { TeambuldingEnumId } from '../..'
import ProfilePersonItem from '../../../_components/profile-person-item'
import { defaultValuesStep01, initValues } from '../../step_01'
import { useEffect, useState } from 'react'
import { listenEvent } from '@/utils/events'
import ErrorMessage from '@/form/ErrorMessage'
import { isEmpty } from '@/utils/object'
import { useLanguage } from '@/hooks/use-language'
import RefreshIcon from '@/assets/icons/refresh'
import CheckedboxIcon from '@/assets/icons/checkbox/check'

type TStepTBuilding2Props = {}

function Step_02_Edit({ }: TStepTBuilding2Props) {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const form = useFormContext<TFormValuesStepOnceAndSecond>()
  const {
    control,
    reset,
    getValues,
    handleSubmit,
    trigger,
    formState: { isSubmitting, errors }
  } = form
  const [errorMessage, setErrorMessage] = useState<string>()

  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const step = useRecoilValue(
    getStep({ position: TeambuldingEnumId.StepPosition.Step02, deckId: TeambuldingEnumId.DeckId })
  )
  const { mCreate } = useStepApi({})
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'data',
    rules: { maxLength: MAX_ITEM_PERSON_MEMBER }
  })

  const handleAddProfilePerson = async () => {
    // return false if have error
    const isCheckValid = await trigger('data')
    if (fields.length === 1) {
      const { isEmailRequired, isManualDomain, eduandexp, ...other } = getValues('data')[0]

      const isAnyFieldHaveValue = Object.values(other).some((v) => !!v)
      if (eduandexp?.length === 0 && !isAnyFieldHaveValue) {
        setErrorMessage(dict.teambuilding_member_required_msg)

        return
      }
    }

    if (fields.length >= MAX_ITEM_PERSON_MEMBER) {
      setErrorMessage(dict.teambuilding_ceo_5_maxlength_msg)
      return
    }
    if (isCheckValid) {
      append(initValues)
    }
  }

  const handleRemoveProfileItem = (index: number) => {
    remove(index)
  }
  const handleResetProfilePerson = async () => {
    reset(defaultValuesStep01, { keepDefaultValues: false })
    setToggleShowDialog(false)
  }

  const onSubmit = handleSubmit(async (values: TFormValuesStepOnceAndSecond) => {
    // save step
    const parsedData = values?.data?.map((item) => {
      const { description, descriptionEn, role, roleEn, ...prev} = item;
      const { titleEn, titleKr } = GREETING_INTRO_STEP3.find(x => x.id === Number(description)) || { titleEn: '', titleKr: ''};
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
      currentStep: STEP.STEP_TWO,
      deletedStepActivitiesIds: []
    })
  })
  useEffect(() => {
    listenEvent(EventNameTBuidlding.CLEAR_ERROR_MSG, () => {
      setErrorMessage('')
    })
  }, [])

  return (
    <FormProvider methods={form} onSubmit={onSubmit}>
      <Box>
        <SectionTitle
          title={dict.teambuilding_2_title}
          subtitle={dict.teambuilding_2_sub_title}
        />

        {fields.map((field, index) => (
          <ProfilePersonItem
            greetingList={GREETING_INTRO_STEP3}
            markText={dict.teambuilding_members}
            role={ROLE_TYPE.MEMBER}
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
          <AddButton
            title={dict.teambuilding_add_member}
            disabled={fields.length === MAX_ITEM_PERSON_MEMBER}
            onClick={handleAddProfilePerson}
          />

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
              disabled={isSubmitting || !isEmpty(errors)}
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
    </FormProvider>
  )
}

export default Step_02_Edit
