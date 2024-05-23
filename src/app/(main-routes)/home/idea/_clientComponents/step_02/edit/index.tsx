import { Box, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CardList from './cards'
import ErrorMessage from '@/form/ErrorMessage'
import CardIdeaList from './cards-idea'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { useFormContext } from 'react-hook-form'
import { CaculationModeEnum, TCreateIdea, TMethod } from '@/types/idea.type'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modeCalculationIdeaSelector, modeWriteIdeaSelector } from '@/atoms/home/idea'
import { useIdeaPostData, useIndustrialField } from '../../use-idea'
import { Method } from '@/constants/idea.constant'
import { STEP } from '@/constants/common.constant'
import { defaultValuesStepIdea } from '..'
import { ModalReset } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { isEmpty } from '@/utils/object'
import { listenEvent } from '@/utils/events'
import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'
import { useLanguage } from '@/hooks/use-language'
import RefreshIcon from '@/assets/icons/refresh'

function Step_02_Edit() {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const {
    handleSubmit,

    reset,
    getValues,
    formState: { isValid, errors, isSubmitting }
  } = useFormContext<TCreateIdea>()
  const [message, setErrorMessage] = useState('')
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()
  const [showDialogDel, toggleShowDialogDel, setToggleShowDialogDel] = useToggle()
  const [modeCaculation, setActiveCaculationeMode] = useRecoilState(modeCalculationIdeaSelector)
  const { filterFourIdea, resetFilter } = useIndustrialField()

  const [mode, setActiveMode] = useRecoilState(modeWriteIdeaSelector)

  const { mutation } = useIdeaPostData<TCreateIdea>(STEP.STEP_TWO)

  const onSubmit = async (values: TCreateIdea) => {
    if (!values[mode as TMethod]?.content) {
      setErrorMessage('산업분야를 카테고리에서 선택해보세요')
      return
    }
    let newValues = { ...values }

    const completedList = values.completed
    for (const key of Object.keys(values)) {
      if (!completedList.includes(key)) {
        if (key !== 'completed') {
          newValues = { ...newValues, [key]: defaultValuesStepIdea[key as keyof TCreateIdea] }
        }
      }
    }
    mutation(newValues)
  }

  const handleCompledStep = (values: TCreateIdea) => {
    const check = checkIndustrial()
    if (!check) {
      return
    }

    if (modeCaculation?.[mode as TMethod] === CaculationModeEnum.EDIT) {
      setToggleShowDialogDel(true)
    } else {
      onSubmit(values)
    }
  }

  const preventEnterKeySubmission = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const { target, key } = e
    if (key === 'Enter' && target instanceof HTMLInputElement) {
      e.preventDefault()
    }
  }

  const handleResetForm = () => {
    setToggleShowDialog(false)
    reset(defaultValuesStepIdea)
    setActiveCaculationeMode({
      minus: CaculationModeEnum.EDIT,
      multiplication: CaculationModeEnum.EDIT,
      plus: CaculationModeEnum.EDIT,
      division: CaculationModeEnum.EDIT
    })
    resetFilter()
    setActiveMode('none')
  }

  const checkIndustrial = () => {
    if (
      !filterFourIdea.industrialField &&
      [Method.plus, Method.multiplication].includes(mode as Method) &&
      modeCaculation?.[mode as TMethod] === CaculationModeEnum.EDIT
    ) {
      setErrorMessage('산업분야를 카테고리에서 선택해보세요')
      return false
    }
    return true
  }

  useEffect(() => {
    listenEvent(EventNameTBuidlding.CLEAR_ERROR_MSG, () => {
      setErrorMessage('')
    })
  }, [])

  return (
    <Box
      id='write_idea'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        height: '100%'
      }}
      component={'form'}
      width={1}
      onKeyDown={preventEnterKeySubmission}
      onSubmit={handleSubmit(handleCompledStep)}
    >
      <CardList />
      <ErrorMessage message={message} />
      <CardIdeaList />
      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleResetForm} />
      <DeleteDeck
        onCancel={toggleShowDialogDel}
        open={showDialogDel}
        onSubmit={() => {
          onSubmit(getValues())
          setToggleShowDialogDel(false)
        }}
        title={dict.idea_discard_change_title}
        description={dict.idea_discard_change_sub_title}
        submitTxt={dict.common_deck_yes}
      />

      <Box mt={'60px'} display='flex' justifyContent='center' alignItems='center' gap={2} width='100%'>
        <RefreshButton
          disabled={mode === 'none'}
          onClick={() => setToggleShowDialog(true)}
          sx={{
            backgroundColor: home.gray300,
            color: home.gray50
          }}
          startIcon={<RefreshIcon pathProps={{ stroke: home.gray50 }} />}
        />
        <SubmitButton
          onClick={checkIndustrial}
          disabled={(!isValid && !isEmpty(errors)) || mode === 'none' || isSubmitting}
          type='submit'
          sx={{
            backgroundColor: home.blue500
          }}
        />
      </Box>
    </Box>
  )
}

export default Step_02_Edit
