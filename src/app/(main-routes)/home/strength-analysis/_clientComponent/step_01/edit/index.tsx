import SectionTitle from '@/components/home/section-title'
import { remConvert } from '@/utils/convert-to-rem'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TypeList from './type-list'
import { get, useFieldArray, useFormContext } from 'react-hook-form'
import { TFormValuesType, TTypesSA } from '@/types/strength-analysis.type'
import SelectedType from './selected-type'
import { RefreshButton, SubmitButton } from '@/components/home/button'
import ErrorMessage from '@/form/ErrorMessage'
import { listenEvent } from '@/utils/events'
import { EventNameTBuidlding } from '@/constants/teambuilding/teambuilding.constant'
import { useSAPostData } from '../../use-sa'
import { STEP } from '@/constants/common.constant'
import { ModalReset } from '@/components/dialog/modal-deck'
import useToggle from '@/hooks/use-toggle'
import { MAX_TYPES, defaultValuesTypes } from '..'
import { useQuery } from '@tanstack/react-query'
import { getStrenghtList } from '@/services/sa.service'
import LoadingComponent from '@/components/loading'

const SA_Step_01_Edit = () => {
  const [message, setErrorMessage] = useState<string>('')
  const [showDialog, toggleShowDialog, setToggleShowDialog] = useToggle()

  const { data, isLoading } = useQuery({
    queryKey: ['GET_STRENGTH'],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: () => getStrenghtList()
  })

  const { mutation } = useSAPostData(STEP.STEP_ONE)
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid }
  } = useFormContext<TFormValuesType>()

  const { fields, append, remove } = useFieldArray<TFormValuesType>({
    control,
    name: 'strengthList'
  })

  const {
    fields: weaknessList,
    append: appendWeakness,
    remove: removeWeakness
  } = useFieldArray<TFormValuesType>({
    control,
    name: 'weaknessList'
  })

  const handleAddCarditems = (item: TTypesSA) => {
    append(item)

    const removeIndex = weaknessList.findIndex((weak) => weak.strengthType === item.strengthType)
    if (removeIndex >= 0) {
      removeWeakness(removeIndex)
    }
  }
  const handleRemoveCarditems = (index: number, item: TTypesSA) => {
    remove(index)
    appendWeakness(item)
  }

  const handleOverQuantity = () => {
    setErrorMessage('어울리는 장점유형은 10개를 초과할 수 없습니다.')
  }

  const onSubmit = (values: TFormValuesType) => {
    const { strengthList, weaknessList } = values
    const data = { strengthList, weaknessList }
    mutation(data)
  }

  const handleReset = () => {
    toggleShowDialog()
    reset(defaultValuesTypes)
  }

  useEffect(() => {
    if (data?.data && weaknessList.length !== MAX_TYPES) {
      appendWeakness(data.data)
    }
  }, [data?.data])

  useEffect(() => {
    listenEvent(EventNameTBuidlding.CLEAR_ERROR_MSG, () => {
      setErrorMessage('')
    })
  }, [])

  if (isLoading) return <LoadingComponent open />
  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Box component={'div'} display={'flex'} flexDirection={'column'} gap={remConvert('20px')}>
        <SectionTitle
          mt={remConvert('52px')}
          title='어울리는 유형 선택'
          subtitle='다음은 20가지 장점유형입니다. 각 유형을 살펴보고 나에게 어울리는 유형 10개를 찾아 선택해보세요'
        />
        <TypeList
          maxSelected={MAX_TYPES}
          onAddCard={handleAddCarditems}
          onRemoveCard={handleRemoveCarditems}
          overQuantity={handleOverQuantity}
          cardActiveList={fields}
        />
        <SelectedType />
        {get(errors, 'strengthList') && <ErrorMessage message={get(errors, 'strengthList')?.message} />}
        <ErrorMessage message={message} />
      </Box>
      <ModalReset open={showDialog} onCancel={toggleShowDialog} onSubmit={handleReset} />

      <Box mt={'60px'} display='flex' justifyContent='center' alignItems='center' gap={2} width='100%'>
        <RefreshButton />
        <SubmitButton
          type='submit'
          // disabled={!isValid}
          sx={{
            backgroundColor: (theme) => theme.palette.home.blue500
          }}
        />
      </Box>
    </Box>
  )
}

export default SA_Step_01_Edit
