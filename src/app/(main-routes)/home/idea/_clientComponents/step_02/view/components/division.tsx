import { TCreateIdea } from '@/types/idea.type'
import { Stack, Typography, useTheme } from '@mui/material'
import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import MethodView from '../view'
import { EmptyCardIdea } from '../../edit/cards-idea/card-item'

import styles from '../view.module.scss'
import ChipIdea from '../../../_components/chip'
import DivisionIdeaIcon from '@/assets/icons/idea/division'
import { useLanguage } from '@/hooks/use-language'

function DivisionView() {
  const { dict } = useLanguage()
  const {
    palette: { home, sub }
  } = useTheme()
  const { getValues } = useFormContext<TCreateIdea>()

  const divisionData = getValues('division')

  return (
    <MethodView
      icon={
        <DivisionIdeaIcon
          lineProps={{ stroke: home.gray50 }}
          circleProps={{ fill: home.gray50, stroke: home.gray50 }}
        />
      }
      title={
        <Stack direction={'row'} useFlexGap flexWrap={'wrap'} gap={'10px'}>
          {divisionData.keywords.map((keyword) => (
            <Typography key={keyword.id} color={home.mint500} className={styles.preview_top_right_title}>
              {keyword.content}
            </Typography>
          ))}
        </Stack>
      }
      sectionTitle={dict.common_divide}
      description={divisionData.content}
      duplicateNode={
        <EmptyCardIdea
          sxBox={{
            border: 'none',
            backgroundColor: home.gray300
          }}
          title={dict.idea_empty_card_title}
          subTitle={dict.idea_empty_card_sub_title}
          content={
            <Stack justifyContent={'center'} maxWidth={444} flexWrap={'wrap'} useFlexGap direction={'row'} gap={'10px'}>
              {divisionData.keywords?.map((chip) => {
                return (
                  <ChipIdea
                    isDashed={false}
                    chipColor={home.mint500}
                    isSelected={chip.isSelected}
                    key={chip.id}
                    label={chip.content}
                  />
                )
              })}
            </Stack>
          }
        />
      }
    />
  )
}

export default DivisionView
