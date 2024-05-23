'use client'

import { Box, Stack, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CardSelect, { TValueCardSelect } from '../../_components/card'
import LightIcon from '@/assets/icons/idea/light'
import TargetIcon from '@/assets/icons/idea/target'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import { useRecoilState } from 'recoil'
import { modeIdeaSelector } from '@/atoms/home/idea'
import { MODE_IDEA, QUERY_KEY_IDEA } from '@/constants/idea.constant'
import SelectInsDustry from './select-insdustry'
import WriteIdea from './write-idea'
import IdeaKeyword from './idea-keyword'
import FindIdea from './find-idea'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { useFormContext } from 'react-hook-form'
import { defaultValuesStepIdea } from '..'
import { TIdiaFormValues } from '@/types/idea.type'
import { useIdeaData, useIdeaPostData, useIndustrialField } from '../../use-idea'
import { STEP } from '@/constants/common.constant'
import { ModalReset } from '@/components/dialog/modal-deck'
import { isEmpty } from '@/utils/object'
import ErrorMessage from '@/form/ErrorMessage'
import { listenEvent, sendEvent } from '@/utils/events'
import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'
import { MIN_IDEAS } from './idea-keyword/idea-keyword-list'
import { useLanguage } from '@/hooks/use-language'
import RefreshIcon from '@/assets/icons/refresh'

enum TMode {
  SWITCH = 'SWITCH',
  EDIT = 'EDIT',
  HIDDEN = 'HIDDEN'
}

function Idea_Step01_Edit() {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const {
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { isValid, errors, isSubmitting }
  } = useFormContext<TIdiaFormValues>()

  const newMode = watch('mode')

  const [message, setErrorMessage] = useState<string>('')

  const { mutation, reset: resetData } = useIdeaPostData<TIdiaFormValues | object>(STEP.STEP_ONE)
  const { resetFilter, filterFourIdea } = useIndustrialField()

  const { data } = useIdeaData<TIdiaFormValues>(STEP.STEP_ONE, QUERY_KEY_IDEA.IDEA)

  const [mode, setMode] = useRecoilState<TValueCardSelect>(modeIdeaSelector)

  const [modeModal, setModeModal] = useState<keyof typeof TMode>('HIDDEN')

  const onClose = () => {
    setModeModal('HIDDEN')
  }

  const onSelectedNode = (value: TValueCardSelect) => {
    if (value === mode) return

    if (filterFourIdea.industrialField) {
      setModeModal(TMode.SWITCH)
    } else {
      setMode(value)
      setValue('mode', value as string)
    }
  }

  const onConfirm = () => {
    if (modeModal === TMode.SWITCH) {
      const newMode = mode === MODE_IDEA.DIRECTLY ? MODE_IDEA.INSDUSTRY : MODE_IDEA.DIRECTLY
      setMode(newMode)

      resetFilter()
      // clear data
      if (!isEmpty(data?.data ?? {})) {
        resetData({})
      }
      reset({ ...defaultValuesStepIdea, mode: newMode }, { keepDefaultValues: false })
    }
    onClose()
  }

  const onSubmit = async (values: TIdiaFormValues) => {
    if (values.writeIdeas.ideas.length < MIN_IDEAS) {
      sendEvent('SHOW_ERROR_KEYWORD_AI', {})
      return
    }
    mutation(values)
    resetFilter()
  }

  const onReset = () => {
    if (!mode) return
    setModeModal('HIDDEN')
    setMode('')

    resetFilter()
    reset(defaultValuesStepIdea, { keepDefaultValues: false })
  }

  const preventEnterKeySubmission = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const { target, key } = e
    if (key === 'Enter' && target instanceof HTMLInputElement) {
      e.preventDefault()
    }
  }

  const handleSubmitIndustrial = () => {
    if (mode && !filterFourIdea.industrialField) {
      setErrorMessage('산업분야를 카테고리에서 선택해보세요')
    }
  }

  useEffect(() => {
    listenEvent(EventNameTBuidlding.CLEAR_ERROR_MSG, () => {
      setErrorMessage('')
    })
  }, [])

  useEffect(() => {
    if (newMode && !mode) {
      setMode(newMode)
    }
  }, [newMode])

  return (
    <Box id='idea' component={'form'} onKeyDown={preventEnterKeySubmission} onSubmit={handleSubmit(onSubmit)}>
      <Box
        my={'55px'}
        paddingY={'40px'}
        flexWrap={'wrap'}
        display='flex'
        justifyContent='center'
        alignItems='center'
        gap={2}
        width='100%'
      >
        <CardSelect
          active={mode === MODE_IDEA.DIRECTLY}
          icon={<LightIcon />}
          value={MODE_IDEA.DIRECTLY}
          title={dict.idea_select_direct_title}
          subTitle={dict.idea_select_direct_sub_title}
          onClick={onSelectedNode}
        />
        <CardSelect
          active={mode === MODE_IDEA.INSDUSTRY}
          icon={<TargetIcon />}
          value={MODE_IDEA.INSDUSTRY}
          title={dict.idea_select_industry_title}
          subTitle={dict.idea_select_industry_title}
          onClick={onSelectedNode}
        />
      </Box>
      {mode ? (
        <>
          <SelectInsDustry />
          {message && (
            <Stack direction={'row'} mt={'20px'}>
              <ErrorMessage message={message} />
            </Stack>
          )}

          {filterFourIdea.industrialField ? (
            <>
              {mode === MODE_IDEA.INSDUSTRY ? <FindIdea /> : null}
              <WriteIdea />
              <IdeaKeyword />
            </>
          ) : null}
        </>
      ) : null}
      <DeleteDeck
        title={dict.deck_delete_title}
        description=''
        open={modeModal === TMode.SWITCH}
        onCancel={onClose}
        onSubmit={onConfirm}
        submitTxt={dict.common_deck_yes} 
      />

      <ModalReset open={modeModal === TMode.EDIT} onCancel={onClose} onSubmit={onReset} />
      <Box mt={'60px'} display='flex' justifyContent='center' alignItems='center' gap={2} width='100%'>
        <RefreshButton
          disabled={!filterFourIdea.industrialField}
          onClick={() => setModeModal(TMode.EDIT)}
          sx={{
            backgroundColor: home.gray300,
            color: home.gray50
          }}
          startIcon={<RefreshIcon pathProps={{ stroke: home.gray50 }} />}
        />
        <SubmitButton
          onClick={handleSubmitIndustrial}
          type='submit'
          disabled={(!isValid && !isEmpty(errors)) || isSubmitting || !mode}
          sx={{
            backgroundColor: home.blue500
          }}
        />
      </Box>
    </Box>
  )
}

export default Idea_Step01_Edit
