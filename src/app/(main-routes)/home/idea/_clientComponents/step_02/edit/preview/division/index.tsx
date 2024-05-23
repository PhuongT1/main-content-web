import { Box, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'

import styles from './division.module.scss'
import { useFormContext } from 'react-hook-form'
import { TCreateIdea } from '@/types/idea.type'
import { Method, QUERY_KEY_IDEA } from '@/constants/idea.constant'
import DivisionIdeaIcon from '@/assets/icons/idea/division'
import MethodPreview from '../preview'
import ErrorMethod from '../error'
import { EmptyCardIdea } from '../../cards-idea/card-item'
import ChipIdea from '../../../../_components/chip'
import { useLanguage } from '@/hooks/use-language'

function PreviewDivisionIdea() {
  const { dict } = useLanguage()
  const {
    palette: { home }
  } = useTheme()

  const { watch } = useFormContext<TCreateIdea>()

  const divisionData = watch('division')

  return (
    <Box width={1} component={'div'} display={'flex'} flexDirection={'column'} gap={'20px'}>
      <MethodPreview
        icon={
          <DivisionIdeaIcon
            lineProps={{ stroke: home.gray50 }}
            circleProps={{ fill: home.gray50, stroke: home.gray50 }}
          />
        }
        method={Method.division}
        sectionTitle={dict.common_divide}
        title={
          <Stack direction={'row'} useFlexGap flexWrap={'wrap'} gap={'10px'}>
            {divisionData.keywords.map((keyword) => (
              <Typography key={keyword.id} color={home.mint500} className={styles.preview_top_right_title}>
                {keyword.content}
              </Typography>
            ))}
          </Stack>
        }
        description={divisionData.content}
        duplicateNode={
          <EmptyCardIdea
            sxBox={{
              border: 'none',
              backgroundColor: 'transparent'
            }}
            title={dict.idea_empty_card_title}
            subTitle={dict.idea_empty_card_sub_title}
            content={
              <Stack
                justifyContent={'center'}
                maxWidth={444}
                flexWrap={'wrap'}
                useFlexGap
                direction={'row'}
                gap={'10px'}
              >
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
      <ErrorMethod />
    </Box>
  )
}

export default PreviewDivisionIdea
