import React from 'react'
import CardItem from './card-list/card-item'
import { Method, QUERY_KEY_IDEA } from '@/constants/idea.constant'
import { Stack, useTheme } from '@mui/material'

import { TCreateIdea, TMethod } from '@/types/idea.type'
import { useIdeaData } from '../../use-idea'
import { STEP } from '@/constants/common.constant'
import { Typography } from '@/elements'
import { useLanguage } from '@/hooks/use-language'

type Props = {
  activeMode?: any
  isEditView?: boolean
  onClickCard?: (method: TMethod | string, content: string) => void
}

export const PlusCard = ({ activeMode, onClickCard, isEditView = true }: Props) => {
  const { dict, getValueLanguage } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const { data } = useIdeaData<TCreateIdea>(STEP.STEP_TWO, QUERY_KEY_IDEA.CREATE_IDEA)

  return (
    <CardItem
      isEditView={isEditView}
      isSelected={activeMode === Method.plus}
      onClickCard={onClickCard}
      method={Method.plus}
      sectionTitle={dict.common_plus}
      title={
        <Typography cate='sub_title_30' color={home.blue500}>
          {data?.data?.plus?.industrial && getValueLanguage(data.data.plus.industrial)}
        </Typography>
      }
      description={data?.data?.plus?.content}
    />
  )
}

export const MinusCard = ({ activeMode, onClickCard, isEditView = true }: Props) => {
  const { dict } = useLanguage()
  const {
    palette: { home, sub }
  } = useTheme()
  const { data } = useIdeaData<TCreateIdea>(STEP.STEP_TWO, QUERY_KEY_IDEA.CREATE_IDEA)

  const keywords = data?.data?.minus.keywords ?? []

  return (
    <CardItem
      isEditView={isEditView}
      isSelected={activeMode === Method.minus}
      onClickCard={onClickCard}
      method={Method.minus}
      sectionTitle={dict.common_minus}
      title={
        <Stack direction={'row'} useFlexGap flexWrap={'wrap'} gap={'10px'}>
          {keywords.map((keyword) => (
            <Typography cate='sub_title_30' key={keyword.id} color={sub.orange500}>
              {keyword.content}
            </Typography>
          ))}
        </Stack>
      }
      description={data?.data?.minus?.content}
    />
  )
}

export const MultiplicationCard = ({ activeMode, onClickCard, isEditView = true }: Props) => {
  const { dict, getValueLanguage } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  const { data } = useIdeaData<TCreateIdea>(STEP.STEP_TWO, QUERY_KEY_IDEA.CREATE_IDEA)

  return (
    <CardItem
      isEditView={isEditView}
      isSelected={activeMode === Method.multiplication}
      onClickCard={onClickCard}
      method={Method.multiplication}
      sectionTitle={dict.common_multiply}
      title={
        <Typography cate='sub_title_30' color={home.yellow}>
          {data?.data?.multiplication?.industrial ? getValueLanguage(data.data.multiplication.industrial) : ''}
        </Typography>
      }
      description={data?.data?.multiplication?.content}
    />
  )
}

export const DivisionCard = ({ activeMode, onClickCard, isEditView = true }: Props) => {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  const { data } = useIdeaData<TCreateIdea>(STEP.STEP_TWO, QUERY_KEY_IDEA.CREATE_IDEA)

  const keywords = data?.data?.division.keywords ?? []

  return (
    <CardItem
      isEditView={isEditView}
      isSelected={activeMode === Method.division}
      onClickCard={onClickCard}
      method={Method.division}
      sectionTitle={dict.common_divide}
      title={
        <Stack direction={'row'} useFlexGap flexWrap={'wrap'} gap={'10px'}>
          {keywords.map((keyword) => (
            <Typography cate='sub_title_30' key={keyword.id} color={home.mint500}>
              {keyword.content}
            </Typography>
          ))}
        </Stack>
      }
      description={data?.data?.division?.content}
    />
  )
}
