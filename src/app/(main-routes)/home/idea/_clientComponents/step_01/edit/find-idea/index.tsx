import SectionTitle from '@/components/home/section-title'
import { Box, Grid, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'

import styles from './find-idea.module.scss'
import { get, useFormContext } from 'react-hook-form'
import { AddButton } from '@/components/home/button'
import CardSelectFindIdea from './card-selected'
import ErrorMessage from '@/form/ErrorMessage'
import { v4 as uuidv4 } from 'uuid'
import { INCONVENIENCE_FACTOR, KEYWORD, SITUATION, TARGET_CUSTOMER } from '@/constants/idea.constant'
import { GroupIdea, QueryIndustrial, TIdiaFormValues } from '@/types/idea.type'
import SelectInput from '@/form/select/select-input'
import { listenEvent, requestIdleCallbackCustom } from '@/utils/events'
import { isEmpty, parseString } from '@/utils/object'
import { remConvert } from '@/utils/convert-to-rem'
import { useQuery } from '@tanstack/react-query'
import { useIndustrialField } from '../../../use-idea'
import { getFourIdeaByIndustrial } from '@/services/idea.service'
import { useLanguage } from '@/hooks/use-language'
import { LANG } from '@/constants/common.constant'

const MAX_ITEM_FIND_IDEA = 5

function FindIdea() {
  const { dict, lang, getValueLanguage } = useLanguage()
  const [message, setMessageError] = useState<string>('')

  const { filterFourIdea } = useIndustrialField()

  const form = useFormContext<TIdiaFormValues>()
  const {
    control,
    setValue,
    getValues,
    resetField,
    clearErrors,
    setError,
    watch,
    formState: { errors }
  } = form

  const groupIdeas = watch('findIdeas.groupIdeas') ?? []

  const { data } = useQuery({
    queryKey: [`find-idea`, filterFourIdea],
    enabled: !!filterFourIdea.industrialField,
    queryFn: ({ queryKey: [, filterFourIdea] }: { queryKey: [string, QueryIndustrial] }) =>
      getFourIdeaByIndustrial(filterFourIdea),
    meta: {
      offLoading: true
    }
  })

  const checkGroupIdeasExist = (list: GroupIdea[], data: GroupIdea) => {
    if (list.length === 0 || isEmpty(data)) {
      return false
    }

    const index = list.findIndex((idea) => {
      const { id, ...newData } = idea
      return parseString(newData) === parseString(data)
    })

    return index === -1 ? false : true
  }

  const handleAddIdea = async () => {
    const { groupIdeas = [], ...restIdea } = getValues('findIdeas')

    // check four idea groups exist
    const result = checkGroupIdeasExist(groupIdeas, restIdea)
    if (result) return

    const keys: any = Object.keys(restIdea)

    const checkInvalid = keys.map((key: keyof typeof restIdea) => {
      if (restIdea[key] === '') {
        setError(`findIdeas.${key}`, { type: 'required', message: '' })
      }
      return !!restIdea[key]
    })

    if (checkInvalid.includes(false)) {
      setMessageError(dict.idea_required_msg)
      return
    }

    if (groupIdeas?.length! < MAX_ITEM_FIND_IDEA) {
      setValue('findIdeas.groupIdeas', [...groupIdeas, { id: uuidv4(), ...restIdea }])
      requestIdleCallbackCustom(() => {
        resetField('findIdeas.situation')
        resetField('findIdeas.inconvenience_factor')
        resetField('findIdeas.keyword')
        resetField('findIdeas.target_customer')
        clearErrors('findIdeas')
      })
    }
  }

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (errors.findIdeas) {
        clearErrors('findIdeas')
        clearErrors('writeIdeas')
        setMessageError('')
      }
    }, 3000)
    return () => clearTimeout(timeId)
  }, [errors.findIdeas])

  return (
    <Box component={'div'} className={styles.container}>
      <SectionTitle mb={'20px'} title={dict.find_idea} subtitle={dict.find_idea_description} />
      <Grid width={1} container spacing={2}>
        <Grid item xs={12} sm={3}>
          <SelectInput
            inputProps={{
              placeholder: dict.direct_input,
              inputProps: {
                maxLength: 30
              }
            }}
            control={control}
            textFieldProps={{
              placeholder: dict.common_select
            }}
            menus={{
              options: data?.data.situation ?? [],
              value: 'id',
              label: 'data'
            }}
            label={dict.situation}
            name={`findIdeas.situation`}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SelectInput
            inputProps={{
              placeholder: dict.direct_input,
              inputProps: {
                maxLength: 30
              }
            }}
            control={control}
            textFieldProps={{
              placeholder: dict.common_select
            }}
            menus={{
              options: data?.data.targetCustomer ?? [],
              value: 'id',
              label: 'data'
            }}
            label={dict.target_customer}
            name='findIdeas.target_customer'
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SelectInput
            inputProps={{
              placeholder: dict.direct_input,
              inputProps: {
                maxLength: 30
              }
            }}
            control={control}
            textFieldProps={{
              placeholder: dict.common_select
            }}
            menus={{
              options: data?.data.inconvenienceFactor ?? [],
              value: 'id',
              label: 'data'
            }}
            label={dict.idea_uncomfortable_factor}
            name={`findIdeas.inconvenience_factor`}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SelectInput
            inputProps={{
              placeholder: dict.direct_input,
              inputProps: {
                maxLength: 30
              }
            }}
            control={control}
            textFieldProps={{
              placeholder: dict.common_select
            }}
            menus={{
              options: data?.data.keyword ?? [],
              value: 'id',
              label: 'data'
            }}
            label={dict.common_keyword}
            name={`findIdeas.keyword`}
          />
        </Grid>
      </Grid>
      {message && (
        <Stack sx={{ width: 1, mt: '20px' }}>
          <ErrorMessage message={message} />
        </Stack>
      )}

      <AddButton
        sx={{ mt: remConvert('20px') }}
        disabled={groupIdeas?.length === MAX_ITEM_FIND_IDEA}
        onClick={handleAddIdea}
        title={dict.idea_add}
      />

      <CardSelectFindIdea />
      {get(errors, 'findIdeas.groupIdeas') && (
        <Stack sx={{ width: 1, mt: '20px' }}>
          <ErrorMessage message={dict.idea_combine_err} />
        </Stack>
      )}
    </Box>
  )
}

export default FindIdea
