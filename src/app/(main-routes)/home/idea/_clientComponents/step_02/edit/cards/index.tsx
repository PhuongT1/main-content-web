import { Box, Grid, useTheme } from '@mui/material'
import React from 'react'
import Card from './card'
import PlusIdeaIcon from '@/assets/icons/idea/plus'
import MinusIdeaIcon from '@/assets/icons/idea/minus'
import MultiplicationIdeaIcon from '@/assets/icons/idea/multiplication'
import DivisionIdeaIcon from '@/assets/icons/idea/division'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modeCalculationIdeaSelector, modeWriteIdeaSelector } from '@/atoms/home/idea'
import SectionTitle from '@/components/home/section-title'
import { FieldPath, useFormContext } from 'react-hook-form'
import { CaculationModeEnum, TCreateIdea, TMethod } from '@/types/idea.type'
import { isEmpty } from '@/utils/object'
import { Method } from '@/constants/idea.constant'
import { useLanguage } from '@/hooks/use-language'

function CardList() {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()
  const [activeMode, setActiveMode] = useRecoilState(modeWriteIdeaSelector)
  const method = useRecoilValue(modeCalculationIdeaSelector)
  const { getValues } = useFormContext<TCreateIdea>()

  const TabList = [
    {
      key: Method.plus,
      icon: <PlusIdeaIcon pathProps={{ fill: home.gray50 }} />,
      title: dict.common_plus,
      subTitle: dict.idea_expand
    },
    {
      key: Method.minus,
      icon: <MinusIdeaIcon pathProps={{ fill: home.gray50 }} />,
      title: dict.common_minus,
      subTitle: dict.common_remove
    },
    {
      key: Method.multiplication,
      icon: <MultiplicationIdeaIcon pathProps={{ fill: home.gray50 }} />,
      title: dict.common_multiply,
      subTitle: dict.converging
    },
    {
      key: Method.division,
      icon: (
        <DivisionIdeaIcon
          lineProps={{ stroke: home.gray50 }}
          circleProps={{ fill: home.gray50, stroke: home.gray50 }}
        />
      ),
      title: dict.common_divide,
      subTitle: dict.common_focus
    }
  ]

  return (
    <Box component={'div'}>
      <SectionTitle mb={'20px'} title={dict.idea_thinking} subtitle={dict.idea_edit_card_sub_title} />
      <Grid container spacing={'16px'}>
        {TabList.map((item) => {
          const isCompleted = Object.values(getValues(item.key as FieldPath<TCreateIdea>)).every((value: any) => {
            return value || !isEmpty(value)
          })
          return (
            <Grid key={item.title} item xs={12} sm={6} lg={3}>
              <Card
                completed={isCompleted && method?.[item.key as TMethod] !== CaculationModeEnum.EDIT}
                onClick={() => setActiveMode(item.key as TMethod)}
                active={item.key === activeMode}
                icon={item.icon}
                title={item.title}
                subTitle={item.subTitle}
              />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default CardList
