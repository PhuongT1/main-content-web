import { Box, Stack } from '@mui/material'
import React, { Fragment, useEffect, useRef } from 'react'
import { EVentIdea, Method, QUERY_KEY_IDEA } from '@/constants/idea.constant'
import { SelectedMode, TCreateIdea, TMethod, TWriteIdea } from '@/types/idea.type'
import useToggle from '@/hooks/use-toggle'
import { DeleteDeck } from '@/components/dialog/delete-deck'
import { mapOrder, useIdeaData } from '../../../use-idea'
import { STEP } from '@/constants/common.constant'
import { DivisionCard, MinusCard, MultiplicationCard, PlusCard } from '../method'
import { useFormContext } from 'react-hook-form'
import { defaultValuesStepWriteIdea } from '../..'
import { listenEvent } from '@/utils/events'
import SectionTitle from '@/components/home/section-title'
import { useLanguage } from '@/hooks/use-language'

const CardList = () => {
  const { dict } = useLanguage()
  const { setValue, watch, reset } = useFormContext<TWriteIdea>()
  const [activeMode, setActiveMode] = React.useState<TMethod | string>()
  const [showDialog, toggleShowDialog] = useToggle()
  const { data } = useIdeaData<TCreateIdea>(STEP.STEP_TWO, QUERY_KEY_IDEA.CREATE_IDEA)

  const completedList = data?.data?.completed ?? []

  const benefitList = watch('benefit')
  const selectedMethod = watch('selectedMethod')
  const selectedMethodRef = useRef<SelectedMode>()

  const orderedMethodList = mapOrder(completedList, ['plus', 'minus', 'multiplication', 'division'])

  const onClickCard = (method: TMethod | string, content: string) => {
    if (benefitList.length > 0 && selectedMethod.description) {
      toggleShowDialog()
      selectedMethodRef.current = {
        type: method,
        title: '',
        description: content
      }
      return
    }
    setActiveMode(method)
    setValue('selectedMethod', { type: method, title: '', description: content })
  }

  useEffect(() => {
    if (!selectedMethod.type) {
      setActiveMode('')
    } else if (!activeMode && selectedMethod.type) {
      setActiveMode(selectedMethod.type)
    }
  }, [selectedMethod, activeMode])

  useEffect(() => {
    listenEvent(EVentIdea.RESET_STEP_03, () => {
      setActiveMode('')
    })
  }, [])

  const list = [
    {
      key: Method.plus,
      component: <PlusCard onClickCard={onClickCard} activeMode={activeMode} />
    },
    {
      key: Method.minus,
      component: <MinusCard onClickCard={onClickCard} activeMode={activeMode} />
    },
    {
      key: Method.multiplication,
      component: <MultiplicationCard onClickCard={onClickCard} activeMode={activeMode} />
    },
    {
      key: Method.division,
      component: <DivisionCard onClickCard={onClickCard} activeMode={activeMode} />
    }
  ]

  const onSubmit = () => {
    reset({ ...defaultValuesStepWriteIdea, selectedMethod: selectedMethodRef.current }, { keepDefaultValues: false })
    toggleShowDialog()
    setActiveMode(selectedMethodRef.current?.type)
  }

  return (
    <Box component={'div'}>
      <SectionTitle
        title={dict.idea_final}
        subtitle={dict.idea_final_sub_title}
      />
      <Stack direction={'column'} gap={'20px'}>
        {orderedMethodList.map((key) => {
          const component = list.find((item) => item.key === key)
          return <Fragment key={key}>{component?.component}</Fragment> ?? null
        })}
      </Stack>
      <DeleteDeck
        title={dict.idea_delete_title}
        description={dict.idea_delete_sub_title}
        open={showDialog}
        onCancel={toggleShowDialog}
        onSubmit={onSubmit}
        submitTxt={dict.common_deck_yes}
      />
    </Box>
  )
}

export default CardList
