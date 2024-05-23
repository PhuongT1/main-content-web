import { TCreateIdea } from '@/types/idea.type'
import { Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import MethodPreview from '../view'
import MinusIdeaIcon from '@/assets/icons/idea/minus'
import { EmptyCardIdea } from '../../edit/cards-idea/card-item'

import styles from '../view.module.scss'
import ChipIdea from '../../../_components/chip'
import { useLanguage } from '@/hooks/use-language'

function MinusView() {
  const { dict } = useLanguage()
  const {
    palette: { home, sub }
  } = useTheme()
  const { getValues } = useFormContext<TCreateIdea>()

  const minusData = getValues('minus')

  return (
    <MethodPreview
      icon={<MinusIdeaIcon />}
      title={
        <Stack direction={'row'} useFlexGap flexWrap={'wrap'} gap={'10px'}>
          {minusData.keywords.map((keyword) => (
            <Typography key={keyword.id} color={sub.orange500} className={styles.preview_top_right_title}>
              {keyword.content}
            </Typography>
          ))}
        </Stack>
      }
      sectionTitle={dict.common_minus}
      description={minusData.content}
      duplicateNode={
        <EmptyCardIdea
          sxBox={{
            border: 'none',
            backgroundColor: home.gray300
          }}
          title={dict.idea_remove_title}
          subTitle={dict.idea_remove_sub_title}
          content={
            <Stack justifyContent={'center'} maxWidth={444} flexWrap={'wrap'} useFlexGap direction={'row'} gap={'10px'}>
              {minusData.keywords?.map((chip) => {
                return (
                  <ChipIdea chipColor={sub.orange500} isSelected={chip.isSelected} key={chip.id} label={chip.content} />
                )
              })}
            </Stack>
          }
        />
      }
    />
  )
}

export default MinusView
