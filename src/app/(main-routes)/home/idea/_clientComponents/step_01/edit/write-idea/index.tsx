import SectionTitle from '@/components/home/section-title'
import { Box, Grid, IconButton, Stack, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'

import styles from './write-idea.module.scss'
import { useFormContext, useWatch } from 'react-hook-form'
import ErrorMessage from '@/form/ErrorMessage'
import InputItem from '@/form/input'
import { TIdiaFormValues } from '@/types/idea.type'
import { useRecoilValue } from 'recoil'
import { TValueCardSelect } from '../../../_components/card'
import { modeIdeaSelector } from '@/atoms/home/idea'
import { MODE_IDEA, QUERY_KEY_IDEA } from '@/constants/idea.constant'
import { useIdeaData } from '../../../use-idea'
import { STEP } from '@/constants/common.constant'
import { isEmpty } from '@/utils/object'
import ClearBoxIcon from '@/assets/icons/team-building/clear-box'
import { listenEvent } from '@/utils/events'
import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'
import { useLanguage } from '@/hooks/use-language'

const LIMIT_CHARACTERS = {
  Idea: 100
}

function WriteIdea() {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const [message, setMessageError] = useState<string>('')
  const [showInput, setShowInput] = useState<boolean>(false)
  const mode = useRecoilValue<TValueCardSelect>(modeIdeaSelector)

  const {
    control,
    setValue,
    getValues,
    formState: { errors }
  } = useFormContext<TIdiaFormValues>()

  const { idea, ideas, ideasDataAI, ...restWriteIdeas } = useWatch({ name: 'writeIdeas', control })
  const { groupIdeas } = useWatch({ name: 'findIdeas', control })

  const { data } = useIdeaData<TIdiaFormValues>(STEP.STEP_ONE, QUERY_KEY_IDEA.IDEA)

  const onBlur = () => {
    const ideaData = getValues('writeIdeas.idea')

    const isFourIdeaNotEntered =
      Object.keys(errors?.writeIdeas ?? {}).length > 0 && !Object.hasOwn(errors?.writeIdeas ?? {}, 'idea')

    if (isFourIdeaNotEntered) {
      setMessageError(dict.idea_required_msg)
    } else {
      if (message) {
        setMessageError('')
      }
    }

    const isShowInputIdea = Object.values(restWriteIdeas).every((i) => i)
    if (!isShowInputIdea && !ideaData) {
      setShowInput(false)
      return
    }

    if (!ideaData) {
      const ideaData = [
        restWriteIdeas.target_customer,
        restWriteIdeas.inconvenience_factor,
        restWriteIdeas.resolution,
        restWriteIdeas.service_name
      ].join(' ')
      setValue('writeIdeas.idea', ideaData)
    }

    if (!showInput) {
      setShowInput(true)
    }
  }

  const onDeleteText = () => {
    setValue('writeIdeas.idea', '')
  }

  useEffect(() => {
    !isEmpty(data?.data ?? {}) && !showInput && setShowInput(!!idea)
  }, [data])

  useEffect(() => {
    listenEvent(EventNameTBuidlding.CLEAR_ERROR_MSG, () => {
      setMessageError('')
    })
  }, [])

  if (groupIdeas?.length === 0 && mode === MODE_IDEA.INSDUSTRY) {
    return null
  }

  return (
    <Box component={'div'} className={styles.container}>
      <SectionTitle
        mb={'20px'}
        title={dict.idea_writing_title}
        subtitle={dict.idea_writing_sub_title}
      />
      <Grid rowSpacing={'20px'} width={1} container>
        <Grid pr={'20px'} item xs={12} sm={3}>
          <InputItem
            onBlur={onBlur}
            control={control}
            maxLength={30}
            name={`writeIdeas.target_customer`}
            textFieldProps={{ placeholder: dict.idea_writing_required, required: true }}
            label={dict.target_customer}
          />
        </Grid>
        <Grid pr={'20px'} item xs={12} sm={3}>
          <InputItem
            onBlur={onBlur}
            control={control}
            maxLength={30}
            name={`writeIdeas.inconvenience_factor`}
            textFieldProps={{ placeholder: dict.idea_writing_required, required: true }}
            label={dict.idea_uncomfortable_factor}
          />
        </Grid>
        <Grid pr={'20px'} item xs={12} sm={3}>
          <InputItem
            onBlur={onBlur}
            control={control}
            maxLength={30}
            name={`writeIdeas.resolution`}
            textFieldProps={{ placeholder: dict.idea_writing_required, required: true }}
            label={dict.idea_solution_plan}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <InputItem
            onBlur={onBlur}
            control={control}
            maxLength={30}
            name={`writeIdeas.service_name`}
            textFieldProps={{ placeholder: dict.idea_writing_required, required: true }}
            label={dict.service_name}
          />
        </Grid>
        {message ? (
          <Stack sx={{ width: 1, mt: '20px' }}>
            <ErrorMessage message={message} />
          </Stack>
        ) : null}
        <Grid item xs={12}>
          {showInput ? (
            <InputItem
              name={`writeIdeas.idea`}
              control={control}
              maxLength={LIMIT_CHARACTERS.Idea}
              textFieldProps={{
                placeholder: dict.idea_writing_placeholder,
                required: true,
                InputProps: {
                  endAdornment: idea ? (
                    <IconButton onClick={onDeleteText}>
                      <ClearBoxIcon rectProps={{ fill: home.gray300, width: 24, height: 24 }} pathProps={{ stroke: home.gray50}}  />
                    </IconButton>
                  ) : null
                }
              }}
              label={dict.idea_writing_label}
            />
          ) : null}
        </Grid>
      </Grid>
    </Box>
  )
}

export default WriteIdea
