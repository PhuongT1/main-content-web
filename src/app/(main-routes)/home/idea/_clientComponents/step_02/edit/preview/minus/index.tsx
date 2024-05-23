import { Box, Stack, Typography, useTheme } from '@mui/material'

import MinusIdeaIcon from '@/assets/icons/idea/minus'
import { Method } from '@/constants/idea.constant'
import { TCreateIdea } from '@/types/idea.type'
import { useFormContext } from 'react-hook-form'

import MethodPreview from '../preview'
import styles from './minus.module.scss'
import ErrorMethod from '../error'
import { EmptyCardIdea } from '../../cards-idea/card-item'
import ChipIdea from '../../../../_components/chip'
import { useLanguage } from '@/hooks/use-language'

function PreviewMinusIdea() {
  const { dict } = useLanguage()
  const {
    palette: { sub }
  } = useTheme()

  const { watch } = useFormContext<TCreateIdea>()

  const minusData = watch('minus')

  return (
    <Box width={1} component={'div'} display={'flex'} flexDirection={'column'} gap={'20px'}>
      <MethodPreview
        icon={<MinusIdeaIcon />}
        sectionTitle={dict.common_minus}
        title={
          <Stack direction={'row'} flexWrap={'wrap'} useFlexGap gap={'10px'}>
            {minusData.keywords.map((keyword) => (
              <Typography key={keyword.id} color={sub.orange500} className={styles.preview_top_right_title}>
                {keyword.content}
              </Typography>
            ))}
          </Stack>
        }
        method={Method.minus}
        description={minusData.content}
        duplicateNode={
          <EmptyCardIdea
            sxBox={{
              border: 'none',
              backgroundColor: 'transparent'
            }}
            title={dict.idea_remove_title}
            subTitle={dict.idea_remove_sub_title}
            content={
              <Stack
                justifyContent={'center'}
                maxWidth={444}
                flexWrap={'wrap'}
                useFlexGap
                direction={'row'}
                gap={'10px'}
              >
                {minusData.keywords?.map((chip) => {
                  return (
                    <ChipIdea
                      isDashed={chip.isSelected}
                      chipColor={sub.orange500}
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

export default PreviewMinusIdea
